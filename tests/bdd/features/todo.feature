Feature: Todo List management

  Scenario: Add a new todo item
    Given I open the Todo app
    When I add a todo "Buy milk"
    Then I should see "Buy milk" in the list

  Scenario: Mark todo as completed
    Given I open the Todo app
    And I add a todo "Wash car"
    When I toggle the todo "Wash car"
    Then the todo "Wash car" should be marked as completed

  Scenario: Delete a todo item
    Given I open the Todo app
    And I add a todo "Read book"
    When I delete the todo "Read book"
    Then I should not see "Read book" in the list
