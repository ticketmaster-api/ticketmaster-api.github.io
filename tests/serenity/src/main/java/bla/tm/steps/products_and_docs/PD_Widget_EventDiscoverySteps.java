package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_Widget_EventDiscoveryPage;
import net.thucydides.core.annotations.Step;

import static bla.tm.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.assertEquals;

public class PD_Widget_EventDiscoverySteps {

    PD_Widget_EventDiscoveryPage eventDiscoveryWidgetPage;

    @Step
    public void openPage() {
        eventDiscoveryWidgetPage.open();
    }

    @Step
    public void closePage() {
        eventDiscoveryWidgetPage.closeWindow();
    }

    @Step
    public void maximiseBrowserWindow() {
        eventDiscoveryWidgetPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return eventDiscoveryWidgetPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        eventDiscoveryWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void clickLogIn() {
        eventDiscoveryWidgetPage.getLogInButton().click();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        if ("{apikey}".equals(apikey)){
            assertEquals(eventDiscoveryWidgetPage.getEventDiscoveryWidget().getAPIKeyTextField().getAttribute("value"), "5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG");
        }
        else {
            waitForSomeActionHappened(50);
            assertEquals(eventDiscoveryWidgetPage.getEventDiscoveryWidget().getAPIKeyTextField().getAttribute("value"), apikey);
        }
    }
}
