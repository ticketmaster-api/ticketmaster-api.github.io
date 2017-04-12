package com.tkmdpa.taf.pages;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;

public class AnyPage extends AncestorPage {

    @FindBy(xpath = "//h3[text()='Error']")
    private WebElementFacade errorMessage;

    @FindBy(xpath = "//button[text()='Ok']")
    private WebElementFacade successfulSentEmailNotificationOKButton;

    public void keyPageElementIsVisible(String xpath) {
        element(By.xpath(xpath)).shouldBeVisible();
    }

    public WebElementFacade getErrorMessage() {
        return errorMessage;
    }

    public WebElementFacade getSuccessfulSentEmailNotificationOKButton() {
        return successfulSentEmailNotificationOKButton;
    }

}
