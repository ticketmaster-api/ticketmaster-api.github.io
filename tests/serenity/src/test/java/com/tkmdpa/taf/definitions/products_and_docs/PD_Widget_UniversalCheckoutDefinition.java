package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.steps.products_and_docs.PD_Widget_UniversalCheckoutSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class PD_Widget_UniversalCheckoutDefinition {
    @Steps
    PD_Widget_UniversalCheckoutSteps universalCheckoutPage;

    //Given
    @Given("open Universal Checkout page")
    public void openEventDiscoveryWidgetPage() {
        universalCheckoutPage.openPage();
    }

    //Then
    @Then("check general page elements for Universal Checkout Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        universalCheckoutPage.checkIfTitleIsCorrect();
        universalCheckoutPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
