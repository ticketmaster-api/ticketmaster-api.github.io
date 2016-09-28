package bla.tm.widgets;


import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.support.pagefactory.ElementLocator;

import static bla.tm.staticmethods.StaticMethods.getEmbeddedCodeAttributeValue;

public class CountdownWidgetImpl extends AnsestorWidgetImpl implements CountdownWidget{
    //Constants
    private final String HTML_CODE_ATTRIBUTE_APIKEY = "w-tmapikey";
    private final String HTML_CODE_ATTRIBUTE_EVENTID = "id";
    private final String HTML_CODE_ATTRIBUTE_WIDTH = "w-width";
    private final String HTML_CODE_ATTRIBUTE_HEIGHT = "w-height";
    private final String HTML_CODE_ATTRIBUTE_ORIENTATION = "w-layout";
    private final String HTML_CODE_ATTRIBUTE_THEME = "theme";
    private final String HTML_CODE_ATTRIBUTE_PROPORTION = "w-proportion";

    //WebElements
    @FindBy(xpath = ".//input[@id='w-tm-api-key']")
    private WebElementFacade apiKeyTextField;

    @FindBy(xpath = ".//input[@id='w-id']")
    private WebElementFacade eventIDTextField;

    @FindBy(xpath = ".//a[contains(., 'Technical')]")
    private WebElementFacade technicalTab;

    @FindBy(xpath = ".//a[contains(., 'Visual')]")
    private WebElementFacade visualTab;

    @FindBy(xpath = ".//div[@class='tab-buttons']/label[@for='w-theme-simple']")
    private WebElementFacade posterTab;

    @FindBy(xpath = ".//div[@class='tab-buttons']/label[@for='w-theme-fullwidth']")
    private WebElementFacade fullWidthTab;

    @FindBy(xpath = ".//div[@class='row']/div/label[@for='w-fixed-300x600']")
    private WebElementFacade layout300x600Tab;

    @FindBy(xpath = ".//div[@class='row']/div/label[@for='w-fixed-300x250']")
    private WebElementFacade layout300x250Tab;

    @FindBy(xpath = "//input[@id='w-layout-vertical']/following-sibling::label")
    private WebElementFacade layoutVerticalTab;

    @FindBy(xpath = "//input[@id='w-layout-horizontal']/following-sibling::label")
    private WebElementFacade layoutHorisontalTab;

    @FindBy(xpath = ".//div[@class='row']/div/label[@for='w-custom']")
    private WebElementFacade layoutCustomTab;

    @FindBy(xpath = "//div[contains(@class,'visible-lg')]//button[text()='GET CODE']")
    private WebElementFacade getCodeButton;

    @FindBy(xpath = "//div[contains(@class,'visible-lg')]//button[text()='RESET']")
    private WebElementFacade resetButton;

    @FindBy(xpath = "//span[contains(@class,'event-name')]")
    private WebElementFacade posterWindow;

    @FindBy(xpath = "//a[text()='Get event ID']")
    private WebElementFacade getEventIdLink;

    @FindBy(id= "keyword")
    private WebElementFacade keywordField;

    @FindBy(xpath = "//ul[@id='js_get_eventId_list']/li[1]//button")
    private WebElementFacade setThisIdBtn;

    @FindBy(xpath = "//a[text()='Get your own']")
    private WebElementFacade getYourOwnLink;

    @FindBy(xpath = "//label[text()='Layout']/following-sibling::div[contains(@class,'js-fixed-size-buttons')]//input[@checked]/following-sibling::label")
    private WebElementFacade activeLayoutResolution;

    @FindBy(xpath = "//div[contains(@class,'event-message-visible')]/div[@class='event-message__content']")
    private WebElementFacade eventMessage;


    //Constructors
    public CountdownWidgetImpl(final PageObject page, final ElementLocator locator, final WebElementFacade webElement,
                               final long timeoutInMilliseconds) {
        super(page, locator, webElement, timeoutInMilliseconds);
    }

    public CountdownWidgetImpl(final PageObject page, final ElementLocator locator,
                               final long timeoutInMilliseconds) {
        super(page, locator, timeoutInMilliseconds);
    }

    //Countdown Widget Interface Implementation
    @Override
    public WebElementFacade getAPIKeyTextField() {
        return apiKeyTextField;
    }

    @Override
    public WebElementFacade getEventIDTextField() {
        return eventIDTextField;
    }

    @Override
    public WebElementFacade getTechnicalTab() {
        return technicalTab;
    }

    @Override
    public WebElementFacade getVisualTab() {
        return visualTab;
    }

    @Override
    public WebElementFacade getPosterTab() {
        return posterTab;
    }

    @Override
    public WebElementFacade getFullWidthTab() {
        return fullWidthTab;
    }

    @Override
    public WebElementFacade getLayout300x600Tab() {
        return layout300x600Tab;
    }

    @Override
    public WebElementFacade getLayout300x250Tab() {
        return layout300x250Tab;
    }

    @Override
    public WebElementFacade getLayoutVerticalTab() {
        return layoutVerticalTab;
    }

    @Override
    public WebElementFacade getLayoutHorisontalTab() {
        return layoutHorisontalTab;
    }

    @Override
    public WebElementFacade getLayoutCustomTab() {
        return layoutCustomTab;
    }

    @Override
    public WebElementFacade getGetCodeButton() {
        return getCodeButton;
    }

    @Override
    public WebElementFacade getResetButton() {
        return resetButton;
    }

    @Override
    public WebElementFacade getPosterWindow() {
        return posterWindow;
    }

    @Override
    public WebElementFacade getEventIdLink() {
        return getEventIdLink;
    }

    @Override
    public WebElementFacade getKeywordField() {
        return keywordField;
    }

    @Override
    public WebElementFacade getSetThisId() {
        return setThisIdBtn;
    }

    @Override
    public WebElementFacade getGetYourOwn() {
        return getYourOwnLink;
    }

    @Override
    public WebElementFacade getActiveLayoutResolution() {
        return activeLayoutResolution;
    }

    @Override
    public WebElementFacade getEventMessage() {
        return eventMessage;
    }

    @Override
    public String getEmbeddedApiKey() {
        return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_APIKEY);
    }

    @Override
    public String getEmbeddedEventId() {

        return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_EVENTID);
    }

    @Override
    public String getEmbeddedTheme() {
        if(getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_THEME).contains("simple")) {
            return "poster";
        }
        else if (getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_THEME).equalsIgnoreCase("fullwidth")) {
            return "full-width";
        } else return null;
    }

    @Override
    public String getEmbeddedResolution() {
        if(getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_PROPORTION).equalsIgnoreCase("custom")){
            return "custom";
        } else if (getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_HEIGHT).equalsIgnoreCase("250") &&
                   getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_WIDTH).equalsIgnoreCase("300")){
            return "300x250";
        } if (getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_HEIGHT).equalsIgnoreCase("300") &&
              getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_WIDTH).equalsIgnoreCase("600")){
            return "300x600";
        } else return null;
    }

    @Override
    public String getEmbeddedOrientation() {
        return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_ORIENTATION);
    }
}
