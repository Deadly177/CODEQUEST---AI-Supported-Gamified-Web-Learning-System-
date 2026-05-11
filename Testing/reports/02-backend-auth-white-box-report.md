# Test Report: Backend Authentication Middleware White Box Testing

## Test Type

White Box Testing

## Objective

To verify that the backend authentication middleware correctly protects private routes by rejecting missing or invalid JWT tokens and accepting valid JWT tokens.

## Scope

Tested file:

- `back end/src/middleware/auth.js`

Tested function:

- `requireAuth`

## Test Cases

| ID | Test Case | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- |
| TC-01 | Request without authorization header | Response should be `401` with `missing token` error | Response was `401` with `missing token` error | Pass |
| TC-02 | Request with invalid JWT token | Response should be `401` with `invalid or expired token` error | Response was `401` with `invalid or expired token` error | Pass |
| TC-03 | Request with valid JWT token | Middleware should attach user data to `req.user` and call `next()` | User data was attached and `next()` was called | Pass |

## Tools Used

- Node.js built-in test runner: `node:test`
- Node.js assertion library: `node:assert/strict`
- `jsonwebtoken`

## Raw Result File

- `Testing/results/02-backend-auth-white-box-results.txt`

## Result Summary

The backend authentication middleware white box test passed successfully.

```text
tests 3
pass 3
fail 0
duration_ms 218.832848
```

## Issues Found

No authentication behavior issues were found in the tested middleware cases.

During test setup, the test file needed to resolve `jsonwebtoken` from the backend package location because dependencies are installed inside `back end/node_modules`.

## Conclusion

The `requireAuth` middleware correctly rejects unauthenticated requests, rejects invalid tokens, and allows valid authenticated requests to continue. This confirms that the core backend route protection mechanism works as expected for the selected white box test cases.

