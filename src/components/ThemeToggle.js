"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ThemeToggle;
var jsx_runtime_1 = require("react/jsx-runtime");
var next_themes_1 = require("next-themes");
function ThemeToggle() {
    var _a = (0, next_themes_1.useTheme)(), theme = _a.theme, setTheme = _a.setTheme, resolvedTheme = _a.resolvedTheme;
    var isDark = resolvedTheme === "dark";
    var cycleTheme = function () {
        if (theme === "system")
            setTheme("light");
        else if (theme === "light")
            setTheme("dark");
        else
            setTheme("system");
    };
    return ((0, jsx_runtime_1.jsx)("button", { onClick: cycleTheme, className: "w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] cursor-pointer\r\n        bg-[var(--interactive-default)] hover:bg-[var(--interactive-hover)]\r\n        text-[var(--icon-default)] transition-colors border border-[var(--border-light)]", title: "\u5F53\u524D: ".concat(theme, " \u2014 \u70B9\u51FB\u5207\u6362"), children: theme === "system" ? ((0, jsx_runtime_1.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2" }), (0, jsx_runtime_1.jsx)("path", { d: "M8 21h8" }), (0, jsx_runtime_1.jsx)("path", { d: "M12 17v4" })] })) : isDark ? ((0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: (0, jsx_runtime_1.jsx)("path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }) })) : ((0, jsx_runtime_1.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "4" }), (0, jsx_runtime_1.jsx)("path", { d: "M12 2v2" }), (0, jsx_runtime_1.jsx)("path", { d: "M12 20v2" }), (0, jsx_runtime_1.jsx)("path", { d: "m4.93 4.93 1.41 1.41" }), (0, jsx_runtime_1.jsx)("path", { d: "m17.66 17.66 1.41 1.41" }), (0, jsx_runtime_1.jsx)("path", { d: "M2 12h2" }), (0, jsx_runtime_1.jsx)("path", { d: "M20 12h2" }), (0, jsx_runtime_1.jsx)("path", { d: "m6.34 17.66-1.41 1.41" }), (0, jsx_runtime_1.jsx)("path", { d: "m19.07 4.93-1.41 1.41" })] })) }));
}
