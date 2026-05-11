# Test Report: Backend Progress API Testing

## Test Type

API Testing / Integration Testing

## Objective

To verify that the protected backend progress API routes correctly handle authentication, progress loading, course detail loading, lesson completion, duplicate lesson completion, locked lessons, and leaderboard ranking.

## Scope

Tested files:

- `back end/src/routes/progress.js`
- `back end/src/routes/auth.js`
- `back end/src/lib/progress.js`

Tested endpoints:

- `GET /api/progress`
- `GET /api/progress/courses/:courseId`
- `POST /api/progress/lessons/:lessonId/complete`
- `GET /api/progress/leaderboard`

## Test Cases

| ID | Test Case | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- |
| TC-01 | Load progress without token | Response should be `401` with `missing token` error | Response was `401` with `missing token` error | Pass |
| TC-02 | Load progress with valid token | Response should include user stats and course summaries | Response included user stats and course summaries | Pass |
| TC-03 | Load valid JavaScript course detail | Response should include JavaScript course sections and unlocked first lesson | Response included JavaScript course sections and unlocked first lesson | Pass |
| TC-04 | Load unknown course detail | Response should be `404` with `course not found` error | Response was `404` with `course not found` error | Pass |
| TC-05 | Complete unlocked lesson `js-track-1` | Response should award 50 XP and update total points to 50 | Response awarded 50 XP and total points became 50 | Pass |
| TC-06 | Complete the same lesson twice | Second response should award 0 XP and mark lesson as already completed | Second response awarded 0 XP and marked lesson as already completed | Pass |
| TC-07 | Complete locked lesson `js-2` | Response should be `423` with `lesson is locked` error | Response was `423` with `lesson is locked` error | Pass |
| TC-08 | Load leaderboard after one user earns XP | User with 50 XP should be ranked first | User with 50 XP was ranked first | Pass |

## Tools Used

- Node.js built-in test runner: `node:test`
- Node.js assertion library: `node:assert/strict`
- Express
- Supertest
- MongoDB Memory Server
- Mongoose

## Raw Result File

- `Testing/results/04-backend-progress-api-results.txt`

## Result Summary

The backend progress API retest passed successfully after fixing the duplicate XP defect.

```text
tests 8
pass 8
fail 0
duration_ms 7533.591621
```

## Issues Found

No progress API behavior issues remain in the retested cases.

Previous issue fixed:

```text
Completing the same lesson twice awarded XP again.
```

The fix updated `completeLessonForUser` so newly created course progress entries are modified through the saved Mongoose subdocument, allowing `completedLessonIds` to persist correctly.

## Conclusion

The progress API now correctly protects routes, loads progress, loads course detail, rejects unknown courses, completes unlocked lessons, prevents duplicate XP awards, rejects locked lessons, and returns leaderboard ranking. The previously discovered duplicate XP bug has been resolved and retested successfully.

