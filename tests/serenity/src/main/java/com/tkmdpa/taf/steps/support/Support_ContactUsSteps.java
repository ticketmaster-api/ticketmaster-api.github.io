package com.tkmdpa.taf.steps.support;

import com.tkmdpa.taf.pages.site.support.Support_ContactUsPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class Support_ContactUsSteps {

    Support_ContactUsPage contactUsPage;

    @Step
    public void openPage() {
        contactUsPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (contactUsPage.getTitleText(), contactUsPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        contactUsPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
