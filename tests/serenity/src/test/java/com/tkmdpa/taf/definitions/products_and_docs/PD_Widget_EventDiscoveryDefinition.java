package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.definitions.site.CommonDefinition;
import com.tkmdpa.taf.steps.pantheon.UserAccountSteps;
import com.tkmdpa.taf.steps.pantheon.UserLogInSteps;
import com.tkmdpa.taf.steps.products_and_docs.PD_Widget_EventDiscoverySteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static net.serenitybdd.core.Serenity.getCurrentSession;

public class PD_Widget_EventDiscoveryDefinition extends CommonDefinition {

    @Steps
    PD_Widget_EventDiscoverySteps eventDiscoveryWidgetSteps;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Event Discovery Widget page")
    @When("open Event Discovery Widget page")
    public void openEventDiscoveryWidgetPage() {
        eventDiscoveryWidgetSteps.openPage();
    }

    @Then("check general page elements for Event Discovery Widget Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        eventDiscoveryWidgetSteps.checkIfTitleIsCorrect();
        eventDiscoveryWidgetSteps.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Event Discovery Widget page")
    public void checkAPIKeyPlaceholders(){
        String tempApiKey = (String) getCurrentSession().get("apiKey");
        if (tempApiKey == null || tempApiKey.isEmpty()){
            eventDiscoveryWidgetSteps.checkAPIKeyPlaceholders(apiKey);
        }
        else
            eventDiscoveryWidgetSteps.checkAPIKeyPlaceholders(tempApiKey);
    }

}
