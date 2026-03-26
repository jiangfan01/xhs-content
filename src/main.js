"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var client_1 = require("react-dom/client");
var next_themes_1 = require("next-themes");
var react_router_dom_1 = require("react-router-dom");
var react_query_1 = require("@tanstack/react-query");
var sonner_1 = require("sonner");
var AuthContext_1 = require("~/contexts/AuthContext");
require("./index.css");
var App_tsx_1 = require("./App.tsx");
var queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});
(0, client_1.createRoot)(document.getElementById("root")).render((0, jsx_runtime_1.jsx)(react_1.StrictMode, { children: (0, jsx_runtime_1.jsx)(next_themes_1.ThemeProvider, { attribute: "class", defaultTheme: "system", enableSystem: true, children: (0, jsx_runtime_1.jsx)(react_query_1.QueryClientProvider, { client: queryClient, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)(AuthContext_1.AuthProvider, { children: [(0, jsx_runtime_1.jsx)(App_tsx_1.default, {}), (0, jsx_runtime_1.jsx)(sonner_1.Toaster, { position: "top-center", richColors: true })] }) }) }) }) }));
