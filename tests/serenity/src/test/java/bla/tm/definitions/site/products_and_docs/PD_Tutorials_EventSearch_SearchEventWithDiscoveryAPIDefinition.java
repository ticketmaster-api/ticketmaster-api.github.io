package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_Tutorials_EventSearch_SearchEventWithDiscoveryAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.BeforeStory;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

import static org.junit.Assert.assertTrue;

public class PD_Tutorials_EventSearch_SearchEventWithDiscoveryAPIDefinition {

    @Steps
    PD_Tutorials_EventSearch_SearchEventWithDiscoveryAPISteps tutorialsEventSearchSearchEventWithDiscoveryAPIPage;

    @Given("open Tutorials EventSearch SearchEventWithDiscoveryAPI page")
    public void givenOpenTutorialsEventSearchEventWithDiscoveryAPIPage() {
        tutorialsEventSearchSearchEventWithDiscoveryAPIPage.maximiseBrowserWindow();
        tutorialsEventSearchSearchEventWithDiscoveryAPIPage.openPage();
    }

    @Then("check general page elements for Tutorials EventSearch SearchEventWithDiscoveryAPI Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsEventSearchSearchEventWithDiscoveryAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
