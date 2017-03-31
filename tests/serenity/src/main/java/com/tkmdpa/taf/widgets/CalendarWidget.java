package com.tkmdpa.taf.widgets;

import net.serenitybdd.core.annotations.ImplementedBy;

@ImplementedBy(CalendarWidgetImpl.class)
public interface CalendarWidget extends AncestorWidget {
    String getAPIKeyTextFieldValue();
    void setAPIKeyTextFieldValue(String apiKey);

    void setPostalCodeTextFieldValue(String zipCode);

    String getKeywordTextFieldValue();
    void setKeywordTextFieldValue(String keyword);

    String getRadiusDropdownValue();
    void setRadiusDropdownValueTo15();

    String getSelectedCountry();

    void clickResetButton();

    String getEmbeddedValueOf(String valueName);
}
