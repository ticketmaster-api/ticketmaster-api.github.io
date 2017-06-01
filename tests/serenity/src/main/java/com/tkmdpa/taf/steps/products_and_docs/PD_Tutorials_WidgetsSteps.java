package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.AnyPage;
import com.tkmdpa.taf.pages.site.products_and_docs.PD_Tutorials_WidgetsPage;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import static com.tkmdpa.taf.staticmethods.StaticMethods.checkIfWebElementExist;
import static com.tkmdpa.taf.staticmethods.StaticMethods.findWebElementByKey;
import static org.junit.Assert.*;

public class PD_Tutorials_WidgetsSteps {

    PD_Tutorials_WidgetsPage tutorialsWidgetsPage;
    AnyPage anyPage;

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
        WebElementFacade element = findWebElementByKey(key, tutorialsWidgetsPage.getClickAbleElements());
        element.isEnabled();
        element.click();
    }

    @Step
    public void checkIfWidgetIsNotShown() {
        anyPage.waitForPageReadyStateComplete();
        anyPage.waitForAjaxToComplete();
        assertFalse(tutorialsWidgetsPage.getFeedbackWidget().isCurrentlyVisible());
    }

    @Step
    public void checkIfWidgetIsShown() {
        assertFalse(tutorialsWidgetsPage.getFeedbackWidget().isCurrentlyVisible());
    }

    @Step
    public void clickFeedbackButton() {
        tutorialsWidgetsPage.getFeedbackButton().click();
        anyPage.waitForAjaxToComplete();
        anyPage.waitForPageReadyStateComplete();
    }

    @Step
    public void clickCloseFeedbackWidgetButton() {
        tutorialsWidgetsPage.getFeedbackWidget().getCloseButton().click();
        anyPage.waitForPageReadyStateComplete();
        anyPage.waitForAjaxToComplete();
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
    public void populateName(String text) {
        checkIfWebElementExist(tutorialsWidgetsPage.getFeedbackWidget().getNameTextField());
        tutorialsWidgetsPage.getFeedbackWidget().getNameTextField().sendKeys(text);
    }

    @Step
    public void populateEmail(String text) {
        tutorialsWidgetsPage.getFeedbackWidget().getEmailTextField().sendKeys(text);
    }

    @Step
    public void populateDescriptionFieldWithMoreThanAccepted(int number) {
        String input = new String(new char[number]).replace('\0', 'w');
        tutorialsWidgetsPage.getFeedbackWidget().getDescriptionTextField().sendKeys(input);
    }

    @Step
    public void checkDescriptionErrorMessageIsShown() {
        assertTrue(tutorialsWidgetsPage.getFeedbackWidget().getDescriptionErrorMessage().isVisible());
    }

    @Step
    public void checkThatFeedbackWidgetIsShown() {
        assertTrue(tutorialsWidgetsPage.getFeedbackWidget().isVisible());
    }

    @Step
    public void checkThatFeedbackWidgetIsNotShown() {
        tutorialsWidgetsPage.getFeedbackWidget().shouldNotBeVisible();
    }

}
