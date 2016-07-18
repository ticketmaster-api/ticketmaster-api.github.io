package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_PartnerAPIPage;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import java.util.Map;

import static bla.tm.staticmethods.StaticMethods.checkIfWebElementExist;
import static bla.tm.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.assertFalse;

public class PD_PartnerAPISteps {

    PD_PartnerAPIPage partnerAPIPage;

    @Step
    public void openPage() {
        partnerAPIPage.open();
    }

    @Step
    public void closePage() {
        partnerAPIPage.closeWindow();
    }

    @Step
    public void maximiseBrowserWindow() {
        partnerAPIPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return partnerAPIPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        partnerAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void clickLogIn() {
        partnerAPIPage.getLogInButton().click();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        for (Map.Entry<String, WebElementFacade> entry : partnerAPIPage.getAPIKeyPlaceHoldersList().entrySet()) {
            String key = entry.getKey();
            WebElementFacade value = entry.getValue();
            waitForSomeActionHappened(50);
            assertFalse(checkIfWebElementExist(value).getAttribute("textContent").contains(apikey));
        }
    }
}
