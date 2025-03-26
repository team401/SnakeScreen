import * as React from "react";
import * as ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import { NT4Provider } from "@frc-web-components/react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement!);

function Index() {

  const savedIP = localStorage.getItem("robotIP") || "10.4.1.2";
  const [IP, setIP] = React.useState(savedIP);

  React.useEffect(() => {
    localStorage.setItem("robotIP", IP);
  }, [IP]);

  return (
    <NT4Provider address={IP}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App IP={IP} setIP={setIP} />
      </ThemeProvider>
    </NT4Provider>
  );
}

root.render(<Index />);
