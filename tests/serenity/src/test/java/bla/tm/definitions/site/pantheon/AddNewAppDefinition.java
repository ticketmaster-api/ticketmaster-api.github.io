package bla.tm.definitions.site.pantheon;

import bla.tm.steps.pantheon.AddNewAppSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Then;

public class AddNewAppDefinition {

    @Steps
    AddNewAppSteps addNewAppPage;

    @Then("check general page elements for Pantheon Add New App page")
    public void checkGeneralPageElements(){
        addNewAppPage.checkIfSomeElementExist();
        addNewAppPage.checkGeneralPageElements();
    }

}
