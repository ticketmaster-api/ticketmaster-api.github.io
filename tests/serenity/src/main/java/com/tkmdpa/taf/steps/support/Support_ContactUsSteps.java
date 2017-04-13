package com.tkmdpa.taf.steps.support;

import com.tkmdpa.taf.pages.site.support.Support_ContactUsPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class Support_ContactUsSteps {

    Support_ContactUsPage contactUsPage;

    @Step
    public void openPage() {
        contactUsPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (contactUsPage.getTitleText(), contactUsPage.getPageHeader());
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        contactUsPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void populateDescription(int number) {
        String input = new String(new char[number]).replace('\0', 'w');
        contactUsPage.getDescriptionField().sendKeys(input);
    }

    @Step
    public void populateNameField(String text) {
        contactUsPage.getFirstNameField().sendKeys(text);
    }

    @Step
    public void populateEmailField(String text) {
        contactUsPage.getEmailAddressField().sendKeys(text);
    }

}
