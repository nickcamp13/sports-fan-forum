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
        body {
          background: #5171A5;
        }
        ul {
          list-style: none;
        }
        a {
          text-decoration: none;
        }
        a:hover {
          color: var(--hover-color);
        }
        img {
          width: 40%;
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
    MuiPaper: {
      defaultProps: {
        elevation: 3,
      },
      styleOverrides: {
        root: { 
          padding: "1rem",
        }
      }
    },
    MuiButton: {
      '&hover': {
        color: "var(--hover-color)"
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
      styleOverrides: {
        root: { 
          lineHeight: "1.0"
        }
      }
    },
  },
});

export default globalTheme;
