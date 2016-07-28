package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.pantheon.UserAccountSteps;
import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_PublishAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class PD_PublishAPIDefinition {

    private String apiKey = "{apikey}";

    @Steps
    PD_PublishAPISteps publishAPIPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Publish API page")
    public void openPublishAPIPage() {
        publishAPIPage.closePage();
        publishAPIPage.maximiseBrowserWindow();
        publishAPIPage.openPage();
    }

    @When("User is logged to site (Publish API)")
    public void openLogInPageAndLogIn() {
        publishAPIPage.clickLogIn();
        userLogInPage.logInToAccount();
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
        publishAPIPage.checkAPIKeyPlaceholders(apiKey);
    }

}
