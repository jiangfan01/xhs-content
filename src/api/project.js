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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectList = getProjectList;
exports.createProject = createProject;
exports.renameProject = renameProject;
exports.deleteProject = deleteProject;
exports.getProjectDetail = getProjectDetail;
exports.updateProjectBenchmarkNotes = updateProjectBenchmarkNotes;
exports.updateProjectConfig = updateProjectConfig;
exports.updateProjectStatus = updateProjectStatus;
exports.updateProjectReferenceAssets = updateProjectReferenceAssets;
exports.uploadFile = uploadFile;
exports.updateBrief = updateBrief;
exports.getGeneratedNoteList = getGeneratedNoteList;
exports.generateNoteNow = generateNoteNow;
var client_1 = require("./client");
function getProjectList() {
    return __awaiter(this, arguments, void 0, function (params) {
        var res;
        if (params === void 0) { params = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.default.get("/xhs-content-project/project/list", { params: params })];
                case 1:
                    res = _a.sent();
                    if (res.data.code !== 0) {
                        throw new Error(res.data.msg || "获取项目列表失败");
                    }
                    return [2 /*return*/, res.data.data];
            }
        });
    });
}
function createProject(payload) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.default.post("/xhs-content-project/project/create", payload)];
                case 1:
                    res = _a.sent();
                    if (res.data.code !== 0) {
                        throw new Error(res.data.msg || "创建项目失败");
                    }
                    return [2 /*return*/, res.data.data];
            }
        });
    });
}
function renameProject(payload) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.default.post("/xhs-content-project/project/rename", payload)];
                case 1:
                    res = _a.sent();
                    if (res.data.code !== 0) {
                        throw new Error(res.data.msg || "重命名项目失败");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function deleteProject(payload) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.default.post("/xhs-content-project/project/delete", payload)];
                case 1:
                    res = _a.sent();
                    if (res.data.code !== 0) {
                        throw new Error(res.data.msg || "删除项目失败");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getProjectDetail(projectId) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.default.get("/xhs-content-project/project/detail", { params: { id: projectId } })];
                case 1:
                    res = _a.sent();
                    if (res.data.code !== 0) {
                        throw new Error(res.data.msg || "获取项目详情失败");
                    }
                    return [2 /*return*/, res.data.data];
            }
        });
    });
}
function updateProjectBenchmarkNotes(payload) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.default.post("/xhs-content-project/project/updateBenchmarkNotes", payload)];
                case 1:
                    res = _a.sent();
                    if (res.data.code !== 0) {
                        throw new Error(res.data.msg || "更新项目关联对标笔记失败");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function updateProjectConfig(payload) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.default.post("/xhs-content-project/project/updateConfig", payload)];
                case 1:
                    res = _a.sent();
                    if (res.data.code !== 0) {
                        throw new Error(res.data.msg || "更新项目配置失败");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function updateProjectStatus(payload) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.default.post("/xhs-content-project/project/updateStatus", payload)];
                case 1:
                    res = _a.sent();
                    if (res.data.code !== 0) {
                        throw new Error(res.data.msg || "更新项目状态失败");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function updateProjectReferenceAssets(payload) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.default.post("/xhs-content-project/project/updateReferenceAssets", payload)];
                case 1:
                    res = _a.sent();
                    if (res.data.code !== 0) {
                        throw new Error(res.data.msg || "更新项目参考资料失败");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function uploadFile(file) {
    return __awaiter(this, void 0, void 0, function () {
        var formData, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formData = new FormData();
                    formData.append("file", file);
                    return [4 /*yield*/, client_1.default.post("/member/upload/file", formData, { headers: { "Content-Type": "multipart/form-data" }, timeout: 60000 })];
                case 1:
                    res = _a.sent();
                    if (res.data.code !== 0) {
                        throw new Error(res.data.msg || "上传文件失败");
                    }
                    return [2 /*return*/, res.data.data];
            }
        });
    });
}
function updateBrief(projectId, briefUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.default.post("/xhs-content-project/project/updateBrief", { project_id: projectId, brief_url: briefUrl })];
                case 1:
                    res = _a.sent();
                    if (res.data.code !== 0) {
                        throw new Error(res.data.msg || "更新方案书失败");
                    }
                    return [2 /*return*/, res.data.data];
            }
        });
    });
}
function getGeneratedNoteList(params) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.default.get("/xhs-content-project/generatedNote/list", { params: params })];
                case 1:
                    res = _a.sent();
                    if (res.data.code !== 0) {
                        throw new Error(res.data.msg || "获取产出笔记列表失败");
                    }
                    return [2 /*return*/, res.data.data];
            }
        });
    });
}
function generateNoteNow(payload) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.default.post("/xhs-content-project/generatedNote/generateNow", payload)];
                case 1:
                    res = _a.sent();
                    if (res.data.code !== 0) {
                        throw new Error(res.data.msg || "立即生成笔记失败");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
