package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.steps.products_and_docs.PD_Tutorials_EventSearch_SearchEventInSomeLocationSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class PD_Tutorials_EventSearch_SearchEventInSomeLocationDefinition {

    @Steps
    PD_Tutorials_EventSearch_SearchEventInSomeLocationSteps tutorialsEventSearchSearchEventInSomeLocationPage;

    @Given("open Tutorials EventSearch SearchEventInSomeLocation page")
    public void openTutorialsEventSearchSearchEventInSomeLocationPage() {
        tutorialsEventSearchSearchEventInSomeLocationPage.openPage();
    }

    @Then("check general page elements for Tutorials EventSearch SearchEventInSomeLocation Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsEventSearchSearchEventInSomeLocationPage.checkIfTitleIsCorrect();
        tutorialsEventSearchSearchEventInSomeLocationPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
