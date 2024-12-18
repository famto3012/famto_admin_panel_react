import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import UserProvider from "./context/UserContext.jsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { MapProvider } from "./context/MapContext.jsx";
import { SoundProvider } from "./context/SoundContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";
import { register } from "./serviceWorker.js";
import Layout from "./Layout.jsx";
import { BrowserRouter } from "react-router-dom";

const theme = createTheme({
  typography: {
    body1: {
      fontSize: "1rem",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>
      <ChakraProvider>
        <SocketProvider>
          <SoundProvider>
            <MapProvider>
              <UserProvider>
                <BrowserRouter>
                  <Layout />
                </BrowserRouter>
              </UserProvider>
            </MapProvider>
          </SoundProvider>
        </SocketProvider>
      </ChakraProvider>
    </StyledEngineProvider>
  </ThemeProvider>
);

register();
