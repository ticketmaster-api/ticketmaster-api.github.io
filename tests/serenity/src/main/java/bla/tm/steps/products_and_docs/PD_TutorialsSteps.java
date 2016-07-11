package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_TutorialsPage;
import net.thucydides.core.annotations.Step;

public class PD_TutorialsSteps {

    PD_TutorialsPage tutorialsPage;

    @Step
    public void openPage() {
        tutorialsPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        tutorialsPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return tutorialsPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
