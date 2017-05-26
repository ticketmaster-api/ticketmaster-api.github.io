package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.AnyPage;
import com.tkmdpa.taf.pages.site.products_and_docs.PD_DiscoveryAPIv2Page;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import java.util.Map;

import static com.tkmdpa.taf.staticmethods.StaticMethods.checkIfWebElementExist;
import static com.tkmdpa.taf.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class PD_DiscoveryAPIv2Steps {

    PD_DiscoveryAPIv2Page discoveryAPIv2Page;
    AnyPage anyPage;

    @Step
    public void openPage() {
        discoveryAPIv2Page.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (discoveryAPIv2Page.getTitleText(), discoveryAPIv2Page.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        discoveryAPIv2Page.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public String returnCurrentUrl() {
        return discoveryAPIv2Page.returnCurrentUrl();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        //First check for non hidden elements
        for (Map.Entry<String, WebElementFacade> entry : discoveryAPIv2Page.getAPIKeyPlaceHoldersList().entrySet()){
            WebElementFacade value = entry.getValue();
            waitForSomeActionHappened(50);
            assertTrue(checkIfWebElementExist(value).getAttribute("textContent").contains(apikey));
        }

        //Second check for hidden elements
        discoveryAPIv2Page.scrollToElement(discoveryAPIv2Page.getCodeSection());
        discoveryAPIv2Page.getCodeSection().click();
        discoveryAPIv2Page.scrollToElement(discoveryAPIv2Page.getSwitchToCUrlCode());
        discoveryAPIv2Page.getSwitchToCUrlCode().click();

        for (Map.Entry<String, WebElementFacade> entry : discoveryAPIv2Page.getAPIKeyHiddenPlaceHoldersList().entrySet()){
            WebElementFacade value = entry.getValue();
            anyPage.waitForPageReadyStateComplete();
            assertTrue(checkIfWebElementExist(value).getAttribute("textContent").contains(apikey));
        }
    }
}
