package bla.tm.postconditions;

import org.jbehave.core.annotations.AfterScenario;

public class After_User_Scenario{

    //TODO add ability to clear results for all outcomes (auto tests) if somethings goes wrong
    //TODO overview all test cases. Identify which of them are automated. Mark appropriate scenario by adding test-case name into scenario title [testcase:...]

    @AfterScenario(uponOutcome = AfterScenario.Outcome.SUCCESS)
    public void afterScenarioSuccess() throws Exception {
        setStatusForCurrentIssueInJira("Passed");
    }

    @AfterScenario(uponOutcome = AfterScenario.Outcome.FAILURE)
    public void afterScenarioFailure() throws Exception {
        setStatusForCurrentIssueInJira("Failed");
    }

    private void setStatusForCurrentIssueInJira (String status) throws Exception{
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
