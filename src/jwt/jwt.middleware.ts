// Define middleware that validates incoming bearer tokens
// using JWKS from worldhoster.auth0.com
import jwt from "express-jwt";
import * as jwksRsa from "jwks-rsa";

// Set up Auth0 configuration
const authConfig = {
  domain: "worldhoster.auth0.com"
};

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});
