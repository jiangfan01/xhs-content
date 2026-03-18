import { useMemo, useState } from "react";
import {
  FileText,
  Image,
  Layers3,
  ListChecks,
  PlayCircle,
  Plus,
  Settings2,
} from "lucide-react";
import "./generation.css";

type ProjectStatus = "running" | "draft" | "paused";

interface Project {
  id: string;
  name: string;
  brand: string;
  updatedAt: string;
  status: ProjectStatus;
  chips: string[];
  context: string;
  runState: string[];
  benchmarkScope: Array<{ title: string; desc: string; active?: boolean }>;
  groups: Array<{ name: string; count: string; mode: string }>;
  assets: Array<{ title: string; desc: string }>;
  copy: Array<{ label: string; value: string }>;
  strategy: Array<{ label: string; value: string }>;
  noteStats: Array<{ label: string; value: string; desc: string; live?: boolean }>;
  log: string;
  notes: Array<{ title: string; meta: string; tag: string; alert?: boolean }>;
}

const projects: Project[] = [
  {
    id: "collagen",
    name: "胶原蛋白饮主项目",
    brand: "品牌 A",
    updatedAt: "8 分钟前更新",
    status: "running",
    chips: ["运行中", "今日 16 篇"],
    context: "6 篇对标笔记 · 12 张产品图 · 2 份 logo · 8 个关键词",
    runState: ["自动生成已开启", "单次 4 篇", "每 20 分钟一轮", "自动挂 logo"],
    benchmarkScope: [
      { title: "全部对标", desc: "生成时使用当前已选的全部笔记作为参考范围。", active: true },
      { title: "随机对标", desc: "每次从当前已选笔记中随机抽取一部分参与生成。" },
    ],
    groups: [
      { name: "胶原蛋白饮爆文池", count: "24 篇笔记", mode: "整组选择" },
      { name: "通勤场景种草", count: "18 篇笔记", mode: "已选 6 篇" },
      { name: "熬夜修护表达", count: "15 篇笔记", mode: "已选 4 篇" },
    ],
    assets: [
      { title: "产品素材", desc: "12 张 · 封面/正文配图候选" },
      { title: "品牌 logo", desc: "2 份 · 透明底素材" },
      { title: "产品水印", desc: "3 份 · 角标/底纹" },
    ],
    copy: [
      { label: "核心表达", value: "用轻负担方式做长期养护，不强调夸张功效，突出坚持后的状态变化。" },
      { label: "核心关键词", value: "胶原蛋白饮、轻养护、通勤女生、熬夜修护感、口感清爽" },
      { label: "内容语气", value: "生活方式种草" },
      { label: "禁用词规则", value: "医疗化承诺、绝对化表达" },
      { label: "标题风格", value: "日常经验型" },
    ],
    strategy: [
      { label: "单轮产出", value: "4 篇" },
      { label: "生成频率", value: "每 20 分钟一轮" },
      { label: "相似度阈值", value: "72%" },
      { label: "失败重试", value: "自动重试 1 次" },
      { label: "入库规则", value: "生成后直接进入内容池" },
      { label: "封面生成", value: "开启" },
    ],
    noteStats: [
      { label: "今日产出", value: "16", desc: "较昨日提升 22%", live: true },
      { label: "生成中", value: "3", desc: "预计 2 分钟完成" },
      { label: "失败数", value: "2", desc: "1 篇因封面图不足中断" },
    ],
    log: "已根据“胶原蛋白饮 空腹喝法”等关键词筛出 24 篇候选，去重后保留 6 篇；当前正在生成第 3/4 篇，预计 2 分钟后完成本轮。",
    notes: [
      { title: "熬夜党也能坚持的轻养护 routine", meta: "10:24 · 高互动种草", tag: "最新生成" },
      { title: "办公室女生会悄悄坚持的小习惯", meta: "09:58 · 通勤场景", tag: "封面已出" },
      { title: "早八通勤前的一杯轻负担补充", meta: "09:36 · 日常习惯", tag: "已入内容池" },
      { title: "一周状态记录型笔记", meta: "09:11 · 素材中断", tag: "缺横版素材", alert: true },
    ],
  },
  {
    id: "repair",
    name: "敏感肌修护精华",
    brand: "品牌 B",
    updatedAt: "待补素材",
    status: "draft",
    chips: ["草稿", "笔记库 43 篇"],
    context: "4 篇对标笔记 · 8 张产品图 · 1 份 logo · 5 个关键词",
    runState: ["自动生成未开启", "单次 2 篇", "手动触发", "需补素材"],
    benchmarkScope: [
      { title: "全部对标", desc: "生成时使用当前已选的全部笔记作为参考范围。" },
      { title: "随机对标", desc: "每次从当前已选笔记中随机抽取一部分参与生成。", active: true },
    ],
    groups: [
      { name: "修护痛点表达", count: "20 篇笔记", mode: "已选 8 篇" },
      { name: "敏感肌真实反馈", count: "14 篇笔记", mode: "已选 5 篇" },
      { name: "晚间护肤流程", count: "9 篇笔记", mode: "整组选择" },
    ],
    assets: [
      { title: "产品素材", desc: "8 张 · 仍缺使用场景图" },
      { title: "品牌 logo", desc: "1 份 · 待适配深色背景" },
      { title: "产品水印", desc: "0 份 · 暂未上传" },
    ],
    copy: [
      { label: "核心表达", value: "弱化成分堆叠，强调敏感期也能安心用的修护感受。" },
      { label: "核心关键词", value: "敏感肌、泛红修护、夜间维稳、精华、温和感" },
      { label: "内容语气", value: "真实体验型" },
      { label: "禁用词规则", value: "功效承诺、医疗诊断描述" },
      { label: "标题风格", value: "自问自答型" },
    ],
    strategy: [
      { label: "单轮产出", value: "2 篇" },
      { label: "生成频率", value: "手动触发" },
      { label: "相似度阈值", value: "68%" },
      { label: "失败重试", value: "关闭" },
      { label: "入库规则", value: "草稿箱待审核" },
      { label: "封面生成", value: "关闭" },
    ],
    noteStats: [
      { label: "今日产出", value: "4", desc: "仍在补素材" },
      { label: "生成中", value: "0", desc: "当前未运行" },
      { label: "失败数", value: "1", desc: "缺生活场景图" },
    ],
    log: "当前项目处于草稿准备阶段，建议补齐场景素材后再开启自动生成。",
    notes: [
      { title: "换季泛红时我会先用这一瓶", meta: "昨天 21:16 · 草稿", tag: "待审核" },
      { title: "敏感期晚间精简护肤记录", meta: "昨天 20:02 · 草稿", tag: "草稿中" },
    ],
  },
  {
    id: "spray",
    name: "防晒喷雾夏季 campaign",
    brand: "品牌 C",
    updatedAt: "已暂停 2 天",
    status: "paused",
    chips: ["暂停", "待复盘"],
    context: "5 篇对标笔记 · 10 张产品图 · 2 份 logo · 6 个关键词",
    runState: ["自动生成已暂停", "单次 3 篇", "等待复盘", "保留上次策略"],
    benchmarkScope: [
      { title: "全部对标", desc: "生成时使用当前已选的全部笔记作为参考范围。", active: true },
      { title: "随机对标", desc: "每次从当前已选笔记中随机抽取一部分参与生成。" },
    ],
    groups: [
      { name: "海边防晒场景", count: "17 篇笔记", mode: "已选 6 篇" },
      { name: "补喷表达", count: "12 篇笔记", mode: "整组选择" },
      { name: "夏日妆前防晒", count: "8 篇笔记", mode: "已选 3 篇" },
    ],
    assets: [
      { title: "产品素材", desc: "10 张 · 够用" },
      { title: "品牌 logo", desc: "2 份 · 透明底素材" },
      { title: "产品水印", desc: "1 份 · 海边 campaign 角标" },
    ],
    copy: [
      { label: "核心表达", value: "突出轻薄补喷、妆后友好和夏日户外场景。" },
      { label: "核心关键词", value: "防晒喷雾、夏天补喷、户外通勤、妆后补防晒" },
      { label: "内容语气", value: "场景种草型" },
      { label: "禁用词规则", value: "绝对防晒、医学级别描述" },
      { label: "标题风格", value: "清单推荐型" },
    ],
    strategy: [
      { label: "单轮产出", value: "3 篇" },
      { label: "生成频率", value: "暂停中" },
      { label: "相似度阈值", value: "70%" },
      { label: "失败重试", value: "自动重试 1 次" },
      { label: "入库规则", value: "内容池后人工筛选" },
      { label: "封面生成", value: "开启" },
    ],
    noteStats: [
      { label: "今日产出", value: "0", desc: "项目暂停中" },
      { label: "生成中", value: "0", desc: "待复盘后恢复" },
      { label: "失败数", value: "0", desc: "最近一轮运行正常" },
    ],
    log: "项目暂停后保留上轮策略和参考池，复盘完成后可继续使用当前配置恢复生成。",
    notes: [
      { title: "妆后补防晒这件事我现在靠喷雾", meta: "两天前 18:30 · 已暂停", tag: "待复盘" },
      { title: "通勤包里常备的夏日补喷", meta: "两天前 17:42 · 已暂停", tag: "历史版本" },
    ],
  },
  {
    id: "night",
    name: "夜间修护安瓶",
    brand: "品牌 A",
    updatedAt: "昨天 21:18",
    status: "running",
    chips: ["运行中", "待审核 5"],
    context: "6 篇对标笔记 · 9 张产品图 · 1 份 logo · 7 个关键词",
    runState: ["自动生成已开启", "单次 3 篇", "每 30 分钟一轮", "自动挂 logo"],
    benchmarkScope: [],
    groups: [],
    assets: [],
    copy: [],
    strategy: [],
    noteStats: [],
    log: "",
    notes: [],
  },
  {
    id: "breakfast",
    name: "减脂早餐杯",
    brand: "品牌 D",
    updatedAt: "待启动",
    status: "draft",
    chips: ["草稿", "缺品牌素材"],
    context: "",
    runState: [],
    benchmarkScope: [],
    groups: [],
    assets: [],
    copy: [],
    strategy: [],
    noteStats: [],
    log: "",
    notes: [],
  },
];

