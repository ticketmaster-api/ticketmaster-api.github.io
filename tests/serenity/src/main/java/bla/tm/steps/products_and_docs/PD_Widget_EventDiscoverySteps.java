package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_Widget_EventDiscoveryPage;
import net.thucydides.core.annotations.Step;
import org.junit.Assert;
import java.util.HashMap;
import java.util.Map;
import static bla.tm.staticmethods.StaticMethods.waitForSomeActionHappened;
import static net.serenitybdd.core.Serenity.getCurrentSession;
import static org.junit.Assert.assertEquals;

public class PD_Widget_EventDiscoverySteps {
    //Private Fields
    private final String randomApiKey = "apiKey";
    private final String randomKeyword = "adele";
    private final String randomZipCode = "5555";
    private final String randomRadius = "15";
    private final String randomAttractionId = "333444";
    private final String randomVenueId = "222111";
    private final String randomAffiliateId = "7777";
    private final String randomPromoterId = "9999";
    private final String randomCity = "york";
    private final String randomCountryCode = "Canada";
    private final String randomSource = "ticketmaster";
    private final String randomClassificationName = "movies";
    private final String randomEventCount = "50";

    private final String[] listOfEditableParameters = { "apiKey", "keyword", "zipCode", "radius",
                                                        "attractionId", "venueId", "affiliateId",
                                                        "promoterId", "city", "countryCode",
                                                        "source", "classificationName", "eventCount" };

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
    public void clickLogIn() {
        eventDiscoveryWidgetPage.getLogInButton().click();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        if ("{apikey}".equals(apikey)){
            assertEquals(eventDiscoveryWidgetPage.getEventDiscoveryWidget().getApiKeyValue(), "5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG");
        }
        else {
            waitForSomeActionHappened(50);
            assertEquals(eventDiscoveryWidgetPage.getEventDiscoveryWidget().getApiKeyValue(), apikey);
        }
    }

    @Step
    public void changeValuesForAllFields() {
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setApiKeyValue(randomApiKey);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setKeywordValue(randomKeyword);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setZipCodeValue(randomZipCode);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setRadiusValue(randomRadius);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setAttractionIdValue(randomAttractionId);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setVenueIdValue(randomVenueId);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setAffiliateIdValue(randomAffiliateId);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setPromoterIdValue(randomPromoterId);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setCityValue(randomCity);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setCountryCodeValue(randomCountryCode);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setSourceValue(randomSource);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setClassificationNameValue(randomClassificationName);
        eventDiscoveryWidgetPage.getEventDiscoveryWidget().setEventCountValue(randomEventCount);
    }

    @Step
    public void storeValuesForAllFields() {
        for(String parameterName : listOfEditableParameters){
            getCurrentSession().put(parameterName, eventDiscoveryWidgetPage.getEventDiscoveryWidget().getValueOf(parameterName));
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
    public void checkThatRequiredFieldsAreNotEmpty() {
        Assert.assertFalse("The API Key is empty", eventDiscoveryWidgetPage.getEventDiscoveryWidget().getApiKeyValue().isEmpty());
    }

    @Step
    public void checkThatEmbeddedHtmlCodeContainsStoredValues() {
        for(String parameter : listOfEditableParameters) {
            String embeddedValueOfParameter = eventDiscoveryWidgetPage.getEventDiscoveryWidget().getEmbeddedValueOf(parameter);
            String storedValueOfParameter = (String) getCurrentSession().get(parameter);
            if(parameter == "countryCode"){
                embeddedValueOfParameter = getCountryNameByCode(embeddedValueOfParameter);
            }
            Assert.assertEquals(String.format("Stored value is %s, but embedded code is %s", storedValueOfParameter, embeddedValueOfParameter), storedValueOfParameter, embeddedValueOfParameter);
        }
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
    public void checkThatAllFieldsHaveBeenResetedToDefaults() {
        Assert.assertEquals("The Api Key actual result does not equals expected result", getCurrentSession().get("apiKey"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getApiKeyValue());
        Assert.assertEquals("The Keyword actual result does not equals expected result", getCurrentSession().get("keyword"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getKeywordValue());
        Assert.assertEquals("The Zip Code actual result does not equals expected result", getCurrentSession().get("zipCode"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getZipCodeValue());
        Assert.assertEquals("The Radius actual result does not equals expected result", getCurrentSession().get("radius"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getRadiusValue());
        Assert.assertEquals("The Attraction Id actual result does not equals expected result", getCurrentSession().get("attractionId"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getAttractionIdValue());
        Assert.assertEquals("The Venue Id actual result does not equals expected result", getCurrentSession().get("venueId"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getVenueIdValue());
        Assert.assertEquals("The Affiliate Id actual result does not equals expected result", getCurrentSession().get("affiliateId"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getAffiliateIdValue());
        Assert.assertEquals("The Promoter Id actual result does not equals expected result", getCurrentSession().get("promoterId"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getPromoterIdValue());
        Assert.assertEquals("The City actual result does not equals expected result", getCurrentSession().get("city"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getCityValue());
        Assert.assertEquals("The Country Code actual result does not equals expected result", getCurrentSession().get("countryCode"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getCountryCodeValue());
        Assert.assertEquals("The Source actual result does not equals expected result", getCurrentSession().get("source"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getSourceValue());
        Assert.assertEquals("The Classification Name actual result does not equals expected result", getCurrentSession().get("classificationName"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getClassificationNameValue());
        Assert.assertEquals("The Event Count actual result does not equals expected result", getCurrentSession().get("eventCount"), eventDiscoveryWidgetPage.getEventDiscoveryWidget().getEventCountValue());
    }

    public String getCountryNameByCode(String countryCode) {
        Map<String, String> countryCodes = new HashMap<>();
        countryCodes.put("CA", "Canada");
        countryCodes.put("AU", "Australia");
        countryCodes.put("GB", "Great Britain");
        countryCodes.put("IE", "Ireland");
        countryCodes.put("NZ", "New Zealand");
        countryCodes.put("US", "United States");
        return countryCodes.get(countryCode);
    }
}
