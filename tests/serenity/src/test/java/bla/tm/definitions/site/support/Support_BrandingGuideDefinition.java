package bla.tm.definitions.site.support;

import bla.tm.steps.support.Support_BrandingGuideSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

import static org.junit.Assert.assertTrue;

public class Support_BrandingGuideDefinition {

    @Steps
    Support_BrandingGuideSteps brandingGuidePag;

    @Given("open Branding Guide page")
    public void givenOpenBrandingGuidePage() {
        brandingGuidePag.maximiseBrowserWindow();
        brandingGuidePag.openPage();
    }

    @Then("check general page elements for Branding Guide Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        brandingGuidePag.checkGeneralPageElements(disqus, leftMenu);
    }

}
