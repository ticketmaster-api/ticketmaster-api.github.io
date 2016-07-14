package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.pantheon.UserAccountSteps;
import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_APIExplorerSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static org.junit.Assert.assertTrue;

public class PD_APIExplorerDefinition {

    private String apiKey = "{apikey}";

    @Steps
    PD_APIExplorerSteps apiExplorerPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open API Explorer page")
    public void givenOpenAPIExplorerPage() {
        apiExplorerPage.maximiseBrowserWindow();
        apiExplorerPage.openPage();
    }

    @When("User is not logged to site (API Explorer)")
    public void openLogInPageAndCheckUserIsNotLoggedIn() {
        apiExplorerPage.clickLogIn();
        userLogInPage.isPageOpened();
        apiExplorerPage.openPage();
    }

    @When("User is logged to site (API Explorer)")
    public void openLogInPageAndLogIn() {
        apiExplorerPage.clickLogIn();
        userLogInPage.logInToAccount();
        apiKey = userAccountSteps.getAPIKeyOfUser();
        apiExplorerPage.openPage();
    }

    @Then("check general page elements for API Explorer Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        apiExplorerPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on API Explorer page")
    public void checkAPIKeyPlaceholders(){
        apiExplorerPage.checkAPIKeyPlaceholders(apiKey);
    }

}
