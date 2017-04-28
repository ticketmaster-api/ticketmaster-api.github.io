package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_CommerceAPIPage;
import net.serenitybdd.core.Serenity;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import java.util.Map;

import static com.tkmdpa.taf.staticmethods.StaticMethods.checkIfWebElementExist;
import static com.tkmdpa.taf.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

public class PD_CommerceAPISteps {

    PD_CommerceAPIPage commerceAPIPage;

    @Step
    public void openPage() {
        commerceAPIPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (commerceAPIPage.getTitleText(), commerceAPIPage.pageHeader);
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
            WebElementFacade value = entry.getValue();
            waitForSomeActionHappened(50);
            assertFalse(checkIfWebElementExist(value).getAttribute("textContent").contains(apikey));
        }

        //Second check for hidden elements
        commerceAPIPage.getCodeSection().click();
        commerceAPIPage.getSwitchToCUrlCode().click();

        for (Map.Entry<String, WebElementFacade> entry : commerceAPIPage.getAPIKeyHiddenPlaceHoldersList().entrySet()){
            WebElementFacade value = entry.getValue();
            waitForSomeActionHappened(50);
            assertFalse(checkIfWebElementExist(value).getAttribute("textContent").contains(apikey));
        }
    }

    @Step
    public void getCommonAPIListOfMethods() {
        Serenity.setSessionVariable("Commerce API").to(commerceAPIPage.getLeftSideMenuWidget().getSelectedLeftMenuObject("Commerce API"));
    }
}
