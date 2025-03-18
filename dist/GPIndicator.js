"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GPIndicator;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = require("@frc-web-components/react");
function GPIndicator(props) {
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
            p: 0,
            m: 0,
        }, children: (0, jsx_runtime_1.jsxs)(material_1.Stack, { direction: "row", textAlign: "right", children: [(0, jsx_runtime_1.jsxs)(material_1.Typography, { variant: "h4", component: "h1", textAlign: "center", sx: { m: 0, pt: 3, width: 160 }, children: ["Has ", props.name] }), (0, jsx_runtime_1.jsx)(react_1.BooleanBox, { value: props.value })] }) }));
}
//# sourceMappingURL=GPIndicator.js.map