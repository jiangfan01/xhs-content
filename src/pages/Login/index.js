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
exports.default = LoginPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var useLogin_1 = require("~/hooks/useLogin");
var useAuth_1 = require("~/contexts/useAuth");
require("./login.css");
function LoginPage() {
    var _this = this;
    var _a = (0, react_1.useState)(""), phone = _a[0], setPhone = _a[1];
    var _b = (0, react_1.useState)(""), code = _b[0], setCode = _b[1];
    var _c = (0, react_1.useState)(0), countdown = _c[0], setCountdown = _c[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _d = (0, useAuth_1.useAuth)(), isAuthenticated = _d.isAuthenticated, onLoginSuccess = _d.onLoginSuccess;
    var sendCodeMutation = (0, useLogin_1.useSendCode)();
    var loginMutation = (0, useLogin_1.usePhoneLogin)();
    (0, react_1.useEffect)(function () {
        if (isAuthenticated)
            navigate("/workspace", { replace: true });
    }, [isAuthenticated, navigate]);
    (0, react_1.useEffect)(function () {
        if (countdown <= 0)
            return;
        var timer = setInterval(function () {
            setCountdown(function (prev) { return prev - 1; });
        }, 1000);
        return function () { return clearInterval(timer); };
    }, [countdown]);
    var isPhoneValid = /^1\d{10}$/.test(phone);
    var handleSendCode = (0, react_1.useCallback)(function () {
        if (countdown > 0 || !isPhoneValid)
            return;
        sendCodeMutation.mutate(phone, {
            onSuccess: function () { return setCountdown(60); },
        });
    }, [countdown, isPhoneValid, phone, sendCodeMutation]);
    var handleLogin = (0, react_1.useCallback)(function () {
        if (!isPhoneValid || !code.trim()) {
            sonner_1.toast.error("请输入正确的手机号和验证码");
            return;
        }
        loginMutation.mutate({ phone: phone, code: code }, {
            onSuccess: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, onLoginSuccess()];
                        case 1:
                            _a.sent();
                            sonner_1.toast.success("登录成功");
                            navigate("/workspace", { replace: true });
                            return [2 /*return*/];
                    }
                });
            }); },
        });
    }, [code, isPhoneValid, loginMutation, navigate, onLoginSuccess, phone]);
    return ((0, jsx_runtime_1.jsxs)("main", { className: "xhs-login", children: [(0, jsx_runtime_1.jsx)("div", { className: "xhs-login__orb xhs-login__orb--left" }), (0, jsx_runtime_1.jsx)("div", { className: "xhs-login__orb xhs-login__orb--right" }), (0, jsx_runtime_1.jsxs)("div", { className: "xhs-login__shell", children: [(0, jsx_runtime_1.jsxs)("section", { className: "xhs-login__brand-panel", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", className: "xhs-login__brand-back", children: "\u8FD4\u56DE\u9996\u9875" }), (0, jsx_runtime_1.jsx)("div", { className: "xhs-login__brand-mark", children: "C" }), (0, jsx_runtime_1.jsxs)("span", { className: "xhs-login__kicker", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { size: 14 }), "Content Engine"] }), (0, jsx_runtime_1.jsx)("h1", { children: "\u5C0F\u7EA2\u4E66\u91C7\u96C6\u4E0E\u7B14\u8BB0\u751F\u6210\u5DE5\u4F5C\u53F0" }), (0, jsx_runtime_1.jsx)("p", { children: "\u5148\u5EFA\u7ACB\u9879\u76EE\u91C7\u96C6\u6C60\uFF0C\u518D\u7528\u7D20\u6750\u548C\u7B56\u7565\u9A71\u52A8 AI \u751F\u6210\uFF0C\u8BA9\u5185\u5BB9\u751F\u4EA7\u4ECE\u201C\u4E34\u65F6\u5199\u4E00\u7BC7\u201D\u5347\u7EA7\u6210\u201C\u53EF\u6301\u7EED\u8DD1\u8D77\u6765\u201D\u3002" }), (0, jsx_runtime_1.jsxs)("div", { className: "xhs-login__feature-list", children: [(0, jsx_runtime_1.jsxs)("div", { className: "xhs-login__feature-item", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.DatabaseZap, { size: 16 }), (0, jsx_runtime_1.jsx)("span", { children: "\u6309\u9879\u76EE\u6C89\u6DC0\u53C2\u8003\u7B14\u8BB0\u4E0E\u8BC4\u8BBA\u4FE1\u53F7" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "xhs-login__feature-item", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { size: 16 }), (0, jsx_runtime_1.jsx)("span", { children: "\u6279\u91CF\u751F\u6210\u7B14\u8BB0\u5E76\u8FFD\u8E2A\u5931\u8D25\u4EFB\u52A1" })] })] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "xhs-login__form-panel", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u6B22\u8FCE\u767B\u5F55" }), (0, jsx_runtime_1.jsx)("p", { className: "xhs-login__subtitle", children: "\u65B0\u624B\u673A\u53F7\u5C06\u81EA\u52A8\u6CE8\u518C\u8D26\u53F7" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "xhs-login__fields", children: [(0, jsx_runtime_1.jsxs)("label", { className: "xhs-login__label", children: ["\u624B\u673A\u53F7", (0, jsx_runtime_1.jsxs)("div", { className: "xhs-login__input-wrap", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Phone, { size: 18 }), (0, jsx_runtime_1.jsx)("input", { type: "tel", maxLength: 11, value: phone, onChange: function (e) { return setPhone(e.target.value.replace(/\D/g, "")); }, placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7" })] })] }), (0, jsx_runtime_1.jsxs)("label", { className: "xhs-login__label", children: ["\u9A8C\u8BC1\u7801", (0, jsx_runtime_1.jsxs)("div", { className: "xhs-login__input-wrap xhs-login__input-wrap--code", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { size: 18 }), (0, jsx_runtime_1.jsx)("input", { type: "text", maxLength: 6, value: code, onChange: function (e) { return setCode(e.target.value.replace(/\D/g, "")); }, onKeyDown: function (e) { return e.key === "Enter" && handleLogin(); }, placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801" }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: handleSendCode, disabled: !isPhoneValid || countdown > 0 || sendCodeMutation.isPending, className: "xhs-login__code-button", children: countdown > 0 ? "".concat(countdown, "s") : sendCodeMutation.isPending ? "发送中..." : "获取验证码" })] })] })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: handleLogin, disabled: !isPhoneValid || !code.trim() || loginMutation.isPending, className: "xhs-login__submit", children: loginMutation.isPending ? ("登录中...") : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["\u767B\u5F55\u5E76\u8FDB\u5165\u5DE5\u4F5C\u53F0", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 17 })] })) }), (0, jsx_runtime_1.jsxs)("div", { className: "xhs-login__footer", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u9996\u6B21\u767B\u5F55\u81EA\u52A8\u521B\u5EFA\u8D26\u53F7" }), (0, jsx_runtime_1.jsx)("span", { children: "\u9A8C\u8BC1\u7801\u767B\u5F55\u66F4\u9002\u5408\u5185\u90E8\u56E2\u961F\u5FEB\u901F\u4F7F\u7528" })] })] })] })] }));
}
