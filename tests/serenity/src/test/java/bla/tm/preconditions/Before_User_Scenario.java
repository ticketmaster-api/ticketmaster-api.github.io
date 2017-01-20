package bla.tm.preconditions;

import bla.tm.steps.AnyPageSteps;
import org.jbehave.core.annotations.BeforeScenario;

public class Before_User_Scenario {

    AnyPageSteps anyPageSteps;

    @BeforeScenario()
    public void clearCookiesAndLocalStorage (){
        anyPageSteps.clearCookiesAndLocalStorage();
    }

}
