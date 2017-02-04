package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_Widget_MapPage;
import net.thucydides.core.annotations.Step;

import static net.serenitybdd.core.Serenity.getCurrentSession;
import static org.junit.Assert.assertFalse;

public class PD_Widget_MapSteps extends PD_CommonSteps{

    PD_Widget_MapPage mapWidgetPage;

    @Step
    public void openPage() {
        mapWidgetPage.open();
    }

    @Step
    public void cityIsNotEmpty() {
        String city = mapWidgetPage.getMapWidget().getCityFieldValue();
        assertFalse(city == null || city.length() == 0);
    }

    @Step
    public void apiKeyFieldIsNotEmpty() {
        String apiKey = mapWidgetPage.getMapWidget().getAPIKeyTextFieldValue();
        assertFalse(apiKey == null || apiKey.length() == 0);
    }

    public void changeValuesForAllFields(String apiKey, String keyword, String zipCode, String city, String attractionId, String venueId, String promoterId, String source, String countryCode, String classificationName, String eventCount) {
        mapWidgetPage.getMapWidget().setApiKeyValue(apiKey);
        mapWidgetPage.getMapWidget().setKeywordValue(keyword);
        mapWidgetPage.getMapWidget().setZipCodeValue(zipCode);
        mapWidgetPage.getMapWidget().setCityValue(city);
        mapWidgetPage.getMapWidget().setAttractionIdValue(attractionId);
        mapWidgetPage.getMapWidget().setVenueIdValue(venueId);
        mapWidgetPage.getMapWidget().setPromoterIdValue(promoterId);
        mapWidgetPage.getMapWidget().setSourceValue(source);
        mapWidgetPage.getMapWidget().setCountryCodeValue(countryCode);
        mapWidgetPage.getMapWidget().setClassificationNameValue(classificationName);
        mapWidgetPage.getMapWidget().setEventCountValue(eventCount);
    }

    @Step
    public void storeValuesForAllFields() {
        for(String parameterName : listOfEditableParameters){
            getCurrentSession().put(parameterName, mapWidgetPage.getMapWidget().getValueOf(parameterName));
        }
    }

}
