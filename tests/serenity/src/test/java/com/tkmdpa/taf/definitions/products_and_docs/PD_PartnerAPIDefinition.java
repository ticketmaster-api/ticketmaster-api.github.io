package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.steps.pantheon.UserAccountSteps;
import com.tkmdpa.taf.steps.pantheon.UserLogInSteps;
import com.tkmdpa.taf.steps.products_and_docs.PD_PartnerAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static net.serenitybdd.core.Serenity.getCurrentSession;

public class PD_PartnerAPIDefinition {

    private String apiKey = "{apikey}";

    @Steps
    PD_PartnerAPISteps partnerAPIPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Partner API page")
    public void openPartnerAPIPage() {
        partnerAPIPage.openPage();
    }

    @When("User is logged to site (Partner API)")
    public void openLogInPageAndLogIn() {
        partnerAPIPage.clickLogIn();
        userLogInPage.logInToApp((String) getCurrentSession().get("username"), (String) getCurrentSession().get("password"));
        apiKey = userAccountSteps.getAPIKeyOfUser();
        partnerAPIPage.openPage();
    }

    @Then("check general page elements for Partner API Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        partnerAPIPage.checkIfTitleIsCorrect();
        partnerAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Partner API page")
    public void checkAPIKeyPlaceholders(){
        partnerAPIPage.checkAPIKeyPlaceholders(apiKey);
    }

}
