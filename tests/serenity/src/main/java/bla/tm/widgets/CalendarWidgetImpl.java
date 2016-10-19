package bla.tm.widgets;

import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.support.pagefactory.ElementLocator;

import static bla.tm.staticmethods.StaticMethods.getEmbeddedCodeAttributeValue;

public class CalendarWidgetImpl extends AnsestorWidgetImpl implements CalendarWidget {
    //Constructor
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



    //Calendar Widget Interface Implementation
    @Override
    public WebElementFacade getAPIKeyTextField() {
        return apiKeyTextField;
    }

    @Override
    public WebElementFacade getZipCodeTextField() {
        return zipCodeTextField;
    }

    @Override
    public WebElementFacade getKeywordTextField() {
        return keywordTextField;
    }

    @Override
    public WebElementFacade getRadiusDropdown() {
        return radiusDropdown;
    }

    @Override
    public WebElementFacade getCountryDropdown() {
        return countryDropdown;
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
}
