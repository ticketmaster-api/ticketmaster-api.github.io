package bla.tm.pages.site.products_and_docs;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@DefaultUrl("/products-and-docs/widgets/")
public class PD_WidgetsPage extends AncestorPage {

    @FindBy(xpath = "//div[@class='widget_box widget_box__discovery']/p/a[@class='button button-blue' and text()='CONFIGURE NOW']")
    private WebElementFacade eventDiscoveryWidgetButton;

    @FindBy(xpath = "//div[@class='widget_box widget_box__countdown']/p/a[@class='button button-blue' and text()='CONFIGURE NOW']")
    private WebElementFacade countdownWidgetButton;

    @FindBy(xpath = "//a[@class='button button-blue' and text()='LEARN MORE!']")
    private WebElementFacade directPaymentButton;

    public Map<String, WebElementFacade> getClickableElements() {
        Map<String, WebElementFacade> elements = new HashMap<String, WebElementFacade>();
        elements.put("Discovery Widget Button", eventDiscoveryWidgetButton);
        elements.put("Countdown Widget Button", countdownWidgetButton);
        elements.put("DirectPaymentButton", directPaymentButton);
        return elements;
    }

    public void switchToNewTab() {
        ArrayList<String> newTab = new ArrayList<String>(this.getDriver().getWindowHandles());
        this.getDriver().switchTo().window(newTab.get(1));
    }

    public void closeAllTabs() {
        this.getDriver().close();
    }
}
