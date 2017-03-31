package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_OauthAPIPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class PD_OauthAPISteps {

    PD_OauthAPIPage oauthLogPage;

    @Step
    public void openPage() {
        oauthLogPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (oauthLogPage.getTitleText(), oauthLogPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        oauthLogPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
