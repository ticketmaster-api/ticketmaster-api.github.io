package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.products_and_docs.PD_Widget_EventDiscoverySteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

import static org.junit.Assert.assertTrue;

public class PD_Widget_EventDiscoveryDefinition {

    @Steps
    PD_Widget_EventDiscoverySteps eventDiscoveryWidgetPage;

    @Given("open Event Discovery Widget page")
    public void givenOpenEventDiscoveryWidgetPage() {
        eventDiscoveryWidgetPage.maximiseBrowserWindow();
        eventDiscoveryWidgetPage.openPage();
    }

    @Then("check general page elements for Event Discovery Widget Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        eventDiscoveryWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
