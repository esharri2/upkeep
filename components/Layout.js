// Components
import Header from "./Header";
import Footer from "./Footer";
import StatusBanner from "./StatusBanner";

// Utils
import theme from "../styles/theme";

export default function Layout({ children, narrow = false }) {
  return (
    <>
      <StatusBanner />
      <Header />
      <main>{children}</main>
      <Footer />
      <style jsx global>{`
        html {
          font-size: 16px;
          line-height: 1.4;
          box-sizing: border-box;
          overflow-x: hidden;

           {
            /* Prevent adjustments of font size after orientation changes in iOS. */
          }
          -webkit-text-size-adjust: 100%;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

        body {
          margin: 0;
          background-color: ${theme.colors.light};
          color: ${theme.colors.dark};
          font-family: ${theme.fontFamilies.body};
          overflow-x: ;
        }

        main {
          margin: 0 auto;
          max-width: ${narrow ? theme.breakpoints.s : theme.breakpoints.xl};
          padding: ${theme.spacing.xl} ${theme.spacing.m};
          min-height: calc(100vh - ${theme.sizes.headerHeight});
        }

        .sr-only {
          border: 0 !important;
          clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
          -webkit-clip-path: inset(50%) !important;
          clip-path: inset(50%) !important; /* 2 */
          height: 1px !important;
          margin: -1px !important;
          overflow: hidden !important;
          padding: 0 !important;
          position: absolute !important;
          width: 1px !important;
          white-space: nowrap !important; /* 3 */
        }

         {
          /* Size SVGS via container */
        }
        svg {
          width: 100%;
          height: auto;
          fill: inherit;
        }

        /**
        * 1. Change the font styles in all browsers.
        * 2. Remove the margin in Firefox and Safari.
        */
        button,
        input,
        optgroup,
        select,
        textarea {
          font-family: inherit; /* 1 */
          font-size: 100%; /* 1 */
          line-height: 1.15; /* 1 */
          margin: 0; /* 2 */
        }

        /**
        * Correct the inability to style clickable types in iOS and Safari.
        */
        button,
        [type="button"],
        [type="reset"],
        [type="submit"] {
          -webkit-appearance: button;
        }

        /**
        * Remove the inner border and padding in Firefox.
        */

        button::-moz-focus-inner,
        [type="button"]::-moz-focus-inner,
        [type="reset"]::-moz-focus-inner,
        [type="submit"]::-moz-focus-inner {
          border-style: none;
          padding: 0;
        }

        /**
        * Restore the focus styles unset by the previous rule.
        */

        button:-moz-focusring,
        [type="button"]:-moz-focusring,
        [type="reset"]:-moz-focusring,
        [type="submit"]:-moz-focusring {
          outline: 1px dotted ButtonText;
        }

        em {
          font-weight: 600;
          font-style: normal;
          color: ${theme.colors.accent1};
        }

        /* Focusing the button with a keyboard will show a dashed black line. */
        *:focus-visible {
          outline: 3px solid ${theme.colors.accent2};
        }

        /* Focusing the button with a mouse, touch, or stylus */
        *:focus:not(:focus-visible) {
          opacity: 0.8;
          outline: none;
        }

        .full-bleed {
          width: 100vw;
          margin-left: calc(50% - 50vw);
        }

        /* Animation utils */

        .fade-in {
          animation: fadeIn ease-in-out ${theme.timings.med};
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
