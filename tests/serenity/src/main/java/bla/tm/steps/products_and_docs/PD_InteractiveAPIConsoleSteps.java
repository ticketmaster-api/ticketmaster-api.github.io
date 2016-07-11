package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_InteractiveAPIConsolePage;
import net.thucydides.core.annotations.Step;

public class PD_InteractiveAPIConsoleSteps {

    PD_InteractiveAPIConsolePage interactiveAPIConsolePage;

    @Step
    public void openPage() {
        interactiveAPIConsolePage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        interactiveAPIConsolePage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return interactiveAPIConsolePage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        interactiveAPIConsolePage.checkGeneralPageElements(disqus, leftMenu);
    }
}
