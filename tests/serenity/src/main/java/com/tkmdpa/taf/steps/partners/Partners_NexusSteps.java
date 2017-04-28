package com.tkmdpa.taf.steps.partners;

import com.tkmdpa.taf.pages.site.partners.Partners_NexusPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertTrue;

public class Partners_NexusSteps {

    Partners_NexusPage nexusPage;

    @Step
    public void openPage() {
        nexusPage.open();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        nexusPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void populateEmail(String text) {
        nexusPage.getEmailField().sendKeys(text);
    }

    @Step
    public void checkRadioButton(String name) {
        nexusPage.getRadio(name).click();
    }

    @Step
    public void populateDescription(int number) {
        String input = new String(new char[number]).replace('\0', 'w');
        nexusPage.getDescription().sendKeys(input);
    }

    @Step
    public void checkThatEmailWesSuccessfullySent() {
        assertTrue(nexusPage.getSuccessfulSentEmailNotificationOKButton().isVisible());
    }
}
