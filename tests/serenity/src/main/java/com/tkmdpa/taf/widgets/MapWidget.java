package com.tkmdpa.taf.widgets;

import net.serenitybdd.core.annotations.ImplementedBy;

@ImplementedBy(MapWidgetImpl.class)
public interface MapWidget extends AncestorWidget {

    String getCityFieldValue();

    String getEmbeddedValueOf(String parameter);

    void setZipCodeTextFieldValue(String randomZipCode);

}
