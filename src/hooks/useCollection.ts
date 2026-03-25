import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getNoteList, deleteNotes, type NoteListParams } from "~/api/collection";

export function useNoteList(params: NoteListParams = {}) {
  return useQuery({
    queryKey: ["noteList", params],
    queryFn: () => getNoteList(params),
  });
}

export function useDeleteNotes() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: number[]) => deleteNotes(ids),
    onSuccess: () => {
      toast.success("删除成功");
      queryClient.invalidateQueries({ queryKey: ["noteList"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "删除失败");
    },
  });
}
