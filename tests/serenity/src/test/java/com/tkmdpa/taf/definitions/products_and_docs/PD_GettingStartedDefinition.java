package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.definitions.CommonDefinition;
import com.tkmdpa.taf.steps.pantheon.UserAccountSteps;
import com.tkmdpa.taf.steps.pantheon.UserLogInSteps;
import com.tkmdpa.taf.steps.products_and_docs.PD_GettingStartedSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;
import org.json.simple.JSONObject;

import static net.serenitybdd.core.Serenity.getCurrentSession;

public class PD_GettingStartedDefinition extends CommonDefinition{

    @Steps
    PD_GettingStartedSteps gettingStartedPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Getting Started page")
    @When("open Getting Started page")
    public void openGettingStartedPage() {
        gettingStartedPage.openPage();
    }

    @When("user gets apiKey")
    public void openLogInPageAndLogIn() {
        String tempApiKey = userAccountSteps.getAPIKeyOfUser();
        getCurrentSession().put("apiKey", tempApiKey);
    }

    @Then("check general page elements for Getting Started Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        gettingStartedPage.checkIfTitleIsCorrect();
        gettingStartedPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("all the Commerce API methods are shown on Getting Started page")
    public void compareCommerceAPIMethodsToSameGettingStartedMethodsList(){
        gettingStartedPage.compareCommerceAPIMethodsToSameGettingStartedMethodsList();
    }

    @Then("Summary widget is shown for Getting Started page")
    public void checkSummaryWidgetVisible(){
        gettingStartedPage.checkSummaryWidgetVisible();
    }

    @Then("check that API key is provided for all placeholders on Getting Started page")
    public void checkAPIKeyPlaceholders(){
        String tempApiKey = (String) getCurrentSession().get("apiKey");
        if (tempApiKey == null || tempApiKey.isEmpty()){
            gettingStartedPage.checkAPIKeyPlaceholders(apiKey);
        }
        else
        gettingStartedPage.checkAPIKeyPlaceholders(tempApiKey);
    }

    public String getLogin(JSONObject jsonObject) {
        return (String) jsonObject.get("prodUserName");
    }

    public String getPassword(JSONObject jsonObject) {
        return (String) jsonObject.get("prodPassword");
    }
}
