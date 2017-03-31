package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.definitions.CommonDefinition;
import com.tkmdpa.taf.steps.pantheon.UserAccountSteps;
import com.tkmdpa.taf.steps.pantheon.UserLogInSteps;
import com.tkmdpa.taf.steps.products_and_docs.PD_PublishAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static net.serenitybdd.core.Serenity.getCurrentSession;

public class PD_PublishAPIDefinition extends CommonDefinition{

    @Steps
    PD_PublishAPISteps publishAPIPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Publish API page")
    @When("open Publish API page")
    public void openPublishAPIPage() {
        publishAPIPage.openPage();
    }

    @When("Production Production user is logged to site (Publish API)")
    public void openLogInPageAndLogIn() {
        publishAPIPage.clickLogIn();
        userLogInPage.logInToApp((String) getCurrentSession().get("username"), (String) getCurrentSession().get("password"));
        apiKey = userAccountSteps.getAPIKeyOfUser();
        publishAPIPage.openPage();
    }

    @Then("check general page elements for Publish API Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        publishAPIPage.checkIfTitleIsCorrect();
        publishAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Publish API page")
    public void checkAPIKeyPlaceholders(){
        String tempApiKey = (String) getCurrentSession().get("apiKey");
        publishAPIPage.checkAPIKeyPlaceholders(tempApiKey);
    }

}
