package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.steps.products_and_docs.PD_Widget_CountdownSteps;
import com.tkmdpa.taf.steps.products_and_docs.PD_Widget_MapSteps;
import com.tkmdpa.taf.steps.products_and_docs.WidgetFields;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.model.ExamplesTable;

import java.util.List;

public class PD_Widget_MapDefinition extends WidgetFields {

    @Steps
    PD_Widget_MapSteps mapWidgetSteps;

    @Steps
    PD_Widget_CountdownSteps countDownWidgetSteps;

    @Given("open Map Widget page")
    public void openMapWidgetPage() {
        mapWidgetSteps.openPage();
    }

    @Given("change all possible fields on the Map Widget page: $table")
    public void changeValuesOnMapPageWidget(ExamplesTable valuesTable) {
        getMapWidgetValues(valuesTable);
        mapWidgetSteps.changeValuesForAllFields(apiKey, keyWord, zipCode, city, attractionId, venueId, promoterId, source, countryCode, classificationName, eventCount);
    }

    @Given("store all fields values on the Map Widget page")
    public void storeAllFieldsValuesOnMapPage(){
        mapWidgetSteps.storeValuesForAllFields();
    }

    //Given
    @Given("store values on Map Widget page: $valueNames")
    public void storeValuesOf(List<String> valueNames) {
        for (String valueName : valueNames){
            mapWidgetSteps.storeValue(valueName);
        }
    }

    @Given("change values for on Map Widget page: $valueNames")
    public void changeValuesFor(List<String> valueNames) {
        for (String valueName : valueNames){
            mapWidgetSteps.setRandomValueFor(valueName);
        }
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

    @Then("values equals to stored values of fields on Map Widget page: $fieldNames")
    public void checkThatFieldsEqualStoredValues(List<String> fieldNames) {
        for (String fieldName : fieldNames){
            mapWidgetSteps.fieldEqualsStoredValue(fieldName);
        }
    }

    //Then
    @Then("embedded html code on Map Widget contains stored values of: $valueNames")
    public void checkThatEmbeddedHtmlCodeContainsStoredValuesOf(List<String> valueNames) {
        for (String valueName : valueNames){
            mapWidgetSteps.embeddedCodeContainsStoredValueFor(valueName);
        }
    }
}
