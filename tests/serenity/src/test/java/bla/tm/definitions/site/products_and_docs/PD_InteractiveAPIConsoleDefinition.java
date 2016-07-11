package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.products_and_docs.PD_InteractiveAPIConsoleSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

import static org.junit.Assert.assertTrue;

public class PD_InteractiveAPIConsoleDefinition {

    @Steps
    PD_InteractiveAPIConsoleSteps interactiveAPIConsolePage;

    @Given("open Interactive API Console page")
    public void givenOpenInteractiveAPIConsolePage() {
        interactiveAPIConsolePage.maximiseBrowserWindow();
        interactiveAPIConsolePage.openPage();
    }

    @Then("check general page elements for Interactive API Console Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        interactiveAPIConsolePage.checkGeneralPageElements(disqus, leftMenu);
    }

}
