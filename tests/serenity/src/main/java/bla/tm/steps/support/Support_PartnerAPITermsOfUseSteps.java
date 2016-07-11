package bla.tm.steps.support;

import bla.tm.pages.site.support.Support_PartnerAPITermsOfUsePage;
import net.thucydides.core.annotations.Step;

public class Support_PartnerAPITermsOfUseSteps {

    Support_PartnerAPITermsOfUsePage partnerAPITermsOfUsePage;

    @Step
    public void openPage() {
        partnerAPITermsOfUsePage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        partnerAPITermsOfUsePage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return partnerAPITermsOfUsePage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        partnerAPITermsOfUsePage.checkGeneralPageElements(disqus, leftMenu);
    }
}
