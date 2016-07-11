package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.products_and_docs.PD_Tutorials_EventSearch_SearchEventInSomeLocationSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

import static org.junit.Assert.assertTrue;

public class PD_Tutorials_EventSearch_SearchEventInSomeLocationDefinition {

    @Steps
    PD_Tutorials_EventSearch_SearchEventInSomeLocationSteps tutorialsEventSearchSearchEventInSomeLocationPage;

    @Given("open Tutorials EventSearch SearchEventInSomeLocation page")
    public void givenOpenTutorialsEventSearchSearchEventInSomeLocationPage() {
        tutorialsEventSearchSearchEventInSomeLocationPage.maximiseBrowserWindow();
        tutorialsEventSearchSearchEventInSomeLocationPage.openPage();
    }

    @Then("check general page elements for Tutorials EventSearch SearchEventInSomeLocation Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsEventSearchSearchEventInSomeLocationPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
