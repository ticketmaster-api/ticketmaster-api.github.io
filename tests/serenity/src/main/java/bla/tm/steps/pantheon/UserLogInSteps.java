package bla.tm.steps.pantheon;

import bla.tm.pages.pantheon.UserLogInPage;
import net.thucydides.core.annotations.Step;
import static org.junit.Assert.assertTrue;

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
        assertTrue(userLogInPage.getCreateNewAccountButton().isVisible());
    }
}
