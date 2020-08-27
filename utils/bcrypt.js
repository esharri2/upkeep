const bcrypt = require("bcrypt");
const saltRounds = 10;

export async function hashPassword(textPassword) {
  try {
    const hashedPassword = await bcrypt.hash(textPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    return error;
  }
}

export async function checkPassword(textPassword, hash) {
  try {
    const compare = await bcrypt.compare(textPassword, hash);
    return compare;
  } catch (error) {
    return error;
  }
}
