import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProject,
  deleteProject,
  generateNoteNow,
  getGeneratedNoteList,
  getProjectDetail,
  getProjectList,
  renameProject,
  updateProjectConfig,
  updateProjectStatus,
  updateProjectBenchmarkNotes,
  updateProjectReferenceAssets,
  updateBrief,
  uploadFile,
  type CreateProjectPayload,
  type DeleteProjectPayload,
  type GeneratedNoteListParams,
  type GenerateNoteNowPayload,
  type ProjectListParams,
  type ProjectStatus,
  type RenameProjectPayload,
  type UpdateProjectConfigPayload,
  type UpdateProjectStatusPayload,
  type UpdateProjectBenchmarkNotesPayload,
  type UpdateProjectReferenceAssetsPayload,
} from "~/api/project";

export function useProjectList(params: ProjectListParams = {}) {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => getProjectList(params),
  });
}

export function useProjectDetail(projectId?: number) {
  return useQuery({
    queryKey: ["project-detail", projectId],
    queryFn: () => getProjectDetail(projectId as number),
    enabled: Boolean(projectId),
  });
}

export function useGeneratedNoteList(
  params?: GeneratedNoteListParams,
  projectStatus?: ProjectStatus,
) {
  return useQuery({
    queryKey: ["generated-note-list", params],
    queryFn: () => getGeneratedNoteList(params as GeneratedNoteListParams),
    enabled: Boolean(params?.project_id),
    refetchInterval: (query) => {
      const hasGeneratingNotes = query.state.data?.list?.some(
        (note) => note.status === "generating",
      );

      return projectStatus === "running" || hasGeneratingNotes ? 15000 : false;
    },
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProjectPayload) => createProject(payload),
    onSuccess: () => {
      toast.success("项目已创建");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "创建项目失败");
    },
  });
}

export function useRenameProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RenameProjectPayload) => renameProject(payload),
    onSuccess: (_data, variables) => {
      toast.success("项目名称已更新");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({
        queryKey: ["project-detail", variables.id],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "重命名项目失败");
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DeleteProjectPayload) => deleteProject(payload),
    onSuccess: () => {
      toast.success("项目已删除");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project-detail"] });
      queryClient.invalidateQueries({ queryKey: ["generated-note-list"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "删除项目失败");
    },
  });
}

export function useUploadFile() {
  return useMutation({
    mutationFn: (file: File) => uploadFile(file),
    onError: (error: Error) => {
      toast.error(error.message || "上传文件失败");
    },
  });
}

export function useUploadBrief() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      file,
      briefUrl,
    }: {
      projectId: number;
      file?: File;
      briefUrl?: string;
    }) => {
      const resolvedBriefUrl =
        briefUrl || (file ? (await uploadFile(file)).url : "");

      if (!resolvedBriefUrl) {
        throw new Error("缺少方案书文件");
      }

      return updateBrief(projectId, resolvedBriefUrl);
    },
    onSuccess: (_data, variables) => {
      toast.success("方案书已解析");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({
        queryKey: ["project-detail", variables.projectId],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "关联方案书失败");
    },
  });
}

export function useUpdateProjectConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProjectConfigPayload) =>
      updateProjectConfig(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({
        queryKey: ["project-detail", variables.project_id],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "更新项目配置失败");
    },
  });
}

export function useUpdateProjectStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProjectStatusPayload) =>
      updateProjectStatus(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({
        queryKey: ["project-detail", variables.id],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "更新项目状态失败");
    },
  });
}

export function useUpdateProjectBenchmarkNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProjectBenchmarkNotesPayload) =>
      updateProjectBenchmarkNotes(payload),
    onSuccess: (_data, variables) => {
      toast.success("对标笔记已更新");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({
        queryKey: ["project-detail", variables.project_id],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "更新对标笔记失败");
    },
  });
}

export function useUpdateProjectReferenceAssets() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      silent,
      ...payload
    }: UpdateProjectReferenceAssetsPayload & { silent?: boolean }) =>
      updateProjectReferenceAssets(payload),
    onSuccess: (_data, variables) => {
      if (!variables.silent) {
        toast.success("项目参考资料已更新");
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      }
      queryClient.invalidateQueries({
        queryKey: ["project-detail", variables.project_id],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "更新项目参考资料失败");
    },
  });
}

export function useGenerateNoteNow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: GenerateNoteNowPayload) => generateNoteNow(payload),
    onSuccess: (_data, variables) => {
      toast.success("已开始生成新笔记");
      queryClient.invalidateQueries({ queryKey: ["generated-note-list"] });
      queryClient.invalidateQueries({
        queryKey: ["project-detail", variables.project_id],
      });

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["generated-note-list"] });
      }, 1000);
    },
    onError: (error: Error) => {
      toast.error(error.message || "立即生成笔记失败");
    },
  });
}
