# Test Report: Backend Progress White Box Testing

## Test Type

White Box Testing

## Objective

To verify the internal backend progress logic used by CodeQuest for XP calculation, level calculation, streak display, lesson locking, course progress, lesson track completion, and invalid course handling.

## Scope

Tested file:

- `back end/src/lib/progress.js`

Tested functions:

- `buildStats`
- `getDisplayStreak`
- `buildCourseSummaries`
- `buildCourseDetail`

## Test Cases

| ID | Test Case | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- |
| TC-01 | Calculate user stats from 375 total points | User is level 2 with 125 current XP | User was level 2 with 125 current XP | Pass |
| TC-02 | Display streak when last activity is too old | Streak should display as 0 | Streak displayed as 0 | Pass |
| TC-03 | Calculate CSS course summary after completing all CSS track lessons for first lesson | Completed lessons should be 1 and progress should be 13% | Completed lessons was 1 and progress was 13% | Pass |
| TC-04 | Build JavaScript course detail for a new user | First lesson unlocked, second lesson locked | First lesson was unlocked and second lesson was locked | Pass |
| TC-05 | Treat completed JavaScript track lessons as parent lesson completion | Parent lesson completed and next lesson unlocked | Parent lesson was completed and next lesson was unlocked | Pass |
| TC-06 | Request an unknown course detail | Function should return null | Function returned null | Pass |

## Tools Used

- Node.js built-in test runner: `node:test`
- Node.js assertion library: `node:assert/strict`

## Raw Result File

- `Testing/results/01-backend-white-box-progress-results.txt`

## Result Summary

The backend progress white box test passed successfully.

```text
tests 6
pass 6
fail 0
duration_ms 723.540971
```

## Issues Found

No issues were found in the tested progress calculation functions.

## Conclusion

The tested backend progress functions behaved correctly for XP calculation, level calculation, expired streak display, course progress calculation, lesson locking, track-based lesson completion, and invalid course handling. This confirms that the core progress logic works as expected for the selected white box test cases.

