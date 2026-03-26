"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistToken = persistToken;
exports.clearAuthData = clearAuthData;
exports.isLoggedIn = isLoggedIn;
exports.getAuthToken = getAuthToken;
var js_cookie_1 = require("js-cookie");
var STORAGE_KEYS = {
    TOKEN: "token",
    TOKEN_EXPIRES: "token-expires",
    XTOKEN: "x-token",
};
/**
 * 持久化 token 到 Cookie + localStorage
 */
function persistToken(token, expiresAt) {
    var expiresAtMs = expiresAt < 10000000000 ? expiresAt * 1000 : expiresAt;
    var hostname = window.location.hostname;
    var domain = hostname.includes("100.city") ? ".100.city" : undefined;
    var cookieOptions = {
        expires: new Date(expiresAtMs),
        path: "/",
        domain: domain,
        secure: window.location.protocol === "https:",
        sameSite: "Lax",
    };
    js_cookie_1.default.set(STORAGE_KEYS.TOKEN, token, cookieOptions);
    js_cookie_1.default.set(STORAGE_KEYS.XTOKEN, token, cookieOptions);
    localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRES, expiresAtMs.toString());
}
/**
 * 清除所有认证数据
 */
function clearAuthData() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRES);
    localStorage.removeItem("user-basic-info");
    var cookieNames = [STORAGE_KEYS.TOKEN, STORAGE_KEYS.XTOKEN];
    var domains = [window.location.hostname, ".".concat(window.location.hostname), undefined];
    cookieNames.forEach(function (name) {
        domains.forEach(function (domain) {
            js_cookie_1.default.remove(name, { path: "/", domain: domain });
        });
        js_cookie_1.default.remove(name);
    });
}
/**
 * 判断是否已登录（token 存在且未过期）
 */
function isLoggedIn() {
    var token = js_cookie_1.default.get(STORAGE_KEYS.TOKEN);
    var tokenExpires = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRES);
    if (!token || !tokenExpires)
        return false;
    return parseInt(tokenExpires) > Date.now();
}
/**
 * 获取当前 token
 */
function getAuthToken() {
    return js_cookie_1.default.get(STORAGE_KEYS.TOKEN) || null;
}
