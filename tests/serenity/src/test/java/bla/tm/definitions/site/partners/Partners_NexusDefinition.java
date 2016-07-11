package bla.tm.definitions.site.partners;

import bla.tm.steps.partners.Partners_NexusSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

import static org.junit.Assert.assertTrue;

public class Partners_NexusDefinition {

    @Steps
    Partners_NexusSteps nexusPage;

    @Given("open Join The Nexus Program page")
    public void givenOpenNexusPage() {
        nexusPage.maximiseBrowserWindow();
        nexusPage.openPage();
    }

    @Then("check general page elements for Join The Nexus Program Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        nexusPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
