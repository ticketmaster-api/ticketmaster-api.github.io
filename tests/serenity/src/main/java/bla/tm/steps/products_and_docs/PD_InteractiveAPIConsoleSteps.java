package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_InteractiveAPIConsolePage;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;
import org.openqa.selenium.WebElement;

import java.util.Map;

import static java.util.Optional.ofNullable;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class PD_InteractiveAPIConsoleSteps {

    PD_InteractiveAPIConsolePage interactiveAPIConsolePage;

    @Step
    public void openPage() {
        interactiveAPIConsolePage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        interactiveAPIConsolePage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return interactiveAPIConsolePage.getTitleText();
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
            try {Thread.sleep(50);} catch(InterruptedException ex) {Thread.currentThread().interrupt();}
            assertEquals(interactiveAPIConsolePage.getAPIKeyCustomTokenField().getText(), apikey);
        }

        interactiveAPIConsolePage.closeWindow();
    }
}
