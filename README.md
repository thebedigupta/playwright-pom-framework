# **Playwright POM Framework**

**A TypeScript-based Playwright UI automation framework using Page Object Model, data-driven testing, and GitHub Actions CI/CD.**

![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-%40playwright%2Ftest-2EAD33?logo=playwright&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%20Passing-2088FF?logo=githubactions&logoColor=white)
![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node.js 20](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)

## Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Project Structure](#project-structure)
- [How It Works — The Architecture](#how-it-works--the-architecture)
- [Tech Stack Table](#tech-stack-table)
- [Getting Started](#getting-started)
- [Test Cases Covered](#test-cases-covered)
- [CI/CD Pipeline Section](#cicd-pipeline-section)
- [Test Reports](#test-reports)
- [What I Learned](#what-i-learned)
- [Future Improvements](#future-improvements)
- [License](#license)
- [Author Section](#author-section)

## About The Project

**Playwright POM Framework** is a functional UI automation testing project built with **TypeScript** and **Playwright**. It was created as part of a QA automation learning journey and as a **BCA final year project** to demonstrate real-world test automation practices using clean structure, reusable page classes, and CI/CD execution.

Manual testing is useful, but it becomes slow, repetitive, error-prone, and difficult to scale when the application grows. This framework solves that problem by automating important UI flows so they can be executed quickly and repeatedly with consistent results.

This project gives you a maintainable automation framework where tests are easy to read, page logic is reusable, and test data can be managed separately through JSON files.

Key highlights:

- Built with **Playwright Test** and **TypeScript**
- Uses **Page Object Model** architecture for maintainable test code
- Supports **Data-Driven Testing** using external JSON files
- Runs tests on **Chromium** and **Firefox**
- Includes **GitHub Actions CI/CD** for automatic test execution
- Generates professional **HTML test reports**
- Targets the public demo application: `https://the-internet.herokuapp.com`
- Covers Login, Dashboard, Checkboxes, and Dropdown pages

## Features

### Page Object Model Architecture

Page Object Model, or POM, is a design pattern where each web page gets its own class. That class stores the locators and actions for that page. This keeps test files clean because tests focus on the scenario, while page classes handle browser interactions.

Why it matters:

- Reduces duplicate locator code
- Makes tests easier to read
- Improves maintainability when UI changes
- Separates test logic from page interaction logic

### Data-Driven Testing With JSON

Data-Driven Testing means running the same test logic with multiple sets of input data. In this project, login credentials and expected messages are stored in `data/testData.json`.

Benefits:

- Test data is separated from test logic
- New test cases can be added by editing JSON
- The same test flow can validate many scenarios
- Cleaner and more scalable test code

### CI/CD With GitHub Actions

The project includes a GitHub Actions workflow that automatically runs Playwright tests when code is pushed to the `main` branch or when a pull request targets `main`.

This helps catch issues early and proves that the framework runs reliably outside the local machine.

### Multi-Browser Support

The framework is configured to run tests on:

- Chromium
- Firefox

This helps validate that core UI functionality works consistently across major browser engines.

### HTML Test Reports

Playwright automatically generates an HTML report after test execution. The report shows test names, status, duration, errors, traces, and screenshots when failures occur.

### TypeScript

TypeScript adds static typing, interfaces, and better IDE support over plain JS. This makes the framework easier to refactor, safer to scale, and more comfortable to work with in editors like VS Code.

### Zero Flaky Tests

Playwright includes built-in auto-waiting, smart assertions, and reliable browser automation. This reduces flaky test behavior caused by timing issues, slow page loads, or elements not being ready yet.

## Project Structure

```text
playwright-pom-framework/
├── .github/                         # GitHub configuration files
│   └── workflows/                   # GitHub Actions workflow directory
│       └── playwright.yml           # CI pipeline for installing dependencies, running tests, and uploading reports
├── data/                            # External test data used for data-driven testing
│   └── testData.json                # Valid and invalid login test data
├── pages/                           # POM classes - one class per page
│   ├── CheckboxPage.ts              # Checkbox page locators and checkbox actions
│   ├── DashboardPage.ts             # Dashboard page locators and dashboard actions
│   ├── DropdownPage.ts              # Dropdown page locators and dropdown actions
│   └── LoginPage.ts                 # Login page locators and login actions
├── tests/                           # Playwright test specifications
│   ├── checkbox.spec.ts             # Functional tests for checkbox scenarios
│   ├── dropdown.spec.ts             # Functional tests for dropdown scenarios
│   ├── login-ddt.spec.ts            # Data-driven login tests using JSON data
│   └── login.spec.ts                # Functional login and dashboard redirect tests
├── types/                           # Shared TypeScript interfaces and custom types
│   └── TestData.ts                  # Interfaces for login test data and JSON file structure
├── utils/                           # Reusable helper functions
│   └── helpers.ts                   # Screenshot, network idle, random email, and JSON reader utilities
├── package-lock.json                # Locked dependency versions for reproducible installs
├── package.json                     # Project metadata, npm scripts, and dev dependencies
├── playwright.config.ts             # Main Playwright configuration file
├── README.md                        # Project documentation
└── tsconfig.json                    # TypeScript compiler configuration
```

## How It Works — The Architecture

Think of Page Object Model like a restaurant menu.

As a customer, you do not go into the kitchen and cook the food yourself. You simply order from the menu. In the same way, a test file should not directly manage every locator and browser action. It should call clear methods from a page class, like `loginPage.login(username, password)`, and let the POM class handle the details.

In this framework:

- **Test files** describe what should be tested
- **Page classes** know how to interact with the UI
- **Assertions** verify that the expected result happened
- **Reports** show what passed, failed, and how long it took

Basic test execution flow:

```text
Test File
   |
   | Step 1: Calls a POM class method
   v
Page Object Class
   |
   | Step 2: Interacts with the browser using Playwright locators
   v
Browser Page
   |
   | Step 3: Assertion checks the result
   v
Playwright Test Runner
   |
   | Step 4: HTML report is generated
   v
Test Report
```

Example flow for a login test:

```text
tests/login.spec.ts
   |
   v
LoginPage.login("tomsmith", "SuperSecretPassword!")
   |
   v
Playwright fills username, fills password, and clicks submit
   |
   v
DashboardPage verifies secure area content
   |
   v
Playwright marks the test as pass or fail
```

Data-Driven Testing flow:

```text
data/testData.json
   |
   | Login credentials and expected messages are loaded
   v
tests/login-ddt.spec.ts
   |
   | for...of loop generates one test per data row
   v
LoginPage POM executes the same login flow
   |
   v
Assertions compare actual UI messages with expected JSON values
```

CI/CD flow:

```text
Developer pushes code to main
   |
   v
GitHub Actions workflow triggers
   |
   v
Node.js 20 is installed
   |
   v
npm ci installs dependencies
   |
   v
Playwright browsers are installed
   |
   v
npx playwright test runs the test suite
   |
   v
HTML report and failure artifacts are uploaded
```

This architecture keeps the project beginner-friendly while still following professional automation practices.

## Tech Stack Table

| Technology | Purpose | Version |
| --- | --- | --- |
| TypeScript | Adds static typing, interfaces, and safer test framework development | 6.0.3 |
| Playwright | Browser automation and test runner through `@playwright/test` | 1.60.0 |
| Node.js | Runtime environment for installing dependencies and running tests | 20 in CI |
| GitHub Actions | CI/CD pipeline for automatic test execution on GitHub | Latest hosted runner actions |

## Getting Started

### Prerequisites

Before running this project, install:

- Node.js 18 or higher
- Git
- VS Code recommended

### Installation Steps

1. Clone the repo

```bash
git clone git@github.com:thebedigupta/playwright-pom-framework.git
```

2. Move into the project directory

```bash
cd playwright-pom-framework
```

3. Install project dependencies

```bash
npm install
```

4. Install Playwright browsers

```bash
npx playwright install
```

### Running Tests

Run all tests:

```bash
npm test
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.ts
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run tests on a specific browser:

```bash
npm run test:chromium
```

View the HTML report:

```bash
npm run report
```

## Test Cases Covered

| Test File | Test Case | Type | Status |
| --- | --- | --- | --- |
| `tests/login.spec.ts` | should login successfully with valid credentials | Functional UI | ✅ Pass |
| `tests/login.spec.ts` | should show error for invalid username | Negative Functional UI | ✅ Pass |
| `tests/login.spec.ts` | should show error for invalid password | Negative Functional UI | ✅ Pass |
| `tests/login.spec.ts` | should show error for empty credentials | Negative Functional UI | ✅ Pass |
| `tests/login.spec.ts` | should display correct page title | Functional UI | ✅ Pass |
| `tests/login.spec.ts` | should redirect to dashboard on successful login | Functional UI | ✅ Pass |
| `tests/login-ddt.spec.ts` | should login successfully for valid user: tomsmith | Data-Driven Functional UI | ✅ Pass |
| `tests/login-ddt.spec.ts` | should show correct error for invalid user: wronguser | Data-Driven Negative UI | ✅ Pass |
| `tests/login-ddt.spec.ts` | should show correct error for invalid user: tomsmith | Data-Driven Negative UI | ✅ Pass |
| `tests/login-ddt.spec.ts` | should show correct error for empty credentials | Data-Driven Negative UI | ✅ Pass |
| `tests/checkbox.spec.ts` | should show both checkboxes | Functional UI | ✅ Pass |
| `tests/checkbox.spec.ts` | should toggle first checkbox and verify state changed | Functional UI | ✅ Pass |
| `tests/checkbox.spec.ts` | should toggle second checkbox and verify state changed | Functional UI | ✅ Pass |
| `tests/dropdown.spec.ts` | should show dropdown | Functional UI | ✅ Pass |
| `tests/dropdown.spec.ts` | should select 'Option 1' and verify | Functional UI | ✅ Pass |
| `tests/dropdown.spec.ts` | should select 'Option 2' and verify | Functional UI | ✅ Pass |

## CI/CD Pipeline Section

This project uses GitHub Actions to run automated tests in CI. Every push to `main` triggers automatic test execution. Pull requests targeting `main` also trigger the same workflow, helping validate changes before they are merged.

When code is pushed to GitHub, the workflow performs these steps:

1. Checks out the repository code
2. Sets up Node.js 20
3. Installs dependencies using `npm ci`
4. Installs Playwright browsers and Linux dependencies using `npx playwright install --with-deps`
5. Runs the full test suite using `npx playwright test`
6. Uploads the Playwright HTML report as a workflow artifact
7. Uploads `test-results/` only when a failure occurs

You can find the CI run by opening the repository on GitHub and selecting the **Actions** tab. Each workflow run shows logs for installation, browser setup, and test execution. Artifacts such as `playwright-report` and failure `test-results` are available from the completed workflow run page.

**Note:** Every push to main triggers automatic test execution.

## Test Reports

Generate the Playwright report by running:

```bash
npx playwright test
```

View the report locally with:

```bash
npx playwright show-report
```

The HTML report shows:

- Test name
- Test status
- Execution duration
- Error messages on failure
- Screenshots on failure when configured or captured
- Videos retained for failed scenarios
- Trace details when retries are enabled
- Browser and project information

Reports are also uploaded to GitHub Actions as artifacts, so test results can be reviewed after CI execution without running the project locally.

## What I Learned

This project helped me understand how real QA automation frameworks are structured and maintained. Instead of writing isolated scripts, I learned how to organize tests in a way that can grow with the application.

Important things I learned:

- How to apply the **Page Object Model** design pattern
- How to use **TypeScript** in a real testing project
- How interfaces make test data and page objects easier to understand
- How to implement **Data-Driven Testing** with external JSON files
- How to set up a **CI/CD pipeline** from scratch using GitHub Actions
- How to write maintainable and scalable test code
- How real-world QA engineers separate locators, actions, assertions, and data
- How automated reports help debug test failures faster

This project is not only a final year submission, but also a practical step toward becoming confident with professional QA automation workflows.

## Future Improvements

Planned improvements for this framework:

- Add API testing using the Playwright API testing module
- Integrate Allure Report for richer reporting
- Add visual regression testing for UI comparison
- Add database validation for end-to-end data checks
- Expand parallel execution across more browsers
- Add environment configuration using `.env` files for staging and production URLs
- Add reusable fixtures for authenticated sessions
- Add linting and formatting tools for stronger code quality

## License

This project is licensed under the **MIT License**.

## Author Section

**Bedi Gupta** | BCA 6th Semester | [GitHub](https://github.com/thebedigupta)

Built as a final year project and as part of my QA automation learning journey.
