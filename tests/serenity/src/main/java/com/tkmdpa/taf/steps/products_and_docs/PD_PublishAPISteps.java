package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_PublishAPIPage;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import java.util.Map;

import static com.tkmdpa.taf.staticmethods.StaticMethods.checkIfWebElementExist;
import static com.tkmdpa.taf.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

public class PD_PublishAPISteps {

    PD_PublishAPIPage publishAPIPage;

    @Step
    public void openPage() {
        publishAPIPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (publishAPIPage.getTitleText(), publishAPIPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        publishAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void clickLogIn() {
        publishAPIPage.getLogInButton().click();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        //First check for non hidden elements
        for (Map.Entry<String, WebElementFacade> entry : publishAPIPage.getAPIKeyPlaceHoldersList().entrySet()){
            String key = entry.getKey();
            WebElementFacade value = entry.getValue();
            waitForSomeActionHappened(50);
            assertFalse(checkIfWebElementExist(value).getAttribute("textContent").contains(apikey));
        }
    }
}
