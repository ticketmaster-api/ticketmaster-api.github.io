package com.tkmdpa.taf.steps.support;

import com.tkmdpa.taf.pages.site.support.Support_PartnerAPITermsOfUsePage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class Support_PartnerAPITermsOfUseSteps {

    Support_PartnerAPITermsOfUsePage partnerAPITermsOfUsePage;

    @Step
    public void openPage() {
        partnerAPITermsOfUsePage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (partnerAPITermsOfUsePage.getTitleText(), partnerAPITermsOfUsePage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        partnerAPITermsOfUsePage.checkGeneralPageElements(disqus, leftMenu);
    }
}
