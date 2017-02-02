package bla.tm.widgets;

import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import net.serenitybdd.core.pages.WidgetObjectImpl;
import net.thucydides.core.ThucydidesSystemProperty;
import net.thucydides.core.util.EnvironmentVariables;
import net.thucydides.core.util.SystemEnvironmentVariables;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.support.pagefactory.ElementLocator;
import static bla.tm.staticmethods.StaticMethods.*;

public abstract class AnsestorWidgetImpl extends WidgetObjectImpl implements AnsestorWidget {
    //Private Fields
    protected final String HTML_CODE_ATTRIBUTE_APIKEY = "w-tmapikey";
    protected final String HTML_CODE_ATTRIBUTE_KEYWORD = "w-keyword";
    protected final String HTML_CODE_ATTRIBUTE_ZIPCODE = "w-postalcode";
    protected final String HTML_CODE_ATTRIBUTE_PERIOD = "w-period";
    protected final String HTML_CODE_ATTRIBUTE_RADIUS = "w-radius";
    protected final String HTML_CODE_ATTRIBUTE_ATTRACTIONID = "w-attractionid";
    protected final String HTML_CODE_ATTRIBUTE_VENUEID = "w-venueid";
    protected final String HTML_CODE_ATTRIBUTE_AFFILIATEID = "w-affiliateid";
    protected final String HTML_CODE_ATTRIBUTE_CITY = "w-city";
    protected final String HTML_CODE_ATTRIBUTE_COUNTRYCODE = "w-countrycode";
    protected final String HTML_CODE_ATTRIBUTE_SOURCE = "w-source";
    protected final String HTML_CODE_ATTRIBUTE_CLASSIFICATIONNAME = "w-classificationname";
    protected final String HTML_CODE_ATTRIBUTE_EVENTCOUNT = "w-size";
    protected final String HTML_CODE_ATTRIBUTE_PROMOTERID = "w-promoterid";

    //Constructors
    public AnsestorWidgetImpl(final PageObject page, final ElementLocator locator, final WebElementFacade webElement,
                                 final long timeoutInMilliseconds) {
        super(page, locator, webElement, timeoutInMilliseconds);
    }

    public AnsestorWidgetImpl(final PageObject page, final ElementLocator locator,
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

    public void scrollToElement(WebElementFacade element){
        int screenHeight = getPage().getDriver().manage().window().getSize().getHeight();
        getPage().evaluateJavascript("window.scrollTo(0," + (element.getLocation().y - screenHeight / 2) + ")");
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String getEmbeddedValueOf(String valueName) {
        switch (valueName){
            case "apiKey": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_APIKEY);
            case "keyword": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_KEYWORD);
            case "zipCode": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_ZIPCODE);
            case "period": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_PERIOD);
            case "radius": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_RADIUS);
            case "attractionId": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_ATTRACTIONID);
            case "venueId": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_VENUEID);
            case "affiliateId": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_AFFILIATEID);
            case "promoterId": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_PROMOTERID);
            case "city": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_CITY);
            case "countryCode": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_COUNTRYCODE);
            case "source": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_SOURCE);
            case "classificationName": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_CLASSIFICATIONNAME);
            case "eventCount": return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_EVENTCOUNT);
            default: throw new IllegalArgumentException(String.format("The argument of embedded attribute name is illegal: %s", valueName));
        }
    }

    public void setValueToCustomDropdown(By dropdownArrow, By dropdownItem){
        WebElementFacade arrow = getPage().find(dropdownArrow);
        scrollToElement(arrow);
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
}
