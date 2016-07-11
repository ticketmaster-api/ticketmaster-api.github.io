package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.products_and_docs.PD_GettingStartedSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

import static org.junit.Assert.assertTrue;

public class PD_GettingStartedDefinition {

    @Steps
    PD_GettingStartedSteps gettingStartedPage;

    @Given("open Getting Started page")
    public void givenOpenGettingStartedPage() {
        gettingStartedPage.maximiseBrowserWindow();
        gettingStartedPage.openPage();
    }

    @Then("check general page elements for Getting Started Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        gettingStartedPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
