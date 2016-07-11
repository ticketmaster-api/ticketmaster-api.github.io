package bla.tm.steps.partners;

import bla.tm.pages.site.partners.Partners_DistributionPartnersPage;
import net.thucydides.core.annotations.Step;

public class Partners_DistributionPartnersSteps {

    Partners_DistributionPartnersPage distributionPartnersPage;

    @Step
    public void openPage() {
        distributionPartnersPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        distributionPartnersPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return distributionPartnersPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        distributionPartnersPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
