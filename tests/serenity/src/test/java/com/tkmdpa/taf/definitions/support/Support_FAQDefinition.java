package com.tkmdpa.taf.definitions.support;

import com.tkmdpa.taf.steps.support.Support_FAQSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class Support_FAQDefinition {

    @Steps
    Support_FAQSteps faqPage;

    @Given("open FAQ page")
    public void givenOpenFAQPage() {
        faqPage.openPage();
    }

    @Then("check general page elements for FAQ Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        faqPage.checkIfTitleIsCorrect();
        faqPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
