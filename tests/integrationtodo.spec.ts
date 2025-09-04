import { test, expect } from "@playwright/test";

test.describe("TodoList Integration", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("should add a new todo", async ({ page }) => {
    await page.fill('input[placeholder="Enter a task..."]', "Learn Playwright");
    await page.click('button:has-text("Add")');

    await expect(page.locator("ul li")).toContainText("Learn Playwright");
  });

  test("should toggle a todo as completed", async ({ page }) => {
    await page.fill('input[placeholder="Enter a task..."]', "Complete me");
    await page.click('button:has-text("Add")');

    const todo = page.locator("ul li span", { hasText: "Complete me" });
    await todo.click();

    await expect(todo).toHaveClass(/line-through/);
  });

//   test("should edit a todo", async ({ page }) => {
//     await page.fill('input[placeholder="Enter a task..."]', "Old Task");
//     await page.click('button:has-text("Add")');

//     // Click edit
//     const todoItem = page.locator("ul li", { hasText: "Old Task" });
//     await todoItem.locator('button:has-text("Edit")').click();

//     // Fill only the editing input inside the todo
//     // const editInput = todoItem.locator('input[type="text"]');
//     // await editInput.fill("Updated Task");

//     await todoItem.locator('button:has-text("Save")').click();

//     await expect(todoItem).toContainText("Updated Task");
//   });

  test("should delete a todo", async ({ page }) => {
    await page.fill('input[placeholder="Enter a task..."]', "Delete me");
    await page.click('button:has-text("Add")');

    const todoItem = page.locator("ul li", { hasText: "Delete me" });
    await todoItem.locator('button:has-text("Delete")').click();

    await expect(todoItem).toHaveCount(0); // ✅ ensures it's gone
  });

  test("should filter active and completed todos", async ({ page }) => {
    await page.fill('input[placeholder="Enter a task..."]', "Task 1");
    await page.click('button:has-text("Add")');
    await page.fill('input[placeholder="Enter a task..."]', "Task 2");
    await page.click('button:has-text("Add")');

    await page.click("ul li span:has-text('Task 1')");

    await page.click('button:has-text("Active")');
    await expect(page.locator("ul li")).toContainText("Task 2");
    await expect(page.locator("ul li")).not.toContainText("Task 1");

    await page.click('button:has-text("Completed")');
    await expect(page.locator("ul li")).toContainText("Task 1");
    await expect(page.locator("ul li")).not.toContainText("Task 2");
  });

  test("should clear completed todos", async ({ page }) => {
    await page.fill('input[placeholder="Enter a task..."]', "Clear me");
    await page.click('button:has-text("Add")');

    await page.click("ul li span:has-text('Clear me')");
    await page.click('button:has-text("Clear Completed")');

    await expect(page.locator("ul li", { hasText: "Clear me" })).toHaveCount(0); // ✅ more reliable
  });
});
