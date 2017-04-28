package com.tkmdpa.taf.definitions.partners;

import com.tkmdpa.taf.steps.partners.Partners_StartupsDevelopersSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class Partners_StartupsDevelopersDefinition {

    @Steps
    Partners_StartupsDevelopersSteps startupsDevelopersPage;

    @Given("open Startups and Developers page")
    public void openStartupsDevelopersPage() {
        startupsDevelopersPage.openPage();
    }

    @Then("check general page elements for Startups and Developers Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        startupsDevelopersPage.checkIfTitleIsCorrect();
        startupsDevelopersPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
