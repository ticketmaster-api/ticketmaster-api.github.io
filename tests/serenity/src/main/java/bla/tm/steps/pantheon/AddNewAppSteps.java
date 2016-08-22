package bla.tm.steps.pantheon;

import bla.tm.pages.pantheon.AddNewAppPage;
import net.thucydides.core.annotations.Step;

public class AddNewAppSteps {

    AddNewAppPage addNewAppPage;

    @Step
    public void checkGeneralPageElements(){
        addNewAppPage.checkGeneralPageElementsPantheonLoggedIn();
    }

    @Step
    public void checkIfSomeElementExist(){
        addNewAppPage.getNameTextInput().shouldBeVisible();
    }
}
