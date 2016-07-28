package bla.tm.steps.pantheon;

import bla.tm.pages.pantheon.CreateNewAccountPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class CreateNewAccountSteps {

    CreateNewAccountPage createNewAccountPage;

    @Step
    public void checkGeneralPageElements(){
        createNewAccountPage.checkGeneralPageElementsPantheon();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (createNewAccountPage.pageHeader, createNewAccountPage.getTitleText());
    }
}
