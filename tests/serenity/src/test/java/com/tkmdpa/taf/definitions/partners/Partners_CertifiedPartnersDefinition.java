package com.tkmdpa.taf.definitions.partners;

import com.tkmdpa.taf.steps.partners.Partners_CertifiedPartnersSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class Partners_CertifiedPartnersDefinition {

    @Steps
    Partners_CertifiedPartnersSteps certifiedPartnersPage;

    @Given("open Certified Partners page")
    public void openCertifiedPartnersPage() {
        certifiedPartnersPage.openPage();
    }

    @Then("check general page elements for Certified Partners Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        certifiedPartnersPage.checkIfTitleIsCorrect();
        certifiedPartnersPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
