package com.tkmdpa.taf.steps.support;

import com.tkmdpa.taf.pages.site.support.Support_FAQPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class Support_FAQSteps {

    Support_FAQPage faqPage;

    @Step
    public void openPage() {
        faqPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (faqPage.getTitleText(), faqPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        faqPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
