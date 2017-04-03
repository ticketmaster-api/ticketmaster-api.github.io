package com.tkmdpa.taf.steps.support;

import com.tkmdpa.taf.pages.site.support.SupportPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class SupportSteps {

    SupportPage supportPage;

    @Step
    public void openPage() {
        supportPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (supportPage.getTitleText(), supportPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        supportPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
