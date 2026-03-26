"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GenerationPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var useCollection_1 = require("~/hooks/useCollection");
var useProject_1 = require("~/hooks/useProject");
require("./generation.css");
var GENERATED_NOTE_PAGE_SIZE = 20;
var statusMeta = {
    running: { label: "运行中", className: "generation-status--running" },
    paused: { label: "暂停", className: "generation-status--paused" },
};
var noteStatusMeta = {
    generating: {
        label: "生成中",
        className: "generation-status--generating",
    },
    draft: {
        label: "待编辑",
        className: "generation-status--draft-note",
    },
    done: {
        label: "已完成",
        className: "generation-status--done",
    },
    failed: {
        label: "生成失败",
        className: "generation-status--failed",
    },
};
var setupSteps = [
    {
        id: 1,
        label: "项目名称",
        title: "第一步：先确定项目名称",
        description: "用一个清晰的项目容器承接后续资料、参考内容和生成结果。",
        icon: lucide_react_1.FolderPlus,
    },
    {
        id: 2,
        label: "对标笔记",
        title: "第二步：选择对标笔记",
        description: "直接从采集笔记模块里勾选要挂到项目上的参考内容。",
        icon: lucide_react_1.TextQuote,
    },
    {
        id: 3,
        label: "推广资料",
        title: "第三步：整理推广资料",
        description: "把截图、评论图、活动海报和示意素材收进同一个项目上下文。",
        icon: lucide_react_1.ImagePlus,
    },
    {
        id: 4,
        label: "表达规则",
        title: "第四步：配置核心话术和表达",
        description: "明确必须出现的利益点、禁用词和整体口吻，后续生成才更稳定。",
        icon: lucide_react_1.MessagesSquare,
    },
    {
        id: 5,
        label: "完成确认",
        title: "最后一步：确认项目初始化结果",
        description: "把准备动作收束成一个摘要，然后直接进入项目工作台。",
        icon: lucide_react_1.Check,
    },
];
var emptyStepList = [
    {
        index: "1",
        title: "创建项目",
        description: "先确定产品或 campaign，后续内容都会沉淀在同一个项目下。",
    },
    {
        index: "2",
        title: "勾选对标笔记",
        description: "直接从采集笔记模块里选参考内容，后续还能在项目设置里继续维护。",
    },
    {
        index: "3",
        title: "进入持续生成",
        description: "以后新增笔记、查看结果、继续编辑，都在项目工作台完成。",
    },
];
var capabilityHints = [
    "对标笔记直接复用采集笔记数据，不再手动粘贴链接。",
    "项目设置收敛在一个居中弹框里，不再和列表页混排。",
    "采集主表里笔记被删除后，项目侧会显示“笔记已被删除”。",
    "项目设置调整后，只影响后续生成结果，不回写历史内容。",
];
var coreExpressionSuggestions = [
    "立即下载应用",
    "内容见评论区",
    "点击立即体验",
];
var forbiddenTermSuggestions = ["最强", "全网第一", "保证有效"];
var settingsSections = [
    {
        key: "runtime",
        label: "运行配置",
        description: "管理启动、暂停和运行间隔",
        icon: lucide_react_1.Settings2,
    },
    {
        key: "brief",
        label: "项目方案书",
        description: "上传和替换方案书文件",
        icon: lucide_react_1.FileStack,
    },
    {
        key: "benchmark",
        label: "对标笔记",
        description: "管理采集笔记关联",
        icon: lucide_react_1.TextQuote,
    },
    {
        key: "assets",
        label: "推广资料",
        description: "上传和维护项目参考资料",
        icon: lucide_react_1.ImagePlus,
    },
    {
        key: "messaging",
        label: "表达规则",
        description: "维护项目表达要求",
        icon: lucide_react_1.MessagesSquare,
    },
];
var initialSetupDraft = {
    name: "",
    benchmarkNoteIds: [],
    referenceAssets: [],
    assetNote: "例如：前 2 张是功能截图，第 3 张是活动权益海报，第 4 张以后更适合做正文配图。",
    coreExpressions: ["立即下载应用", "内容见评论区"],
    specifiedTags: [],
    forbiddenTerms: ["最强", "全网第一"],
};
var referenceAssetTypeOptions = [
    { value: "product_image", label: "产品图" },
    { value: "logo_image", label: "Logo图" },
    { value: "app_screenshot", label: "应用截图" },
    { value: "app_store_screenshot", label: "应用商店截图" },
    { value: "comment_image", label: "评论图" },
    { value: "campaign_poster", label: "活动海报" },
    { value: "other", label: "其他" },
];
function formatDateLabel(value) {
    if (!value) {
        return "--";
    }
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}
function formatDateOnly(value) {
    if (!value) {
        return "--";
    }
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return new Intl.DateTimeFormat("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}
function uniqueNumberIds(values) {
    var seen = new Set();
    var result = [];
    values.forEach(function (value) {
        if (!value || seen.has(value)) {
            return;
        }
        seen.add(value);
        result.push(value);
    });
    return result;
}
function getNotePreviewImage(note) {
    var _a;
    return note.cover_url || ((_a = note.images) === null || _a === void 0 ? void 0 : _a[0]) || "";
}
function createReferenceAssetDraft(input) {
    var _a, _b;
    return {
        localId: "".concat(Date.now(), "-").concat(Math.random().toString(36).slice(2, 8)),
        id: input.id,
        assetType: (_a = input.assetType) !== null && _a !== void 0 ? _a : "product_image",
        name: input.name,
        url: input.url,
        sortOrder: (_b = input.sortOrder) !== null && _b !== void 0 ? _b : 0,
    };
}
function mapReferenceAssetToDraft(asset, index) {
    return createReferenceAssetDraft({
        id: asset.id,
        assetType: asset.asset_type,
        name: asset.name,
        url: asset.url,
        sortOrder: asset.sort_order || index + 1,
    });
}
function normalizeReferenceAssetPayload(assets) {
    return assets.map(function (asset, index) { return ({
        asset_type: asset.assetType,
        name: asset.name.trim(),
        url: asset.url.trim(),
        sort_order: index + 1,
    }); });
}
function normalizeRuleItems(items) {
    var seen = new Set();
    var result = [];
    items.forEach(function (item) {
        var trimmed = item.trim();
        if (!trimmed || seen.has(trimmed)) {
            return;
        }
        seen.add(trimmed);
        result.push(trimmed.slice(0, 100));
    });
    return result;
}
function getReferenceAssetTypeLabel(assetType) {
    var _a, _b;
    return ((_b = (_a = referenceAssetTypeOptions.find(function (item) { return item.value === assetType; })) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : "其他");
}
function createSettingsDraft(project, creativeTheme, coreExpressions, specifiedTags, forbiddenTerms, generateIntervalMin) {
    var _a;
    return {
        name: project.name,
        projectStatus: project.status,
        creativeTheme: (_a = creativeTheme === null || creativeTheme === void 0 ? void 0 : creativeTheme.trim()) !== null && _a !== void 0 ? _a : "",
        coreExpressions: normalizeRuleItems(coreExpressions !== null && coreExpressions !== void 0 ? coreExpressions : []),
        specifiedTags: normalizeRuleItems(specifiedTags !== null && specifiedTags !== void 0 ? specifiedTags : []),
        forbiddenTerms: normalizeRuleItems(forbiddenTerms !== null && forbiddenTerms !== void 0 ? forbiddenTerms : []),
        generateIntervalMin: normalizeGenerateIntervalValue(generateIntervalMin),
    };
}
function normalizeGenerateIntervalValue(value) {
    if (value === undefined || value === null || value === "") {
        return "";
    }
    if (typeof value === "number") {
        return String(value);
    }
    return String(value);
}
function getGenerateIntervalMinutes(value) {
    var normalizedValue = normalizeGenerateIntervalValue(value).trim();
    if (!normalizedValue) {
        return "";
    }
    if (/^\d+$/.test(normalizedValue)) {
        return normalizedValue;
    }
    var everyMinuteMatch = normalizedValue.match(/^\*\/(\d+)\s+\*\s+\*\s+\*\s+\*$/);
    if (everyMinuteMatch) {
        return everyMinuteMatch[1];
    }
    if (normalizedValue === "0 * * * *") {
        return "60";
    }
    var everyHourMatch = normalizedValue.match(/^0\s+\*\/(\d+)\s+\*\s+\*\s+\*$/);
    if (everyHourMatch) {
        return String(Number.parseInt(everyHourMatch[1], 10) * 60);
    }
    if (normalizedValue === "0 0 * * *") {
        return "1440";
    }
    return "";
}
function buildGenerateIntervalCron(minutes) {
    if (minutes < 60) {
        if (60 % minutes !== 0) {
            return null;
        }
        return "*/".concat(minutes, " * * * *");
    }
    if (minutes === 60) {
        return "0 * * * *";
    }
    if (minutes < 1440 && minutes % 60 === 0) {
        var hours = minutes / 60;
        if (24 % hours !== 0) {
            return null;
        }
        return "0 */".concat(hours, " * * *");
    }
    if (minutes === 1440) {
        return "0 0 * * *";
    }
    return null;
}
function getGeneratedNoteImages(note) {
    var _a, _b;
    var images = (_b = (_a = note.images) === null || _a === void 0 ? void 0 : _a.filter(Boolean)) !== null && _b !== void 0 ? _b : [];
    if (images.length > 0) {
        return images;
    }
    return note.cover_url ? [note.cover_url] : [];
}
function getGeneratedNoteCoverImage(note) {
    var _a;
    return (_a = getGeneratedNoteImages(note)[0]) !== null && _a !== void 0 ? _a : "";
}
function getGeneratedNoteTitle(note) {
    var _a;
    if ((_a = note.title) === null || _a === void 0 ? void 0 : _a.trim()) {
        return note.title.trim();
    }
    if (note.status === "generating") {
        return "AI 正在生成新笔记";
    }
    if (note.status === "failed") {
        return "本次生成未成功完成";
    }
    return "未命名产出笔记";
}
function getGeneratedNoteSummary(note) {
    var _a, _b;
    if (note.status === "generating") {
        return "系统已经创建生成任务，正在等待 AI 返回内容。你可以离开页面，列表会自动刷新。";
    }
    if (note.status === "failed") {
        return (((_a = note.generation_error) === null || _a === void 0 ? void 0 : _a.trim()) || "生成失败，但后端没有返回详细错误信息。");
    }
    if ((_b = note.content) === null || _b === void 0 ? void 0 : _b.trim()) {
        return note.content.trim();
    }
    return "当前还没有可展示的正文内容。";
}
function CollectedNotePickerCard(_a) {
    var note = _a.note, selected = _a.selected, onToggle = _a.onToggle;
    var previewImage = getNotePreviewImage(note);
    return ((0, jsx_runtime_1.jsxs)("article", { className: "generation-benchmark-card ".concat(selected ? "generation-benchmark-card--selected" : ""), children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-benchmark-card__select", onClick: onToggle, "aria-pressed": selected, children: selected ? (0, jsx_runtime_1.jsx)(lucide_react_1.Check, { size: 14 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { size: 14 }) }), (0, jsx_runtime_1.jsx)("div", { className: "generation-benchmark-card__preview", children: previewImage ? ((0, jsx_runtime_1.jsx)("img", { src: previewImage, alt: note.title || "采集笔记封面" })) : ((0, jsx_runtime_1.jsx)("span", { children: note.note_type === "video" ? "视频" : "图文" })) }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-benchmark-card__body", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-benchmark-card__meta", children: [(0, jsx_runtime_1.jsxs)("span", { className: "generation-tag generation-tag--soft", children: [note.note_type === "video" ? ((0, jsx_runtime_1.jsx)(lucide_react_1.Video, { size: 12 })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Image, { size: 12 })), note.note_type === "video" ? "视频" : "图文"] }), (0, jsx_runtime_1.jsxs)("span", { className: "generation-benchmark-card__time", children: ["\u91C7\u96C6\u4E8E ", formatDateOnly(note.collected_at)] })] }), (0, jsx_runtime_1.jsx)("strong", { children: note.title || "无标题笔记" }), (0, jsx_runtime_1.jsx)("p", { children: note.content || "暂无正文内容" }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-benchmark-card__footer", children: [(0, jsx_runtime_1.jsx)("span", { children: note.author_name || "未知作者" }), (0, jsx_runtime_1.jsxs)("a", { href: note.note_url, target: "_blank", rel: "noreferrer", children: ["\u67E5\u770B\u539F\u6587", (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, { size: 12 })] })] })] })] }));
}
function ProjectBenchmarkCard(_a) {
    var _b;
    var item = _a.item;
    if (item.is_deleted || !item.note) {
        return ((0, jsx_runtime_1.jsxs)("article", { className: "generation-reference-card generation-reference-card--deleted", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-reference-card__thumb", children: "\u5DF2\u5220" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u7B14\u8BB0\u5DF2\u88AB\u5220\u9664" }), (0, jsx_runtime_1.jsx)("p", { children: "\u91C7\u96C6\u4E3B\u8868\u4E2D\u5DF2\u627E\u4E0D\u5230\u8FD9\u6761\u7B14\u8BB0\u8BB0\u5F55\uFF0C\u4F60\u53EF\u4EE5\u79FB\u9664\u5B83\u6216\u91CD\u65B0\u9009\u62E9\u65B0\u7684\u5BF9\u6807\u7B14\u8BB0\u3002" })] })] }));
    }
    var previewImage = item.note.cover_url || ((_b = item.note.images) === null || _b === void 0 ? void 0 : _b[0]) || "";
    return ((0, jsx_runtime_1.jsxs)("article", { className: "generation-reference-card generation-reference-card--rich", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-reference-card__thumb generation-reference-card__thumb--image", children: previewImage ? ((0, jsx_runtime_1.jsx)("img", { src: previewImage, alt: item.note.title || "对标笔记封面" })) : ((0, jsx_runtime_1.jsx)("span", { children: item.note.note_type === "video" ? "视频" : "图文" })) }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-reference-card__body", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-reference-card__meta", children: [(0, jsx_runtime_1.jsxs)("span", { className: "generation-tag generation-tag--soft", children: [item.note.note_type === "video" ? ((0, jsx_runtime_1.jsx)(lucide_react_1.Video, { size: 12 })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Image, { size: 12 })), item.note.note_type === "video" ? "视频" : "图文"] }), (0, jsx_runtime_1.jsxs)("span", { className: "generation-benchmark-card__time", children: ["\u91C7\u96C6\u4E8E ", formatDateOnly(item.note.collected_at)] })] }), (0, jsx_runtime_1.jsx)("strong", { children: item.note.title || "无标题笔记" }), (0, jsx_runtime_1.jsx)("p", { children: item.note.content || "暂无正文内容" }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-reference-card__footer", children: [(0, jsx_runtime_1.jsx)("span", { children: item.note.author_name || "未知作者" }), (0, jsx_runtime_1.jsxs)("a", { href: item.note.note_url, target: "_blank", rel: "noreferrer", children: ["\u67E5\u770B\u539F\u6587", (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, { size: 12 })] })] })] })] }));
}
function ReferenceAssetCard(_a) {
    var asset = _a.asset, index = _a.index, onNameChange = _a.onNameChange, onTypeChange = _a.onTypeChange, onRemove = _a.onRemove;
    return ((0, jsx_runtime_1.jsxs)("article", { className: "generation-reference-asset-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-reference-asset-card__preview", children: (0, jsx_runtime_1.jsx)("img", { src: asset.url, alt: asset.name || "\u9879\u76EE\u8D44\u6599 ".concat(index + 1) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-reference-asset-card__body", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-reference-asset-card__meta", children: [(0, jsx_runtime_1.jsxs)("span", { className: "generation-tag generation-tag--soft", children: ["\u8D44\u6599 ", index + 1] }), (0, jsx_runtime_1.jsx)("span", { children: getReferenceAssetTypeLabel(asset.assetType) })] }), (0, jsx_runtime_1.jsxs)("label", { className: "generation-field", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u8D44\u6599\u540D\u79F0" }), (0, jsx_runtime_1.jsx)("input", { className: "generation-input", value: asset.name, onChange: function (event) { return onNameChange(event.target.value); }, placeholder: "\u8BF7\u8F93\u5165\u8D44\u6599\u540D\u79F0", maxLength: 255 })] }), (0, jsx_runtime_1.jsxs)("label", { className: "generation-field", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u8D44\u6599\u7C7B\u578B" }), (0, jsx_runtime_1.jsx)("select", { className: "generation-select", value: asset.assetType, onChange: function (event) {
                                    return onTypeChange(event.target.value);
                                }, children: referenceAssetTypeOptions.map(function (item) { return ((0, jsx_runtime_1.jsx)("option", { value: item.value, children: item.label }, item.value)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-reference-asset-card__footer", children: [(0, jsx_runtime_1.jsxs)("a", { href: asset.url, target: "_blank", rel: "noreferrer", children: ["\u67E5\u770B\u539F\u56FE", (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, { size: 12 })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: onRemove, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 14 }), "\u5220\u9664"] })] })] })] }));
}
function RuleListEditor(_a) {
    var label = _a.label, placeholder = _a.placeholder, suggestions = _a.suggestions, values = _a.values, inputValue = _a.inputValue, onInputChange = _a.onInputChange, onAdd = _a.onAdd, onSuggestionClick = _a.onSuggestionClick, onRemove = _a.onRemove;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "generation-surface-card", children: [(0, jsx_runtime_1.jsx)("label", { className: "generation-field", children: (0, jsx_runtime_1.jsx)("span", { children: label }) }), values.length ? ((0, jsx_runtime_1.jsx)("div", { className: "generation-rule-list", children: values.map(function (value) { return ((0, jsx_runtime_1.jsxs)("span", { className: "generation-rule-chip", children: [(0, jsx_runtime_1.jsx)("span", { children: value }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: function () { return onRemove(value); }, "aria-label": "\u79FB\u9664".concat(value), children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 12 }) })] }, value)); }) })) : ((0, jsx_runtime_1.jsxs)("div", { className: "generation-inline-feedback", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { size: 14 }), "\u8FD8\u6CA1\u6709\u6DFB\u52A0\u5185\u5BB9"] })), (0, jsx_runtime_1.jsxs)("div", { className: "generation-rule-addbar", children: [(0, jsx_runtime_1.jsx)("input", { className: "generation-input", value: inputValue, onChange: function (event) { return onInputChange(event.target.value); }, onKeyDown: function (event) {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                onAdd();
                            }
                        }, placeholder: placeholder, maxLength: 100 }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: onAdd, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { size: 16 }), "\u6DFB\u52A0"] })] }), suggestions.length ? ((0, jsx_runtime_1.jsxs)("div", { className: "generation-rule-suggestions", children: [(0, jsx_runtime_1.jsx)("span", { className: "generation-rule-suggestions__label", children: "\u63A8\u8350\u53C2\u8003" }), (0, jsx_runtime_1.jsx)("div", { className: "generation-rule-suggestions__list", children: suggestions.map(function (value) { return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-tag generation-tag--soft generation-rule-suggestion", onClick: function () { return onSuggestionClick(value); }, children: value }, value)); }) })] })) : null] }));
}
function GenerationPage() {
    var _this = this;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26;
    var projectListQuery = (0, useProject_1.useProjectList)({ page: 1, pageSize: 100 });
    var createProjectMutation = (0, useProject_1.useCreateProject)();
    var deleteProjectMutation = (0, useProject_1.useDeleteProject)();
    var renameProjectMutation = (0, useProject_1.useRenameProject)();
    var uploadFileMutation = (0, useProject_1.useUploadFile)();
    var uploadReferenceFileMutation = (0, useProject_1.useUploadFile)();
    var uploadBriefMutation = (0, useProject_1.useUploadBrief)();
    var generateNoteNowMutation = (0, useProject_1.useGenerateNoteNow)();
    var updateProjectConfigMutation = (0, useProject_1.useUpdateProjectConfig)();
    var updateProjectStatusMutation = (0, useProject_1.useUpdateProjectStatus)();
    var updateBenchmarkNotesMutation = (0, useProject_1.useUpdateProjectBenchmarkNotes)();
    var updateReferenceAssetsMutation = (0, useProject_1.useUpdateProjectReferenceAssets)();
    var briefFileRef = (0, react_1.useRef)(null);
    var wizardReferenceFileRef = (0, react_1.useRef)(null);
    var settingsReferenceFileRef = (0, react_1.useRef)(null);
    var settingsReferenceAutosaveTimerRef = (0, react_1.useRef)(null);
    var lastPersistedSettingsReferenceAssetsRef = (0, react_1.useRef)("[]");
    var settingsReferenceAssetsRef = (0, react_1.useRef)([]);
    var settingsReferenceAssetsDirtyRef = (0, react_1.useRef)(false);
    var settingsReferencePersistInFlightRef = (0, react_1.useRef)(false);
    var queuedSettingsReferenceAssetsRef = (0, react_1.useRef)(null);
    var _27 = (0, react_1.useState)(""), activeProjectId = _27[0], setActiveProjectId = _27[1];
    var _28 = (0, react_1.useState)(false), isWizardOpen = _28[0], setIsWizardOpen = _28[1];
    var _29 = (0, react_1.useState)(1), wizardStep = _29[0], setWizardStep = _29[1];
    var _30 = (0, react_1.useState)(initialSetupDraft), setupDraft = _30[0], setSetupDraft = _30[1];
    var _31 = (0, react_1.useState)(null), briefFile = _31[0], setBriefFile = _31[1];
    var _32 = (0, react_1.useState)(""), briefUploadedUrl = _32[0], setBriefUploadedUrl = _32[1];
    var _33 = (0, react_1.useState)("all"), activeFilter = _33[0], setActiveFilter = _33[1];
    var _34 = (0, react_1.useState)(""), searchKeyword = _34[0], setSearchKeyword = _34[1];
    var _35 = (0, react_1.useState)(false), isSettingsOpen = _35[0], setIsSettingsOpen = _35[1];
    var _36 = (0, react_1.useState)(false), isEditingProjectName = _36[0], setIsEditingProjectName = _36[1];
    var _37 = (0, react_1.useState)("runtime"), activeSettingsSection = _37[0], setActiveSettingsSection = _37[1];
    var _38 = (0, react_1.useState)({
        name: "",
        projectStatus: "paused",
        creativeTheme: "",
        coreExpressions: [],
        specifiedTags: [],
        forbiddenTerms: [],
        generateIntervalMin: "60",
    }), settingsDraft = _38[0], setSettingsDraft = _38[1];
    var _39 = (0, react_1.useState)(""), wizardCoreExpressionInput = _39[0], setWizardCoreExpressionInput = _39[1];
    var _40 = (0, react_1.useState)(""), wizardSpecifiedTagInput = _40[0], setWizardSpecifiedTagInput = _40[1];
    var _41 = (0, react_1.useState)(""), wizardForbiddenTermInput = _41[0], setWizardForbiddenTermInput = _41[1];
    var _42 = (0, react_1.useState)(""), settingsCoreExpressionInput = _42[0], setSettingsCoreExpressionInput = _42[1];
    var _43 = (0, react_1.useState)(""), settingsSpecifiedTagInput = _43[0], setSettingsSpecifiedTagInput = _43[1];
    var _44 = (0, react_1.useState)(""), settingsForbiddenTermInput = _44[0], setSettingsForbiddenTermInput = _44[1];
    var _45 = (0, react_1.useState)([]), settingsReferenceAssets = _45[0], setSettingsReferenceAssets = _45[1];
    var _46 = (0, react_1.useState)(null), benchmarkPickerTarget = _46[0], setBenchmarkPickerTarget = _46[1];
    var _47 = (0, react_1.useState)([]), benchmarkSelection = _47[0], setBenchmarkSelection = _47[1];
    var _48 = (0, react_1.useState)(""), benchmarkKeyword = _48[0], setBenchmarkKeyword = _48[1];
    var _49 = (0, react_1.useState)(), benchmarkNoteType = _49[0], setBenchmarkNoteType = _49[1];
    var _50 = (0, react_1.useState)(1), benchmarkPage = _50[0], setBenchmarkPage = _50[1];
    var _51 = (0, react_1.useState)(1), generatedNotePage = _51[0], setGeneratedNotePage = _51[1];
    var _52 = (0, react_1.useState)(null), selectedGeneratedNote = _52[0], setSelectedGeneratedNote = _52[1];
    var _53 = (0, react_1.useState)(0), activeGeneratedNoteImageIndex = _53[0], setActiveGeneratedNoteImageIndex = _53[1];
    var projects = (_b = (_a = projectListQuery.data) === null || _a === void 0 ? void 0 : _a.list) !== null && _b !== void 0 ? _b : [];
    var resolvedActiveProjectId = activeProjectId &&
        projects.some(function (item) { return String(item.id) === activeProjectId; })
        ? activeProjectId
        : projects[0]
            ? String(projects[0].id)
            : "";
    var selectedProject = (_c = projects.find(function (item) { return String(item.id) === resolvedActiveProjectId; })) !== null && _c !== void 0 ? _c : null;
    var selectedProjectId = selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.id;
    var projectDetailQuery = (0, useProject_1.useProjectDetail)(selectedProjectId);
    var generatedNoteQuery = (0, useProject_1.useGeneratedNoteList)(selectedProjectId
        ? {
            project_id: selectedProjectId,
            page: generatedNotePage,
            pageSize: GENERATED_NOTE_PAGE_SIZE,
            status: activeFilter === "all" ? undefined : activeFilter,
            keyword: searchKeyword.trim() || undefined,
        }
        : undefined, selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.status);
    var collectedNoteQuery = (0, useCollection_1.useNoteList)({
        page: benchmarkPage,
        pageSize: 12,
        keyword: benchmarkKeyword,
        noteType: benchmarkNoteType,
    });
    var benchmarkNotes = (_e = (_d = projectDetailQuery.data) === null || _d === void 0 ? void 0 : _d.benchmark_notes) !== null && _e !== void 0 ? _e : [];
    var projectReferenceAssets = (_g = (_f = projectDetailQuery.data) === null || _f === void 0 ? void 0 : _f.reference_assets) !== null && _g !== void 0 ? _g : [];
    var activeBenchmarkCount = benchmarkNotes.filter(function (item) { return !item.is_deleted; }).length;
    var generateIntervalCron = normalizeGenerateIntervalValue((_k = (_j = (_h = projectDetailQuery.data) === null || _h === void 0 ? void 0 : _h.config) === null || _j === void 0 ? void 0 : _j.cron_expr) !== null && _k !== void 0 ? _k : (_l = selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.config) === null || _l === void 0 ? void 0 : _l.cron_expr);
    var creativeTheme = (_r = (_p = (_o = (_m = projectDetailQuery.data) === null || _m === void 0 ? void 0 : _m.config) === null || _o === void 0 ? void 0 : _o.creative_theme) !== null && _p !== void 0 ? _p : (_q = selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.config) === null || _q === void 0 ? void 0 : _q.creative_theme) !== null && _r !== void 0 ? _r : "";
    var configCoreExpressions = (_w = (_u = (_t = (_s = projectDetailQuery.data) === null || _s === void 0 ? void 0 : _s.config) === null || _t === void 0 ? void 0 : _t.core_expressions) !== null && _u !== void 0 ? _u : (_v = selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.config) === null || _v === void 0 ? void 0 : _v.core_expressions) !== null && _w !== void 0 ? _w : [];
    var configSpecifiedTags = (_1 = (_z = (_y = (_x = projectDetailQuery.data) === null || _x === void 0 ? void 0 : _x.config) === null || _y === void 0 ? void 0 : _y.specified_tags) !== null && _z !== void 0 ? _z : (_0 = selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.config) === null || _0 === void 0 ? void 0 : _0.specified_tags) !== null && _1 !== void 0 ? _1 : [];
    var configForbiddenTerms = (_6 = (_4 = (_3 = (_2 = projectDetailQuery.data) === null || _2 === void 0 ? void 0 : _2.config) === null || _3 === void 0 ? void 0 : _3.forbidden_terms) !== null && _4 !== void 0 ? _4 : (_5 = selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.config) === null || _5 === void 0 ? void 0 : _5.forbidden_terms) !== null && _6 !== void 0 ? _6 : [];
    var generateIntervalMin = getGenerateIntervalMinutes(generateIntervalCron);
    var generatedNotes = (_8 = (_7 = generatedNoteQuery.data) === null || _7 === void 0 ? void 0 : _7.list) !== null && _8 !== void 0 ? _8 : [];
    var generatedNoteTotal = (_10 = (_9 = generatedNoteQuery.data) === null || _9 === void 0 ? void 0 : _9.total) !== null && _10 !== void 0 ? _10 : 0;
    var generatedNoteTotalPages = Math.max(1, Math.ceil(generatedNoteTotal / GENERATED_NOTE_PAGE_SIZE));
    var selectedGeneratedNoteImages = selectedGeneratedNote
        ? getGeneratedNoteImages(selectedGeneratedNote)
        : [];
    var selectedGeneratedNoteStatus = selectedGeneratedNote
        ? noteStatusMeta[selectedGeneratedNote.status]
        : null;
    var selectedGeneratedNoteTags = (_12 = (_11 = selectedGeneratedNote === null || selectedGeneratedNote === void 0 ? void 0 : selectedGeneratedNote.tags) === null || _11 === void 0 ? void 0 : _11.filter(Boolean)) !== null && _12 !== void 0 ? _12 : [];
    var selectedGeneratedNoteActiveImage = (_13 = selectedGeneratedNoteImages[Math.min(activeGeneratedNoteImageIndex, Math.max(selectedGeneratedNoteImages.length - 1, 0))]) !== null && _13 !== void 0 ? _13 : "";
    var pickerNotes = (_15 = (_14 = collectedNoteQuery.data) === null || _14 === void 0 ? void 0 : _14.list) !== null && _15 !== void 0 ? _15 : [];
    var pickerTotal = (_17 = (_16 = collectedNoteQuery.data) === null || _16 === void 0 ? void 0 : _16.total) !== null && _17 !== void 0 ? _17 : 0;
    var pickerTotalPages = Math.max(1, Math.ceil(pickerTotal / ((_19 = (_18 = collectedNoteQuery.data) === null || _18 === void 0 ? void 0 : _18.pageSize) !== null && _19 !== void 0 ? _19 : 12)));
    var canProceedWizard = wizardStep !== 1 || !!setupDraft.name.trim();
    var isReferenceUploading = uploadReferenceFileMutation.isPending;
    var isAssetSettingsSection = activeSettingsSection === "assets";
    var isBriefSettingsSection = activeSettingsSection === "brief";
    var isMessagingSettingsSection = activeSettingsSection === "messaging";
    var isRuntimeSettingsSection = activeSettingsSection === "runtime";
    var clearSettingsReferenceAutosaveTimer = function () {
        if (settingsReferenceAutosaveTimerRef.current !== null) {
            window.clearTimeout(settingsReferenceAutosaveTimerRef.current);
            settingsReferenceAutosaveTimerRef.current = null;
        }
    };
    var hydrateSettingsReferenceAssets = function (assets) {
        settingsReferenceAssetsDirtyRef.current = false;
        settingsReferenceAssetsRef.current = assets;
        setSettingsReferenceAssets(assets);
        lastPersistedSettingsReferenceAssetsRef.current = JSON.stringify(normalizeReferenceAssetPayload(assets));
    };
    var persistSettingsReferenceAssets = function (assets) { return __awaiter(_this, void 0, void 0, function () {
        var normalizedAssets, invalidAsset, serializedAssets, queuedAssets, queuedSerializedAssets;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedProjectId) {
                        return [2 /*return*/];
                    }
                    normalizedAssets = normalizeReferenceAssetPayload(assets);
                    invalidAsset = normalizedAssets.find(function (asset) { return !asset.name || !asset.url || !asset.asset_type; });
                    if (invalidAsset) {
                        return [2 /*return*/];
                    }
                    serializedAssets = JSON.stringify(normalizedAssets);
                    if (serializedAssets === lastPersistedSettingsReferenceAssetsRef.current) {
                        return [2 /*return*/];
                    }
                    if (settingsReferencePersistInFlightRef.current) {
                        queuedSettingsReferenceAssetsRef.current = assets;
                        return [2 /*return*/];
                    }
                    settingsReferencePersistInFlightRef.current = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, updateReferenceAssetsMutation.mutateAsync({
                            project_id: selectedProjectId,
                            assets: normalizedAssets,
                            silent: true,
                        })];
                case 2:
                    _a.sent();
                    lastPersistedSettingsReferenceAssetsRef.current = serializedAssets;
                    return [3 /*break*/, 4];
                case 3:
                    settingsReferencePersistInFlightRef.current = false;
                    queuedAssets = queuedSettingsReferenceAssetsRef.current;
                    queuedSettingsReferenceAssetsRef.current = null;
                    if (queuedAssets) {
                        queuedSerializedAssets = JSON.stringify(normalizeReferenceAssetPayload(queuedAssets));
                        if (queuedSerializedAssets !==
                            lastPersistedSettingsReferenceAssetsRef.current) {
                            void persistSettingsReferenceAssets(queuedAssets);
                        }
                    }
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var scheduleSettingsReferenceAutosave = function (assets, delayMs) {
        clearSettingsReferenceAutosaveTimer();
        settingsReferenceAutosaveTimerRef.current = window.setTimeout(function () {
            void persistSettingsReferenceAssets(assets);
        }, delayMs);
    };
    var applySettingsReferenceAssets = function (updater, mode) {
        if (mode === void 0) { mode = "debounced"; }
        var nextAssets = updater(settingsReferenceAssetsRef.current);
        settingsReferenceAssetsDirtyRef.current = true;
        settingsReferenceAssetsRef.current = nextAssets;
        setSettingsReferenceAssets(nextAssets);
        if (isSettingsOpen && selectedProjectId) {
            if (mode === "immediate") {
                clearSettingsReferenceAutosaveTimer();
                void persistSettingsReferenceAssets(nextAssets);
            }
            else {
                scheduleSettingsReferenceAutosave(nextAssets, 700);
            }
        }
    };
    (0, react_1.useEffect)(function () {
        if (!isSettingsOpen) {
            return;
        }
        if (settingsReferenceAssetsDirtyRef.current) {
            return;
        }
        var hydratedAssets = projectReferenceAssets.map(function (asset, index) {
            return mapReferenceAssetToDraft(asset, index);
        });
        hydrateSettingsReferenceAssets(hydratedAssets);
    }, [isSettingsOpen, projectReferenceAssets]);
    (0, react_1.useEffect)(function () {
        return function () {
            clearSettingsReferenceAutosaveTimer();
        };
    }, []);
    (0, react_1.useEffect)(function () {
        setGeneratedNotePage(1);
        setSelectedGeneratedNote(null);
    }, [selectedProjectId, activeFilter, searchKeyword]);
    (0, react_1.useEffect)(function () {
        if (!selectedGeneratedNote) {
            return;
        }
        var latestSelectedNote = generatedNotes.find(function (note) { return note.id === selectedGeneratedNote.id; });
        if (latestSelectedNote && latestSelectedNote !== selectedGeneratedNote) {
            setSelectedGeneratedNote(latestSelectedNote);
        }
    }, [generatedNotes, selectedGeneratedNote]);
    (0, react_1.useEffect)(function () {
        setActiveGeneratedNoteImageIndex(0);
    }, [selectedGeneratedNote === null || selectedGeneratedNote === void 0 ? void 0 : selectedGeneratedNote.id]);
    var openWizard = function () {
        setWizardStep(1);
        setBriefFile(null);
        setBriefUploadedUrl("");
        setSetupDraft(initialSetupDraft);
        setWizardCoreExpressionInput("");
        setWizardSpecifiedTagInput("");
        setWizardForbiddenTermInput("");
        setIsWizardOpen(true);
    };
    var closeWizard = function () {
        setWizardStep(1);
        setBriefFile(null);
        setBriefUploadedUrl("");
        setSetupDraft(initialSetupDraft);
        setWizardCoreExpressionInput("");
        setWizardSpecifiedTagInput("");
        setWizardForbiddenTermInput("");
        if (wizardReferenceFileRef.current) {
            wizardReferenceFileRef.current.value = "";
        }
        setIsWizardOpen(false);
    };
    var closeSettings = function () {
        clearSettingsReferenceAutosaveTimer();
        queuedSettingsReferenceAssetsRef.current = null;
        setIsSettingsOpen(false);
        setIsEditingProjectName(false);
        setActiveSettingsSection("runtime");
        setSettingsCoreExpressionInput("");
        setSettingsSpecifiedTagInput("");
        setSettingsForbiddenTermInput("");
        setSettingsReferenceAssets([]);
        settingsReferenceAssetsRef.current = [];
        settingsReferenceAssetsDirtyRef.current = false;
        if (settingsReferenceFileRef.current) {
            settingsReferenceFileRef.current.value = "";
        }
    };
    var handleDeleteProject = function () { return __awaiter(_this, void 0, void 0, function () {
        var confirmed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedProjectId || !selectedProject) {
                        return [2 /*return*/];
                    }
                    confirmed = window.confirm("\u786E\u8BA4\u5220\u9664\u9879\u76EE\u300C".concat(selectedProject.name, "\u300D\u5417\uFF1F\u5220\u9664\u540E\u4E0D\u53EF\u6062\u590D\u3002"));
                    if (!confirmed) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, deleteProjectMutation.mutateAsync({ ids: [selectedProjectId] })];
                case 1:
                    _a.sent();
                    closeSettings();
                    setActiveProjectId("");
                    return [2 /*return*/];
            }
        });
    }); };
    var openSettings = function () {
        if (!selectedProject) {
            return;
        }
        setSettingsDraft(createSettingsDraft(selectedProject, creativeTheme, configCoreExpressions, configSpecifiedTags, configForbiddenTerms, generateIntervalMin));
        setIsEditingProjectName(false);
        var hydratedAssets = projectReferenceAssets.map(function (asset, index) {
            return mapReferenceAssetToDraft(asset, index);
        });
        hydrateSettingsReferenceAssets(hydratedAssets);
        setSettingsCoreExpressionInput("");
        setSettingsSpecifiedTagInput("");
        setSettingsForbiddenTermInput("");
        setActiveSettingsSection("runtime");
        setIsSettingsOpen(true);
    };
    var updateSetupReferenceAsset = function (localId, updater) {
        setSetupDraft(function (current) { return (__assign(__assign({}, current), { referenceAssets: current.referenceAssets.map(function (asset) {
                return asset.localId === localId ? updater(asset) : asset;
            }) })); });
    };
    var updateSettingsReferenceAsset = function (localId, updater, mode) {
        if (mode === void 0) { mode = "debounced"; }
        applySettingsReferenceAssets(function (current) {
            return current.map(function (asset) {
                return asset.localId === localId ? updater(asset) : asset;
            });
        }, mode);
    };
    var removeSetupReferenceAsset = function (localId) {
        setSetupDraft(function (current) { return (__assign(__assign({}, current), { referenceAssets: current.referenceAssets.filter(function (asset) { return asset.localId !== localId; }) })); });
    };
    var removeSettingsReferenceAsset = function (localId) {
        applySettingsReferenceAssets(function (current) { return current.filter(function (asset) { return asset.localId !== localId; }); }, "immediate");
    };
    var addWizardRuleItem = function (key, inputValue, clearInput) {
        var nextValue = inputValue.trim();
        if (!nextValue) {
            return;
        }
        setSetupDraft(function (current) {
            var _a;
            return (__assign(__assign({}, current), (_a = {}, _a[key] = normalizeRuleItems(__spreadArray(__spreadArray([], current[key], true), [nextValue], false)), _a)));
        });
        clearInput();
    };
    var removeWizardRuleItem = function (key, value) {
        setSetupDraft(function (current) {
            var _a;
            return (__assign(__assign({}, current), (_a = {}, _a[key] = current[key].filter(function (item) { return item !== value; }), _a)));
        });
    };
    var addSettingsRuleItem = function (key, inputValue, clearInput) {
        var nextValue = inputValue.trim();
        if (!nextValue) {
            return;
        }
        setSettingsDraft(function (current) {
            var _a;
            return (__assign(__assign({}, current), (_a = {}, _a[key] = normalizeRuleItems(__spreadArray(__spreadArray([], current[key], true), [nextValue], false)), _a)));
        });
        clearInput();
    };
    var removeSettingsRuleItem = function (key, value) {
        setSettingsDraft(function (current) {
            var _a;
            return (__assign(__assign({}, current), (_a = {}, _a[key] = current[key].filter(function (item) { return item !== value; }), _a)));
        });
    };
    var uploadReferenceAssets = function (files, target) { return __awaiter(_this, void 0, void 0, function () {
        var imageFiles, uploadedAssets, failedCount, _i, imageFiles_1, file, uploaded, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(files === null || files === void 0 ? void 0 : files.length)) {
                        return [2 /*return*/];
                    }
                    imageFiles = Array.from(files).filter(function (file) {
                        return file.type.startsWith("image/");
                    });
                    if (!imageFiles.length) {
                        sonner_1.toast.error("参考资料只支持上传图片文件");
                        return [2 /*return*/];
                    }
                    uploadedAssets = [];
                    failedCount = 0;
                    _i = 0, imageFiles_1 = imageFiles;
                    _b.label = 1;
                case 1:
                    if (!(_i < imageFiles_1.length)) return [3 /*break*/, 6];
                    file = imageFiles_1[_i];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, uploadReferenceFileMutation.mutateAsync(file)];
                case 3:
                    uploaded = _b.sent();
                    uploadedAssets.push(createReferenceAssetDraft({
                        name: uploaded.file_name || file.name,
                        url: uploaded.url,
                        assetType: "product_image",
                    }));
                    return [3 /*break*/, 5];
                case 4:
                    _a = _b.sent();
                    failedCount += 1;
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    if (uploadedAssets.length > 0) {
                        if (target === "wizard") {
                            setSetupDraft(function (current) { return (__assign(__assign({}, current), { referenceAssets: __spreadArray(__spreadArray([], current.referenceAssets, true), uploadedAssets, true) })); });
                        }
                        else {
                            applySettingsReferenceAssets(function (current) { return __spreadArray(__spreadArray([], current, true), uploadedAssets, true); }, "immediate");
                        }
                    }
                    if (failedCount > 0) {
                        sonner_1.toast.error("".concat(failedCount, " \u4E2A\u8D44\u6599\u4E0A\u4F20\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"));
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleWizardReferenceFileChange = function (event) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uploadReferenceAssets(event.target.files, "wizard")];
                case 1:
                    _a.sent();
                    event.target.value = "";
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSettingsReferenceFileChange = function (event) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, uploadReferenceAssets(event.target.files, "settings")];
                case 1:
                    _a.sent();
                    event.target.value = "";
                    return [2 /*return*/];
            }
        });
    }); };
    var openBenchmarkPicker = function (target) {
        if (!target) {
            return;
        }
        setBenchmarkPickerTarget(target);
        setBenchmarkKeyword("");
        setBenchmarkPage(1);
        setBenchmarkNoteType(undefined);
        if (target === "wizard") {
            setBenchmarkSelection(setupDraft.benchmarkNoteIds);
            return;
        }
        setBenchmarkSelection(benchmarkNotes
            .filter(function (item) { return !item.is_deleted; })
            .map(function (item) { return item.collected_note_id; }));
    };
    var closeBenchmarkPicker = function () {
        setBenchmarkPickerTarget(null);
    };
    var toggleBenchmarkSelection = function (noteId) {
        setBenchmarkSelection(function (current) {
            if (current.includes(noteId)) {
                return current.filter(function (item) { return item !== noteId; });
            }
            return __spreadArray(__spreadArray([], current, true), [noteId], false);
        });
    };
    var handleApplyBenchmarkSelection = function () { return __awaiter(_this, void 0, void 0, function () {
        var normalizedIds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    normalizedIds = uniqueNumberIds(benchmarkSelection);
                    if (benchmarkPickerTarget === "wizard") {
                        setSetupDraft(function (current) { return (__assign(__assign({}, current), { benchmarkNoteIds: normalizedIds })); });
                        closeBenchmarkPicker();
                        return [2 /*return*/];
                    }
                    if (!selectedProjectId) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, updateBenchmarkNotesMutation.mutateAsync({
                            project_id: selectedProjectId,
                            collected_note_ids: normalizedIds,
                        })];
                case 1:
                    _a.sent();
                    closeBenchmarkPicker();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSaveSettings = function () { return __awaiter(_this, void 0, void 0, function () {
        var minuteValue, cronExpression, currentCronExpression, currentProjectStatus, shouldUpdateConfig, shouldUpdateStatus;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!selectedProjectId) {
                        return [2 /*return*/];
                    }
                    minuteValue = Number.parseInt(settingsDraft.generateIntervalMin.trim(), 10);
                    if (!Number.isInteger(minuteValue) || minuteValue <= 0) {
                        sonner_1.toast.error("运行频率需要填写为大于 0 的分钟数");
                        return [2 /*return*/];
                    }
                    cronExpression = buildGenerateIntervalCron(minuteValue);
                    if (!cronExpression) {
                        sonner_1.toast.error("请输入常用的运行频率，例如 5、10、15、20、30、60、120 分钟");
                        return [2 /*return*/];
                    }
                    currentCronExpression = normalizeGenerateIntervalValue((_c = (_b = (_a = projectDetailQuery.data) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.cron_expr) !== null && _c !== void 0 ? _c : (_d = selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.config) === null || _d === void 0 ? void 0 : _d.cron_expr);
                    currentProjectStatus = selectedProject.status;
                    shouldUpdateConfig = cronExpression !== currentCronExpression;
                    shouldUpdateStatus = settingsDraft.projectStatus !== currentProjectStatus;
                    if (!shouldUpdateConfig && !shouldUpdateStatus) {
                        sonner_1.toast.success("运行配置未发生变化");
                        return [2 /*return*/];
                    }
                    if (!shouldUpdateConfig) return [3 /*break*/, 2];
                    return [4 /*yield*/, updateProjectConfigMutation.mutateAsync({
                            project_id: selectedProjectId,
                            cron_expr: cronExpression,
                        })];
                case 1:
                    _e.sent();
                    _e.label = 2;
                case 2:
                    if (!shouldUpdateStatus) return [3 /*break*/, 4];
                    return [4 /*yield*/, updateProjectStatusMutation.mutateAsync({
                            id: selectedProjectId,
                            status: settingsDraft.projectStatus,
                        })];
                case 3:
                    _e.sent();
                    _e.label = 4;
                case 4:
                    sonner_1.toast.success("运行配置已更新");
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSaveBriefSettings = function () { return __awaiter(_this, void 0, void 0, function () {
        var creativeThemeValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedProjectId) {
                        return [2 /*return*/];
                    }
                    creativeThemeValue = settingsDraft.creativeTheme.trim();
                    if (creativeThemeValue.length > 255) {
                        sonner_1.toast.error("项目核心创作主题不能超过 255 个字符");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, updateProjectConfigMutation.mutateAsync({
                            project_id: selectedProjectId,
                            creative_theme: creativeThemeValue,
                        })];
                case 1:
                    _a.sent();
                    sonner_1.toast.success("项目方案配置已更新");
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSaveMessagingSettings = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedProjectId) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, updateProjectConfigMutation.mutateAsync({
                            project_id: selectedProjectId,
                            core_expressions: normalizeRuleItems(settingsDraft.coreExpressions),
                            specified_tags: normalizeRuleItems(settingsDraft.specifiedTags),
                            forbidden_terms: normalizeRuleItems(settingsDraft.forbiddenTerms),
                        })];
                case 1:
                    _a.sent();
                    sonner_1.toast.success("表达规则已更新");
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSaveProjectName = function () { return __awaiter(_this, void 0, void 0, function () {
        var nextName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedProjectId) {
                        return [2 /*return*/];
                    }
                    nextName = settingsDraft.name.trim();
                    if (!nextName) {
                        sonner_1.toast.error("项目名称不能为空");
                        return [2 /*return*/];
                    }
                    if (nextName.length > 200) {
                        sonner_1.toast.error("项目名称不能超过 200 个字符");
                        return [2 /*return*/];
                    }
                    if (nextName === (selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.name)) {
                        setIsEditingProjectName(false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, renameProjectMutation.mutateAsync({
                            id: selectedProjectId,
                            name: nextName,
                        })];
                case 1:
                    _a.sent();
                    setSettingsDraft(function (current) { return (__assign(__assign({}, current), { name: nextName })); });
                    setIsEditingProjectName(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleCancelProjectNameEdit = function () {
        setSettingsDraft(function (current) {
            var _a;
            return (__assign(__assign({}, current), { name: (_a = selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.name) !== null && _a !== void 0 ? _a : current.name }));
        });
        setIsEditingProjectName(false);
    };
    var handleGenerateNoteNow = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedProjectId) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, generateNoteNowMutation.mutateAsync({
                            project_id: selectedProjectId,
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleWizardNext = function () { return __awaiter(_this, void 0, void 0, function () {
        var pendingBriefUrl, pendingBenchmarkNoteIds, pendingReferenceAssets, pendingCoreExpressions, pendingSpecifiedTags, pendingForbiddenTerms, project;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (wizardStep === 1 && !setupDraft.name.trim()) {
                        return [2 /*return*/];
                    }
                    if (!(wizardStep === 5)) return [3 /*break*/, 10];
                    pendingBriefUrl = briefUploadedUrl;
                    pendingBenchmarkNoteIds = uniqueNumberIds(setupDraft.benchmarkNoteIds);
                    pendingReferenceAssets = normalizeReferenceAssetPayload(setupDraft.referenceAssets);
                    pendingCoreExpressions = normalizeRuleItems(setupDraft.coreExpressions);
                    pendingSpecifiedTags = normalizeRuleItems(setupDraft.specifiedTags);
                    pendingForbiddenTerms = normalizeRuleItems(setupDraft.forbiddenTerms);
                    return [4 /*yield*/, createProjectMutation.mutateAsync({
                            name: setupDraft.name.trim(),
                        })];
                case 1:
                    project = _a.sent();
                    if (!pendingBriefUrl) return [3 /*break*/, 3];
                    return [4 /*yield*/, uploadBriefMutation
                            .mutateAsync({
                            projectId: project.id,
                            briefUrl: pendingBriefUrl,
                        })
                            .catch(function () {
                            // error toast handled in mutation
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    if (!(pendingBenchmarkNoteIds.length > 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, updateBenchmarkNotesMutation.mutateAsync({
                            project_id: project.id,
                            collected_note_ids: pendingBenchmarkNoteIds,
                        })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    if (!(pendingReferenceAssets.length > 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, updateReferenceAssetsMutation.mutateAsync({
                            project_id: project.id,
                            assets: pendingReferenceAssets,
                        })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    if (!(pendingCoreExpressions.length > 0 ||
                        pendingSpecifiedTags.length > 0 ||
                        pendingForbiddenTerms.length > 0)) return [3 /*break*/, 9];
                    return [4 /*yield*/, updateProjectConfigMutation.mutateAsync({
                            project_id: project.id,
                            core_expressions: pendingCoreExpressions,
                            specified_tags: pendingSpecifiedTags,
                            forbidden_terms: pendingForbiddenTerms,
                        })];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    setActiveProjectId(String(project.id));
                    setSetupDraft(initialSetupDraft);
                    setBriefFile(null);
                    setBriefUploadedUrl("");
                    setActiveFilter("all");
                    setSearchKeyword("");
                    setWizardStep(1);
                    setIsWizardOpen(false);
                    return [2 /*return*/];
                case 10:
                    setWizardStep(function (currentStep) { return Math.min(currentStep + 1, 5); });
                    return [2 /*return*/];
            }
        });
    }); };
    var handleWizardBack = function () {
        setWizardStep(function (currentStep) { return Math.max(currentStep - 1, 1); });
    };
    var handleWizardSkip = function () {
        if (wizardStep >= 2 && wizardStep < 5) {
            setWizardStep(function (currentStep) { return Math.min(currentStep + 1, 5); });
        }
    };
    var openGeneratedNoteDetail = function (note) {
        setSelectedGeneratedNote(note);
    };
    var closeGeneratedNoteDetail = function () {
        setSelectedGeneratedNote(null);
    };
    if (projectListQuery.isLoading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "generation-shell", children: (0, jsx_runtime_1.jsxs)("section", { className: "generation-stage generation-stage--feedback", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 20, className: "generation-spin" }), (0, jsx_runtime_1.jsx)("h1", { children: "\u6B63\u5728\u52A0\u8F7D\u5185\u5BB9\u9879\u76EE" }), (0, jsx_runtime_1.jsx)("p", { children: "\u7A0D\u7B49\u4E00\u4E0B\uFF0C\u5148\u628A\u5F53\u524D\u8D26\u53F7\u4E0B\u7684\u9879\u76EE\u5217\u8868\u53D6\u56DE\u6765\u3002" })] }) }));
    }
    if (projectListQuery.isError) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "generation-shell", children: (0, jsx_runtime_1.jsxs)("section", { className: "generation-stage generation-stage--feedback", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { size: 20 }), (0, jsx_runtime_1.jsx)("h1", { children: "\u9879\u76EE\u5217\u8868\u52A0\u8F7D\u5931\u8D25" }), (0, jsx_runtime_1.jsx)("p", { children: projectListQuery.error.message ||
                            "暂时无法获取项目列表，请稍后重试。" }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "generation-button generation-button--primary", onClick: function () { return projectListQuery.refetch(); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 16 }), "\u91CD\u65B0\u52A0\u8F7D"] })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "generation-shell", children: [(0, jsx_runtime_1.jsx)("section", { className: "generation-stage", children: !projects.length ? ((0, jsx_runtime_1.jsxs)("div", { className: "generation-empty", children: [(0, jsx_runtime_1.jsx)("article", { className: "generation-empty__narrative", children: (0, jsx_runtime_1.jsxs)("div", { className: "generation-panel generation-panel--hero", children: [(0, jsx_runtime_1.jsx)("span", { className: "generation-badge", children: "\u9996\u6B21\u8FDB\u5165" }), (0, jsx_runtime_1.jsx)("h2", { children: "\u8FD9\u91CC\u4E0D\u518D\u5806\u590D\u6742\u529F\u80FD\uFF0C\u53EA\u4FDD\u7559\u4E00\u4E2A\u6E05\u6670\u5165\u53E3\u3002" }), (0, jsx_runtime_1.jsx)("p", { children: "\u5148\u521B\u5EFA\u9879\u76EE\uFF0C\u518D\u9010\u6B65\u8865\u5145\u65B9\u6848\u4E66\u3001\u7D20\u6750\u548C\u5BF9\u6807\u7B14\u8BB0\u3002\u7B49\u9879\u76EE\u58F3\u5B50\u5EFA\u597D\u540E\uFF0C\u540E\u9762\u7684\u5185\u5BB9\u751F\u6210\u548C\u7ED3\u679C\u7BA1\u7406\u90FD\u5728\u9879\u76EE\u5DE5\u4F5C\u53F0\u91CC\u8FDB\u884C\u3002" }), (0, jsx_runtime_1.jsx)("div", { className: "generation-step-list", children: emptyStepList.map(function (step) { return ((0, jsx_runtime_1.jsxs)("article", { className: "generation-step-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-step-card__index", children: step.index }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: step.title }), (0, jsx_runtime_1.jsx)("p", { children: step.description })] })] }, step.index)); }) }), (0, jsx_runtime_1.jsx)("div", { className: "generation-panel__footer", children: (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "generation-button generation-button--primary", onClick: openWizard, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { size: 16 }), "\u5F00\u59CB\u521B\u5EFA\u7B2C\u4E00\u4E2A\u9879\u76EE"] }) })] }) }), (0, jsx_runtime_1.jsx)("aside", { className: "generation-empty__aside", children: (0, jsx_runtime_1.jsxs)("div", { className: "generation-panel generation-panel--aside", children: [(0, jsx_runtime_1.jsx)("span", { className: "generation-badge generation-badge--muted", children: "\u5DE5\u4F5C\u53F0\u9884\u89C8" }), (0, jsx_runtime_1.jsx)("h2", { children: "\u9879\u76EE\u5185\u4F1A\u53D1\u751F\u4EC0\u4E48" }), (0, jsx_runtime_1.jsx)("p", { children: "\u9876\u90E8\u662F\u9879\u76EE\u6458\u8981\u548C\u4E3B\u52A8\u4F5C\uFF0C\u4E2D\u95F4\u662F\u751F\u6210\u7ED3\u679C\u5217\u8868\uFF0C\u9879\u76EE\u8BBE\u7F6E\u6536\u8FDB\u5C45\u4E2D\u5F39\u6846\uFF0C\u5BF9\u6807\u7B14\u8BB0\u76F4\u63A5\u6765\u81EA\u91C7\u96C6\u7B14\u8BB0\u6A21\u5757\u3002" }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-signal-grid", children: [(0, jsx_runtime_1.jsxs)("article", { className: "generation-signal-card", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u9879\u76EE\u6458\u8981" }), (0, jsx_runtime_1.jsx)("strong", { children: "\u8D44\u6599 + \u89C4\u5219\u4E00\u5C4F\u603B\u89C8" })] }), (0, jsx_runtime_1.jsxs)("article", { className: "generation-signal-card", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u5BF9\u6807\u7B14\u8BB0" }), (0, jsx_runtime_1.jsx)("strong", { children: "\u76F4\u63A5\u52FE\u9009\u91C7\u96C6\u6A21\u5757\u91CC\u7684\u771F\u5B9E\u7B14\u8BB0" })] }), (0, jsx_runtime_1.jsxs)("article", { className: "generation-signal-card", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u8BBE\u7F6E\u5F39\u6846" }), (0, jsx_runtime_1.jsx)("strong", { children: "\u4FEE\u6539\u53EA\u5F71\u54CD\u540E\u7EED\u751F\u6210" })] })] }), (0, jsx_runtime_1.jsx)("ul", { className: "generation-hint-list", children: capabilityHints.map(function (hint) { return ((0, jsx_runtime_1.jsx)("li", { children: hint }, hint)); }) })] }) })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "generation-workspace", children: [(0, jsx_runtime_1.jsxs)("section", { className: "generation-project-toolbar", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-project-toolbar__main", children: [(0, jsx_runtime_1.jsx)("span", { className: "generation-badge generation-badge--muted", children: "\u5F53\u524D\u9879\u76EE" }), (0, jsx_runtime_1.jsx)("div", { className: "generation-project-switcher", "aria-label": "\u9879\u76EE\u5207\u6362", children: projects.map(function (project) {
                                                var isActive = (selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.id) === project.id;
                                                return ((0, jsx_runtime_1.jsxs)("button", { type: "button", className: "generation-project-switcher__item ".concat(isActive ? "generation-project-switcher__item--active" : ""), onClick: function () {
                                                        setActiveProjectId(String(project.id));
                                                        setActiveFilter("all");
                                                        setSearchKeyword("");
                                                        setIsSettingsOpen(false);
                                                    }, children: [(0, jsx_runtime_1.jsx)("strong", { children: project.name }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u66F4\u65B0\u4E8E ", formatDateLabel(project.updated_at)] })] }, project.id));
                                            }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-project-toolbar__actions", children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", className: "generation-button generation-button--primary", onClick: openWizard, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { size: 16 }), "\u65B0\u5EFA\u9879\u76EE"] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: openSettings, disabled: !selectedProject, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Settings2, { size: 16 }), "\u9879\u76EE\u8BBE\u7F6E"] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "generation-button generation-button--primary", onClick: handleGenerateNoteNow, disabled: !selectedProject || generateNoteNowMutation.isPending, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.PenSquare, { size: 16 }), generateNoteNowMutation.isPending
                                                    ? "正在启动生成..."
                                                    : "生成新笔记"] })] })] }), selectedProject && ((0, jsx_runtime_1.jsxs)("section", { className: "generation-note-board generation-note-board--primary", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-note-board__headline", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-note-board__headline-copy", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-note-board__title-row", children: [(0, jsx_runtime_1.jsx)("h2", { children: selectedProject.name }), (0, jsx_runtime_1.jsx)("span", { className: "generation-status ".concat(statusMeta[selectedProject.status].className), children: statusMeta[selectedProject.status].label })] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\u805A\u7126\u5F53\u524D\u9879\u76EE\u7684\u4EA7\u51FA\u7B14\u8BB0\uFF0C\u9879\u76EE\u8D44\u6599\u7EF4\u62A4\u7EDF\u4E00\u6536\u8FDB\u8BBE\u7F6E\u5F39\u6846\u3002", projectDetailQuery.isFetching
                                                            ? " 项目详情正在刷新。"
                                                            : " \u6700\u8FD1\u66F4\u65B0 ".concat(formatDateLabel(selectedProject.updated_at), "\u3002")] })] }), (0, jsx_runtime_1.jsx)("div", { className: "generation-note-board__headline-actions", children: (0, jsx_runtime_1.jsxs)("div", { className: "generation-note-board__stats", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u4EA7\u51FA\u7B14\u8BB0" }), (0, jsx_runtime_1.jsxs)("strong", { children: [generatedNoteTotal, " \u7BC7"] })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-note-board__toolbar-wrap", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-note-board__toolbar", children: [(0, jsx_runtime_1.jsxs)("label", { className: "generation-search", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { size: 16 }), (0, jsx_runtime_1.jsx)("input", { value: searchKeyword, onChange: function (event) {
                                                                return setSearchKeyword(event.target.value);
                                                            }, placeholder: "\u641C\u7D22\u6807\u9898\u3001\u6B63\u6587\u3001\u6807\u7B7E\u6216\u9519\u8BEF\u4FE1\u606F" })] }), (0, jsx_runtime_1.jsx)("div", { className: "generation-filter-row", children: [
                                                        { key: "all", label: "全部" },
                                                        { key: "generating", label: "生成中" },
                                                        { key: "draft", label: "待编辑" },
                                                        { key: "done", label: "已完成" },
                                                        { key: "failed", label: "失败" },
                                                    ].map(function (filter) { return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-filter-chip ".concat(activeFilter === filter.key ? "generation-filter-chip--active" : ""), onClick: function () { return setActiveFilter(filter.key); }, children: filter.label }, filter.key)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-note-board__subline", children: [(0, jsx_runtime_1.jsxs)("span", { children: ["\u5BF9\u6807\u7B14\u8BB0 ", activeBenchmarkCount, " \u7BC7"] }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u9879\u76EE\u65B9\u6848\u4E66", " ", ((_21 = (_20 = projectDetailQuery.data) === null || _20 === void 0 ? void 0 : _20.config) === null || _21 === void 0 ? void 0 : _21.brief_url)
                                                            ? "已上传"
                                                            : "未上传"] }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u8FD0\u884C\u9891\u7387", " ", generateIntervalMin
                                                            ? "\u6BCF ".concat(generateIntervalMin, " \u5206\u949F")
                                                            : "未配置"] }), (0, jsx_runtime_1.jsx)("span", { children: selectedProject.status === "running"
                                                        ? "运行中项目会自动轮询结果"
                                                        : "修改项目资料不会影响历史产出" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "generation-note-list", children: generatedNoteQuery.isLoading ? ((0, jsx_runtime_1.jsxs)("article", { className: "generation-empty-result", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 18, className: "generation-spin" }), (0, jsx_runtime_1.jsx)("strong", { children: "\u6B63\u5728\u52A0\u8F7D\u4EA7\u51FA\u7B14\u8BB0" }), (0, jsx_runtime_1.jsx)("p", { children: "\u5148\u628A\u5F53\u524D\u9879\u76EE\u7684\u771F\u5B9E\u751F\u6210\u7ED3\u679C\u53D6\u56DE\u6765\u3002" })] })) : generatedNoteQuery.isError ? ((0, jsx_runtime_1.jsxs)("article", { className: "generation-empty-result", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { size: 18 }), (0, jsx_runtime_1.jsx)("strong", { children: "\u4EA7\u51FA\u7B14\u8BB0\u52A0\u8F7D\u5931\u8D25" }), (0, jsx_runtime_1.jsx)("p", { children: generatedNoteQuery.error.message ||
                                                    "暂时无法获取结果列表，请稍后重试。" }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: function () { return generatedNoteQuery.refetch(); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 16 }), "\u91CD\u8BD5"] })] })) : generatedNotes.length ? (generatedNotes.map(function (note) {
                                        var _a, _b;
                                        var noteStatus = noteStatusMeta[note.status];
                                        var displayTags = (_b = (_a = note.tags) === null || _a === void 0 ? void 0 : _a.filter(Boolean)) !== null && _b !== void 0 ? _b : [];
                                        var displayImages = getGeneratedNoteImages(note);
                                        var coverImage = getGeneratedNoteCoverImage(note);
                                        var visibleTags = displayTags.slice(0, 3);
                                        var extraTagCount = Math.max(displayTags.length - visibleTags.length, 0);
                                        return ((0, jsx_runtime_1.jsxs)("article", { className: "generation-note-card", role: "button", tabIndex: 0, onClick: function () { return openGeneratedNoteDetail(note); }, onKeyDown: function (event) {
                                                if (event.key === "Enter" || event.key === " ") {
                                                    event.preventDefault();
                                                    openGeneratedNoteDetail(note);
                                                }
                                            }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-note-card__cover", children: [coverImage ? ((0, jsx_runtime_1.jsx)("img", { src: coverImage, alt: "".concat(getGeneratedNoteTitle(note), " \u5C01\u9762") })) : ((0, jsx_runtime_1.jsxs)("div", { className: "generation-note-card__cover-empty", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Image, { size: 18 }), (0, jsx_runtime_1.jsx)("span", { children: "\u6682\u65E0\u5C01\u9762" })] })), (0, jsx_runtime_1.jsxs)("div", { className: "generation-note-card__cover-top", children: [(0, jsx_runtime_1.jsxs)("span", { className: "generation-status ".concat(noteStatus.className), children: [note.status === "generating" && ((0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 12, className: "generation-spin" })), noteStatus.label] }), !!displayImages.length && ((0, jsx_runtime_1.jsxs)("span", { className: "generation-note-card__cover-count", children: [displayImages.length, " \u56FE"] }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-note-card__main", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-note-card__copy", children: [(0, jsx_runtime_1.jsx)("h3", { children: getGeneratedNoteTitle(note) }), (0, jsx_runtime_1.jsx)("div", { className: "generation-note-card__body", children: getGeneratedNoteSummary(note) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-note-card__footer", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-note-card__tags", children: visibleTags.length ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [visibleTags.map(function (tag) { return ((0, jsx_runtime_1.jsxs)("span", { className: "generation-note-card__tag", children: ["#", tag] }, tag)); }), extraTagCount > 0 && ((0, jsx_runtime_1.jsxs)("span", { className: "generation-note-card__tag generation-note-card__tag--muted", children: ["+", extraTagCount] }))] })) : ((0, jsx_runtime_1.jsx)("span", { className: "generation-note-card__empty", children: "\u6682\u65E0\u6807\u7B7E" })) }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-note-card__actions", children: [(0, jsx_runtime_1.jsx)("span", { className: "generation-note-card__time", children: formatDateLabel(note.created_at) }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: function (event) {
                                                                                event.stopPropagation();
                                                                                openGeneratedNoteDetail(note);
                                                                            }, children: "\u67E5\u770B" })] })] })] })] }, note.id));
                                    })) : ((0, jsx_runtime_1.jsxs)("article", { className: "generation-empty-result", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { size: 18 }), (0, jsx_runtime_1.jsx)("strong", { children: activeFilter !== "all" || searchKeyword.trim()
                                                    ? "当前筛选条件下还没有结果"
                                                    : "当前项目还没有产出笔记" }), (0, jsx_runtime_1.jsx)("p", { children: activeFilter !== "all" || searchKeyword.trim()
                                                    ? "换一个筛选项，或者清空搜索词后再看。"
                                                    : selectedProject.status === "running"
                                                        ? "项目运行后，后台会按生成间隔自动创建新记录。"
                                                        : "把项目切到运行中后，后台才会按配置自动生成笔记。" })] })) }), generatedNoteTotalPages > 1 && ((0, jsx_runtime_1.jsxs)("div", { className: "generation-picker-pagination", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: function () {
                                                return setGeneratedNotePage(function (current) {
                                                    return Math.max(current - 1, 1);
                                                });
                                            }, disabled: generatedNotePage <= 1 || generatedNoteQuery.isFetching, children: "\u4E0A\u4E00\u9875" }), (0, jsx_runtime_1.jsxs)("span", { className: "generation-picker-pagination__status", children: ["\u7B2C ", generatedNotePage, " / ", generatedNoteTotalPages, " \u9875"] }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: function () {
                                                return setGeneratedNotePage(function (current) {
                                                    return Math.min(current + 1, generatedNoteTotalPages);
                                                });
                                            }, disabled: generatedNotePage >= generatedNoteTotalPages ||
                                                generatedNoteQuery.isFetching, children: "\u4E0B\u4E00\u9875" })] }))] }))] })) }), isWizardOpen && ((0, jsx_runtime_1.jsxs)("div", { className: "generation-overlay", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-mask", onClick: closeWizard }), (0, jsx_runtime_1.jsxs)("section", { className: "generation-dialog generation-dialog--wizard", children: [(0, jsx_runtime_1.jsxs)("header", { className: "generation-dialog__header", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "generation-badge", children: "\u65B0\u5EFA\u9879\u76EE\u5F15\u5BFC" }), (0, jsx_runtime_1.jsx)("h2", { children: setupSteps[wizardStep - 1].title }), (0, jsx_runtime_1.jsx)("p", { children: setupSteps[wizardStep - 1].description })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-icon-button", onClick: closeWizard, "aria-label": "\u5173\u95ED\u65B0\u5EFA\u9879\u76EE\u5F15\u5BFC", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 16 }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "generation-step-tabs", children: setupSteps.map(function (step) {
                                    var isActive = step.id === wizardStep;
                                    var isDone = step.id < wizardStep;
                                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", className: "generation-step-tab ".concat(isActive ? "generation-step-tab--active" : "", " ").concat(isDone ? "generation-step-tab--done" : ""), onClick: function () { return setWizardStep(step.id); }, children: [(0, jsx_runtime_1.jsx)("span", { className: "generation-step-tab__index", children: isDone ? (0, jsx_runtime_1.jsx)(lucide_react_1.Check, { size: 14 }) : step.id }), (0, jsx_runtime_1.jsx)("span", { children: step.label })] }, step.id));
                                }) }), (0, jsx_runtime_1.jsx)("div", { className: "generation-progress", children: (0, jsx_runtime_1.jsx)("div", { className: "generation-progress__bar", style: { width: "".concat((wizardStep / setupSteps.length) * 100, "%") } }) }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-dialog__body", children: [wizardStep === 1 && ((0, jsx_runtime_1.jsxs)("div", { className: "generation-wizard-panel", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-field-grid", children: (0, jsx_runtime_1.jsxs)("label", { className: "generation-field", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u9879\u76EE\u540D\u79F0" }), (0, jsx_runtime_1.jsx)("input", { className: "generation-input", value: setupDraft.name, onChange: function (event) {
                                                                return setSetupDraft(function (current) { return (__assign(__assign({}, current), { name: event.target.value })); });
                                                            }, placeholder: "\u4F8B\u5982\uFF1A\u67D0\u6548\u7387 App \u6625\u5B63\u63A8\u5E7F", maxLength: 200 })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-surface-card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-surface-card__head", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileStack, { size: 18 }), (0, jsx_runtime_1.jsx)("strong", { children: "\u9879\u76EE\u65B9\u6848\u4E66" })] }), (0, jsx_runtime_1.jsx)("input", { ref: briefFileRef, type: "file", accept: ".pdf,.doc,.docx,.txt,.md,.pptx", style: { display: "none" }, onChange: function (event) {
                                                            var _a, _b;
                                                            var file = (_b = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
                                                            if (!file) {
                                                                return;
                                                            }
                                                            setBriefFile(file);
                                                            uploadFileMutation.mutate(file, {
                                                                onSuccess: function (data) {
                                                                    setBriefUploadedUrl(data.url);
                                                                    sonner_1.toast.success("方案书上传成功");
                                                                },
                                                            });
                                                        } }), briefFile ? ((0, jsx_runtime_1.jsxs)("div", { className: "generation-upload-card generation-upload-card--done", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-upload-card__info", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileStack, { size: 16 }), (0, jsx_runtime_1.jsx)("strong", { children: briefFile.name }), (0, jsx_runtime_1.jsxs)("span", { children: ["(", (briefFile.size / 1024).toFixed(0), " KB)"] }), uploadFileMutation.isPending && ((0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 14, className: "generation-spin" }), "\u4E0A\u4F20\u4E2D"] })), briefUploadedUrl && (0, jsx_runtime_1.jsx)("span", { children: "\u5DF2\u4E0A\u4F20" })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: function () {
                                                                    setBriefFile(null);
                                                                    setBriefUploadedUrl("");
                                                                    if (briefFileRef.current) {
                                                                        briefFileRef.current.value = "";
                                                                    }
                                                                }, disabled: uploadFileMutation.isPending, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 14 }), "\u79FB\u9664"] })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "generation-upload-card", onClick: function () { var _a; return (_a = briefFileRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, role: "button", tabIndex: 0, onKeyDown: function (event) {
                                                            var _a;
                                                            if (event.key === "Enter" || event.key === " ") {
                                                                (_a = briefFileRef.current) === null || _a === void 0 ? void 0 : _a.click();
                                                            }
                                                        }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Upload, { size: 20 }), (0, jsx_runtime_1.jsx)("div", { children: "\u70B9\u51FB\u4E0A\u4F20\u65B9\u6848\u4E66" }), (0, jsx_runtime_1.jsx)("p", { children: "\u652F\u6301 PDF\u3001Word\u3001PPT\u3001TXT\u3001Markdown \u683C\u5F0F" })] }))] })] })), wizardStep === 2 && ((0, jsx_runtime_1.jsxs)("div", { className: "generation-wizard-panel", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-surface-card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-surface-card__head", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u5DF2\u9009\u5BF9\u6807\u7B14\u8BB0" }), (0, jsx_runtime_1.jsx)("p", { children: "\u4ECE\u91C7\u96C6\u7B14\u8BB0\u6A21\u5757\u91CC\u52FE\u9009\uFF0C\u521B\u5EFA\u9879\u76EE\u540E\u4F1A\u81EA\u52A8\u6302\u5230\u5F53\u524D\u9879\u76EE\u4E0B\u3002" })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: function () { return openBenchmarkPicker("wizard"); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { size: 16 }), "\u9009\u62E9\u5BF9\u6807\u7B14\u8BB0"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-selection-summary", children: [(0, jsx_runtime_1.jsxs)("strong", { children: [setupDraft.benchmarkNoteIds.length, " \u7BC7"] }), (0, jsx_runtime_1.jsx)("span", { children: setupDraft.benchmarkNoteIds.length
                                                                    ? "已从采集笔记中选择参考内容"
                                                                    : "当前还没有选择对标笔记，可跳过后续再补" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "generation-reference-list", children: setupDraft.benchmarkNoteIds.length ? (setupDraft.benchmarkNoteIds.map(function (noteId, index) { return ((0, jsx_runtime_1.jsxs)("article", { className: "generation-reference-card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-reference-card__thumb", children: ["#", index + 1] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("strong", { children: ["\u5DF2\u52FE\u9009\u91C7\u96C6\u7B14\u8BB0 #", noteId] }), (0, jsx_runtime_1.jsx)("p", { children: "\u5982\u9700\u67E5\u770B\u6B63\u6587\u548C\u56FE\u7247\uFF0C\u8BF7\u70B9\u51FB\u4E0A\u65B9\u201C\u9009\u62E9\u5BF9\u6807\u7B14\u8BB0\u201D\u8FDB\u5165\u9009\u62E9\u5668\u3002" })] })] }, noteId)); })) : ((0, jsx_runtime_1.jsxs)("article", { className: "generation-reference-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-reference-card__thumb", children: "\u7A7A" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u652F\u6301\u8DF3\u8FC7\u8FD9\u4E00\u6B65" }), (0, jsx_runtime_1.jsx)("p", { children: "\u521B\u5EFA\u9879\u76EE\u540E\u4ECD\u7136\u53EF\u4EE5\u5728\u9879\u76EE\u8BBE\u7F6E\u5F39\u6846\u91CC\u7EE7\u7EED\u8865\u53C2\u8003\u5185\u5BB9\u3002" })] })] })) })] })), wizardStep === 3 && ((0, jsx_runtime_1.jsxs)("div", { className: "generation-wizard-panel", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-surface-card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-surface-card__head", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ImagePlus, { size: 18 }), (0, jsx_runtime_1.jsx)("strong", { children: "\u63A8\u5E7F\u8D44\u6599\u4E0A\u4F20\u533A" })] }), (0, jsx_runtime_1.jsx)("input", { ref: wizardReferenceFileRef, type: "file", accept: "image/*", multiple: true, style: { display: "none" }, onChange: handleWizardReferenceFileChange }), (0, jsx_runtime_1.jsx)("div", { className: "generation-upload-card", onClick: function () { var _a; return (_a = wizardReferenceFileRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, role: "button", tabIndex: 0, onKeyDown: function (event) {
                                                            var _a;
                                                            if (event.key === "Enter" || event.key === " ") {
                                                                (_a = wizardReferenceFileRef.current) === null || _a === void 0 ? void 0 : _a.click();
                                                            }
                                                        }, children: isReferenceUploading ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 20, className: "generation-spin" }), (0, jsx_runtime_1.jsx)("div", { children: "\u6B63\u5728\u4E0A\u4F20\u9879\u76EE\u8D44\u6599..." })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Upload, { size: 20 }), (0, jsx_runtime_1.jsx)("div", { children: "\u70B9\u51FB\u4E0A\u4F20\u53C2\u8003\u56FE\u7247" }), (0, jsx_runtime_1.jsx)("p", { children: "\u652F\u6301\u4EA7\u54C1\u56FE\u3001Logo \u56FE\u3001\u5E94\u7528\u622A\u56FE\u3001\u8BC4\u8BBA\u56FE\u3001\u6D3B\u52A8\u6D77\u62A5\u7B49\u56FE\u7247\u8D44\u6599\u3002" })] })) })] }), setupDraft.referenceAssets.length ? ((0, jsx_runtime_1.jsx)("div", { className: "generation-reference-asset-list", children: setupDraft.referenceAssets.map(function (asset, index) { return ((0, jsx_runtime_1.jsx)(ReferenceAssetCard, { asset: asset, index: index, onNameChange: function (value) {
                                                        return updateSetupReferenceAsset(asset.localId, function (current) { return (__assign(__assign({}, current), { name: value })); });
                                                    }, onTypeChange: function (value) {
                                                        return updateSetupReferenceAsset(asset.localId, function (current) { return (__assign(__assign({}, current), { assetType: value })); });
                                                    }, onRemove: function () {
                                                        return removeSetupReferenceAsset(asset.localId);
                                                    } }, asset.localId)); }) })) : ((0, jsx_runtime_1.jsxs)("div", { className: "generation-inline-feedback generation-inline-feedback--large", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ImagePlus, { size: 16 }), "\u4E0A\u4F20\u540E\u7684\u8D44\u6599\u4F1A\u663E\u793A\u5728\u8FD9\u91CC\uFF0C\u652F\u6301\u4FEE\u6539\u540D\u79F0\u548C\u7C7B\u578B\u3002"] })), (0, jsx_runtime_1.jsxs)("label", { className: "generation-field", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u8865\u5145\u8BF4\u660E" }), (0, jsx_runtime_1.jsx)("textarea", { className: "generation-textarea", value: setupDraft.assetNote, onChange: function (event) {
                                                            return setSetupDraft(function (current) { return (__assign(__assign({}, current), { assetNote: event.target.value })); });
                                                        } })] })] })), wizardStep === 4 && ((0, jsx_runtime_1.jsx)("div", { className: "generation-wizard-panel", children: (0, jsx_runtime_1.jsxs)("div", { className: "generation-field-grid", children: [(0, jsx_runtime_1.jsx)(RuleListEditor, { label: "\u6838\u5FC3\u8868\u8FBE", placeholder: "\u4F8B\u5982\uFF1A\u7ACB\u5373\u4E0B\u8F7D\u5E94\u7528\u3001\u5185\u5BB9\u89C1\u8BC4\u8BBA\u533A", suggestions: coreExpressionSuggestions, values: setupDraft.coreExpressions, inputValue: wizardCoreExpressionInput, onInputChange: setWizardCoreExpressionInput, onAdd: function () {
                                                        return addWizardRuleItem("coreExpressions", wizardCoreExpressionInput, function () { return setWizardCoreExpressionInput(""); });
                                                    }, onSuggestionClick: function (value) {
                                                        return addWizardRuleItem("coreExpressions", value, function () { });
                                                    }, onRemove: function (value) {
                                                        return removeWizardRuleItem("coreExpressions", value);
                                                    } }), (0, jsx_runtime_1.jsx)(RuleListEditor, { label: "\u6307\u5B9A Tags", placeholder: "\u4F8B\u5982\uFF1A\u673A\u68B0\u952E\u76D8\u3001\u684C\u642D\u5206\u4EAB\u3001\u529E\u516C\u6548\u7387", suggestions: [], values: setupDraft.specifiedTags, inputValue: wizardSpecifiedTagInput, onInputChange: setWizardSpecifiedTagInput, onAdd: function () {
                                                        return addWizardRuleItem("specifiedTags", wizardSpecifiedTagInput, function () { return setWizardSpecifiedTagInput(""); });
                                                    }, onSuggestionClick: function () { }, onRemove: function (value) {
                                                        return removeWizardRuleItem("specifiedTags", value);
                                                    } }), (0, jsx_runtime_1.jsx)(RuleListEditor, { label: "\u8FDD\u7981\u8BCD", placeholder: "\u4F8B\u5982\uFF1A\u6700\u5F3A\u3001\u5168\u7F51\u7B2C\u4E00\u3001\u4FDD\u8BC1\u6709\u6548", suggestions: forbiddenTermSuggestions, values: setupDraft.forbiddenTerms, inputValue: wizardForbiddenTermInput, onInputChange: setWizardForbiddenTermInput, onAdd: function () {
                                                        return addWizardRuleItem("forbiddenTerms", wizardForbiddenTermInput, function () { return setWizardForbiddenTermInput(""); });
                                                    }, onSuggestionClick: function (value) {
                                                        return addWizardRuleItem("forbiddenTerms", value, function () { });
                                                    }, onRemove: function (value) {
                                                        return removeWizardRuleItem("forbiddenTerms", value);
                                                    } })] }) })), wizardStep === 5 && ((0, jsx_runtime_1.jsxs)("div", { className: "generation-wizard-panel generation-wizard-panel--summary", children: [(0, jsx_runtime_1.jsxs)("article", { className: "generation-summary-list-card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-summary-list-card__head", children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u9879\u76EE\u51C6\u5907\u5B8C\u6210" }), (0, jsx_runtime_1.jsx)("p", { children: "\u9879\u76EE\u521B\u5EFA\u540E\u4F1A\u81EA\u52A8\u5173\u8054\u65B9\u6848\u4E66\u548C\u5DF2\u52FE\u9009\u7684\u5BF9\u6807\u7B14\u8BB0\uFF0C\u5176\u4F59\u8BBE\u7F6E\u7EE7\u7EED\u4F5C\u4E3A\u7ED3\u6784\u5360\u4F4D\u4FDD\u7559\u3002" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-step-list", children: [(0, jsx_runtime_1.jsxs)("article", { className: "generation-step-card generation-step-card--summary", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-step-card__index", children: "\u9879" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: setupDraft.name || "未填写项目名称" }), (0, jsx_runtime_1.jsx)("p", { children: briefFile
                                                                                    ? "\u65B9\u6848\u4E66\uFF1A".concat(briefFile.name)
                                                                                    : "未上传方案书" })] })] }), (0, jsx_runtime_1.jsxs)("article", { className: "generation-step-card generation-step-card--summary", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-step-card__index", children: "\u6807" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("strong", { children: ["\u5BF9\u6807\u7B14\u8BB0 ", setupDraft.benchmarkNoteIds.length, " \u7BC7"] }), (0, jsx_runtime_1.jsx)("p", { children: setupDraft.benchmarkNoteIds.length
                                                                                    ? "创建完成后会自动保存到项目配置里。"
                                                                                    : "暂未选择，可在项目设置中继续补充。" })] })] }), (0, jsx_runtime_1.jsxs)("article", { className: "generation-step-card generation-step-card--summary", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-step-card__index", children: "\u8D44" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("strong", { children: ["\u53C2\u8003\u8D44\u6599 ", setupDraft.referenceAssets.length, " \u5F20"] }), (0, jsx_runtime_1.jsx)("p", { children: setupDraft.referenceAssets.length
                                                                                    ? "创建完成后会把资料类型、名称和图片地址一起挂到项目下。"
                                                                                    : "暂未上传资料，可在项目设置中继续补充。" })] })] }), (0, jsx_runtime_1.jsxs)("article", { className: "generation-step-card generation-step-card--summary", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-step-card__index", children: "\u98CE" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("strong", { children: ["\u8868\u8FBE\u89C4\u5219 ", setupDraft.coreExpressions.length, " \u6761 / \u6307\u5B9A Tags ", setupDraft.specifiedTags.length, " \u6761 / \u8FDD\u7981\u8BCD ", setupDraft.forbiddenTerms.length, " \u6761"] }), (0, jsx_runtime_1.jsx)("p", { children: "\u521B\u5EFA\u5B8C\u6210\u540E\u4F1A\u4FDD\u5B58\u5230\u9879\u76EE\u914D\u7F6E\uFF0C\u5E76\u53C2\u4E0E\u540E\u7EED\u751F\u6210\u3002" })] })] })] })] }), (0, jsx_runtime_1.jsxs)("article", { className: "generation-surface-card", children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u4E0B\u4E00\u6B65\u4E3B\u52A8\u4F5C" }), (0, jsx_runtime_1.jsx)("p", { children: "\u5B8C\u6210\u521B\u5EFA\u540E\u76F4\u63A5\u8FDB\u5165\u9879\u76EE\u5DE5\u4F5C\u53F0\uFF0C\u540E\u7EED\u8D44\u6599\u7EF4\u62A4\u548C\u7ED3\u679C\u7BA1\u7406\u90FD\u5728\u540C\u4E00\u9875\u5B8C\u6210\u3002" })] })] }))] }), (0, jsx_runtime_1.jsxs)("footer", { className: "generation-dialog__footer", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-dialog__footer-group", children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: handleWizardBack, disabled: wizardStep === 1 || createProjectMutation.isPending, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, { size: 16 }), "\u4E0A\u4E00\u6B65"] }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: closeWizard, disabled: createProjectMutation.isPending, children: "\u5173\u95ED" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-dialog__footer-group", children: [wizardStep >= 2 && wizardStep < 5 && ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: handleWizardSkip, disabled: createProjectMutation.isPending, children: "\u8DF3\u8FC7" })), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-button generation-button--primary", onClick: handleWizardNext, disabled: !canProceedWizard || createProjectMutation.isPending, children: createProjectMutation.isPending ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 16, className: "generation-spin" }), "\u521B\u5EFA\u4E2D"] })) : wizardStep === 5 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["\u8FDB\u5165\u9879\u76EE\u5DE5\u4F5C\u53F0", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 16 })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["\u4E0B\u4E00\u6B65", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 16 })] })) })] })] })] })] })), isSettingsOpen && selectedProject && ((0, jsx_runtime_1.jsxs)("div", { className: "generation-overlay", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-mask generation-mask--light", onClick: closeSettings }), (0, jsx_runtime_1.jsxs)("section", { className: "generation-dialog generation-dialog--settings", children: [(0, jsx_runtime_1.jsxs)("header", { className: "generation-dialog__header", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "generation-badge", children: "\u9879\u76EE\u8BBE\u7F6E" }), (0, jsx_runtime_1.jsx)("div", { className: "generation-settings-header-title", children: isEditingProjectName ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", { className: "generation-input generation-settings-name-input", value: settingsDraft.name, onChange: function (event) {
                                                                return setSettingsDraft(function (current) { return (__assign(__assign({}, current), { name: event.target.value })); });
                                                            }, onKeyDown: function (event) {
                                                                if (event.key === "Enter") {
                                                                    void handleSaveProjectName();
                                                                }
                                                                if (event.key === "Escape") {
                                                                    handleCancelProjectNameEdit();
                                                                }
                                                            }, placeholder: "\u8BF7\u8F93\u5165\u9879\u76EE\u540D\u79F0", maxLength: 200, autoFocus: true }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-settings-name-edit", onClick: function () { return void handleSaveProjectName(); }, disabled: renameProjectMutation.isPending, "aria-label": "\u4FDD\u5B58\u9879\u76EE\u540D\u79F0", children: renameProjectMutation.isPending ? ((0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 14, className: "generation-spin" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Check, { size: 14 })) }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-settings-name-edit", onClick: handleCancelProjectNameEdit, disabled: renameProjectMutation.isPending, "aria-label": "\u53D6\u6D88\u7F16\u8F91\u9879\u76EE\u540D\u79F0", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 14 }) })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { children: settingsDraft.name || selectedProject.name }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-settings-name-edit", onClick: function () { return setIsEditingProjectName(true); }, "aria-label": "\u7F16\u8F91\u9879\u76EE\u540D\u79F0", children: (0, jsx_runtime_1.jsx)(lucide_react_1.PenSquare, { size: 14 }) })] })) }), (0, jsx_runtime_1.jsx)("p", { children: "\u5728\u4E00\u4E2A\u5F39\u6846\u91CC\u96C6\u4E2D\u8C03\u6574\u65B9\u6848\u4E66\u3001\u5BF9\u6807\u7B14\u8BB0\u3001\u9879\u76EE\u7D20\u6750\u548C\u81EA\u52A8\u751F\u6210\u914D\u7F6E\u3002" })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-icon-button", onClick: closeSettings, "aria-label": "\u5173\u95ED\u9879\u76EE\u8BBE\u7F6E", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 16 }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "generation-dialog__body generation-dialog__body--drawer", children: (0, jsx_runtime_1.jsxs)("div", { className: "generation-settings-shell", children: [(0, jsx_runtime_1.jsx)("aside", { className: "generation-settings-sidebar", children: (0, jsx_runtime_1.jsx)("nav", { className: "generation-settings-nav", children: settingsSections.map(function (section) { return ((0, jsx_runtime_1.jsxs)("button", { type: "button", className: "generation-settings-nav__item ".concat(activeSettingsSection === section.key ? "generation-settings-nav__item--active" : ""), onClick: function () { return setActiveSettingsSection(section.key); }, children: [(0, jsx_runtime_1.jsx)("span", { className: "generation-settings-nav__icon", children: (0, jsx_runtime_1.jsx)(section.icon, { size: 16 }) }), (0, jsx_runtime_1.jsxs)("span", { className: "generation-settings-nav__copy", children: [(0, jsx_runtime_1.jsx)("strong", { children: section.label }), (0, jsx_runtime_1.jsx)("small", { children: section.description })] })] }, section.key)); }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-settings-content", children: [activeSettingsSection === "runtime" && ((0, jsx_runtime_1.jsxs)("section", { className: "generation-settings-panel", children: [(0, jsx_runtime_1.jsx)("header", { className: "generation-settings-panel__header", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u8FD0\u884C\u914D\u7F6E" }), (0, jsx_runtime_1.jsx)("p", { children: "\u63A7\u5236\u9879\u76EE\u662F\u5426\u81EA\u52A8\u4EA7\u51FA\u7B14\u8BB0\uFF0C\u4EE5\u53CA\u4EA7\u51FA\u9891\u7387\u3002" })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-surface-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-surface-card__head", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u9879\u76EE\u8FD0\u884C\u72B6\u6001" }), (0, jsx_runtime_1.jsx)("p", { children: "\u542F\u52A8\u540E\u4F1A\u6301\u7EED\u81EA\u52A8\u4EA7\u51FA\u7B14\u8BB0\uFF1B\u6682\u505C\u540E\u505C\u6B62\u81EA\u52A8\u4EA7\u51FA\u3002" })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "generation-segment-row", children: [
                                                                        {
                                                                            key: "running",
                                                                            label: "启动",
                                                                            icon: lucide_react_1.Play,
                                                                            description: "允许后台自动生成",
                                                                        },
                                                                        {
                                                                            key: "paused",
                                                                            label: "暂停",
                                                                            icon: lucide_react_1.Pause,
                                                                            description: "停止自动生成",
                                                                        },
                                                                    ].map(function (item) { return ((0, jsx_runtime_1.jsxs)("button", { type: "button", className: "generation-segment-card ".concat(settingsDraft.projectStatus === item.key ? "generation-segment-card--active" : ""), onClick: function () {
                                                                            return setSettingsDraft(function (current) { return (__assign(__assign({}, current), { projectStatus: item.key })); });
                                                                        }, children: [(0, jsx_runtime_1.jsx)("span", { className: "generation-segment-card__icon", children: (0, jsx_runtime_1.jsx)(item.icon, { size: 16 }) }), (0, jsx_runtime_1.jsx)("strong", { children: item.label }), (0, jsx_runtime_1.jsx)("small", { children: item.description })] }, item.key)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-surface-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-surface-card__head", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u8FD0\u884C\u9891\u7387" }), (0, jsx_runtime_1.jsx)("p", { children: "\u8BBE\u7F6E\u540E\uFF0C\u7CFB\u7EDF\u4F1A\u6309\u8FD9\u4E2A\u9891\u7387\u6301\u7EED\u4EA7\u51FA\u65B0\u7B14\u8BB0\u3002" })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "generation-field-grid generation-field-grid--interval", children: (0, jsx_runtime_1.jsxs)("label", { className: "generation-field", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u6BCF" }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-input-group", children: [(0, jsx_runtime_1.jsx)("input", { className: "generation-input", type: "number", min: 1, step: 1, value: settingsDraft.generateIntervalMin, onChange: function (event) {
                                                                                            return setSettingsDraft(function (current) { return (__assign(__assign({}, current), { generateIntervalMin: event.target.value })); });
                                                                                        }, placeholder: "60" }), (0, jsx_runtime_1.jsx)("span", { className: "generation-input-group__suffix", children: "\u5206\u949F" })] }), (0, jsx_runtime_1.jsx)("small", { className: "generation-field__hint", children: "\u4F8B\u5982\uFF1A\u6BCF 30 \u5206\u949F\u4EA7\u51FA\u4E00\u7BC7\u7B14\u8BB0\u3002" })] }) })] })] })), activeSettingsSection === "brief" && ((0, jsx_runtime_1.jsxs)("section", { className: "generation-settings-panel", children: [(0, jsx_runtime_1.jsx)("header", { className: "generation-settings-panel__header", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u9879\u76EE\u65B9\u6848\u4E66" }), (0, jsx_runtime_1.jsx)("p", { children: "\u7EF4\u62A4\u5F53\u524D\u9879\u76EE\u7684\u65B9\u6848\u4E66\u6587\u4EF6\u548C\u89E3\u6790\u7ED3\u679C\u3002" })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "generation-surface-card", children: (0, jsx_runtime_1.jsxs)("label", { className: "generation-field", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u9879\u76EE\u6838\u5FC3\u521B\u4F5C\u4E3B\u9898" }), (0, jsx_runtime_1.jsx)("input", { className: "generation-input", value: settingsDraft.creativeTheme, onChange: function (event) {
                                                                            return setSettingsDraft(function (current) { return (__assign(__assign({}, current), { creativeTheme: event.target.value })); });
                                                                        }, placeholder: "\u4F8B\u5982\uFF1A\u72FC\u86DB\u673A\u68B0\u952E\u76D8\u63A8\u5E7F\u3001\u609F\u7A7A\u6D4F\u89C8\u5668 Web \u7AEF\u63A8\u5E7F", maxLength: 255 }), (0, jsx_runtime_1.jsx)("small", { className: "generation-field__hint", children: "\u8FD9\u4E2A\u4E3B\u9898\u4F1A\u548C\u65B9\u6848\u4E66\u5185\u5BB9\u4E00\u8D77\u8FDB\u5165\u9879\u76EE\u4E0A\u4E0B\u6587\uFF0C\u5F71\u54CD\u540E\u7EED\u751F\u6210\u3002" })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-surface-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-surface-card__head", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u65B9\u6848\u4E66\u6587\u4EF6" }), (0, jsx_runtime_1.jsx)("p", { children: "\u652F\u6301 PDF\u3001Word\u3001PPT\u3001TXT\u3001Markdown \u683C\u5F0F\u3002" })] }) }), ((_23 = (_22 = projectDetailQuery.data) === null || _22 === void 0 ? void 0 : _22.config) === null || _23 === void 0 ? void 0 : _23.brief_url) ? ((0, jsx_runtime_1.jsxs)("div", { className: "generation-upload-card generation-upload-card--done", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-upload-card__info", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileStack, { size: 16 }), (0, jsx_runtime_1.jsx)("strong", { children: "\u65B9\u6848\u4E66\u5DF2\u4E0A\u4F20" }), ((_25 = (_24 = projectDetailQuery.data) === null || _24 === void 0 ? void 0 : _24.config) === null || _25 === void 0 ? void 0 : _25.brief_content) && (0, jsx_runtime_1.jsx)("span", { children: "\u5DF2\u89E3\u6790" })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: function () {
                                                                                var input = document.createElement("input");
                                                                                input.type = "file";
                                                                                input.accept = ".pdf,.doc,.docx,.txt,.md,.pptx";
                                                                                input.onchange = function (event) {
                                                                                    var _a;
                                                                                    var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
                                                                                    if (!file) {
                                                                                        return;
                                                                                    }
                                                                                    uploadBriefMutation.mutate({
                                                                                        projectId: selectedProject.id,
                                                                                        file: file,
                                                                                    });
                                                                                };
                                                                                input.click();
                                                                            }, disabled: uploadFileMutation.isPending ||
                                                                                uploadBriefMutation.isPending, children: uploadFileMutation.isPending ||
                                                                                uploadBriefMutation.isPending ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 14, className: "generation-spin" }), "\u4E0A\u4F20\u4E2D"] })) : ("重新上传") })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "generation-upload-card", onClick: function () {
                                                                        var input = document.createElement("input");
                                                                        input.type = "file";
                                                                        input.accept = ".pdf,.doc,.docx,.txt,.md,.pptx";
                                                                        input.onchange = function (event) {
                                                                            var _a;
                                                                            var file = (_a = event.target
                                                                                .files) === null || _a === void 0 ? void 0 : _a[0];
                                                                            if (!file) {
                                                                                return;
                                                                            }
                                                                            uploadBriefMutation.mutate({
                                                                                projectId: selectedProject.id,
                                                                                file: file,
                                                                            });
                                                                        };
                                                                        input.click();
                                                                    }, role: "button", tabIndex: 0, onKeyDown: function (event) {
                                                                        if (event.key === "Enter" || event.key === " ") {
                                                                            event.currentTarget.click();
                                                                        }
                                                                    }, children: uploadFileMutation.isPending ||
                                                                        uploadBriefMutation.isPending ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 20, className: "generation-spin" }), (0, jsx_runtime_1.jsx)("div", { children: "\u6B63\u5728\u4E0A\u4F20\u5E76\u89E3\u6790..." })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Upload, { size: 20 }), (0, jsx_runtime_1.jsx)("div", { children: "\u70B9\u51FB\u4E0A\u4F20\u65B9\u6848\u4E66" }), (0, jsx_runtime_1.jsx)("p", { children: "\u652F\u6301 PDF\u3001Word\u3001PPT\u3001TXT\u3001Markdown \u683C\u5F0F" })] })) }))] })] })), activeSettingsSection === "benchmark" && ((0, jsx_runtime_1.jsxs)("section", { className: "generation-settings-panel", children: [(0, jsx_runtime_1.jsxs)("header", { className: "generation-settings-panel__header", children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("h3", { children: "\u5BF9\u6807\u7B14\u8BB0" }) }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: function () { return openBenchmarkPicker("settings"); }, disabled: projectDetailQuery.isLoading, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { size: 16 }), "\u9009\u62E9\u5BF9\u6807\u7B14\u8BB0"] })] }), projectDetailQuery.isLoading ? ((0, jsx_runtime_1.jsxs)("div", { className: "generation-inline-feedback", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 16, className: "generation-spin" }), "\u6B63\u5728\u52A0\u8F7D\u9879\u76EE\u5173\u8054\u7B14\u8BB0..."] })) : benchmarkNotes.length ? ((0, jsx_runtime_1.jsx)("div", { className: "generation-reference-list", children: benchmarkNotes.map(function (item) { return ((0, jsx_runtime_1.jsx)(ProjectBenchmarkCard, { item: item }, "".concat(item.relation_id, "-").concat(item.collected_note_id))); }) })) : ((0, jsx_runtime_1.jsxs)("div", { className: "generation-inline-feedback generation-inline-feedback--large", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { size: 16 }), "\u5F53\u524D\u8FD8\u6CA1\u6709\u5173\u8054\u5BF9\u6807\u7B14\u8BB0"] }))] })), activeSettingsSection === "assets" && ((0, jsx_runtime_1.jsxs)("section", { className: "generation-settings-panel", children: [(0, jsx_runtime_1.jsx)("header", { className: "generation-settings-panel__header", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u63A8\u5E7F\u8D44\u6599" }), (0, jsx_runtime_1.jsx)("p", { children: "\u4E0A\u4F20\u540E\u4F1A\u81EA\u52A8\u5165\u5E93\u3002\u4FEE\u6539\u8D44\u6599\u540D\u79F0\u3001\u7C7B\u578B\u6216\u5220\u9664\u8D44\u6599\u65F6\u4E5F\u4F1A\u81EA\u52A8\u540C\u6B65\u3002" })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-surface-card", children: [(0, jsx_runtime_1.jsx)("input", { ref: settingsReferenceFileRef, type: "file", accept: "image/*", multiple: true, style: { display: "none" }, onChange: handleSettingsReferenceFileChange }), (0, jsx_runtime_1.jsx)("div", { className: "generation-upload-card", onClick: function () { var _a; return (_a = settingsReferenceFileRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, role: "button", tabIndex: 0, onKeyDown: function (event) {
                                                                        var _a;
                                                                        if (event.key === "Enter" || event.key === " ") {
                                                                            (_a = settingsReferenceFileRef.current) === null || _a === void 0 ? void 0 : _a.click();
                                                                        }
                                                                    }, children: isReferenceUploading ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 20, className: "generation-spin" }), (0, jsx_runtime_1.jsx)("div", { children: "\u6B63\u5728\u4E0A\u4F20\u9879\u76EE\u8D44\u6599..." })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Upload, { size: 20 }), (0, jsx_runtime_1.jsx)("div", { children: "\u70B9\u51FB\u7EE7\u7EED\u4E0A\u4F20\u53C2\u8003\u56FE\u7247" }), (0, jsx_runtime_1.jsx)("p", { children: "\u652F\u6301\u591A\u56FE\u4E0A\u4F20\u3002\u6BCF\u5F20\u8D44\u6599\u90FD\u53EF\u4EE5\u72EC\u7ACB\u4FEE\u6539\u540D\u79F0\u548C\u7C7B\u578B\u3002" })] })) })] }), projectDetailQuery.isLoading &&
                                                            !settingsReferenceAssets.length ? ((0, jsx_runtime_1.jsxs)("div", { className: "generation-inline-feedback", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 16, className: "generation-spin" }), "\u6B63\u5728\u52A0\u8F7D\u9879\u76EE\u53C2\u8003\u8D44\u6599..."] })) : settingsReferenceAssets.length ? ((0, jsx_runtime_1.jsx)("div", { className: "generation-reference-asset-list", children: settingsReferenceAssets.map(function (asset, index) { return ((0, jsx_runtime_1.jsx)(ReferenceAssetCard, { asset: asset, index: index, onNameChange: function (value) {
                                                                    return updateSettingsReferenceAsset(asset.localId, function (current) { return (__assign(__assign({}, current), { name: value })); }, "debounced");
                                                                }, onTypeChange: function (value) {
                                                                    return updateSettingsReferenceAsset(asset.localId, function (current) { return (__assign(__assign({}, current), { assetType: value })); }, "immediate");
                                                                }, onRemove: function () {
                                                                    return removeSettingsReferenceAsset(asset.localId);
                                                                } }, asset.localId)); }) })) : ((0, jsx_runtime_1.jsxs)("div", { className: "generation-inline-feedback generation-inline-feedback--large", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ImagePlus, { size: 16 }), "\u5F53\u524D\u8FD8\u6CA1\u6709\u4E0A\u4F20\u9879\u76EE\u53C2\u8003\u8D44\u6599"] }))] })), activeSettingsSection === "messaging" && ((0, jsx_runtime_1.jsxs)("section", { className: "generation-settings-panel", children: [(0, jsx_runtime_1.jsx)("header", { className: "generation-settings-panel__header", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u8868\u8FBE\u89C4\u5219" }), (0, jsx_runtime_1.jsx)("p", { children: "\u9010\u6761\u7EF4\u62A4\u6838\u5FC3\u8868\u8FBE\u3001\u6307\u5B9A Tags \u548C\u8FDD\u7981\u8BCD\u3002\u6307\u5B9A Tags \u4F1A\u5728\u751F\u6210\u65F6\u5F3A\u5236\u4F7F\u7528\uFF0C\u5E76\u6392\u5728\u6700\u524D\u9762\u3002" })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-field-grid", children: [(0, jsx_runtime_1.jsx)(RuleListEditor, { label: "\u6838\u5FC3\u8868\u8FBE", placeholder: "\u4F8B\u5982\uFF1A\u7ACB\u5373\u4E0B\u8F7D\u5E94\u7528\u3001\u5185\u5BB9\u89C1\u8BC4\u8BBA\u533A", suggestions: coreExpressionSuggestions, values: settingsDraft.coreExpressions, inputValue: settingsCoreExpressionInput, onInputChange: setSettingsCoreExpressionInput, onAdd: function () {
                                                                        return addSettingsRuleItem("coreExpressions", settingsCoreExpressionInput, function () { return setSettingsCoreExpressionInput(""); });
                                                                    }, onSuggestionClick: function (value) {
                                                                        return addSettingsRuleItem("coreExpressions", value, function () { });
                                                                    }, onRemove: function (value) {
                                                                        return removeSettingsRuleItem("coreExpressions", value);
                                                                    } }), (0, jsx_runtime_1.jsx)(RuleListEditor, { label: "\u6307\u5B9A Tags", placeholder: "\u4F8B\u5982\uFF1A\u673A\u68B0\u952E\u76D8\u3001\u684C\u642D\u5206\u4EAB\u3001\u529E\u516C\u6548\u7387", suggestions: [], values: settingsDraft.specifiedTags, inputValue: settingsSpecifiedTagInput, onInputChange: setSettingsSpecifiedTagInput, onAdd: function () {
                                                                        return addSettingsRuleItem("specifiedTags", settingsSpecifiedTagInput, function () { return setSettingsSpecifiedTagInput(""); });
                                                                    }, onSuggestionClick: function () { }, onRemove: function (value) {
                                                                        return removeSettingsRuleItem("specifiedTags", value);
                                                                    } }), (0, jsx_runtime_1.jsx)(RuleListEditor, { label: "\u8FDD\u7981\u8BCD", placeholder: "\u4F8B\u5982\uFF1A\u6700\u5F3A\u3001\u5168\u7F51\u7B2C\u4E00\u3001\u4FDD\u8BC1\u6709\u6548", suggestions: forbiddenTermSuggestions, values: settingsDraft.forbiddenTerms, inputValue: settingsForbiddenTermInput, onInputChange: setSettingsForbiddenTermInput, onAdd: function () {
                                                                        return addSettingsRuleItem("forbiddenTerms", settingsForbiddenTermInput, function () { return setSettingsForbiddenTermInput(""); });
                                                                    }, onSuggestionClick: function (value) {
                                                                        return addSettingsRuleItem("forbiddenTerms", value, function () { });
                                                                    }, onRemove: function (value) {
                                                                        return removeSettingsRuleItem("forbiddenTerms", value);
                                                                    } })] })] }))] })] }) }), (0, jsx_runtime_1.jsxs)("footer", { className: "generation-dialog__footer generation-dialog__footer--drawer", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-dialog__footer-group", children: (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-button generation-button--ghost generation-button--danger", onClick: function () {
                                                void handleDeleteProject();
                                            }, disabled: deleteProjectMutation.isPending ||
                                                updateProjectConfigMutation.isPending ||
                                                updateProjectStatusMutation.isPending ||
                                                updateReferenceAssetsMutation.isPending ||
                                                isReferenceUploading, children: deleteProjectMutation.isPending ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 16, className: "generation-spin" }), "\u5220\u9664\u4E2D"] })) : ("删除项目") }) }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-dialog__footer-group", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: closeSettings, disabled: deleteProjectMutation.isPending ||
                                                    updateProjectConfigMutation.isPending ||
                                                    updateProjectStatusMutation.isPending ||
                                                    updateReferenceAssetsMutation.isPending ||
                                                    isReferenceUploading, children: "\u53D6\u6D88" }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-button generation-button--primary", onClick: isAssetSettingsSection
                                                    ? closeSettings
                                                    : isBriefSettingsSection
                                                        ? handleSaveBriefSettings
                                                        : isMessagingSettingsSection
                                                            ? handleSaveMessagingSettings
                                                            : isRuntimeSettingsSection
                                                                ? handleSaveSettings
                                                                : closeSettings, disabled: isAssetSettingsSection
                                                    ? deleteProjectMutation.isPending ||
                                                        updateReferenceAssetsMutation.isPending ||
                                                        isReferenceUploading
                                                    : isBriefSettingsSection
                                                        ? deleteProjectMutation.isPending ||
                                                            updateProjectConfigMutation.isPending
                                                        : isMessagingSettingsSection
                                                            ? deleteProjectMutation.isPending ||
                                                                updateProjectConfigMutation.isPending
                                                            : isRuntimeSettingsSection
                                                                ? deleteProjectMutation.isPending ||
                                                                    updateProjectConfigMutation.isPending ||
                                                                    updateProjectStatusMutation.isPending
                                                                : deleteProjectMutation.isPending, children: (isAssetSettingsSection
                                                    ? deleteProjectMutation.isPending ||
                                                        updateReferenceAssetsMutation.isPending ||
                                                        isReferenceUploading
                                                    : isBriefSettingsSection
                                                        ? deleteProjectMutation.isPending ||
                                                            updateProjectConfigMutation.isPending
                                                        : isMessagingSettingsSection
                                                            ? deleteProjectMutation.isPending ||
                                                                updateProjectConfigMutation.isPending
                                                            : isRuntimeSettingsSection
                                                                ? deleteProjectMutation.isPending ||
                                                                    updateProjectConfigMutation.isPending ||
                                                                    updateProjectStatusMutation.isPending
                                                                : deleteProjectMutation.isPending) ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 16, className: "generation-spin" }), isAssetSettingsSection ? "同步中" : "保存中"] })) : isAssetSettingsSection ? ("完成") : isBriefSettingsSection ? ("保存方案配置") : isMessagingSettingsSection ? ("保存表达规则") : isRuntimeSettingsSection ? ("保存运行配置") : ("完成") })] })] })] })] })), selectedGeneratedNote && selectedGeneratedNoteStatus && ((0, jsx_runtime_1.jsxs)("div", { className: "generation-overlay", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-mask generation-mask--light", onClick: closeGeneratedNoteDetail }), (0, jsx_runtime_1.jsxs)("section", { className: "generation-dialog generation-dialog--note-detail", children: [(0, jsx_runtime_1.jsxs)("header", { className: "generation-dialog__header generation-dialog__header--note-detail", children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("span", { className: "generation-badge", children: "\u7B14\u8BB0\u8BE6\u60C5" }) }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-icon-button", onClick: closeGeneratedNoteDetail, "aria-label": "\u5173\u95ED\u7B14\u8BB0\u8BE6\u60C5", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 16 }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "generation-dialog__body generation-dialog__body--note-detail", children: (0, jsx_runtime_1.jsxs)("div", { className: "generation-note-detail", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-note-detail__media", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-note-detail__preview", children: selectedGeneratedNoteActiveImage ? ((0, jsx_runtime_1.jsx)("img", { src: selectedGeneratedNoteActiveImage, alt: "".concat(getGeneratedNoteTitle(selectedGeneratedNote), " \u9884\u89C8\u56FE") })) : ((0, jsx_runtime_1.jsxs)("div", { className: "generation-note-detail__preview-empty", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Image, { size: 24 }), (0, jsx_runtime_1.jsx)("span", { children: "\u5F53\u524D\u6CA1\u6709\u53EF\u5C55\u793A\u56FE\u7247" })] })) }), selectedGeneratedNoteImages.length > 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-note-detail__media-top", children: [(0, jsx_runtime_1.jsxs)("span", { className: "generation-tag generation-tag--soft", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Image, { size: 12 }), "\u5171", " ", selectedGeneratedNoteImages.length, " \u5F20\u56FE\u7247"] }), selectedGeneratedNoteActiveImage && ((0, jsx_runtime_1.jsxs)("a", { className: "generation-note-detail__preview-link", href: selectedGeneratedNoteActiveImage, target: "_blank", rel: "noreferrer", children: ["\u67E5\u770B\u539F\u56FE", (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, { size: 12 })] }))] }), (0, jsx_runtime_1.jsx)("div", { className: "generation-note-detail__thumbs", children: selectedGeneratedNoteImages.map(function (image, index) { return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-note-detail__thumb ".concat(index === activeGeneratedNoteImageIndex ? "generation-note-detail__thumb--active" : ""), onClick: function () {
                                                                    return setActiveGeneratedNoteImageIndex(index);
                                                                }, "aria-label": "\u67E5\u770B\u7B2C ".concat(index + 1, " \u5F20\u56FE\u7247"), children: (0, jsx_runtime_1.jsx)("img", { src: image, alt: "".concat(getGeneratedNoteTitle(selectedGeneratedNote), " \u7F29\u7565\u56FE ").concat(index + 1) }) }, "".concat(image, "-").concat(index))); }) })] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-note-detail__content", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-note-detail__meta", children: [(0, jsx_runtime_1.jsxs)("span", { className: "generation-status ".concat(selectedGeneratedNoteStatus.className), children: [selectedGeneratedNote.status === "generating" && ((0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 12, className: "generation-spin" })), selectedGeneratedNoteStatus.label] }), (0, jsx_runtime_1.jsxs)("span", { className: "generation-note-detail__time", children: ["\u751F\u6210\u4E8E ", formatDateLabel(selectedGeneratedNote.created_at)] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "generation-note-detail__section", children: [(0, jsx_runtime_1.jsx)("h3", { className: "generation-note-detail__title", children: getGeneratedNoteTitle(selectedGeneratedNote) }), (0, jsx_runtime_1.jsx)("div", { className: "generation-note-detail__body", children: getGeneratedNoteSummary(selectedGeneratedNote) }), (0, jsx_runtime_1.jsx)("div", { className: "generation-note-detail__tags", children: selectedGeneratedNoteTags.length ? (selectedGeneratedNoteTags.map(function (tag) { return ((0, jsx_runtime_1.jsxs)("span", { className: "generation-note-detail__tag", children: ["#", tag] }, tag)); })) : ((0, jsx_runtime_1.jsx)("span", { className: "generation-note-detail__tag generation-note-detail__tag--muted", children: "\u6682\u65E0\u6807\u7B7E" })) })] }), !!((_26 = selectedGeneratedNote.agent_query) === null || _26 === void 0 ? void 0 : _26.trim()) && ((0, jsx_runtime_1.jsxs)("section", { className: "generation-note-detail__section", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-note-detail__section-head", children: (0, jsx_runtime_1.jsx)("strong", { children: "\u672C\u6B21\u751F\u6210 Prompt" }) }), (0, jsx_runtime_1.jsx)("pre", { className: "generation-note-detail__prompt", children: selectedGeneratedNote.agent_query.trim() })] }))] })] }) }), (0, jsx_runtime_1.jsxs)("footer", { className: "generation-dialog__footer generation-dialog__footer--note-detail", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-dialog__footer-group", children: (0, jsx_runtime_1.jsx)("span", { className: "generation-note-detail__footer-tip", children: "\u8FD9\u6B21\u4EA7\u51FA\u7684\u56FE\u7247\u548C\u6B63\u6587\u90FD\u5728\u8FD9\u91CC\u5B8C\u6574\u5C55\u5F00\u3002" }) }), (0, jsx_runtime_1.jsx)("div", { className: "generation-dialog__footer-group", children: (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: closeGeneratedNoteDetail, children: "\u5173\u95ED" }) })] })] })] })), benchmarkPickerTarget && ((0, jsx_runtime_1.jsxs)("div", { className: "generation-overlay", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-mask", onClick: closeBenchmarkPicker }), (0, jsx_runtime_1.jsxs)("section", { className: "generation-dialog generation-dialog--picker", children: [(0, jsx_runtime_1.jsxs)("header", { className: "generation-dialog__header", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "generation-badge", children: "\u9009\u62E9\u5BF9\u6807\u7B14\u8BB0" }), (0, jsx_runtime_1.jsx)("h2", { children: "\u4ECE\u91C7\u96C6\u7B14\u8BB0\u4E2D\u52FE\u9009\u8981\u5173\u8054\u5230\u9879\u76EE\u7684\u53C2\u8003\u5185\u5BB9" }), (0, jsx_runtime_1.jsx)("p", { children: "\u8FD9\u91CC\u663E\u793A\u7684\u662F\u771F\u5B9E\u91C7\u96C6\u6570\u636E\u3002\u4FDD\u5B58\u540E\uFF0C\u9879\u76EE\u914D\u7F6E\u91CC\u7684\u5BF9\u6807\u7B14\u8BB0\u4F1A\u7ACB\u523B\u66F4\u65B0\u3002" })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-icon-button", onClick: closeBenchmarkPicker, "aria-label": "\u5173\u95ED\u5BF9\u6807\u7B14\u8BB0\u9009\u62E9\u5668", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 16 }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-dialog__body", children: [(0, jsx_runtime_1.jsxs)("div", { className: "generation-picker-toolbar", children: [(0, jsx_runtime_1.jsxs)("label", { className: "generation-search", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { size: 16 }), (0, jsx_runtime_1.jsx)("input", { value: benchmarkKeyword, onChange: function (event) {
                                                            setBenchmarkKeyword(event.target.value);
                                                            setBenchmarkPage(1);
                                                        }, placeholder: "\u641C\u7D22\u6807\u9898\u6216\u6B63\u6587" })] }), (0, jsx_runtime_1.jsx)("div", { className: "generation-filter-row", children: [
                                                    { key: undefined, label: "全部" },
                                                    { key: "image", label: "图文" },
                                                    { key: "video", label: "视频" },
                                                ].map(function (filter) { return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-filter-chip ".concat(benchmarkNoteType === filter.key ? "generation-filter-chip--active" : ""), onClick: function () {
                                                        setBenchmarkNoteType(filter.key);
                                                        setBenchmarkPage(1);
                                                    }, children: filter.label }, filter.label)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "generation-selection-summary generation-selection-summary--picker", children: [(0, jsx_runtime_1.jsxs)("strong", { children: ["\u5DF2\u9009 ", benchmarkSelection.length, " \u7BC7"] }), (0, jsx_runtime_1.jsx)("span", { children: "\u4FDD\u5B58\u540E\u4F1A\u6309\u5F53\u524D\u987A\u5E8F\u5199\u5165\u9879\u76EE\u5173\u8054\u8868\u3002" })] }), collectedNoteQuery.isLoading ? ((0, jsx_runtime_1.jsxs)("div", { className: "generation-inline-feedback generation-inline-feedback--large", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 18, className: "generation-spin" }), "\u6B63\u5728\u52A0\u8F7D\u91C7\u96C6\u7B14\u8BB0..."] })) : pickerNotes.length ? ((0, jsx_runtime_1.jsx)("div", { className: "generation-benchmark-grid", children: pickerNotes.map(function (note) { return ((0, jsx_runtime_1.jsx)(CollectedNotePickerCard, { note: note, selected: benchmarkSelection.includes(note.id), onToggle: function () { return toggleBenchmarkSelection(note.id); } }, note.id)); }) })) : ((0, jsx_runtime_1.jsxs)("div", { className: "generation-inline-feedback generation-inline-feedback--large", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { size: 18 }), "\u5F53\u524D\u6CA1\u6709\u53EF\u9009\u7684\u91C7\u96C6\u7B14\u8BB0"] })), pickerTotalPages > 1 && ((0, jsx_runtime_1.jsxs)("div", { className: "generation-picker-pagination", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: function () {
                                                    return setBenchmarkPage(function (current) { return Math.max(current - 1, 1); });
                                                }, disabled: benchmarkPage <= 1, children: "\u4E0A\u4E00\u9875" }), (0, jsx_runtime_1.jsxs)("span", { children: [benchmarkPage, " / ", pickerTotalPages] }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: function () {
                                                    return setBenchmarkPage(function (current) {
                                                        return Math.min(current + 1, pickerTotalPages);
                                                    });
                                                }, disabled: benchmarkPage >= pickerTotalPages, children: "\u4E0B\u4E00\u9875" })] }))] }), (0, jsx_runtime_1.jsxs)("footer", { className: "generation-dialog__footer", children: [(0, jsx_runtime_1.jsx)("div", { className: "generation-dialog__footer-group", children: (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-button generation-button--ghost", onClick: closeBenchmarkPicker, children: "\u53D6\u6D88" }) }), (0, jsx_runtime_1.jsx)("div", { className: "generation-dialog__footer-group", children: (0, jsx_runtime_1.jsx)("button", { type: "button", className: "generation-button generation-button--primary", onClick: handleApplyBenchmarkSelection, disabled: updateBenchmarkNotesMutation.isPending, children: updateBenchmarkNotesMutation.isPending ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { size: 16, className: "generation-spin" }), "\u4FDD\u5B58\u4E2D"] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["\u4FDD\u5B58\u9009\u62E9", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 16 })] })) }) })] })] })] }))] }));
}
