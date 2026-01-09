import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import MemoryBook from "./index.jsx"; 
import { MantineProvider, createTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import LoadingScreen from "./loadingscreen.jsx";

function Root() {
    return <MemoryBook />;
  }

const theme = createTheme({
    primaryColor: "pink",
    fontFamily: "Playfair Display, serif",
    headings: {
      fontFamily: "Playfair Display, serif",
    },
    defaultRadius: "md",
  });

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
    <MantineProvider
      theme={theme}
      withGlobalStyles
      withNormalizeCSS
    >
      <div
        style={{
          minHeight: "100vh",
          width: "110vw",
          backgroundImage: "url('/background.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      <Root />
      </div>
    </MantineProvider>
  </React.StrictMode>
);
