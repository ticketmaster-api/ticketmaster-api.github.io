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

    public void changeValuesForAllFields() {
        mapWidgetPage.getMapWidget().setApiKeyValue(randomApiKey);
        mapWidgetPage.getMapWidget().setKeywordValue(randomKeyword);
        mapWidgetPage.getMapWidget().setZipCodeValue(randomZipCode);
        mapWidgetPage.getMapWidget().setCityValue(randomCity);
        mapWidgetPage.getMapWidget().setAttractionIdValue(randomAttractionId);
        mapWidgetPage.getMapWidget().setVenueIdValue(randomVenueId);
        mapWidgetPage.getMapWidget().setPromoterIdValue(randomVenueId);
        mapWidgetPage.getMapWidget().setSourceValue(randomSource);
        mapWidgetPage.getMapWidget().setCountryCodeValue(randomCountryCode);
        mapWidgetPage.getMapWidget().setClassificationNameValue(randomClassificationName);
        mapWidgetPage.getMapWidget().setEventCountValue(randomEventCount);
    }

    @Step
    public void storeValuesForAllFields() {
        for(String parameterName : listOfEditableParameters){
            getCurrentSession().put(parameterName, mapWidgetPage.getMapWidget().getValueOf(parameterName));
        }
    }

}
