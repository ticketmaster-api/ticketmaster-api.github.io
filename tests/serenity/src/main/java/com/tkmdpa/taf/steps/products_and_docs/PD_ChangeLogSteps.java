package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_ChangeLogPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class PD_ChangeLogSteps {

    PD_ChangeLogPage changeLogPage;

    @Step
    public void openPage() {
        changeLogPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (changeLogPage.getTitleText(), changeLogPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        changeLogPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
