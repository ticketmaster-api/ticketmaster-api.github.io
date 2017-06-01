package com.tkmdpa.taf.steps.pantheon;

import com.tkmdpa.taf.pages.AnyPage;
import com.tkmdpa.taf.pages.pantheon.UserLogInPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class UserLogInSteps {

    UserLogInPage userLogInPage;
    AnyPage anyPage;

    @Step
    public void logInToApp(String userName, String password) {
        userLogInPage.getNameTextField().sendKeys(userName);
        userLogInPage.getPasswordTextField().sendKeys(password);
        userLogInPage.getLogInButton().click();
        anyPage.waitForAjaxToComplete();
        anyPage.waitForPageReadyStateComplete();
    }

    @Step
    public void isPageOpened() {
        userLogInPage.getCreateNewAccountButton().shouldBeVisible();
    }

    @Step
    public void checkGeneralPageElements(){
        userLogInPage.checkGeneralPageElementsPantheon();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (userLogInPage.PAGE_HEADER, userLogInPage.getTitleText());
    }

    @Step
    public void clickForgotYourPasswordLink(){
        userLogInPage.getForgotYourPasswordLink().click();
    }

    @Step
    public void clickCreateNewAccountButton() {
        userLogInPage.getCreateNewAccountButton().click();
    }

    public void logInUsingOpenID(String openID) {
        userLogInPage.getOpenIDButton().click();
        userLogInPage.getOpenIdInputField().sendKeys(openID);
        userLogInPage.getLogInButton().click();
    }
}
