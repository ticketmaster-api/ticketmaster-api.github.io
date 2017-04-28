package com.tkmdpa.taf.widgets;

import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.Keys;
import org.openqa.selenium.support.pagefactory.ElementLocator;

import static com.tkmdpa.taf.staticmethods.StaticMethods.getEmbeddedCodeAttributeValue;

public class CountdownWidgetImpl extends AncestorWidgetImpl implements CountdownWidget{
    //Constants
    private final String HTML_CODE_ATTRIBUTE_APIKEY = "w-tmapikey";
    private final String HTML_CODE_ATTRIBUTE_EVENTID = "id";
    private final String HTML_CODE_ATTRIBUTE_WIDTH = "w-width";
    private final String HTML_CODE_ATTRIBUTE_HEIGHT = "w-height";
    private final String HTML_CODE_ATTRIBUTE_ORIENTATION = "w-layout";
    private final String HTML_CODE_ATTRIBUTE_THEME = "theme";
    private final String HTML_CODE_ATTRIBUTE_PROPORTION = "w-proportion";

    @FindBy(xpath = ".//input[@id='w-id']")
    private WebElementFacade eventIDTextField;

    @FindBy(xpath = ".//a[contains(., 'Technical')]")
    private WebElementFacade technicalTab;

    @FindBy(xpath = ".//a[contains(., 'Visual')]")
    private WebElementFacade visualTab;

    @FindBy(xpath = ".//div[@class='tab-buttons']/label[@for='w-theme-simple']")
    private WebElementFacade posterTab;

    @FindBy(xpath = "//label[@for='w-layout-fullwidth']")
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

    @FindBy(xpath = "//span[contains(@class,'event-name')]")
    private WebElementFacade posterWindow;

    @FindBy(xpath = "//a[contains(@id,'get-event-by-Id')]")
    private WebElementFacade getEventIdLink;

    @FindBy(xpath = "//input[@id='keyword']")
    private WebElementFacade keywordField;

    @FindBy(xpath = "//ul[@id='js_lazy-sel_list']/li[1]//button")
    private WebElementFacade setThisIdBtn;

    @FindBy(xpath = "//a[text()='Get your own']")
    private WebElementFacade getYourOwnLink;

    @FindBy(xpath = "//label[text()='Layout']/following-sibling::div[contains(@class,'js-fixed-size-buttons')]//input[@checked]/following-sibling::label")
    private WebElementFacade activeLayoutResolution;

    @FindBy(xpath = "//div[contains(@class,'event-message-visible')]/div[@class='event-message__content']")
    private WebElementFacade eventMessage;

    @FindBy(xpath = "//label[@for='w-layout-fullwidth']")
    private WebElementFacade layoutFullwidthTab;

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
    public void clickOnGetButton() {
        getCodeButton.click();
    }

    @Override
    public void submitForm() {
        eventIDTextField.sendKeys(Keys.ENTER);
    }

    @Override
    public void setApiKey(String apiKey) {
        apiKeyTextField.clear();
        apiKeyTextField.sendKeys(apiKey, Keys.ENTER);
    }

    @Override
    public void setEventId(String eventId) {
        eventIDTextField.clear();
        eventIDTextField.sendKeys(eventId, Keys.ENTER);
    }

    @Override
    public String getEventIDTextFieldValue() {
        return eventIDTextField.getValue();
    }

    @Override
    public void clickOnGetEventId() {
        getEventIdLink.click();
    }

    @Override
    public void enterKeyword(String keyword) {
        keywordField.sendKeys(keyword, Keys.ENTER);
    }

    @Override
    public void clickSetThisIdOnFirstEvent() {
        setThisIdBtn.click();
    }

    @Override
    public boolean isPosterContainsText(String text) {
        return posterWindow.getText().contains(text);
    }

    @Override
    public void clickOnGetYourOwnLink() {
        getYourOwnLink.click();
    }

    @Override
    public void switchToTab(String tab) {
        switch (tab){
            case "visual": {
                visualTab.click();
            }
            break;
            case "technical": {
                technicalTab.click();
            }
            break;
            default: throw new IllegalArgumentException(String.format("The tab name: '%s' is illegal.", tab));
        }
    }

    @Override
    public void setFullWidthMode() {
        fullWidthTab.click();
    }

    @Override
    public void setPosterTheme() {
        posterTab.click();
    }

    @Override
    public void setLayoutResolution(String resolution) {
        getLayoutResolution(resolution).click();
    }

    public WebElementFacade getLayoutResolution(String resolution) {
        WebElementFacade resolutionRadioButton;
        switch(resolution){
            case "300x250": {
                resolutionRadioButton = layout300x250Tab;
            }
            break;
            case "300x600": {
                resolutionRadioButton = layout300x600Tab;
            }
            break;
            case "custom": {
                resolutionRadioButton = layoutCustomTab;
            }
            break;
            case "fullwidth": {
                resolutionRadioButton = layoutFullwidthTab;
            }
            break;
            default: throw new IllegalArgumentException(String.format("The layout resolution: '%s' is illegal.", resolution));
        }
        return resolutionRadioButton;
    }

    @Override
    public void setLayoutOrientation(String orientation) {
        getLayoutOrientation(orientation).click();
    }

    public WebElementFacade getLayoutOrientation(String orientation) {
        WebElementFacade orientationRadioButton;
        switch (orientation){
            case "horizontal": {
                orientationRadioButton = layoutHorisontalTab;
            }
            break;
            case "vertical": {
                orientationRadioButton = layoutVerticalTab;
            }
            break;
            default: throw new IllegalArgumentException(String.format("Illegal layout orientation: '%s'", orientation));
        }
        return orientationRadioButton;
    }

    @Override
    public boolean isEventMessageContains(String text) {

        return eventMessage.getText().contains(text);
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
        if(getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_PROPORTION).contains("custom")) {
            return "poster";
        }
        else if (getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_PROPORTION).equalsIgnoreCase("fullwidth")) {
            return "fullwidth";
        } else return null;
    }

    @Override
    public String getEmbeddedResolution() {
        if(getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_PROPORTION).equalsIgnoreCase("custom")){
            return "custom";
        } else if (getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_HEIGHT).equalsIgnoreCase("250") &&
                   getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_WIDTH).equalsIgnoreCase("300")){
            return "300x250";
        } if (getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_HEIGHT).equalsIgnoreCase("600") &&
              getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_WIDTH).equalsIgnoreCase("300")){
            return "300x600";
        }   if(getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_PROPORTION).equalsIgnoreCase("fullwidth")){
            return "fullwidth";
        } else return null;
    }

    @Override
    public String getEmbeddedOrientation() {
        return getEmbeddedCodeAttributeValue(getEmbeddedHtmlCode().getText(), HTML_CODE_ATTRIBUTE_ORIENTATION);
    }

    public WebElementFacade getEventId(){
        return getEventIdLink;
    }

}
