package com.tkmdpa.taf.definitions.site;

import com.tkmdpa.taf.steps.site.EventsSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class EventsDefinition {

    @Steps
    EventsSteps eventsPage;

    @Given("open Events page")
    public void openEventsPage() {
        eventsPage.openPage();
    }

    @Then("check general page elements for Events Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        eventsPage.checkIfTitleIsCorrect();
        eventsPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
