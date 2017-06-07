package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.AnyPage;
import com.tkmdpa.taf.pages.site.products_and_docs.PD_InternationalDiscoveryAPIPage;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import java.util.Map;

import static com.tkmdpa.taf.staticmethods.StaticMethods.checkIfWebElementExist;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

public class PD_InternationalDiscoveryAPISteps {

    PD_InternationalDiscoveryAPIPage internationalDiscoveryAPIPage;
    AnyPage anyPage;

    @Step
    public void openPage() {
        internationalDiscoveryAPIPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (internationalDiscoveryAPIPage.getTitleText(), internationalDiscoveryAPIPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        internationalDiscoveryAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void clickLogIn() {
        internationalDiscoveryAPIPage.getLogInButton().click();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        for (Map.Entry<String, WebElementFacade> entry : internationalDiscoveryAPIPage.getAPIKeyPlaceHoldersList().entrySet()){
//            String key = entry.getKey();
            WebElementFacade value = entry.getValue();
            anyPage.waitForPageReadyStateComplete();
            assertFalse(checkIfWebElementExist(value).getAttribute("textContent").contains(apikey));
        }
    }
}
