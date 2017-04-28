package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.steps.products_and_docs.PD_Tutorials_Widgets_EventDiscoveryWidgetSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class PD_Tutorials_Widgets_EventDiscoveryWidgetDefinition {

    @Steps
    PD_Tutorials_Widgets_EventDiscoveryWidgetSteps tutorialsWidgetsEventDiscoveryWidgetPage;

    @Given("open Tutorials Widgets EventDiscoveryWidget page")
    public void openTutorialsWidgetsEventDiscoveryWidgetPage() {
        tutorialsWidgetsEventDiscoveryWidgetPage.openPage();
    }

    @Then("check general page elements for Tutorials Widgets EventDiscoveryWidget Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsWidgetsEventDiscoveryWidgetPage.checkIfTitleIsCorrect();
        tutorialsWidgetsEventDiscoveryWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
