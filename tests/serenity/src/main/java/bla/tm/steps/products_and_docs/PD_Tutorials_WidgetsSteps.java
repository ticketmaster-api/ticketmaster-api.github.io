package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_Tutorials_WidgetsPage;
import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.pages.WebElementFacade;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import net.thucydides.core.annotations.Step;
import org.openqa.selenium.NoSuchElementException;

public class PD_Tutorials_WidgetsSteps {

    PD_Tutorials_WidgetsPage tutorialsWidgetsPage;

    @Step
    public void openPage() {
        tutorialsWidgetsPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        tutorialsWidgetsPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return tutorialsWidgetsPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsWidgetsPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void validateAndClickElement(String key) {
        WebElementFacade element = tutorialsWidgetsPage.findWebElementByKey(key);
        element.isEnabled();
        element.click();
    }

    @Step
    public void checkIfWidgetIsNotShown() {
        try {
            Thread.sleep(1000);
        } catch(InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
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
        tutorialsWidgetsPage.getFeedbackWidget().getDescriptionTextField().sendKeys("test test test test test!!!");
    }

    @Step
    public void populateAllFieldsExceptEmail() {
        tutorialsWidgetsPage.getFeedbackWidget().getNameTextField().sendKeys("test user");
        tutorialsWidgetsPage.getFeedbackWidget().getDescriptionTextField().sendKeys("test test test test test!!!");
    }

    @Step
    public void populateAllFieldsExceptDescription() {
        tutorialsWidgetsPage.getFeedbackWidget().getNameTextField().sendKeys("test user");
        tutorialsWidgetsPage.getFeedbackWidget().getEmailTextField().sendKeys("test@test.com");
    }

    @Step
    public void populateNameFieldWithMoreThanAccepted() {
        tutorialsWidgetsPage.getFeedbackWidget().getNameTextField().sendKeys("" +
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et mauris in neque feugiat dapibus. \n" +
                "Praesent eget placerat nisi. Praesent velit odio, congue eu pellentesque nec, pretium nec ex. \n" +
                "Pellentesque magna libero, commodo vitae ex vitae, vehicula porttitor libero.");
    }

    @Step
    public void checkNameTextWasTruncated() {
        assertEquals(255, tutorialsWidgetsPage.getFeedbackWidget().getNameTextField().getTextValue().length());
    }

    @Step
    public void populateDescriptionFieldWithMoreThanAccepted() {
        tutorialsWidgetsPage.getFeedbackWidget().getDescriptionTextField().sendKeys("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et mauris in neque feugiat dapibus. Praesent eget placerat nisi. Praesent velit odio, congue eu pellentesque nec, pretium nec ex. Pellentesque magna libero, commodo vitae ex vitae, vehicula porttitor libero. Aenean ac rutrum mi. Proin lobortis tortor dignissim cursus luctus. Proin id sem et ligula venenatis suscipit. Sed scelerisque risus diam, eget ornare sem placerat et. Etiam bibendum pretium iaculis. Quisque in orci vitae quam viverra interdum. Nulla orci lectus, faucibus id sodales vel, gravida quis velit. Aliquam vitae mi magna. Integer nec lectus luctus, commodo nibh id, imperdiet urna.\n" +
                "\n" +
                "In sed enim accumsan, iaculis mauris a, sagittis ligula. Suspendisse a tempus arcu. Nunc varius lacus in tellus malesuada lacinia. Aenean eleifend faucibus tempus. Fusce sagittis sagittis dui egestas feugiat. Curabitur interdum sollicitudin sollicitudin. Nam id massa id quam hendrerit tempor. Mauris tempor arcu dolor, quis sagittis magna feugiat pulvinar. Vestibulum sit amet dolor elit. Ut dictum orci ac risus tincidunt, id rutrum neque mattis. Morbi blandit accumsan ligula. Integer sed augue id enim tempor bibendum.\n" +
                "\n" +
                "Proin eu ante ac velit posuere tincidunt ac sed magna. Morbi laoreet lacinia leo vel sodales. Ut faucibus, massa sed malesuada porttitor, turpis erat commodo diam, eget facilisis ligula velit sed turpis. Etiam a nibh eu ex cursus volutpat vel eu odio. Fusce porta nulla ac pharetra imperdiet. Pellentesque aliquet nec metus convallis porta. Maecenas sit amet sapien sit amet diam pulvinar lacinia. Nam sit amet rutrum dui, a placerat mauris. Morbi egestas eleifend urna, elementum egestas purus consequat ut. Aliquam aliquet fringilla purus ut finibus. Fusce hendrerit nisl sem, ac viverra tortor pulvinar sed. Phasellus lacinia in metus quis ultrices. Etiam sollicitudin egestas enim, sit amet lobortis tellus lobortis eu. Vestibulum consectetur, odio ut viverra congue, orci quam feugiat nulla, ac accumsan ex ligula ac orci.\n" +
                "\n" +
                "Mauris malesuada erat nec orci elementum elementum. Suspendisse in placerat mi. Proin sed imperdiet tellus, in consequat nisl. Quisque efficitur, neque eget maximus consequat, mi enim vehicula odio, sit amet egestas purus elit sed sem. Proin suscipit massa ut tempor interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin sagittis lacinia neque at rhoncus. Mauris nec enim purus. In metus magna, auctor in arcu et, auctor hendrerit mauris. Nunc justo lectus, bibendum eu commodo quis, interdum nec odio. Quisque vitae odio mollis ligula ullamcorper vulputate. Pellentesque fringilla tempus dui, a hendrerit nisi accumsan nec. Donec euismod justo nisi, vel consectetur nisl scelerisque ac. Praesent accumsan nulla nunc, nec tincidunt sem vulputate fermentum. Donec interdum aliquet tincidunt.\n" +
                "\n" +
                "Aliquam erat volutpat. Donec in orci dolor. Etiam egestas felis sit amet leo lacinia sagittis. Proin pharetra pellentesque commodo. Phasellus ac tellus sem. Integer in fermentum dolor, eu scelerisque ipsum. Duis dignissim rhoncus purus, ut viverra magna ultrices quis. Sed velit nisl, feugiat sed tempus non, iaculis id felis. Etiam a ligula sodales libero iaculis pulvinar id a tellus.");
    }

    @Step
    public void checkDescriptionErrorMessageIsShown() {
        assertTrue(tutorialsWidgetsPage.getFeedbackWidget().getDescriptionErrorMessage().isVisible());
    }

    @Step
    public void populateEmailFieldIncorrectly1() {
        tutorialsWidgetsPage.getFeedbackWidget().getEmailTextField().sendKeys("test");
    }

    @Step
    public void populateEmailFieldIncorrectly2() {
        tutorialsWidgetsPage.getFeedbackWidget().getEmailTextField().sendKeys("test@test");
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
        try {
            Thread.sleep(1000);
        } catch(InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
        assertFalse(tutorialsWidgetsPage.getSuccessfulSentEmailNotificationOKButton().isVisible());
    }
}
