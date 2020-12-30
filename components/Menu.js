import { useEffect, useState } from "react";

// Components

// Utils
import theme from "../styles/theme";

export default function Menu(props) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.addEventListener(
        "click",
        () => {
          setIsOpen(false);
        },
        { once: true }
      );
    }
    // todo return a function that cleans up this event
  }, [isOpen]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button aria-expanded={isOpen} onClick={handleClick}>
        {props.button}
      </button>
      {isOpen && props.children}
      <style jsx>{`
        div {
          position: relative;
          display: inline-block;
        }
        button {
          background-color: transparent;
          border: none;
          fill: ${theme.colors.dark};
        }
        div :global(ul) {
          position: absolute;
          top: 30px;
          right: 0;
          list-style-type: none;
          padding: 0;
          margin: 0;
          background-color: ${theme.colors.light};
          box-shadow: ${theme.shadows.m};
          border-radius: ${theme.borders.radius};
          min-width: 250px;
        }

        div :global(li) {
          padding: 0;
          display: flex;
          align-items: center;
          border-bottom: solid 1px ${theme.colors.middle};
        }

        div :global(li:last-child) {
          border-bottom: none;
        }

        div :global(li a, li button) {
          display: flex;
          padding: ${theme.spacing.m};
          height: 100%;
          width: 100%;
          text-decoration: none;
          color: ${theme.colors.dark};
          border: none;
          fill: ${theme.colors.dark};
          background-color: ${theme.colors.light};
        }
      `}</style>
    </div>
  );
}
