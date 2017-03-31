package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_Widget_MapPage;
import net.serenitybdd.core.Serenity;
import net.thucydides.core.annotations.Step;
import org.junit.Assert;

import static net.serenitybdd.core.Serenity.getCurrentSession;
import static org.junit.Assert.*;

public class PD_Widget_MapSteps extends PD_CommonSteps{

    PD_Widget_MapPage mapWidgetPage;

    @Step
    public void openPage() {
        mapWidgetPage.open();
    }

    @Step
    public void cityIsNotEmpty() {
        String city = mapWidgetPage.getMapWidget().getCityFieldValue();
        assertFalse(city == null || city.length() == 0);
    }

    @Step
    public void apiKeyFieldIsNotEmpty() {
        String apiKey = mapWidgetPage.getMapWidget().getAPIKeyTextFieldValue();
        assertFalse(apiKey == null || apiKey.length() == 0);
    }

    @Step
    public void storeValuesForAllFields() {
        for(String parameterName : listOfEditableParameters){
            getCurrentSession().put(parameterName, mapWidgetPage.getMapWidget().getValueOf(parameterName));
        }
    }

    private final String[] listOfEditableParameters = { "apiKey", "keyword", "zipCode",
            "attractionId", "venueId",
            "promoterId", "city", "countryCode", "source",
            "classificationName", "eventCount" };

    @Step
    public void checkThatEmbeddedHtmlCodeContainsStoredValues() {
        for(String parameter : listOfEditableParameters) {
            String embeddedValueOfParameter = ancestorPage.getMapWidget().getEmbeddedValueOf(parameter);
            String storedValueOfParameter = (String) getCurrentSession().get(parameter);
            if(parameter == "countryCode"){
                embeddedValueOfParameter = getCountryNameByCode(embeddedValueOfParameter);
            }
            Assert.assertEquals(String.format("Stored value is %s, but embedded code is %s", storedValueOfParameter, embeddedValueOfParameter), storedValueOfParameter, embeddedValueOfParameter);
        }
    }

    public void changeValuesForAllFields(String apiKey, String keyword, String zipCode, String city, String attractionId, String venueId, String promoterId, String source, String countryCode, String classificationName, String eventCount) {
        ancestorPage.getMapWidget().setApiKeyValue(apiKey);
        ancestorPage.getMapWidget().setKeywordValue(keyword);
        ancestorPage.getMapWidget().setZipCodeValue(zipCode);
        ancestorPage.getMapWidget().setCityValue(city);
        ancestorPage.getMapWidget().setAttractionIdValue(attractionId);
        ancestorPage.getMapWidget().setVenueIdValue(venueId);
        ancestorPage.getMapWidget().setPromoterIdValue(promoterId);
        ancestorPage.scrollToElement(ancestorPage.getMapWidget().getSourceLink());
        ancestorPage.getMapWidget().setSourceValue(source);
        ancestorPage.scrollToElement(ancestorPage.getMapWidget().getCountryCodeLink());
        ancestorPage.getMapWidget().setCountryCodeValue(countryCode);
        ancestorPage.getMapWidget().setClassificationNameValue(classificationName);
        ancestorPage.getMapWidget().setEventCountValue(eventCount);
    }

    @Step
    public void storeValue(String valueName) {
        String value;
        switch (valueName){
            case "apiKey": value = mapWidgetPage.getMapWidget().getAPIKeyTextFieldValue();
                break;
            case "keyword": value = mapWidgetPage.getMapWidget().getKeywordTextFieldValue();
                break;
            case "zipCode": value = mapWidgetPage.getMapWidget().getZipCodeFieldValue();
                break;
            default: throw new IllegalArgumentException(String.format("Invalid field name %s", valueName));
        }
        Serenity.getCurrentSession().put(valueName, value);
    }

    @Step
    public void setRandomValueFor(String randomValueFor) {
        String randomApi = "randomApi";
        String randomKeyword = "randomKeyword";
        String randomZipCode = "randomZipCode";

        switch (randomValueFor) {
            case "apiKey": mapWidgetPage.getCalendarWidget().setAPIKeyTextFieldValue(randomApi);
                break;
            case "keyword": mapWidgetPage.getCalendarWidget().setKeywordTextFieldValue(randomKeyword);
                break;
            case "zipCode": mapWidgetPage.getMapWidget().setZipCodeTextFieldValue(randomZipCode);
                break;
            default: throw new IllegalArgumentException(String.format("Invalid field name argument %s", randomValueFor));
        }
    }


    @Step
    public void fieldEqualsStoredValue(String fieldName) {
        String storedValue = (String) Serenity.getCurrentSession().get(fieldName);
        String fieldValue;
        switch (fieldName){
            case "apiKey": fieldValue = ancestorPage.getCountDownWidget().getAPIKeyTextFieldValue();
                break;
            case "keyword": fieldValue = ancestorPage.getCountDownWidget().getKeywordTextFieldValue();
                break;
            case "zipCode": fieldValue = ancestorPage.getCountDownWidget().getZipCodeFieldValue();
                break;
            default: throw new IllegalArgumentException(String.format("Invalid field name argument %s", fieldName));
        }
        assertTrue(String.format("The field (%s) equal %s but it does not equal stored value (%s).", fieldName, fieldValue, storedValue), storedValue.equalsIgnoreCase(fieldValue));
    }

    @Step
    public void embeddedCodeContainsStoredValueFor(String valueName) {
        String embeddedValue = mapWidgetPage.getMapWidget().getEmbeddedValueOf(valueName);
        String storedValue = (String) Serenity.getCurrentSession().get(valueName);
        assertEquals(String.format("The %s in embedded code is: %s but stored value is: %s ", valueName, embeddedValue, storedValue), storedValue, embeddedValue);
    }

}
