package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.steps.products_and_docs.PD_Widget_CalendarSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class PD_Widget_CalendarDefinition {

    @Steps
    PD_Widget_CalendarSteps calendarWidgetPage;

    @Given("open Calendar Widget page")
    @When("open Calendar Widget page")
    public void openCalendarWidgetPage() {
        calendarWidgetPage.openPage();
    }

    @Then("check general page elements for Calendar Widget Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElementsForCalendarWidgetPage(boolean disqus, boolean leftMenu) {
        calendarWidgetPage.checkIfTitleIsCorrect();
        calendarWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
