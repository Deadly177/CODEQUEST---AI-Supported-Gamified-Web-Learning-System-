# Test Report: Backend User Profile API Testing

## Test Type

API Testing / Integration Testing

## Objective

To verify that the protected backend user profile API routes correctly handle authentication, profile loading, profile name updates, password validation, and password changes.

## Scope

Tested files:

- `back end/src/routes/users.js`
- `back end/src/routes/auth.js`
- `back end/src/middleware/auth.js`

Tested endpoints:

- `GET /api/users/me`
- `PATCH /api/users/me`
- `PATCH /api/users/me/password`
- `POST /api/auth/login`

## Test Cases

| ID | Test Case | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- |
| TC-01 | Load profile without token | Response should be `401` with `missing token` error | Response was `401` with `missing token` error | Pass |
| TC-02 | Load profile with valid token | Response should include user profile and stats | Response included user profile and stats | Pass |
| TC-03 | Update profile name with valid name | Response should return updated user name and stats name | Response returned updated user name and stats name | Pass |
| TC-04 | Update profile name with empty value | Response should be `400` with `name is required` error | Response was `400` with `name is required` error | Pass |
| TC-05 | Change password with incorrect current password | Response should be `401` with incorrect password error | Response was `401` with incorrect password error | Pass |
| TC-06 | Change password with too-short new password | Response should be `400` with minimum password length error | Response was `400` with minimum password length error | Pass |
| TC-07 | Change password with valid current and new password | Response should confirm password update and allow login with new password | Password update succeeded and login with new password succeeded | Pass |

## Tools Used

- Node.js built-in test runner: `node:test`
- Node.js assertion library: `node:assert/strict`
- Express
- Supertest
- MongoDB Memory Server
- Mongoose

## Raw Result File

- `Testing/results/05-backend-user-profile-api-results.txt`

## Result Summary

The backend user profile API test passed successfully.

```text
tests 7
pass 7
fail 0
duration_ms 6438.698415
```

## Issues Found

No user profile API behavior issues were found in the tested cases.

## Conclusion

The user profile API correctly protects authenticated profile routes, returns profile data, updates the user's name, validates password change input, rejects incorrect current passwords, and allows login after a successful password update. This confirms that the selected account-management API workflows behave as expected.

