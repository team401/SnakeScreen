"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Reef;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const ArrowForward_1 = __importDefault(require("@mui/icons-material/ArrowForward"));
const ArrowBack_1 = __importDefault(require("@mui/icons-material/ArrowBack"));
const reef_png_1 = __importDefault(require("./reef.png"));
function Reef(props) {
    let divW = 1200;
    let imgW = 900;
    let padder = (divW - imgW) / 2;
    let bPad = padder / 2;
    let buttonList = [
        { x: bPad + imgW * 0.4, y: 0, value: 0, piece: "coral" },
        { x: bPad + imgW * 0.65, y: 0, value: 1, piece: "coral" },
        { x: bPad + imgW * 0.9, y: imgW * 0.15, value: 2, piece: "coral" },
        { x: bPad + imgW * 1.05, y: imgW * 0.4, value: 3, piece: "coral" },
        { x: bPad + imgW * 1.05, y: imgW * 0.65, value: 4, piece: "coral" },
        { x: bPad + imgW * 0.9, y: imgW * 0.85, value: 5, piece: "coral" },
        { x: bPad + imgW * 0.65, y: imgW, value: 6, piece: "coral" },
        { x: bPad + imgW * 0.4, y: imgW, value: 7, piece: "coral" },
        { x: bPad + imgW * 0.12, y: imgW * 0.85, value: 8, piece: "coral" },
        { x: bPad, y: imgW * 0.65, value: 9, piece: "coral" },
        { x: bPad, y: imgW * 0.4, value: 10, piece: "coral" },
        { x: bPad + imgW * 0.12, y: imgW * 0.15, value: 11, piece: "coral" },
        { x: bPad + imgW * 0.52, y: 0, value: 0, piece: "algae" },
        { x: bPad + imgW * 0.95, y: imgW * 0.25, value: 1, piece: "algae" },
        { x: bPad + imgW * 0.95, y: imgW * 0.75, value: 2, piece: "algae" },
        { x: bPad + imgW * 0.52, y: imgW, value: 3, piece: "algae" },
        { x: bPad + imgW * 0.08, y: imgW * 0.75, value: 4, piece: "algae" },
        { x: bPad + imgW * 0.08, y: imgW * 0.25, value: 5, piece: "algae" },
    ];
    let intakeStations = [
        {
            x: 0,
            y: imgW,
            value: 20,
            label: (0, jsx_runtime_1.jsx)(ArrowBack_1.default, { sx: { fontSize: 100 } }),
        },
        {
            x: bPad + imgW * 1.15,
            y: imgW,
            value: 21,
            label: (0, jsx_runtime_1.jsx)(ArrowForward_1.default, { sx: { fontSize: 100 } }),
        },
    ];
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
            width: divW,
            height: 700,
            position: "relative",
        }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { px: padder.toString() + "px", py: "120px", children: (0, jsx_runtime_1.jsx)("img", { src: reef_png_1.default, width: imgW, alt: "" }) }), buttonList
                .filter((entry) => entry.piece == props.gamepiece)
                .map((entry) => ((0, jsx_runtime_1.jsx)("div", { style: {
                    position: "absolute",
                    top: entry.y,
                    left: entry.x,
                    zIndex: 1000,
                    padding: 0,
                    margin: 0,
                }, children: (0, jsx_runtime_1.jsx)(material_1.ToggleButton, { color: "error", value: entry.value, sx: {
                        padding: 0,
                        margin: 0,
                        width: "120px",
                        borderWidth: 2,
                        border: "solid",
                    }, selected: props.reefTarget == entry.value, onChange: () => props.setReefTarget(entry.value), children: (0, jsx_runtime_1.jsx)(material_1.Typography, { px: 3, py: 1.5, m: 0, fontSize: 100, lineHeight: 0.9, children: entry.value }) }) }, entry.piece + entry.value))), intakeStations.map((entry) => ((0, jsx_runtime_1.jsx)("div", { style: {
                    position: "absolute",
                    top: entry.y,
                    left: entry.x,
                    zIndex: 1000,
                    padding: 0,
                    margin: 0,
                }, children: (0, jsx_runtime_1.jsx)(material_1.ToggleButton, { color: "error", value: entry.value, sx: {
                        padding: 0,
                        margin: 0,
                        width: "120px",
                        borderWidth: 2,
                        border: "solid",
                    }, selected: props.intakeStation == entry.value, onChange: () => props.setIntakeStation(entry.value), children: (0, jsx_runtime_1.jsx)(material_1.Typography, { px: 3, py: 0, m: 0, fontSize: 100, lineHeight: 0.9, children: entry.label }) }) }, entry.value)))] }));
}
//# sourceMappingURL=Reef.js.map