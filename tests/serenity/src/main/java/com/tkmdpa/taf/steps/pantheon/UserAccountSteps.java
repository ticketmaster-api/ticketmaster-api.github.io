package com.tkmdpa.taf.steps.pantheon;

import com.tkmdpa.taf.pages.pantheon.UserAccountPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class UserAccountSteps {

    UserAccountPage userAccountPage;

    @Step
    public String getAPIKeyOfUser() {
        userAccountPage.getFirstUserApplication().click();
        return userAccountPage.getConsumerKey().getText();
    }

    @Step
    public void checkGeneralPageElements(){
        userAccountPage.checkGeneralPageElementsPantheonLoggedIn();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (userAccountPage.PAGE_HEADER, userAccountPage.getTitleText());
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
