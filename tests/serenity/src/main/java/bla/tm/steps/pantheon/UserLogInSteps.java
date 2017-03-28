package bla.tm.steps.pantheon;

import bla.tm.pages.pantheon.UserLogInPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class UserLogInSteps {

    UserLogInPage userLogInPage;

    @Step
    public void logInToApp(String userName, String password) {
        userLogInPage.getNameTextField().sendKeys(userName);
        userLogInPage.getPasswordTextField().sendKeys(password);
        userLogInPage.getLogInButton().click();
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
        assertEquals (userLogInPage.pageHeader, userLogInPage.getTitleText());
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
        userLogInPage.getOpenIDInputField().sendKeys(openID);
        userLogInPage.getLogInButton().click();
    }
}
