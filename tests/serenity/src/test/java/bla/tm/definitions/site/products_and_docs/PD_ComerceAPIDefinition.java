package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.pantheon.UserAccountSteps;
import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_CommerceAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class PD_ComerceAPIDefinition {

    private String apiKey = "{apikey}";

    @Steps
    PD_CommerceAPISteps commerceAPIPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Commerce API page")
    public void openCommerceAPIPage() {
        commerceAPIPage.closePage();
        commerceAPIPage.maximiseBrowserWindow();
        commerceAPIPage.openPage();
    }

    @When("User is logged to site (Commerce API)")
    public void openLogInPageAndLogIn() {
        commerceAPIPage.clickLogIn();
        userLogInPage.logInToAccount();
        apiKey = userAccountSteps.getAPIKeyOfUser();
        commerceAPIPage.openPage();
    }

    @Then("check general page elements for Commerce API Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        commerceAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Commerce API page")
    public void checkAPIKeyPlaceholders(){
        commerceAPIPage.checkAPIKeyPlaceholders(apiKey);
    }

}
