package bla.tm.definitions.site.support;

import bla.tm.steps.support.Support_FAQSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

import static org.junit.Assert.assertTrue;

public class Support_FAQDefinition {

    @Steps
    Support_FAQSteps faqPag;

    @Given("open FAQ page")
    public void givenOpenFAQPage() {
        faqPag.maximiseBrowserWindow();
        faqPag.openPage();
    }

    @Then("check general page elements for FAQ Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        faqPag.checkGeneralPageElements(disqus, leftMenu);
    }

}
