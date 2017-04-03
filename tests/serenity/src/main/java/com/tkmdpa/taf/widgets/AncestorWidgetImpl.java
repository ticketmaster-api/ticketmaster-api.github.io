package com.tkmdpa.taf.widgets;

import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import net.serenitybdd.core.pages.WidgetObjectImpl;
import net.thucydides.core.ThucydidesSystemProperty;
import net.thucydides.core.util.EnvironmentVariables;
import net.thucydides.core.util.SystemEnvironmentVariables;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.support.pagefactory.ElementLocator;

public abstract class AncestorWidgetImpl extends WidgetObjectImpl implements AncestorWidget {
    /**
     * Private fields
     */
    protected final String HTML_CODE_ATTRIBUTE_APIKEY = "w-tmapikey";
    protected final String HTML_CODE_ATTRIBUTE_KEYWORD = "w-keyword";
    protected final String HTML_CODE_ATTRIBUTE_ZIPCODE = "w-postalcode";
    protected final String HTML_CODE_ATTRIBUTE_POSTALCODEAPI = "w-postalcodeapi";
    protected final String HTML_CODE_ATTRIBUTE_PERIOD = "w-period";
    protected final String HTML_CODE_ATTRIBUTE_ATTRACTIONID = "w-attractionid";
    protected final String HTML_CODE_ATTRIBUTE_VENUEID = "w-venueid";
    protected final String HTML_CODE_ATTRIBUTE_CITY = "w-city";
    protected final String HTML_CODE_ATTRIBUTE_COUNTRYCODE = "w-countrycode";
    protected final String HTML_CODE_ATTRIBUTE_SOURCE = "w-source";
    protected final String HTML_CODE_ATTRIBUTE_CLASSIFICATIONNAME = "w-classificationname";
    protected final String HTML_CODE_ATTRIBUTE_EVENTCOUNT = "w-size";
    protected final String HTML_CODE_ATTRIBUTE_PROMOTERID = "w-promoterid";

    /**
     * WebElements
     */
    @FindBy(id = "w-tm-api-key")
    protected WebElementFacade apiKeyTextField;

    @FindBy(id = "w-keyword")
    protected WebElementFacade keywordTextField;

    @FindBy(id = "w-radius")
    protected WebElementFacade radiusField;

    @FindBy(id = "w-postalcode")
    protected WebElementFacade zipCodeField;

    @FindBy(id = "w-postalcodeapi")
    protected WebElementFacade postalCodeApiField;

    @FindBy(id = "w-attractionid")
    protected WebElementFacade attractionIdField;

    @FindBy(id = "w-promoterid")
    protected WebElementFacade promoterIdField;

    @FindBy(id = "w-venueid")
    protected WebElementFacade venueIdField;

    @FindBy(id = "w-city")
    protected WebElementFacade cityField;

    @FindBy(id = "w-classificationname")
    protected WebElementFacade classificationNameField;

    @FindBy(id = "w-affiliateid")
    protected WebElementFacade affiliateIdField;

    @FindBy(xpath = "//label[@for='w-period-year']")
    protected WebElementFacade labelPeriodYear;

    @FindBy(id = "w-size")
    protected WebElementFacade eventCountField;

    @FindBy(xpath = "//div[contains(@class,'visible-lg')]//button[text()='RESET']")
    private WebElementFacade resetButton;

    @FindBy(xpath = "//span[text()='use Geoposition']")
    private WebElementFacade geoPosition;

    @FindBy(xpath = "//div[contains(@class,'visible-lg')]//button[text()='GET CODE']")
    private WebElementFacade getCodeButton;

    @FindBy(id = "w-source")
    private WebElementFacade sourceField;

    @FindBy(xpath = "//label[@for='w-source']/following-sibling::div//div[@class='custom_select__arrow']")
    private WebElementFacade sourceLink;

    @FindBy(xpath = "//label[@for='w-countryCode']/following-sibling::div//div[@class='custom_select__arrow']")
    private WebElementFacade eventCountLink;

    @Override
    public void clickResetButton() {
        resetButton.click();
        waitForSomeActionHappened(1000);
    }

    @Override
    public String getPostalCodeApiFieldValue() {
        return postalCodeApiField.getValue();
    }

