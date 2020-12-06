// Libs

import NextLink from "next/link";

export default function Link({ as, children, className, href }) {
  return (
    <NextLink as={as} href={href} passHref>
      <a className={className}>{children}</a>
    </NextLink>
  );
}
