package bla.tm.widgets;


import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.support.pagefactory.ElementLocator;

public class EventDiscoveryWidgetImpl extends AnsestorWidgetImpl implements EventDiscoveryWidget{

    @FindBy(xpath = "//input[@id='w-tm-api-key']")
    private WebElementFacade apiKeyTextField;

    public EventDiscoveryWidgetImpl(final PageObject page, final ElementLocator locator, final WebElementFacade webElement,
                                    final long timeoutInMilliseconds) {
        super(page, locator, webElement, timeoutInMilliseconds);
    }

    public EventDiscoveryWidgetImpl(final PageObject page, final ElementLocator locator,
                                    final long timeoutInMilliseconds) {
        super(page, locator, timeoutInMilliseconds);
    }

    @Override
    public WebElementFacade getAPIKeyTextField() {
        return apiKeyTextField;
    }

}
