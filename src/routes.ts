/**
    * An array of routes that are accessible to the public
    * @type {string[]}
*/
export const PUBLIC_ROUTES = ["/"];

/**
    * An array of routes that are used for authentication
    * These routes will redirect logged in users to [locale]/dashboard
    * @type {string[]}
*/
export const AUTH_ROUTES = ["/login", "/register"];

/**
    * The prefix for API authentication routes
    * Routes that start with this prefix are used for API authentication purposes
    * @type {string}
*/
export const API_AUTH_PREFIX = "/api/auth";

/**
    * The default redirect pah after loggin in
    * @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT = "/overview";