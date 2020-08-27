# Next.js + Mongoose + JWT Auth - Boilerplate

This is a simple to-do list app that can be used as a starting point for a
Next.js-based app that requires authentication.

It includes the following features:

- JWT-based authentication
  - Sign up and log in / logout
  - Change and reset password
  - Account lockout
  - Uses a combination of access tokens and refresh tokens for persistent
    login + security (based on this
    [blog post from Hasura](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/)).
- [SWR](https://swr.vercel.app/) for client-side data fetching
- [Formik](https://formik.org/) for forms
- Database connection utility for API routes as serverless functions
- Middleware to add user data to requests

## ENV Vars

- ORIGIN // Origin for site
- SECRET_KEY // Key for signing
- JWT TOKEN_EXPIRATION // JWT expiration time
- REFRESH_TOKEN_EXPIRATION // Refresh JWT expiration time
- TRANSPORTER_EMAIL // Email service (I use Mailgun)
- TRANSPORTER_EMAIL_PW // Password for email service
