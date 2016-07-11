package bla.tm.definitions.site;

import bla.tm.steps.EventsSteps;
import net.thucydides.core.annotations.Managed;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

import static net.thucydides.core.annotations.ClearCookiesPolicy.BeforeEachTest;
import static org.junit.Assert.assertFalse;

public class EventsDefinition {

    @Managed(clearCookies=BeforeEachTest)

    @Steps
    EventsSteps eventsPage;

    @Given("open Events page")
    public void givenOpenEventsPage() {
        eventsPage.maximiseBrowserWindow();
        eventsPage.openPage();
    }

    @Then("check general page elements for Events Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        eventsPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
