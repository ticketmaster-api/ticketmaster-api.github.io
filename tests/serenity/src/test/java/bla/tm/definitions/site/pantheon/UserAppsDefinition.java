package bla.tm.definitions.site.pantheon;

import bla.tm.steps.pantheon.UserAppsSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Then;

public class UserAppsDefinition {

    @Steps
    UserAppsSteps addNewAppPage;

    @Then("check general page elements for Pantheon Add New App page")
    public void checkGeneralPageElements(){
        addNewAppPage.checkIfSomeElementExist();
        addNewAppPage.checkGeneralPageElements();
    }

}
