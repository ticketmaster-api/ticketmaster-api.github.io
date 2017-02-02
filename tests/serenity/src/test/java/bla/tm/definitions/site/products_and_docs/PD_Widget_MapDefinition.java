package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.products_and_docs.PD_Widget_CountdownSteps;
import bla.tm.steps.products_and_docs.PD_Widget_MapSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

import java.util.List;

public class PD_Widget_MapDefinition {

    @Steps
    PD_Widget_MapSteps mapWidgetSteps;

    @Steps
    PD_Widget_CountdownSteps countDownWidgetSteps;

    @Given("open Map Widget page")
    public void openMapWidgetPage() {
        mapWidgetSteps.openPage();
    }

    @Given("change values for all possible fields on the Map Widget page")
    public void changeValuesOnMapPageWidget(){
        mapWidgetSteps.changeValuesForAllFields();
    }

    @Given("store all fields values on the Map Widget page")
    public void storeAllFieldsValuesOnMapPage(){
        mapWidgetSteps.storeValuesForAllFields();
    }

    @Then("the required fields are not empty on the Map Widget page")
    public void checkThatRequiredFieldsAreNotEmptyOnTheMapWidgetPage() {
        mapWidgetSteps.cityIsNotEmpty();
        mapWidgetSteps.apiKeyFieldIsNotEmpty();
    }

    @Then("embedded html code contains stored values on the Map Widget page")
    public void checkThatEmbeddedHtmlCodeContainsStoredValues() {
        mapWidgetSteps.checkThatEmbeddedHtmlCodeContainsStoredValues();
    }

    @Then("values equals to stored values of fields: $fieldNames")
    public void checkThatFieldsEqualStoredValues(List<String> fieldNames) {
        for (String fieldName : fieldNames){
            countDownWidgetSteps.fieldEqualsStoredValue(fieldName);
        }
    }
}
