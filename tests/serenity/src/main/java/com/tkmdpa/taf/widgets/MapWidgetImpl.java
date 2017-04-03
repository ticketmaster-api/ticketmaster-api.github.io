package com.tkmdpa.taf.widgets;

import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.Keys;
import org.openqa.selenium.support.pagefactory.ElementLocator;

import static com.tkmdpa.taf.staticmethods.StaticMethods.getEmbeddedCodeAttributeValue;


public class MapWidgetImpl extends AncestorWidgetImpl implements MapWidget {

    @FindBy(xpath = "//span[text()='use Geoposition']")
    private WebElementFacade useGeoposition;

    public MapWidgetImpl(PageObject page, ElementLocator locator, WebElementFacade webElement, long timeoutInMilliseconds) {
        super(page, locator, webElement, timeoutInMilliseconds);
    }

    public MapWidgetImpl(PageObject page, ElementLocator locator, long timeoutInMilliseconds) {
        super(page, locator, timeoutInMilliseconds);
    }

    @Override
    public String getCityFieldValue() {
        return cityField.getValue();
    }


    @Override
    public String getEmbeddedValueOf(String valueName) {
        switch (valueName){
            case "apiKey": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_APIKEY);
            case "keyword": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_KEYWORD);
            case "zipCode": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_ZIPCODE);
            case "period": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_PERIOD);
            case "attractionId": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_ATTRACTIONID);
            case "venueId": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_VENUEID);
            case "promoterId": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_PROMOTERID);
            case "city": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_CITY);
            case "countryCode": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_COUNTRYCODE);
            case "source": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_SOURCE);
            case "classificationName": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_CLASSIFICATIONNAME);
            case "eventCount": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_EVENTCOUNT);
            default: throw new IllegalArgumentException(String.format("The argument of embedded attribute name is illegal: %s", valueName));
        }
    }

    @Override
    public void setZipCodeTextFieldValue(String zipCode) {
        zipCodeField.clear();
        zipCodeField.sendKeys(zipCode, Keys.ENTER);
        waitForSomeActionHappened(1500);
    }

}
