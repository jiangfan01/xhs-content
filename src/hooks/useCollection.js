"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNoteList = useNoteList;
exports.useDeleteNotes = useDeleteNotes;
var react_query_1 = require("@tanstack/react-query");
var sonner_1 = require("sonner");
var collection_1 = require("~/api/collection");
function useNoteList(params) {
    if (params === void 0) { params = {}; }
    return (0, react_query_1.useQuery)({
        queryKey: ["noteList", params],
        queryFn: function () { return (0, collection_1.getNoteList)(params); },
    });
}
function useDeleteNotes() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (ids) { return (0, collection_1.deleteNotes)(ids); },
        onSuccess: function () {
            sonner_1.toast.success("删除成功");
            queryClient.invalidateQueries({ queryKey: ["noteList"] });
        },
        onError: function (error) {
            sonner_1.toast.error(error.message || "删除失败");
        },
    });
}
