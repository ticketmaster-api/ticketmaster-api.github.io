package com.tkmdpa.taf.steps;

import com.tkmdpa.taf.pages.AnyPage;
import net.thucydides.core.annotations.Step;
import org.openqa.selenium.support.ui.ExpectedConditions;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class AnyPageSteps {

    AnyPage anyPage;

    @Step
    public void checkIfPageIsOpened(String url, String xpath, String defaultUrl){

        if (url.contains("{url}")) {
            assertEquals(anyPage.returnCurrentUrl(), url.replace("{url}", defaultUrl));}
        else {
            anyPage.waitFor(ExpectedConditions.urlContains(url));
            assertEquals(url, anyPage.returnCurrentUrl());
        }

        anyPage.keyPageElementIsVisible(xpath);
    }

    @Step
    public void clearCookiesAndLocalStorage(){
        anyPage.getDriver().manage().deleteAllCookies();
        anyPage.evaluateJavascript("window.localStorage.clear();");
    }

    @Step
    public void clickLogIn() {
        anyPage.getLogInButton().click();
    }

    @Step
    public void clickLogOut() {
        anyPage.getLogOutButton().click();
        ExpectedConditions.visibilityOf(anyPage.getLogOutLink().getWrappedElement());
        anyPage.getLogOutLink().click();
    }

    @Step
    public void checkErrorEmailSentNotificationIsShown() {
        assertTrue("Error message is absent", anyPage.getErrorMessage().getWrappedElement().getText().contains("Error"));
    }

    @Step
    public void checkEmailSentNotificationIsShown() {
        assertTrue(anyPage.getSuccessfulSentEmailNotificationOKButton().isVisible());
    }

    @Step
    public void clickSendButton() {
        anyPage.getSendButton().click();
    }
}