    public String getAPIKeyTextFieldValue() {
        return apiKeyTextField.getValue();
    }

    //Setters
    @Override
    public void setApiKeyValue(String apiKey) {
        apiKeyTextField.clear();
        apiKeyTextField.sendKeys(apiKey, Keys.ENTER);
    }

    @Override
    public void setKeywordValue(String keyword) {
        keywordTextField.clear();
        keywordTextField.sendKeys(keyword, Keys.ENTER);
    }

    @Override
    public void setZipCodeValue(String zipCode) {
        zipCodeField.clear();
        zipCodeField.sendKeys(zipCode, Keys.ENTER);
        waitForSomeActionHappened(500);
    }

    public void setClassificationNameValue(String classificationName) {
        classificationNameField.clear();
        classificationNameField.sendKeys(classificationName, Keys.ENTER);
    }

    public void setEventCountValue(String eventCount) {
        eventCountField.clear();
        eventCountField.sendKeys(eventCount, Keys.ENTER);
        waitForSomeActionHappened(2000);
    }

    @Override
    public void setSourceValue(String source) {
        String arrowXpath = "//label[@for='w-source']/following-sibling::div//div[@class='custom_select__arrow']";
        String itemXpath = String.format("//label[@for='w-source']/following-sibling::div/ul/li[contains(@data-value,'%s')]", source);
        setValueToCustomDropDown(By.xpath(arrowXpath), By.xpath(itemXpath));
    }

    @Override
    public void setCountryCodeValue(String countryCode) {
        String arrowXpath = "//label[@for='w-countryCode']/following-sibling::div//div[@class='custom_select__arrow']";
        String itemXpath = String.format("//label[@for='w-countryCode']/following-sibling::div/ul/li[text()='%s']", countryCode);
        setValueToCustomDropDown(By.xpath(arrowXpath), By.xpath(itemXpath));
    }

    /**
     * Get methods
     */
    public String getApiKeyValue() {
        return apiKeyTextField.getValue();
    }

    public String getKeywordValue() {
        return keywordTextField.getValue();
    }

    public String getZipCodeValue() {
        return zipCodeField.getValue();
    }

    public String getAttractionIdValue() {
        return attractionIdField.getValue();
    }

    public String getVenueIdValue() {
        return venueIdField.getValue();
    }

    public String getAffiliateIdValue() {
        return affiliateIdField.getValue();
    }

    public String getPromoterIdValue() {
        return promoterIdField.getValue();
    }

    public String getCityValue() {
        return cityField.getValue();
    }

    public String getKeywordTextFieldValue() {
        return keywordTextField.getValue();
    }

    public void setAttractionIdValue(String attractionId) {
        attractionIdField.clear();
        attractionIdField.sendKeys(attractionId, Keys.ENTER);
    }

    public void setVenueIdValue(String venueId) {
        venueIdField.clear();
        venueIdField.sendKeys(venueId, Keys.ENTER);
    }

    public void setAffiliateIdValue(String affiliateId) {
        affiliateIdField.clear();
        affiliateIdField.sendKeys(affiliateId, Keys.ENTER);
    }

    public void setPromoterIdValue(String promoterId) {
        promoterIdField.clear();
        promoterIdField.sendKeys(promoterId, Keys.ENTER);
    }

    public void setCityValue(String city) {
        cityField.clear();
        cityField.sendKeys(city, Keys.ENTER);
    }

    public void clickOnGeoPosition(){
        geoPosition.click();
    }

    public String getCountryCodeValue() {
        String countryCodeXpath = "//label[@for=\"w-countryCode\"]/following-sibling::div/ul/li[contains(@class,\"item-active\")]";
        String firstCountryCodeItemXpath = "//*[@id=\"w-countryCode\"]/following-sibling::ul/li[1]";
        String exceptionText = "Cannot get countryCode value in dropdown";
        String countryCodeValue = null;
        try {
            countryCodeValue = getElementValueByXpathJs(countryCodeXpath, exceptionText);
        } catch (WebDriverException e) {
            if (e.toString().contains("document.evaluate")) {
                countryCodeValue = getElementValueByXpathJs(firstCountryCodeItemXpath, exceptionText);
            }
        }
        return countryCodeValue;
    }

