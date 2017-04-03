package com.tkmdpa.taf.steps;

import com.tkmdpa.taf.pages.site.EventsPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class EventsSteps {

    EventsPage eventsPage;

    @Step
    public void openPage() {
        eventsPage.open();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        eventsPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (eventsPage.getTitleText(), eventsPage.pageHeader);
    }
}
