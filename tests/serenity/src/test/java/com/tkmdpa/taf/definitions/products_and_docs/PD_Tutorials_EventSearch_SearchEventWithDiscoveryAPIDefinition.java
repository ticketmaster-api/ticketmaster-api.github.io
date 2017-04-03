package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.steps.products_and_docs.PD_Tutorials_EventSearch_SearchEventWithDiscoveryAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class PD_Tutorials_EventSearch_SearchEventWithDiscoveryAPIDefinition {

    @Steps
    PD_Tutorials_EventSearch_SearchEventWithDiscoveryAPISteps tutorialsEventSearchSearchEventWithDiscoveryAPIPage;

    @Given("open Tutorials EventSearch SearchEventWithDiscoveryAPI page")
    public void openTutorialsEventSearchEventWithDiscoveryAPIPage() {
        tutorialsEventSearchSearchEventWithDiscoveryAPIPage.openPage();
    }

    @Then("check general page elements for Tutorials EventSearch SearchEventWithDiscoveryAPI Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsEventSearchSearchEventWithDiscoveryAPIPage.checkIfTitleIsCorrect();
        tutorialsEventSearchSearchEventWithDiscoveryAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
