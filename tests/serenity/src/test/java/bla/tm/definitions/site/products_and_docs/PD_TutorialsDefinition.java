package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.products_and_docs.PD_TutorialsSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class PD_TutorialsDefinition {

    @Steps
    PD_TutorialsSteps tutorialsPage;

    @Given("open Tutorials page")
    public void givenOpenTutorialsPage() {
        tutorialsPage.maximiseBrowserWindow();
        tutorialsPage.openPage();
    }

    @Then("check general page elements for Tutorials Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
