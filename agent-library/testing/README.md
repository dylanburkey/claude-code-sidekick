# Testing Agents

> Agents focused on quality assurance, testing, and validation to ensure code
> reliability and accessibility.

## Overview

Testing agents automate the creation and execution of tests across your
application. From unit tests to accessibility audits, these agents help maintain
code quality and catch issues before they reach production.

## Available Agents

### Test Generation

- **Unit Test Generator**: Create comprehensive unit tests
- **Integration Test Builder**: Generate integration test suites
- **E2E Test Creator**: Build end-to-end test scenarios
- **Snapshot Test Generator**: Create visual regression tests

### Quality Assurance

- **Accessibility Auditor**: WCAG compliance checking
- **Performance Tester**: Load time and performance metrics
- **Security Scanner**: Vulnerability detection and fixes
- **Code Quality Analyzer**: Code smell detection and suggestions

### Test Management

- **Coverage Reporter**: Test coverage analysis and reporting
- **Test Runner**: Automated test execution
- **Flaky Test Detector**: Identify and fix unstable tests
- **Test Data Generator**: Create realistic test data

## Usage Patterns

### Generate Tests for Existing Code

```markdown
Generate unit tests for the ProductCard component including:

- Rendering with different prop combinations
- User interaction events
- Edge cases and error states
- Accessibility compliance
```

### Run Quality Audits

```markdown
Run a comprehensive quality audit:

- Accessibility (WCAG 2.1 AA)
- Performance (Lighthouse)
- Security vulnerabilities
- Code quality metrics
```

### Automated Testing Pipeline

```markdown
Set up automated testing that runs:

- Unit tests on every commit
- Integration tests on PR creation
- E2E tests on staging deployment
- Accessibility audits on production builds
```

## Best Practices

### Test Coverage

Aim for meaningful coverage, not just high percentages:

- **Critical Paths**: 100% coverage for critical functionality
- **Business Logic**: Comprehensive coverage of core logic
- **Edge Cases**: Test error conditions and boundaries
- **Integration Points**: Test API interactions and external dependencies

### Test Quality

```javascript
// ✓ Good test: Clear, focused, maintainable
test('adds item to cart and updates total', async () => {
  const cart = new ShoppingCart();
  await cart.addItem({ id: 1, price: 10 });

  expect(cart.items).toHaveLength(1);
  expect(cart.total).toBe(10);
});

// ✗ Poor test: Testing multiple things, unclear intent
test('cart works', async () => {
  const cart = new ShoppingCart();
  cart.addItem({ id: 1, price: 10 });
  cart.removeItem(1);
  cart.addItem({ id: 2, price: 20 });
  expect(cart.total).toBe(20);
});
```

### Accessibility Testing

```javascript
// Automated accessibility testing
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('component is accessible', async () => {
  const { container } = render(<ProductCard {...props} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Agent Configuration

### Unit Test Configuration

```yaml
agent: testing/unit-test-generator
config:
  framework: jest
  coverage:
    statements: 80
    branches: 75
    functions: 80
    lines: 80
  patterns:
    - 'src/**/*.test.ts'
  exclude:
    - '**/*.spec.ts'
    - '**/mocks/**'
```

### Accessibility Audit Configuration

```yaml
agent: testing/accessibility-auditor
config:
  standard: WCAG21AA
  rules:
    - color-contrast
    - heading-order
    - label-content
    - link-purpose
  browsers:
    - chrome
    - firefox
    - safari
  screenReaders:
    - nvda
    - voiceover
```

## Examples

### Example 1: Component Test Suite

**Prompt:**

```
Generate a complete test suite for the LoginForm component covering:
- Form validation (email, password)
- Submit behavior (success, error)
- Loading states
- Accessibility (keyboard nav, screen readers)
- Error message display
```

**Generated Output:**

```typescript
describe('LoginForm', () => {
  describe('Validation', () => {
    test('shows error for invalid email', () => {});
    test('shows error for short password', () => {});
    test('enables submit when form is valid', () => {});
  });

  describe('Submission', () => {
    test('calls onSubmit with form data', () => {});
    test('shows loading state during submission', () => {});
    test('displays error message on failure', () => {});
    test('redirects on successful login', () => {});
  });

  describe('Accessibility', () => {
    test('is navigable by keyboard', () => {});
    test('announces errors to screen readers', () => {});
    test('has proper ARIA labels', () => {});
  });
});
```

### Example 2: API Integration Tests

**Prompt:**

```
Generate integration tests for the user API endpoints:
- POST /api/users (create user)
- GET /api/users/:id (get user)
- PUT /api/users/:id (update user)
- DELETE /api/users/:id (delete user)

