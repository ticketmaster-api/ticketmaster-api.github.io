package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.steps.products_and_docs.PD_OauthAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class PD_OauthAPIDefinition {

    @Steps
    PD_OauthAPISteps oauthPage;

    @Given("open Oauth API page")
    public void openOauthAPIPage() {
        oauthPage.openPage();
    }

    @Then("check general page elements for Oauth API Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        oauthPage.checkIfTitleIsCorrect();
        oauthPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
