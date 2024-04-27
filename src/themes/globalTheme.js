import { createTheme } from "@mui/material";
import "../index.css"

const globalTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html, body, p, div, header, h1, h2, h3, h4, h5, h6, ul, ol, li, {
          margin: 0;
          padding: 0;
          color: var(--primary-txt-color);
        }
        ul {
          list-style: none;
        }
        a {
          text-decoration: none;
        }
        a:hover {
          color: var(--emphasis-txt-color);
        }
      `,
    },

    MuiToolbar: {
      styleOverrides: {
        root: { 
          padding: "1rem 1rem",
        }
      }
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
