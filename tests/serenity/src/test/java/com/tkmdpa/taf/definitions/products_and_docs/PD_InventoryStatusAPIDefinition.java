package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.definitions.site.CommonDefinition;
import com.tkmdpa.taf.steps.pantheon.UserAccountSteps;
import com.tkmdpa.taf.steps.pantheon.UserLogInSteps;
import com.tkmdpa.taf.steps.products_and_docs.PD_InventoryStatusAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static net.serenitybdd.core.Serenity.getCurrentSession;

public class PD_InventoryStatusAPIDefinition extends CommonDefinition {

    @Steps
    PD_InventoryStatusAPISteps inventoryStatusAPIPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Inventory Status API page")
    @When("open Inventory Status API page")
    public void openInventoryStatusAPIPage() {
        inventoryStatusAPIPage.openPage();
    }

    @Then("check general page elements for  Inventory Status API Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        inventoryStatusAPIPage.checkIfTitleIsCorrect();
        inventoryStatusAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholder on Inventory Status API page")
    public void checkAPIKeyPlaceholders(){
        String tempApiKey = (String) getCurrentSession().get("apiKey");
        inventoryStatusAPIPage.checkAPIKeyPlaceholders(tempApiKey);
    }
}
