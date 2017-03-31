package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.steps.products_and_docs.PD_ChangeLogSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class PD_ChangeLogDefinition {

    @Steps
    PD_ChangeLogSteps changeLogPage;

    @Given("open ChangeLog page")
    public void openChangeLogPage() {
        changeLogPage.openPage();
    }

    @Then("check general page elements for ChangeLog Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        changeLogPage.checkIfTitleIsCorrect();
        changeLogPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
