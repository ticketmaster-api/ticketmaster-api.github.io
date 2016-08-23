package bla.tm.widgets;


import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.support.pagefactory.ElementLocator;

public class CountdownWidgetImpl extends AnsestorWidgetImpl implements CountdownWidget{

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

    @FindBy(xpath = ".//div[@class='row']/div/input[@id='w-fixed-300x600']")
    private WebElementFacade layout300x600Tab;

    @FindBy(xpath = ".//div[@class='row']/div/input[@id='w-fixed-300x250']")
    private WebElementFacade layout300x250Tab;

    @FindBy(xpath = ".//div[@class='row']/div/input[@id='w-custom']")
    private WebElementFacade layoutVerticalTab;

    @FindBy(xpath = ".//div[@class='row']/div/input[@id=w-layout-vertical']")
    private WebElementFacade layoutHorisontalTab;

    @FindBy(xpath = ".//div[@class='row']/div/input[@id='w-layout-horizontal']")
    private WebElementFacade layoutCustomTab;

    @FindBy(xpath = ".//div[@class='col-md-3 col-sm-3']/button[contains(.,'GET CODE')]")
    private WebElementFacade getCodeButton;

    @FindBy(xpath = ".//div[@class='col-md-3 col-sm-3']/button[contains(.,'RESET')]")
    private WebElementFacade resetButton;

    @FindBy(xpath = ".//div[@w-type='countdown]")
    private WebElementFacade posterWindow;

    public CountdownWidgetImpl(final PageObject page, final ElementLocator locator, final WebElementFacade webElement,
                               final long timeoutInMilliseconds) {
        super(page, locator, webElement, timeoutInMilliseconds);
    }

    public CountdownWidgetImpl(final PageObject page, final ElementLocator locator,
                               final long timeoutInMilliseconds) {
        super(page, locator, timeoutInMilliseconds);
    }

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

}
