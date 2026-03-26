import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  generateKeywordCollectionTitles,
  getKeywordCollectionTagAnalysis,
  getKeywordCollectionKeywords,
  getKeywordCollectionNotes,
  getKeywordCollectionTabs,
  importLegacyKeywordCollectionFile,
  type KeywordCollectionKeywordListParams,
  type KeywordCollectionTagAnalysisParams,
  type KeywordCollectionTitleGeneratorParams,
  type KeywordCollectionNoteListParams,
} from "~/api/keywordCollection";

export function useKeywordCollectionKeywords(params: KeywordCollectionKeywordListParams = {}) {
  return useQuery({
    queryKey: ["keywordCollectionKeywords", params],
    queryFn: () => getKeywordCollectionKeywords(params),
  });
}

export function useKeywordCollectionTabs(keywordId?: number) {
  return useQuery({
    queryKey: ["keywordCollectionTabs", keywordId],
    queryFn: () => getKeywordCollectionTabs(keywordId as number),
    enabled: !!keywordId,
  });
}

export function useKeywordCollectionNotes(params?: KeywordCollectionNoteListParams) {
  return useQuery({
    queryKey: ["keywordCollectionNotes", params],
    queryFn: () => getKeywordCollectionNotes(params as KeywordCollectionNoteListParams),
    enabled: !!params?.keywordId,
  });
}

export function useKeywordCollectionTagAnalysis(params?: KeywordCollectionTagAnalysisParams) {
  return useQuery({
    queryKey: ["keywordCollectionTagAnalysis", params],
    queryFn: () => getKeywordCollectionTagAnalysis(params as KeywordCollectionTagAnalysisParams),
    enabled: !!params?.keywordId && !!params?.tabId,
  });
}

export function useImportLegacyKeywordCollectionFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => importLegacyKeywordCollectionFile(file),
    onSuccess: (data) => {
      toast.success(`导入成功：${data.keyword_name}，${data.tab_count} 个 tab，${data.imported_count} 条记录`);
      queryClient.invalidateQueries({ queryKey: ["keywordCollectionKeywords"] });
      queryClient.invalidateQueries({ queryKey: ["keywordCollectionTabs"] });
      queryClient.invalidateQueries({ queryKey: ["keywordCollectionNotes"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "导入失败");
    },
  });
}

export function useGenerateKeywordCollectionTitles() {
  return useMutation({
    mutationFn: (params: KeywordCollectionTitleGeneratorParams) => generateKeywordCollectionTitles(params),
    onError: (error: Error) => {
      toast.error(error.message || "标题生成失败");
    },
  });
}