Include authentication, validation, and error cases.
```

**Generated Output:**

```typescript
describe('User API', () => {
  describe('POST /api/users', () => {
    test('creates user with valid data', () => {});
    test('returns 400 for invalid email', () => {});
    test('returns 409 for duplicate email', () => {});
    test('requires authentication', () => {});
  });

  // ... other endpoint tests
});
```

### Example 3: E2E User Flow

**Prompt:**

```
Generate E2E tests for the checkout flow:
1. Add items to cart
2. Proceed to checkout
3. Fill shipping information
4. Select payment method
5. Review order
6. Complete purchase
7. View confirmation

Include error scenarios and accessibility checks.
```

## Integration with MCP

Testing agents leverage MCP for:

- **Database Testing**: Create test databases via Neon MCP
- **Test Data**: Generate realistic test data from production schemas
- **Environment Setup**: Provision isolated test environments
- **State Management**: Track test runs and results

### MCP Example

```javascript
// Create isolated test database for integration tests
async function setupTestEnvironment() {
  // Create test branch in Neon
  const testBranch = await mcp.neon.createBranch({
    projectId: 'project-id',
    branchName: `test-${Date.now()}`,
  });

  // Run tests against test branch
  const connectionString = await mcp.neon.getConnectionString({
    projectId: 'project-id',
    branchId: testBranch.id,
  });

  // Cleanup after tests
  afterAll(async () => {
    await mcp.neon.deleteBranch({
      projectId: 'project-id',
      branchId: testBranch.id,
    });
  });
}
```

## Test Types

### Unit Tests

Test individual functions and components in isolation.

```javascript
test('formatPrice returns correct format', () => {
  expect(formatPrice(1234.56)).toBe('$1,234.56');
  expect(formatPrice(0)).toBe('$0.00');
  expect(formatPrice(-10)).toBe('-$10.00');
});
```

### Integration Tests

Test how components work together.

```javascript
test('cart updates when product is added', async () => {
  const { getByRole } = render(<App />);
  const addButton = getByRole('button', { name: /add to cart/i });

  await userEvent.click(addButton);

  const cartCount = getByRole('status', { name: /cart items/i });
  expect(cartCount).toHaveTextContent('1');
});
```

### E2E Tests

Test complete user flows through the application.

```javascript
test('user can complete checkout', async () => {
  await page.goto('/products');
  await page.click('[data-testid="add-to-cart"]');
  await page.click('[data-testid="checkout"]');
  await page.fill('[name="email"]', 'user@example.com');
  await page.click('[data-testid="submit-order"]');

  await expect(page).toHaveURL('/order/confirmation');
});
```

### Accessibility Tests

Ensure WCAG compliance and usability.

```javascript
test('form is accessible', async () => {
  const { container } = render(<CheckoutForm />);

  // Run axe accessibility tests
  const results = await axe(container);
  expect(results).toHaveNoViolations();

  // Test keyboard navigation
  const emailInput = screen.getByLabelText(/email/i);
  emailInput.focus();
  expect(emailInput).toHaveFocus();
});
```

## Performance Testing

### Load Testing

```javascript
// Test API performance under load
import { check } from 'k6';
import http from 'k6/http';

export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 0 },
  ],
};

export default function () {
  const res = http.get('https://api.example.com/products');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
}
```

### Lighthouse Testing

```javascript
// Automated Lighthouse audits
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch();
  const result = await lighthouse(url, {
    port: chrome.port,
    onlyCategories: ['performance', 'accessibility', 'best-practices'],
  });

  await chrome.kill();

  // Assert minimum scores
  expect(result.lhr.categories.performance.score).toBeGreaterThan(0.9);
  expect(result.lhr.categories.accessibility.score).toBeGreaterThan(0.9);
}
```

## Continuous Testing

### Test Automation Pipeline

```yaml
name: Test Pipeline

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm test

  integration-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm run test:integration

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm run test:e2e

  accessibility-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm run test:a11y
```

## Troubleshooting

### Flaky Tests

- Use explicit waits instead of timeouts
- Mock external dependencies
- Reset state between tests
- Use deterministic test data

### Slow Tests

- Run tests in parallel
- Use test databases/environments
- Mock expensive operations
- Optimize setup/teardown

### False Positives

- Review test assertions
- Check for race conditions
- Verify test isolation
- Update stale snapshots

## Contributing

To add a new testing agent:

1. Define test scope and coverage
2. Choose appropriate testing tools
3. Document expected outcomes
4. Provide clear examples
5. Include CI/CD integration
6. Test the tests!

## Resources

- [Agent Template](../templates/agent-template.md)
- [Testing Best Practices](../../docs/testing-guide.md)
- [Accessibility Rules](../../.claude/rules/accessibility.md)

---

_Testing agents ensure your code is reliable, accessible, and performant through
automated quality assurance._
