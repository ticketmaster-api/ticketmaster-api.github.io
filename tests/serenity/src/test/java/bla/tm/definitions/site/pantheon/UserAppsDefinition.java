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

    @Given("open my App")
    @When("open my App")
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

    @Then("$detailName have been applied on Edit App Page with value $appValue")
    public void changesHaveApplied(String detailName, String appValue){
        addNewAppPage.checkIfChangesAreApplied(detailName, appValue);
    }

    @When("open Details tab on the application")
    public void openTab(){
        addNewAppPage.openDetailsTab();
    }

    @Then("the $message is displayed")
    public void messageIsShown(String message){
        addNewAppPage.checkIfMessageIsShown(message);
    }

    @Then("the $appName is appeared in the list of apps")
    public void appIsAppeared(String appName){
        addNewAppPage.checkIfTheAppIsPresent(appName);
    }

    @Then("the form-error appeared on field $appFormField")
    public void errorAppeared(){

    }

}
