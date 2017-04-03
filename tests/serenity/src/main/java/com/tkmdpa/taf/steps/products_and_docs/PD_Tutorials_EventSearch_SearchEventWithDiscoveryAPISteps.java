package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_Tutorials_EventSearch_SearchEventWithDiscoveryAPIPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class PD_Tutorials_EventSearch_SearchEventWithDiscoveryAPISteps {

    PD_Tutorials_EventSearch_SearchEventWithDiscoveryAPIPage tutorialsEventSearchSearchEventWithDiscoveryAPIPage;

    @Step
    public void openPage() {
        tutorialsEventSearchSearchEventWithDiscoveryAPIPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (tutorialsEventSearchSearchEventWithDiscoveryAPIPage.getTitleText(), tutorialsEventSearchSearchEventWithDiscoveryAPIPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsEventSearchSearchEventWithDiscoveryAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }
}

