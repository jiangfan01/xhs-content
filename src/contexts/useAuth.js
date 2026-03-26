"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = useAuth;
var react_1 = require("react");
var auth_context_1 = require("./auth-context");
function useAuth() {
    var ctx = (0, react_1.useContext)(auth_context_1.AuthContext);
    if (!ctx) {
        throw new Error("useAuth 必须在 AuthProvider 内使用");
    }
    return ctx;
}
