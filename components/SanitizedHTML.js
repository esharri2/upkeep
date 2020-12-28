import DOMPurify from "dompurify";

export default function SanitizedHTML({ dirty }) {
  console.log("sani component");
  console.log(dirty);

  if (dirty) {
    const clean = DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
    console.log(clean);
    return clean;
  }
  return "";
}
