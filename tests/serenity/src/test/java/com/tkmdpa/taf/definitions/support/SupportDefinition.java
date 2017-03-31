package com.tkmdpa.taf.definitions.support;

import com.tkmdpa.taf.steps.support.SupportSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class SupportDefinition {

    @Steps
    SupportSteps supportPage;

    @Given("open Support page")
    public void openSupportPage() {
        supportPage.openPage();
    }

    @Then("check general page elements for Support Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        supportPage.checkIfTitleIsCorrect();
        supportPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
