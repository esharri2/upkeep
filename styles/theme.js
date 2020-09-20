// styles/theme.js

const theme = {
  shadows: {
    s:
      "0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2)",
    m:
      "0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12), 0 1px 8px 0 rgba(0, 0, 0, 0.2)",
    l:
      "0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),    0 2px 4px -1px rgba(0, 0, 0, 0.2)",
  },
  colors: {
    dark: "#223843",
    light: "#fefffe",
    middle: "#c0d4df",
    accent1: "#068d9d",
    warning: "#c03221",
    success: "#a2ad59",
  },
  timings: {
    fast: ".2s",
  },
  fontFamilies: {
    body: '"Work Sans", "Helvetica Neue", Arial, sans-serif',
  },
  spacing: {
    xs: ".25rem",
    s: ".5rem",
    m: "1rem",
    l: "2rem",
    xl: "4rem",
  },
  size: {
    headerHeight: "4rem",
  },
  mediaQueries: {
    desktop: function (styles) {
      `@media screen and (min-width: 960px) {${styles}}`;
    },
  },
};

export default theme;
