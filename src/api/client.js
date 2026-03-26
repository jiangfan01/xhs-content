"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var auth_1 = require("~/utils/auth");
var apiClient = axios_1.default.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
    timeout: 15000,
});
apiClient.interceptors.request.use(function (config) {
    var token = (0, auth_1.getAuthToken)();
    if (token) {
        config.headers["x-token"] = token;
    }
    return config;
});
exports.default = apiClient;
