import apiClient, { type ApiResponse } from "./client";

const keywordCollectionImportToken =
  import.meta.env.VITE_KEYWORD_COLLECTION_IMPORT_TOKEN || "";

export interface KeywordCollectionKeyword {
  id: number;
  name: string;
  sort_order: number;
  status: string;
  secondary_category_order?: string[];
  note_count: number;
  tab_count: number;
  last_collected_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface KeywordCollectionTab {
  id: number;
  keyword_id: number;
  name: string;
  sort_order: number;
  status: string;
  tag_labels?: string[];
  note_count: number;
  last_collected_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface KeywordCollectionSummary {
  keyword_id: number;
  keyword_name: string;
  note_count: number;
  tab_count: number;
  last_collected_at: string | null;
  selected_tab_id?: number;
  selected_tab_name?: string;
  selected_tab_count?: number;
}

export interface KeywordCollectionTabListResponse {
  keyword: KeywordCollectionKeyword;
  tabs: KeywordCollectionTab[];
  summary: KeywordCollectionSummary;
}

export interface KeywordCollectionNote {
  id: number;
  note_id: string;
  note_url: string;
  title: string;
  content: string;
  tags?: string[];
  cover_url: string;
  cover_url_oss?: string;
  cover_ocr?: string;
  images: string[];
  note_type: string;
  author_name: string;
  author_avatar: string;
  like_count: string;
  collect_count: string;
  comment_count: string;
  publish_time: string;
  collected_at: string;
  rank_no: number;
  sort_type: string;
}

export interface KeywordCollectionNoteListResponse {
  list: KeywordCollectionNote[];
  total: number;
  page: number;
  pageSize: number;
  summary: KeywordCollectionSummary;
}

export interface KeywordCollectionTagAnalysisItem {
  tag: string;
  note_count: number;
  coverage_rate: number;
  average_like_count: number;
}

export interface KeywordCollectionTagAnalysisResponse {
  keyword_id: number;
  keyword_name: string;
  tab_id: number;
  tab_name: string;
  total_notes: number;
  tagged_notes: number;
  unique_tag_count: number;
  list: KeywordCollectionTagAnalysisItem[];
}

export interface KeywordCollectionTitleGeneratorParams {
  keywordId: number;
  tabId: number;
}

export interface KeywordCollectionTitleGeneratorResponse {
  keyword_id: number;
  keyword_name: string;
  tab_id: number;
  tab_name: string;
  reference_count: number;
  reference_titles: string[];
  titles: string[];
}

export interface KeywordCollectionKeywordListParams {
  keyword?: string;
}

export interface KeywordCollectionNoteListParams {
  keywordId: number;
  tabId?: number;
  page?: number;
  pageSize?: number;
  sort?: string;
  noteType?: string;
  keyword?: string;
}

export interface KeywordCollectionTagAnalysisParams {
  keywordId: number;
  tabId: number;
  noteType?: string;
  keyword?: string;
}

export async function getKeywordCollectionKeywords(
  params: KeywordCollectionKeywordListParams = {},
): Promise<KeywordCollectionKeyword[]> {
  const res = await apiClient.get<ApiResponse<KeywordCollectionKeyword[]>>(
    "/xhs-content-project/keywordCollection/keywords",
    { params },
  );
  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "获取关键词列表失败");
  }
  return res.data.data;
}

export async function getKeywordCollectionTabs(
  keywordId: number,
): Promise<KeywordCollectionTabListResponse> {
  const res = await apiClient.get<
    ApiResponse<KeywordCollectionTabListResponse>
  >("/xhs-content-project/keywordCollection/tabs", { params: { keywordId } });
  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "获取关键词 tabs 失败");
  }
  return res.data.data;
}

export async function getKeywordCollectionNotes(
  params: KeywordCollectionNoteListParams,
): Promise<KeywordCollectionNoteListResponse> {
  const res = await apiClient.get<
    ApiResponse<KeywordCollectionNoteListResponse>
  >("/xhs-content-project/keywordCollection/notes", { params });
  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "获取关键词采集笔记失败");
  }
  return res.data.data;
}

export async function getKeywordCollectionTagAnalysis(
  params: KeywordCollectionTagAnalysisParams,
): Promise<KeywordCollectionTagAnalysisResponse> {
  const res = await apiClient.get<
    ApiResponse<KeywordCollectionTagAnalysisResponse>
  >("/xhs-content-project/keywordCollection/tagAnalysis", { params });
  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "获取 tag 分析失败");
  }
  return res.data.data;
}

export async function generateKeywordCollectionTitles(
  params: KeywordCollectionTitleGeneratorParams,
): Promise<KeywordCollectionTitleGeneratorResponse> {
  const res = await apiClient.post<
    ApiResponse<KeywordCollectionTitleGeneratorResponse>
  >("/xhs-content-project/keywordCollection/generateTitles", params);
  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "标题生成失败");
  }
  return res.data.data;
}

export interface LegacyKeywordCollectionFileImportResponse {
  keyword_name: string;
  tab_count: number;
  imported_count: number;
  tabs: Array<{
    keyword_id: number;
    keyword_name: string;
    tab_id: number;
    tab_name: string;
    imported_count: number;
  }>;
}

export async function importLegacyKeywordCollectionFile(file: File) {
  if (!keywordCollectionImportToken) {
    throw new Error("未配置关键词采集导入 token");
  }

  const formData = new FormData();
  formData.append("file", file);

  const res = await apiClient.post<
    ApiResponse<LegacyKeywordCollectionFileImportResponse>
  >("/xhs-content-project/keywordCollection/importLegacyFile", formData, {
    headers: {
      "X-XHS-Import-Token": keywordCollectionImportToken,
    },
  });

  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "导入 JSON 失败");
  }

  return res.data.data;
}