const statusMeta: Record<ProjectStatus, { label: string; className: string }> = {
  running: { label: "运行中", className: "generation-project-pill--running" },
  draft: { label: "草稿", className: "generation-project-pill--draft" },
  paused: { label: "暂停", className: "generation-project-pill--paused" },
};

const projectTabs = projects.slice(0, 3);

export default function GenerationPage() {
  const [activeProjectId, setActiveProjectId] = useState(projectTabs[0]?.id ?? "");

  const activeProject = useMemo(
    () => projectTabs.find((item) => item.id === activeProjectId) ?? projectTabs[0],
    [activeProjectId]
  );

  if (!activeProject) {
    return null;
  }

  return (
    <div className="generation-page">
      <section className="generation-project-zone">
        <div className="generation-project-bar">
          <div className="generation-project-tabs generation-project-tabs--simple">
            {projectTabs.map((project) => {
              const status = statusMeta[project.status];

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveProjectId(project.id)}
                  className={`generation-project-tab ${project.id === activeProject.id ? "generation-project-tab--active" : ""}`}
                >
                  <div className="generation-project-tab__top">
                    <h2>{project.name}</h2>
                    <span className={`generation-project-pill ${status.className}`}>
                      {status.label}
                    </span>
                  </div>
                </button>
              );
            })}

            {projects.length > 3 && (
              <div className="generation-project-more">
                <span>更多项目</span>
                <strong>+{projects.length - 3}</strong>
              </div>
            )}
          </div>

          <div className="generation-project-zone__actions">
            <button className="generation-button generation-button--ghost">项目管理</button>
            <button className="generation-button generation-button--primary">
              <Plus size={16} />
              新建项目
            </button>
          </div>
        </div>
      </section>

      <section className="generation-workspace">
        <article className="generation-panel generation-panel--main">
          <div className="generation-panel__header">
            <div>
              <h2>项目配置工作台</h2>
              <p>{activeProject.name}</p>
            </div>
            <button className="generation-button generation-button--ghost">保存版本</button>
          </div>

          <div className="generation-context-banner">
            <strong>当前上下文：</strong>
            <span>{activeProject.context}</span>
          </div>

          <section className="generation-section">
            <div className="generation-section__head">
              <div className="generation-section__title">
                <PlayCircle size={18} />
                <div>
                  <h3>项目运行控制</h3>
                  <p>自动生成开关</p>
                </div>
              </div>
              <div className="generation-switch" />
            </div>
            <div className="generation-chip-row">
              {activeProject.runState.map((item) => (
                <span key={item} className="generation-chip">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="generation-section">
            <div className="generation-section__head">
              <div className="generation-section__title">
                <Layers3 size={18} />
                <div>
                  <h3>对标笔记配置</h3>
                  <p>已采集 / 关键词采集</p>
                </div>
              </div>
              <button className="generation-button generation-button--ghost">打开笔记池</button>
            </div>

            <div className="generation-stack">
              <div className="generation-subsection">
                <div className="generation-subsection__head">
                  <div>
                    <h4>对标范围</h4>
                    <p>决定生成时使用全部已选笔记，还是从中随机抽取。</p>
                  </div>
                </div>
                <div className="generation-choice-grid">
                  {activeProject.benchmarkScope.map((item) => (
                    <div
                      key={item.title}
                      className={`generation-choice-card ${item.active ? "generation-choice-card--active" : ""}`}
                    >
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="generation-subsection">
                <div className="generation-subsection__head">
                  <div>
                    <h4>已选分组</h4>
                    <p>按分组管理采集池，可整组选择，也可进入组内手动勾选。</p>
                  </div>
                  <span className="generation-badge">{activeProject.groups.length} 个分组</span>
                </div>
                <div className="generation-group-list">
                  {activeProject.groups.map((group) => (
                    <div key={group.name} className="generation-group-card">
                      <div>
                        <strong>{group.name}</strong>
                        <span>{group.count}</span>
                      </div>
                      <span className="generation-badge">{group.mode}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="generation-section">
            <div className="generation-section__head">
              <div className="generation-section__title">
                <Image size={18} />
                <div>
                  <h3>项目素材配置</h3>
                  <p>产品素材 / 品牌 logo / 产品水印</p>
                </div>
              </div>
              <button className="generation-button generation-button--ghost">上传素材</button>
            </div>

            <div className="generation-asset-grid">
              {activeProject.assets.map((asset) => (
                <div key={asset.title} className="generation-asset-card">
                  <div className="generation-asset-card__preview" />
                  <strong>{asset.title}</strong>
                  <span>{asset.desc}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="generation-section">
            <div className="generation-section__head">
              <div className="generation-section__title">
                <FileText size={18} />
                <div>
                  <h3>文案配置</h3>
                  <p>核心表达 / 关键词 / 风格</p>
                </div>
              </div>
              <button className="generation-button generation-button--ghost">导入模板</button>
            </div>

            <div className="generation-field-grid generation-field-grid--single">
              <div className="generation-field">
                <span className="generation-field__label">核心表达</span>
                <div className="generation-field__value">{activeProject.copy[0]?.value}</div>
              </div>
            </div>

            <div className="generation-field-grid">
              {activeProject.copy.slice(1).map((item) => (
                <div key={item.label} className="generation-field">
                  <span className="generation-field__label">{item.label}</span>
                  <div className="generation-field__value">{item.value}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="generation-section">
            <div className="generation-section__head">
              <div className="generation-section__title">
                <Settings2 size={18} />
                <div>
                  <h3>生成策略</h3>
                  <p>频率 / 去重 / 审核流</p>
                </div>
              </div>
              <button className="generation-button generation-button--ghost">策略预览</button>
            </div>

            <div className="generation-field-grid">
              {activeProject.strategy.map((item) => (
                <div key={item.label} className="generation-field">
                  <span className="generation-field__label">{item.label}</span>
                  <div className="generation-field__value">{item.value}</div>
                </div>
              ))}
            </div>
          </section>
        </article>

        <aside className="generation-panel generation-panel--side">
          <div className="generation-panel__header">
            <div>
              <h2>产出笔记列表</h2>
              <p>双列信息流</p>
            </div>
            <button className="generation-button generation-button--ghost">筛选状态</button>
          </div>

          <div className="generation-stat-row">
            {activeProject.noteStats.map((item) => (
              <div key={item.label} className="generation-stat-card">
                <div className="generation-stat-card__top">
                  <span>{item.label}</span>
                  {item.live ? <em>+4</em> : <i>本轮任务</i>}
                </div>
                <strong>{item.value}</strong>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="generation-log-card">
            <div className="generation-section__head">
              <div className="generation-section__title generation-section__title--compact">
                <ListChecks size={18} />
                <div>
                  <h3>生成日志摘要</h3>
                  <p>本轮任务</p>
                </div>
              </div>
              <span className="generation-chip generation-chip--live">实时</span>
            </div>
            <div className="generation-log-card__body">{activeProject.log}</div>
          </div>

          <div className="generation-note-grid">
            {activeProject.notes.map((note, index) => (
              <article key={`${note.title}-${index}`} className="generation-note-card">
                <div className={`generation-note-card__cover generation-note-card__cover--${(index % 4) + 1}`} />
                <div className="generation-note-card__body">
                  <div>
                    <h3>{note.title}</h3>
                    <p>{note.meta}</p>
                  </div>
                  <div className="generation-note-card__footer">
                    <span className={`generation-note-tag ${note.alert ? "generation-note-tag--alert" : ""}`}>
                      {note.tag}
                    </span>
                    <button type="button" className="generation-note-action">
                      ···
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
