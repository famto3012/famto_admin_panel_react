import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import UserProvider from "./context/UserContext.jsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { MapProvider } from "./context/MapContext.jsx";
import { SoundProvider } from "./context/SoundContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

const theme = createTheme({
  typography: {
    body1: {
      fontSize: "1rem",
    },
    // Define other typography styles as needed
  },
  // Define other theme settings as needed
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>
      <ChakraProvider>
        <SocketProvider>
          <SoundProvider>
            <MapProvider>
              <UserProvider>
                <App />
              </UserProvider>
            </MapProvider>
          </SoundProvider>
        </SocketProvider>
      </ChakraProvider>
    </StyledEngineProvider>
  </ThemeProvider>
);
