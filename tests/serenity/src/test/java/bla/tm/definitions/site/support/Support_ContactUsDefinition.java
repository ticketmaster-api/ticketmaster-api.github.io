package bla.tm.definitions.site.support;

import bla.tm.steps.support.Support_ContactUsSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class Support_ContactUsDefinition {

    @Steps
    Support_ContactUsSteps contactUsPage;

    @Given("open Contact Us page")
    public void givenOpenContactUsPage() {
        contactUsPage.maximiseBrowserWindow();
        contactUsPage.openPage();
    }

    @Then("check general page elements for Contact Us Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        contactUsPage.checkIfTitleIsCorrect();
        contactUsPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
