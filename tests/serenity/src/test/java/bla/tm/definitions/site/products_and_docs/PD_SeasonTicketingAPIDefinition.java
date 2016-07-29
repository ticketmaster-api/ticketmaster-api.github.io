package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.pantheon.UserAccountSteps;
import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_SeasonTicketingAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class PD_SeasonTicketingAPIDefinition {

    private String apiKey = "{apikey}";

    @Steps
    PD_SeasonTicketingAPISteps seasonTicketingAPIPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Season Ticketing API page")
    public void openSeasonTicketingAPIPage() {
        seasonTicketingAPIPage.closePage();
        seasonTicketingAPIPage.maximiseBrowserWindow();
        seasonTicketingAPIPage.openPage();
    }

    @When("User is logged to site (Season Ticketing API)")
    public void openLogInPageAndLogIn() {
        seasonTicketingAPIPage.clickLogIn();
        userLogInPage.logInToAccount();
        apiKey = userAccountSteps.getAPIKeyOfUser();
        seasonTicketingAPIPage.openPage();
    }

    @Then("check general page elements for Season Ticketing API Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        seasonTicketingAPIPage.checkIfTitleIsCorrect();
        seasonTicketingAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Season Ticketing API page")
    public void checkAPIKeyPlaceholders(){
        seasonTicketingAPIPage.checkAPIKeyPlaceholders(apiKey);
    }

}
