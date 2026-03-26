import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ExternalLink,
  FileStack,
  FolderPlus,
  Image,
  ImagePlus,
  Play,
  MessagesSquare,
  PenSquare,
  Pause,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  Sparkles,
  TextQuote,
  Upload,
  Video,
  X,
} from "lucide-react";
import { toast } from "sonner";
import type { XhsCollectedNote } from "~/api/collection";
import type {
  GeneratedNote,
  GeneratedNoteStatus,
  ProjectBenchmarkNoteItem,
  ProjectListItem,
  ProjectReferenceAsset,
  ProjectReferenceAssetType,
  ProjectStatus,
} from "~/api/project";
import { useNoteList } from "~/hooks/useCollection";
import {
  useCreateProject,
  useDeleteProject,
  useGenerateNoteNow,
  useGeneratedNoteList,
  useProjectDetail,
  useProjectList,
  useRenameProject,
  useUpdateProjectConfig,
  useUpdateProjectStatus,
  useUpdateProjectBenchmarkNotes,
  useUpdateProjectReferenceAssets,
  useUploadBrief,
  useUploadFile,
} from "~/hooks/useProject";
import "./generation.css";

type WizardStep = 1 | 2 | 3 | 4 | 5;
type WorkspaceFilter = "all" | GeneratedNoteStatus;
type NoteTypeFilter = "image" | "video" | undefined;
type BenchmarkPickerTarget = "wizard" | "settings" | null;
type SettingsSection =
  | "runtime"
  | "brief"
  | "benchmark"
  | "assets"
  | "messaging";

const GENERATED_NOTE_PAGE_SIZE = 20;

interface SetupDraft {
  name: string;
  benchmarkNoteIds: number[];
  referenceAssets: ReferenceAssetDraft[];
  assetNote: string;
  coreExpressions: string[];
  specifiedTags: string[];
  forbiddenTerms: string[];
}

interface SettingsDraft {
  name: string;
  projectStatus: ProjectStatus;
  creativeTheme: string;
  coreExpressions: string[];
  specifiedTags: string[];
  forbiddenTerms: string[];
  generateIntervalMin: string;
}

type RuleListField = "coreExpressions" | "specifiedTags" | "forbiddenTerms";

interface ReferenceAssetDraft {
  localId: string;
  id?: number;
  assetType: ProjectReferenceAssetType;
  name: string;
  url: string;
  sortOrder: number;
}

const statusMeta: Record<ProjectStatus, { label: string; className: string }> =
  {
    running: { label: "运行中", className: "generation-status--running" },
    paused: { label: "暂停", className: "generation-status--paused" },
  };

const noteStatusMeta: Record<
  GeneratedNoteStatus,
  { label: string; className: string }
> = {
  generating: {
    label: "生成中",
    className: "generation-status--generating",
  },
  draft: {
    label: "待编辑",
    className: "generation-status--draft-note",
  },
  done: {
    label: "已完成",
    className: "generation-status--done",
  },
  failed: {
    label: "生成失败",
    className: "generation-status--failed",
  },
};

const setupSteps: Array<{
  id: WizardStep;
  label: string;
  title: string;
  description: string;
  icon: typeof FolderPlus;
}> = [
  {
    id: 1,
    label: "项目名称",
    title: "第一步：先确定项目名称",
    description: "用一个清晰的项目容器承接后续资料、参考内容和生成结果。",
    icon: FolderPlus,
  },
  {
    id: 2,
    label: "对标笔记",
    title: "第二步：选择对标笔记",
    description: "直接从采集笔记模块里勾选要挂到项目上的参考内容。",
    icon: TextQuote,
  },
  {
    id: 3,
    label: "推广资料",
    title: "第三步：整理推广资料",
    description: "把截图、评论图、活动海报和示意素材收进同一个项目上下文。",
    icon: ImagePlus,
  },
  {
    id: 4,
    label: "表达规则",
    title: "第四步：配置核心话术和表达",
    description: "明确必须出现的利益点、禁用词和整体口吻，后续生成才更稳定。",
    icon: MessagesSquare,
  },
  {
    id: 5,
    label: "完成确认",
    title: "最后一步：确认项目初始化结果",
    description: "把准备动作收束成一个摘要，然后直接进入项目工作台。",
    icon: Check,
  },
];

const emptyStepList = [
  {
    index: "1",
    title: "创建项目",
    description: "先确定产品或 campaign，后续内容都会沉淀在同一个项目下。",
  },
  {
    index: "2",
    title: "勾选对标笔记",
    description:
      "直接从采集笔记模块里选参考内容，后续还能在项目设置里继续维护。",
  },
  {
    index: "3",
    title: "进入持续生成",
    description: "以后新增笔记、查看结果、继续编辑，都在项目工作台完成。",
  },
];

const capabilityHints = [
  "对标笔记直接复用采集笔记数据，不再手动粘贴链接。",
  "项目设置收敛在一个居中弹框里，不再和列表页混排。",
  "采集主表里笔记被删除后，项目侧会显示“笔记已被删除”。",
  "项目设置调整后，只影响后续生成结果，不回写历史内容。",
];

const coreExpressionSuggestions = [
  "立即下载应用",
  "内容见评论区",
  "点击立即体验",
];
const forbiddenTermSuggestions = ["最强", "全网第一", "保证有效"];

const settingsSections: Array<{
  key: SettingsSection;
  label: string;
  description: string;
  icon: typeof FolderPlus;
}> = [
  {
    key: "runtime",
    label: "运行配置",
    description: "管理启动、暂停和运行间隔",
    icon: Settings2,
  },
  {
    key: "brief",
    label: "项目方案书",
    description: "上传和替换方案书文件",
    icon: FileStack,
  },
  {
    key: "benchmark",
    label: "对标笔记",
    description: "管理采集笔记关联",
    icon: TextQuote,
  },
  {
    key: "assets",
    label: "推广资料",
    description: "上传和维护项目参考资料",
    icon: ImagePlus,
  },
  {
    key: "messaging",
    label: "表达规则",
    description: "维护项目表达要求",
    icon: MessagesSquare,
  },
];

const initialSetupDraft: SetupDraft = {
  name: "",
  benchmarkNoteIds: [],
  referenceAssets: [],
  assetNote:
    "例如：前 2 张是功能截图，第 3 张是活动权益海报，第 4 张以后更适合做正文配图。",
  coreExpressions: ["立即下载应用", "内容见评论区"],
  specifiedTags: [],
  forbiddenTerms: ["最强", "全网第一"],
};

const referenceAssetTypeOptions: Array<{
  value: ProjectReferenceAssetType;
  label: string;
}> = [
  { value: "product_image", label: "产品图" },
  { value: "logo_image", label: "Logo图" },
  { value: "app_screenshot", label: "应用截图" },
  { value: "app_store_screenshot", label: "应用商店截图" },
  { value: "comment_image", label: "评论图" },
  { value: "campaign_poster", label: "活动海报" },
  { value: "other", label: "其他" },
];

