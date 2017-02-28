package bla.tm.definitions.site.pantheon;

import bla.tm.steps.pantheon.UserAppsSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class UserAppsDefinition {

    @Steps
    UserAppsSteps addNewAppPage;

    @Then("check general page elements for Pantheon Add New App page")
    public void checkGeneralPageElements(){
        addNewAppPage.checkIfSomeElementExist();
        addNewAppPage.checkGeneralPageElements();
    }

    @Given("open my Apps page")
    @When("open my Apps page")
    public void navigateToMyAppsPage(){
        addNewAppPage.navigateToMyAppsPage();
    }

    @Given("open Edit App Page for the first application")
    @When("open Edit App Page for the first application")
    public void editApp(){
        addNewAppPage.editApp();
    }

    @When("clear field $field on Edit App Page")
    public void changeAllFieldsOnEditAppPage(String field){
        addNewAppPage.clearField(field);
    }

    @When("enter to the field $field value $value")
    public void enterValueToTheFiield(String field, String value){
        addNewAppPage.enterValue(field, value);
    }

    @When("save changes on Edit App Page")
    public void applyChanges(){
        addNewAppPage.applyChanges();
    }

    @When("delete first App")
    public void deleteApp(){
        addNewAppPage.removeApp();
    }

    @Then("$detailName have been applied on Edit App Page with value $appValue")
    public void changesHaveApplied(String detailName, String appValue){
        addNewAppPage.checkIfChangesAreApplied(detailName, appValue);
    }

    @When("open Details tab on the application")
    public void openTab(){
        addNewAppPage.openDetailsTab();
    }

    @Then("the $appName is appeared in the list of apps")
    public void appIsAppeared(String appName){
        addNewAppPage.checkIfTheAppIsPresent(appName);
    }

    @Then("the $message message is displayed")
    @When("the $message message is displayed")
    public void errorAppeared(String errorMessage){
        addNewAppPage.checkIfMessageIsDisplayed(errorMessage);
    }

    @Then("the predefined app is removed from the list of apps")
    public void appIsRemovedFromTheListOfApps(){
        addNewAppPage.checkIsAppNotExists();
    }

}
