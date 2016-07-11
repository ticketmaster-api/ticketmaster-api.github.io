package bla.tm.steps.partners;

import bla.tm.pages.site.partners.Partners_NexusPage;
import net.thucydides.core.annotations.Step;

public class Partners_NexusSteps {

    Partners_NexusPage nexusPage;

    @Step
    public void openPage() {
        nexusPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        nexusPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return nexusPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        nexusPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
