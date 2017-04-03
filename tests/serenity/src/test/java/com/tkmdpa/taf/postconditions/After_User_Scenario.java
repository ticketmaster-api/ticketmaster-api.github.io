package com.tkmdpa.taf.postconditions;

import com.tkmdpa.taf.steps.AnyPageSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.AfterScenario;

public class After_User_Scenario{
    @Steps
    AnyPageSteps anyPageSteps;

    //TODO add ability to clear results for all outcomes (auto tests) if somethings goes wrong
    //TODO overview all test cases. Identify which of them are automated. Mark appropriate scenario by adding test-case name into scenario title [testcase:...]

    @AfterScenario()
    public void clearCookiesAndLocalStorage (){
        anyPageSteps.clearCookiesAndLocalStorage();
    }

    @AfterScenario(uponOutcome = AfterScenario.Outcome.SUCCESS)
    public void afterScenarioSuccess() throws Exception {
        setStatusForCurrentIssue("Passed");
    }

    @AfterScenario(uponOutcome = AfterScenario.Outcome.FAILURE)
    public void afterScenarioFailure() throws Exception {
        setStatusForCurrentIssue("Failed");
    }

    private void setStatusForCurrentIssue(String status) throws Exception{
        //status could be: Failed or Passed
        if(System.getProperty("testRunName") != null) {
            JiraIntegrator jiraIntegrator = new JiraIntegrator();
            String currentTestCaseName = jiraIntegrator.getTestCaseName();
            if(currentTestCaseName != null) {
                String responseData = jiraIntegrator.getResponseFromJira(currentTestCaseName, System.getProperty("testRunName"));
                String testId = jiraIntegrator.getIssueKeyByResponse(responseData);
                jiraIntegrator.setStatusForIssue(testId, status);
            }
        }
    }
}
