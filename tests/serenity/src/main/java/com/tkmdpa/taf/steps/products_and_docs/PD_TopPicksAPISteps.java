package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.AnyPage;
import com.tkmdpa.taf.pages.site.products_and_docs.PD_TopPicksAPIPage;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import java.util.Map;

import static com.tkmdpa.taf.staticmethods.StaticMethods.checkIfWebElementExist;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

public class PD_TopPicksAPISteps {

    PD_TopPicksAPIPage topPicksAPIPage;
    AnyPage anyPage;

    @Step
    public void openPage() {
        topPicksAPIPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (topPicksAPIPage.getTitleText(), topPicksAPIPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        topPicksAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void clickLogIn() {
        topPicksAPIPage.getLogInButton().click();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        for (Map.Entry<String, WebElementFacade> entry : topPicksAPIPage.getAPIKeyPlaceHoldersList().entrySet()){
            WebElementFacade value = entry.getValue();
            anyPage.waitForPageReadyStateComplete();
            assertFalse(checkIfWebElementExist(value).getAttribute("textContent").contains(apikey));
        }
    }
}
