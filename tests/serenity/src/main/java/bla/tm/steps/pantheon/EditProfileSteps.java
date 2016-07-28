package bla.tm.steps.pantheon;

import bla.tm.pages.pantheon.EditProfilePage;
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
