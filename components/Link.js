// Libs

import classNames from "classnames";
import NextLink from "next/link";

export default function Link({ children, href, textColor }) {
  return (
    <NextLink href={href} passHref>
      <a className={classNames(`text-${textColor || "blue-600"}`, "underline")}>
        {children}
      </a>
    </NextLink>
  );
}
