const { Given, When, Then, After } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const assert = require("assert");

let browser;
let page;

Given("I open the Todo app", async function () {
  browser = await chromium.launch();
  const context = await browser.newContext();
  page = await context.newPage();
  const baseUrl = this.parameters?.baseUrl || "http://localhost:5173";
  await page.goto(baseUrl);
});

When("I add a todo {string}", async function (todoText) {
  await page.fill('input[placeholder="Enter a task..."]', todoText);
  await page.click('button:has-text("Add")');
});

Then("I should see {string} in the list", async function (todoText) {
  const locator = page.locator(`ul li:has-text("${todoText}")`);
  await locator.waitFor();
  assert.ok(await locator.count() > 0);
});

When("I toggle the todo {string}", async function (todoText) {
  await page.locator(`ul li:has-text("${todoText}") >> span`).click();
});

Then("the todo {string} should be marked as completed", async function (todoText) {
  const todoSpan = page.locator(`ul li:has-text("${todoText}") >> span`);
  const className = await todoSpan.getAttribute("class");
  assert.ok(className && className.includes("line-through"));
});

When("I delete the todo {string}", async function (todoText) {
  const item = page.locator(`ul li:has-text("${todoText}")`);
  await item.locator('button:has-text("Delete")').click();
});

Then("I should not see {string} in the list", async function (todoText) {
  const locator = page.locator(`ul li:has-text("${todoText}")`);
  await page.waitForTimeout(200);
  assert.strictEqual(await locator.count(), 0);
});

After(async function () {
  if (browser) {
    await browser.close();
    browser = null;
    page = null;
  }
});
