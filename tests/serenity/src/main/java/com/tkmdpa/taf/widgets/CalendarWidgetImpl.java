package com.tkmdpa.taf.widgets;

import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.support.pagefactory.ElementLocator;

import static com.tkmdpa.taf.staticmethods.StaticMethods.getEmbeddedCodeAttributeValue;

public class CalendarWidgetImpl extends AncestorWidgetImpl implements CalendarWidget {
    //Constructors
    public CalendarWidgetImpl(PageObject page, ElementLocator locator, WebElementFacade webElement, long timeoutInMilliseconds) {
        super(page, locator, webElement, timeoutInMilliseconds);
    }

    public CalendarWidgetImpl(final PageObject page, final ElementLocator locator,
                              final long timeoutInMilliseconds) {
        super(page, locator, timeoutInMilliseconds);
    }

    //WebElements

    private String countryDropdownXPath = "//select[@id='w-country']";

    @FindBy(xpath = "//select[@id='w-radius']")
    private WebElementFacade radiusDropdown;

    @FindBy(xpath = "//label[@for='w-radius']/following-sibling::div/ul/li[contains(@class,'item-active')]")
    private WebElementFacade activeRadius;

    @FindBy(xpath = "//select[@id='w-radius']/following-sibling::input")
    private WebElementFacade defaultRadius;

    @FindBy(xpath = "//label[@for='w-radius']/following-sibling::div/ul/li[2]")
    private WebElementFacade secondRadiusValue;

    @FindBy(xpath = "//div[contains(@class,'visible-lg')]//button[text()='RESET']")
    private WebElementFacade resetButton;

    //Calendar Widget Interface Implementation
    @Override
    public String getAPIKeyTextFieldValue() {
        return apiKeyTextField.getValue();
    }

    @Override
    public void setAPIKeyTextFieldValue(String apiKey) {
        apiKeyTextField.clear();
        apiKeyTextField.sendKeys(apiKey, Keys.ENTER);
    }

    @Override
    public void setPostalCodeTextFieldValue(String zipCode) {
        postalCodeApiField.clear();
        postalCodeApiField.sendKeys(zipCode, Keys.ENTER);
        waitForSomeActionHappened(1500);
    }

    @Override
    public void setKeywordTextFieldValue(String keyword) {
        keywordTextField.clear();
        keywordTextField.sendKeys(keyword);
    }

    @Override
    public String getRadiusDropdownValue() {
        String radiusXpath = "//label[@for=\"w-radius\"]/following-sibling::div/ul/li[contains(@class,\"item-active\")]";
        String exceptionText = "Cannot get radius value in dropdown";
        try {
            return getElementValueByXpathJs(radiusXpath, exceptionText);
        }
        catch (WebDriverException e){
            if(e.toString().contains("document.evaluate")){
                return defaultRadius.getValue();
            } else throw e;
        }
    }

    @Override
    public void setRadiusDropdownValueTo15() {
        WebElementFacade arrow = getPage().$("//label[@for='w-radius']/following-sibling::div//div[@class='custom_select__arrow']");
        arrow.click();
        secondRadiusValue.waitUntilVisible().click();
    }

    @Override
    public String getSelectedCountry() {
        return getCountryWebElementFacade().getSelectedVisibleTextValue();
    }

    @Override
    public void clickResetButton(){
        getPage().evaluateJavascript("arguments[0].click();", resetButton);
    }

    //Private Methods
    private WebElementFacade getCountryWebElementFacade(){
        return getPage().element(By.xpath(countryDropdownXPath));
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
