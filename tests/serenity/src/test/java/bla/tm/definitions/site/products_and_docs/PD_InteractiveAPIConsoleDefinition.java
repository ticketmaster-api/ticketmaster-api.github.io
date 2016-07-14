package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.pantheon.UserAccountSteps;
import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_InteractiveAPIConsoleSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static org.junit.Assert.assertTrue;

public class PD_InteractiveAPIConsoleDefinition {

    private String apiKey = "{apikey}";

    @Steps
    PD_InteractiveAPIConsoleSteps interactiveAPIConsolePage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Interactive API Console page")
    public void givenOpenInteractiveAPIConsolePage() {
        interactiveAPIConsolePage.maximiseBrowserWindow();
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
        userLogInPage.logInToAccount();
        apiKey = userAccountSteps.getAPIKeyOfUser();
        interactiveAPIConsolePage.openPage();
    }

    @Then("check general page elements for Interactive API Console Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        interactiveAPIConsolePage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Interactive API Console page")
    public void checkAPIKeyPlaceholders(){
        interactiveAPIConsolePage.checkAPIKeyPlaceholders(apiKey);
    }

}
