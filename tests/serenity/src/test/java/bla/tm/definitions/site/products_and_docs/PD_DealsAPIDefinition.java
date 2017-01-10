package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.pantheon.UserAccountSteps;
import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_DealsAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class PD_DealsAPIDefinition {

    private String apiKey = "{apikey}";

    @Steps
    PD_DealsAPISteps dealsAPIPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Deals API page")
    public void openDealsAPIPage() {
        dealsAPIPage.openPage();
    }

    @When("User is logged to site (Deals API)")
    public void openLogInPageAndLogIn() {
        dealsAPIPage.clickLogIn();
        userLogInPage.logInToAccount();
        apiKey = userAccountSteps.getAPIKeyOfUser();
        dealsAPIPage.openPage();
    }

    @Then("check general page elements for Deals API Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        dealsAPIPage.checkIfTitleIsCorrect();
        dealsAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Deals API page")
    public void checkAPIKeyPlaceholders(){
        dealsAPIPage.checkAPIKeyPlaceholders(apiKey);
    }

}
