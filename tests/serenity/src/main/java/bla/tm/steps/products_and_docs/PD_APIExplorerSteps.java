package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_APIExplorerPage;
import net.thucydides.core.annotations.Step;

public class PD_APIExplorerSteps {

    PD_APIExplorerPage apiExplorerPage;

    @Step
    public void openPage() {
        apiExplorerPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        apiExplorerPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return apiExplorerPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        apiExplorerPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
