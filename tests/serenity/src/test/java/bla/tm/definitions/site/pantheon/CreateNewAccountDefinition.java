package bla.tm.definitions.site.pantheon;

import bla.tm.steps.pantheon.CreateNewAccountSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Then;

public class CreateNewAccountDefinition {

    @Steps
    CreateNewAccountSteps createNewAccountPage;

    @Then("check general page elements for Pantheon Create New Account page")
    public void checkGeneralPageElements(){
        createNewAccountPage.checkIfTitleIsCorrect();
        createNewAccountPage.checkGeneralPageElements();
    }

}
