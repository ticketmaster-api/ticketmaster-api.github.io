package bla.tm.definitions.site.products_and_docs;

import bla.tm.definitions.site.pantheon.UserData;
import bla.tm.steps.pantheon.UserAccountSteps;
import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_InternationalDiscoveryAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class PD_InternationalDiscoveryAPIDefinition {

    private UserData admin = new UserData("UserData", "1234567");
    private String apiKey = "{apikey}";

    @Steps
    PD_InternationalDiscoveryAPISteps internationalDiscoveryAPIPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open International Discovery API page")
    public void openInternationalDiscoveryAPIPage() {
        internationalDiscoveryAPIPage.openPage();
    }

    @When("User is logged to site (International Discovery API)")
    public void openLogInPageAndLogIn() {
        internationalDiscoveryAPIPage.clickLogIn();
        userLogInPage.logInToApp(admin.username, admin.password);
        apiKey = userAccountSteps.getAPIKeyOfUser();
        internationalDiscoveryAPIPage.openPage();
    }

    @Then("check general page elements for International Discovery API Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        internationalDiscoveryAPIPage.checkIfTitleIsCorrect();
        internationalDiscoveryAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on International Discovery API page")
    public void checkAPIKeyPlaceholders(){
        internationalDiscoveryAPIPage.checkAPIKeyPlaceholders(apiKey);
    }

}
