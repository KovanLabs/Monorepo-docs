import type { ReactNode } from "react";
import { Box, Paper, Container, ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#d84315" },
  },
  shape: { borderRadius: 0 },
});

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.100",
        }}
      >
        <Container maxWidth="xs">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {children}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
