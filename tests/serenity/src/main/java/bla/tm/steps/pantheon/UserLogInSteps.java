package bla.tm.steps.pantheon;

import bla.tm.pages.pantheon.UserLogInPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class UserLogInSteps {

    UserLogInPage userLogInPage;

    @Step
    public void logInToAccount() {
        userLogInPage.getNameTextField().sendKeys("TestUser");
        userLogInPage.getPasswordTextField().sendKeys("1234567");
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
}
