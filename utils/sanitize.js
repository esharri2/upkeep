// Sanitize objects sent from client before doing stuff with them.

import { escape, trim } from "validator";

export default function sanitize(input) {
  if (typeof input === "string") {
    return sanitizeValue(input);
  } else if (typeof input === "object" && !input.length) {
    for (let property in input) {
      let value = input[property];
      input[property] = sanitizeValue(value);
      return input;
    }
  } else {
    console.error("Cannot sanitize");
  }
}

const sanitizeValue = (string) => {
  if (string) {
    return trim(escape(string));
  }
  return string;
};
