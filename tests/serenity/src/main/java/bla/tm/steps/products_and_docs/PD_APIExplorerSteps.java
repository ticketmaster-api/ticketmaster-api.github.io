package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_APIExplorerPage;
import net.thucydides.core.annotations.Step;

import static bla.tm.staticmethods.StaticMethods.waitForSomeActionHappened;
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
    public void clickLogIn() {
        apiExplorerPage.getLogInButton().click();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        if ("{apikey}".equals(apikey)){
            assertEquals(apiExplorerPage.getAPIKeyTextField().getAttribute("value"), "");
        }
        else {
            waitForSomeActionHappened(150);
            assertEquals(apiExplorerPage.getAPIKeyTextField().getAttribute("value"), apikey);
        }
    }

    @Step
    public void checkSummaryWidgetVisible(){
        apiExplorerPage.getSummaryWidget().shouldBeVisible();
    }
}