    public String getSourceValue() {
        String sourceXpath = "//label[@for=\"w-source\"]/following-sibling::div/ul/li[contains(@class,\"item-active\")]";
        String firstSourceItemXpath = "//*[@id=\"w-source\"]/following-sibling::ul/li[1]";
        String exceptionText = "Cannot get Source value in dropdown";
        String sourceValue = null;
        try {
            sourceValue = getElementValueByXpathJs(sourceXpath, exceptionText);
        } catch (WebDriverException e) {
            if (e.toString().contains("document.evaluate")) {
                sourceValue = getElementValueByXpathJs(firstSourceItemXpath, exceptionText);
            }
        }
        return sourceValue;
    }

    public String getClassificationNameValue() {
        return classificationNameField.getValue();
    }

    public String getEventCountValue() {
        return eventCountField.getValue ();
    }

    @Override
    public String getValueOf(String parameterName){
        switch (parameterName){
            case "apiKey": return getApiKeyValue();
            case "keyword": return getKeywordValue();
            case "zipCode": return getZipCodeValue();
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

    /**
     * Constructor for initializing elements
     * @param page
     * @param locator
     * @param webElement
     * @param timeoutInMilliseconds
     */
    public AncestorWidgetImpl(final PageObject page, final ElementLocator locator, final WebElementFacade webElement,
                              final long timeoutInMilliseconds) {
        super(page, locator, webElement, timeoutInMilliseconds);
    }

    public AncestorWidgetImpl(final PageObject page, final ElementLocator locator,
                              final long timeoutInMilliseconds) {
        super(page, locator, timeoutInMilliseconds);
    }

    public boolean isVisible(final boolean expectedResult) {
        return expectedResult ? this.isVisible() : this.isCurrentlyVisible();
    }

    @FindBy(xpath = "//code[contains(@class,'language-html')]")
    private WebElementFacade embeddedCode;

    @Override
    public WebElementFacade getEmbeddedHtmlCode() {
        embeddedCode.shouldBeVisible();
        return embeddedCode;
    }

    public void setValueToCustomDropDown(By dropdownArrow, By dropdownItem){
        WebElementFacade arrow = find(dropdownArrow);
        arrow.click();
        WebElementFacade item = getPage().find(dropdownItem);
        item.waitUntilVisible().click();
    }

    public String getElementValueByXpathJs(String xpath, String exceptionText) {
        int explicitTimeout = getWebDriverExplicitTimeout();
        int delayBetweenAttemptsMilliseconds = 200;
        int numberOfAttempts = explicitTimeout / delayBetweenAttemptsMilliseconds;

        for (int i = 0; i < numberOfAttempts; i++) {
            String countryCode = (String) getPage()
                    .evaluateJavascript("return document.evaluate('"
                            + xpath
                            + "', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;");
            if (countryCode != null) {
                return countryCode;
            }
            waitForSomeActionHappened(delayBetweenAttemptsMilliseconds);
        }
        throw new WebDriverException(exceptionText);
    }

    public static void waitForSomeActionHappened(int milliSec) {
        try {
            Thread.sleep(milliSec);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
    }

    private int getWebDriverExplicitTimeout(){
        String defaultTimeoutInMilliseconds = "15000";
        EnvironmentVariables variables = SystemEnvironmentVariables.createEnvironmentVariables();
        String timeout = variables.getProperty(ThucydidesSystemProperty.WEBDRIVER_WAIT_FOR_TIMEOUT);
        if(timeout == null || timeout.isEmpty()){
            timeout = defaultTimeoutInMilliseconds;
        }
        int explicitTimeout = Integer.parseInt(timeout);
        return explicitTimeout;
    }

    @Override
    public String getZipCodeFieldValue() {
        return zipCodeField.getText();
    }

    public WebElementFacade getGetCodeButton() {
        return getCodeButton;
    }

    public WebElementFacade getResetButton() {
        return resetButton;
    }

    public WebElementFacade getSource(){
        return  sourceField;
    }

    public WebElementFacade getSourceLink(){
        return sourceLink;
    }

    public WebElementFacade getCountryCodeLink(){
        return eventCountLink;
    }
}
