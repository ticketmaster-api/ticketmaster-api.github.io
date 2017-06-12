package com.tkmdpa.taf.definitions.pantheon;

import com.tkmdpa.taf.steps.pantheon.UserAccountSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class UserAccountDefinition {

    @Steps
    UserAccountSteps userAccountPage;

    @When("navigate to Pantheon Edit Profile page from User Account page")
    public void navigateToEditProfile(){
        userAccountPage.navigateToEditProfilePage();
    }

    @Given("navigate to Pantheon Add New App page from User Account page")
    @When("navigate to Pantheon Add New App page from User Account page")
    public void navigateToAddNewApp(){
        userAccountPage.navigateToAddNewAppPage();
    }

    @Given("all the applications were deleted")
    public void allAppsWereDeleted(){
        userAccountPage.deleteAllApps();
    }

    @Then("check general page elements for Pantheon User Account page")
    public void checkGeneralPageElements(){
        userAccountPage.checkIfTitleIsCorrect();
        userAccountPage.checkGeneralPageElements();
    }

}
