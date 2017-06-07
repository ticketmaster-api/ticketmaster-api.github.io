package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.definitions.site.CommonDefinition;
import com.tkmdpa.taf.steps.pantheon.UserAccountSteps;
import com.tkmdpa.taf.steps.pantheon.UserLogInSteps;
import com.tkmdpa.taf.steps.products_and_docs.PD_DiscoveryAPIv1Steps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static net.serenitybdd.core.Serenity.getCurrentSession;

public class PD_DiscoveryAPIv1Definition extends CommonDefinition {

    @Steps
    PD_DiscoveryAPIv1Steps discoveryAPIv1Page;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Discovery API v1 page")
    @When("open Discovery API v1 page")
    public void openDiscoveryAPIv1Page() {
        discoveryAPIv1Page.openPage();
    }

    @Then("check general page elements for Discovery API v1 Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        discoveryAPIv1Page.checkIfTitleIsCorrect();
        discoveryAPIv1Page.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Discovery API v1 page")
    public void checkAPIKeyPlaceholders(){
        String tempApiKey = (String) getCurrentSession().get("apiKey");
        if (tempApiKey == null || tempApiKey.isEmpty()){
            discoveryAPIv1Page.checkAPIKeyPlaceholders(apiKey);
        }
        else
            discoveryAPIv1Page.checkAPIKeyPlaceholders(tempApiKey);
    }

}
