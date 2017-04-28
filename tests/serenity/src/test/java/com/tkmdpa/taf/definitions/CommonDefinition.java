package com.tkmdpa.taf.definitions;

import com.tkmdpa.taf.steps.AnyPageSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.When;

public class CommonDefinition {

    protected final String apiKey = "{apikey}";

    @Steps
    private AnyPageSteps anyPageSteps;

    @When("user logout from the application")
    public void logOutFromApplication(){
        anyPageSteps.clickLogOut();
    }
}
