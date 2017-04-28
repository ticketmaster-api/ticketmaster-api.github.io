package com.tkmdpa.taf.steps.partners;

import com.tkmdpa.taf.pages.site.partners.Partners_DistributionPartnersPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class Partners_DistributionPartnersSteps {

    Partners_DistributionPartnersPage distributionPartnersPage;

    @Step
    public void openPage() {
        distributionPartnersPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (distributionPartnersPage.getTitleText(), distributionPartnersPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        distributionPartnersPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
