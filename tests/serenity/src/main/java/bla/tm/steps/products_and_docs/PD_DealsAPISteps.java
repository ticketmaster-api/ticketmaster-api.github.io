package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_DealsAPIPage;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import java.util.Map;

import static bla.tm.staticmethods.StaticMethods.checkIfWebElementExist;
import static bla.tm.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.assertFalse;

public class PD_DealsAPISteps {

    PD_DealsAPIPage dealsAPIPage;

    @Step
    public void openPage() {
        dealsAPIPage.open();
    }

    @Step
    public void closePage() {
        dealsAPIPage.closeWindow();
    }

    @Step
    public void maximiseBrowserWindow() {
        dealsAPIPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return dealsAPIPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        dealsAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void clickLogIn() {
        dealsAPIPage.getLogInButton().click();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        //First check for non hidden elements
        for (Map.Entry<String, WebElementFacade> entry : dealsAPIPage.getAPIKeyPlaceHoldersList().entrySet()){
            String key = entry.getKey();
            WebElementFacade value = entry.getValue();
            waitForSomeActionHappened(50);
            assertFalse(checkIfWebElementExist(value).getAttribute("textContent").contains(apikey));
        }
    }
}
