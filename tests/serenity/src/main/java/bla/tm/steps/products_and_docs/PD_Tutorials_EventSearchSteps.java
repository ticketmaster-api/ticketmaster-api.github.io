package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_Tutorials_EventSearchPage;
import net.thucydides.core.annotations.Step;

public class PD_Tutorials_EventSearchSteps {

    PD_Tutorials_EventSearchPage tutorialsEventSearchPage;

    @Step
    public void openPage() {
        tutorialsEventSearchPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        tutorialsEventSearchPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return tutorialsEventSearchPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsEventSearchPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
