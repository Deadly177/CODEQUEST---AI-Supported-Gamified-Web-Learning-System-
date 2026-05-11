# Test Report: Backend Course Catalog White Box Testing

## Test Type

White Box Testing

## Objective

To verify the internal backend course catalog helpers used for course lookup, section lookup, lesson lookup, lesson track lookup, and level configuration.

## Scope

Tested file:

- `back end/src/data/courseCatalog.js`

Tested exports:

- `POINTS_PER_LEVEL`
- `getCourseCatalog`
- `getCourseById`
- `getSectionsByCourseId`
- `getLessonTracksByCourseId`
- `normalizeLessonId`
- `findLesson`

## Test Cases

| ID | Test Case | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- |
| TC-01 | Check points per level value | Value should be `250` | Value was `250` | Pass |
| TC-02 | Load course catalog | Catalog should include HTML, CSS, and JavaScript | Catalog included HTML, CSS, and JavaScript | Pass |
| TC-03 | Find known and unknown courses | Known course should return data; unknown course should return `null` | Returned expected values | Pass |
| TC-04 | Load course sections | Known course should return sections; unknown course should return empty array | Returned expected values | Pass |
| TC-05 | Load lesson tracks | JavaScript course should include `js-1` variables track | Track was found | Pass |
| TC-06 | Normalize lesson ID without alias | Original lesson ID should be returned | Original lesson ID was returned | Pass |
| TC-07 | Find catalog and track lessons | Both lesson types should be found with correct metadata | Both lesson types were found | Pass |
| TC-08 | Find unknown lesson | Unknown lesson should return `null` | Returned `null` | Pass |

## Tools Used

- Node.js built-in test runner: `node:test`
- Node.js assertion library: `node:assert/strict`

## Raw Result File

- `Testing/results/12-backend-course-catalog-white-box-results.txt`

## Result Summary

The backend course catalog white box test passed successfully.

```text
tests 8
pass 8
fail 0
duration_ms 157.303852
```

## Issues Found

No course catalog behavior issues were found in the tested cases.

## Conclusion

The backend course catalog helpers correctly expose course metadata, lesson sections, track lessons, lesson lookup behavior, unknown value handling, and the points-per-level constant. This confirms that the selected catalog logic works as expected.

