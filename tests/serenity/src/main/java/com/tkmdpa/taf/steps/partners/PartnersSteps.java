package com.tkmdpa.taf.steps.partners;

import com.tkmdpa.taf.pages.site.partners.PartnersPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class PartnersSteps {

    PartnersPage partnersPage;

    @Step
    public void openPage() {
        partnersPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (partnersPage.getTitleText(), partnersPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        partnersPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
