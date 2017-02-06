package bla.tm.widgets;

import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.support.pagefactory.ElementLocator;


public class MapWidgetImpl extends AnsestorWidgetImpl implements MapWidget {

    @FindBy(xpath = "//span[text()='use Geoposition']")
    private WebElementFacade useGeoposition;

    public MapWidgetImpl(PageObject page, ElementLocator locator, WebElementFacade webElement, long timeoutInMilliseconds) {
        super(page, locator, webElement, timeoutInMilliseconds);
    }

    public MapWidgetImpl(PageObject page, ElementLocator locator, long timeoutInMilliseconds) {
        super(page, locator, timeoutInMilliseconds);
    }

    @Override
    public String getCityFieldValue() {
        return cityField.getValue();
    }

}
