package bla.tm.pages.pantheon;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.WebElement;
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

    @FindBy(xpath = "//div[@class='error-summary']")
    private WebElementFacade errorMessage;

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
        WebElementFacade appNameWebElement = find(By.xpath(String.format("//label[text()='" + name + " ']/../input")));
        return appNameWebElement;
    }

    public WebElement getSaveButton() {
        return saveButton.getWrappedElement();
    }

    public WebElementFacade getAppNameInDetailsTab(String val) {
        WebElementFacade appName = find(By.xpath(String.format("//div[@class='table-responsive']/table/tbody/tr/td/strong[text()='"+val+"']/../../td[2]")));
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
}
