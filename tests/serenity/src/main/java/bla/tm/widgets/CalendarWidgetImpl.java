package bla.tm.widgets;

import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.support.pagefactory.ElementLocator;
import org.openqa.selenium.support.ui.Select;

import static bla.tm.staticmethods.StaticMethods.getEmbeddedCodeAttributeValue;
import static bla.tm.staticmethods.StaticMethods.waitForSomeActionHappened;

public class CalendarWidgetImpl extends AnsestorWidgetImpl implements CalendarWidget {
    //Constructors
    public CalendarWidgetImpl(PageObject page, ElementLocator locator, WebElementFacade webElement, long timeoutInMilliseconds) {
        super(page, locator, webElement, timeoutInMilliseconds);
    }

    public CalendarWidgetImpl(final PageObject page, final ElementLocator locator,
                              final long timeoutInMilliseconds) {
        super(page, locator, timeoutInMilliseconds);
    }

    //Constants
    private final String HTML_CODE_ATTRIBUTE_APIKEY = "w-tmapikey";
    private final String HTML_CODE_ATTRIBUTE_KEYWORD = "w-keyword";
    private final String HTML_CODE_ATTRIBUTE_ZIPCODE = "w-postalcode";
    private final String HTML_CODE_ATTRIBUTE_RADIUS = "w-radius";

    //WebElements
    @FindBy(xpath = "//input[@id='w-tm-api-key']")
    private WebElementFacade apiKeyTextField;

    @FindBy(xpath = "//input[@id='w-postalcode']")
    private WebElementFacade zipCodeTextField;

    @FindBy(xpath = "//input[@id='w-keyword']")
    private WebElementFacade keywordTextField;

    @FindBy(xpath = "//select[@id='w-country']")
    private WebElementFacade countryDropdown;

    @FindBy(xpath = "//select[@id='w-radius']")
    private WebElementFacade radiusDropdown;

    @FindBy(xpath = "//label[@for='w-radius']/following-sibling::div/ul/li[contains(@class,'item-active')]")
    private WebElementFacade activeRadius;

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
    public String getZipCodeTextFieldValue() {
        return zipCodeTextField.getValue();
    }

    @Override
    public void setZipCodeTextFieldValue(String zipCode) {
        zipCodeTextField.clear();
        zipCodeTextField.sendKeys(zipCode, Keys.ENTER);
    }

    @Override
    public String getKeywordTextFieldValue() {
        return keywordTextField.getValue();
    }

    @Override
    public void setKeywordTextFieldValue(String keyword) {
        keywordTextField.clear();
        keywordTextField.sendKeys(keyword);
    }

    @Override
    public String getRadiusDropdownValue() {
        String radius = null;
        while(radius == null) {
            radius = (String) getPage().evaluateJavascript("return document.evaluate('//label[@for=\"w-radius\"]/following-sibling::div/ul/li[contains(@class,\"item-active\")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;");
        }
        return radius;
    }

    @Override
    public void setRadiusDropdownValueTo15() {
        WebElementFacade arrow = getPage().$("//label[@for='w-radius']/following-sibling::div//div[@class='custom_select__arrow']");
        scrollToElement(arrow);
        arrow.click();
        secondRadiusValue.waitUntilVisible().click();
    }

    @Override
    public String getSelectedCountry() {
        return countryDropdown.getSelectedVisibleTextValue();
    }

    @Override
    public String getEmbeddedValueOf(String valueName) {
        switch (valueName){
            case "apiKey": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_APIKEY);
            case "keyword": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_KEYWORD);
            case "zipCode": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_ZIPCODE);
            case "radius": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_RADIUS);
            default: throw new IllegalArgumentException(String.format("The argument of embedded attribute name is illegal: %s", valueName));
        }
    }

    @Override
    public void clickResetButton(){
        getPage().evaluateJavascript("arguments[0].click();", resetButton);
    }
}
