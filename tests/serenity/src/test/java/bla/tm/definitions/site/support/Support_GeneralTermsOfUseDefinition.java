package bla.tm.definitions.site.support;

import bla.tm.steps.support.Support_GeneralTermsOfUseSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

import static org.junit.Assert.assertTrue;

public class Support_GeneralTermsOfUseDefinition {

    @Steps
    Support_GeneralTermsOfUseSteps generalTermsOfUsePage;

    @Given("open General Terms Of Use page")
    public void givenOpenGeneralTermsOfUsePage() {
        generalTermsOfUsePage.maximiseBrowserWindow();
        generalTermsOfUsePage.openPage();
    }

    @Then("check general page elements for General Terms Of Use Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        generalTermsOfUsePage.checkGeneralPageElements(disqus, leftMenu);
    }

}
