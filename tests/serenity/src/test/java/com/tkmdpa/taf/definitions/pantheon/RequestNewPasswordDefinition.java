package com.tkmdpa.taf.definitions.pantheon;

import com.tkmdpa.taf.steps.pantheon.RequestNewPasswordSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Then;

public class RequestNewPasswordDefinition {

    @Steps
    RequestNewPasswordSteps requestNewPasswordPage;

    @Then("check general page elements for Pantheon Request New Password page")
    public void checkGeneralPageElements(){
        requestNewPasswordPage.checkIfTitleIsCorrect();
        requestNewPasswordPage.checkGeneralPageElements();
    }

}
