package com.tkmdpa.taf.steps.pantheon;

import com.tkmdpa.taf.pages.pantheon.EditProfilePage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class EditProfileSteps {

    EditProfilePage editProfilePage;

    @Step
    public void checkGeneralPageElements(){
        editProfilePage.checkGeneralPageElementsPantheonLoggedIn();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (editProfilePage.pageHeader, editProfilePage.getTitleText());
    }
}
