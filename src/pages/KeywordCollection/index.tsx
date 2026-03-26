import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Upload, ExternalLink, Search, BarChart3, Sparkles, Copy } from "lucide-react";
import { toast } from "sonner";
import {
  useGenerateKeywordCollectionTitles,
  useImportLegacyKeywordCollectionFile,
  useKeywordCollectionTagAnalysis,
  useKeywordCollectionKeywords,
  useKeywordCollectionNotes,
  useKeywordCollectionTabs,
} from "~/hooks/useKeywordCollection";
import type {
  KeywordCollectionKeyword,
  KeywordCollectionNote,
  KeywordCollectionTagAnalysisItem,
  KeywordCollectionTab,
  KeywordCollectionTitleGeneratorResponse,
} from "~/api/keywordCollection";
import "./keywordCollection.css";

const DEFAULT_PAGE_SIZE = 50;
const pageSizeOptions = [10, 20, 50, 100];
const TAG_ANALYSIS_TOP_N = 20;
const TAG_ANALYSIS_LIKE_SMOOTHING = 3;

const sortOptions = [
  { label: "最新发布", value: "latest" },
  { label: "点赞最高", value: "likes" },
];

const noteTypeOptions = [
  { label: "全部", value: "" },
  { label: "图文", value: "note" },
  { label: "视频", value: "video" },
];

