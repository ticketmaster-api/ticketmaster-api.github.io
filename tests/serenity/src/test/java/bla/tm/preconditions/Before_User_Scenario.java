package bla.tm.preconditions;

import bla.tm.steps.AnyPageSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.BeforeScenario;

public class Before_User_Scenario {

    @Steps
    AnyPageSteps anyPageSteps;

    @BeforeScenario()
    public void beforeEachScenario (){
        anyPageSteps.maximizeWindow();
    }
}
