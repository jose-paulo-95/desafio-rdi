# Step 2 Response - Restaurant System

# Questions for the PO - Restaurant System

Before creating test scenarios, I would likely ask these questions to the team's PO during planning for better understanding of the requirements

# About the Point of Sale (POS):

- What are the mandatory fields for registering an order in the POS?
- How is order data validated before sending to the kitchen?
- Is there any confirmation flow before sending the order to the kitchen?
- How are modified orders handled (e.g., no onions, well done)?
- How are typos or incorrect orders handled?

# About Kitchen Monitors:

- What are the criteria for displaying colors and icons on the monitors? - What colors will be used? - What icons will be used?
- How is order receipt confirmation done in the kitchen?
- Is there any notification system when a new order arrives?
- How is the time control between order receipt and preparation handled?

# About Order Flow:

- What is the expected time between order registration and delivery to the customer?
- How is order delivery confirmation to the customer done?
- How are takeout/delivery orders handled?

## BDD (Behavior Driven Development)

### 1. POS Validations
```guerkin
Feature: POS System Validation
As a restaurant attendant
I want to validate the POS system functionality
To ensure orders are registered correctly

Scenario: Check POS system accessibility
Given the attendant is on the initial screen
When they try to access the POS system
Then the system should be accessible and load correctly

Scenario: Validate product listing
Given the POS system is accessible
When the attendant views the product list
Then all products should be listed correctly
And prices should be updated

Scenario: Successfully register order
Given the attendant is in the POS system
When they select order items
And click the finish order button
Then the order should be registered successfully
And a confirmation should be displayed

Scenario: Validate product prices
Given the POS system is accessible
When the attendant checks product prices
Then all prices should be correct
And updated according to current table

Scenario: Test finish order button
Given the attendant is in the POS system
When they try to finish an order
Then the button should be working correctly
And should process the order properly
```
### 2. Kitchen Monitor Validations

```guerkin
Feature: Kitchen Monitor Validation
As a kitchen staff member
I want to validate the monitor functionality
To ensure orders are viewed correctly

Scenario: View new order on monitors
Given an order was registered in the POS
When the order is transmitted to the monitors
Then the order should appear on kitchen monitors
And colors and icons should be correct

Scenario: Order status update
Given an order is visible on monitors
When the order status is changed
Then the update should be reflected immediately
And information should be complete

Scenario: Validate color and icon display
Given an order is on the monitors
When the order is displayed
Then colors should follow the standard
And icons should correctly represent the order type

Scenario: Check complete order information
Given an order is on the monitors
When the order is viewed
Then all information should be present
And organized clearly and legibly
```
### 3. Complete Flow Validations
```guerkin
Feature: Complete Order Flow Validation
As a restaurant manager
I want to validate the complete order flow
To ensure process efficiency

Scenario: Customer successfully places meal order
Given the customer is in the restaurant
When the customer places a meal order
And the team registers the order in the POS system
Then the order should appear on kitchen monitors
And the kitchen team should prepare the meal
And the meal should be delivered to the customer

Scenario: Status update in all stages
Given an order is in progress
When status is changed at any stage
Then all interfaces should be updated
And change history should be maintained

Scenario: Validate processing time
Given an order was registered
When the order is processed
Then total time should be within expected
And should follow established pattern

Scenario: Check change history
Given an order is in progress
When status changes are made
Then history should be recorded
And all changes should be viewable
```
## Automation Scenarios

1. **Automation Scenarios**

   - Scenarios to be automated:

     1. Customer successfully places meal order
     2. Validate product listing
     3. Successfully register order
     4. Validate product prices - API only
     5. Test finish order button
     6. View new order on monitors
     7. Order status update
     8. Check complete order information

   - Manual scenarios:

     1. Check POS system accessibility
     2. Usability and user experience tests
     3. Validate color and icon display

   - Performance Scenarios
     1. Time and performance validations

2. **Automation Strategy**
   - Use Cypress for web automation
   - Implement API tests for backend validations
   - Create automated execution reports
   - Implement CI/CD for continuous execution

## Pseudo-código da Automação (Cypress)

```javascript
describe("Restaurant System", () => {
  beforeEach(() => {
    cy.visit("/pos");
    cy.intercept("POST", "/api/orders").as("registerOrder");
    cy.intercept("GET", "/api/kitchen-monitors/*").as("checkOrder");
  });

  it("Customer successfully places meal order", () => {

    // POS test
    cy.get('[data-testid="product-list"]').should("be.visible");
    cy.get('[data-testid="food"]').click();
    cy.get('[data-testid="drink"]').click();
    cy.intercept('POST', '/api/orders', (req) => {
      const order = {
        id: "123",
        items: [
          {
            name: "X-Burger",
            quantity: 1,
            price: 25.90,
          },
          {
            name: "Coke",
            quantity: 1,
            price: 8.90
          }
        ],
        total: 34.80,
        status: "new",
        timestamp: "2024-03-20T15:30:00Z"
      };
      cy.wrap(orderData).as('orderData');
    }).as('registerOrder');
    
    cy.get('[data-testid="finish-order-button"]').click();

    // Verify order registration
    cy.wait("@registerOrder").its("response.statusCode").should("eq", 200);
    cy.get('[data-testid="order-status"]').should("contain", "registered");

    // Verify transmission to monitors
    cy.visit("/kitchen-monitors");
    cy.wait("@checkOrder").its("response.statusCode").should("eq", 200);
    cy.get(`[data-testid="order-${order.id}"]`).should("be.visible");
    cy.get(`[data-testid="order-${order.id}"]`).should(
      "have.class",
      "new-order"
    );

    // Simulate preparation
    cy.get(`[data-testid="order-${order.id}"]`)
      .find('[data-testid="start-preparation-button"]')
      .click();
    cy.get(`[data-testid="order-${order.id}"]`).should(
      "have.class",
      "in-preparation"
    );

    // Simulate delivery
    cy.get(`[data-testid="order-${order.id}"]`)
      .find('[data-testid="finish-preparation-button"]')
      .click();
    cy.get(`[data-testid="order-${order.id}"]`).should(
      "have.class",
      "delivered"
    );
  });
});
```

## Response for Non-Automatable Components

If it were not possible to automate some system component, I would proceed as follows:

1. **Detailed Documentation:**

   - Create detailed documentation of required manual tests
   - Describe test steps, input data, and expected results
   - Include screenshots and videos when relevant

2. **Exploratory Testing:**

   - Conduct structured exploratory testing sessions
   - Document tested scenarios and findings
   - Focus on high-risk areas

3. **Manual Regression Testing:**

   - Create a manual regression test suite
   - Prioritize critical scenarios
   - Establish execution frequency

4. **Monitoring:**

   - Implement detailed system logs
   - Create monitoring dashboards
   - Establish alerts for unexpected behaviors

5. **Integration with Automated Tests:**
   - Integrate manual tests with automated ones
   - Create checkpoints where manual and automated tests meet
   - Maintain clear records of what is automated and what is manual
