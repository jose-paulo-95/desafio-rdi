# RDI Challenge - Automated Tests

This project contains automated tests developed with Cypress to validate login functionalities in a web application.

## 🚀 Technologies Used

- [Cypress](https://www.cypress.io/) - End-to-end testing framework
- JavaScript

## 📋 Prerequisites

- Node.js (LTS version recommended)
- npm

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/jose-paulo-95/desafio-rdi
```

2. Install dependencies:

```bash
npm install

```

## 🧪 Running the Tests

To run the tests in interactive mode:

```bash
npm run test:open
```

To run the tests in headless mode:

```bash
npm run test:run
```

## 📁 Project structure

```
cypress/
  ├── e2e/
  │ └── web/
  │ └── Login/
  │ ├── Login.cy.js
  │ └── loginActions.js
```

## 📝 Test cases

The project includes the following test scenarios for the login functionality:

- Login with valid credentials
- Login attempt with invalid credentials
- Validation of required fields
- Email format validation
