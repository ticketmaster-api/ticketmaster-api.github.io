package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_CommerceAPIPage;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import java.util.Map;

import static bla.tm.staticmethods.StaticMethods.checkIfWebElementExist;
import static bla.tm.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.assertFalse;

public class PD_CommerceAPISteps {

    PD_CommerceAPIPage commerceAPIPage;

    @Step
    public void openPage() {
        commerceAPIPage.open();
    }

    @Step
    public void closePage() {
        commerceAPIPage.closeWindow();
    }

    @Step
    public void maximiseBrowserWindow() {
        commerceAPIPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return commerceAPIPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        commerceAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void clickLogIn() {
        commerceAPIPage.getLogInButton().click();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        //First check for non hidden elements
        for (Map.Entry<String, WebElementFacade> entry : commerceAPIPage.getAPIKeyPlaceHoldersList().entrySet()){
            String key = entry.getKey();
            WebElementFacade value = entry.getValue();
            waitForSomeActionHappened(50);
            assertFalse(checkIfWebElementExist(value).getAttribute("textContent").contains(apikey));
        }

        //Second check for hidden elements
        commerceAPIPage.getCodeSection().click();
        commerceAPIPage.getSwitchToCUrlCode().click();

        for (Map.Entry<String, WebElementFacade> entry : commerceAPIPage.getAPIKeyHiddenPlaceHoldersList().entrySet()){
            String key = entry.getKey();
            WebElementFacade value = entry.getValue();
            waitForSomeActionHappened(50);
            assertFalse(checkIfWebElementExist(value).getAttribute("textContent").contains(apikey));
        }
    }
}
