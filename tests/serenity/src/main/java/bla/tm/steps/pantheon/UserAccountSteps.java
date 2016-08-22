package bla.tm.steps.pantheon;

import bla.tm.pages.pantheon.UserAccountPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class UserAccountSteps {

    UserAccountPage userAccountPage;

    @Step
    public String getAPIKeyOfUser() {
        userAccountPage.getFirstUserAccount().click();
        return userAccountPage.getCustomerKey().getText();
    }

    @Step
    public void checkGeneralPageElements(){
        userAccountPage.checkGeneralPageElementsPantheonLoggedIn();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (userAccountPage.pageHeader, userAccountPage.getTitleText());
    }

    @Step
    public void navigateToEditProfilePage(){
        userAccountPage.getLoggedUserEmailLink().click();
        userAccountPage.getEditProfileLink().click();
    }

    @Step
    public void navigateToAddNewAppPage(){
        userAccountPage.getAddNewAppButton().click();
    }

}
