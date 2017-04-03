package com.tkmdpa.taf.definitions.partners;

import com.tkmdpa.taf.steps.partners.Partners_DistributionPartnersSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class Partners_DistributionPartnersDefinition {

    @Steps
    Partners_DistributionPartnersSteps distributionPartnersPage;

    @Given("open Distribution Partners page")
    public void openDistributionPartnersPage() {
        distributionPartnersPage.openPage();
    }

    @Then("check general page elements for Distribution Partners Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        distributionPartnersPage.checkIfTitleIsCorrect();
        distributionPartnersPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
