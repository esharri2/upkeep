export default function setRefreshTokenHeader(res, token) {
  if (token) res.setHeader("Set-Cookie", `refreshToken=${token}; HttpOnly`);
  return;
}
