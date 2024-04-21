import { createTheme } from "@mui/material";

const globalTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html, body, p, div, h1, h2, h3, h4, h5, h6, ul, ol, li, {
          margin: 0;
          padding: 0;
        }
        ul {
          list-style: none;
        }
      `,
    },

    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h2",
          h2: "h2",
          h3: "h2",
          h4: "h2",
          h5: "h2",
          h6: "h2",
          subtitle1: "h2",
          subtitle2: "h2",
          body1: "span",
          body2: "span",
        },
      },
    },
  },
});

export default globalTheme;
