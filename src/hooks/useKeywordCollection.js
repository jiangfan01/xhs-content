"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeywordCollectionKeywords = useKeywordCollectionKeywords;
exports.useKeywordCollectionTabs = useKeywordCollectionTabs;
exports.useKeywordCollectionNotes = useKeywordCollectionNotes;
exports.useKeywordCollectionTagAnalysis = useKeywordCollectionTagAnalysis;
exports.useImportLegacyKeywordCollectionFile = useImportLegacyKeywordCollectionFile;
exports.useGenerateKeywordCollectionTitles = useGenerateKeywordCollectionTitles;
var react_query_1 = require("@tanstack/react-query");
var sonner_1 = require("sonner");
var keywordCollection_1 = require("~/api/keywordCollection");
function useKeywordCollectionKeywords(params) {
    if (params === void 0) { params = {}; }
    return (0, react_query_1.useQuery)({
        queryKey: ["keywordCollectionKeywords", params],
        queryFn: function () { return (0, keywordCollection_1.getKeywordCollectionKeywords)(params); },
    });
}
function useKeywordCollectionTabs(keywordId) {
    return (0, react_query_1.useQuery)({
        queryKey: ["keywordCollectionTabs", keywordId],
        queryFn: function () { return (0, keywordCollection_1.getKeywordCollectionTabs)(keywordId); },
        enabled: !!keywordId,
    });
}
function useKeywordCollectionNotes(params) {
    return (0, react_query_1.useQuery)({
        queryKey: ["keywordCollectionNotes", params],
        queryFn: function () { return (0, keywordCollection_1.getKeywordCollectionNotes)(params); },
        enabled: !!(params === null || params === void 0 ? void 0 : params.keywordId),
    });
}
function useKeywordCollectionTagAnalysis(params) {
    return (0, react_query_1.useQuery)({
        queryKey: ["keywordCollectionTagAnalysis", params],
        queryFn: function () { return (0, keywordCollection_1.getKeywordCollectionTagAnalysis)(params); },
        enabled: !!(params === null || params === void 0 ? void 0 : params.keywordId) && !!(params === null || params === void 0 ? void 0 : params.tabId),
    });
}
function useImportLegacyKeywordCollectionFile() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (file) { return (0, keywordCollection_1.importLegacyKeywordCollectionFile)(file); },
        onSuccess: function (data) {
            sonner_1.toast.success("\u5BFC\u5165\u6210\u529F\uFF1A".concat(data.keyword_name, "\uFF0C").concat(data.tab_count, " \u4E2A tab\uFF0C").concat(data.imported_count, " \u6761\u8BB0\u5F55"));
            queryClient.invalidateQueries({ queryKey: ["keywordCollectionKeywords"] });
            queryClient.invalidateQueries({ queryKey: ["keywordCollectionTabs"] });
            queryClient.invalidateQueries({ queryKey: ["keywordCollectionNotes"] });
        },
        onError: function (error) {
            sonner_1.toast.error(error.message || "导入失败");
        },
    });
}
function useGenerateKeywordCollectionTitles() {
    return (0, react_query_1.useMutation)({
        mutationFn: function (params) { return (0, keywordCollection_1.generateKeywordCollectionTitles)(params); },
        onError: function (error) {
            sonner_1.toast.error(error.message || "标题生成失败");
        },
    });
}
