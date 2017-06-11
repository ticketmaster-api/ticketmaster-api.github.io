package com.tkmdpa.taf.steps.pantheon;

import com.tkmdpa.taf.pages.AnyPage;
import com.tkmdpa.taf.pages.pantheon.AddNewAppPage;
import net.thucydides.core.annotations.Step;

import static com.tkmdpa.taf.staticmethods.StaticMethods.checkIfWebElementExist;
import static com.tkmdpa.taf.staticmethods.StaticMethods.reloadPage;
import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

public class UserAppsSteps {

    AddNewAppPage addNewAppPage;

    AnyPage anyPage;

    @Step
    public void editApp() {
        addNewAppPage.clickEditButton();
    }

    @Step
    public void openMyAppsPage() {
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
        anyPage.waitForPageReadyStateComplete();
        checkIfWebElementExist(addNewAppPage.getAppNameInDetailsTab(detailName));
        assertEquals (addNewAppPage.getAppNameInDetailsTab(detailName).getText(), value);
    }

    @Step
    public void openDetailsTab() {
        addNewAppPage.getDetailsTab().click();
    }

    @Step
    public void checkIfTheAppIsPresent() {
        anyPage.waitForAjaxToComplete();
        assertTrue(addNewAppPage.getAppName().isDisplayed());
    }

    @Step
    public void checkIfMessageIsDisplayed(String errorMessage) {
        assertEquals(addNewAppPage.getPopUpMessage().getText(), errorMessage);
    }

    @Step
    public void removeApp() {
            addNewAppPage.clickDelete();
            anyPage.waitForAjaxToComplete();
            anyPage.waitForPageReadyStateComplete();
    }

    @Step
    public void checkIsAppNotExists() {
        reloadPage();
        anyPage.waitForPageReadyStateComplete();
        assertFalse(addNewAppPage.check_if_app_is_present());
    }

}
