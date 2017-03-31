package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.AncestorPage;

import java.util.HashMap;
import java.util.Map;

public class PD_CommonSteps extends WidgetFields {

    AncestorPage ancestorPage;

    protected static final String DEFAULTKEY = "5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG";

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
