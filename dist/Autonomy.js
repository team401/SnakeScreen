"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Autonomy;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
function Autonomy(props) {
    const modes = [
        { value: "high", label: "Full Auto" },
        { value: "mid", label: "Teleop" },
        { value: "low", label: "Manual" },
    ];
    const handleChange = (event, nextMode) => {
        if (nextMode) {
            props.setAutonomy(nextMode);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
            height: 290,
            width: 200,
            position: "absolute",
            right: 5,
            bottom: 1,
            m: 0,
            p: 0,
        }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h4", component: "h1", textAlign: "center", sx: { m: 0 }, children: "Autonomy" }), (0, jsx_runtime_1.jsx)(material_1.ToggleButtonGroup, { orientation: "vertical", value: props.autonomy, exclusive: true, onChange: handleChange, sx: { p: 0, m: 0 }, children: modes.map((mode) => ((0, jsx_runtime_1.jsx)(material_1.ToggleButton, { value: mode.value, sx: { width: 200, height: 80, borderWidth: 2, border: "solid" }, color: "error", children: (0, jsx_runtime_1.jsx)(material_1.Typography, { fontSize: 70, sx: { px: 1, width: 200, textWrap: "nowrap" }, children: mode.label }) }, mode.value))) })] }));
}
//# sourceMappingURL=Autonomy.js.map