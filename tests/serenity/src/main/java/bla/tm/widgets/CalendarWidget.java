package bla.tm.widgets;

import net.serenitybdd.core.annotations.ImplementedBy;

@ImplementedBy(CalendarWidgetImpl.class)
public interface CalendarWidget extends AnsestorWidget {
    String getAPIKeyTextFieldValue();
    void setAPIKeyTextFieldValue(String apiKey);

    String getZipCodeTextFieldValue();
    void setZipCodeTextFieldValue(String zipCode);

    String getKeywordTextFieldValue();
    void setKeywordTextFieldValue(String keyword);

    String getRadiusDropdownValue();
    void setRadiusDropdownValueTo15();

    String getSelectedCountry();

    void clickResetButton();

}
