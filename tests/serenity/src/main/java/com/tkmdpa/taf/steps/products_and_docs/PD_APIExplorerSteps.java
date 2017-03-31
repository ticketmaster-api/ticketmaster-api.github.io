package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_APIExplorerPage;
import net.thucydides.core.annotations.Step;

import static com.tkmdpa.taf.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.assertEquals;

public class PD_APIExplorerSteps {

    PD_APIExplorerPage apiExplorerPage;

    @Step
    public void openPage() {
        apiExplorerPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (apiExplorerPage.getTitleText(), apiExplorerPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        apiExplorerPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        waitForSomeActionHappened(150);
        if ("{apikey}".equals(apikey)){
            assertEquals(apiExplorerPage.getAPIKeyTextField().getAttribute("value"), "");
        }
        else {
            assertEquals(apiExplorerPage.getAPIKeyTextField().getAttribute("value"), apikey);
        }
    }

    @Step
    public void checkSummaryWidgetVisible(){
        apiExplorerPage.getSummaryWidget().shouldBeVisible();
    }
}
