package com.tkmdpa.taf.definitions.support;

import com.tkmdpa.taf.steps.support.Support_GeneralTermsOfUseSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class Support_GeneralTermsOfUseDefinition {

    @Steps
    Support_GeneralTermsOfUseSteps generalTermsOfUsePage;

    @Given("open General Terms Of Use page")
    public void givenOpenGeneralTermsOfUsePage() {
        generalTermsOfUsePage.openPage();
    }

    @Then("check general page elements for General Terms Of Use Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        generalTermsOfUsePage.checkIfTitleIsCorrect();
        generalTermsOfUsePage.checkGeneralPageElements(disqus, leftMenu);
    }

}
