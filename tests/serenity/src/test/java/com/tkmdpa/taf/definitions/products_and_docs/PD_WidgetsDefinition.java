package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.steps.AnyPageSteps;
import com.tkmdpa.taf.steps.products_and_docs.PD_WidgetsSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static com.tkmdpa.taf.AcceptanceTestSuite.baseTestedUrl;

public class PD_WidgetsDefinition {

    @Steps
    PD_WidgetsSteps widgetsPage;

    @Steps
    AnyPageSteps anyPage;

    @Given("open Widgets page")
    public void openWidgetsPage() {
        widgetsPage.openPage();
    }

    @When("check visibility and click $key element of Widgets page")
    public void checkIfElementVisibleAndClickIt(String key) {
        widgetsPage.validateAndClickElement(key);
    }

    @Then("check general page elements for Widgets Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        widgetsPage.checkIfTitleIsCorrect();
        widgetsPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that new page opened from Widgets page has $url and $title")
    public void checkIfPageIsOpened(String url, String title){
        anyPage.checkIfPageIsOpened(url,title,baseTestedUrl);
    }

    @Then("check that new page opened from Direct Payment Button has has appropriate url")
    public void checkDirectPaymentButton(){
        widgetsPage.switchToNewTab();
        anyPage.checkIfPageIsOpened("https://www.universe.com/directpayments","//h1",baseTestedUrl);
    }
}
