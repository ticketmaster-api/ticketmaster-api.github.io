package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_Widget_MapPage;
import net.thucydides.core.annotations.Step;
import org.junit.Assert;

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
        String city = mapWidgetPage.getWidget().getCityFieldValue();
        assertFalse(city == null || city.length() == 0);
    }

    @Step
    public void apiKeyFieldIsNotEmpty() {
        String apiKey = mapWidgetPage.getWidget().getAPIKeyTextFieldValue();
        assertFalse(apiKey == null || apiKey.length() == 0);
    }

    @Step
    public void storeValuesForAllFields() {
        for(String parameterName : listOfEditableParameters){
            getCurrentSession().put(parameterName, mapWidgetPage.getWidget().getValueOf(parameterName));
        }
    }

    private final String[] listOfEditableParameters = { "apiKey", "keyword", "zipCode",
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

}
