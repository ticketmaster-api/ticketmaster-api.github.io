package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_Widget_CountdownPage;
import net.thucydides.core.annotations.Step;

import static bla.tm.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.assertEquals;

public class PD_Widget_CountdownSteps {

    PD_Widget_CountdownPage countdownWidgetPage;

    @Step
    public void openPage() {
        countdownWidgetPage.open();
    }

    @Step
    public void closePage() {
        countdownWidgetPage.closeWindow();
    }

    @Step
    public void maximiseBrowserWindow() {
        countdownWidgetPage.maximisePageWindow();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (countdownWidgetPage.getTitleText(), countdownWidgetPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        countdownWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void clickLogIn() {
        countdownWidgetPage.getLogInButton().click();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        if ("{apikey}".equals(apikey)){
            assertEquals(countdownWidgetPage.getCountdownWidget().getAPIKeyTextField().getAttribute("value"), "5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG");
        }
        else {
            waitForSomeActionHappened(50);
            assertEquals(countdownWidgetPage.getCountdownWidget().getAPIKeyTextField().getAttribute("value"), apikey);
        }
    }
}
