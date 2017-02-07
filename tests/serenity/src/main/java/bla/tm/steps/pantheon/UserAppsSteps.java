package bla.tm.steps.pantheon;

import bla.tm.pages.pantheon.AddNewAppPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class UserAppsSteps {

    AddNewAppPage addNewAppPage;

    @Step
    public void checkGeneralPageElements(){
        addNewAppPage.checkGeneralPageElementsPantheonLoggedIn();
    }

    @Step
    public void checkIfSomeElementExist(){
        addNewAppPage.getNameTextInput().shouldBeVisible();
    }

    @Step
    public void editApp() {
        addNewAppPage.clickEditButton();
    }

    @Step
    public void navigateToMyAppsPage() {
        addNewAppPage.clickOnApp();
    }

    @Step
    public void clearField(String field) {
        addNewAppPage.getAppNameWebElement(field).clear();
    }

    @Step
    public void enterValue(String field, String value) {
        addNewAppPage.getAppNameWebElement(field).sendKeys(value);
    }

    @Step
    public void applyChanges() {
        addNewAppPage.getSaveButton().click();
    }

    @Step
    public void checkIfChangesAreApplied(String detailName, String value) {
        assertEquals (addNewAppPage.getAppNameInDetailsTab(detailName).getText(), value);
    }

    @Step
    public void openDetailsTab() {
        addNewAppPage.getDetailsTab().click();
    }

    public void checkIfMessageIsShown(String message) {
        assertEquals(addNewAppPage.getPopUpMessage().getText(), message);
    }

    public void checkIfTheAppIsPresent(String appName) {
        assertEquals(addNewAppPage.getAppName().getText(), appName);
    }
}
