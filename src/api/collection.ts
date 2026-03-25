import apiClient, { type ApiResponse } from "./client";

export interface XhsCollectedNote {
  id: number;
  user_id: number;
  note_id: string;
  note_url: string;
  platform: string;
  note_type: "image" | "video";
  title: string;
  content: string;
  tags: string[];
  cover_url: string;
  images: string[];
  video_url: string;
  video_poster: string;
  author_name: string;
  author_avatar: string;
  like_count: number;
  collect_count: number;
  comment_count: number;
  publish_time: string;
  collected_at: string;
  created_at: string;
  updated_at: string;
}

export interface NoteListParams {
  page?: number;
  pageSize?: number;
  noteType?: "image" | "video";
  keyword?: string;
}

interface NoteListResponse {
  list: XhsCollectedNote[];
  total: number;
  page: number;
  pageSize: number;
}

export async function getNoteList(params: NoteListParams = {}): Promise<NoteListResponse> {
  const res = await apiClient.get<ApiResponse<NoteListResponse>>(
    "/content-clipper/xhs-note/list",
    { params }
  );
  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "获取笔记列表失败");
  }
  return res.data.data;
}

export async function deleteNotes(ids: number[]): Promise<void> {
  const res = await apiClient.post<ApiResponse>("/content-clipper/xhs-note/delete", { ids });
  if (res.data.code !== 0) {
    throw new Error(res.data.msg || "删除笔记失败");
  }
}
