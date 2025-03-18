"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const jsx_runtime_1 = require("react/jsx-runtime");
const Container_1 = __importDefault(require("@mui/material/Container"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Reef_1 = __importDefault(require("./Reef"));
const ScoringHeight_1 = __importDefault(require("./ScoringHeight"));
const material_1 = require("@mui/material");
const GPToggle_1 = __importDefault(require("./GPToggle"));
const react_1 = require("@frc-web-components/react");
const Autonomy_1 = __importDefault(require("./Autonomy"));
const GPIndicator_1 = __importDefault(require("./GPIndicator"));
function App() {
    const [reefTarget, setReefTarget] = (0, react_1.useEntry)("/reefTarget", -1);
    const [intakeStation, setIntakeStation] = (0, react_1.useEntry)("/stationTarget", 21);
    const [scoreHeight, setScoreHeight] = (0, react_1.useEntry)("/scoreHeight", "-1");
    const [gamepiece, setGamepiece] = (0, react_1.useEntry)("/gpMode", "coral");
    const [autonomy, setAutonomy] = (0, react_1.useEntry)("/autonomyLevel", "mid");
    const [hasCoral, setHasCoral] = (0, react_1.useEntry)("/hasCoral", false);
    const [hasAlgae, setHasAlgae] = (0, react_1.useEntry)("/hasAlgae", false);
    return ((0, jsx_runtime_1.jsx)(Container_1.default, { sx: { pl: 1 }, maxWidth: false, disableGutters: true, children: (0, jsx_runtime_1.jsxs)(Box_1.default, { sx: { m: 0, p: 0, zIndex: 1 }, children: [(0, jsx_runtime_1.jsx)(Typography_1.default, { variant: "h3", component: "h1", sx: { m: 0, p: 0, position: "absolute", right: 0 }, children: (0, jsx_runtime_1.jsx)(Box_1.default, { fontWeight: "900", sx: { textAlign: "right", m: 0, p: 0 }, children: "SnakeScreen" }) }), (0, jsx_runtime_1.jsxs)(material_1.Stack, { direction: "row", spacing: 0, sx: { my: 0, pt: 2 }, children: [(0, jsx_runtime_1.jsxs)(material_1.Stack, { direction: "column", spacing: 15, sx: { px: 0, mx: 0 }, children: [(0, jsx_runtime_1.jsx)(ScoringHeight_1.default, { height: scoreHeight, setHeight: setScoreHeight, gamepiece: gamepiece }), (0, jsx_runtime_1.jsx)(GPToggle_1.default, { gamepiece: gamepiece, setGP: setGamepiece, scoreHeight: scoreHeight, setScoreHeight: setScoreHeight, reefTarget: reefTarget, setReefTarget: setReefTarget })] }), (0, jsx_runtime_1.jsx)(Reef_1.default, { gamepiece: gamepiece, reefTarget: reefTarget, setReefTarget: setReefTarget, intakeStation: intakeStation, setIntakeStation: setIntakeStation }), (0, jsx_runtime_1.jsxs)(material_1.Stack, { sx: { position: "absolute", right: 1, top: 100 }, children: [(0, jsx_runtime_1.jsx)(GPIndicator_1.default, { name: " Coral ", value: hasCoral }), (0, jsx_runtime_1.jsx)(GPIndicator_1.default, { name: "Algae", value: hasAlgae })] }), (0, jsx_runtime_1.jsx)(Autonomy_1.default, { autonomy: autonomy, setAutonomy: setAutonomy })] })] }) }));
}
//# sourceMappingURL=App.js.map