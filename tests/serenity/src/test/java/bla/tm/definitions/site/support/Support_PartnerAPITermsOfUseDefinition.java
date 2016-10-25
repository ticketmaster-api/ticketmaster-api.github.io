package bla.tm.definitions.site.support;

import bla.tm.steps.support.Support_PartnerAPITermsOfUseSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class Support_PartnerAPITermsOfUseDefinition {

    @Steps
    Support_PartnerAPITermsOfUseSteps partnerAPITermsOfUsePage;

    @Given("open Partner API Terms Of Use page")
    public void givenOpenPartnerAPITermsOfUsePage() {
        partnerAPITermsOfUsePage.openPage();
    }

    @Then("check general page elements for Partner API Terms Of Use Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        partnerAPITermsOfUsePage.checkIfTitleIsCorrect();
        partnerAPITermsOfUsePage.checkGeneralPageElements(disqus, leftMenu);
    }

}
