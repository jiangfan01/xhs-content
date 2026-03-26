import apiClient, { type ApiResponse } from "./client";

export type ProjectStatus = "running" | "paused";

export interface XhsContentProject {
  id: number;
  user_id: number;
  name: string;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface ProjectConfig {
  id: number;
  project_id: number;
  creative_theme: string;
  core_expressions: string[];
  specified_tags: string[];
  forbidden_terms: string[];
  brief_url: string;
  brief_content: string;
  cron_expr: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectBenchmarkNoteDetail {
  id: number;
  note_id: string;
  note_url: string;
  note_type: "image" | "video";
  title: string;
  content: string;
  cover_url: string;
  images: string[];
  author_name: string;
  author_avatar: string;
  tags: string[];
  collected_at: string;
}

export interface ProjectBenchmarkNoteItem {
  relation_id: number;
  project_id: number;
  collected_note_id: number;
  sort_order: number;
  is_deleted: boolean;
  note?: ProjectBenchmarkNoteDetail | null;
}

export type ProjectReferenceAssetType =
  | "product_image"
  | "logo_image"
  | "app_screenshot"
  | "app_store_screenshot"
  | "comment_image"
  | "campaign_poster"
  | "other";

export interface ProjectReferenceAsset {
  id: number;
  project_id: number;
  asset_type: ProjectReferenceAssetType;
  name: string;
  url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectListItem extends XhsContentProject {
  config?: ProjectConfig;
}

export interface ProjectDetailResponse extends XhsContentProject {
  config?: ProjectConfig;
  benchmark_notes: ProjectBenchmarkNoteItem[];
  reference_assets: ProjectReferenceAsset[];
}

export interface ProjectListParams {
  page?: number;
  pageSize?: number;
  status?: ProjectStatus;
  keyword?: string;
}

export interface ProjectListResponse {
  list: ProjectListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreateProjectPayload {
  name: string;
}

export interface RenameProjectPayload {
  id: number;
  name: string;
}

export interface DeleteProjectPayload {
  ids: number[];
}

export interface UploadFileResponse {
  url: string;
  file_name: string;
  file_key: string;
  file_size: number;
  file_type: string;
  category: string;
}

export interface UpdateProjectBenchmarkNotesPayload {
  project_id: number;
  collected_note_ids: number[];
}

export interface UpdateProjectConfigPayload {
  project_id: number;
  creative_theme?: string;
  core_expressions?: string[];
  specified_tags?: string[];
  forbidden_terms?: string[];
  cron_expr?: string;
}

export interface UpdateProjectReferenceAssetsPayloadItem {
  asset_type: ProjectReferenceAssetType;
  name: string;
  url: string;
  sort_order: number;
}

export interface UpdateProjectReferenceAssetsPayload {
  project_id: number;
  assets: UpdateProjectReferenceAssetsPayloadItem[];
}

export interface UpdateProjectStatusPayload {
  id: number;
  status: ProjectStatus;
}

export interface GenerateNoteNowPayload {
  project_id: number;
}

export type GeneratedNoteStatus = "generating" | "draft" | "done" | "failed";

export interface GeneratedNote {
  id: number;
  project_id: number;
  user_id: number;
  title: string;
  content: string;
  tags: string[];
  cover_url: string;
  images: string[];
  agent_query: string;
  benchmark_note_ids: number[];
  status: GeneratedNoteStatus;
  generation_error: string;
  created_at: string;
  updated_at: string;
}

export interface GeneratedNoteListParams {
  project_id: number;
  page?: number;
  pageSize?: number;
  status?: GeneratedNoteStatus;
  keyword?: string;
}

export interface GeneratedNoteListResponse {
  list: GeneratedNote[];
  total: number;
  page: number;
  pageSize: number;
}

export async function getProjectList(
  params: ProjectListParams = {},
): Promise<ProjectListResponse> {
  const res = await apiClient.get<ApiResponse<ProjectListResponse>>(
    "/xhs-content-project/project/list",
    { params },
  );

  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "获取项目列表失败");
  }

  return res.data.data;
}

export async function createProject(
  payload: CreateProjectPayload,
): Promise<XhsContentProject> {
  const res = await apiClient.post<ApiResponse<XhsContentProject>>(
    "/xhs-content-project/project/create",
    payload,
  );

  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "创建项目失败");
  }

  return res.data.data;
}

export async function renameProject(
  payload: RenameProjectPayload,
): Promise<void> {
  const res = await apiClient.post<ApiResponse>(
    "/xhs-content-project/project/rename",
    payload,
  );

  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "重命名项目失败");
  }
}

export async function deleteProject(
  payload: DeleteProjectPayload,
): Promise<void> {
  const res = await apiClient.post<ApiResponse>(
    "/xhs-content-project/project/delete",
    payload,
  );

  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "删除项目失败");
  }
}

export async function getProjectDetail(
  projectId: number,
): Promise<ProjectDetailResponse> {
  const res = await apiClient.get<ApiResponse<ProjectDetailResponse>>(
    "/xhs-content-project/project/detail",
    { params: { id: projectId } },
  );

  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "获取项目详情失败");
  }

  return res.data.data;
}

export async function updateProjectBenchmarkNotes(
  payload: UpdateProjectBenchmarkNotesPayload,
): Promise<void> {
  const res = await apiClient.post<ApiResponse>(
    "/xhs-content-project/project/updateBenchmarkNotes",
    payload,
  );

  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "更新项目关联对标笔记失败");
  }
}

export async function updateProjectConfig(
  payload: UpdateProjectConfigPayload,
): Promise<void> {
  const res = await apiClient.post<ApiResponse>(
    "/xhs-content-project/project/updateConfig",
    payload,
  );

  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "更新项目配置失败");
  }
}

export async function updateProjectStatus(
  payload: UpdateProjectStatusPayload,
): Promise<void> {
  const res = await apiClient.post<ApiResponse>(
    "/xhs-content-project/project/updateStatus",
    payload,
  );

  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "更新项目状态失败");
  }
}

export async function updateProjectReferenceAssets(
  payload: UpdateProjectReferenceAssetsPayload,
): Promise<void> {
  const res = await apiClient.post<ApiResponse>(
    "/xhs-content-project/project/updateReferenceAssets",
    payload,
  );

  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "更新项目参考资料失败");
  }
}

export async function uploadFile(file: File): Promise<UploadFileResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await apiClient.post<ApiResponse<UploadFileResponse>>(
    "/member/upload/file",
    formData,
    { headers: { "Content-Type": "multipart/form-data" }, timeout: 60000 },
  );

  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "上传文件失败");
  }

  return res.data.data;
}

export async function updateBrief(
  projectId: number,
  briefUrl: string,
): Promise<ProjectConfig> {
  const res = await apiClient.post<ApiResponse<ProjectConfig>>(
    "/xhs-content-project/project/updateBrief",
    { project_id: projectId, brief_url: briefUrl },
  );

  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "更新方案书失败");
  }

  return res.data.data;
}

export async function getGeneratedNoteList(
  params: GeneratedNoteListParams,
): Promise<GeneratedNoteListResponse> {
  const res = await apiClient.get<ApiResponse<GeneratedNoteListResponse>>(
    "/xhs-content-project/generatedNote/list",
    { params },
  );

  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "获取产出笔记列表失败");
  }

  return res.data.data;
}

export async function generateNoteNow(
  payload: GenerateNoteNowPayload,
): Promise<void> {
  const res = await apiClient.post<ApiResponse>(
    "/xhs-content-project/generatedNote/generateNow",
    payload,
  );

  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "立即生成笔记失败");
  }
}
