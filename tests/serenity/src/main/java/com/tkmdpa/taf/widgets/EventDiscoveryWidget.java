package com.tkmdpa.taf.widgets;

import net.serenitybdd.core.annotations.ImplementedBy;

@ImplementedBy(EventDiscoveryWidgetImpl.class)
public interface EventDiscoveryWidget extends AncestorWidget {
    //Setters

    void setPeriodValue(String period);

    void setRadiusValue(String radius);

    void setAffiliateIdValue(String affiliateId);

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

    String getPosterText();

    String getPosterEventsCount();

    String getSelectedCountry();

    void setPostalCodeApiValue(String zipCode);

    String getValueOf(String parameterName);

    String getPostalCodeApiValue();

    String getEmbeddedValueOf(String parameter);
}
