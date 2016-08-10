package bla.tm.steps.pantheon;

import bla.tm.pages.pantheon.RequestNewPasswordPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class RequestNewPasswordSteps {

    RequestNewPasswordPage requestNewPasswordPage;

    @Step
    public void checkGeneralPageElements(){
        requestNewPasswordPage.checkGeneralPageElementsPantheon();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (requestNewPasswordPage.pageHeader, requestNewPasswordPage.getTitleText());
    }
}
