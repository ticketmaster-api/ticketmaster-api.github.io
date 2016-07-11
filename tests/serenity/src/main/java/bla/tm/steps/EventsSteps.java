package bla.tm.steps;

import bla.tm.pages.site.EventsPage;
import net.thucydides.core.annotations.Step;

public class EventsSteps {

    EventsPage eventsPage;

    @Step
    public void openPage() {
        eventsPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        eventsPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return eventsPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        eventsPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
