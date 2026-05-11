# Test Report: Backend Dependency Security Audit

## Test Type

Security Testing / Dependency Vulnerability Testing

## Objective

To check whether backend npm dependencies contain known security vulnerabilities after applying dependency fixes.

## Scope

Tested folder:

- `back end/`

Tested command:

- `npm audit --json`

## Test Cases

| ID | Test Case | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- |
| TC-01 | Run backend dependency audit | Audit should complete and report dependency security status | Audit completed successfully | Pass |
| TC-02 | Check for critical vulnerabilities | No critical vulnerabilities should be present | 0 critical vulnerabilities found | Pass |
| TC-03 | Check for high vulnerabilities | No high vulnerabilities should be present | 0 high vulnerabilities found | Pass |
| TC-04 | Check for low vulnerabilities | No low vulnerabilities should be present | 0 low vulnerabilities found | Pass |

## Tools Used

- npm audit

## Raw Result File

- `Testing/results/08-backend-dependency-audit-results.json`

## Result Summary

The backend dependency security audit passed after running `npm audit fix`.

```text
critical: 0
high: 0
moderate: 0
low: 0
total: 0
```

## Issues Found

No known backend dependency vulnerabilities were reported by `npm audit`.

Previously reported backend dependency vulnerabilities were fixed by dependency updates.

## Conclusion

The backend dependency audit now reports zero known vulnerabilities. This improves the security readiness of the backend dependency set compared with the earlier failed audit result.

