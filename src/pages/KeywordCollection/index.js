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
exports.default = KeywordCollectionPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var useKeywordCollection_1 = require("~/hooks/useKeywordCollection");
require("./keywordCollection.css");
var DEFAULT_PAGE_SIZE = 50;
var pageSizeOptions = [10, 20, 50, 100];
var TAG_ANALYSIS_TOP_N = 20;
var TAG_ANALYSIS_LIKE_SMOOTHING = 3;
var sortOptions = [
    { label: "最新发布", value: "latest" },
    { label: "点赞最高", value: "likes" },
];
var noteTypeOptions = [
    { label: "全部", value: "" },
    { label: "图文", value: "note" },
    { label: "视频", value: "video" },
];
function KeywordCollectionPage() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var _k = (0, react_1.useState)(""), keywordSearchInput = _k[0], setKeywordSearchInput = _k[1];
    var _l = (0, react_1.useState)(""), keywordQuery = _l[0], setKeywordQuery = _l[1];
    var _m = (0, react_1.useState)(""), noteSearchInput = _m[0], setNoteSearchInput = _m[1];
    var _o = (0, react_1.useState)(""), noteQuery = _o[0], setNoteQuery = _o[1];
    var _p = (0, react_1.useState)(), selectedKeywordId = _p[0], setSelectedKeywordId = _p[1];
    var _q = (0, react_1.useState)(), selectedTabId = _q[0], setSelectedTabId = _q[1];
    var _r = (0, react_1.useState)("latest"), sort = _r[0], setSort = _r[1];
    var _s = (0, react_1.useState)(""), noteType = _s[0], setNoteType = _s[1];
    var _t = (0, react_1.useState)(1), page = _t[0], setPage = _t[1];
    var _u = (0, react_1.useState)(DEFAULT_PAGE_SIZE), pageSize = _u[0], setPageSize = _u[1];
    var _v = (0, react_1.useState)(false), showImportModal = _v[0], setShowImportModal = _v[1];
    var _w = (0, react_1.useState)(false), showTagAnalysisModal = _w[0], setShowTagAnalysisModal = _w[1];
    var _x = (0, react_1.useState)(false), showTitleGeneratorModal = _x[0], setShowTitleGeneratorModal = _x[1];
    var _y = (0, react_1.useState)(null), importFile = _y[0], setImportFile = _y[1];
    var keywordsQuery = (0, useKeywordCollection_1.useKeywordCollectionKeywords)({ keyword: keywordQuery });
    var tabsQuery = (0, useKeywordCollection_1.useKeywordCollectionTabs)(selectedKeywordId);
    var importMutation = (0, useKeywordCollection_1.useImportLegacyKeywordCollectionFile)();
    var titleGeneratorMutation = (0, useKeywordCollection_1.useGenerateKeywordCollectionTitles)();
    var notesQuery = (0, useKeywordCollection_1.useKeywordCollectionNotes)(selectedKeywordId
        ? {
            keywordId: selectedKeywordId,
            tabId: selectedTabId,
            page: page,
            pageSize: pageSize,
            sort: sort,
            noteType: noteType || undefined,
            keyword: noteQuery || undefined,
        }
        : undefined);
    var tagAnalysisQuery = (0, useKeywordCollection_1.useKeywordCollectionTagAnalysis)(showTagAnalysisModal && selectedKeywordId && selectedTabId
        ? {
            keywordId: selectedKeywordId,
            tabId: selectedTabId,
            noteType: noteType || undefined,
            keyword: noteQuery || undefined,
        }
        : undefined);
    var keywords = (_a = keywordsQuery.data) !== null && _a !== void 0 ? _a : [];
    var tabs = (_c = (_b = tabsQuery.data) === null || _b === void 0 ? void 0 : _b.tabs) !== null && _c !== void 0 ? _c : [];
    var notes = (_e = (_d = notesQuery.data) === null || _d === void 0 ? void 0 : _d.list) !== null && _e !== void 0 ? _e : [];
    var total = (_g = (_f = notesQuery.data) === null || _f === void 0 ? void 0 : _f.total) !== null && _g !== void 0 ? _g : 0;
    var totalPages = Math.max(1, Math.ceil(total / pageSize));
    var selectedKeyword = (0, react_1.useMemo)(function () { return keywords.find(function (item) { return item.id === selectedKeywordId; }); }, [keywords, selectedKeywordId]);
    var selectedTab = (0, react_1.useMemo)(function () { return tabs.find(function (item) { return item.id === selectedTabId; }); }, [tabs, selectedTabId]);
    var summary = ((_h = notesQuery.data) === null || _h === void 0 ? void 0 : _h.summary) || ((_j = tabsQuery.data) === null || _j === void 0 ? void 0 : _j.summary);
    (0, react_1.useEffect)(function () {
        if (keywords.length === 0) {
            setSelectedKeywordId(undefined);
            return;
        }
        var exists = keywords.some(function (item) { return item.id === selectedKeywordId; });
        if (!selectedKeywordId || !exists) {
            setSelectedKeywordId(keywords[0].id);
        }
    }, [keywords, selectedKeywordId]);
    (0, react_1.useEffect)(function () {
        if (tabs.length === 0) {
            setSelectedTabId(undefined);
            return;
        }
        var exists = tabs.some(function (item) { return item.id === selectedTabId; });
        if (!selectedTabId || !exists) {
            setSelectedTabId(tabs[0].id);
        }
    }, [tabs, selectedTabId]);
    (0, react_1.useEffect)(function () {
        setPage(1);
    }, [selectedKeywordId, selectedTabId, sort, noteType, noteQuery, pageSize]);
    var handleKeywordSearch = function () {
        setKeywordQuery(keywordSearchInput.trim());
    };
    var handleNoteSearch = function () {
        setNoteQuery(noteSearchInput.trim());
    };
    var handleImport = function () {
        if (!importFile) {
            return;
        }
        importMutation.mutate(importFile, {
            onSuccess: function () {
                setShowImportModal(false);
                setImportFile(null);
            },
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-page", children: [showImportModal ? ((0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-import-modal", children: [(0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-import-modal__backdrop", onClick: function () {
                            if (!importMutation.isPending) {
                                setShowImportModal(false);
                                setImportFile(null);
                            }
                        } }), (0, jsx_runtime_1.jsxs)("section", { className: "keyword-collection-import-dialog", children: [(0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-import-dialog__head", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u5BFC\u5165\u65E7\u7248\u5173\u952E\u8BCD\u91C7\u96C6 JSON" }), (0, jsx_runtime_1.jsx)("p", { children: "\u4E0A\u4F20 `secondary_categories` \u7ED3\u6784\u7684\u65E7\u7248 JSON \u6587\u4EF6\uFF0C\u540E\u7AEF\u4F1A\u81EA\u52A8\u62C6\u6210\u5173\u952E\u8BCD\u3001tab \u548C\u7B14\u8BB0\u5173\u7CFB\u3002" })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "keyword-collection-import-dialog__close", onClick: function () {
                                            if (!importMutation.isPending) {
                                                setShowImportModal(false);
                                                setImportFile(null);
                                            }
                                        }, children: "\u5173\u95ED" })] }), (0, jsx_runtime_1.jsxs)("label", { className: "keyword-collection-import-panel__file keyword-collection-import-panel__file--modal", children: [(0, jsx_runtime_1.jsx)("input", { type: "file", accept: ".json,application/json", onChange: function (event) { var _a, _b; return setImportFile((_b = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null); } }), (0, jsx_runtime_1.jsx)("span", { children: importFile ? importFile.name : "选择 JSON 文件" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-import-dialog__tips", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u652F\u6301\u65E7\u7248\u5BFC\u51FA\u6587\u4EF6\u540D\uFF0C\u4F8B\u5982 `xiaohongshu_\u6743\u5A01\u97F3\u4E50bgm_1774266444983.json`\u3002" }), (0, jsx_runtime_1.jsx)("span", { children: "\u5BFC\u5165\u65F6\u4F1A\u81EA\u52A8\u8FC7\u6EE4\u65E0\u6548\u5B57\u6BB5\u548C\u7F3A\u5931 `note_id` / `note_url` \u7684\u810F\u6570\u636E\u3002" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-import-dialog__footer", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "keyword-collection-import-dialog__ghost", onClick: function () {
                                            if (!importMutation.isPending) {
                                                setShowImportModal(false);
                                                setImportFile(null);
                                            }
                                        }, children: "\u53D6\u6D88" }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "keyword-collection-import-panel__submit", disabled: !importFile || importMutation.isPending, onClick: handleImport, children: importMutation.isPending ? "导入中..." : "开始导入" })] })] })] })) : null, showTagAnalysisModal ? ((0, jsx_runtime_1.jsx)(TagAnalysisModal, { open: showTagAnalysisModal, onClose: function () { return setShowTagAnalysisModal(false); }, currentTabId: selectedTabId, keywordName: selectedKeyword === null || selectedKeyword === void 0 ? void 0 : selectedKeyword.name, tabName: selectedTab === null || selectedTab === void 0 ? void 0 : selectedTab.name, isLoading: tagAnalysisQuery.isLoading, isError: tagAnalysisQuery.isError, data: tagAnalysisQuery.data })) : null, showTitleGeneratorModal ? ((0, jsx_runtime_1.jsx)(TitleGeneratorModal, { open: showTitleGeneratorModal, keywordId: selectedKeywordId, keywordName: selectedKeyword === null || selectedKeyword === void 0 ? void 0 : selectedKeyword.name, tabs: tabs, currentTabId: selectedTabId, isPending: titleGeneratorMutation.isPending, result: titleGeneratorMutation.data, onClose: function () {
                    setShowTitleGeneratorModal(false);
                    titleGeneratorMutation.reset();
                }, onGenerate: function (tabId) {
                    return titleGeneratorMutation.mutate({
                        keywordId: selectedKeywordId,
                        tabId: tabId,
                    });
                } })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-shell", children: [(0, jsx_runtime_1.jsx)("aside", { className: "keyword-collection-sidebar", children: (0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-panel keyword-collection-panel--sidebar", children: [(0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-panel__head", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { children: "\u4E00\u7EA7\u5206\u7C7B" }), (0, jsx_runtime_1.jsx)("strong", { children: "\u5173\u952E\u8BCD\u5217\u8868" })] }), (0, jsx_runtime_1.jsxs)("span", { children: [keywords.length, " \u4E2A"] })] }), (0, jsx_runtime_1.jsxs)("label", { className: "keyword-collection-search keyword-collection-search--sidebar", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { size: 15 }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\u641C\u7D22\u5173\u952E\u8BCD", value: keywordSearchInput, onChange: function (event) { return setKeywordSearchInput(event.target.value); }, onKeyDown: function (event) {
                                                return event.key === "Enter" && handleKeywordSearch();
                                            } })] }), (0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-keyword-list", children: keywordsQuery.isLoading ? ((0, jsx_runtime_1.jsx)(SidebarMessage, { text: "\u5173\u952E\u8BCD\u52A0\u8F7D\u4E2D..." })) : keywordsQuery.isError ? ((0, jsx_runtime_1.jsx)(SidebarMessage, { text: "\u5173\u952E\u8BCD\u52A0\u8F7D\u5931\u8D25" })) : keywords.length === 0 ? ((0, jsx_runtime_1.jsx)(SidebarMessage, { text: "\u6682\u65E0\u516C\u5171\u5173\u952E\u8BCD\u6570\u636E" })) : (keywords.map(function (item) { return ((0, jsx_runtime_1.jsx)(KeywordListItem, { item: item, active: item.id === selectedKeywordId, onClick: function () { return setSelectedKeywordId(item.id); } }, item.id)); })) }), (0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-sidebar__footer", children: (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "keyword-collection-import-toggle", onClick: function () { return setShowImportModal(true); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Upload, { size: 16 }), "\u5BFC\u5165 JSON"] }) })] }) }), (0, jsx_runtime_1.jsx)("section", { className: "keyword-collection-main", children: (0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-panel keyword-collection-panel--main", children: [(0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-main-sticky", children: [(0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-tabs", children: (0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-tabs__list", children: tabsQuery.isLoading ? ((0, jsx_runtime_1.jsx)("span", { className: "keyword-collection-tabs__placeholder", children: "Tab \u52A0\u8F7D\u4E2D..." })) : tabsQuery.isError ? ((0, jsx_runtime_1.jsx)("span", { className: "keyword-collection-tabs__placeholder", children: "Tab \u52A0\u8F7D\u5931\u8D25" })) : tabs.length === 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "keyword-collection-tabs__placeholder", children: "\u5F53\u524D\u5173\u952E\u8BCD\u6682\u65E0 tab" })) : (tabs.map(function (tab) {
                                                    var _a;
                                                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "keyword-collection-tab-chip ".concat(tab.id === selectedTabId ? "active" : ""), onClick: function () { return setSelectedTabId(tab.id); }, children: (0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-tab-chip__body", children: [(0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-tab-chip__main", children: [(0, jsx_runtime_1.jsx)("span", { children: tab.name }), (0, jsx_runtime_1.jsx)("small", { children: tab.note_count })] }), ((_a = tab.tag_labels) === null || _a === void 0 ? void 0 : _a.length) ? ((0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-tab-chip__tags", children: tab.tag_labels.map(function (label) { return ((0, jsx_runtime_1.jsx)("em", { children: label }, label)); }) })) : null] }) }, tab.id));
                                                })) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-toolbar", children: [(0, jsx_runtime_1.jsxs)("label", { className: "keyword-collection-search", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { size: 15 }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\u641C\u7D22\u6807\u9898\u6216\u6B63\u6587", value: noteSearchInput, onChange: function (event) { return setNoteSearchInput(event.target.value); }, onKeyDown: function (event) {
                                                                return event.key === "Enter" && handleNoteSearch();
                                                            } })] }), (0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-toolbar__group", children: sortOptions.map(function (option) { return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "keyword-collection-filter-chip ".concat(sort === option.value ? "active" : ""), onClick: function () { return setSort(option.value); }, children: option.label }, option.value)); }) }), (0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-toolbar__group", children: noteTypeOptions.map(function (option) { return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "keyword-collection-filter-chip ".concat(noteType === option.value ? "active" : ""), onClick: function () { return setNoteType(option.value); }, children: option.label }, option.value || "all")); }) }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "keyword-collection-analysis-trigger", disabled: !selectedKeywordId || !selectedTabId, onClick: function () { return setShowTagAnalysisModal(true); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, { size: 16 }), (0, jsx_runtime_1.jsx)("span", { children: "Tag\u5206\u6790" })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "keyword-collection-generator-trigger", disabled: !selectedKeywordId || tabs.length === 0, onClick: function () { return setShowTitleGeneratorModal(true); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { size: 16 }), (0, jsx_runtime_1.jsx)("span", { children: "\u6807\u9898\u751F\u6210\u5668" })] }), (0, jsx_runtime_1.jsxs)("label", { className: "keyword-collection-page-size", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u6BCF\u9875" }), (0, jsx_runtime_1.jsx)("select", { value: pageSize, onChange: function (event) { return setPageSize(Number(event.target.value)); }, children: pageSizeOptions.map(function (option) { return ((0, jsx_runtime_1.jsx)("option", { value: option, children: option }, option)); }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-subline", children: [(0, jsx_runtime_1.jsxs)("span", { children: ["\u5F53\u524D\u89C6\u56FE\uFF1A", (0, jsx_runtime_1.jsx)("strong", { children: (selectedKeyword === null || selectedKeyword === void 0 ? void 0 : selectedKeyword.name) || "未选择关键词" }), selectedTab ? " / ".concat(selectedTab.name) : ""] }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u5171 ", total, " \u7BC7\u7B14\u8BB0", (summary === null || summary === void 0 ? void 0 : summary.last_collected_at)
                                                            ? " \u00B7 \u6700\u8FD1\u91C7\u96C6 ".concat(formatDateTime(summary.last_collected_at))
                                                            : ""] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-main-content", children: notesQuery.isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-empty", children: "\u6B63\u5728\u52A0\u8F7D\u7B14\u8BB0..." })) : notesQuery.isError ? ((0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-empty", children: "\u7B14\u8BB0\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5" })) : notes.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-empty", children: "\u5F53\u524D\u5173\u952E\u8BCD\u6216 tab \u4E0B\u8FD8\u6CA1\u6709\u516C\u5171\u7B14\u8BB0\u6570\u636E" })) : ((0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-table-wrap", children: (0, jsx_runtime_1.jsxs)("table", { className: "keyword-collection-table", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "\u6392\u540D" }), (0, jsx_runtime_1.jsx)("th", { children: "\u7B14\u8BB0" }), (0, jsx_runtime_1.jsx)("th", { children: "\u4F5C\u8005" }), (0, jsx_runtime_1.jsx)("th", { children: "\u7C7B\u578B" }), (0, jsx_runtime_1.jsx)("th", { children: "\u53D1\u5E03\u65F6\u95F4" }), (0, jsx_runtime_1.jsx)("th", { children: "\u70B9\u8D5E" }), (0, jsx_runtime_1.jsx)("th", { children: "\u94FE\u63A5" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: notes.map(function (note) { return ((0, jsx_runtime_1.jsx)(KeywordNoteRow, { note: note }, "".concat(note.id, "-").concat(note.rank_no))); }) })] }) })) }), notes.length > 0 && totalPages > 1 && ((0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-pagination", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", disabled: page <= 1, onClick: function () { return setPage(function (prev) { return prev - 1; }); }, children: "\u4E0A\u4E00\u9875" }), (0, jsx_runtime_1.jsxs)("span", { children: [page, " / ", totalPages] }), (0, jsx_runtime_1.jsx)("button", { type: "button", disabled: page >= totalPages, onClick: function () { return setPage(function (prev) { return prev + 1; }); }, children: "\u4E0B\u4E00\u9875" })] }))] }) })] })] }));
}
function TitleGeneratorModal(_a) {
    var _this = this;
    var open = _a.open, keywordId = _a.keywordId, keywordName = _a.keywordName, tabs = _a.tabs, currentTabId = _a.currentTabId, isPending = _a.isPending, result = _a.result, onClose = _a.onClose, onGenerate = _a.onGenerate;
    var _b = (0, react_1.useState)(), selectedTabId = _b[0], setSelectedTabId = _b[1];
    (0, react_1.useEffect)(function () {
        var _a;
        if (!open)
            return;
        if (currentTabId && tabs.some(function (item) { return item.id === currentTabId; })) {
            setSelectedTabId(currentTabId);
            return;
        }
        setSelectedTabId((_a = tabs[0]) === null || _a === void 0 ? void 0 : _a.id);
    }, [open, currentTabId, tabs]);
    var selectedTab = (0, react_1.useMemo)(function () { return tabs.find(function (item) { return item.id === selectedTabId; }); }, [selectedTabId, tabs]);
    var displayedResult = result && result.tab_id === selectedTabId ? result : undefined;
    var copyTitles = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!((_b = displayedResult === null || displayedResult === void 0 ? void 0 : displayedResult.titles) === null || _b === void 0 ? void 0 : _b.length))
                        return [2 /*return*/];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.clipboard.writeText(displayedResult.titles.join("\n"))];
                case 2:
                    _c.sent();
                    sonner_1.toast.success("标题已复制");
                    return [3 /*break*/, 4];
                case 3:
                    _a = _c.sent();
                    sonner_1.toast.error("复制失败，请手动复制");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    if (!open)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-import-modal", children: [(0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-import-modal__backdrop", onClick: onClose }), (0, jsx_runtime_1.jsxs)("section", { className: "keyword-collection-title-generator-dialog", children: [(0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-import-dialog__head", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u6807\u9898\u751F\u6210\u5668" }), (0, jsx_runtime_1.jsx)("p", { children: "\u9ED8\u8BA4\u8BFB\u53D6\u5F53\u524D\u4E8C\u7EA7\u5206\u7C7B\u4E0B\u5168\u90E8\u6807\u9898\u4F5C\u4E3A\u53C2\u8003\uFF0C\u4E0D\u843D\u5E93\uFF0C\u4EC5\u7528\u4E8E\u5F53\u524D\u5F39\u6846\u751F\u6210\u4E0E\u590D\u5236\u3002" })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "keyword-collection-import-dialog__close", onClick: onClose, children: "\u5173\u95ED" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-title-generator__controls", children: [(0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-title-generator__field", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u4E00\u7EA7\u5206\u7C7B" }), (0, jsx_runtime_1.jsx)("strong", { children: keywordName || "未选择关键词" })] }), (0, jsx_runtime_1.jsxs)("label", { className: "keyword-collection-title-generator__select", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u4E8C\u7EA7\u5206\u7C7B" }), (0, jsx_runtime_1.jsx)("select", { value: selectedTabId !== null && selectedTabId !== void 0 ? selectedTabId : "", onChange: function (event) { return setSelectedTabId(Number(event.target.value)); }, children: tabs.map(function (tab) { return ((0, jsx_runtime_1.jsx)("option", { value: tab.id, children: tab.name }, tab.id)); }) })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "keyword-collection-title-generator__submit", disabled: !keywordId || !selectedTabId || isPending, onClick: function () { return selectedTabId && onGenerate(selectedTabId); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { size: 16 }), isPending ? "生成中..." : "生成标题"] })] }), displayedResult ? ((0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-title-generator__result", children: [(0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-title-generator__summary", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("strong", { children: [displayedResult.keyword_name, " / ", displayedResult.tab_name] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\u53C2\u8003\u6807\u9898\u6570\uFF1A", displayedResult.reference_count] })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "keyword-collection-title-generator__copy", onClick: copyTitles, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Copy, { size: 15 }), "\u4E00\u952E\u590D\u5236"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-title-generator__list", children: displayedResult.titles.map(function (title, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-title-generator__item", children: [(0, jsx_runtime_1.jsx)("span", { children: index + 1 }), (0, jsx_runtime_1.jsx)("p", { children: title })] }, "".concat(displayedResult.tab_id, "-").concat(index, "-").concat(title))); }) })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-empty", children: selectedTab
                            ? "\u5F53\u524D\u5C06\u57FA\u4E8E\u300C".concat(selectedTab.name, "\u300D\u4E0B\u5168\u90E8\u6807\u9898\u751F\u6210\u65B0\u6807\u9898")
                            : "请选择二级分类后生成标题" }))] })] }));
}
function TagAnalysisModal(_a) {
    var open = _a.open, onClose = _a.onClose, currentTabId = _a.currentTabId, keywordName = _a.keywordName, tabName = _a.tabName, isLoading = _a.isLoading, isError = _a.isError, data = _a.data;
    var displayedData = data && currentTabId && data.tab_id === currentTabId ? data : undefined;
    var overallAverageLike = (0, react_1.useMemo)(function () {
        var _a;
        var list = (_a = displayedData === null || displayedData === void 0 ? void 0 : displayedData.list) !== null && _a !== void 0 ? _a : [];
        var totalNoteCount = list.reduce(function (sum, item) { return sum + item.note_count; }, 0);
        if (totalNoteCount <= 0)
            return 0;
        var totalLikes = list.reduce(function (sum, item) { return sum + item.average_like_count * item.note_count; }, 0);
        return totalLikes / totalNoteCount;
    }, [displayedData === null || displayedData === void 0 ? void 0 : displayedData.list]);
    var coverageList = (0, react_1.useMemo)(function () {
        var _a;
        return __spreadArray([], ((_a = displayedData === null || displayedData === void 0 ? void 0 : displayedData.list) !== null && _a !== void 0 ? _a : []), true).sort(function (a, b) { return b.coverage_rate - a.coverage_rate || b.average_like_count - a.average_like_count; })
            .slice(0, TAG_ANALYSIS_TOP_N);
    }, [displayedData === null || displayedData === void 0 ? void 0 : displayedData.list]);
    var likeList = (0, react_1.useMemo)(function () {
        var _a;
        return __spreadArray([], ((_a = displayedData === null || displayedData === void 0 ? void 0 : displayedData.list) !== null && _a !== void 0 ? _a : []), true).sort(function (a, b) {
            var scoreDiff = getTagLikeRankingScore(b, overallAverageLike) -
                getTagLikeRankingScore(a, overallAverageLike);
            if (scoreDiff !== 0) {
                return scoreDiff;
            }
            return b.average_like_count - a.average_like_count || b.coverage_rate - a.coverage_rate;
        })
            .slice(0, TAG_ANALYSIS_TOP_N);
    }, [displayedData === null || displayedData === void 0 ? void 0 : displayedData.list, overallAverageLike]);
    if (!open)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-import-modal", children: [(0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-import-modal__backdrop", onClick: onClose }), (0, jsx_runtime_1.jsxs)("section", { className: "keyword-collection-tag-analysis-dialog", children: [(0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-import-dialog__head", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Tag\u5206\u6790" }), (0, jsx_runtime_1.jsxs)("p", { children: [(displayedData === null || displayedData === void 0 ? void 0 : displayedData.keyword_name) || keywordName || "未选择关键词", (displayedData === null || displayedData === void 0 ? void 0 : displayedData.tab_name) || tabName ? " / ".concat((displayedData === null || displayedData === void 0 ? void 0 : displayedData.tab_name) || tabName) : ""] })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "keyword-collection-import-dialog__close", onClick: onClose, children: "\u5173\u95ED" })] }), isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-empty", children: "Tag \u5206\u6790\u52A0\u8F7D\u4E2D..." })) : isError ? ((0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-empty", children: "Tag \u5206\u6790\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5" })) : !displayedData || displayedData.total_notes === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-empty", children: "\u5F53\u524D\u4E8C\u7EA7\u5206\u7C7B\u4E0B\u6682\u65E0\u53EF\u5206\u6790\u7B14\u8BB0" })) : ((0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-tag-analysis", children: [(0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-tag-analysis__stats", children: [(0, jsx_runtime_1.jsxs)("article", { className: "keyword-collection-tag-analysis__stat", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u5F53\u524D\u7B14\u8BB0\u6570" }), (0, jsx_runtime_1.jsx)("strong", { children: displayedData.total_notes })] }), (0, jsx_runtime_1.jsxs)("article", { className: "keyword-collection-tag-analysis__stat", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u542B\u6807\u7B7E\u7B14\u8BB0" }), (0, jsx_runtime_1.jsx)("strong", { children: displayedData.tagged_notes })] }), (0, jsx_runtime_1.jsxs)("article", { className: "keyword-collection-tag-analysis__stat", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u552F\u4E00\u6807\u7B7E\u6570" }), (0, jsx_runtime_1.jsx)("strong", { children: displayedData.unique_tag_count })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-tag-analysis__charts", children: [(0, jsx_runtime_1.jsx)(TagMetricChart, { title: "\u8986\u76D6\u7387 Top ".concat(TAG_ANALYSIS_TOP_N), subtitle: "\u8BE5 tag \u5728\u5F53\u524D\u4E8C\u7EA7\u5206\u7C7B\u7B14\u8BB0\u4E2D\u7684\u51FA\u73B0\u6982\u7387", items: coverageList, metricKey: "coverage_rate", valueFormatter: function (value) { return "".concat(value.toFixed(1), "%"); } }), (0, jsx_runtime_1.jsx)(TagMetricChart, { title: "\u5E73\u5747\u70B9\u8D5E\u6570 Top ".concat(TAG_ANALYSIS_TOP_N), subtitle: "\u6309\u6837\u672C\u91CF\u4FEE\u6B63\u6392\u5E8F\uFF0C\u5C55\u793A\u503C\u4ECD\u4E3A\u771F\u5B9E\u5E73\u5747\u70B9\u8D5E\u6570", items: likeList, metricKey: "average_like_count", valueFormatter: function (value) { return formatLikeCount(value); } })] })] }))] })] }));
}
function TagMetricChart(_a) {
    var title = _a.title, subtitle = _a.subtitle, items = _a.items, metricKey = _a.metricKey, valueFormatter = _a.valueFormatter;
    var maxValue = Math.max.apply(Math, __spreadArray(__spreadArray([], items.map(function (item) { return item[metricKey]; }), false), [0], false));
    return ((0, jsx_runtime_1.jsxs)("section", { className: "keyword-collection-tag-chart", children: [(0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-tag-chart__head", children: [(0, jsx_runtime_1.jsx)("strong", { children: title }), (0, jsx_runtime_1.jsx)("span", { children: subtitle })] }), items.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-tag-chart__empty", children: "\u6682\u65E0\u6807\u7B7E\u6570\u636E" })) : ((0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-tag-chart__body", children: items.map(function (item) {
                    var value = item[metricKey];
                    var width = maxValue > 0 ? "".concat((value / maxValue) * 100, "%") : "0%";
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-tag-chart__row", children: [(0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-tag-chart__meta", children: [(0, jsx_runtime_1.jsxs)("strong", { children: ["#", item.tag] }), (0, jsx_runtime_1.jsxs)("span", { children: [item.note_count, "\u7BC7"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-tag-chart__bar", children: (0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-tag-chart__fill", style: { width: width } }) }), (0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-tag-chart__value", children: valueFormatter(value) })] }, "".concat(metricKey, "-").concat(item.tag)));
                }) }))] }));
}
function KeywordListItem(_a) {
    var item = _a.item, active = _a.active, onClick = _a.onClick;
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", className: "keyword-collection-keyword-item ".concat(active ? "active" : ""), onClick: onClick, children: [(0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-keyword-item__head", children: [(0, jsx_runtime_1.jsx)("strong", { children: item.name }), (0, jsx_runtime_1.jsx)("span", { children: item.note_count })] }), (0, jsx_runtime_1.jsxs)("p", { children: [item.tab_count, " \u4E2A tab"] }), (0, jsx_runtime_1.jsx)("small", { children: item.last_collected_at
                    ? formatDateTime(item.last_collected_at)
                    : "暂无采集记录" })] }));
}
function KeywordNoteRow(_a) {
    var _b, _c, _d, _e, _f;
    var note = _a.note;
    var _g = (0, react_1.useState)(false), showPreview = _g[0], setShowPreview = _g[1];
    var cover = note.cover_url_oss || note.cover_url || ((_b = note.images) === null || _b === void 0 ? void 0 : _b[0]);
    var noteTypeLabel = note.note_type === "video" ? "视频" : "图文";
    var tags = (_d = (_c = note.tags) === null || _c === void 0 ? void 0 : _c.filter(Boolean)) !== null && _d !== void 0 ? _d : [];
    var coverOCR = (_e = note.cover_ocr) === null || _e === void 0 ? void 0 : _e.trim();
    var noteTitle = ((_f = note.title) === null || _f === void 0 ? void 0 : _f.trim()) || "无标题";
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsxs)("td", { className: "keyword-collection-table__rank", children: ["#", note.rank_no || "-"] }), (0, jsx_runtime_1.jsx)("td", { className: "keyword-collection-table__note", children: (0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-note-cell", children: [(0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-note-cell__cover", children: cover ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", className: "keyword-collection-note-cell__cover-button", onClick: function () { return setShowPreview(true); }, "aria-label": "\u653E\u5927\u67E5\u770B\u5C01\u9762 ".concat(noteTitle), children: [(0, jsx_runtime_1.jsx)("img", { src: cover, alt: noteTitle, loading: "lazy" }), (0, jsx_runtime_1.jsx)("span", { className: "keyword-collection-note-cell__cover-mask", children: "\u70B9\u51FB\u653E\u5927" })] })) : ((0, jsx_runtime_1.jsx)("span", { children: "\u65E0\u56FE" })) }), (0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-note-cell__content", children: [(0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-note-cell__title-row", children: [(0, jsx_runtime_1.jsx)("a", { className: "keyword-collection-note-cell__title", href: note.note_url, target: "_blank", rel: "noopener noreferrer", children: noteTitle }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "keyword-collection-note-cell__copy-action", onClick: function () { return copyTextToClipboard(noteTitle, "标题已复制", "复制标题失败，请手动复制"); }, "aria-label": "\u590D\u5236\u6807\u9898 ".concat(noteTitle), children: (0, jsx_runtime_1.jsx)(lucide_react_1.Copy, { size: 14 }) })] }), tags.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-note-cell__tags", children: tags.map(function (tag) { return ((0, jsx_runtime_1.jsxs)("span", { children: ["#", tag] }, tag)); }) })) : null, note.content ? ((0, jsx_runtime_1.jsx)("p", { className: "keyword-collection-note-cell__desc", children: note.content })) : ((0, jsx_runtime_1.jsx)("p", { className: "keyword-collection-note-cell__desc keyword-collection-note-cell__desc--empty", children: "\u6682\u65E0\u6B63\u6587" })), coverOCR ? ((0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-note-cell__ocr", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "keyword-collection-note-cell__copy-action keyword-collection-note-cell__copy-action--ocr", onClick: function () {
                                                        return copyTextToClipboard(coverOCR, "封面 OCR 已复制", "复制 OCR 失败，请手动复制");
                                                    }, "aria-label": "\u590D\u5236 OCR ".concat(noteTitle), children: (0, jsx_runtime_1.jsx)(lucide_react_1.Copy, { size: 14 }) }), (0, jsx_runtime_1.jsx)("strong", { children: "\u5C01\u9762 OCR" }), (0, jsx_runtime_1.jsx)("p", { children: coverOCR })] })) : null] })] }) }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-author-cell", children: [note.author_avatar ? ((0, jsx_runtime_1.jsx)("img", { src: note.author_avatar, alt: note.author_name || "author" })) : ((0, jsx_runtime_1.jsx)("span", {})), (0, jsx_runtime_1.jsx)("strong", { children: note.author_name || "未知作者" })] }) }), (0, jsx_runtime_1.jsx)("td", { children: noteTypeLabel }), (0, jsx_runtime_1.jsx)("td", { children: note.publish_time || "-" }), (0, jsx_runtime_1.jsx)("td", { className: "keyword-collection-table__metric", children: note.like_count || "-" }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("a", { className: "keyword-collection-table__link", href: note.note_url, target: "_blank", rel: "noopener noreferrer", "aria-label": "\u6253\u5F00\u7B14\u8BB0 ".concat(note.title || note.note_id), children: (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, { size: 14 }) }) })] }), showPreview && cover ? ((0, jsx_runtime_1.jsx)(ImagePreviewModal, { imageUrl: cover, title: noteTitle, onClose: function () { return setShowPreview(false); } })) : null] }));
}
function ImagePreviewModal(_a) {
    var imageUrl = _a.imageUrl, title = _a.title, onClose = _a.onClose;
    return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-image-preview", role: "dialog", "aria-modal": "true", children: [(0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-image-preview__backdrop", onClick: onClose }), (0, jsx_runtime_1.jsxs)("div", { className: "keyword-collection-image-preview__dialog", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "keyword-collection-image-preview__close", onClick: onClose, "aria-label": "\u5173\u95ED\u5C01\u9762\u9884\u89C8", children: "\u5173\u95ED" }), (0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: title })] })] }), document.body);
}
function SidebarMessage(_a) {
    var text = _a.text;
    return (0, jsx_runtime_1.jsx)("div", { className: "keyword-collection-sidebar__empty", children: text });
}
function formatDateTime(value) {
    if (!value)
        return "暂无";
    var date = new Date(value);
    if (Number.isNaN(date.getTime()))
        return value;
    return "".concat(date.getMonth() + 1, "-").concat(date.getDate(), " ").concat(String(date.getHours()).padStart(2, "0"), ":").concat(String(date.getMinutes()).padStart(2, "0"));
}
function formatLikeCount(value) {
    if (value >= 10000) {
        return "".concat((value / 10000).toFixed(value >= 100000 ? 0 : 1), "\u4E07");
    }
    return "".concat(Math.round(value));
}
function copyTextToClipboard(text_1) {
    return __awaiter(this, arguments, void 0, function (text, successMessage, errorMessage) {
        var _a;
        if (successMessage === void 0) { successMessage = "已复制"; }
        if (errorMessage === void 0) { errorMessage = "复制失败，请手动复制"; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.clipboard.writeText(text)];
                case 1:
                    _b.sent();
                    sonner_1.toast.success(successMessage);
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    sonner_1.toast.error(errorMessage);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getTagLikeRankingScore(item, overallAverageLike) {
    var noteCount = Math.max(item.note_count, 0);
    return ((item.average_like_count * noteCount +
        overallAverageLike * TAG_ANALYSIS_LIKE_SMOOTHING) /
        (noteCount + TAG_ANALYSIS_LIKE_SMOOTHING));
}
