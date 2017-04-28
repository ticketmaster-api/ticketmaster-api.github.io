package com.tkmdpa.taf.definitions.pantheon;

import com.tkmdpa.taf.steps.pantheon.EditProfileSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Then;

public class EditProfileDefinition {

    @Steps
    EditProfileSteps editProfilePage;

    @Then("check general page elements for Pantheon Edit Profile page")
    public void checkGeneralPageElements(){
        editProfilePage.checkIfTitleIsCorrect();
        editProfilePage.checkGeneralPageElements();
    }

}
