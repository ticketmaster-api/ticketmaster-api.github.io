package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.pantheon.UserAccountSteps;
import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_InternationalDiscoveryAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class PD_InternationalDiscoveryAPIDefinition {

    private String apiKey = "{apikey}";

    @Steps
    PD_InternationalDiscoveryAPISteps internationalDiscoveryAPIPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open International Discovery API page")
    public void openInternationalDiscoveryAPIPage() {
        internationalDiscoveryAPIPage.closePage();
        internationalDiscoveryAPIPage.maximiseBrowserWindow();
        internationalDiscoveryAPIPage.openPage();
    }

    @When("User is logged to site (International Discovery API)")
    public void openLogInPageAndLogIn() {
        internationalDiscoveryAPIPage.clickLogIn();
        userLogInPage.logInToAccount();
        apiKey = userAccountSteps.getAPIKeyOfUser();
        internationalDiscoveryAPIPage.openPage();
    }

    @Then("check general page elements for International Discovery API Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        internationalDiscoveryAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on International Discovery API page")
    public void checkAPIKeyPlaceholders(){
        internationalDiscoveryAPIPage.checkAPIKeyPlaceholders(apiKey);
    }

}
