package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_SeasonTicketingAPIPage;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import java.util.Map;

import static bla.tm.staticmethods.StaticMethods.checkIfWebElementExist;
import static bla.tm.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

public class PD_SeasonTicketingAPISteps {

    PD_SeasonTicketingAPIPage seasonTicketingAPIPage;

    @Step
    public void openPage() {
        seasonTicketingAPIPage.open();
    }

    @Step
    public void closePage() {
        seasonTicketingAPIPage.closeWindow();
    }

    @Step
    public void maximiseBrowserWindow() {
        seasonTicketingAPIPage.maximisePageWindow();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (seasonTicketingAPIPage.getTitleText(), seasonTicketingAPIPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        seasonTicketingAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void clickLogIn() {
        seasonTicketingAPIPage.getLogInButton().click();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        for (Map.Entry<String, WebElementFacade> entry : seasonTicketingAPIPage.getAPIKeyPlaceHoldersList().entrySet()){
            String key = entry.getKey();
            WebElementFacade value = entry.getValue();
            waitForSomeActionHappened(50);
            assertFalse(checkIfWebElementExist(value).getAttribute("textContent").contains(apikey));
        }
    }
}
