package com.tkmdpa.taf.pages.pantheon;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class AddNewAppPage extends AncestorPage {

    @FindBy(xpath = "//input[@name='human']")
    private WebElementFacade nameTextInput;

    @FindBy(xpath = "//a[text()='Edit']")
    private WebElementFacade editButton;

    @FindBy(xpath = "//a[@data-toggle='collapse']")
    private WebElementFacade appLink;

    @FindBy(id = "edit-submit")
    private WebElementFacade saveButton;

    @FindBy(xpath = "//a[text()='Details']")
    private WebElementFacade detailsTab;

    @FindBy(xpath = "//div[@class='jGrowl-message']")
    private WebElementFacade errorMessage;

    @FindBy(xpath = "//a[text()='Delete']")
    private WebElementFacade deleteButton;

    @FindBy(id = "edit-submit")
    private WebElementFacade deleteApp;

    @FindBy(xpath = "//h1")
    private WebElementFacade noAppsMessage;

    public WebElementFacade getNameTextInput() {
        return nameTextInput;
    }

    public void clickEditButton() {
        editButton.click();
    }

    public void clickOnApp() {
        appLink.click();
    }

    public WebElementFacade getAppNameWebElement(String name) {
        WebElementFacade appNameWebElement = find(By.xpath(String.format("//label[text()='%s ']/../input", name)));
        return appNameWebElement;
    }

    public WebElementFacade getSaveButton() {
        return saveButton;
  
    }

    public WebElementFacade getAppNameInDetailsTab(String val) {
        WebElementFacade appName = find(By.xpath(String.format("//div[@class='table-responsive']/table/tbody/tr/td/strong[text()='%s']/../../td[2]", val)));
        return appName;
    }

    public WebElementFacade getDetailsTab() {
        WebDriverWait wait = new WebDriverWait(getDriver(), 15);
        wait.until(ExpectedConditions.elementToBeClickable(detailsTab));
        return detailsTab;
    }

    public WebElementFacade getPopUpMessage() {
        return errorMessage;
    }

    public WebElementFacade getAppName() {
        return appLink;
    }

    public void clickDelete() {
        deleteButton.click();
        deleteApp.click();
    }

    public boolean checkIsPresent() {
        try { return appLink.isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    public WebElementFacade getNoApplicationText() {
        return noAppsMessage;
    }

}
