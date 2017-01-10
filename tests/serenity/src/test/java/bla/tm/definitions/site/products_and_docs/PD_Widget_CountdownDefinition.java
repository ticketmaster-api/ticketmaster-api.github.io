package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.products_and_docs.PD_Widget_CountdownSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class PD_Widget_CountdownDefinition {

    @Steps
    PD_Widget_CountdownSteps countdownWidgetSteps;

    //Given
    @Given("open Countdown Widget page")
    public void openCountdownWidgetPage() {
        countdownWidgetSteps.openPage();
    }

    //Then
    @Then("check general page elements for Countdown Widget Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        countdownWidgetSteps.checkIfTitleIsCorrect();
        countdownWidgetSteps.checkGeneralPageElements(disqus, leftMenu);
    }
}
