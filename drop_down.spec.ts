import { test, expect } from '@playwright/test';

test("Handling drop-downs with the select tag available", async ({ page }) => {
    // Arrange:
    await page.goto("https://www.leafground.com/select.xhtml");

    // Act:
    const selectDropdown = page.locator(".ui-selectonemenu").first();

    // Selecting an option by label
    await selectDropdown.selectOption("Selenium");

    // Selecting an option by value
    await selectDropdown.selectOption("Playwright");

    // Selecting an option by index
    await selectDropdown.selectOption({ index: 4 });

    // Assert:
    await expect(selectDropdown).toHaveValue('Cypress');


});



test("How to handle drop-downs when the select tag is not available", async ({ page }) => {
  
    // Navigate to the webpage containing the dropdown
    await page.goto("https://www.leafground.com/select.xhtml");

    // Locate the dropdown element using its ID
    const dropdown = page.locator('#j_idt87\\:country');
    
    // Click on the dropdown to expand it
    await dropdown.click();

    // Locate the 'India' option in the dropdown using its role and name
    const option = page.getByRole('option', { name: 'India' });
    
    // Click on the 'India' option to select it
    await option.click();

    // Assert that the selected value of the dropdown is 'India'
    await expect(page.locator('#j_idt87\\:country_label')).toHaveText('India');
});


test("Handling a Searchable Combobox with List Autocomplete", async ({ page }) => {
    await page.goto("https://www.leafground.com/select.xhtml");
  
    // Create a variable for the string 'Appium'
    const courseName = 'Appium';
  
    // Fill the combo box with 'Appium'
    const comboBox = page.getByPlaceholder('Choose Course');
    await comboBox.fill(courseName);
  
    // Open the combo box options
    const showOptionsButton = page.getByLabel('Show Options');
    await showOptionsButton.click();

    // Wait for the options to be loaded
    await page.waitForLoadState('domcontentloaded');

    // Select 'Appium' from the options
    const appiumOption = page.getByRole('option', { name: courseName });
    await appiumOption.click();
  
    // Assert that 'Appium' is selected
    const selectedOption = page.locator('.ui-autocomplete-token-label');
    await expect(selectedOption).toHaveText(courseName);
  });
