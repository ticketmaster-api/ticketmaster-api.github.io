package bla.tm.steps.partners;

import bla.tm.pages.site.partners.Partners_StartupsDevelopersPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

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
    public void checkIfTitleIsCorrect(){
        assertEquals (startupsDevelopersPage.getTitleText(), startupsDevelopersPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        startupsDevelopersPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
