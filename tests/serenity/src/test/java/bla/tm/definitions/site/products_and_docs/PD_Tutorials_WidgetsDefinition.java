package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.AnyPageSteps;
import bla.tm.steps.products_and_docs.PD_Tutorials_WidgetsSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static bla.tm.staticmethods.StaticMethods.waitForSomeActionHappened;

public class PD_Tutorials_WidgetsDefinition {

    @Steps
    PD_Tutorials_WidgetsSteps tutorialsWidgetsPage;

    @Steps
    AnyPageSteps anyPage;

    @Given("open Tutorials Widgets page")
    public void openTutorialsWidgetsPage() {
        tutorialsWidgetsPage.maximiseBrowserWindow();
        tutorialsWidgetsPage.openPage();
    }

    @Given("Feedback widget elements are not shown")
    public void checkFeedbackElementsAreNtShown() {
        tutorialsWidgetsPage.checkFeedbackElementsAreNtShown();
    }

    @Given("Feedback widget is not shown")
    @Then("Feedback widget is not shown")
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

    @When("click send button of Feedback widget")
    public void clickSendButton() {
        tutorialsWidgetsPage.clickSendFeedbackWidgetButton();
    }

    @When("all fields except Name are populated")
    public void populateAllFieldsExceptName() {
        tutorialsWidgetsPage.populateAllFieldsExceptName();
    }

    @When("all fields except Email are populated")
    public void populateAllFieldsExceptEmail() {
        tutorialsWidgetsPage.populateAllFieldsExceptEmail();
    }

    //We don't need to use this method because Description is not INPUT but TEXTAREA web element
    @When("all fields except Description are populated")
    public void populateAllFieldsExceptDescription() {
        tutorialsWidgetsPage.populateAllFieldsExceptDescription();
    }

    @When("Name field is populated with bigger than 255 symbols text")
    public void populateNameFieldWithMoreThanAccepted() {
        waitForSomeActionHappened(50);
        tutorialsWidgetsPage.populateNameFieldWithMoreThanAccepted();
    }

    @When("Description field is populated with bigger than 3000 symbols text")
    public void populateDescriptionFieldWithMoreThanAccepted() {
        tutorialsWidgetsPage.populateDescriptionFieldWithMoreThanAccepted();
    }

    @When("Email is not correctly populated 1")
    public void populateEmailFieldIncorrectly1() {
        tutorialsWidgetsPage.populateEmailFieldIncorrectly1();
    }

    @When("Email is not correctly populated 2")
    public void populateEmailFieldIncorrectly2() {
        tutorialsWidgetsPage.populateEmailFieldIncorrectly2();
    }

    @When("click OK Feedback Widget button")
    @Then("click OK Feedback Widget button")
    public void clickOkFeedbackWidgetButton() {
        tutorialsWidgetsPage.clickOkFeedbackWidgetButton();
    }

    @Then("check general page elements for Tutorials Widgets Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsWidgetsPage.checkIfTitleIsCorrect();
        tutorialsWidgetsPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that new page opened from Tutorials Widgets page has $url and $title")
    public void checkIfPageIsOpened(String url, String title){
        anyPage.checkIfPageIsOpened(url,title);
    }

    @Then("Feedback widget is shown")
    public void checkIfWidgetIsShown() {
        tutorialsWidgetsPage.checkIfWidgetIsShown();
    }

    @Then("Feedback widget elements are shown")
    public void checkFeedbackElementsAreShown() {
        tutorialsWidgetsPage.checkFeedbackElementsAreShown();
    }

    @Then("click close button of Feedback widget")
    public void clickCloseFeedbackWidgetButton() {
        tutorialsWidgetsPage.clickCloseFeedbackWidgetButton();
    }

    @Then("error notification is shown for Feedback widget")
    public void checkErrorNotificationForTextField() {
        tutorialsWidgetsPage.checkErrorNotificationForTextField();
    }

    @Then("description error notification is shown for Feedback widget")
    public void checkErrorNotificationForTextArea() {
        tutorialsWidgetsPage.checkErrorNotificationForTextArea();
    }

    @Then("check that text was truncated to 255 symbols for Feedback widget")
    public void checkNameTextWasTruncated() {
        tutorialsWidgetsPage.checkNameTextWasTruncated();
    }

    @Then("check that error message is shown for Description for Feedback widget")
    public void checkDescriptionErrorMessageIsShown() {
        tutorialsWidgetsPage.checkDescriptionErrorMessageIsShown();
    }

    @Then("check that email sent notification is shown")
    public void checkEmailSentNotificationIsShown() {
        tutorialsWidgetsPage.checkEmailSentNotificationIsShown();
    }

    @Then("check that email sent notification is not shown")
    public void checkEmailSentNotificationIsNotShown() {
        tutorialsWidgetsPage.checkEmailSentNotificationIsNotShown();
    }

}
