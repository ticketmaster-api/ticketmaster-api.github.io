package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.steps.pantheon.UserAccountSteps;
import com.tkmdpa.taf.steps.pantheon.UserLogInSteps;
import com.tkmdpa.taf.steps.products_and_docs.PD_InteractiveAPIConsoleSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static net.serenitybdd.core.Serenity.getCurrentSession;

public class PD_InteractiveAPIConsoleDefinition {

    private String apiKey = "{apikey}";

    @Steps
    PD_InteractiveAPIConsoleSteps interactiveAPIConsolePage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Interactive API Console page")
    public void openInteractiveAPIConsolePage() {
        interactiveAPIConsolePage.openPage();
    }

    @When("User is not logged to site (Interactive API Console)")
    public void openLogInPageAndCheckUserIsNotLoggedIn() {
        interactiveAPIConsolePage.clickLogIn();
        userLogInPage.isPageOpened();
        interactiveAPIConsolePage.openPage();
    }

    @When("User is logged to site (Interactive API Console)")
    public void openLogInPageAndLogIn() {
        interactiveAPIConsolePage.clickLogIn();
        userLogInPage.logInToApp((String) getCurrentSession().get("username"), (String) getCurrentSession().get("password"));
        apiKey = userAccountSteps.getAPIKeyOfUser();
        interactiveAPIConsolePage.openPage();
    }

    @Then("check general page elements for Interactive API Console Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        interactiveAPIConsolePage.checkIfTitleIsCorrect();
        interactiveAPIConsolePage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Interactive API Console page")
    public void checkAPIKeyPlaceholders(){
        interactiveAPIConsolePage.checkAPIKeyPlaceholders(apiKey);
    }

}
