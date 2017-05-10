package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.steps.site.AnyPageSteps;
import com.tkmdpa.taf.steps.products_and_docs.PD_SDKsSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static com.tkmdpa.taf.AcceptanceTestSuite.baseTestedUrl;

public class PD_SDKsDefinition {

    @Steps
    PD_SDKsSteps sDKsPage;

    @Steps
    AnyPageSteps anyPageSteps;

    @Given("open SDKs page")
    public void openSDKsPage() {
        sDKsPage.openPage();
    }

    @When("check visibility and click $key element of SDKs page")
    public void checkIfElementVisibleAndClickIt(String key) {
        sDKsPage.validateAndClickElement(key);
    }

    @Then("check that new page opened from SDKs page has $url and $title")
    public void checkIfPageIsOpened(String url, String title){
        anyPageSteps.checkIfPageIsOpened(url, title, baseTestedUrl);
    }

    @Then("check general page elements for SDKs Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        sDKsPage.checkIfTitleIsCorrect();
        sDKsPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
