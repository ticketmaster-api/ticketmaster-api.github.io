package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_ChangeLogPage;
import net.thucydides.core.annotations.Step;

public class PD_ChangeLogSteps {

    PD_ChangeLogPage changeLogPage;

    @Step
    public void openPage() {
        changeLogPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        changeLogPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return changeLogPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        changeLogPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
