// Libs

import NextLink from "next/link";

export default function Link({ children, className, href }) {
  return (
    <NextLink href={href} passHref>
      <a className={className}>{children}</a>
    </NextLink>
  );
}
