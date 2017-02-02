package bla.tm.steps.products_and_docs;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.Serenity;
import net.thucydides.core.annotations.Step;
import org.junit.Assert;

import java.util.HashMap;
import java.util.Map;

import static net.serenitybdd.core.Serenity.getCurrentSession;
import static org.junit.Assert.assertTrue;

public class PD_CommonSteps {

    AncestorPage ancestorPage;

    /**
     *     Private Fields
     */
    protected final String randomApiKey = "apiKey";
    protected final String randomKeyword = "adele";
    protected final String randomZipCode = "90015";
    protected final String randomRadius = "15";
    protected final String randomAttractionId = "333444";
    protected final String randomVenueId = "222111";
    protected final String randomAffiliateId = "7777";
    protected final String randomPromoterId = "9999";
    protected final String randomCity = "york";
    protected final String randomCountryCode = "Canada";
    protected final String randomSource = "ticketmaster";
    protected final String randomClassificationName = "movies";
    protected final String randomEventCount = "50";

    protected final String[] listOfEditableParameters = { "apiKey", "keyword", "zipCode",
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

    @Step
    public void fieldEqualsStoredValue(String fieldName) {
        String storedValue = (String) Serenity.getCurrentSession().get(fieldName);
        String fieldValue;
        switch (fieldName){
            case "apiKey": fieldValue = ancestorPage.getCountDownWidget().getAPIKeyTextFieldValue();
                break;
            case "keyword": fieldValue = ancestorPage.getCountDownWidget().getKeywordTextFieldValue();
                break;
            case "zipCode": fieldValue = ancestorPage.getCountDownWidget().getZipCodeTextFieldValue();
                break;
            default: throw new IllegalArgumentException(String.format("Invalid field name argument %s", fieldName));
        }
        assertTrue(String.format("The field (%s) equal %s but it does not equal stored value (%s).", fieldName, fieldValue, storedValue), storedValue.equalsIgnoreCase(fieldValue));
    }

}