export default function KeywordCollectionPage() {
  const [keywordSearchInput, setKeywordSearchInput] = useState("");
  const [keywordQuery, setKeywordQuery] = useState("");
  const [noteSearchInput, setNoteSearchInput] = useState("");
  const [noteQuery, setNoteQuery] = useState("");
  const [selectedKeywordId, setSelectedKeywordId] = useState<number>();
  const [selectedTabId, setSelectedTabId] = useState<number>();
  const [sort, setSort] = useState("latest");
  const [noteType, setNoteType] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showTagAnalysisModal, setShowTagAnalysisModal] = useState(false);
  const [showTitleGeneratorModal, setShowTitleGeneratorModal] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);

  const keywordsQuery = useKeywordCollectionKeywords({ keyword: keywordQuery });
  const tabsQuery = useKeywordCollectionTabs(selectedKeywordId);
  const importMutation = useImportLegacyKeywordCollectionFile();
  const titleGeneratorMutation = useGenerateKeywordCollectionTitles();
  const notesQuery = useKeywordCollectionNotes(
    selectedKeywordId
      ? {
          keywordId: selectedKeywordId,
          tabId: selectedTabId,
          page,
          pageSize,
          sort,
          noteType: noteType || undefined,
          keyword: noteQuery || undefined,
        }
      : undefined,
  );
  const tagAnalysisQuery = useKeywordCollectionTagAnalysis(
    showTagAnalysisModal && selectedKeywordId && selectedTabId
      ? {
          keywordId: selectedKeywordId,
          tabId: selectedTabId,
          noteType: noteType || undefined,
          keyword: noteQuery || undefined,
        }
      : undefined,
  );

  const keywords = keywordsQuery.data ?? [];
  const tabs = tabsQuery.data?.tabs ?? [];
  const notes = notesQuery.data?.list ?? [];
  const total = notesQuery.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const selectedKeyword = useMemo(
    () => keywords.find((item) => item.id === selectedKeywordId),
    [keywords, selectedKeywordId],
  );
  const selectedTab = useMemo(
    () => tabs.find((item) => item.id === selectedTabId),
    [tabs, selectedTabId],
  );
  const summary = notesQuery.data?.summary || tabsQuery.data?.summary;

  useEffect(() => {
    if (keywords.length === 0) {
      setSelectedKeywordId(undefined);
      return;
    }

    const exists = keywords.some((item) => item.id === selectedKeywordId);
    if (!selectedKeywordId || !exists) {
      setSelectedKeywordId(keywords[0].id);
    }
  }, [keywords, selectedKeywordId]);

  useEffect(() => {
    if (tabs.length === 0) {
      setSelectedTabId(undefined);
      return;
    }

    const exists = tabs.some((item) => item.id === selectedTabId);
    if (!selectedTabId || !exists) {
      setSelectedTabId(tabs[0].id);
    }
  }, [tabs, selectedTabId]);

  useEffect(() => {
    setPage(1);
  }, [selectedKeywordId, selectedTabId, sort, noteType, noteQuery, pageSize]);

  const handleKeywordSearch = () => {
    setKeywordQuery(keywordSearchInput.trim());
  };

  const handleNoteSearch = () => {
    setNoteQuery(noteSearchInput.trim());
  };

  const handleImport = () => {
    if (!importFile) {
      return;
    }
    importMutation.mutate(importFile, {
      onSuccess: () => {
        setShowImportModal(false);
        setImportFile(null);
      },
    });
  };

  return (
    <div className="keyword-collection-page">
      {showImportModal ? (
        <div className="keyword-collection-import-modal">
          <div
            className="keyword-collection-import-modal__backdrop"
            onClick={() => {
              if (!importMutation.isPending) {
                setShowImportModal(false);
                setImportFile(null);
              }
            }}
          />
          <section className="keyword-collection-import-dialog">
            <div className="keyword-collection-import-dialog__head">
              <div>
                <strong>导入旧版关键词采集 JSON</strong>
                <p>
                  上传 `secondary_categories` 结构的旧版 JSON
                  文件，后端会自动拆成关键词、tab 和笔记关系。
                </p>
              </div>
              <button
                type="button"
                className="keyword-collection-import-dialog__close"
                onClick={() => {
                  if (!importMutation.isPending) {
                    setShowImportModal(false);
                    setImportFile(null);
                  }
                }}
              >
                关闭
              </button>
            </div>

            <label className="keyword-collection-import-panel__file keyword-collection-import-panel__file--modal">
              <input
                type="file"
                accept=".json,application/json"
                onChange={(event) =>
                  setImportFile(event.target.files?.[0] ?? null)
                }
              />
              <span>{importFile ? importFile.name : "选择 JSON 文件"}</span>
            </label>

            <div className="keyword-collection-import-dialog__tips">
              <span>
                支持旧版导出文件名，例如
                `xiaohongshu_权威音乐bgm_1774266444983.json`。
              </span>
              <span>
                导入时会自动过滤无效字段和缺失 `note_id` / `note_url` 的脏数据。
              </span>
            </div>

            <div className="keyword-collection-import-dialog__footer">
              <button
                type="button"
                className="keyword-collection-import-dialog__ghost"
                onClick={() => {
                  if (!importMutation.isPending) {
                    setShowImportModal(false);
                    setImportFile(null);
                  }
                }}
              >
                取消
              </button>
              <button
                type="button"
                className="keyword-collection-import-panel__submit"
                disabled={!importFile || importMutation.isPending}
                onClick={handleImport}
              >
                {importMutation.isPending ? "导入中..." : "开始导入"}
              </button>
            </div>
          </section>
        </div>
      ) : null}
      {showTagAnalysisModal ? (
        <TagAnalysisModal
          open={showTagAnalysisModal}
          onClose={() => setShowTagAnalysisModal(false)}
          currentTabId={selectedTabId}
          keywordName={selectedKeyword?.name}
          tabName={selectedTab?.name}
          isLoading={tagAnalysisQuery.isLoading}
          isError={tagAnalysisQuery.isError}
          data={tagAnalysisQuery.data}
        />
      ) : null}
      {showTitleGeneratorModal ? (
        <TitleGeneratorModal
          open={showTitleGeneratorModal}
          keywordId={selectedKeywordId}
          keywordName={selectedKeyword?.name}
          tabs={tabs}
          currentTabId={selectedTabId}
          isPending={titleGeneratorMutation.isPending}
          result={titleGeneratorMutation.data}
          onClose={() => {
            setShowTitleGeneratorModal(false);
            titleGeneratorMutation.reset();
          }}
          onGenerate={(tabId) =>
            titleGeneratorMutation.mutate({
              keywordId: selectedKeywordId as number,
              tabId,
            })
          }
        />
      ) : null}

      <div className="keyword-collection-shell">
        <aside className="keyword-collection-sidebar">
          <div className="keyword-collection-panel keyword-collection-panel--sidebar">
            <div className="keyword-collection-panel__head">
              <div>
                <span>一级分类</span>
                <strong>关键词列表</strong>
              </div>
              <span>{keywords.length} 个</span>
            </div>

            <label className="keyword-collection-search keyword-collection-search--sidebar">
              <Search size={15} />
              <input
                type="text"
                placeholder="搜索关键词"
                value={keywordSearchInput}
                onChange={(event) => setKeywordSearchInput(event.target.value)}
                onKeyDown={(event) =>
                  event.key === "Enter" && handleKeywordSearch()
                }
              />
            </label>

            <div className="keyword-collection-keyword-list">
              {keywordsQuery.isLoading ? (
                <SidebarMessage text="关键词加载中..." />
              ) : keywordsQuery.isError ? (
                <SidebarMessage text="关键词加载失败" />
              ) : keywords.length === 0 ? (
                <SidebarMessage text="暂无公共关键词数据" />
              ) : (
                keywords.map((item) => (
                  <KeywordListItem
                    key={item.id}
                    item={item}
                    active={item.id === selectedKeywordId}
                    onClick={() => setSelectedKeywordId(item.id)}
                  />
                ))
              )}
            </div>

            <div className="keyword-collection-sidebar__footer">
              <button
                type="button"
                className="keyword-collection-import-toggle"
                onClick={() => setShowImportModal(true)}
              >
                <Upload size={16} />
                导入 JSON
              </button>
            </div>
          </div>
        </aside>

        <section className="keyword-collection-main">
          <div className="keyword-collection-panel keyword-collection-panel--main">
            <div className="keyword-collection-main-sticky">
              <div className="keyword-collection-tabs">
                <div className="keyword-collection-tabs__list">
                  {tabsQuery.isLoading ? (
                    <span className="keyword-collection-tabs__placeholder">
                      Tab 加载中...
                    </span>
                  ) : tabsQuery.isError ? (
                    <span className="keyword-collection-tabs__placeholder">
                      Tab 加载失败
                    </span>
                  ) : tabs.length === 0 ? (
                    <span className="keyword-collection-tabs__placeholder">
                      当前关键词暂无 tab
                    </span>
                  ) : (
                    tabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        className={`keyword-collection-tab-chip ${tab.id === selectedTabId ? "active" : ""}`}
                        onClick={() => setSelectedTabId(tab.id)}
                      >
                        <div className="keyword-collection-tab-chip__body">
                          <div className="keyword-collection-tab-chip__main">
                            <span>{tab.name}</span>
                            <small>{tab.note_count}</small>
                          </div>
                          {tab.tag_labels?.length ? (
                            <div className="keyword-collection-tab-chip__tags">
                              {tab.tag_labels.map((label) => (
                                <em key={label}>{label}</em>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="keyword-collection-toolbar">
                <label className="keyword-collection-search">
                  <Search size={15} />
                  <input
                    type="text"
                    placeholder="搜索标题或正文"
                    value={noteSearchInput}
                    onChange={(event) => setNoteSearchInput(event.target.value)}
                    onKeyDown={(event) =>
                      event.key === "Enter" && handleNoteSearch()
                    }
                  />
                </label>

                <div className="keyword-collection-toolbar__group">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`keyword-collection-filter-chip ${sort === option.value ? "active" : ""}`}
                      onClick={() => setSort(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <div className="keyword-collection-toolbar__group">
                  {noteTypeOptions.map((option) => (
                    <button
                      key={option.value || "all"}
                      type="button"
                      className={`keyword-collection-filter-chip ${noteType === option.value ? "active" : ""}`}
                      onClick={() => setNoteType(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="keyword-collection-analysis-trigger"
                  disabled={!selectedKeywordId || !selectedTabId}
                  onClick={() => setShowTagAnalysisModal(true)}
                >
                  <BarChart3 size={16} />
                  <span>Tag分析</span>
                </button>

                <button
                  type="button"
                  className="keyword-collection-generator-trigger"
                  disabled={!selectedKeywordId || tabs.length === 0}
                  onClick={() => setShowTitleGeneratorModal(true)}
                >
                  <Sparkles size={16} />
                  <span>标题生成器</span>
                </button>

                <label className="keyword-collection-page-size">
                  <span>每页</span>
                  <select
                    value={pageSize}
                    onChange={(event) => setPageSize(Number(event.target.value))}
                  >
                    {pageSizeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="keyword-collection-subline">
                <span>
                  当前视图：
                  <strong>{selectedKeyword?.name || "未选择关键词"}</strong>
                  {selectedTab ? ` / ${selectedTab.name}` : ""}
                </span>
                <span>
                  共 {total} 篇笔记
                  {summary?.last_collected_at
                    ? ` · 最近采集 ${formatDateTime(summary.last_collected_at)}`
                    : ""}
                </span>
              </div>
            </div>

            <div className="keyword-collection-main-content">
              {notesQuery.isLoading ? (
                <div className="keyword-collection-empty">正在加载笔记...</div>
              ) : notesQuery.isError ? (
                <div className="keyword-collection-empty">
                  笔记加载失败，请稍后重试
                </div>
              ) : notes.length === 0 ? (
                <div className="keyword-collection-empty">
                  当前关键词或 tab 下还没有公共笔记数据
                </div>
              ) : (
                <div className="keyword-collection-table-wrap">
                  <table className="keyword-collection-table">
                    <thead>
                      <tr>
                        <th>排名</th>
                        <th>笔记</th>
                        <th>作者</th>
                        <th>类型</th>
                        <th>发布时间</th>
                        <th>点赞</th>
                        <th>链接</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notes.map((note) => (
                        <KeywordNoteRow
                          key={`${note.id}-${note.rank_no}`}
                          note={note}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {notes.length > 0 && totalPages > 1 && (
              <div className="keyword-collection-pagination">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  上一页
                </button>
                <span>
                  {page} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  下一页
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function TitleGeneratorModal({
  open,
  keywordId,
  keywordName,
  tabs,
  currentTabId,
  isPending,
  result,
  onClose,
  onGenerate,
}: {
  open: boolean;
  keywordId?: number;
  keywordName?: string;
  tabs: KeywordCollectionTab[];
  currentTabId?: number;
  isPending: boolean;
  result?: KeywordCollectionTitleGeneratorResponse;
  onClose: () => void;
  onGenerate: (tabId: number) => void;
}) {
  const [selectedTabId, setSelectedTabId] = useState<number>();

  useEffect(() => {
    if (!open) return;
    if (currentTabId && tabs.some((item) => item.id === currentTabId)) {
      setSelectedTabId(currentTabId);
      return;
    }
    setSelectedTabId(tabs[0]?.id);
  }, [open, currentTabId, tabs]);

  const selectedTab = useMemo(
    () => tabs.find((item) => item.id === selectedTabId),
    [selectedTabId, tabs],
  );
  const displayedResult =
    result && result.tab_id === selectedTabId ? result : undefined;

  const copyTitles = async () => {
    if (!displayedResult?.titles?.length) return;
    try {
      await navigator.clipboard.writeText(displayedResult.titles.join("\n"));
      toast.success("标题已复制");
    } catch {
      toast.error("复制失败，请手动复制");
    }
  };

  if (!open) return null;

  return (
    <div className="keyword-collection-import-modal">
      <div className="keyword-collection-import-modal__backdrop" onClick={onClose} />
      <section className="keyword-collection-title-generator-dialog">
        <div className="keyword-collection-import-dialog__head">
          <div>
            <strong>标题生成器</strong>
            <p>
              默认读取当前二级分类下全部标题作为参考，不落库，仅用于当前弹框生成与复制。
            </p>
          </div>
          <button
            type="button"
            className="keyword-collection-import-dialog__close"
            onClick={onClose}
          >
            关闭
          </button>
        </div>

        <div className="keyword-collection-title-generator__controls">
          <div className="keyword-collection-title-generator__field">
            <span>一级分类</span>
            <strong>{keywordName || "未选择关键词"}</strong>
          </div>
          <label className="keyword-collection-title-generator__select">
            <span>二级分类</span>
            <select
              value={selectedTabId ?? ""}
              onChange={(event) => setSelectedTabId(Number(event.target.value))}
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="keyword-collection-title-generator__submit"
            disabled={!keywordId || !selectedTabId || isPending}
            onClick={() => selectedTabId && onGenerate(selectedTabId)}
          >
            <Sparkles size={16} />
            {isPending ? "生成中..." : "生成标题"}
          </button>
        </div>

        {displayedResult ? (
          <div className="keyword-collection-title-generator__result">
            <div className="keyword-collection-title-generator__summary">
              <div>
                <strong>
                  {displayedResult.keyword_name} / {displayedResult.tab_name}
                </strong>
                <p>参考标题数：{displayedResult.reference_count}</p>
              </div>
              <button
                type="button"
                className="keyword-collection-title-generator__copy"
                onClick={copyTitles}
              >
                <Copy size={15} />
                一键复制
              </button>
            </div>

            <div className="keyword-collection-title-generator__list">
              {displayedResult.titles.map((title, index) => (
                <div
                  key={`${displayedResult.tab_id}-${index}-${title}`}
                  className="keyword-collection-title-generator__item"
                >
                  <span>{index + 1}</span>
                  <p>{title}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="keyword-collection-empty">
            {selectedTab
              ? `当前将基于「${selectedTab.name}」下全部标题生成新标题`
              : "请选择二级分类后生成标题"}
          </div>
        )}
      </section>
    </div>
  );
}

function TagAnalysisModal({
  open,
  onClose,
  currentTabId,
  keywordName,
  tabName,
  isLoading,
  isError,
  data,
}: {
  open: boolean;
  onClose: () => void;
  currentTabId?: number;
  keywordName?: string;
  tabName?: string;
  isLoading: boolean;
  isError: boolean;
  data?: {
    keyword_name: string;
    tab_id: number;
    tab_name: string;
    total_notes: number;
    tagged_notes: number;
    unique_tag_count: number;
    list: KeywordCollectionTagAnalysisItem[];
  };
}) {
  const displayedData =
    data && currentTabId && data.tab_id === currentTabId ? data : undefined;
  const overallAverageLike = useMemo(() => {
    const list = displayedData?.list ?? [];
    const totalNoteCount = list.reduce((sum, item) => sum + item.note_count, 0);
    if (totalNoteCount <= 0) return 0;
    const totalLikes = list.reduce(
      (sum, item) => sum + item.average_like_count * item.note_count,
      0,
    );
    return totalLikes / totalNoteCount;
  }, [displayedData?.list]);
  const coverageList = useMemo(
    () =>
      [...(displayedData?.list ?? [])]
        .sort((a, b) => b.coverage_rate - a.coverage_rate || b.average_like_count - a.average_like_count)
        .slice(0, TAG_ANALYSIS_TOP_N),
    [displayedData?.list],
  );
  const likeList = useMemo(
    () =>
      [...(displayedData?.list ?? [])]
        .sort((a, b) => {
          const scoreDiff =
            getTagLikeRankingScore(b, overallAverageLike) -
            getTagLikeRankingScore(a, overallAverageLike);
          if (scoreDiff !== 0) {
            return scoreDiff;
          }
          return b.average_like_count - a.average_like_count || b.coverage_rate - a.coverage_rate;
        })
        .slice(0, TAG_ANALYSIS_TOP_N),
    [displayedData?.list, overallAverageLike],
  );

  if (!open) return null;

  return (
    <div className="keyword-collection-import-modal">
      <div className="keyword-collection-import-modal__backdrop" onClick={onClose} />
      <section className="keyword-collection-tag-analysis-dialog">
        <div className="keyword-collection-import-dialog__head">
          <div>
            <strong>Tag分析</strong>
            <p>
              {displayedData?.keyword_name || keywordName || "未选择关键词"}
              {displayedData?.tab_name || tabName ? ` / ${displayedData?.tab_name || tabName}` : ""}
            </p>
          </div>
          <button
            type="button"
            className="keyword-collection-import-dialog__close"
            onClick={onClose}
          >
            关闭
          </button>
        </div>

        {isLoading ? (
          <div className="keyword-collection-empty">Tag 分析加载中...</div>
        ) : isError ? (
          <div className="keyword-collection-empty">Tag 分析加载失败，请稍后重试</div>
        ) : !displayedData || displayedData.total_notes === 0 ? (
          <div className="keyword-collection-empty">当前二级分类下暂无可分析笔记</div>
        ) : (
          <div className="keyword-collection-tag-analysis">
            <div className="keyword-collection-tag-analysis__stats">
              <article className="keyword-collection-tag-analysis__stat">
                <span>当前笔记数</span>
                <strong>{displayedData.total_notes}</strong>
              </article>
              <article className="keyword-collection-tag-analysis__stat">
                <span>含标签笔记</span>
                <strong>{displayedData.tagged_notes}</strong>
              </article>
              <article className="keyword-collection-tag-analysis__stat">
                <span>唯一标签数</span>
                <strong>{displayedData.unique_tag_count}</strong>
              </article>
            </div>

            <div className="keyword-collection-tag-analysis__charts">
              <TagMetricChart
                title={`覆盖率 Top ${TAG_ANALYSIS_TOP_N}`}
                subtitle="该 tag 在当前二级分类笔记中的出现概率"
                items={coverageList}
                metricKey="coverage_rate"
                valueFormatter={(value) => `${value.toFixed(1)}%`}
              />
              <TagMetricChart
                title={`平均点赞数 Top ${TAG_ANALYSIS_TOP_N}`}
                subtitle="按样本量修正排序，展示值仍为真实平均点赞数"
                items={likeList}
                metricKey="average_like_count"
                valueFormatter={(value) => formatLikeCount(value)}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function TagMetricChart({
  title,
  subtitle,
  items,
  metricKey,
  valueFormatter,
}: {
  title: string;
  subtitle: string;
  items: KeywordCollectionTagAnalysisItem[];
  metricKey: "coverage_rate" | "average_like_count";
  valueFormatter: (value: number) => string;
}) {
  const maxValue = Math.max(...items.map((item) => item[metricKey]), 0);

  return (
    <section className="keyword-collection-tag-chart">
      <div className="keyword-collection-tag-chart__head">
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
      {items.length === 0 ? (
        <div className="keyword-collection-tag-chart__empty">暂无标签数据</div>
      ) : (
        <div className="keyword-collection-tag-chart__body">
          {items.map((item) => {
            const value = item[metricKey];
            const width = maxValue > 0 ? `${(value / maxValue) * 100}%` : "0%";
            return (
              <div key={`${metricKey}-${item.tag}`} className="keyword-collection-tag-chart__row">
                <div className="keyword-collection-tag-chart__meta">
                  <strong>#{item.tag}</strong>
                  <span>{item.note_count}篇</span>
                </div>
                <div className="keyword-collection-tag-chart__bar">
                  <div className="keyword-collection-tag-chart__fill" style={{ width }} />
                </div>
                <div className="keyword-collection-tag-chart__value">{valueFormatter(value)}</div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function KeywordListItem({
  item,
  active,
  onClick,
}: {
  item: KeywordCollectionKeyword;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`keyword-collection-keyword-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="keyword-collection-keyword-item__head">
        <strong>{item.name}</strong>
        <span>{item.note_count}</span>
      </div>
      <p>{item.tab_count} 个 tab</p>
      <small>
        {item.last_collected_at
          ? formatDateTime(item.last_collected_at)
          : "暂无采集记录"}
      </small>
    </button>
  );
}

function KeywordNoteRow({ note }: { note: KeywordCollectionNote }) {
  const [showPreview, setShowPreview] = useState(false);
  const cover = note.cover_url_oss || note.cover_url || note.images?.[0];
  const noteTypeLabel = note.note_type === "video" ? "视频" : "图文";
  const tags = note.tags?.filter(Boolean) ?? [];
  const coverOCR = note.cover_ocr?.trim();
  const noteTitle = note.title?.trim() || "无标题";

  return (
    <>
      <tr>
        <td className="keyword-collection-table__rank">#{note.rank_no || "-"}</td>
        <td className="keyword-collection-table__note">
          <div className="keyword-collection-note-cell">
            <div className="keyword-collection-note-cell__cover">
              {cover ? (
                <button
                  type="button"
                  className="keyword-collection-note-cell__cover-button"
                  onClick={() => setShowPreview(true)}
                  aria-label={`放大查看封面 ${noteTitle}`}
                >
                  <img src={cover} alt={noteTitle} loading="lazy" />
                  <span className="keyword-collection-note-cell__cover-mask">点击放大</span>
                </button>
              ) : (
                <span>无图</span>
              )}
            </div>
            <div className="keyword-collection-note-cell__content">
              <div className="keyword-collection-note-cell__title-row">
                <a
                  className="keyword-collection-note-cell__title"
                  href={note.note_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {noteTitle}
                </a>
                <button
                  type="button"
                  className="keyword-collection-note-cell__copy-action"
                  onClick={() => copyTextToClipboard(noteTitle, "标题已复制", "复制标题失败，请手动复制")}
                  aria-label={`复制标题 ${noteTitle}`}
                >
                  <Copy size={14} />
                </button>
              </div>
              {tags.length > 0 ? (
                <div className="keyword-collection-note-cell__tags">
                  {tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              ) : null}
              {note.content ? (
                <p className="keyword-collection-note-cell__desc">
                  {note.content}
                </p>
              ) : (
                <p className="keyword-collection-note-cell__desc keyword-collection-note-cell__desc--empty">
                  暂无正文
                </p>
              )}
              {coverOCR ? (
                <div className="keyword-collection-note-cell__ocr">
                  <button
                    type="button"
                    className="keyword-collection-note-cell__copy-action keyword-collection-note-cell__copy-action--ocr"
                    onClick={() =>
                      copyTextToClipboard(
                        coverOCR,
                        "封面 OCR 已复制",
                        "复制 OCR 失败，请手动复制",
                      )
                    }
                    aria-label={`复制 OCR ${noteTitle}`}
                  >
                    <Copy size={14} />
                  </button>
                  <strong>封面 OCR</strong>
                  <p>{coverOCR}</p>
                </div>
              ) : null}
            </div>
          </div>
        </td>
        <td>
          <div className="keyword-collection-author-cell">
            {note.author_avatar ? (
              <img src={note.author_avatar} alt={note.author_name || "author"} />
            ) : (
              <span />
            )}
            <strong>{note.author_name || "未知作者"}</strong>
          </div>
        </td>
        <td>{noteTypeLabel}</td>
        <td>{note.publish_time || "-"}</td>
        <td className="keyword-collection-table__metric">
          {note.like_count || "-"}
        </td>
        <td>
          <a
            className="keyword-collection-table__link"
            href={note.note_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`打开笔记 ${note.title || note.note_id}`}
          >
            <ExternalLink size={14} />
          </a>
        </td>
      </tr>
      {showPreview && cover ? (
        <ImagePreviewModal
          imageUrl={cover}
          title={noteTitle}
          onClose={() => setShowPreview(false)}
        />
      ) : null}
    </>
  );
}

function ImagePreviewModal({
  imageUrl,
  title,
  onClose,
}: {
  imageUrl: string;
  title: string;
  onClose: () => void;
}) {
  return createPortal(
    <div className="keyword-collection-image-preview" role="dialog" aria-modal="true">
      <div className="keyword-collection-image-preview__backdrop" onClick={onClose} />
      <div className="keyword-collection-image-preview__dialog">
        <button
          type="button"
          className="keyword-collection-image-preview__close"
          onClick={onClose}
          aria-label="关闭封面预览"
        >
          关闭
        </button>
        <img src={imageUrl} alt={title} />
      </div>
    </div>,
    document.body,
  );
}

function SidebarMessage({ text }: { text: string }) {
  return <div className="keyword-collection-sidebar__empty">{text}</div>;
}

function formatDateTime(value?: string | null) {
  if (!value) return "暂无";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getMonth() + 1}-${date.getDate()} ${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
}

function formatLikeCount(value: number) {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(value >= 100000 ? 0 : 1)}万`;
  }
  return `${Math.round(value)}`;
}

async function copyTextToClipboard(
  text: string,
  successMessage = "已复制",
  errorMessage = "复制失败，请手动复制",
) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(successMessage);
  } catch {
    toast.error(errorMessage);
  }
}

function getTagLikeRankingScore(
  item: KeywordCollectionTagAnalysisItem,
  overallAverageLike: number,
) {
  const noteCount = Math.max(item.note_count, 0);
  return (
    (item.average_like_count * noteCount +
      overallAverageLike * TAG_ANALYSIS_LIKE_SMOOTHING) /
    (noteCount + TAG_ANALYSIS_LIKE_SMOOTHING)
  );
}
