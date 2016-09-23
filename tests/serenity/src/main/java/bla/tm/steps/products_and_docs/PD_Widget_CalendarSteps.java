package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_Widget_CalendarPage;
import net.serenitybdd.core.Serenity;
import net.thucydides.core.annotations.Step;
import org.junit.Assert;
import org.openqa.selenium.Keys;

import static bla.tm.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.assertEquals;

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
        Assert.assertEquals(calendarWidgetPage.getTitleText(), calendarWidgetPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu) {
        calendarWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        if ("{apikey}".equals(apikey)){
            assertEquals(calendarWidgetPage.getCalendarWidget().getAPIKeyTextField().getAttribute("value"), "5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG");
        }
        else {
            waitForSomeActionHappened(50);
            assertEquals(calendarWidgetPage.getCalendarWidget().getAPIKeyTextField().getAttribute("value"), apikey);
        }
    }

    @Step
    public void apiKeyFieldIsNotEmpty() {
        String apiKey = calendarWidgetPage.getCalendarWidget().getAPIKeyTextField().getValue();
        Assert.assertFalse("ApiKey field is null or empty.", apiKey == null || apiKey.length() == 0);
    }

    @Step
    public void zipCodeIsNotEmpty() {
        String zipCode = calendarWidgetPage.getCalendarWidget().getZipCodeTextField().getValue();
        Assert.assertFalse("ZipCode field is null or empty.", zipCode == null || zipCode.length() == 0);
    }

    @Step
    public void storeValue(String valueName) {
        String value;
        switch (valueName){
            case "apiKey": value = calendarWidgetPage.getCalendarWidget().getAPIKeyTextField().getValue();
                break;
            case "keyword": value = calendarWidgetPage.getCalendarWidget().getKeywordTextField().getValue();
                break;
            case "zipCode": value = calendarWidgetPage.getCalendarWidget().getZipCodeTextField().getValue();
                break;
            case "radius": value = calendarWidgetPage.getCalendarWidget().getRadiusDropdown().getSelectedValue();
                break;
            default: throw new IllegalArgumentException(String.format("Invalid field name %s", valueName));
        }
        Serenity.getCurrentSession().put(valueName, value);
    }

    @Step
    public void embeddedCodeContainsStoredValueFor(String valueName) {
        String embeddedValue = calendarWidgetPage.getCalendarWidget().getEmbeddedValueOf(valueName);
        String storedValue = (String) Serenity.getCurrentSession().get(valueName);
        Assert.assertEquals(String.format("The %s in embedded code is: %s but stored value is: %s ", valueName, embeddedValue, storedValue), storedValue, embeddedValue);
    }

    @Step
    public void setRandomValueFor(String randomValueFor) {
        switch (randomValueFor) {
            case "apiKey": {
                calendarWidgetPage.getCalendarWidget().getAPIKeyTextField().clear();
                calendarWidgetPage.getCalendarWidget().getAPIKeyTextField().sendKeys("randomApi", Keys.ENTER);
            }
                break;
            case "keyword": {
                calendarWidgetPage.getCalendarWidget().getKeywordTextField().clear();
                calendarWidgetPage.getCalendarWidget().getKeywordTextField().sendKeys("randomKeyword", Keys.ENTER);
            }
                break;
            case "zipCode": {
                calendarWidgetPage.getCalendarWidget().getZipCodeTextField().clear();
                calendarWidgetPage.getCalendarWidget().getZipCodeTextField().sendKeys("1234", Keys.ENTER);
            }
                break;
            case "radius": {
                calendarWidgetPage.getCalendarWidget().getRadiusDropdown();
            }
                break;
            default: throw new IllegalArgumentException(String.format("Invalid field name argument %s", randomValueFor));
        }
    }

    @Step
    public void fieldCountryContains(String countryName) {
        String countryValue = calendarWidgetPage.getCalendarWidget().getCountryDropdown().getSelectedVisibleTextValue();
        Assert.assertTrue(String.format("Country field contains %s but expected result is: %s", countryValue, countryName), countryValue.equalsIgnoreCase(countryName));
    }

    @Step
    public void fieldEqualsStoredValue(String fieldName) {
        String storedValue = (String) Serenity.getCurrentSession().get(fieldName);
        String fieldValue;
        switch (fieldName){
            case "apiKey": fieldValue = calendarWidgetPage.getCalendarWidget().getAPIKeyTextField().getValue();
                break;
            case "keyword": fieldValue = calendarWidgetPage.getCalendarWidget().getKeywordTextField().getValue();
                break;
            case "zipCode": fieldValue = calendarWidgetPage.getCalendarWidget().getZipCodeTextField().getValue();
                break;
            case "radius": fieldValue = calendarWidgetPage.getCalendarWidget().getRadiusDropdown().getSelectedVisibleTextValue();
                break;
            default: throw new IllegalArgumentException(String.format("Invalid field name argument %s", fieldName));
        }
        Assert.assertTrue(String.format("The %s field (%s) does not equal stored value (%s).", fieldName, fieldName, storedValue), storedValue.equalsIgnoreCase(fieldValue));
    }

    @Step
    public void setZipCodeValue(String zipCodeValue) {
        calendarWidgetPage.getCalendarWidget().getZipCodeTextField().clear();
        calendarWidgetPage.getCalendarWidget().getZipCodeTextField().sendKeys(zipCodeValue, Keys.ENTER);
    }
}
