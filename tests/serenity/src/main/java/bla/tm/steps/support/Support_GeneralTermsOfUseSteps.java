package bla.tm.steps.support;

import bla.tm.pages.site.support.Support_GeneralTermsOfUsePage;
import net.thucydides.core.annotations.Step;

public class Support_GeneralTermsOfUseSteps {

    Support_GeneralTermsOfUsePage generalTermsOfUsePage;

    @Step
    public void openPage() {
        generalTermsOfUsePage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        generalTermsOfUsePage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return generalTermsOfUsePage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        generalTermsOfUsePage.checkGeneralPageElements(disqus, leftMenu);
    }
}
