"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ScoringHeight;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
function ScoringHeight(props) {
    const heights = [
        { label: "Level 4", value: "level4", piece: "coral" },
        { label: "Level 3", value: "level3", piece: "coral" },
        { label: "Level 2", value: "level2", piece: "coral" },
        { label: "Level 1", value: "level1", piece: "coral" },
        { label: "Net", value: "level4", piece: "algae" },
        { label: "⬆️ Reef", value: "level3", piece: "algae" },
        { label: "⬇️ Reef", value: "level2", piece: "algae" },
        { label: "Proc", value: "level1", piece: "algae" },
    ];
    const handleChange = (event, nextLevel) => {
        if (nextLevel) {
            props.setHeight(nextLevel);
        }
    };
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
            width: 350,
            height: 500,
        }, children: (0, jsx_runtime_1.jsx)(material_1.ToggleButtonGroup, { orientation: "vertical", value: props.height, exclusive: true, onChange: handleChange, children: heights
                .filter((entry) => entry.piece == props.gamepiece)
                .map((entry) => ((0, jsx_runtime_1.jsx)(material_1.ToggleButton, { value: entry.value, sx: { width: 350, borderWidth: 2, height: 150, border: "solid" }, color: "error", children: (0, jsx_runtime_1.jsx)(material_1.Typography, { fontSize: 80, sx: { my: 2, textWrap: "nowrap" }, children: entry.label }) }, entry.value))) }) }));
}
//# sourceMappingURL=ScoringHeight.js.map