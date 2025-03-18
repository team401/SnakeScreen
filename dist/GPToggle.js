"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GPToggle;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
function GPToggle(props) {
    const handleGP = (event, nextGP) => {
        if (nextGP) {
            props.setGP(nextGP);
            props.setScoreHeight("level1");
            props.setReefTarget(-1);
        }
    };
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
            height: 120,
            width: 350,
            p: 0,
            m: 0,
        }, children: (0, jsx_runtime_1.jsxs)(material_1.ToggleButtonGroup, { orientation: "vertical", value: props.gamepiece, exclusive: true, onChange: handleGP, sx: { p: 0, m: 0 }, children: [(0, jsx_runtime_1.jsx)(material_1.ToggleButton, { value: "coral", sx: {
                        my: 0,
                        borderWidth: 2,
                        border: "solid",
                        height: 100,
                        width: 350,
                    }, color: "error", children: (0, jsx_runtime_1.jsx)(material_1.Typography, { fontSize: 100, sx: { px: 1, textWrap: "nowrap" }, children: "CORAL" }) }), (0, jsx_runtime_1.jsx)(material_1.ToggleButton, { value: "algae", sx: {
                        my: 8,
                        borderWidth: 2,
                        border: "solid",
                        height: 100,
                        width: 350,
                    }, color: "error", children: (0, jsx_runtime_1.jsx)(material_1.Typography, { fontSize: 100, sx: { px: 1, textWrap: "nowrap" }, children: "ALGAE" }) })] }) }));
}
//# sourceMappingURL=GPToggle.js.map