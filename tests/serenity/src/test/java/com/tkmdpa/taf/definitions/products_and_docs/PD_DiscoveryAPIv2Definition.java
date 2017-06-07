package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.definitions.site.CommonDefinition;
import com.tkmdpa.taf.steps.pantheon.UserAccountSteps;
import com.tkmdpa.taf.steps.pantheon.UserLogInSteps;
import com.tkmdpa.taf.steps.products_and_docs.PD_DiscoveryAPIv2Steps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static net.serenitybdd.core.Serenity.getCurrentSession;

public class PD_DiscoveryAPIv2Definition extends CommonDefinition {

    @Steps
    PD_DiscoveryAPIv2Steps discoveryAPIv2Page;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Discovery API v2 page")
    @When("open Discovery API v2 page")
    public void openDiscoveryAPIv2Page() {
        discoveryAPIv2Page.openPage();
    }

    @Then("check general page elements for Discovery API v2 Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        discoveryAPIv2Page.checkIfTitleIsCorrect();
        discoveryAPIv2Page.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Discovery API v2 page")
    public void checkAPIKeyPlaceholders(){
        String tempApiKey = (String) getCurrentSession().get("apiKey");
        if (tempApiKey == null || tempApiKey.isEmpty()){
            discoveryAPIv2Page.checkAPIKeyPlaceholders(apiKey);
        }
        else
            discoveryAPIv2Page.checkAPIKeyPlaceholders(tempApiKey);
    }

}
