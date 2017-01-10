package bla.tm.widgets;

import net.serenitybdd.core.annotations.ImplementedBy;

@ImplementedBy(EventDiscoveryWidgetImpl.class)
public interface EventDiscoveryWidget extends AnsestorWidget{
    //Setters
    void setApiKeyValue(String apiKey);

    void setKeywordValue(String keyword);

    void setPeriodValue(String period);

    void setZipCodeValue(String zipCode);

    void setRadiusValue(String radius);

    void setAttractionIdValue(String attractionId);

    void setVenueIdValue(String venueId);

    void setAffiliateIdValue(String affiliateId);

    void setPromoterIdValue(String promoterId);

    void setCityValue(String city);

    void setCountryCodeValue(String countryCode);

    void setSourceValue(String source);

    void setClassificationNameValue(String classificationName);

    void setEventCountValue(String eventCount);

    //Getters
    String getApiKeyValue();

    String getKeywordValue();

    String getZipCodeValue();

    String getRadiusValue();

    String getAttractionIdValue();

    String getVenueIdValue();

    String getAffiliateIdValue();

    String getPromoterIdValue();

    String getCityValue();

    String getCountryCodeValue();

    String getSourceValue();

    String getClassificationNameValue();

    String getEventCountValue();

    String getValueOf(String parameterName);

    String getPosterText();

    String getPosterEventsCount();

    String getSelectedCountry();
}
