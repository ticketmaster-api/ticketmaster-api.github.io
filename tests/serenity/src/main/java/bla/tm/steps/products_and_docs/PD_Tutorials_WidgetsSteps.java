package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_Tutorials_WidgetsPage;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import static bla.tm.staticmethods.StaticMethods.findWebElementByKey;
import static bla.tm.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.*;

public class PD_Tutorials_WidgetsSteps {

    PD_Tutorials_WidgetsPage tutorialsWidgetsPage;

    @Step
    public void openPage() {
        tutorialsWidgetsPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (tutorialsWidgetsPage.getTitleText(), tutorialsWidgetsPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsWidgetsPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void validateAndClickElement(String key) {
        WebElementFacade element = findWebElementByKey(key, tutorialsWidgetsPage.getClickableElements());
        element.isEnabled();
        element.click();
    }

    @Step
    public void checkIfWidgetIsNotShown() {
        waitForSomeActionHappened(500);
        assertFalse(tutorialsWidgetsPage.getFeedbackWidget().isCurrentlyVisible());
    }

    @Step
    public void checkIfWidgetIsShown() {
        assertFalse(tutorialsWidgetsPage.getFeedbackWidget().isCurrentlyVisible());
    }

    @Step
    public void clickFeedbackButton() {
        tutorialsWidgetsPage.getFeedbackButton().click();
    }

    @Step
    public void clickCloseFeedbackWidgetButton() {
        tutorialsWidgetsPage.getFeedbackWidget().getCloseButton().click();
    }

    @Step
    public void clickSendFeedbackWidgetButton() {
        tutorialsWidgetsPage.getFeedbackWidget().getSendButton().click();
    }

    @Step
    public void checkFeedbackElementsAreNtShown() {
        assertFalse(tutorialsWidgetsPage.getFeedbackWidget().getTitleText().isCurrentlyVisible());
        assertFalse(tutorialsWidgetsPage.getFeedbackWidget().getNameLabel().isCurrentlyVisible());
        assertFalse(tutorialsWidgetsPage.getFeedbackWidget().getEmailLabel().isCurrentlyVisible());
        assertFalse(tutorialsWidgetsPage.getFeedbackWidget().getSubjectLabel().isCurrentlyVisible());
        assertFalse(tutorialsWidgetsPage.getFeedbackWidget().getDescriptionLable().isCurrentlyVisible());
        assertFalse(tutorialsWidgetsPage.getFeedbackWidget().getNameTextField().isCurrentlyVisible());
        assertFalse(tutorialsWidgetsPage.getFeedbackWidget().getEmailTextField().isCurrentlyVisible());
        assertFalse(tutorialsWidgetsPage.getFeedbackWidget().getSubjectDropdown().isCurrentlyVisible());
        assertFalse(tutorialsWidgetsPage.getFeedbackWidget().getDescriptionTextField().isCurrentlyVisible());
        assertFalse(tutorialsWidgetsPage.getFeedbackWidget().getCloseButton().isCurrentlyVisible());
        assertFalse(tutorialsWidgetsPage.getFeedbackWidget().getSendButton().isCurrentlyVisible());
    }

    @Step
    public void checkFeedbackElementsAreShown() {
        assertEquals("Leave Your Feedback", tutorialsWidgetsPage.getFeedbackWidget().getTitleText().getText());
        assertEquals("Your name", tutorialsWidgetsPage.getFeedbackWidget().getNameLabel().getText());
        assertEquals("Your email",tutorialsWidgetsPage.getFeedbackWidget().getEmailLabel().getText());
        assertEquals("Subject",tutorialsWidgetsPage.getFeedbackWidget().getSubjectLabel().getText());
        assertEquals("Description",tutorialsWidgetsPage.getFeedbackWidget().getDescriptionLable().getText());
        assertTrue(tutorialsWidgetsPage.getFeedbackWidget().getNameTextField().isCurrentlyVisible());
        assertTrue(tutorialsWidgetsPage.getFeedbackWidget().getEmailTextField().isCurrentlyVisible());
        assertTrue(tutorialsWidgetsPage.getFeedbackWidget().getSubjectDropdown().isCurrentlyVisible());
        assertEquals(3, tutorialsWidgetsPage.getFeedbackWidget().getSubjectDropdown().getSelectOptions().size());
        assertEquals("General feedback", tutorialsWidgetsPage.getFeedbackWidget().getSubjectDropdown().getSelectOptions().get(0));
        assertEquals("Current workflow of the portal", tutorialsWidgetsPage.getFeedbackWidget().getSubjectDropdown().getSelectOptions().get(1));
        assertEquals("Technical issues", tutorialsWidgetsPage.getFeedbackWidget().getSubjectDropdown().getSelectOptions().get(2));
        assertTrue(tutorialsWidgetsPage.getFeedbackWidget().getDescriptionTextField().isCurrentlyVisible());
        assertTrue(tutorialsWidgetsPage.getFeedbackWidget().getCloseButton().isCurrentlyVisible());
        assertTrue(tutorialsWidgetsPage.getFeedbackWidget().getSendButton().isCurrentlyVisible());
    }

    @Step
    public void checkErrorNotificationForTextField() {
        assertTrue(tutorialsWidgetsPage.getFeedbackWidget().getTextFieldError().isVisible());
    }

    @Step
    public void checkErrorNotificationForTextArea() {
        assertTrue(tutorialsWidgetsPage.getFeedbackWidget().getTextAreaError().isVisible());
    }

    @Step
    public void populateAllFieldsExceptName() {
        tutorialsWidgetsPage.getFeedbackWidget().getEmailTextField().sendKeys("test@test.com");
        tutorialsWidgetsPage.getFeedbackWidget().getDescriptionTextField().sendKeys("test!");
    }

    @Step
    public void populateAllFieldsExceptEmail() {
        tutorialsWidgetsPage.getFeedbackWidget().getNameTextField().sendKeys("test user");
        tutorialsWidgetsPage.getFeedbackWidget().getDescriptionTextField().sendKeys("test test!");
    }

    @Step
    public void populateNameFieldWithMoreThanAccepted() {
        String input = new String(new char[256]).replace('\0', 'w');
        tutorialsWidgetsPage.getFeedbackWidget().getNameTextField().sendKeys(input);
    }

    @Step
    public void checkDescriptionErrorMessageIsShown() {
        assertTrue(tutorialsWidgetsPage.getFeedbackWidget().getDescriptionErrorMessage().isVisible());
    }

    @Step
    public void clickOkFeedbackWidgetButton() {
        tutorialsWidgetsPage.getSuccessfulSentEmailNotificationOKButton().click();
    }

    @Step
    public void checkEmailSentNotificationIsShown() {
        assertTrue(tutorialsWidgetsPage.getSuccessfulSentEmailNotificationOKButton().isVisible());
    }

    @Step
    public void checkEmailSentNotificationIsNotShown() {
        waitForSomeActionHappened(500);
        assertFalse(tutorialsWidgetsPage.getSuccessfulSentEmailNotificationOKButton().isVisible());
    }
}