function formatDateLabel(value: string) {
  if (!value) {
    return "--";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatDateOnly(value: string) {
  if (!value) {
    return "--";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function uniqueNumberIds(values: number[]) {
  const seen = new Set<number>();
  const result: number[] = [];

  values.forEach((value) => {
    if (!value || seen.has(value)) {
      return;
    }
    seen.add(value);
    result.push(value);
  });

  return result;
}

function getNotePreviewImage(note: XhsCollectedNote) {
  return note.cover_url || note.images?.[0] || "";
}

function createReferenceAssetDraft(input: {
  id?: number;
  assetType?: ProjectReferenceAssetType;
  name: string;
  url: string;
  sortOrder?: number;
}): ReferenceAssetDraft {
  return {
    localId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    id: input.id,
    assetType: input.assetType ?? "product_image",
    name: input.name,
    url: input.url,
    sortOrder: input.sortOrder ?? 0,
  };
}

function mapReferenceAssetToDraft(
  asset: ProjectReferenceAsset,
  index: number,
): ReferenceAssetDraft {
  return createReferenceAssetDraft({
    id: asset.id,
    assetType: asset.asset_type,
    name: asset.name,
    url: asset.url,
    sortOrder: asset.sort_order || index + 1,
  });
}

function normalizeReferenceAssetPayload(assets: ReferenceAssetDraft[]) {
  return assets.map((asset, index) => ({
    asset_type: asset.assetType,
    name: asset.name.trim(),
    url: asset.url.trim(),
    sort_order: index + 1,
  }));
}

function normalizeRuleItems(items: string[]) {
  const seen = new Set<string>();
  const result: string[] = [];

  items.forEach((item) => {
    const trimmed = item.trim();
    if (!trimmed || seen.has(trimmed)) {
      return;
    }
    seen.add(trimmed);
    result.push(trimmed.slice(0, 100));
  });

  return result;
}

function getReferenceAssetTypeLabel(assetType: ProjectReferenceAssetType) {
  return (
    referenceAssetTypeOptions.find((item) => item.value === assetType)?.label ??
    "其他"
  );
}

function createSettingsDraft(
  project: ProjectListItem,
  creativeTheme: string | undefined,
  coreExpressions: string[] | undefined,
  specifiedTags: string[] | undefined,
  forbiddenTerms: string[] | undefined,
  generateIntervalMin: string | number | undefined,
): SettingsDraft {
  return {
    name: project.name,
    projectStatus: project.status,
    creativeTheme: creativeTheme?.trim() ?? "",
    coreExpressions: normalizeRuleItems(coreExpressions ?? []),
    specifiedTags: normalizeRuleItems(specifiedTags ?? []),
    forbiddenTerms: normalizeRuleItems(forbiddenTerms ?? []),
    generateIntervalMin: normalizeGenerateIntervalValue(generateIntervalMin),
  };
}

function normalizeGenerateIntervalValue(value: string | number | undefined) {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  if (typeof value === "number") {
    return String(value);
  }

  return String(value);
}

function getGenerateIntervalMinutes(value: string | number | undefined) {
  const normalizedValue = normalizeGenerateIntervalValue(value).trim();
  if (!normalizedValue) {
    return "";
  }

  if (/^\d+$/.test(normalizedValue)) {
    return normalizedValue;
  }

  const everyMinuteMatch = normalizedValue.match(
    /^\*\/(\d+)\s+\*\s+\*\s+\*\s+\*$/,
  );
  if (everyMinuteMatch) {
    return everyMinuteMatch[1];
  }

  if (normalizedValue === "0 * * * *") {
    return "60";
  }

  const everyHourMatch = normalizedValue.match(
    /^0\s+\*\/(\d+)\s+\*\s+\*\s+\*$/,
  );
  if (everyHourMatch) {
    return String(Number.parseInt(everyHourMatch[1], 10) * 60);
  }

  if (normalizedValue === "0 0 * * *") {
    return "1440";
  }

  return "";
}

function buildGenerateIntervalCron(minutes: number) {
  if (minutes < 60) {
    if (60 % minutes !== 0) {
      return null;
    }

    return `*/${minutes} * * * *`;
  }

  if (minutes === 60) {
    return "0 * * * *";
  }

  if (minutes < 1440 && minutes % 60 === 0) {
    const hours = minutes / 60;
    if (24 % hours !== 0) {
      return null;
    }

    return `0 */${hours} * * *`;
  }

  if (minutes === 1440) {
    return "0 0 * * *";
  }

  return null;
}

function getGeneratedNoteImages(note: GeneratedNote) {
  const images = note.images?.filter(Boolean) ?? [];
  if (images.length > 0) {
    return images;
  }

  return note.cover_url ? [note.cover_url] : [];
}

function getGeneratedNoteCoverImage(note: GeneratedNote) {
  return getGeneratedNoteImages(note)[0] ?? "";
}

function getGeneratedNoteTitle(note: GeneratedNote) {
  if (note.title?.trim()) {
    return note.title.trim();
  }

  if (note.status === "generating") {
    return "AI 正在生成新笔记";
  }

  if (note.status === "failed") {
    return "本次生成未成功完成";
  }

  return "未命名产出笔记";
}

function getGeneratedNoteSummary(note: GeneratedNote) {
  if (note.status === "generating") {
    return "系统已经创建生成任务，正在等待 AI 返回内容。你可以离开页面，列表会自动刷新。";
  }

  if (note.status === "failed") {
    return (
      note.generation_error?.trim() || "生成失败，但后端没有返回详细错误信息。"
    );
  }

  if (note.content?.trim()) {
    return note.content.trim();
  }

  return "当前还没有可展示的正文内容。";
}

function CollectedNotePickerCard({
  note,
  selected,
  onToggle,
}: {
  note: XhsCollectedNote;
  selected: boolean;
  onToggle: () => void;
}) {
  const previewImage = getNotePreviewImage(note);

  return (
    <article
      className={`generation-benchmark-card ${selected ? "generation-benchmark-card--selected" : ""}`}
    >
      <button
        type="button"
        className="generation-benchmark-card__select"
        onClick={onToggle}
        aria-pressed={selected}
      >
        {selected ? <Check size={14} /> : <Plus size={14} />}
      </button>

      <div className="generation-benchmark-card__preview">
        {previewImage ? (
          <img src={previewImage} alt={note.title || "采集笔记封面"} />
        ) : (
          <span>{note.note_type === "video" ? "视频" : "图文"}</span>
        )}
      </div>

      <div className="generation-benchmark-card__body">
        <div className="generation-benchmark-card__meta">
          <span className="generation-tag generation-tag--soft">
            {note.note_type === "video" ? (
              <Video size={12} />
            ) : (
              <Image size={12} />
            )}
            {note.note_type === "video" ? "视频" : "图文"}
          </span>
          <span className="generation-benchmark-card__time">
            采集于 {formatDateOnly(note.collected_at)}
          </span>
        </div>

        <strong>{note.title || "无标题笔记"}</strong>
        <p>{note.content || "暂无正文内容"}</p>

        <div className="generation-benchmark-card__footer">
          <span>{note.author_name || "未知作者"}</span>
          <a href={note.note_url} target="_blank" rel="noreferrer">
            查看原文
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </article>
  );
}

function ProjectBenchmarkCard({ item }: { item: ProjectBenchmarkNoteItem }) {
  if (item.is_deleted || !item.note) {
    return (
      <article className="generation-reference-card generation-reference-card--deleted">
        <div className="generation-reference-card__thumb">已删</div>
        <div>
          <strong>笔记已被删除</strong>
          <p>
            采集主表中已找不到这条笔记记录，你可以移除它或重新选择新的对标笔记。
          </p>
        </div>
      </article>
    );
  }

  const previewImage = item.note.cover_url || item.note.images?.[0] || "";

  return (
    <article className="generation-reference-card generation-reference-card--rich">
      <div className="generation-reference-card__thumb generation-reference-card__thumb--image">
        {previewImage ? (
          <img src={previewImage} alt={item.note.title || "对标笔记封面"} />
        ) : (
          <span>{item.note.note_type === "video" ? "视频" : "图文"}</span>
        )}
      </div>
      <div className="generation-reference-card__body">
        <div className="generation-reference-card__meta">
          <span className="generation-tag generation-tag--soft">
            {item.note.note_type === "video" ? (
              <Video size={12} />
            ) : (
              <Image size={12} />
            )}
            {item.note.note_type === "video" ? "视频" : "图文"}
          </span>
          <span className="generation-benchmark-card__time">
            采集于 {formatDateOnly(item.note.collected_at)}
          </span>
        </div>
        <strong>{item.note.title || "无标题笔记"}</strong>
        <p>{item.note.content || "暂无正文内容"}</p>
        <div className="generation-reference-card__footer">
          <span>{item.note.author_name || "未知作者"}</span>
          <a href={item.note.note_url} target="_blank" rel="noreferrer">
            查看原文
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </article>
  );
}

function ReferenceAssetCard({
  asset,
  index,
  onNameChange,
  onTypeChange,
  onRemove,
}: {
  asset: ReferenceAssetDraft;
  index: number;
  onNameChange: (value: string) => void;
  onTypeChange: (value: ProjectReferenceAssetType) => void;
  onRemove: () => void;
}) {
  return (
    <article className="generation-reference-asset-card">
      <div className="generation-reference-asset-card__preview">
        <img src={asset.url} alt={asset.name || `项目资料 ${index + 1}`} />
      </div>

      <div className="generation-reference-asset-card__body">
        <div className="generation-reference-asset-card__meta">
          <span className="generation-tag generation-tag--soft">
            资料 {index + 1}
          </span>
          <span>{getReferenceAssetTypeLabel(asset.assetType)}</span>
        </div>

        <label className="generation-field">
          <span>资料名称</span>
          <input
            className="generation-input"
            value={asset.name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="请输入资料名称"
            maxLength={255}
          />
        </label>

        <label className="generation-field">
          <span>资料类型</span>
          <select
            className="generation-select"
            value={asset.assetType}
            onChange={(event) =>
              onTypeChange(event.target.value as ProjectReferenceAssetType)
            }
          >
            {referenceAssetTypeOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <div className="generation-reference-asset-card__footer">
          <a href={asset.url} target="_blank" rel="noreferrer">
            查看原图
            <ExternalLink size={12} />
          </a>
          <button
            type="button"
            className="generation-button generation-button--ghost"
            onClick={onRemove}
          >
            <X size={14} />
            删除
          </button>
        </div>
      </div>
    </article>
  );
}

function RuleListEditor({
  label,
  placeholder,
  suggestions,
  values,
  inputValue,
  onInputChange,
  onAdd,
  onSuggestionClick,
  onRemove,
}: {
  label: string;
  placeholder: string;
  suggestions: string[];
  values: string[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onAdd: () => void;
  onSuggestionClick: (value: string) => void;
  onRemove: (value: string) => void;
}) {
  return (
    <div className="generation-surface-card">
      <label className="generation-field">
        <span>{label}</span>
      </label>

      {values.length ? (
        <div className="generation-rule-list">
          {values.map((value) => (
            <span key={value} className="generation-rule-chip">
              <span>{value}</span>
              <button
                type="button"
                onClick={() => onRemove(value)}
                aria-label={`移除${value}`}
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="generation-inline-feedback">
          <Sparkles size={14} />
          还没有添加内容
        </div>
      )}

      <div className="generation-rule-addbar">
        <input
          className="generation-input"
          value={inputValue}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onAdd();
            }
          }}
          placeholder={placeholder}
          maxLength={100}
        />
        <button
          type="button"
          className="generation-button generation-button--ghost"
          onClick={onAdd}
        >
          <Plus size={16} />
          添加
        </button>
      </div>

      {suggestions.length ? (
        <div className="generation-rule-suggestions">
          <span className="generation-rule-suggestions__label">推荐参考</span>
          <div className="generation-rule-suggestions__list">
            {suggestions.map((value) => (
              <button
                key={value}
                type="button"
                className="generation-tag generation-tag--soft generation-rule-suggestion"
                onClick={() => onSuggestionClick(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function GenerationPage() {
  const projectListQuery = useProjectList({ page: 1, pageSize: 100 });
  const createProjectMutation = useCreateProject();
  const deleteProjectMutation = useDeleteProject();
  const renameProjectMutation = useRenameProject();
  const uploadFileMutation = useUploadFile();
  const uploadReferenceFileMutation = useUploadFile();
  const uploadBriefMutation = useUploadBrief();
  const generateNoteNowMutation = useGenerateNoteNow();
  const updateProjectConfigMutation = useUpdateProjectConfig();
  const updateProjectStatusMutation = useUpdateProjectStatus();
  const updateBenchmarkNotesMutation = useUpdateProjectBenchmarkNotes();
  const updateReferenceAssetsMutation = useUpdateProjectReferenceAssets();
  const briefFileRef = useRef<HTMLInputElement>(null);
  const wizardReferenceFileRef = useRef<HTMLInputElement>(null);
  const settingsReferenceFileRef = useRef<HTMLInputElement>(null);
  const settingsReferenceAutosaveTimerRef = useRef<number | null>(null);
  const lastPersistedSettingsReferenceAssetsRef = useRef("[]");
  const settingsReferenceAssetsRef = useRef<ReferenceAssetDraft[]>([]);
  const settingsReferenceAssetsDirtyRef = useRef(false);
  const settingsReferencePersistInFlightRef = useRef(false);
  const queuedSettingsReferenceAssetsRef = useRef<ReferenceAssetDraft[] | null>(
    null,
  );

  const [activeProjectId, setActiveProjectId] = useState("");
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState<WizardStep>(1);
  const [setupDraft, setSetupDraft] = useState<SetupDraft>(initialSetupDraft);
  const [briefFile, setBriefFile] = useState<File | null>(null);
  const [briefUploadedUrl, setBriefUploadedUrl] = useState("");
  const [activeFilter, setActiveFilter] = useState<WorkspaceFilter>("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEditingProjectName, setIsEditingProjectName] = useState(false);
  const [activeSettingsSection, setActiveSettingsSection] =
    useState<SettingsSection>("runtime");
  const [settingsDraft, setSettingsDraft] = useState<SettingsDraft>({
    name: "",
    projectStatus: "paused",
    creativeTheme: "",
    coreExpressions: [],
    specifiedTags: [],
    forbiddenTerms: [],
    generateIntervalMin: "60",
  });
  const [wizardCoreExpressionInput, setWizardCoreExpressionInput] =
    useState("");
  const [wizardSpecifiedTagInput, setWizardSpecifiedTagInput] = useState("");
  const [wizardForbiddenTermInput, setWizardForbiddenTermInput] = useState("");
  const [settingsCoreExpressionInput, setSettingsCoreExpressionInput] =
    useState("");
  const [settingsSpecifiedTagInput, setSettingsSpecifiedTagInput] =
    useState("");
  const [settingsForbiddenTermInput, setSettingsForbiddenTermInput] =
    useState("");
  const [settingsReferenceAssets, setSettingsReferenceAssets] = useState<
    ReferenceAssetDraft[]
  >([]);
  const [benchmarkPickerTarget, setBenchmarkPickerTarget] =
    useState<BenchmarkPickerTarget>(null);
  const [benchmarkSelection, setBenchmarkSelection] = useState<number[]>([]);
  const [benchmarkKeyword, setBenchmarkKeyword] = useState("");
  const [benchmarkNoteType, setBenchmarkNoteType] = useState<NoteTypeFilter>();
  const [benchmarkPage, setBenchmarkPage] = useState(1);
  const [generatedNotePage, setGeneratedNotePage] = useState(1);
  const [selectedGeneratedNote, setSelectedGeneratedNote] =
    useState<GeneratedNote | null>(null);
  const [activeGeneratedNoteImageIndex, setActiveGeneratedNoteImageIndex] =
    useState(0);

  const projects = projectListQuery.data?.list ?? [];
  const resolvedActiveProjectId =
    activeProjectId &&
    projects.some((item) => String(item.id) === activeProjectId)
      ? activeProjectId
      : projects[0]
        ? String(projects[0].id)
        : "";

  const selectedProject =
    projects.find((item) => String(item.id) === resolvedActiveProjectId) ??
    null;
  const selectedProjectId = selectedProject?.id;

  const projectDetailQuery = useProjectDetail(selectedProjectId);
  const generatedNoteQuery = useGeneratedNoteList(
    selectedProjectId
      ? {
          project_id: selectedProjectId,
          page: generatedNotePage,
          pageSize: GENERATED_NOTE_PAGE_SIZE,
          status: activeFilter === "all" ? undefined : activeFilter,
          keyword: searchKeyword.trim() || undefined,
        }
      : undefined,
    selectedProject?.status,
  );
  const collectedNoteQuery = useNoteList({
    page: benchmarkPage,
    pageSize: 12,
    keyword: benchmarkKeyword,
    noteType: benchmarkNoteType,
  });

  const benchmarkNotes = projectDetailQuery.data?.benchmark_notes ?? [];
  const projectReferenceAssets =
    projectDetailQuery.data?.reference_assets ?? [];
  const activeBenchmarkCount = benchmarkNotes.filter(
    (item) => !item.is_deleted,
  ).length;
  const generateIntervalCron = normalizeGenerateIntervalValue(
    projectDetailQuery.data?.config?.cron_expr ??
      selectedProject?.config?.cron_expr,
  );
  const creativeTheme =
    projectDetailQuery.data?.config?.creative_theme ??
    selectedProject?.config?.creative_theme ??
    "";
  const configCoreExpressions =
    projectDetailQuery.data?.config?.core_expressions ??
    selectedProject?.config?.core_expressions ??
    [];
  const configSpecifiedTags =
    projectDetailQuery.data?.config?.specified_tags ??
    selectedProject?.config?.specified_tags ??
    [];
  const configForbiddenTerms =
    projectDetailQuery.data?.config?.forbidden_terms ??
    selectedProject?.config?.forbidden_terms ??
    [];
  const generateIntervalMin = getGenerateIntervalMinutes(generateIntervalCron);
  const generatedNotes = generatedNoteQuery.data?.list ?? [];
  const generatedNoteTotal = generatedNoteQuery.data?.total ?? 0;
  const generatedNoteTotalPages = Math.max(
    1,
    Math.ceil(generatedNoteTotal / GENERATED_NOTE_PAGE_SIZE),
  );
  const selectedGeneratedNoteImages = selectedGeneratedNote
    ? getGeneratedNoteImages(selectedGeneratedNote)
    : [];
  const selectedGeneratedNoteStatus = selectedGeneratedNote
    ? noteStatusMeta[selectedGeneratedNote.status]
    : null;
  const selectedGeneratedNoteTags =
    selectedGeneratedNote?.tags?.filter(Boolean) ?? [];
  const selectedGeneratedNoteActiveImage =
    selectedGeneratedNoteImages[
      Math.min(
        activeGeneratedNoteImageIndex,
        Math.max(selectedGeneratedNoteImages.length - 1, 0),
      )
    ] ?? "";

  const pickerNotes = collectedNoteQuery.data?.list ?? [];
  const pickerTotal = collectedNoteQuery.data?.total ?? 0;
  const pickerTotalPages = Math.max(
    1,
    Math.ceil(pickerTotal / (collectedNoteQuery.data?.pageSize ?? 12)),
  );

  const canProceedWizard = wizardStep !== 1 || !!setupDraft.name.trim();
  const isReferenceUploading = uploadReferenceFileMutation.isPending;
  const isAssetSettingsSection = activeSettingsSection === "assets";
  const isBriefSettingsSection = activeSettingsSection === "brief";
  const isMessagingSettingsSection = activeSettingsSection === "messaging";
  const isRuntimeSettingsSection = activeSettingsSection === "runtime";

  const clearSettingsReferenceAutosaveTimer = () => {
    if (settingsReferenceAutosaveTimerRef.current !== null) {
      window.clearTimeout(settingsReferenceAutosaveTimerRef.current);
      settingsReferenceAutosaveTimerRef.current = null;
    }
  };

  const hydrateSettingsReferenceAssets = (assets: ReferenceAssetDraft[]) => {
    settingsReferenceAssetsDirtyRef.current = false;
    settingsReferenceAssetsRef.current = assets;
    setSettingsReferenceAssets(assets);
    lastPersistedSettingsReferenceAssetsRef.current = JSON.stringify(
      normalizeReferenceAssetPayload(assets),
    );
  };

  const persistSettingsReferenceAssets = async (
    assets: ReferenceAssetDraft[],
  ) => {
    if (!selectedProjectId) {
      return;
    }

    const normalizedAssets = normalizeReferenceAssetPayload(assets);
    const invalidAsset = normalizedAssets.find(
      (asset) => !asset.name || !asset.url || !asset.asset_type,
    );
    if (invalidAsset) {
      return;
    }

    const serializedAssets = JSON.stringify(normalizedAssets);
    if (serializedAssets === lastPersistedSettingsReferenceAssetsRef.current) {
      return;
    }

    if (settingsReferencePersistInFlightRef.current) {
      queuedSettingsReferenceAssetsRef.current = assets;
      return;
    }

    settingsReferencePersistInFlightRef.current = true;

    try {
      await updateReferenceAssetsMutation.mutateAsync({
        project_id: selectedProjectId,
        assets: normalizedAssets,
        silent: true,
      });
      lastPersistedSettingsReferenceAssetsRef.current = serializedAssets;
    } finally {
      settingsReferencePersistInFlightRef.current = false;

      const queuedAssets = queuedSettingsReferenceAssetsRef.current;
      queuedSettingsReferenceAssetsRef.current = null;
      if (queuedAssets) {
        const queuedSerializedAssets = JSON.stringify(
          normalizeReferenceAssetPayload(queuedAssets),
        );
        if (
          queuedSerializedAssets !==
          lastPersistedSettingsReferenceAssetsRef.current
        ) {
          void persistSettingsReferenceAssets(queuedAssets);
        }
      }
    }
  };

  const scheduleSettingsReferenceAutosave = (
    assets: ReferenceAssetDraft[],
    delayMs: number,
  ) => {
    clearSettingsReferenceAutosaveTimer();
    settingsReferenceAutosaveTimerRef.current = window.setTimeout(() => {
      void persistSettingsReferenceAssets(assets);
    }, delayMs);
  };

  const applySettingsReferenceAssets = (
    updater: (current: ReferenceAssetDraft[]) => ReferenceAssetDraft[],
    mode: "immediate" | "debounced" = "debounced",
  ) => {
    const nextAssets = updater(settingsReferenceAssetsRef.current);
    settingsReferenceAssetsDirtyRef.current = true;
    settingsReferenceAssetsRef.current = nextAssets;
    setSettingsReferenceAssets(nextAssets);

    if (isSettingsOpen && selectedProjectId) {
      if (mode === "immediate") {
        clearSettingsReferenceAutosaveTimer();
        void persistSettingsReferenceAssets(nextAssets);
      } else {
        scheduleSettingsReferenceAutosave(nextAssets, 700);
      }
    }
  };

  useEffect(() => {
    if (!isSettingsOpen) {
      return;
    }

    if (settingsReferenceAssetsDirtyRef.current) {
      return;
    }

    const hydratedAssets = projectReferenceAssets.map((asset, index) =>
      mapReferenceAssetToDraft(asset, index),
    );
    hydrateSettingsReferenceAssets(hydratedAssets);
  }, [isSettingsOpen, projectReferenceAssets]);

  useEffect(() => {
    return () => {
      clearSettingsReferenceAutosaveTimer();
    };
  }, []);

  useEffect(() => {
    setGeneratedNotePage(1);
    setSelectedGeneratedNote(null);
  }, [selectedProjectId, activeFilter, searchKeyword]);

  useEffect(() => {
    if (!selectedGeneratedNote) {
      return;
    }

    const latestSelectedNote = generatedNotes.find(
      (note) => note.id === selectedGeneratedNote.id,
    );
    if (latestSelectedNote && latestSelectedNote !== selectedGeneratedNote) {
      setSelectedGeneratedNote(latestSelectedNote);
    }
  }, [generatedNotes, selectedGeneratedNote]);

  useEffect(() => {
    setActiveGeneratedNoteImageIndex(0);
  }, [selectedGeneratedNote?.id]);

  const openWizard = () => {
    setWizardStep(1);
    setBriefFile(null);
    setBriefUploadedUrl("");
    setSetupDraft(initialSetupDraft);
    setWizardCoreExpressionInput("");
    setWizardSpecifiedTagInput("");
    setWizardForbiddenTermInput("");
    setIsWizardOpen(true);
  };

  const closeWizard = () => {
    setWizardStep(1);
    setBriefFile(null);
    setBriefUploadedUrl("");
    setSetupDraft(initialSetupDraft);
    setWizardCoreExpressionInput("");
    setWizardSpecifiedTagInput("");
    setWizardForbiddenTermInput("");
    if (wizardReferenceFileRef.current) {
      wizardReferenceFileRef.current.value = "";
    }
    setIsWizardOpen(false);
  };

  const closeSettings = () => {
    clearSettingsReferenceAutosaveTimer();
    queuedSettingsReferenceAssetsRef.current = null;
    setIsSettingsOpen(false);
    setIsEditingProjectName(false);
    setActiveSettingsSection("runtime");
    setSettingsCoreExpressionInput("");
    setSettingsSpecifiedTagInput("");
    setSettingsForbiddenTermInput("");
    setSettingsReferenceAssets([]);
    settingsReferenceAssetsRef.current = [];
    settingsReferenceAssetsDirtyRef.current = false;
    if (settingsReferenceFileRef.current) {
      settingsReferenceFileRef.current.value = "";
    }
  };

  const handleDeleteProject = async () => {
    if (!selectedProjectId || !selectedProject) {
      return;
    }

    const confirmed = window.confirm(
      `确认删除项目「${selectedProject.name}」吗？删除后不可恢复。`,
    );
    if (!confirmed) {
      return;
    }

    await deleteProjectMutation.mutateAsync({ ids: [selectedProjectId] });
    closeSettings();
    setActiveProjectId("");
  };

  const openSettings = () => {
    if (!selectedProject) {
      return;
    }

    setSettingsDraft(
      createSettingsDraft(
        selectedProject,
        creativeTheme,
        configCoreExpressions,
        configSpecifiedTags,
        configForbiddenTerms,
        generateIntervalMin,
      ),
    );
    setIsEditingProjectName(false);
    const hydratedAssets = projectReferenceAssets.map((asset, index) =>
      mapReferenceAssetToDraft(asset, index),
    );
    hydrateSettingsReferenceAssets(hydratedAssets);
    setSettingsCoreExpressionInput("");
    setSettingsSpecifiedTagInput("");
    setSettingsForbiddenTermInput("");
    setActiveSettingsSection("runtime");
    setIsSettingsOpen(true);
  };

  const updateSetupReferenceAsset = (
    localId: string,
    updater: (asset: ReferenceAssetDraft) => ReferenceAssetDraft,
  ) => {
    setSetupDraft((current) => ({
      ...current,
      referenceAssets: current.referenceAssets.map((asset) =>
        asset.localId === localId ? updater(asset) : asset,
      ),
    }));
  };

  const updateSettingsReferenceAsset = (
    localId: string,
    updater: (asset: ReferenceAssetDraft) => ReferenceAssetDraft,
    mode: "immediate" | "debounced" = "debounced",
  ) => {
    applySettingsReferenceAssets(
      (current) =>
        current.map((asset) =>
          asset.localId === localId ? updater(asset) : asset,
        ),
      mode,
    );
  };

  const removeSetupReferenceAsset = (localId: string) => {
    setSetupDraft((current) => ({
      ...current,
      referenceAssets: current.referenceAssets.filter(
        (asset) => asset.localId !== localId,
      ),
    }));
  };

  const removeSettingsReferenceAsset = (localId: string) => {
    applySettingsReferenceAssets(
      (current) => current.filter((asset) => asset.localId !== localId),
      "immediate",
    );
  };

  const addWizardRuleItem = (
    key: RuleListField,
    inputValue: string,
    clearInput: () => void,
  ) => {
    const nextValue = inputValue.trim();
    if (!nextValue) {
      return;
    }

    setSetupDraft((current) => ({
      ...current,
      [key]: normalizeRuleItems([...current[key], nextValue]),
    }));
    clearInput();
  };

  const removeWizardRuleItem = (key: RuleListField, value: string) => {
    setSetupDraft((current) => ({
      ...current,
      [key]: current[key].filter((item) => item !== value),
    }));
  };

  const addSettingsRuleItem = (
    key: RuleListField,
    inputValue: string,
    clearInput: () => void,
  ) => {
    const nextValue = inputValue.trim();
    if (!nextValue) {
      return;
    }

    setSettingsDraft((current) => ({
      ...current,
      [key]: normalizeRuleItems([...current[key], nextValue]),
    }));
    clearInput();
  };

  const removeSettingsRuleItem = (key: RuleListField, value: string) => {
    setSettingsDraft((current) => ({
      ...current,
      [key]: current[key].filter((item) => item !== value),
    }));
  };

  const uploadReferenceAssets = async (
    files: FileList | null,
    target: "wizard" | "settings",
  ) => {
    if (!files?.length) {
      return;
    }

    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (!imageFiles.length) {
      toast.error("参考资料只支持上传图片文件");
      return;
    }

    const uploadedAssets: ReferenceAssetDraft[] = [];
    let failedCount = 0;

    for (const file of imageFiles) {
      try {
        const uploaded = await uploadReferenceFileMutation.mutateAsync(file);
        uploadedAssets.push(
          createReferenceAssetDraft({
            name: uploaded.file_name || file.name,
            url: uploaded.url,
            assetType: "product_image",
          }),
        );
      } catch {
        failedCount += 1;
      }
    }

    if (uploadedAssets.length > 0) {
      if (target === "wizard") {
        setSetupDraft((current) => ({
          ...current,
          referenceAssets: [...current.referenceAssets, ...uploadedAssets],
        }));
      } else {
        applySettingsReferenceAssets(
          (current) => [...current, ...uploadedAssets],
          "immediate",
        );
      }
    }

    if (failedCount > 0) {
      toast.error(`${failedCount} 个资料上传失败，请重试`);
    }
  };

  const handleWizardReferenceFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    await uploadReferenceAssets(event.target.files, "wizard");
    event.target.value = "";
  };

  const handleSettingsReferenceFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    await uploadReferenceAssets(event.target.files, "settings");
    event.target.value = "";
  };

  const openBenchmarkPicker = (target: BenchmarkPickerTarget) => {
    if (!target) {
      return;
    }

    setBenchmarkPickerTarget(target);
    setBenchmarkKeyword("");
    setBenchmarkPage(1);
    setBenchmarkNoteType(undefined);

    if (target === "wizard") {
      setBenchmarkSelection(setupDraft.benchmarkNoteIds);
      return;
    }

    setBenchmarkSelection(
      benchmarkNotes
        .filter((item) => !item.is_deleted)
        .map((item) => item.collected_note_id),
    );
  };

  const closeBenchmarkPicker = () => {
    setBenchmarkPickerTarget(null);
  };

  const toggleBenchmarkSelection = (noteId: number) => {
    setBenchmarkSelection((current) => {
      if (current.includes(noteId)) {
        return current.filter((item) => item !== noteId);
      }

      return [...current, noteId];
    });
  };

  const handleApplyBenchmarkSelection = async () => {
    const normalizedIds = uniqueNumberIds(benchmarkSelection);

    if (benchmarkPickerTarget === "wizard") {
      setSetupDraft((current) => ({
        ...current,
        benchmarkNoteIds: normalizedIds,
      }));
      closeBenchmarkPicker();
      return;
    }

    if (!selectedProjectId) {
      return;
    }

    await updateBenchmarkNotesMutation.mutateAsync({
      project_id: selectedProjectId,
      collected_note_ids: normalizedIds,
    });
    closeBenchmarkPicker();
  };

  const handleSaveSettings = async () => {
    if (!selectedProjectId) {
      return;
    }

    const minuteValue = Number.parseInt(
      settingsDraft.generateIntervalMin.trim(),
      10,
    );
    if (!Number.isInteger(minuteValue) || minuteValue <= 0) {
      toast.error("运行频率需要填写为大于 0 的分钟数");
      return;
    }

    const cronExpression = buildGenerateIntervalCron(minuteValue);
    if (!cronExpression) {
      toast.error("请输入常用的运行频率，例如 5、10、15、20、30、60、120 分钟");
      return;
    }

    const currentCronExpression = normalizeGenerateIntervalValue(
      projectDetailQuery.data?.config?.cron_expr ??
        selectedProject?.config?.cron_expr,
    );
    const currentProjectStatus = selectedProject.status;
    const shouldUpdateConfig = cronExpression !== currentCronExpression;
    const shouldUpdateStatus =
      settingsDraft.projectStatus !== currentProjectStatus;

    if (!shouldUpdateConfig && !shouldUpdateStatus) {
      toast.success("运行配置未发生变化");
      return;
    }

    if (shouldUpdateConfig) {
      await updateProjectConfigMutation.mutateAsync({
        project_id: selectedProjectId,
        cron_expr: cronExpression,
      });
    }

    if (shouldUpdateStatus) {
      await updateProjectStatusMutation.mutateAsync({
        id: selectedProjectId,
        status: settingsDraft.projectStatus,
      });
    }

    toast.success("运行配置已更新");
  };

  const handleSaveBriefSettings = async () => {
    if (!selectedProjectId) {
      return;
    }

    const creativeThemeValue = settingsDraft.creativeTheme.trim();
    if (creativeThemeValue.length > 255) {
      toast.error("项目核心创作主题不能超过 255 个字符");
      return;
    }

    await updateProjectConfigMutation.mutateAsync({
      project_id: selectedProjectId,
      creative_theme: creativeThemeValue,
    });

    toast.success("项目方案配置已更新");
  };

  const handleSaveMessagingSettings = async () => {
    if (!selectedProjectId) {
      return;
    }

    await updateProjectConfigMutation.mutateAsync({
      project_id: selectedProjectId,
      core_expressions: normalizeRuleItems(settingsDraft.coreExpressions),
      specified_tags: normalizeRuleItems(settingsDraft.specifiedTags),
      forbidden_terms: normalizeRuleItems(settingsDraft.forbiddenTerms),
    });

    toast.success("表达规则已更新");
  };

  const handleSaveProjectName = async () => {
    if (!selectedProjectId) {
      return;
    }

    const nextName = settingsDraft.name.trim();
    if (!nextName) {
      toast.error("项目名称不能为空");
      return;
    }

    if (nextName.length > 200) {
      toast.error("项目名称不能超过 200 个字符");
      return;
    }

    if (nextName === selectedProject?.name) {
      setIsEditingProjectName(false);
      return;
    }

    await renameProjectMutation.mutateAsync({
      id: selectedProjectId,
      name: nextName,
    });
    setSettingsDraft((current) => ({
      ...current,
      name: nextName,
    }));
    setIsEditingProjectName(false);
  };

  const handleCancelProjectNameEdit = () => {
    setSettingsDraft((current) => ({
      ...current,
      name: selectedProject?.name ?? current.name,
    }));
    setIsEditingProjectName(false);
  };

  const handleGenerateNoteNow = async () => {
    if (!selectedProjectId) {
      return;
    }

    await generateNoteNowMutation.mutateAsync({
      project_id: selectedProjectId,
    });
  };

  const handleWizardNext = async () => {
    if (wizardStep === 1 && !setupDraft.name.trim()) {
      return;
    }

    if (wizardStep === 5) {
      const pendingBriefUrl = briefUploadedUrl;
      const pendingBenchmarkNoteIds = uniqueNumberIds(
        setupDraft.benchmarkNoteIds,
      );
      const pendingReferenceAssets = normalizeReferenceAssetPayload(
        setupDraft.referenceAssets,
      );
      const pendingCoreExpressions = normalizeRuleItems(
        setupDraft.coreExpressions,
      );
      const pendingSpecifiedTags = normalizeRuleItems(setupDraft.specifiedTags);
      const pendingForbiddenTerms = normalizeRuleItems(
        setupDraft.forbiddenTerms,
      );

      const project = await createProjectMutation.mutateAsync({
        name: setupDraft.name.trim(),
      });

      if (pendingBriefUrl) {
        await uploadBriefMutation
          .mutateAsync({
            projectId: project.id,
            briefUrl: pendingBriefUrl,
          })
          .catch(() => {
            // error toast handled in mutation
          });
      }

      if (pendingBenchmarkNoteIds.length > 0) {
        await updateBenchmarkNotesMutation.mutateAsync({
          project_id: project.id,
          collected_note_ids: pendingBenchmarkNoteIds,
        });
      }

      if (pendingReferenceAssets.length > 0) {
        await updateReferenceAssetsMutation.mutateAsync({
          project_id: project.id,
          assets: pendingReferenceAssets,
        });
      }

      if (
        pendingCoreExpressions.length > 0 ||
        pendingSpecifiedTags.length > 0 ||
        pendingForbiddenTerms.length > 0
      ) {
        await updateProjectConfigMutation.mutateAsync({
          project_id: project.id,
          core_expressions: pendingCoreExpressions,
          specified_tags: pendingSpecifiedTags,
          forbidden_terms: pendingForbiddenTerms,
        });
      }

      setActiveProjectId(String(project.id));
      setSetupDraft(initialSetupDraft);
      setBriefFile(null);
      setBriefUploadedUrl("");
      setActiveFilter("all");
      setSearchKeyword("");
      setWizardStep(1);
      setIsWizardOpen(false);
      return;
    }

    setWizardStep((currentStep) => Math.min(currentStep + 1, 5) as WizardStep);
  };

  const handleWizardBack = () => {
    setWizardStep((currentStep) => Math.max(currentStep - 1, 1) as WizardStep);
  };

  const handleWizardSkip = () => {
    if (wizardStep >= 2 && wizardStep < 5) {
      setWizardStep(
        (currentStep) => Math.min(currentStep + 1, 5) as WizardStep,
      );
    }
  };

  const openGeneratedNoteDetail = (note: GeneratedNote) => {
    setSelectedGeneratedNote(note);
  };

  const closeGeneratedNoteDetail = () => {
    setSelectedGeneratedNote(null);
  };

  if (projectListQuery.isLoading) {
    return (
      <div className="generation-shell">
        <section className="generation-stage generation-stage--feedback">
          <RefreshCw size={20} className="generation-spin" />
          <h1>正在加载内容项目</h1>
          <p>稍等一下，先把当前账号下的项目列表取回来。</p>
        </section>
      </div>
    );
  }

  if (projectListQuery.isError) {
    return (
      <div className="generation-shell">
        <section className="generation-stage generation-stage--feedback">
          <Sparkles size={20} />
          <h1>项目列表加载失败</h1>
          <p>
            {projectListQuery.error.message ||
              "暂时无法获取项目列表，请稍后重试。"}
          </p>
          <button
            type="button"
            className="generation-button generation-button--primary"
            onClick={() => projectListQuery.refetch()}
          >
            <RefreshCw size={16} />
            重新加载
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="generation-shell">
      <section className="generation-stage">
        {!projects.length ? (
          <div className="generation-empty">
            <article className="generation-empty__narrative">
              <div className="generation-panel generation-panel--hero">
                <span className="generation-badge">首次进入</span>
                <h2>这里不再堆复杂功能，只保留一个清晰入口。</h2>
                <p>
                  先创建项目，再逐步补充方案书、素材和对标笔记。等项目壳子建好后，后面的内容生成和结果管理都在项目工作台里进行。
                </p>

                <div className="generation-step-list">
                  {emptyStepList.map((step) => (
                    <article key={step.index} className="generation-step-card">
                      <div className="generation-step-card__index">
                        {step.index}
                      </div>
                      <div>
                        <strong>{step.title}</strong>
                        <p>{step.description}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="generation-panel__footer">
                  <button
                    type="button"
                    className="generation-button generation-button--primary"
                    onClick={openWizard}
                  >
                    <Plus size={16} />
                    开始创建第一个项目
                  </button>
                </div>
              </div>
            </article>

            <aside className="generation-empty__aside">
              <div className="generation-panel generation-panel--aside">
                <span className="generation-badge generation-badge--muted">
                  工作台预览
                </span>
                <h2>项目内会发生什么</h2>
                <p>
                  顶部是项目摘要和主动作，中间是生成结果列表，项目设置收进居中弹框，对标笔记直接来自采集笔记模块。
                </p>

                <div className="generation-signal-grid">
                  <article className="generation-signal-card">
                    <span>项目摘要</span>
                    <strong>资料 + 规则一屏总览</strong>
                  </article>
                  <article className="generation-signal-card">
                    <span>对标笔记</span>
                    <strong>直接勾选采集模块里的真实笔记</strong>
                  </article>
                  <article className="generation-signal-card">
                    <span>设置弹框</span>
                    <strong>修改只影响后续生成</strong>
                  </article>
                </div>

                <ul className="generation-hint-list">
                  {capabilityHints.map((hint) => (
                    <li key={hint}>{hint}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        ) : (
          <div className="generation-workspace">
            <section className="generation-project-toolbar">
              <div className="generation-project-toolbar__main">
                <span className="generation-badge generation-badge--muted">
                  当前项目
                </span>
                <div
                  className="generation-project-switcher"
                  aria-label="项目切换"
                >
                  {projects.map((project) => {
                    const isActive = selectedProject?.id === project.id;

                    return (
                      <button
                        key={project.id}
                        type="button"
                        className={`generation-project-switcher__item ${isActive ? "generation-project-switcher__item--active" : ""}`}
                        onClick={() => {
                          setActiveProjectId(String(project.id));
                          setActiveFilter("all");
                          setSearchKeyword("");
                          setIsSettingsOpen(false);
                        }}
                      >
                        <strong>{project.name}</strong>
                        <span>
                          更新于 {formatDateLabel(project.updated_at)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="generation-project-toolbar__actions">
                <button
                  type="button"
                  className="generation-button generation-button--primary"
                  onClick={openWizard}
                >
                  <Plus size={16} />
                  新建项目
                </button>
                <button
                  type="button"
                  className="generation-button generation-button--ghost"
                  onClick={openSettings}
                  disabled={!selectedProject}
                >
                  <Settings2 size={16} />
                  项目设置
                </button>
                <button
                  type="button"
                  className="generation-button generation-button--primary"
                  onClick={handleGenerateNoteNow}
                  disabled={
                    !selectedProject || generateNoteNowMutation.isPending
                  }
                >
                  <PenSquare size={16} />
                  {generateNoteNowMutation.isPending
                    ? "正在启动生成..."
                    : "生成新笔记"}
                </button>
              </div>
            </section>

            {selectedProject && (
              <section className="generation-note-board generation-note-board--primary">
                <div className="generation-note-board__headline">
                  <div className="generation-note-board__headline-copy">
                    <div className="generation-note-board__title-row">
                      <h2>{selectedProject.name}</h2>
                      <span
                        className={`generation-status ${statusMeta[selectedProject.status].className}`}
                      >
                        {statusMeta[selectedProject.status].label}
                      </span>
                    </div>
                    <p>
                      聚焦当前项目的产出笔记，项目资料维护统一收进设置弹框。
                      {projectDetailQuery.isFetching
                        ? " 项目详情正在刷新。"
                        : ` 最近更新 ${formatDateLabel(selectedProject.updated_at)}。`}
                    </p>
                  </div>

                  <div className="generation-note-board__headline-actions">
                    <div className="generation-note-board__stats">
                      <span>产出笔记</span>
                      <strong>{generatedNoteTotal} 篇</strong>
                    </div>
                  </div>
                </div>

                <div className="generation-note-board__toolbar-wrap">
                  <div className="generation-note-board__toolbar">
                    <label className="generation-search">
                      <Search size={16} />
                      <input
                        value={searchKeyword}
                        onChange={(event) =>
                          setSearchKeyword(event.target.value)
                        }
                        placeholder="搜索标题、正文、标签或错误信息"
                      />
                    </label>

                    <div className="generation-filter-row">
                      {(
                        [
                          { key: "all", label: "全部" },
                          { key: "generating", label: "生成中" },
                          { key: "draft", label: "待编辑" },
                          { key: "done", label: "已完成" },
                          { key: "failed", label: "失败" },
                        ] as const
                      ).map((filter) => (
                        <button
                          key={filter.key}
                          type="button"
                          className={`generation-filter-chip ${activeFilter === filter.key ? "generation-filter-chip--active" : ""}`}
                          onClick={() => setActiveFilter(filter.key)}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="generation-note-board__subline">
                    <span>对标笔记 {activeBenchmarkCount} 篇</span>
                    <span>
                      项目方案书{" "}
                      {projectDetailQuery.data?.config?.brief_url
                        ? "已上传"
                        : "未上传"}
                    </span>
                    <span>
                      运行频率{" "}
                      {generateIntervalMin
                        ? `每 ${generateIntervalMin} 分钟`
                        : "未配置"}
                    </span>
                    <span>
                      {selectedProject.status === "running"
                        ? "运行中项目会自动轮询结果"
                        : "修改项目资料不会影响历史产出"}
                    </span>
                  </div>
                </div>

                <div className="generation-note-list">
                  {generatedNoteQuery.isLoading ? (
                    <article className="generation-empty-result">
                      <RefreshCw size={18} className="generation-spin" />
                      <strong>正在加载产出笔记</strong>
                      <p>先把当前项目的真实生成结果取回来。</p>
                    </article>
                  ) : generatedNoteQuery.isError ? (
                    <article className="generation-empty-result">
                      <Sparkles size={18} />
                      <strong>产出笔记加载失败</strong>
                      <p>
                        {generatedNoteQuery.error.message ||
                          "暂时无法获取结果列表，请稍后重试。"}
                      </p>
                      <button
                        type="button"
                        className="generation-button generation-button--ghost"
                        onClick={() => generatedNoteQuery.refetch()}
                      >
                        <RefreshCw size={16} />
                        重试
                      </button>
                    </article>
                  ) : generatedNotes.length ? (
                    generatedNotes.map((note) => {
                      const noteStatus = noteStatusMeta[note.status];
                      const displayTags = note.tags?.filter(Boolean) ?? [];
                      const displayImages = getGeneratedNoteImages(note);
                      const coverImage = getGeneratedNoteCoverImage(note);
                      const visibleTags = displayTags.slice(0, 3);
                      const extraTagCount = Math.max(
                        displayTags.length - visibleTags.length,
                        0,
                      );

                      return (
                        <article
                          key={note.id}
                          className="generation-note-card"
                          role="button"
                          tabIndex={0}
                          onClick={() => openGeneratedNoteDetail(note)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              openGeneratedNoteDetail(note);
                            }
                          }}
                        >
                          <div className="generation-note-card__cover">
                            {coverImage ? (
                              <img
                                src={coverImage}
                                alt={`${getGeneratedNoteTitle(note)} 封面`}
                              />
                            ) : (
                              <div className="generation-note-card__cover-empty">
                                <Image size={18} />
                                <span>暂无封面</span>
                              </div>
                            )}

                            <div className="generation-note-card__cover-top">
                              <span
                                className={`generation-status ${noteStatus.className}`}
                              >
                                {note.status === "generating" && (
                                  <RefreshCw
                                    size={12}
                                    className="generation-spin"
                                  />
                                )}
                                {noteStatus.label}
                              </span>

                              {!!displayImages.length && (
                                <span className="generation-note-card__cover-count">
                                  {displayImages.length} 图
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="generation-note-card__main">
                            <div className="generation-note-card__copy">
                              <h3>{getGeneratedNoteTitle(note)}</h3>
                              <div className="generation-note-card__body">
                                {getGeneratedNoteSummary(note)}
                              </div>
                            </div>

                            <div className="generation-note-card__footer">
                              <div className="generation-note-card__tags">
                                {visibleTags.length ? (
                                  <>
                                    {visibleTags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="generation-note-card__tag"
                                      >
                                        #{tag}
                                      </span>
                                    ))}
                                    {extraTagCount > 0 && (
                                      <span className="generation-note-card__tag generation-note-card__tag--muted">
                                        +{extraTagCount}
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <span className="generation-note-card__empty">
                                    暂无标签
                                  </span>
                                )}
                              </div>

                              <div className="generation-note-card__actions">
                                <span className="generation-note-card__time">
                                  {formatDateLabel(note.created_at)}
                                </span>
                                <button
                                  type="button"
                                  className="generation-button generation-button--ghost"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    openGeneratedNoteDetail(note);
                                  }}
                                >
                                  查看
                                </button>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })
                  ) : (
                    <article className="generation-empty-result">
                      <Sparkles size={18} />
                      <strong>
                        {activeFilter !== "all" || searchKeyword.trim()
                          ? "当前筛选条件下还没有结果"
                          : "当前项目还没有产出笔记"}
                      </strong>
                      <p>
                        {activeFilter !== "all" || searchKeyword.trim()
                          ? "换一个筛选项，或者清空搜索词后再看。"
                          : selectedProject.status === "running"
                            ? "项目运行后，后台会按生成间隔自动创建新记录。"
                            : "把项目切到运行中后，后台才会按配置自动生成笔记。"}
                      </p>
                    </article>
                  )}
                </div>

                {generatedNoteTotalPages > 1 && (
                  <div className="generation-picker-pagination">
                    <button
                      type="button"
                      className="generation-button generation-button--ghost"
                      onClick={() =>
                        setGeneratedNotePage((current) =>
                          Math.max(current - 1, 1),
                        )
                      }
                      disabled={
                        generatedNotePage <= 1 || generatedNoteQuery.isFetching
                      }
                    >
                      上一页
                    </button>
                    <span className="generation-picker-pagination__status">
                      第 {generatedNotePage} / {generatedNoteTotalPages} 页
                    </span>
                    <button
                      type="button"
                      className="generation-button generation-button--ghost"
                      onClick={() =>
                        setGeneratedNotePage((current) =>
                          Math.min(current + 1, generatedNoteTotalPages),
                        )
                      }
                      disabled={
                        generatedNotePage >= generatedNoteTotalPages ||
                        generatedNoteQuery.isFetching
                      }
                    >
                      下一页
                    </button>
                  </div>
                )}
              </section>
            )}
          </div>
        )}
      </section>

      {isWizardOpen && (
        <div className="generation-overlay">
          <div className="generation-mask" onClick={closeWizard} />
          <section className="generation-dialog generation-dialog--wizard">
            <header className="generation-dialog__header">
              <div>
                <span className="generation-badge">新建项目引导</span>
                <h2>{setupSteps[wizardStep - 1].title}</h2>
                <p>{setupSteps[wizardStep - 1].description}</p>
              </div>

              <button
                type="button"
                className="generation-icon-button"
                onClick={closeWizard}
                aria-label="关闭新建项目引导"
              >
                <X size={16} />
              </button>
            </header>

            <div className="generation-step-tabs">
              {setupSteps.map((step) => {
                const isActive = step.id === wizardStep;
                const isDone = step.id < wizardStep;

                return (
                  <button
                    key={step.id}
                    type="button"
                    className={`generation-step-tab ${isActive ? "generation-step-tab--active" : ""} ${isDone ? "generation-step-tab--done" : ""}`}
                    onClick={() => setWizardStep(step.id)}
                  >
                    <span className="generation-step-tab__index">
                      {isDone ? <Check size={14} /> : step.id}
                    </span>
                    <span>{step.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="generation-progress">
              <div
                className="generation-progress__bar"
                style={{ width: `${(wizardStep / setupSteps.length) * 100}%` }}
              />
            </div>

            <div className="generation-dialog__body">
              {wizardStep === 1 && (
                <div className="generation-wizard-panel">
                  <div className="generation-field-grid">
                    <label className="generation-field">
                      <span>项目名称</span>
                      <input
                        className="generation-input"
                        value={setupDraft.name}
                        onChange={(event) =>
                          setSetupDraft((current) => ({
                            ...current,
                            name: event.target.value,
                          }))
                        }
                        placeholder="例如：某效率 App 春季推广"
                        maxLength={200}
                      />
                    </label>
                  </div>

                  <div className="generation-surface-card">
                    <div className="generation-surface-card__head">
                      <FileStack size={18} />
                      <strong>项目方案书</strong>
                    </div>

                    <input
                      ref={briefFileRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.md,.pptx"
                      style={{ display: "none" }}
                      onChange={(event) => {
                        const file = event.target.files?.[0] ?? null;
                        if (!file) {
                          return;
                        }

                        setBriefFile(file);
                        uploadFileMutation.mutate(file, {
                          onSuccess: (data) => {
                            setBriefUploadedUrl(data.url);
                            toast.success("方案书上传成功");
                          },
                        });
                      }}
                    />

                    {briefFile ? (
                      <div className="generation-upload-card generation-upload-card--done">
                        <div className="generation-upload-card__info">
                          <FileStack size={16} />
                          <strong>{briefFile.name}</strong>
                          <span>({(briefFile.size / 1024).toFixed(0)} KB)</span>
                          {uploadFileMutation.isPending && (
                            <span>
                              <RefreshCw
                                size={14}
                                className="generation-spin"
                              />
                              上传中
                            </span>
                          )}
                          {briefUploadedUrl && <span>已上传</span>}
                        </div>
                        <button
                          type="button"
                          className="generation-button generation-button--ghost"
                          onClick={() => {
                            setBriefFile(null);
                            setBriefUploadedUrl("");
                            if (briefFileRef.current) {
                              briefFileRef.current.value = "";
                            }
                          }}
                          disabled={uploadFileMutation.isPending}
                        >
                          <X size={14} />
                          移除
                        </button>
                      </div>
                    ) : (
                      <div
                        className="generation-upload-card"
                        onClick={() => briefFileRef.current?.click()}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            briefFileRef.current?.click();
                          }
                        }}
                      >
                        <Upload size={20} />
                        <div>点击上传方案书</div>
                        <p>支持 PDF、Word、PPT、TXT、Markdown 格式</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="generation-wizard-panel">
                  <div className="generation-surface-card">
                    <div className="generation-surface-card__head">
                      <div>
                        <strong>已选对标笔记</strong>
                        <p>
                          从采集笔记模块里勾选，创建项目后会自动挂到当前项目下。
                        </p>
                      </div>
                      <button
                        type="button"
                        className="generation-button generation-button--ghost"
                        onClick={() => openBenchmarkPicker("wizard")}
                      >
                        <Plus size={16} />
                        选择对标笔记
                      </button>
                    </div>

                    <div className="generation-selection-summary">
                      <strong>{setupDraft.benchmarkNoteIds.length} 篇</strong>
                      <span>
                        {setupDraft.benchmarkNoteIds.length
                          ? "已从采集笔记中选择参考内容"
                          : "当前还没有选择对标笔记，可跳过后续再补"}
                      </span>
                    </div>
                  </div>

                  <div className="generation-reference-list">
                    {setupDraft.benchmarkNoteIds.length ? (
                      setupDraft.benchmarkNoteIds.map((noteId, index) => (
                        <article
                          key={noteId}
                          className="generation-reference-card"
                        >
                          <div className="generation-reference-card__thumb">
                            #{index + 1}
                          </div>
                          <div>
                            <strong>已勾选采集笔记 #{noteId}</strong>
                            <p>
                              如需查看正文和图片，请点击上方“选择对标笔记”进入选择器。
                            </p>
                          </div>
                        </article>
                      ))
                    ) : (
                      <article className="generation-reference-card">
                        <div className="generation-reference-card__thumb">
                          空
                        </div>
                        <div>
                          <strong>支持跳过这一步</strong>
                          <p>
                            创建项目后仍然可以在项目设置弹框里继续补参考内容。
                          </p>
                        </div>
                      </article>
                    )}
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="generation-wizard-panel">
                  <div className="generation-surface-card">
                    <div className="generation-surface-card__head">
                      <ImagePlus size={18} />
                      <strong>推广资料上传区</strong>
                    </div>
                    <input
                      ref={wizardReferenceFileRef}
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleWizardReferenceFileChange}
                    />

                    <div
                      className="generation-upload-card"
                      onClick={() => wizardReferenceFileRef.current?.click()}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          wizardReferenceFileRef.current?.click();
                        }
                      }}
                    >
                      {isReferenceUploading ? (
                        <>
                          <RefreshCw size={20} className="generation-spin" />
                          <div>正在上传项目资料...</div>
                        </>
                      ) : (
                        <>
                          <Upload size={20} />
                          <div>点击上传参考图片</div>
                          <p>
                            支持产品图、Logo
                            图、应用截图、评论图、活动海报等图片资料。
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {setupDraft.referenceAssets.length ? (
                    <div className="generation-reference-asset-list">
                      {setupDraft.referenceAssets.map((asset, index) => (
                        <ReferenceAssetCard
                          key={asset.localId}
                          asset={asset}
                          index={index}
                          onNameChange={(value) =>
                            updateSetupReferenceAsset(
                              asset.localId,
                              (current) => ({
                                ...current,
                                name: value,
                              }),
                            )
                          }
                          onTypeChange={(value) =>
                            updateSetupReferenceAsset(
                              asset.localId,
                              (current) => ({
                                ...current,
                                assetType: value,
                              }),
                            )
                          }
                          onRemove={() =>
                            removeSetupReferenceAsset(asset.localId)
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="generation-inline-feedback generation-inline-feedback--large">
                      <ImagePlus size={16} />
                      上传后的资料会显示在这里，支持修改名称和类型。
                    </div>
                  )}

                  <label className="generation-field">
                    <span>补充说明</span>
                    <textarea
                      className="generation-textarea"
                      value={setupDraft.assetNote}
                      onChange={(event) =>
                        setSetupDraft((current) => ({
                          ...current,
                          assetNote: event.target.value,
                        }))
                      }
                    />
                  </label>
                </div>
              )}

              {wizardStep === 4 && (
                <div className="generation-wizard-panel">
                  <div className="generation-field-grid">
                    <RuleListEditor
                      label="核心表达"
                      placeholder="例如：立即下载应用、内容见评论区"
                      suggestions={coreExpressionSuggestions}
                      values={setupDraft.coreExpressions}
                      inputValue={wizardCoreExpressionInput}
                      onInputChange={setWizardCoreExpressionInput}
                      onAdd={() =>
                        addWizardRuleItem(
                          "coreExpressions",
                          wizardCoreExpressionInput,
                          () => setWizardCoreExpressionInput(""),
                        )
                      }
                      onSuggestionClick={(value) =>
                        addWizardRuleItem("coreExpressions", value, () => {})
                      }
                      onRemove={(value) =>
                        removeWizardRuleItem("coreExpressions", value)
                      }
                    />

                    <RuleListEditor
                      label="指定 Tags"
                      placeholder="例如：机械键盘、桌搭分享、办公效率"
                      suggestions={[]}
                      values={setupDraft.specifiedTags}
                      inputValue={wizardSpecifiedTagInput}
                      onInputChange={setWizardSpecifiedTagInput}
                      onAdd={() =>
                        addWizardRuleItem(
                          "specifiedTags",
                          wizardSpecifiedTagInput,
                          () => setWizardSpecifiedTagInput(""),
                        )
                      }
                      onSuggestionClick={() => {}}
                      onRemove={(value) =>
                        removeWizardRuleItem("specifiedTags", value)
                      }
                    />

                    <RuleListEditor
                      label="违禁词"
                      placeholder="例如：最强、全网第一、保证有效"
                      suggestions={forbiddenTermSuggestions}
                      values={setupDraft.forbiddenTerms}
                      inputValue={wizardForbiddenTermInput}
                      onInputChange={setWizardForbiddenTermInput}
                      onAdd={() =>
                        addWizardRuleItem(
                          "forbiddenTerms",
                          wizardForbiddenTermInput,
                          () => setWizardForbiddenTermInput(""),
                        )
                      }
                      onSuggestionClick={(value) =>
                        addWizardRuleItem("forbiddenTerms", value, () => {})
                      }
                      onRemove={(value) =>
                        removeWizardRuleItem("forbiddenTerms", value)
                      }
                    />
                  </div>
                </div>
              )}

              {wizardStep === 5 && (
                <div className="generation-wizard-panel generation-wizard-panel--summary">
                  <article className="generation-summary-list-card">
                    <div className="generation-summary-list-card__head">
                      <strong>项目准备完成</strong>
                      <p>
                        项目创建后会自动关联方案书和已勾选的对标笔记，其余设置继续作为结构占位保留。
                      </p>
                    </div>

                    <div className="generation-step-list">
                      <article className="generation-step-card generation-step-card--summary">
                        <div className="generation-step-card__index">项</div>
                        <div>
                          <strong>{setupDraft.name || "未填写项目名称"}</strong>
                          <p>
                            {briefFile
                              ? `方案书：${briefFile.name}`
                              : "未上传方案书"}
                          </p>
                        </div>
                      </article>

                      <article className="generation-step-card generation-step-card--summary">
                        <div className="generation-step-card__index">标</div>
                        <div>
                          <strong>
                            对标笔记 {setupDraft.benchmarkNoteIds.length} 篇
                          </strong>
                          <p>
                            {setupDraft.benchmarkNoteIds.length
                              ? "创建完成后会自动保存到项目配置里。"
                              : "暂未选择，可在项目设置中继续补充。"}
                          </p>
                        </div>
                      </article>

                      <article className="generation-step-card generation-step-card--summary">
                        <div className="generation-step-card__index">资</div>
                        <div>
                          <strong>
                            参考资料 {setupDraft.referenceAssets.length} 张
                          </strong>
                          <p>
                            {setupDraft.referenceAssets.length
                              ? "创建完成后会把资料类型、名称和图片地址一起挂到项目下。"
                              : "暂未上传资料，可在项目设置中继续补充。"}
                          </p>
                        </div>
                      </article>

                      <article className="generation-step-card generation-step-card--summary">
                        <div className="generation-step-card__index">风</div>
                        <div>
                          <strong>
                            表达规则 {setupDraft.coreExpressions.length} 条 /
                            指定 Tags {setupDraft.specifiedTags.length} 条 /
                            违禁词 {setupDraft.forbiddenTerms.length} 条
                          </strong>
                          <p>创建完成后会保存到项目配置，并参与后续生成。</p>
                        </div>
                      </article>
                    </div>
                  </article>

                  <article className="generation-surface-card">
                    <strong>下一步主动作</strong>
                    <p>
                      完成创建后直接进入项目工作台，后续资料维护和结果管理都在同一页完成。
                    </p>
                  </article>
                </div>
              )}
            </div>

            <footer className="generation-dialog__footer">
              <div className="generation-dialog__footer-group">
                <button
                  type="button"
                  className="generation-button generation-button--ghost"
                  onClick={handleWizardBack}
                  disabled={wizardStep === 1 || createProjectMutation.isPending}
                >
                  <ChevronLeft size={16} />
                  上一步
                </button>
                <button
                  type="button"
                  className="generation-button generation-button--ghost"
                  onClick={closeWizard}
                  disabled={createProjectMutation.isPending}
                >
                  关闭
                </button>
              </div>

              <div className="generation-dialog__footer-group">
                {wizardStep >= 2 && wizardStep < 5 && (
                  <button
                    type="button"
                    className="generation-button generation-button--ghost"
                    onClick={handleWizardSkip}
                    disabled={createProjectMutation.isPending}
                  >
                    跳过
                  </button>
                )}
                <button
                  type="button"
                  className="generation-button generation-button--primary"
                  onClick={handleWizardNext}
                  disabled={
                    !canProceedWizard || createProjectMutation.isPending
                  }
                >
                  {createProjectMutation.isPending ? (
                    <>
                      <RefreshCw size={16} className="generation-spin" />
                      创建中
                    </>
                  ) : wizardStep === 5 ? (
                    <>
                      进入项目工作台
                      <ArrowRight size={16} />
                    </>
                  ) : (
                    <>
                      下一步
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </footer>
          </section>
        </div>
      )}

      {isSettingsOpen && selectedProject && (
        <div className="generation-overlay">
          <div
            className="generation-mask generation-mask--light"
            onClick={closeSettings}
          />
          <section className="generation-dialog generation-dialog--settings">
            <header className="generation-dialog__header">
              <div>
                <span className="generation-badge">项目设置</span>
                <div className="generation-settings-header-title">
                  {isEditingProjectName ? (
                    <>
                      <input
                        className="generation-input generation-settings-name-input"
                        value={settingsDraft.name}
                        onChange={(event) =>
                          setSettingsDraft((current) => ({
                            ...current,
                            name: event.target.value,
                          }))
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            void handleSaveProjectName();
                          }
                          if (event.key === "Escape") {
                            handleCancelProjectNameEdit();
                          }
                        }}
                        placeholder="请输入项目名称"
                        maxLength={200}
                        autoFocus
                      />
                      <button
                        type="button"
                        className="generation-settings-name-edit"
                        onClick={() => void handleSaveProjectName()}
                        disabled={renameProjectMutation.isPending}
                        aria-label="保存项目名称"
                      >
                        {renameProjectMutation.isPending ? (
                          <RefreshCw size={14} className="generation-spin" />
                        ) : (
                          <Check size={14} />
                        )}
                      </button>
                      <button
                        type="button"
                        className="generation-settings-name-edit"
                        onClick={handleCancelProjectNameEdit}
                        disabled={renameProjectMutation.isPending}
                        aria-label="取消编辑项目名称"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <h2>{settingsDraft.name || selectedProject.name}</h2>
                      <button
                        type="button"
                        className="generation-settings-name-edit"
                        onClick={() => setIsEditingProjectName(true)}
                        aria-label="编辑项目名称"
                      >
                        <PenSquare size={14} />
                      </button>
                    </>
                  )}
                </div>
                <p>
                  在一个弹框里集中调整方案书、对标笔记、项目素材和自动生成配置。
                </p>
              </div>

              <button
                type="button"
                className="generation-icon-button"
                onClick={closeSettings}
                aria-label="关闭项目设置"
              >
                <X size={16} />
              </button>
            </header>

            <div className="generation-dialog__body generation-dialog__body--drawer">
              <div className="generation-settings-shell">
                <aside className="generation-settings-sidebar">
                  <nav className="generation-settings-nav">
                    {settingsSections.map((section) => (
                      <button
                        key={section.key}
                        type="button"
                        className={`generation-settings-nav__item ${activeSettingsSection === section.key ? "generation-settings-nav__item--active" : ""}`}
                        onClick={() => setActiveSettingsSection(section.key)}
                      >
                        <span className="generation-settings-nav__icon">
                          <section.icon size={16} />
                        </span>
                        <span className="generation-settings-nav__copy">
                          <strong>{section.label}</strong>
                          <small>{section.description}</small>
                        </span>
                      </button>
                    ))}
                  </nav>
                </aside>

                <div className="generation-settings-content">
                  {activeSettingsSection === "runtime" && (
                    <section className="generation-settings-panel">
                      <header className="generation-settings-panel__header">
                        <div>
                          <h3>运行配置</h3>
                          <p>控制项目是否自动产出笔记，以及产出频率。</p>
                        </div>
                      </header>

                      <div className="generation-surface-card">
                        <div className="generation-surface-card__head">
                          <div>
                            <strong>项目运行状态</strong>
                            <p>
                              启动后会持续自动产出笔记；暂停后停止自动产出。
                            </p>
                          </div>
                        </div>

                        <div className="generation-segment-row">
                          {(
                            [
                              {
                                key: "running" as const,
                                label: "启动",
                                icon: Play,
                                description: "允许后台自动生成",
                              },
                              {
                                key: "paused" as const,
                                label: "暂停",
                                icon: Pause,
                                description: "停止自动生成",
                              },
                            ] as const
                          ).map((item) => (
                            <button
                              key={item.key}
                              type="button"
                              className={`generation-segment-card ${settingsDraft.projectStatus === item.key ? "generation-segment-card--active" : ""}`}
                              onClick={() =>
                                setSettingsDraft((current) => ({
                                  ...current,
                                  projectStatus: item.key,
                                }))
                              }
                            >
                              <span className="generation-segment-card__icon">
                                <item.icon size={16} />
                              </span>
                              <strong>{item.label}</strong>
                              <small>{item.description}</small>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="generation-surface-card">
                        <div className="generation-surface-card__head">
                          <div>
                            <strong>运行频率</strong>
                            <p>设置后，系统会按这个频率持续产出新笔记。</p>
                          </div>
                        </div>

                        <div className="generation-field-grid generation-field-grid--interval">
                          <label className="generation-field">
                            <span>每</span>
                            <div className="generation-input-group">
                              <input
                                className="generation-input"
                                type="number"
                                min={1}
                                step={1}
                                value={settingsDraft.generateIntervalMin}
                                onChange={(event) =>
                                  setSettingsDraft((current) => ({
                                    ...current,
                                    generateIntervalMin: event.target.value,
                                  }))
                                }
                                placeholder="60"
                              />
                              <span className="generation-input-group__suffix">
                                分钟
                              </span>
                            </div>
                            <small className="generation-field__hint">
                              例如：每 30 分钟产出一篇笔记。
                            </small>
                          </label>
                        </div>
                      </div>
                    </section>
                  )}

                  {activeSettingsSection === "brief" && (
                    <section className="generation-settings-panel">
                      <header className="generation-settings-panel__header">
                        <div>
                          <h3>项目方案书</h3>
                          <p>维护当前项目的方案书文件和解析结果。</p>
                        </div>
                      </header>

                      <div className="generation-surface-card">
                        <label className="generation-field">
                          <span>项目核心创作主题</span>
                          <input
                            className="generation-input"
                            value={settingsDraft.creativeTheme}
                            onChange={(event) =>
                              setSettingsDraft((current) => ({
                                ...current,
                                creativeTheme: event.target.value,
                              }))
                            }
                            placeholder="例如：狼蛛机械键盘推广、悟空浏览器 Web 端推广"
                            maxLength={255}
                          />
                          <small className="generation-field__hint">
                            这个主题会和方案书内容一起进入项目上下文，影响后续生成。
                          </small>
                        </label>
                      </div>

                      <div className="generation-surface-card">
                        <div className="generation-surface-card__head">
                          <div>
                            <strong>方案书文件</strong>
                            <p>支持 PDF、Word、PPT、TXT、Markdown 格式。</p>
                          </div>
                        </div>

                        {projectDetailQuery.data?.config?.brief_url ? (
                          <div className="generation-upload-card generation-upload-card--done">
                            <div className="generation-upload-card__info">
                              <FileStack size={16} />
                              <strong>方案书已上传</strong>
                              {projectDetailQuery.data?.config
                                ?.brief_content && <span>已解析</span>}
                            </div>
                            <button
                              type="button"
                              className="generation-button generation-button--ghost"
                              onClick={() => {
                                const input = document.createElement("input");
                                input.type = "file";
                                input.accept = ".pdf,.doc,.docx,.txt,.md,.pptx";
                                input.onchange = (event) => {
                                  const file = (
                                    event.target as HTMLInputElement
                                  ).files?.[0];
                                  if (!file) {
                                    return;
                                  }
                                  uploadBriefMutation.mutate({
                                    projectId: selectedProject.id,
                                    file,
                                  });
                                };
                                input.click();
                              }}
                              disabled={
                                uploadFileMutation.isPending ||
                                uploadBriefMutation.isPending
                              }
                            >
                              {uploadFileMutation.isPending ||
                              uploadBriefMutation.isPending ? (
                                <>
                                  <RefreshCw
                                    size={14}
                                    className="generation-spin"
                                  />
                                  上传中
                                </>
                              ) : (
                                "重新上传"
                              )}
                            </button>
                          </div>
                        ) : (
                          <div
                            className="generation-upload-card"
                            onClick={() => {
                              const input = document.createElement("input");
                              input.type = "file";
                              input.accept = ".pdf,.doc,.docx,.txt,.md,.pptx";
                              input.onchange = (event) => {
                                const file = (event.target as HTMLInputElement)
                                  .files?.[0];
                                if (!file) {
                                  return;
                                }
                                uploadBriefMutation.mutate({
                                  projectId: selectedProject.id,
                                  file,
                                });
                              };
                              input.click();
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.currentTarget.click();
                              }
                            }}
                          >
                            {uploadFileMutation.isPending ||
                            uploadBriefMutation.isPending ? (
                              <>
                                <RefreshCw
                                  size={20}
                                  className="generation-spin"
                                />
                                <div>正在上传并解析...</div>
                              </>
                            ) : (
                              <>
                                <Upload size={20} />
                                <div>点击上传方案书</div>
                                <p>支持 PDF、Word、PPT、TXT、Markdown 格式</p>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </section>
                  )}

                  {activeSettingsSection === "benchmark" && (
                    <section className="generation-settings-panel">
                      <header className="generation-settings-panel__header">
                        <div>
                          <h3>对标笔记</h3>
                        </div>
                        <button
                          type="button"
                          className="generation-button generation-button--ghost"
                          onClick={() => openBenchmarkPicker("settings")}
                          disabled={projectDetailQuery.isLoading}
                        >
                          <Plus size={16} />
                          选择对标笔记
                        </button>
                      </header>

                      {projectDetailQuery.isLoading ? (
                        <div className="generation-inline-feedback">
                          <RefreshCw size={16} className="generation-spin" />
                          正在加载项目关联笔记...
                        </div>
                      ) : benchmarkNotes.length ? (
                        <div className="generation-reference-list">
                          {benchmarkNotes.map((item) => (
                            <ProjectBenchmarkCard
                              key={`${item.relation_id}-${item.collected_note_id}`}
                              item={item}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="generation-inline-feedback generation-inline-feedback--large">
                          <Sparkles size={16} />
                          当前还没有关联对标笔记
                        </div>
                      )}
                    </section>
                  )}

                  {activeSettingsSection === "assets" && (
                    <section className="generation-settings-panel">
                      <header className="generation-settings-panel__header">
                        <div>
                          <h3>推广资料</h3>
                          <p>
                            上传后会自动入库。修改资料名称、类型或删除资料时也会自动同步。
                          </p>
                        </div>
                      </header>

                      <div className="generation-surface-card">
                        <input
                          ref={settingsReferenceFileRef}
                          type="file"
                          accept="image/*"
                          multiple
                          style={{ display: "none" }}
                          onChange={handleSettingsReferenceFileChange}
                        />

                        <div
                          className="generation-upload-card"
                          onClick={() =>
                            settingsReferenceFileRef.current?.click()
                          }
                          role="button"
                          tabIndex={0}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              settingsReferenceFileRef.current?.click();
                            }
                          }}
                        >
                          {isReferenceUploading ? (
                            <>
                              <RefreshCw
                                size={20}
                                className="generation-spin"
                              />
                              <div>正在上传项目资料...</div>
                            </>
                          ) : (
                            <>
                              <Upload size={20} />
                              <div>点击继续上传参考图片</div>
                              <p>
                                支持多图上传。每张资料都可以独立修改名称和类型。
                              </p>
                            </>
                          )}
                        </div>
                      </div>

                      {projectDetailQuery.isLoading &&
                      !settingsReferenceAssets.length ? (
                        <div className="generation-inline-feedback">
                          <RefreshCw size={16} className="generation-spin" />
                          正在加载项目参考资料...
                        </div>
                      ) : settingsReferenceAssets.length ? (
                        <div className="generation-reference-asset-list">
                          {settingsReferenceAssets.map((asset, index) => (
                            <ReferenceAssetCard
                              key={asset.localId}
                              asset={asset}
                              index={index}
                              onNameChange={(value) =>
                                updateSettingsReferenceAsset(
                                  asset.localId,
                                  (current) => ({
                                    ...current,
                                    name: value,
                                  }),
                                  "debounced",
                                )
                              }
                              onTypeChange={(value) =>
                                updateSettingsReferenceAsset(
                                  asset.localId,
                                  (current) => ({
                                    ...current,
                                    assetType: value,
                                  }),
                                  "immediate",
                                )
                              }
                              onRemove={() =>
                                removeSettingsReferenceAsset(asset.localId)
                              }
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="generation-inline-feedback generation-inline-feedback--large">
                          <ImagePlus size={16} />
                          当前还没有上传项目参考资料
                        </div>
                      )}
                    </section>
                  )}

                  {activeSettingsSection === "messaging" && (
                    <section className="generation-settings-panel">
                      <header className="generation-settings-panel__header">
                        <div>
                          <h3>表达规则</h3>
                          <p>
                            逐条维护核心表达、指定 Tags 和违禁词。指定 Tags
                            会在生成时强制使用，并排在最前面。
                          </p>
                        </div>
                      </header>

                      <div className="generation-field-grid">
                        <RuleListEditor
                          label="核心表达"
                          placeholder="例如：立即下载应用、内容见评论区"
                          suggestions={coreExpressionSuggestions}
                          values={settingsDraft.coreExpressions}
                          inputValue={settingsCoreExpressionInput}
                          onInputChange={setSettingsCoreExpressionInput}
                          onAdd={() =>
                            addSettingsRuleItem(
                              "coreExpressions",
                              settingsCoreExpressionInput,
                              () => setSettingsCoreExpressionInput(""),
                            )
                          }
                          onSuggestionClick={(value) =>
                            addSettingsRuleItem(
                              "coreExpressions",
                              value,
                              () => {},
                            )
                          }
                          onRemove={(value) =>
                            removeSettingsRuleItem("coreExpressions", value)
                          }
                        />

                        <RuleListEditor
                          label="指定 Tags"
                          placeholder="例如：机械键盘、桌搭分享、办公效率"
                          suggestions={[]}
                          values={settingsDraft.specifiedTags}
                          inputValue={settingsSpecifiedTagInput}
                          onInputChange={setSettingsSpecifiedTagInput}
                          onAdd={() =>
                            addSettingsRuleItem(
                              "specifiedTags",
                              settingsSpecifiedTagInput,
                              () => setSettingsSpecifiedTagInput(""),
                            )
                          }
                          onSuggestionClick={() => {}}
                          onRemove={(value) =>
                            removeSettingsRuleItem("specifiedTags", value)
                          }
                        />

                        <RuleListEditor
                          label="违禁词"
                          placeholder="例如：最强、全网第一、保证有效"
                          suggestions={forbiddenTermSuggestions}
                          values={settingsDraft.forbiddenTerms}
                          inputValue={settingsForbiddenTermInput}
                          onInputChange={setSettingsForbiddenTermInput}
                          onAdd={() =>
                            addSettingsRuleItem(
                              "forbiddenTerms",
                              settingsForbiddenTermInput,
                              () => setSettingsForbiddenTermInput(""),
                            )
                          }
                          onSuggestionClick={(value) =>
                            addSettingsRuleItem(
                              "forbiddenTerms",
                              value,
                              () => {},
                            )
                          }
                          onRemove={(value) =>
                            removeSettingsRuleItem("forbiddenTerms", value)
                          }
                        />
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>

            <footer className="generation-dialog__footer generation-dialog__footer--drawer">
              <div className="generation-dialog__footer-group">
                <button
                  type="button"
                  className="generation-button generation-button--ghost generation-button--danger"
                  onClick={() => {
                    void handleDeleteProject();
                  }}
                  disabled={
                    deleteProjectMutation.isPending ||
                    updateProjectConfigMutation.isPending ||
                    updateProjectStatusMutation.isPending ||
                    updateReferenceAssetsMutation.isPending ||
                    isReferenceUploading
                  }
                >
                  {deleteProjectMutation.isPending ? (
                    <>
                      <RefreshCw size={16} className="generation-spin" />
                      删除中
                    </>
                  ) : (
                    "删除项目"
                  )}
                </button>
              </div>

              <div className="generation-dialog__footer-group">
                <button
                  type="button"
                  className="generation-button generation-button--ghost"
                  onClick={closeSettings}
                  disabled={
                    deleteProjectMutation.isPending ||
                    updateProjectConfigMutation.isPending ||
                    updateProjectStatusMutation.isPending ||
                    updateReferenceAssetsMutation.isPending ||
                    isReferenceUploading
                  }
                >
                  取消
                </button>
                <button
                  type="button"
                  className="generation-button generation-button--primary"
                  onClick={
                    isAssetSettingsSection
                      ? closeSettings
                      : isBriefSettingsSection
                        ? handleSaveBriefSettings
                        : isMessagingSettingsSection
                          ? handleSaveMessagingSettings
                          : isRuntimeSettingsSection
                            ? handleSaveSettings
                            : closeSettings
                  }
                  disabled={
                    isAssetSettingsSection
                      ? deleteProjectMutation.isPending ||
                        updateReferenceAssetsMutation.isPending ||
                        isReferenceUploading
                      : isBriefSettingsSection
                        ? deleteProjectMutation.isPending ||
                          updateProjectConfigMutation.isPending
                        : isMessagingSettingsSection
                          ? deleteProjectMutation.isPending ||
                            updateProjectConfigMutation.isPending
                          : isRuntimeSettingsSection
                            ? deleteProjectMutation.isPending ||
                              updateProjectConfigMutation.isPending ||
                              updateProjectStatusMutation.isPending
                            : deleteProjectMutation.isPending
                  }
                >
                  {(
                    isAssetSettingsSection
                      ? deleteProjectMutation.isPending ||
                        updateReferenceAssetsMutation.isPending ||
                        isReferenceUploading
                      : isBriefSettingsSection
                        ? deleteProjectMutation.isPending ||
                          updateProjectConfigMutation.isPending
                        : isMessagingSettingsSection
                          ? deleteProjectMutation.isPending ||
                            updateProjectConfigMutation.isPending
                          : isRuntimeSettingsSection
                            ? deleteProjectMutation.isPending ||
                              updateProjectConfigMutation.isPending ||
                              updateProjectStatusMutation.isPending
                            : deleteProjectMutation.isPending
                  ) ? (
                    <>
                      <RefreshCw size={16} className="generation-spin" />
                      {isAssetSettingsSection ? "同步中" : "保存中"}
                    </>
                  ) : isAssetSettingsSection ? (
                    "完成"
                  ) : isBriefSettingsSection ? (
                    "保存方案配置"
                  ) : isMessagingSettingsSection ? (
                    "保存表达规则"
                  ) : isRuntimeSettingsSection ? (
                    "保存运行配置"
                  ) : (
                    "完成"
                  )}
                </button>
              </div>
            </footer>
          </section>
        </div>
      )}

      {selectedGeneratedNote && selectedGeneratedNoteStatus && (
        <div className="generation-overlay">
          <div
            className="generation-mask generation-mask--light"
            onClick={closeGeneratedNoteDetail}
          />
          <section className="generation-dialog generation-dialog--note-detail">
            <header className="generation-dialog__header generation-dialog__header--note-detail">
              <div>
                <span className="generation-badge">笔记详情</span>
              </div>

              <button
                type="button"
                className="generation-icon-button"
                onClick={closeGeneratedNoteDetail}
                aria-label="关闭笔记详情"
              >
                <X size={16} />
              </button>
            </header>

            <div className="generation-dialog__body generation-dialog__body--note-detail">
              <div className="generation-note-detail">
                <div className="generation-note-detail__media">
                  <div className="generation-note-detail__preview">
                    {selectedGeneratedNoteActiveImage ? (
                      <img
                        src={selectedGeneratedNoteActiveImage}
                        alt={`${getGeneratedNoteTitle(selectedGeneratedNote)} 预览图`}
                      />
                    ) : (
                      <div className="generation-note-detail__preview-empty">
                        <Image size={24} />
                        <span>当前没有可展示图片</span>
                      </div>
                    )}
                  </div>

                  {selectedGeneratedNoteImages.length > 0 && (
                    <>
                      <div className="generation-note-detail__media-top">
                        <span className="generation-tag generation-tag--soft">
                          <Image size={12} />共{" "}
                          {selectedGeneratedNoteImages.length} 张图片
                        </span>
                        {selectedGeneratedNoteActiveImage && (
                          <a
                            className="generation-note-detail__preview-link"
                            href={selectedGeneratedNoteActiveImage}
                            target="_blank"
                            rel="noreferrer"
                          >
                            查看原图
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>

                      <div className="generation-note-detail__thumbs">
                        {selectedGeneratedNoteImages.map((image, index) => (
                          <button
                            key={`${image}-${index}`}
                            type="button"
                            className={`generation-note-detail__thumb ${index === activeGeneratedNoteImageIndex ? "generation-note-detail__thumb--active" : ""}`}
                            onClick={() =>
                              setActiveGeneratedNoteImageIndex(index)
                            }
                            aria-label={`查看第 ${index + 1} 张图片`}
                          >
                            <img
                              src={image}
                              alt={`${getGeneratedNoteTitle(selectedGeneratedNote)} 缩略图 ${index + 1}`}
                            />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="generation-note-detail__content">
                  <div className="generation-note-detail__meta">
                    <span
                      className={`generation-status ${selectedGeneratedNoteStatus.className}`}
                    >
                      {selectedGeneratedNote.status === "generating" && (
                        <RefreshCw size={12} className="generation-spin" />
                      )}
                      {selectedGeneratedNoteStatus.label}
                    </span>
                    <span className="generation-note-detail__time">
                      生成于 {formatDateLabel(selectedGeneratedNote.created_at)}
                    </span>
                  </div>

                  <section className="generation-note-detail__section">
                    <h3 className="generation-note-detail__title">
                      {getGeneratedNoteTitle(selectedGeneratedNote)}
                    </h3>
                    <div className="generation-note-detail__body">
                      {getGeneratedNoteSummary(selectedGeneratedNote)}
                    </div>
                    <div className="generation-note-detail__tags">
                      {selectedGeneratedNoteTags.length ? (
                        selectedGeneratedNoteTags.map((tag) => (
                          <span
                            key={tag}
                            className="generation-note-detail__tag"
                          >
                            #{tag}
                          </span>
                        ))
                      ) : (
                        <span className="generation-note-detail__tag generation-note-detail__tag--muted">
                          暂无标签
                        </span>
                      )}
                    </div>
                  </section>

                  {!!selectedGeneratedNote.agent_query?.trim() && (
                    <section className="generation-note-detail__section">
                      <div className="generation-note-detail__section-head">
                        <strong>本次生成 Prompt</strong>
                      </div>
                      <pre className="generation-note-detail__prompt">
                        {selectedGeneratedNote.agent_query.trim()}
                      </pre>
                    </section>
                  )}
                </div>
              </div>
            </div>

            <footer className="generation-dialog__footer generation-dialog__footer--note-detail">
              <div className="generation-dialog__footer-group">
                <span className="generation-note-detail__footer-tip">
                  这次产出的图片和正文都在这里完整展开。
                </span>
              </div>
              <div className="generation-dialog__footer-group">
                <button
                  type="button"
                  className="generation-button generation-button--ghost"
                  onClick={closeGeneratedNoteDetail}
                >
                  关闭
                </button>
              </div>
            </footer>
          </section>
        </div>
      )}

      {benchmarkPickerTarget && (
        <div className="generation-overlay">
          <div className="generation-mask" onClick={closeBenchmarkPicker} />
          <section className="generation-dialog generation-dialog--picker">
            <header className="generation-dialog__header">
              <div>
                <span className="generation-badge">选择对标笔记</span>
                <h2>从采集笔记中勾选要关联到项目的参考内容</h2>
                <p>
                  这里显示的是真实采集数据。保存后，项目配置里的对标笔记会立刻更新。
                </p>
              </div>

              <button
                type="button"
                className="generation-icon-button"
                onClick={closeBenchmarkPicker}
                aria-label="关闭对标笔记选择器"
              >
                <X size={16} />
              </button>
            </header>

            <div className="generation-dialog__body">
              <div className="generation-picker-toolbar">
                <label className="generation-search">
                  <Search size={16} />
                  <input
                    value={benchmarkKeyword}
                    onChange={(event) => {
                      setBenchmarkKeyword(event.target.value);
                      setBenchmarkPage(1);
                    }}
                    placeholder="搜索标题或正文"
                  />
                </label>

                <div className="generation-filter-row">
                  {(
                    [
                      { key: undefined, label: "全部" },
                      { key: "image" as const, label: "图文" },
                      { key: "video" as const, label: "视频" },
                    ] as const
                  ).map((filter) => (
                    <button
                      key={filter.label}
                      type="button"
                      className={`generation-filter-chip ${benchmarkNoteType === filter.key ? "generation-filter-chip--active" : ""}`}
                      onClick={() => {
                        setBenchmarkNoteType(filter.key);
                        setBenchmarkPage(1);
                      }}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="generation-selection-summary generation-selection-summary--picker">
                <strong>已选 {benchmarkSelection.length} 篇</strong>
                <span>保存后会按当前顺序写入项目关联表。</span>
              </div>

              {collectedNoteQuery.isLoading ? (
                <div className="generation-inline-feedback generation-inline-feedback--large">
                  <RefreshCw size={18} className="generation-spin" />
                  正在加载采集笔记...
                </div>
              ) : pickerNotes.length ? (
                <div className="generation-benchmark-grid">
                  {pickerNotes.map((note) => (
                    <CollectedNotePickerCard
                      key={note.id}
                      note={note}
                      selected={benchmarkSelection.includes(note.id)}
                      onToggle={() => toggleBenchmarkSelection(note.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="generation-inline-feedback generation-inline-feedback--large">
                  <Sparkles size={18} />
                  当前没有可选的采集笔记
                </div>
              )}

              {pickerTotalPages > 1 && (
                <div className="generation-picker-pagination">
                  <button
                    type="button"
                    className="generation-button generation-button--ghost"
                    onClick={() =>
                      setBenchmarkPage((current) => Math.max(current - 1, 1))
                    }
                    disabled={benchmarkPage <= 1}
                  >
                    上一页
                  </button>
                  <span>
                    {benchmarkPage} / {pickerTotalPages}
                  </span>
                  <button
                    type="button"
                    className="generation-button generation-button--ghost"
                    onClick={() =>
                      setBenchmarkPage((current) =>
                        Math.min(current + 1, pickerTotalPages),
                      )
                    }
                    disabled={benchmarkPage >= pickerTotalPages}
                  >
                    下一页
                  </button>
                </div>
              )}
            </div>

            <footer className="generation-dialog__footer">
              <div className="generation-dialog__footer-group">
                <button
                  type="button"
                  className="generation-button generation-button--ghost"
                  onClick={closeBenchmarkPicker}
                >
                  取消
                </button>
              </div>
              <div className="generation-dialog__footer-group">
                <button
                  type="button"
                  className="generation-button generation-button--primary"
                  onClick={handleApplyBenchmarkSelection}
                  disabled={updateBenchmarkNotesMutation.isPending}
                >
                  {updateBenchmarkNotesMutation.isPending ? (
                    <>
                      <RefreshCw size={16} className="generation-spin" />
                      保存中
                    </>
                  ) : (
                    <>
                      保存选择
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}
