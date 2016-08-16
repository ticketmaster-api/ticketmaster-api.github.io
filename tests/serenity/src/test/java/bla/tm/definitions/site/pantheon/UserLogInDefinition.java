package bla.tm.definitions.site.pantheon;

import bla.tm.steps.pantheon.UserLogInSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class UserLogInDefinition {

    @Steps
    UserLogInSteps userLogInPage;

    @When("navigate to Pantheon Request New Password page from LogIn page")
    public void openRequestNewPasswordPage() {
        userLogInPage.clickForgotYourPasswordLink();
    }

    @When("navigate to Pantheon Create New Account page from LogIn page")
    public void openCreateNewAccountPage() {
        userLogInPage.clickCreateNewAccountButton();
    }

    @When("navigate to Pantheon User Account page from LogIn page")
    public void openUserAccountPage(){
        userLogInPage.logInToAccount();
    }

    @Then("check general page elements for Pantheon User LonIn page")
    public void checkGeneralPageElements(){
        userLogInPage.checkIfTitleIsCorrect();
        userLogInPage.checkGeneralPageElements();
    }

}
