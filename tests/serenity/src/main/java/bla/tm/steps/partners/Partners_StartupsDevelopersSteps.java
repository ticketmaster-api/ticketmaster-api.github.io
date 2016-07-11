package bla.tm.steps.partners;

import bla.tm.pages.site.partners.Partners_StartupsDevelopersPage;
import net.thucydides.core.annotations.Step;

public class Partners_StartupsDevelopersSteps {

    Partners_StartupsDevelopersPage startupsDevelopersPage;

    @Step
    public void openPage() {
        startupsDevelopersPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        startupsDevelopersPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return startupsDevelopersPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        startupsDevelopersPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
