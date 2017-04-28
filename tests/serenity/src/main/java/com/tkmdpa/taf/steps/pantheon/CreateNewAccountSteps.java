package com.tkmdpa.taf.steps.pantheon;

import com.tkmdpa.taf.pages.pantheon.CreateNewAccountPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class CreateNewAccountSteps {

    CreateNewAccountPage createNewAccountPage;

    @Step
    public void checkGeneralPageElements(){
        createNewAccountPage.checkGeneralPageElementsPantheon();
    }

    @Step
    public void checkIfTitleIsCorrect() {
        assertEquals(createNewAccountPage.getPageHeader(), createNewAccountPage.getTitleText());
    }

    @Step
    public void clickCreateNewAccountButton() {
        createNewAccountPage.getCreateNewAccountButton().click();
    }

    public void enterValuesToFields(String firstName, String lastName, String companyName, String companySiteUrl, String userName, String emailAddress) {
        createNewAccountPage.setFirstName(firstName);
        createNewAccountPage.setLastName(lastName);
        createNewAccountPage.setCompanyName(companyName);
        createNewAccountPage.setCompanySiteUrl(companySiteUrl);
        createNewAccountPage.setUsername(userName);
        createNewAccountPage.setEmailAddress(emailAddress);
    }

    public void clickTermOfUse() {
        createNewAccountPage.getTermOfUse().click();
    }
}
