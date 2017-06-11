package com.tkmdpa.taf.steps.pantheon;

import com.tkmdpa.taf.pages.AnyPage;
import com.tkmdpa.taf.pages.pantheon.AddNewAppPage;
import com.tkmdpa.taf.pages.pantheon.UserAccountPage;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class UserAccountSteps {

    UserAccountPage userAccountPage;

    AddNewAppPage addNewAppPage;

    AnyPage anypage;

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

    public void deleteAllApps() {
        if (addNewAppPage.check_if_app_is_present()) {
            for (WebElementFacade appsElement : addNewAppPage.getListOfApps()) {
                addNewAppPage.clickOnApp();
                addNewAppPage.clickDelete();
                anypage.waitForAjaxToComplete();
                anypage.waitForPageReadyStateComplete();
            }
        }
    }
}
