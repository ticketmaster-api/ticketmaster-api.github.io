package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_Widget_CalendarPage;
import net.serenitybdd.core.Serenity;
import net.thucydides.core.annotations.Step;
import static bla.tm.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.*;

public class PD_Widget_CalendarSteps {

    PD_Widget_CalendarPage calendarWidgetPage;

    @Step
    public void openPage() {
        calendarWidgetPage.open();
    }

    @Step
    public void clickLogIn() {
        calendarWidgetPage.getLogInButton().click();
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
            assertEquals(calendarWidgetPage.getCalendarWidget().getAPIKeyTextFieldValue(), "5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG");
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
    public void zipCodeIsNotEmpty() {
        String zipCode = calendarWidgetPage.getCalendarWidget().getZipCodeTextFieldValue();
        assertFalse("ZipCode field is null or empty.", zipCode == null || zipCode.length() == 0);
    }

    @Step
    public void storeValue(String valueName) {
        String value;
        switch (valueName){
            case "apiKey": value = calendarWidgetPage.getCalendarWidget().getAPIKeyTextFieldValue();
                break;
            case "keyword": value = calendarWidgetPage.getCalendarWidget().getKeywordTextFieldValue();
                break;
            case "zipCode": value = calendarWidgetPage.getCalendarWidget().getZipCodeTextFieldValue();
                break;
            case "radius": value = calendarWidgetPage.getCalendarWidget().getRadiusDropdownValue();
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
            case "zipCode": calendarWidgetPage.getCalendarWidget().setZipCodeTextFieldValue(randomZipCode);
                break;
            case "radius": calendarWidgetPage.getCalendarWidget().setRadiusDropdownValueTo15();
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
    public void fieldEqualsStoredValue(String fieldName) {
        String storedValue = (String) Serenity.getCurrentSession().get(fieldName);
        String fieldValue;
        switch (fieldName){
            case "apiKey": fieldValue = calendarWidgetPage.getCalendarWidget().getAPIKeyTextFieldValue();
                break;
            case "keyword": fieldValue = calendarWidgetPage.getCalendarWidget().getKeywordTextFieldValue();
                break;
            case "zipCode": fieldValue = calendarWidgetPage.getCalendarWidget().getZipCodeTextFieldValue();
                break;
            case "radius": fieldValue = calendarWidgetPage.getCalendarWidget().getRadiusDropdownValue();
                break;
            default: throw new IllegalArgumentException(String.format("Invalid field name argument %s", fieldName));
        }
        assertTrue(String.format("The field (%s) equal %s but it does not equal stored value (%s).", fieldName, fieldValue, storedValue), storedValue.equalsIgnoreCase(fieldValue));
    }

    @Step
    public void setZipCodeValue(String zipCodeValue) {
        calendarWidgetPage.getCalendarWidget().setZipCodeTextFieldValue(zipCodeValue);
    }

    @Step
    public void resetForm(){
        calendarWidgetPage.getCalendarWidget().clickResetButton();
        waitForSomeActionHappened(500);
    }
}
