package bla.tm.definitions.site.widgets;

import bla.tm.steps.pantheon.UserAccountSteps;
import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_Widget_CalendarSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import java.util.List;

public class CalendarWidgetDefinition {

    private String apiKey = "{apikey}";

    @Steps
    PD_Widget_CalendarSteps calendarWidgetPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    //Given
    @Given("store values of: $valueNames")
    public void storeValuesOf(List<String> valueNames) {
        for (String valueName : valueNames){
            calendarWidgetPage.storeValue(valueName);
        }
    }
    @Given("change values for: $valueNames")
    public void changeValuesFor(List<String> valueNames) {
        for (String valueName : valueNames){
            calendarWidgetPage.setRandomValueFor(valueName);
        }
    }

    //When
    @When("change value of Zip Code $zipCode")
    public void changeValueOfZipCode(String zipCode) {
        calendarWidgetPage.setZipCodeValue(zipCode);
    }

    @When("User is not logged to site (Calendar Widget)")
    public void openLogInPageAndCheckUserIsNotLoggedIn() {
        calendarWidgetPage.clickLogIn();
        userLogInPage.isPageOpened();
        calendarWidgetPage.openPage();
    }

    @When("User is logged to site (Calendar Widget)")
    public void openLogInPageAndLogIn() {
        calendarWidgetPage.clickLogIn();
        userLogInPage.logInToAccount();
        apiKey = userAccountSteps.getAPIKeyOfUser();
        calendarWidgetPage.openPage();
    }

    //Then
    @Then("embedded html code contains stored values of: $valueNames")
    public void checkThatEmbeddedHtmlCodeContainsStoredValuesOf(List<String> valueNames) {
        for (String valueName : valueNames){
            calendarWidgetPage.embeddedCodeContainsStoredValueFor(valueName);
        }
    }

    @Then("the Country field contains appropriate value $countryName")
    public void checkThatCountryFieldContainsAppropriateValue(String countryName) {
        calendarWidgetPage.fieldCountryContains(countryName);
    }

    @Then("values of fields: $fieldNames equals stored values")
    public void checkThatFieldsEqualStoredValues(List<String> fieldNames) {
        for (String fieldName : fieldNames){
            calendarWidgetPage.fieldEqualsStoredValue(fieldName);
        }
    }

    @Then("the required fields are not empty on the Calendar Widget page")
    public void checkThatRequiredFieldsAreNotEmptyOnTheCalendarWidgetPage() {
        calendarWidgetPage.apiKeyFieldIsNotEmpty();
        calendarWidgetPage.zipCodeIsNotEmpty();
    }

    @Then("check that API key is provided for all placeholders on Calendar Widget page")
    public void checkAPIKeyPlaceholders(){
        calendarWidgetPage.checkAPIKeyPlaceholders(apiKey);
    }
}
