package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_Widget_EventDiscoveryPage;
import net.thucydides.core.annotations.Step;
import org.junit.Assert;

import static com.tkmdpa.taf.staticmethods.StaticMethods.waitForSomeActionHappened;
import static net.serenitybdd.core.Serenity.getCurrentSession;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class PD_Widget_EventDiscoverySteps extends PD_CommonSteps {

    //Pages
    PD_Widget_EventDiscoveryPage eventDiscoveryWidgetPage;

    //Steps
    @Step
    public void openPage() {
        eventDiscoveryWidgetPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (eventDiscoveryWidgetPage.getTitleText(), eventDiscoveryWidgetPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        eventDiscoveryWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        if ("{apikey}".equals(apikey)){
            assertEquals(eventDiscoveryWidgetPage.getEventDiscoveryWidget().getApiKeyValue(), DEFAULTKEY);
        }
        else {
            waitForSomeActionHappened(50);
            assertEquals(eventDiscoveryWidgetPage.getEventDiscoveryWidget().getApiKeyValue(), apikey);
        }
    }

    @Step
    public void setEventCountValue(String value) {
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setEventCountValue(value);
    }

    @Step
    public void searchEventsByKeyword(String keyword) {
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setKeywordValue(keyword);
    }

    @Step
    public void setRadius(String setValue) {
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setRadiusValue(setValue);
    }

    @Step
    public void setZipCodeValue(String zipCode) {
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setZipCodeValue(zipCode);
    }

    @Step
    public void checkThatRequiredFieldsAreNotEmpty() {
        Assert.assertFalse("The API Key is empty", eventDiscoveryWidgetPage.getEventDiscoveryWidget().getApiKeyValue().isEmpty());
    }

    @Step
    public void checkThatFoundEventsContainsText(String keyword) {
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setEventCountValue("1");
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setPeriodValue("year");
        Assert.assertTrue(String.format("Poster windows does not contains %s, but has next text: %s", keyword, eventDiscoveryWidgetPage.getEventDiscoveryWidget().getPosterText()), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getPosterText().contains(keyword));
    }

    @Step
    public void checkThatNumberOfEventsEqualsValue(String value) {
        Assert.assertEquals(String.format("Expected events number is %s but actual result is: %s", value, eventDiscoveryWidgetPage.getEventDiscoveryWidget().getEventCountValue()), value, eventDiscoveryWidgetPage.getEventDiscoveryWidget().getEventCountValue());
    }

    @Step
    public void checkThatNumberOfEventsEqualsOrLessThanValue(String value) {
        int actualPosterEventCount = Integer.parseInt(eventDiscoveryWidgetPage.getEventDiscoveryWidget().getPosterEventsCount());
        int expectedEventCount = Integer.parseInt(value);
        Assert.assertTrue(String.format("Actual event count (%d) does NOT equals or less than %d", actualPosterEventCount, expectedEventCount), actualPosterEventCount <= expectedEventCount);
    }

    @Step
    public void checkThatRadiusValueEqualsActualValue(String actualValue) {
        Assert.assertEquals(String.format("The expected radius value: %s, but actual: %s", actualValue, eventDiscoveryWidgetPage.getEventDiscoveryWidget().getRadiusValue()), actualValue, eventDiscoveryWidgetPage.getEventDiscoveryWidget().getRadiusValue());
    }

    @Step
    public void checkThatAllFieldsHaveBeenResetToDefaults() {
        Assert.assertEquals("The Api Key actual result does not equals expected result", getCurrentSession().get("apiKey"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getApiKeyValue());
        Assert.assertEquals("The Keyword actual result does not equals expected result", getCurrentSession().get("keyword"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getKeywordValue());
        Assert.assertEquals("The Postal Code actual result does not equals expected result", getCurrentSession().get("postalCodeApi"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getPostalCodeApiValue());
        Assert.assertEquals("The Attraction Id actual result does not equals expected result", getCurrentSession().get("attractionId"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getAttractionIdValue());
        Assert.assertEquals("The Venue Id actual result does not equals expected result", getCurrentSession().get("venueId"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getVenueIdValue());
//        Assert.assertEquals("The Affiliate Id actual result does not equals expected result", getCurrentSession().get("affiliateId"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getAffiliateIdValue());
        Assert.assertEquals("The Promoter Id actual result does not equals expected result", getCurrentSession().get("promoterId"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getPromoterIdValue());
        Assert.assertEquals("The City actual result does not equals expected result", getCurrentSession().get("city"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getCityValue());
        Assert.assertEquals("The Country Code actual result does not equals expected result", getCurrentSession().get("countryCode"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getCountryCodeValue());
        Assert.assertEquals("The Source actual result does not equals expected result", getCurrentSession().get("source"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getSourceValue());
        Assert.assertEquals("The Classification Name actual result does not equals expected result", getCurrentSession().get("classificationName"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getClassificationNameValue());
        Assert.assertEquals("The Event Count actual result does not equals expected result", getCurrentSession().get("eventCount"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getEventCountValue());
    }

    @Step
    public void fieldCountryContains(String countryName) {
        String countryValue = eventDiscoveryWidgetPage.getEventDiscoveryWidget().getSelectedCountry();
        assertTrue(String.format("Country field contains %s but expected result is: %s", countryValue, countryName), countryValue.equalsIgnoreCase(countryName));
    }

    @Step
    public void storeValuesForAllFields() {
        for(String parameterName : listOfEditableParameters){
            getCurrentSession().put(parameterName, eventDiscoveryWidgetPage.getEventDiscoveryWidget().getValueOf(parameterName));
        }
    }

    @Step
    public void changeValuesForAllFields(String apiKey, String keyword, String postalCodeApi, String city, String attractionId, String venueId, String promoterId, String source, String countryCode, String classificationName, String eventCount) {
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setApiKeyValue(apiKey);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setKeywordValue(keyword);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setPostalCodeApiValue(postalCodeApi);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setCityValue(city);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setAttractionIdValue(attractionId);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setVenueIdValue(venueId);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setPromoterIdValue(promoterId);
        ancestorPage.scrollToElement(eventDiscoveryWidgetPage.getEventDiscoveryWidget().getSourceLink());
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setSourceValue(source);
        ancestorPage.scrollToElement(eventDiscoveryWidgetPage.getEventDiscoveryWidget().getCountryCodeLink());
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setCountryCodeValue(countryCode);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setClassificationNameValue(classificationName);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setEventCountValue(eventCount);
    }

    private final String[] listOfEditableParameters = { "apiKey", "keyword", "postalCodeApi",
            "attractionId", "venueId",
            "promoterId", "city", "countryCode", "source",
            "classificationName", "eventCount" };

    @Step
    public void checkThatEmbeddedHtmlCodeContainsStoredValues() {
        for(String parameter : listOfEditableParameters) {
            String embeddedValueOfParameter = ancestorPage.getEventDiscoveryWidget().getEmbeddedValueOf(parameter);
            String storedValueOfParameter = (String) getCurrentSession().get(parameter);
            if(parameter == "countryCode"){
                embeddedValueOfParameter = getCountryNameByCode(embeddedValueOfParameter);
            }
            Assert.assertEquals(String.format("Stored value is %s, but embedded code is %s", storedValueOfParameter, embeddedValueOfParameter), storedValueOfParameter, embeddedValueOfParameter);
        }
    }

    @Step
    public void setPostalCodeApiValue(String postalCodeApi) {
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setPostalCodeApiValue(postalCodeApi);
    }

    @Step
    public void useGeoPosition() {
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().clickOnGeoPosition();
    }
}
