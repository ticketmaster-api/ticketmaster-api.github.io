package com.tkmdpa.taf.pages;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;

public class AnyPage extends AncestorPage {

    @FindBy(xpath = "//h3[text()='Error']")
    private WebElementFacade errorMessage;

    @FindBy(xpath = "//button[text()='Ok']")
    private WebElementFacade successfulSentEmailNotificationOKButton;

    @FindBy(xpath = "//ul/li/a[@href=\"/user/logout\"]")
    private WebElementFacade logOutLink;

    @FindBy(xpath = "//a[@class='dropdown-toggle']")
    private WebElementFacade logOutButton;

    public void keyPageElementIsVisible(String xpath) {
        element(By.xpath(xpath)).shouldBeVisible();
    }

    public WebElementFacade getErrorMessage() {
        return errorMessage;
    }

    public WebElementFacade getSuccessfulSentEmailNotificationOKButton() {
        return successfulSentEmailNotificationOKButton;
    }

    public WebElementFacade getLogOutButton() {
        return logOutButton;
    }

    public WebElementFacade getLogOutLink() {
        return logOutLink;
    }
}
