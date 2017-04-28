package com.tkmdpa.taf.widgets;

import net.serenitybdd.core.annotations.ImplementedBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.serenitybdd.core.pages.WidgetObject;

@ImplementedBy(AncestorWidgetImpl.class)
public interface AncestorWidget extends WidgetObject {

    boolean isVisible(boolean expectedResult);
    void clickResetButton();
    WebElementFacade getEmbeddedHtmlCode();
    String getAPIKeyTextFieldValue();
    void setApiKeyValue(String apiKey);
    void setKeywordValue(String keyword);
    void setZipCodeValue(String zipCode);
    void setAttractionIdValue(String attractionId);
    void setVenueIdValue(String venueId);
    void setCityValue(String city);
    void setClassificationNameValue(String classificationName);
    void setEventCountValue(String eventCount);
    void setPromoterIdValue(String promoterId);
    void setSourceValue(String source);
    void setCountryCodeValue(String countryCode);
    String getValueOf(String parameterName);
    String getKeywordTextFieldValue();
    String getPostalCodeApiFieldValue();
    String getZipCodeFieldValue();
    void clickOnGeoPosition();
    WebElementFacade getGetCodeButton();
    WebElementFacade getResetButton();
    WebElementFacade getSource();
    WebElementFacade getSourceLink();
    WebElementFacade getCountryCodeLink();
}
