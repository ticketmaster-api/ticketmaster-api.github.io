package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.definitions.site.CommonDefinition;
import com.tkmdpa.taf.pages.AnyPage;
import com.tkmdpa.taf.steps.pantheon.UserAccountSteps;
import com.tkmdpa.taf.steps.pantheon.UserLogInSteps;
import com.tkmdpa.taf.steps.products_and_docs.PD_TopPicksAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static net.serenitybdd.core.Serenity.getCurrentSession;

public class PD_TopPicksAPIDefinition extends CommonDefinition {

    @Steps
    PD_TopPicksAPISteps topPicksAPIPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Steps
    AnyPage anyPage;

    @Given("open Top Picks API page")
    @When("open Top Picks API page")
    public void openTopPicksAPIPage() {
        topPicksAPIPage.openPage();
    }

    @Then("check general page elements for Top Picks API Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        anyPage.waitForPageReadyStateComplete();
        topPicksAPIPage.checkIfTitleIsCorrect();
        topPicksAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Top Picks API page")
    public void checkAPIKeyPlaceholders(){
        String tempApiKey = (String) getCurrentSession().get("apiKey");
        if (tempApiKey == null || tempApiKey.isEmpty()){
            topPicksAPIPage.checkAPIKeyPlaceholders(apiKey);
        }
        else
            topPicksAPIPage.checkAPIKeyPlaceholders(tempApiKey);
    }

}
