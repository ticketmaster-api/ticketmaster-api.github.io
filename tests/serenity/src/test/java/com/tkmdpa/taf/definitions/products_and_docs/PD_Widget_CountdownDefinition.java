package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.steps.products_and_docs.PD_Widget_CountdownSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class PD_Widget_CountdownDefinition {

    @Steps
    PD_Widget_CountdownSteps countdownWidgetSteps;

    @Given("open Countdown Widget page")
    @When("open Countdown Widget page")
    public void openCountdownWidgetPage() {
        countdownWidgetSteps.openPage();
    }

    @Then("check general page elements for Countdown Widget Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        countdownWidgetSteps.checkIfTitleIsCorrect();
        countdownWidgetSteps.checkGeneralPageElements(disqus, leftMenu);
    }
}
