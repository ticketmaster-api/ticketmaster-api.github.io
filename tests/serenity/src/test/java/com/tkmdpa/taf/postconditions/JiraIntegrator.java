package com.tkmdpa.taf.postconditions;

import net.thucydides.core.model.TestOutcome;
import net.thucydides.core.steps.BaseStepListener;
import org.json.JSONArray;
import org.json.JSONObject;
import org.yaml.snakeyaml.util.UriEncoder;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URI;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static net.thucydides.core.steps.StepEventBus.getEventBus;

public class JiraIntegrator {

    private static final String DECODEDPASS = "Basic bWFrc3ltX21henVya2V2eWNoOndvcnRoeUxvdmU2NQ==";

    public String getTestCaseName(){
        //Get test-case name from current scenario title
        BaseStepListener g = getEventBus().getBaseStepListener();
        List<TestOutcome> o = g.getTestOutcomes();
        String scenarioTitle = o.get(0).getName();

        //Extract test-case name from automation scenario (convention)
        Pattern pattern = Pattern.compile("\\[([^\\]]+)]");
        Matcher matcher = pattern.matcher(scenarioTitle);
        if(matcher.find()) {
            String testCaseName = matcher.group(1);
            return testCaseName;
        } else {
            return null;
        }
    }

    public String getResponseFromJira(String testCaseName, String testRunName) throws Exception {
        //GET issue from JIRA by two parameters: 1) test-case name 2)test-run name

        //Jira's advanced filter requires to escape hyphen char
        String escapedTestCaseName = testCaseName.replace("-","\\\\-");

        String encodedTestCaseName = UriEncoder.encode(escapedTestCaseName);
        String encodedTestRunName = UriEncoder.encode(testRunName);

        URI uri1 = new URI("https://jira.epam.com/jira/rest/api/2/search?jql=project%20=%20TKMDPA%20AND%20issuetype%20=%20Test%20AND%20summary%20~%20%22"+ encodedTestCaseName +"%22%20AND%20cf[24000]%20=%20%22" + encodedTestRunName +"%22");

        HttpURLConnection conn1 = (HttpURLConnection) uri1.toURL().openConnection();
        conn1.setDoOutput(true);
        conn1.setRequestMethod("GET");
        conn1.addRequestProperty("Content-Type", "application/json");
        conn1.addRequestProperty("Authorization", DECODEDPASS);

        BufferedReader br = new BufferedReader(new InputStreamReader((conn1.getInputStream())));

        int code = conn1.getResponseCode();

        String data = org.apache.commons.io.IOUtils.toString(br);
        return data;
    }

    public String getIssueKeyByResponse(String responseData){
        //JSON get issue key from json for particular test in test-run
        JSONObject json = new JSONObject(responseData);
        JSONArray issues = json.getJSONArray("issues");
        JSONObject keyObject = issues.getJSONObject(0);
        String key = keyObject.getString("key");
        return key;
    }

    public void setStatusForIssue(String testId, String testStatus) throws Exception {
        //PUT set status (Passed or Failed) for the issue (for the test)
        URI uri = new URI("https://jira.epam.com/jira/rest/tm/1.0/testcase/" + testId);
        HttpURLConnection conn = (HttpURLConnection) uri.toURL().openConnection();
        conn.setDoOutput(true);
        conn.setRequestMethod("PUT");
        conn.addRequestProperty("Content-Type", "application/json");
        conn.addRequestProperty("Authorization", DECODEDPASS);
        OutputStreamWriter out = new OutputStreamWriter(conn.getOutputStream());

        String jsonText = null;

        switch (testStatus) {
            case "Failed":
                jsonText = "{\"status\":\"Failed\"}";
                break;
            case "Passed":
                jsonText = "{\"status\":\"Passed\"}";
                break;
        }
        if(jsonText == null){
            throw new Exception("Unsupported testStatus parameter " + testStatus);
        }

        out.write(jsonText);
        out.close();

        //Check that operation succeeded
        int setStatusResponseCode = conn.getResponseCode();

        //TODO: Attach screenshot and log to test if failure
        //http://stackoverflow.com/questions/18631361/add-attachment-to-jira-via-rest-api
        //List<ScreenshotAndHtmlSource> h = o.get(0).getScreenshotAndHtmlSources();
    }
}
