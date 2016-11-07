package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.pantheon.UserAccountSteps;
import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_PartnerAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

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
        userLogInPage.logInToAccount();
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
