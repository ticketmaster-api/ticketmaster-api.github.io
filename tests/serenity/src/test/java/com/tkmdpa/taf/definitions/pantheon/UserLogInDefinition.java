package com.tkmdpa.taf.definitions.pantheon;

import com.tkmdpa.taf.steps.pantheon.UserLogInSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;
import org.json.simple.JSONObject;

import static net.serenitybdd.core.Serenity.getCurrentSession;

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

    @Given("navigate to Pantheon User Account page from LogIn page")
    @When("navigate to Pantheon User Account page from LogIn page")
    public void openUserAccountPage(){
        userLogInPage.logInToApp((String)getCurrentSession().get("username"), (String)getCurrentSession().get("password"));
    }

    @When("login to Pantheon with $username and $password")
    public void logInToApp(String username, String password){
        userLogInPage.logInToApp(username, password);
    }

    @When("login to Pantheon using OpenID $invalidOpenID")
    public void lodInUsingOpenId(String openID){
        userLogInPage.logInUsingOpenID(openID);
    }

    @Then("check general page elements for Pantheon User LogIn page")
    public void checkGeneralPageElements(){
        userLogInPage.checkIfTitleIsCorrect();
        userLogInPage.checkGeneralPageElements();
    }

    public String getLogin(JSONObject jsonObject) {
        return (String) jsonObject.get("username");
    }

    public String getPassword(JSONObject jsonObject) {
        return (String) jsonObject.get("password");
    }
}
