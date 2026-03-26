"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSendCode = useSendCode;
exports.usePhoneLogin = usePhoneLogin;
var react_query_1 = require("@tanstack/react-query");
var auth_1 = require("~/api/auth");
var sonner_1 = require("sonner");
function useSendCode() {
    return (0, react_query_1.useMutation)({
        mutationFn: function (phone) { return (0, auth_1.sendPhoneCode)(phone); },
        onSuccess: function () {
            sonner_1.toast.success("验证码已发送");
        },
        onError: function (error) {
            sonner_1.toast.error(error.message || "发送验证码失败");
        },
    });
}
function usePhoneLogin() {
    return (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var phone = _a.phone, code = _a.code;
            return (0, auth_1.phoneLogin)(phone, code);
        },
        onError: function (error) {
            sonner_1.toast.error(error.message || "登录失败，请重试");
        },
    });
}
