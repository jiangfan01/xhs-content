"use strict";
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
exports.default = CollectionPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var useCollection_1 = require("~/hooks/useCollection");
require("./collection.css");
function CollectionPage() {
    var _a, _b;
    var _c = (0, react_1.useState)(1), page = _c[0], setPage = _c[1];
    var _d = (0, react_1.useState)(""), keyword = _d[0], setKeyword = _d[1];
    var _e = (0, react_1.useState)(""), searchInput = _e[0], setSearchInput = _e[1];
    var _f = (0, react_1.useState)(), noteType = _f[0], setNoteType = _f[1];
    var _g = (0, react_1.useState)(new Set()), selected = _g[0], setSelected = _g[1];
    var pageSize = 20;
    var _h = (0, useCollection_1.useNoteList)({ page: page, pageSize: pageSize, keyword: keyword, noteType: noteType }), data = _h.data, isLoading = _h.isLoading, isError = _h.isError;
    var deleteMutation = (0, useCollection_1.useDeleteNotes)();
    var notes = (_a = data === null || data === void 0 ? void 0 : data.list) !== null && _a !== void 0 ? _a : [];
    var total = (_b = data === null || data === void 0 ? void 0 : data.total) !== null && _b !== void 0 ? _b : 0;
    var totalPages = Math.ceil(total / pageSize);
    var handleSearch = function () {
        setKeyword(searchInput.trim());
        setPage(1);
    };
    var toggleSelect = function (id) {
        setSelected(function (prev) {
            var next = new Set(prev);
            if (next.has(id))
                next.delete(id);
            else
                next.add(id);
            return next;
        });
    };
    var toggleSelectAll = function () {
        if (selected.size === notes.length) {
            setSelected(new Set());
        }
        else {
            setSelected(new Set(notes.map(function (n) { return n.id; })));
        }
    };
    var handleDelete = function () {
        if (selected.size === 0)
            return;
        deleteMutation.mutate(__spreadArray([], selected, true), {
            onSuccess: function () { return setSelected(new Set()); },
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "collection-page", children: [(0, jsx_runtime_1.jsx)("div", { className: "collection-header", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "\u7B14\u8BB0\u91C7\u96C6" }), (0, jsx_runtime_1.jsxs)("p", { children: ["\u4ECE\u5C0F\u7EA2\u4E66\u91C7\u96C6\u7684\u7B14\u8BB0\u5185\u5BB9\uFF0C\u5171 ", total, " \u7BC7"] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "collection-toolbar", children: [(0, jsx_runtime_1.jsxs)("div", { className: "collection-search", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { size: 16, className: "collection-search__icon" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\u641C\u7D22\u6807\u9898\u6216\u5185\u5BB9...", value: searchInput, onChange: function (e) { return setSearchInput(e.target.value); }, onKeyDown: function (e) { return e.key === "Enter" && handleSearch(); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "collection-filters", children: [(0, jsx_runtime_1.jsx)("button", { className: "collection-filter-btn ".concat(noteType === undefined ? "active" : ""), onClick: function () { setNoteType(undefined); setPage(1); }, children: "\u5168\u90E8" }), (0, jsx_runtime_1.jsxs)("button", { className: "collection-filter-btn ".concat(noteType === "image" ? "active" : ""), onClick: function () { setNoteType("image"); setPage(1); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Image, { size: 14 }), "\u56FE\u6587"] }), (0, jsx_runtime_1.jsxs)("button", { className: "collection-filter-btn ".concat(noteType === "video" ? "active" : ""), onClick: function () { setNoteType("video"); setPage(1); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Video, { size: 14 }), "\u89C6\u9891"] })] }), selected.size > 0 && ((0, jsx_runtime_1.jsxs)("button", { className: "collection-delete-btn", onClick: handleDelete, disabled: deleteMutation.isPending, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { size: 15 }), "\u5220\u9664 ", selected.size, " \u9879"] }))] }), isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "collection-loading", children: (0, jsx_runtime_1.jsx)("div", { className: "collection-spinner" }) })) : isError ? ((0, jsx_runtime_1.jsx)("div", { className: "collection-empty", children: (0, jsx_runtime_1.jsx)("p", { children: "\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5" }) })) : notes.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "collection-empty", children: [(0, jsx_runtime_1.jsx)("div", { className: "collection-empty__icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Library, { size: 28 }) }), (0, jsx_runtime_1.jsx)("h3", { children: "\u6682\u65E0\u91C7\u96C6\u5185\u5BB9" }), (0, jsx_runtime_1.jsx)("p", { children: "\u4F7F\u7528\u6D4F\u89C8\u5668\u63D2\u4EF6\u91C7\u96C6\u5C0F\u7EA2\u4E66\u7B14\u8BB0\u540E\uFF0C\u5185\u5BB9\u5C06\u663E\u793A\u5728\u8FD9\u91CC" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "collection-list-header", children: (0, jsx_runtime_1.jsxs)("label", { className: "collection-checkbox-wrap", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: notes.length > 0 && selected.size === notes.length, onChange: toggleSelectAll }), "\u5168\u9009"] }) }), (0, jsx_runtime_1.jsx)("div", { className: "collection-grid", children: notes.map(function (note) { return ((0, jsx_runtime_1.jsx)(NoteCard, { note: note, isSelected: selected.has(note.id), onToggle: function () { return toggleSelect(note.id); } }, note.id)); }) }), totalPages > 1 && ((0, jsx_runtime_1.jsxs)("div", { className: "collection-pagination", children: [(0, jsx_runtime_1.jsx)("button", { disabled: page <= 1, onClick: function () { return setPage(page - 1); }, children: "\u4E0A\u4E00\u9875" }), (0, jsx_runtime_1.jsxs)("span", { children: [page, " / ", totalPages] }), (0, jsx_runtime_1.jsx)("button", { disabled: page >= totalPages, onClick: function () { return setPage(page + 1); }, children: "\u4E0B\u4E00\u9875" })] }))] }))] }));
}
function NoteCard(_a) {
    var note = _a.note, isSelected = _a.isSelected, onToggle = _a.onToggle;
    return ((0, jsx_runtime_1.jsxs)("article", { className: "note-card ".concat(isSelected ? "note-card--selected" : ""), children: [(0, jsx_runtime_1.jsx)("div", { className: "note-card__select", children: (0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: isSelected, onChange: onToggle }) }), note.cover_url && ((0, jsx_runtime_1.jsxs)("div", { className: "note-card__cover", children: [(0, jsx_runtime_1.jsx)("img", { src: note.cover_url, alt: note.title, loading: "lazy" }), (0, jsx_runtime_1.jsxs)("span", { className: "note-card__type", children: [note.note_type === "video" ? (0, jsx_runtime_1.jsx)(lucide_react_1.Video, { size: 12 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Image, { size: 12 }), note.note_type === "video" ? "视频" : "图文"] })] })), (0, jsx_runtime_1.jsxs)("div", { className: "note-card__body", children: [(0, jsx_runtime_1.jsx)("h3", { className: "note-card__title", children: (0, jsx_runtime_1.jsxs)("a", { href: note.note_url, target: "_blank", rel: "noopener noreferrer", children: [note.title || "无标题", (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, { size: 13 })] }) }), note.content && ((0, jsx_runtime_1.jsx)("p", { className: "note-card__content", children: note.content })), (0, jsx_runtime_1.jsxs)("div", { className: "note-card__author", children: [note.author_avatar ? ((0, jsx_runtime_1.jsx)("img", { src: note.author_avatar, alt: note.author_name })) : ((0, jsx_runtime_1.jsx)("span", { className: "note-card__avatar-placeholder" })), (0, jsx_runtime_1.jsx)("span", { children: note.author_name || "未知作者" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "note-card__stats", children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { size: 13 }), " ", note.like_count] }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { size: 13 }), " ", note.collect_count] }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MessageCircle, { size: 13 }), " ", note.comment_count] })] }), note.tags && note.tags.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "note-card__tags", children: note.tags.slice(0, 5).map(function (tag) { return ((0, jsx_runtime_1.jsxs)("span", { className: "note-card__tag", children: ["#", tag] }, tag)); }) })), (0, jsx_runtime_1.jsxs)("div", { className: "note-card__time", children: ["\u91C7\u96C6\u4E8E ", new Date(note.collected_at).toLocaleDateString("zh-CN")] })] })] }));
}
