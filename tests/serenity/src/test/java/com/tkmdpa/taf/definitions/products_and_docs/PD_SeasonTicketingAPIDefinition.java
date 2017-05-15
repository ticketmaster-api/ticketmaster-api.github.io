package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.definitions.site.CommonDefinition;
import com.tkmdpa.taf.steps.pantheon.UserAccountSteps;
import com.tkmdpa.taf.steps.pantheon.UserLogInSteps;
import com.tkmdpa.taf.steps.products_and_docs.PD_SeasonTicketingAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static net.serenitybdd.core.Serenity.getCurrentSession;

public class PD_SeasonTicketingAPIDefinition extends CommonDefinition{

    @Steps
    PD_SeasonTicketingAPISteps seasonTicketingAPIPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Season Ticketing API page")
    @When("open Season Ticketing API page")
    public void openSeasonTicketingAPIPage() {
        seasonTicketingAPIPage.openPage();
    }

    @Then("check general page elements for Season Ticketing API Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        seasonTicketingAPIPage.checkIfTitleIsCorrect();
        seasonTicketingAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Season Ticketing API page")
    public void checkAPIKeyPlaceholders(){
        String tempApiKey = (String) getCurrentSession().get("apiKey");
        if (tempApiKey == null || tempApiKey.isEmpty()){
            seasonTicketingAPIPage.checkAPIKeyPlaceholders(apiKey);
        }
        else
            seasonTicketingAPIPage.checkAPIKeyPlaceholders(tempApiKey);
    }

}
