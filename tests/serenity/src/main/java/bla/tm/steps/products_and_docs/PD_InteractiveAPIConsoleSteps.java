package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_InteractiveAPIConsolePage;
import net.thucydides.core.annotations.Step;

import static bla.tm.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class PD_InteractiveAPIConsoleSteps {

    PD_InteractiveAPIConsolePage interactiveAPIConsolePage;

    @Step
    public void openPage() {
        interactiveAPIConsolePage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (interactiveAPIConsolePage.getTitleText(), interactiveAPIConsolePage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        interactiveAPIConsolePage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void clickLogIn() {
        interactiveAPIConsolePage.getLogInButton().click();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        if ("{apikey}".equals(apikey)){
            assertTrue(interactiveAPIConsolePage.getGetAPIKeyButton().isVisible());
        }
        else {
            waitForSomeActionHappened(50);
            assertEquals(interactiveAPIConsolePage.getAPIKeyCustomTokenField().getText(), apikey);
        }
    }
}
