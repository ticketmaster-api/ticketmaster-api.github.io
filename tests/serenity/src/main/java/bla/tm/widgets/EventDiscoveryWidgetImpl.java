package bla.tm.widgets;

import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.support.pagefactory.ElementLocator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import static bla.tm.staticmethods.StaticMethods.waitForSomeActionHappened;

public class EventDiscoveryWidgetImpl extends AnsestorWidgetImpl implements EventDiscoveryWidget{

    //WebElements
    @FindBy(xpath = "//input[@id='w-tm-api-key']")
    private WebElementFacade apiKeyTextField;

    @FindBy(xpath = "//input[@id='w-keyword']")
    private WebElementFacade keywordTextField;

    @FindBy(xpath = "//input[@id='w-postalcode']")
    private WebElementFacade zipCodeField;

    @FindBy(xpath = "//input[@id='w-radius']")
    private WebElementFacade radiusField;

    @FindBy(xpath = "//input[@id='w-attractionid']")
    private WebElementFacade attractionIdField;

    @FindBy(xpath = "//input[@id='w-promoterid']")
    private WebElementFacade promoterIdField;

    @FindBy(xpath = "//input[@id='w-venueid']")
    private WebElementFacade venueIdField;

    @FindBy(xpath = "//input[@id='w-city']")
    private WebElementFacade cityField;

    @FindBy(xpath = "//input[@id='w-classificationname']")
    private WebElementFacade classificationNameField;

    @FindBy(xpath = "//input[@id='w-affiliateid']")
    private WebElementFacade affiliateIdField;

    @FindBy(xpath = "//label[@for='w-period-year']")
    private WebElementFacade labelPeriodYear;

    @FindBy(xpath = "//input[@id='w-size']")
    private WebElementFacade eventCountField;

    @FindBy(xpath = "//span[contains(@class,'event-name')]")
    private WebElementFacade posterWindowText;

    @FindBy(xpath = "//div[@class='events-counter']")
    private WebElementFacade posterEventsCounter;

    //Constructors
    public EventDiscoveryWidgetImpl(final PageObject page, final ElementLocator locator, final WebElementFacade webElement,
                                    final long timeoutInMilliseconds) {
        super(page, locator, webElement, timeoutInMilliseconds);
    }

    public EventDiscoveryWidgetImpl(final PageObject page, final ElementLocator locator,
                                    final long timeoutInMilliseconds) {
        super(page, locator, timeoutInMilliseconds);
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
    public void setPeriodValue(String period) {

    }

    @Override
    public void setZipCodeValue(String zipCode) {
        zipCodeField.clear();
        zipCodeField.sendKeys(zipCode, Keys.ENTER);
    }

    @Override
    public void setRadiusValue(String radius) {
        radiusField.clear();
        radiusField.sendKeys(radius, Keys.ENTER);
    }

    @Override
    public void setAttractionIdValue(String attractionId) {
        attractionIdField.clear();
        attractionIdField.sendKeys(attractionId, Keys.ENTER);
    }

    @Override
    public void setVenueIdValue(String venueId) {
        venueIdField.clear();
        venueIdField.sendKeys(venueId, Keys.ENTER);
    }

    @Override
    public void setAffiliateIdValue(String affiliateId) {
        affiliateIdField.clear();
        affiliateIdField.sendKeys(affiliateId, Keys.ENTER);
    }

    @Override
    public void setPromoterIdValue(String promoterId) {
        promoterIdField.clear();
        promoterIdField.sendKeys(promoterId, Keys.ENTER);
    }

    @Override
    public void setCityValue(String city) {
        cityField.clear();
        cityField.sendKeys(city, Keys.ENTER);
    }

    @Override
    public void setCountryCodeValue(String countryCode) {
        String arrowXpath = "//label[@for='w-countryCode']/following-sibling::div//div[@class='custom_select__arrow']";
        String itemXpath = String.format("//label[@for='w-countryCode']/following-sibling::div/ul/li[text()='%s']", countryCode);
        setValueToCustomDropdown(By.xpath(arrowXpath), By.xpath(itemXpath));
    }

    @Override
    public void setSourceValue(String source) {
        String arrowXpath = "//label[@for='w-source']/following-sibling::div//div[@class='custom_select__arrow']";
        String itemXpath = String.format("//label[@for='w-source']/following-sibling::div/ul/li[contains(@data-value,'%s')]", source);
        setValueToCustomDropdown(By.xpath(arrowXpath), By.xpath(itemXpath));
    }

    @Override
    public void setClassificationNameValue(String classificationName) {
        classificationNameField.clear();
        classificationNameField.sendKeys(classificationName, Keys.ENTER);
    }

    @Override
    public void setEventCountValue(String eventCount) {
        eventCountField.clear();
        eventCountField.sendKeys(eventCount, Keys.ENTER);
        waitForSomeActionHappened(1000);
    }

    //Getters
    @Override
    public String getApiKeyValue() {
        return apiKeyTextField.getValue();
    }

    @Override
    public String getKeywordValue() {
        return keywordTextField.getValue();
    }

    @Override
    public String getZipCodeValue() {
        return zipCodeField.getValue();
    }

    @Override
    public String getRadiusValue() {
        return radiusField.getValue();
    }

    @Override
    public String getAttractionIdValue() {
        return attractionIdField.getValue();
    }

    @Override
    public String getVenueIdValue() {
        return venueIdField.getValue();
    }

    @Override
    public String getAffiliateIdValue() {
        return affiliateIdField.getValue();
    }

    @Override
    public String getPromoterIdValue() {
        return promoterIdField.getValue();
    }

    @Override
    public String getCityValue() {
        return cityField.getValue();
    }

    @Override
    public String getCountryCodeValue() {
        String countryCodeXpath = "//label[@for=\"w-countryCode\"]/following-sibling::div/ul/li[contains(@class,\"item-active\")]";
        String exceptionText = "Cannot get countryCode value in dropdown";
        return getElementValueByXpathJs(countryCodeXpath, exceptionText);
    }

    @Override
    public String getSourceValue() {
        String sourceXpath = "//label[@for=\"w-source\"]/following-sibling::div/ul/li[contains(@class,\"item-active\")]";
        String exceptionText = "Cannot get Source value in dropdown";
        return getElementValueByXpathJs(sourceXpath, exceptionText);
    }

    @Override
    public String getClassificationNameValue() {
        return classificationNameField.getValue();
    }

    @Override
    public String getEventCountValue() {
        return eventCountField.getValue ();
    }

    @Override
    public String getValueOf(String parameterName){
        switch (parameterName){
            case "apiKey": return getApiKeyValue();
            case "keyword": return getKeywordValue();
            case "zipCode": return getZipCodeValue();
            case "radius": return getRadiusValue();
            case "attractionId": return getAttractionIdValue();
            case "venueId": return getVenueIdValue();
            case "affiliateId": return getAffiliateIdValue();
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
 }
