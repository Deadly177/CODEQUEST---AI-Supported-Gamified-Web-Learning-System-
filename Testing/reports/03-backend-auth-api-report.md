# Test Report: Backend Authentication API Testing

## Test Type

API Testing / Integration Testing

## Objective

To verify that the backend authentication API routes correctly handle user registration and login using real HTTP requests against an Express app and an isolated temporary MongoDB database.

## Scope

Tested file:

- `back end/src/routes/auth.js`

Tested endpoints:

- `POST /api/auth/register`
- `POST /api/auth/login`

## Test Cases

| ID | Test Case | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- |
| TC-01 | Register with valid name, email, and password | Response should be `201`, return user data, and return JWT token | Response was `201`, user data and token were returned | Pass |
| TC-02 | Register with missing required fields | Response should be `400` with required fields error | Response was `400` with required fields error | Pass |
| TC-03 | Register with duplicate email address | Response should be `409` with duplicate email error | Response was `409` with duplicate email error | Pass |
| TC-04 | Login with valid credentials | Response should be `200`, return user data, and return JWT token | Response was `200`, user data and token were returned | Pass |
| TC-05 | Login with incorrect password | Response should be `401` with invalid credentials error | Response was `401` with invalid credentials error | Pass |
| TC-06 | Login with missing password | Response should be `400` with required fields error | Response was `400` with required fields error | Pass |

## Tools Used

- Node.js built-in test runner: `node:test`
- Node.js assertion library: `node:assert/strict`
- Express
- Supertest
- MongoDB Memory Server
- Mongoose

## Raw Result File

- `Testing/results/03-backend-auth-api-results.txt`

## Result Summary

The backend authentication API test passed successfully.

```text
tests 6
pass 6
fail 0
duration_ms 70968.775619
```

## Issues Found

No authentication API behavior issues were found in the tested cases.

The first sandboxed run failed because the in-memory MongoDB server needed permission to bind a local test port. After running with localhost port permission, the test completed successfully. The first successful run also downloaded the MongoDB test binary, so later runs should be faster.

## Conclusion

The authentication API correctly handles successful registration, required field validation, duplicate email validation, successful login, invalid password rejection, and missing login field validation. This confirms that the main authentication API workflow behaves as expected for the selected integration test cases.

