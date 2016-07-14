package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.AnyPageSteps;
import bla.tm.steps.products_and_docs.PD_Tutorials_EventSearchSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static org.junit.Assert.assertFalse;

public class PD_Tutorials_EventSearchDefinition {

    @Steps
    PD_Tutorials_EventSearchSteps tutorialsEventSearchPage;

    @Steps
    AnyPageSteps anyPage;

    @Given("open Tutorials EventSearch page")
    public void givenOpenTutorialsEventSearchPage() {
        tutorialsEventSearchPage.maximiseBrowserWindow();
        tutorialsEventSearchPage.openPage();
    }

    @When("check visibility and click $key element of Tutorials EventSearch page")
    public void checkIfElementVisibleAndClickIt(String key) {
        tutorialsEventSearchPage.validateAndClickElement(key);
    }

    @Then("check general page elements for Tutorials EventSearch Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsEventSearchPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that new page opened from Tutorials EventSearch page has $url and $title")
    public void checkIfPageIsOpened(String url, String title){
        anyPage.checkIfPageIsOpened(url,title);
    }
}
