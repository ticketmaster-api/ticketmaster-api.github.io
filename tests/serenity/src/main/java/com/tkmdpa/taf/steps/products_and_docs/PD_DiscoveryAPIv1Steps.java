package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_DiscoveryAPIv1Page;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import java.util.Map;

import static com.tkmdpa.taf.staticmethods.StaticMethods.checkIfWebElementExist;
import static com.tkmdpa.taf.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class PD_DiscoveryAPIv1Steps {

    PD_DiscoveryAPIv1Page discoveryAPIv1Page;

    @Step
    public void openPage() {
        discoveryAPIv1Page.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (discoveryAPIv1Page.getTitleText(), discoveryAPIv1Page.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        discoveryAPIv1Page.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public String returnCurrentUrl() {
        return discoveryAPIv1Page.returnCurrentUrl();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        //First check for non hidden elements
        for (Map.Entry<String, WebElementFacade> entry : discoveryAPIv1Page.getAPIKeyPlaceHoldersList().entrySet()){
            WebElementFacade value = entry.getValue();
            assertTrue(checkIfWebElementExist(value).getAttribute("textContent").contains(apikey));
        }

        //Second check for hidden elements
        discoveryAPIv1Page.scrollToElement(discoveryAPIv1Page.getCodeSection());
        discoveryAPIv1Page.getCodeSection().click();
        discoveryAPIv1Page.scrollToElement(discoveryAPIv1Page.getSwitchToCUrlCode());
        discoveryAPIv1Page.getSwitchToCUrlCode().click();

        for (Map.Entry<String, WebElementFacade> entry : discoveryAPIv1Page.getAPIKeyHiddenPlaceHoldersList().entrySet()){
            WebElementFacade value = entry.getValue();
            waitForSomeActionHappened(50);
            assertTrue(checkIfWebElementExist(value).getAttribute("textContent").contains(apikey));
        }
    }
}
