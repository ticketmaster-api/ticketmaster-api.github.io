package com.tkmdpa.taf.steps.pantheon;

import com.tkmdpa.taf.pages.pantheon.AddNewAppPage;
import net.thucydides.core.annotations.Step;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static com.tkmdpa.taf.staticmethods.StaticMethods.checkIfWebElementExist;
import static com.tkmdpa.taf.staticmethods.StaticMethods.reloadPage;
import static junit.framework.TestCase.assertTrue;
import static net.thucydides.core.webdriver.ThucydidesWebDriverSupport.getDriver;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

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
        checkIfWebElementExist(addNewAppPage.getAppNameInDetailsTab(detailName));
        assertEquals (addNewAppPage.getAppNameInDetailsTab(detailName).getText(), value);
    }

    @Step
    public void openDetailsTab() {
        addNewAppPage.getDetailsTab().click();
    }

    @Step
    public void checkIfTheAppIsPresent() {
        assertTrue(addNewAppPage.getAppName().isDisplayed());
    }

    @Step
    public void checkIfMessageIsDisplayed(String errorMessage) {
        WebDriverWait wait = new WebDriverWait(getDriver(), 15);
        wait.until(ExpectedConditions.textToBePresentInElement(addNewAppPage.getPopUpMessage(), errorMessage));
        assertEquals(addNewAppPage.getPopUpMessage().getText(), errorMessage);
    }

    @Step
    public void removeApp() {
        addNewAppPage.clickDelete();
    }

    @Step
    public void checkIsAppNotExists() {
        reloadPage();
        assertFalse(addNewAppPage.checkIsPresent());
        addNewAppPage.getNoApplicationText().shouldBeVisible();
    }

}
