package com.tkmdpa.taf.pages.pantheon;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

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

    public List<WebElementFacade> getListOfApps() {
        return listOfApps;
    }

    @FindBy(xpath = "//a[@data-toggle='collapse']")
    private List<WebElementFacade> listOfApps;

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
        WebDriverWait wait = new WebDriverWait(getDriver(), 15);
        wait.until(ExpectedConditions.elementToBeClickable(deleteApp));
        deleteApp.click();
    }

    public boolean check_if_app_is_present() {
        try { return appLink.isDisplayed();
        } catch (NoSuchElementException e) {
            LOGGER.error(String.valueOf(e));
            return false;
        }
    }

}
