package bla.tm.pages.site.products_and_docs;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.thucydides.core.annotations.DefaultUrl;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.WebDriver;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static java.util.Optional.ofNullable;

@DefaultUrl("/products-and-docs/widgets/")
public class PD_WidgetsPage extends AncestorPage {

    @FindBy(xpath = "//div[@class='widget_box widget_box__discovery']/p/a[@class='button button-blue' and text()='CONFIGURE NOW']")
    private WebElement eventDiscoveryWidgetButton;

    @FindBy(xpath = "//div[@class='widget_box widget_box__countdown']/p/a[@class='button button-blue' and text()='CONFIGURE NOW']")
    private WebElement countdownWidgetButton;

    @FindBy(xpath = "//a[@class='button button-blue' and text()='LEARN MORE!']")
    private WebElement directPaymentButton;

    private Map<String, WebElement> getClickableElements() {
        Map<String, WebElement> elements = new HashMap<String, WebElement>();
        elements.put("Discovery Widget Button", eventDiscoveryWidgetButton);
        elements.put("Countdown Widget Button", countdownWidgetButton);
        elements.put("DirectPaymentButton", directPaymentButton);
        return elements;
    }

    public WebElement findWebElementByKey(String key) {
        return ofNullable(getClickableElements().get(key)).orElseThrow(
                () -> new RuntimeException("There is no such element on the page"));
    }

    public void switchToNewTab() {
        ArrayList<String> newTab = new ArrayList<String>(this.getDriver().getWindowHandles());
        this.getDriver().switchTo().window(newTab.get(1));
    }

    public void closeAllTabs() {
        this.getDriver().close();
    }
}
