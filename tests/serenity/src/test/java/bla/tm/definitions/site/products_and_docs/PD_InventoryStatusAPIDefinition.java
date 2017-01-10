package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.pantheon.UserAccountSteps;
import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_InventoryStatusAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class PD_InventoryStatusAPIDefinition {

    private String apiKey = "{apikey}";

    @Steps
    PD_InventoryStatusAPISteps inventoryStatusAPIPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Inventory Status API page")
    public void openInventoryStatusAPIPage() {
        inventoryStatusAPIPage.openPage();
    }

    @When("User is logged to site (Inventory Status API)")
    public void openLogInPageAndLogIn() {
        inventoryStatusAPIPage.clickLogIn();
        userLogInPage.logInToAccount();
        apiKey = userAccountSteps.getAPIKeyOfUser();
        inventoryStatusAPIPage.openPage();
    }

    @Then("check general page elements for  Inventory Status API Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        inventoryStatusAPIPage.checkIfTitleIsCorrect();
        inventoryStatusAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholder on Inventory Status API page")
    public void checkAPIKeyPlaceholders(){
        inventoryStatusAPIPage.checkAPIKeyPlaceholders(apiKey);
    }
}
