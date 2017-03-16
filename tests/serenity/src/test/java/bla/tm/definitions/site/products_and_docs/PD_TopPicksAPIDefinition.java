package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.pantheon.UserAccountSteps;
import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_TopPicksAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static net.serenitybdd.core.Serenity.getCurrentSession;

public class PD_TopPicksAPIDefinition {

    private String apiKey = "{apikey}";

    @Steps
    PD_TopPicksAPISteps topPicksAPIPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Top Picks API page")
    public void openTopPicksAPIPage() {
        topPicksAPIPage.openPage();
    }

    @When("User is logged to site (Top Picks API)")
    public void openLogInPageAndLogIn() {
        topPicksAPIPage.clickLogIn();
        userLogInPage.logInToApp((String) getCurrentSession().get("username"), (String) getCurrentSession().get("password"));
        apiKey = userAccountSteps.getAPIKeyOfUser();
        topPicksAPIPage.openPage();
    }

    @Then("check general page elements for Top Picks API Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        topPicksAPIPage.checkIfTitleIsCorrect();
        topPicksAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Top Picks API page")
    public void checkAPIKeyPlaceholders(){
        topPicksAPIPage.checkAPIKeyPlaceholders(apiKey);
    }

}
