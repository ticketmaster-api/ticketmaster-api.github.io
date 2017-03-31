package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.definitions.CommonDefinition;
import com.tkmdpa.taf.steps.AnyPageSteps;
import com.tkmdpa.taf.steps.pantheon.UserAccountSteps;
import com.tkmdpa.taf.steps.pantheon.UserLogInSteps;
import com.tkmdpa.taf.steps.products_and_docs.PD_APIExplorerSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static net.serenitybdd.core.Serenity.getCurrentSession;

public class PD_APIExplorerDefinition extends CommonDefinition {

    @Steps
    PD_APIExplorerSteps apiExplorerPage;

    @Steps
    AnyPageSteps anyPageSteps;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open API Explorer page")
    @When("open API Explorer page")
    public void openAPIExplorerPage() {
        apiExplorerPage.openPage();
    }

    @When("production user is logged to site")
    public void openLogInPageAndLogIn() {
        anyPageSteps.clickLogIn();
        userLogInPage.logInToApp((String) getCurrentSession().get("prodUserName"), (String) getCurrentSession().get("prodPassword"));
    }

    @Then("check general page elements for API Explorer Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        apiExplorerPage.checkIfTitleIsCorrect();
        apiExplorerPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on API Explorer page")
    public void checkAPIKeyPlaceholders(){
        String tempApiKey = (String) getCurrentSession().get("apiKey");
        if (tempApiKey == null || tempApiKey.isEmpty()){
            apiExplorerPage.checkAPIKeyPlaceholders(apiKey);
        }
        else
            apiExplorerPage.checkAPIKeyPlaceholders(tempApiKey);
    }

    @Then("Summary widget is shown for API Explorer page")
    public void checkSummaryWidgetVisible(){
        apiExplorerPage.checkSummaryWidgetVisible();
    }

}
