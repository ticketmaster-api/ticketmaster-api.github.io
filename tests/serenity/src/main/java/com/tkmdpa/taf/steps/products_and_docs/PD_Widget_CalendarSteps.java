package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_Widget_CalendarPage;
import net.serenitybdd.core.Serenity;
import net.thucydides.core.annotations.Step;

import static com.tkmdpa.taf.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.*;

public class PD_Widget_CalendarSteps extends PD_CommonSteps {

    PD_Widget_CalendarPage calendarWidgetPage;

    @Step
    public void openPage() {
        calendarWidgetPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect() {
        assertEquals(calendarWidgetPage.getTitleText(), calendarWidgetPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu) {
        calendarWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        if ("{apikey}".equals(apikey)){
            assertEquals(calendarWidgetPage.getCalendarWidget().getAPIKeyTextFieldValue(), DEFAULTKEY);
        }
        else {
            waitForSomeActionHappened(50);
            assertEquals(calendarWidgetPage.getCalendarWidget().getAPIKeyTextFieldValue(), apikey);
        }
    }

    @Step
    public void apiKeyFieldIsNotEmpty() {
        String apiKey = calendarWidgetPage.getCalendarWidget().getAPIKeyTextFieldValue();
        assertFalse("ApiKey field is null or empty.", apiKey == null || apiKey.length() == 0);
    }

    @Step
    public void zipCodeIsEmpty() {
        String zipCode = calendarWidgetPage.getCalendarWidget().getPostalCodeApiFieldValue();
        assertTrue("ZipCode field is null or empty.", zipCode == null || zipCode.length() == 0);
    }

    @Step
    public void storeValue(String valueName) {
        String value;
        switch (valueName){
            case "apiKey": value = calendarWidgetPage.getCalendarWidget().getAPIKeyTextFieldValue();
                break;
            case "keyword": value = calendarWidgetPage.getCalendarWidget().getKeywordTextFieldValue();
                break;
            case "postalCodeApi": value = calendarWidgetPage.getCalendarWidget().getPostalCodeApiFieldValue();
                break;
            default: throw new IllegalArgumentException(String.format("Invalid field name %s", valueName));
        }
        Serenity.getCurrentSession().put(valueName, value);
    }

    @Step
    public void embeddedCodeContainsStoredValueFor(String valueName) {
        String embeddedValue = calendarWidgetPage.getCalendarWidget().getEmbeddedValueOf(valueName);
        String storedValue = (String) Serenity.getCurrentSession().get(valueName);
        assertEquals(String.format("The %s in embedded code is: %s but stored value is: %s ", valueName, embeddedValue, storedValue), storedValue, embeddedValue);
    }

    @Step
    public void setRandomValueFor(String randomValueFor) {
        String randomApi = "randomApi";
        String randomKeyword = "randomKeyword";
        String randomZipCode = "randomZipCode";

        switch (randomValueFor) {
            case "apiKey": calendarWidgetPage.getCalendarWidget().setAPIKeyTextFieldValue(randomApi);
                break;
            case "keyword": calendarWidgetPage.getCalendarWidget().setKeywordTextFieldValue(randomKeyword);
                break;
            case "postalCodeApi": calendarWidgetPage.getCalendarWidget().setPostalCodeTextFieldValue(randomZipCode);
                break;
            default: throw new IllegalArgumentException(String.format("Invalid field name argument %s", randomValueFor));
        }
    }

    @Step
    public void fieldCountryContains(String countryName) {
        String countryValue = calendarWidgetPage.getCalendarWidget().getSelectedCountry();
        assertTrue(String.format("Country field contains %s but expected result is: %s", countryValue, countryName), countryValue.equalsIgnoreCase(countryName));
    }


    @Step
    public void setZipCodeValue(String zipCodeValue) {
        calendarWidgetPage.getCalendarWidget().setPostalCodeTextFieldValue(zipCodeValue);
    }

    @Step
    public void resetForm(){
        ancestorPage.scrollToElement(calendarWidgetPage.getCalendarWidget().getResetButton());
        calendarWidgetPage.getCalendarWidget().clickResetButton();
        waitForSomeActionHappened(500);
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
            case "postalCodeApi": fieldValue = ancestorPage.getCountDownWidget().getPostalCodeApiFieldValue();
                break;
            default: throw new IllegalArgumentException(String.format("Invalid field name argument %s", fieldName));
        }
        assertTrue(String.format("The field (%s) equal %s but it does not equal stored value (%s).", fieldName, fieldValue, storedValue), storedValue.equalsIgnoreCase(fieldValue));
    }

}
