package bla.tm.postconditions;

import bla.tm.steps.AnyPageSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.AfterScenario;

public class After_User_Scenario {
    @Steps
    AnyPageSteps anyPageSteps;

    @AfterScenario(uponOutcome=AfterScenario.Outcome.FAILURE)
    public void afterFailedScenario() {
        anyPageSteps.quitBrowser();
    }

    @AfterScenario()
    public void clearCookiesAndLocalStorage (){
        anyPageSteps.clearCookiesAndLocalStorage();
    }
}
