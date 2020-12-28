// Sanitize objects sent from client before doing stuff with them.

import { escape, trim } from "validator";
var xss = require("xss");

// import DOMPurify from "dompurify";

export default function sanitize(input) {
  if (typeof input === "string") {
    return sanitizeValue(input);
  } else if (typeof input === "object" && !input.length) {
    for (let property in input) {
      let value = input[property];
      console.log(value);
      input[property] = sanitizeValue(value);
    }
    return input;
  } else {
    console.error("Cannot sanitize");
  }
}

const sanitizeValue = (string) => {
  if (string && typeof string === "string") {
    const clean = xss(string);
    console.log(clean);
    return trim(clean);
  }
  return string;
};
