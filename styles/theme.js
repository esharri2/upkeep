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
    disabled: "#DCDCDC",
    disabledText: "#717171",
  },
  timings: {
    fast: ".2s",
  },
  fontFamilies: {
    body: '"Red Hat Text", "Helvetica Neue", Arial, sans-serif',
  },
  borders: {
    radius: ".25rem",
  },
  spacing: {
    xs: ".25rem",
    s: ".5rem",
    m: "1rem",
    l: "2rem",
    xl: "4rem",
    xxl: "6rem",
  },
  fontSizes: {
    s: ".8rem",
    m: "1rem",
    l: "1.2rem",
    xl: "2rem",
  },
  size: {
    headerHeight: "4rem",
  },
  breakpoints: {
    s: "576px",
    m: "768px",
    l: "992px",
    xl: "1200px",
  },
  mediaQueries: {
    tablet: "min-width: 768px",
    desktop: "min-width: 992px",
  },
  hoverEffects: {
    filter: "brightness(92%)",
  },
  sizes: {
    headerHeight: "80px",
  },
};

export default theme;
