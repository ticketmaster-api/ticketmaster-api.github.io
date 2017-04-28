package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.steps.AnyPageSteps;
import com.tkmdpa.taf.steps.products_and_docs.PD_Tutorials_WidgetsSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static com.tkmdpa.taf.AcceptanceTestSuite.baseTestedUrl;
import static com.tkmdpa.taf.staticmethods.StaticMethods.waitForSomeActionHappened;

public class PD_Tutorials_WidgetsDefinition {

    @Steps
    PD_Tutorials_WidgetsSteps tutorialsWidgetsPage;

    @Steps
    AnyPageSteps anyPageSteps;

    @Given("open Tutorials Widgets page")
    public void openTutorialsWidgetsPage() {
        tutorialsWidgetsPage.openPage();
    }

    @Given("Feedback mapWidget elements are not shown")
    public void checkFeedbackElementsAreNotShown() {
        tutorialsWidgetsPage.checkFeedbackElementsAreNtShown();
    }

    @Given("Feedback mapWidget is not shown")
    @Then("Feedback mapWidget is not shown")
    public void checkIfWidgetIsNotShown() {
        tutorialsWidgetsPage.checkIfWidgetIsNotShown();
    }

    @When("check visibility and click $key element of Tutorials Widgets page")
    public void checkIfElementVisibleAndClickIt(String key) {
        tutorialsWidgetsPage.validateAndClickElement(key);
    }

    @Given("click Feedback button of Tutorials Widgets page")
    @When("click Feedback button of Tutorials Widgets page")
    public void clickFeedbackButton() {
        tutorialsWidgetsPage.clickFeedbackButton();
    }

    @When("click close button of Feedback widget")
    public void clickCloseButton(){
        tutorialsWidgetsPage.clickCloseFeedbackWidgetButton();
    }

    @Given("feedback widget is not shown")
    @Then("feedback widget is not shown")
    public void checkThatFeedbackWidgetIsNotShown(){
        tutorialsWidgetsPage.checkThatFeedbackWidgetIsNotShown();
    }

    @Then("feedback widget elements is shown")
    public void checkThatFeedbackWidgetIsShown(){
        tutorialsWidgetsPage.checkThatFeedbackWidgetIsShown();
    }

    @When("click send button of Feedback mapWidget")
    public void clickSendButton() {
        tutorialsWidgetsPage.clickSendFeedbackWidgetButton();
    }

    @When("name is populated with $text")
    public void populateNameField(String text) {
        tutorialsWidgetsPage.populateName(text);
    }

    @When("click send button of Feedback widget")
    public void clickSendButtonOnFeedbackWidget(){
        tutorialsWidgetsPage.clickSendFeedbackWidgetButton();
    }

    @When("email is populated with $text")
    public void populateEmailField(String text) {
        tutorialsWidgetsPage.populateEmail(text);
    }

    @When("description field is populated with $number symbols text")
    public void populateNameFieldWithMoreThanAccepted(int number) {
        tutorialsWidgetsPage.populateDescriptionFieldWithMoreThanAccepted(number);
        waitForSomeActionHappened(500);
    }

    @Then("check general page elements for Tutorials Widgets Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsWidgetsPage.checkIfTitleIsCorrect();
        tutorialsWidgetsPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that new page opened from Tutorials Widgets page has $url and $title")
    public void checkIfPageIsOpened(String url, String title){
        anyPageSteps.checkIfPageIsOpened(url,title,baseTestedUrl);
    }

    @Then("Feedback mapWidget is shown")
    public void checkIfWidgetIsShown() {
        tutorialsWidgetsPage.checkIfWidgetIsShown();
    }

    @Then("Feedback mapWidget elements are shown")
    public void checkFeedbackElementsAreShown() {
        tutorialsWidgetsPage.checkFeedbackElementsAreShown();
    }

    @Then("click close button of Feedback mapWidget")
    public void clickCloseFeedbackWidgetButton() {
        tutorialsWidgetsPage.clickCloseFeedbackWidgetButton();
    }

    @Then("check that error message is shown for Description for Feedback mapWidget")
    public void checkDescriptionErrorMessageIsShown() {
        tutorialsWidgetsPage.checkDescriptionErrorMessageIsShown();
    }

    @Then("feedback was successfully sent")
    public void checkFeedbackWasSent(){
        anyPageSteps.checkEmailSentNotificationIsShown();
    }

    @Then("error notification is shown")
    public void checkFeedbackWasNotSent(){
        anyPageSteps.checkErrorEmailSentNotificationIsShown();
    }

}
