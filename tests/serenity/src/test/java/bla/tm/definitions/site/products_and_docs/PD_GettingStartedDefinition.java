package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.products_and_docs.PD_GettingStartedSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class PD_GettingStartedDefinition {

    @Steps
    PD_GettingStartedSteps gettingStartedPage;

    @Given("open Getting Started page")
    @When("open Getting Started page")
    public void openGettingStartedPage() {
        gettingStartedPage.maximiseBrowserWindow();
        gettingStartedPage.openPage();
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

}
