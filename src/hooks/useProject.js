"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProjectList = useProjectList;
exports.useProjectDetail = useProjectDetail;
exports.useGeneratedNoteList = useGeneratedNoteList;
exports.useCreateProject = useCreateProject;
exports.useRenameProject = useRenameProject;
exports.useDeleteProject = useDeleteProject;
exports.useUploadFile = useUploadFile;
exports.useUploadBrief = useUploadBrief;
exports.useUpdateProjectConfig = useUpdateProjectConfig;
exports.useUpdateProjectStatus = useUpdateProjectStatus;
exports.useUpdateProjectBenchmarkNotes = useUpdateProjectBenchmarkNotes;
exports.useUpdateProjectReferenceAssets = useUpdateProjectReferenceAssets;
exports.useGenerateNoteNow = useGenerateNoteNow;
var react_query_1 = require("@tanstack/react-query");
var sonner_1 = require("sonner");
var project_1 = require("~/api/project");
function useProjectList(params) {
    if (params === void 0) { params = {}; }
    return (0, react_query_1.useQuery)({
        queryKey: ["projects", params],
        queryFn: function () { return (0, project_1.getProjectList)(params); },
    });
}
function useProjectDetail(projectId) {
    return (0, react_query_1.useQuery)({
        queryKey: ["project-detail", projectId],
        queryFn: function () { return (0, project_1.getProjectDetail)(projectId); },
        enabled: Boolean(projectId),
    });
}
function useGeneratedNoteList(params, projectStatus) {
    return (0, react_query_1.useQuery)({
        queryKey: ["generated-note-list", params],
        queryFn: function () { return (0, project_1.getGeneratedNoteList)(params); },
        enabled: Boolean(params === null || params === void 0 ? void 0 : params.project_id),
        refetchInterval: function (query) {
            var _a, _b;
            var hasGeneratingNotes = (_b = (_a = query.state.data) === null || _a === void 0 ? void 0 : _a.list) === null || _b === void 0 ? void 0 : _b.some(function (note) { return note.status === "generating"; });
            return projectStatus === "running" || hasGeneratingNotes ? 15000 : false;
        },
    });
}
function useCreateProject() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (payload) { return (0, project_1.createProject)(payload); },
        onSuccess: function () {
            sonner_1.toast.success("项目已创建");
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: function (error) {
            sonner_1.toast.error(error.message || "创建项目失败");
        },
    });
}
function useRenameProject() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (payload) { return (0, project_1.renameProject)(payload); },
        onSuccess: function (_data, variables) {
            sonner_1.toast.success("项目名称已更新");
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({
                queryKey: ["project-detail", variables.id],
            });
        },
        onError: function (error) {
            sonner_1.toast.error(error.message || "重命名项目失败");
        },
    });
}
function useDeleteProject() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (payload) { return (0, project_1.deleteProject)(payload); },
        onSuccess: function () {
            sonner_1.toast.success("项目已删除");
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["project-detail"] });
            queryClient.invalidateQueries({ queryKey: ["generated-note-list"] });
        },
        onError: function (error) {
            sonner_1.toast.error(error.message || "删除项目失败");
        },
    });
}
function useUploadFile() {
    return (0, react_query_1.useMutation)({
        mutationFn: function (file) { return (0, project_1.uploadFile)(file); },
        onError: function (error) {
            sonner_1.toast.error(error.message || "上传文件失败");
        },
    });
}
function useUploadBrief() {
    var _this = this;
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var resolvedBriefUrl, _c, _d;
            var projectId = _b.projectId, file = _b.file, briefUrl = _b.briefUrl;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _c = briefUrl;
                        if (_c) return [3 /*break*/, 4];
                        if (!file) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, project_1.uploadFile)(file)];
                    case 1:
                        _d = (_e.sent()).url;
                        return [3 /*break*/, 3];
                    case 2:
                        _d = "";
                        _e.label = 3;
                    case 3:
                        _c = (_d);
                        _e.label = 4;
                    case 4:
                        resolvedBriefUrl = _c;
                        if (!resolvedBriefUrl) {
                            throw new Error("缺少方案书文件");
                        }
                        return [2 /*return*/, (0, project_1.updateBrief)(projectId, resolvedBriefUrl)];
                }
            });
        }); },
        onSuccess: function (_data, variables) {
            sonner_1.toast.success("方案书已解析");
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({
                queryKey: ["project-detail", variables.projectId],
            });
        },
        onError: function (error) {
            sonner_1.toast.error(error.message || "关联方案书失败");
        },
    });
}
function useUpdateProjectConfig() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (payload) {
            return (0, project_1.updateProjectConfig)(payload);
        },
        onSuccess: function (_data, variables) {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({
                queryKey: ["project-detail", variables.project_id],
            });
        },
        onError: function (error) {
            sonner_1.toast.error(error.message || "更新项目配置失败");
        },
    });
}
function useUpdateProjectStatus() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (payload) {
            return (0, project_1.updateProjectStatus)(payload);
        },
        onSuccess: function (_data, variables) {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({
                queryKey: ["project-detail", variables.id],
            });
        },
        onError: function (error) {
            sonner_1.toast.error(error.message || "更新项目状态失败");
        },
    });
}
function useUpdateProjectBenchmarkNotes() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (payload) {
            return (0, project_1.updateProjectBenchmarkNotes)(payload);
        },
        onSuccess: function (_data, variables) {
            sonner_1.toast.success("对标笔记已更新");
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({
                queryKey: ["project-detail", variables.project_id],
            });
        },
        onError: function (error) {
            sonner_1.toast.error(error.message || "更新对标笔记失败");
        },
    });
}
function useUpdateProjectReferenceAssets() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var silent = _a.silent, payload = __rest(_a, ["silent"]);
            return (0, project_1.updateProjectReferenceAssets)(payload);
        },
        onSuccess: function (_data, variables) {
            if (!variables.silent) {
                sonner_1.toast.success("项目参考资料已更新");
                queryClient.invalidateQueries({ queryKey: ["projects"] });
            }
            queryClient.invalidateQueries({
                queryKey: ["project-detail", variables.project_id],
            });
        },
        onError: function (error) {
            sonner_1.toast.error(error.message || "更新项目参考资料失败");
        },
    });
}
function useGenerateNoteNow() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (payload) { return (0, project_1.generateNoteNow)(payload); },
        onSuccess: function (_data, variables) {
            sonner_1.toast.success("已开始生成新笔记");
            queryClient.invalidateQueries({ queryKey: ["generated-note-list"] });
            queryClient.invalidateQueries({
                queryKey: ["project-detail", variables.project_id],
            });
            setTimeout(function () {
                queryClient.invalidateQueries({ queryKey: ["generated-note-list"] });
            }, 1000);
        },
        onError: function (error) {
            sonner_1.toast.error(error.message || "立即生成笔记失败");
        },
    });
}
