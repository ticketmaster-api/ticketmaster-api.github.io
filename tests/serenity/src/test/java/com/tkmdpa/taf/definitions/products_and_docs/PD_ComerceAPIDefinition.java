package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.steps.pantheon.UserAccountSteps;
import com.tkmdpa.taf.steps.pantheon.UserLogInSteps;
import com.tkmdpa.taf.steps.products_and_docs.PD_CommerceAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static net.serenitybdd.core.Serenity.getCurrentSession;

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
        commerceAPIPage.openPage();
    }

    @When("User is logged to site (Commerce API)")
    public void openLogInPageAndLogIn() {
        commerceAPIPage.clickLogIn();
        userLogInPage.logInToApp((String) getCurrentSession().get("username"), (String) getCurrentSession().get("password"));
        apiKey = userAccountSteps.getAPIKeyOfUser();
        commerceAPIPage.openPage();
    }

    @When("Commerce API menu has list of methods")
    public void getCommerceAPILeftMenuItems() {
        commerceAPIPage.getCommonAPIListOfMethods();
    }

    @Then("check general page elements for Commerce API Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        commerceAPIPage.checkIfTitleIsCorrect();
        commerceAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Commerce API page")
    public void checkAPIKeyPlaceholders(){
        commerceAPIPage.checkAPIKeyPlaceholders(apiKey);
    }

}
