package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_APIExplorerV2Page;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class PD_APIExplorerV2Steps {

    PD_APIExplorerV2Page apiExplorerV2Page;

    @Step
    public void openPage() {
        apiExplorerV2Page.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (apiExplorerV2Page.getTitleText(), apiExplorerV2Page.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        apiExplorerV2Page.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void checkIfSourceCodeContainsTag(String text) {
        assertTrue (apiExplorerV2Page.getPageSource().contains(text));
    }
}
