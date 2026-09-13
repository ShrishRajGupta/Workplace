import { createTheme } from "@mui/material/styles";

// MUI theme fed by the same values as src/styles/tokens.css so MUI and plain-CSS surfaces match.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#4f46e5", dark: "#4338ca", light: "#eceafd", contrastText: "#ffffff" },
    success: { main: "#1a7f4b" },
    error: { main: "#c0392b" },
    background: { default: "#f6f5f1", paper: "#ffffff" },
    text: { primary: "#1c1c1e", secondary: "#6b6b70" },
    divider: "#e3e1d8",
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Manrope", system-ui, -apple-system, "Segoe UI", sans-serif',
    button: { textTransform: "none", fontWeight: 600 },
    h6: { fontWeight: 700 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 6 } },
    },
    MuiAppBar: {
      styleOverrides: { root: { boxShadow: "0 1px 0 rgba(28, 28, 30, 0.08)" } },
    },
  },
});

export default theme;
