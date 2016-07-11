package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.products_and_docs.PD_Widget_CountdownSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

import static org.junit.Assert.assertTrue;

public class PD_Widget_CountdownDefinition {

    @Steps
    PD_Widget_CountdownSteps countdownWidgetPage;

    @Given("open Countdown Widget page")
    public void givenOpenCountdownWidgetPage() {
        countdownWidgetPage.maximiseBrowserWindow();
        countdownWidgetPage.openPage();
    }

    @Then("check general page elements for Countdown Widget Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        countdownWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
