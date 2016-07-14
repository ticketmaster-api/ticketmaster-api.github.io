package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.pantheon.UserAccountSteps;
import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_Widget_CountdownSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static org.junit.Assert.assertTrue;

public class PD_Widget_CountdownDefinition {

    private String apiKey = "{apikey}";

    @Steps
    PD_Widget_CountdownSteps countdownWidgetPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Countdown Widget page")
    public void givenOpenCountdownWidgetPage() {
        countdownWidgetPage.maximiseBrowserWindow();
        countdownWidgetPage.openPage();
    }

    @When("User is not logged to site (Countdown Widget)")
    public void openLogInPageAndCheckUserIsNotLoggedIn() {
        countdownWidgetPage.clickLogIn();
        userLogInPage.isPageOpened();
        countdownWidgetPage.openPage();
    }

    @When("User is logged to site (Countdown Widget)")
    public void openLogInPageAndLogIn() {
        countdownWidgetPage.clickLogIn();
        userLogInPage.logInToAccount();
        apiKey = userAccountSteps.getAPIKeyOfUser();
        countdownWidgetPage.openPage();
    }

    @Then("check general page elements for Countdown Widget Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        countdownWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Countdown Widget page")
    public void checkAPIKeyPlaceholders(){
        countdownWidgetPage.checkAPIKeyPlaceholders(apiKey);
    }
}
