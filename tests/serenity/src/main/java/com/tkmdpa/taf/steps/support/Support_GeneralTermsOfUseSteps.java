package com.tkmdpa.taf.steps.support;

import com.tkmdpa.taf.pages.site.support.Support_GeneralTermsOfUsePage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class Support_GeneralTermsOfUseSteps {

    Support_GeneralTermsOfUsePage generalTermsOfUsePage;

    @Step
    public void openPage() {
        generalTermsOfUsePage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (generalTermsOfUsePage.getTitleText(), generalTermsOfUsePage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        generalTermsOfUsePage.checkGeneralPageElements(disqus, leftMenu);
    }
}
