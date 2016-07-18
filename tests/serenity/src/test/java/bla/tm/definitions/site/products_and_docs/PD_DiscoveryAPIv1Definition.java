package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.pantheon.UserAccountSteps;
import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_DiscoveryAPIv1Steps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class PD_DiscoveryAPIv1Definition {

    private String apiKey = "{apikey}";

    @Steps
    PD_DiscoveryAPIv1Steps discoveryAPIv1Page;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Discovery API v1 page")
    public void openDiscoveryAPIv1Page() {
        discoveryAPIv1Page.closePage();
        discoveryAPIv1Page.maximiseBrowserWindow();
        discoveryAPIv1Page.openPage();
    }

    @When("User is not logged to site (Discovery API v1)")
    public void openLogInPageAndCheckUserIsNotLoggedIn() {
        discoveryAPIv1Page.clickLogIn();
        userLogInPage.isPageOpened();
        discoveryAPIv1Page.openPage();
    }

    @When("User is logged to site (Discovery API v1)")
    public void openLogInPageAndLogIn() {
        discoveryAPIv1Page.clickLogIn();
        userLogInPage.logInToAccount();
        apiKey = userAccountSteps.getAPIKeyOfUser();
        discoveryAPIv1Page.openPage();
    }

    @Then("check general page elements for Discovery API v1 Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        discoveryAPIv1Page.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Discovery API v1 page")
    public void checkAPIKeyPlaceholders(){
        discoveryAPIv1Page.checkAPIKeyPlaceholders(apiKey);
    }

}
