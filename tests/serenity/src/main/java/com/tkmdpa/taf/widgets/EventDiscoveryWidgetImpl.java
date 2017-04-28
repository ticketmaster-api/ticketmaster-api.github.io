package com.tkmdpa.taf.widgets;

import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.support.pagefactory.ElementLocator;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.tkmdpa.taf.staticmethods.StaticMethods.getEmbeddedCodeAttributeValue;


public class EventDiscoveryWidgetImpl extends AncestorWidgetImpl implements EventDiscoveryWidget{

    //WebElements
    @FindBy(xpath = "//span[contains(@class,'event-name')]")
    private WebElementFacade posterWindowText;

    @FindBy(xpath = "//div[@class='events-counter']")
    private WebElementFacade posterEventsCounter;

    @FindBy(id = "w-postalcodeapi")
    private WebElementFacade postalCodeApiField;

    private String countryDropdownXPath = "//select[@id='w-country']";

    /**
     * Constructor for initializing elements on the page
     * @param page
     * @param locator
     * @param webElement
     * @param timeoutInMilliseconds
     */
    public EventDiscoveryWidgetImpl(final PageObject page, final ElementLocator locator, final WebElementFacade webElement,
                                    final long timeoutInMilliseconds) {
        super(page, locator, webElement, timeoutInMilliseconds);
    }

    public EventDiscoveryWidgetImpl(final PageObject page, final ElementLocator locator,
                                    final long timeoutInMilliseconds) {
        super(page, locator, timeoutInMilliseconds);
    }

    @Override
    public void setPeriodValue(String period) {

    }

    @Override
    public void setPostalCodeApiValue(String zipCode) {
        postalCodeApiField.clear();
        postalCodeApiField.sendKeys(zipCode, Keys.ENTER);
        waitForSomeActionHappened(500);
    }

    @Override
    public void setRadiusValue(String radius) {
        radiusField.clear();
        radiusField.sendKeys(radius, Keys.ENTER);
    }

    @Override
    public String getRadiusValue() {
        return radiusField.getValue();
    }

    @Override
    public void setSourceValue(String source) {
        String arrowXpath = "//label[@for='w-source']/following-sibling::div//div[@class='custom_select__arrow']";
        String itemXpath = String.format("//label[@for='w-source']/following-sibling::div/ul/li[contains(@data-value,'%s')]", source);
        setValueToCustomDropDown(By.xpath(arrowXpath), By.xpath(itemXpath));
    }

    @Override
    public void setCountryCodeValue(String countryCode) {
        String arrowXpath = "//select[@id='w-countryCode']/../input[@class='custom_select__placeholder']";
        String itemXpath = String.format("//label[@for='w-countryCode']/following-sibling::div/ul/li[text()='%s']", countryCode);
        setValueToCustomDropDown(By.xpath(arrowXpath), By.xpath(itemXpath));
    }

    @Override
    public String getPosterText() {
        return posterWindowText.getText();
    }

    @Override
    public String getPosterEventsCount() {
        Pattern pattern = Pattern.compile("(\\d+)\\sevent");
        Matcher matcher = pattern.matcher(posterEventsCounter.getText());
        String countNumber = null;
        while (matcher.find()) {
            countNumber = matcher.group(1);
        }
        return countNumber;
    }

    @Override
    public String getSelectedCountry() {
        waitForSomeActionHappened(1500);
        return getCountryWebElementFacade().getSelectedVisibleTextValue();
    }

    //Private Methods
    private WebElementFacade getCountryWebElementFacade(){
        return getPage().element(By.xpath(countryDropdownXPath));
    }

    public String getValueOf(String parameterName){
        switch (parameterName){
            case "apiKey": return getApiKeyValue();
            case "keyword": return getKeywordValue();
            case "postalCodeApi": return getPostalCodeApiValue();
            case "attractionId": return getAttractionIdValue();
            case "venueId": return getVenueIdValue();
            case "promoterId": return getPromoterIdValue();
            case "city": return getCityValue();
            case "countryCode": return getCountryCodeValue();
            case "source": return getSourceValue();
            case "classificationName": return getClassificationNameValue();
            case "eventCount": return getEventCountValue();
            default: throw new IllegalArgumentException(String.format("illegal argument %s", parameterName));
        }
    }

    @Override
    public String getPostalCodeApiValue() {
        return postalCodeApiField.getValue();
    }

    @Override
    public String getEmbeddedValueOf(String valueName) {
        switch (valueName){
            case "apiKey": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_APIKEY);
            case "keyword": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_KEYWORD);
            case "postalCodeApi": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_POSTALCODEAPI);
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

}
