package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.pantheon.UserAccountSteps;
import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_Widget_EventDiscoverySteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class PD_Widget_EventDiscoveryDefinition {

    private String apiKey = "{apikey}";

    @Steps
    PD_Widget_EventDiscoverySteps eventDiscoveryWidgetPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Event Discovery Widget page")
    public void openEventDiscoveryWidgetPage() {
        eventDiscoveryWidgetPage.closePage();
        eventDiscoveryWidgetPage.maximiseBrowserWindow();
        eventDiscoveryWidgetPage.openPage();
    }

    @When("User is not logged to site (Event Discovery Widget)")
    public void openLogInPageAndCheckUserIsNotLoggedIn() {
        eventDiscoveryWidgetPage.clickLogIn();
        userLogInPage.isPageOpened();
        eventDiscoveryWidgetPage.openPage();
    }

    @When("User is logged to site (Event Discovery Widget)")
    public void openLogInPageAndLogIn() {
        eventDiscoveryWidgetPage.clickLogIn();
        userLogInPage.logInToAccount();
        apiKey = userAccountSteps.getAPIKeyOfUser();
        eventDiscoveryWidgetPage.openPage();
    }

    @Then("check general page elements for Event Discovery Widget Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        eventDiscoveryWidgetPage.checkIfTitleIsCorrect();
        eventDiscoveryWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Event Discovery Widget page")
    public void checkAPIKeyPlaceholders(){
        eventDiscoveryWidgetPage.checkAPIKeyPlaceholders(apiKey);
    }

}
