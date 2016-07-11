package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_GettingStartedPage;
import net.thucydides.core.annotations.Step;

public class PD_GettingStartedSteps {

    PD_GettingStartedPage gettingStartedPage;

    @Step
    public void openPage() {
        gettingStartedPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        gettingStartedPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return gettingStartedPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        gettingStartedPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public String returnCurrentUrl() {
        return gettingStartedPage.returnCurrentUrl();
    }
}
