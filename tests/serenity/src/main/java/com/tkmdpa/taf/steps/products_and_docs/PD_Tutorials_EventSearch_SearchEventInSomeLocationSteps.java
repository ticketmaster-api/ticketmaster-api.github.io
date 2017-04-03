package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_Tutorials_EventSearch_SearchEventInSomeLocationPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class PD_Tutorials_EventSearch_SearchEventInSomeLocationSteps {

    PD_Tutorials_EventSearch_SearchEventInSomeLocationPage tutorialsEventSearchSearchEventInSomeLocationPage;

    @Step
    public void openPage() {
        tutorialsEventSearchSearchEventInSomeLocationPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (tutorialsEventSearchSearchEventInSomeLocationPage.getTitleText(), tutorialsEventSearchSearchEventInSomeLocationPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsEventSearchSearchEventInSomeLocationPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
