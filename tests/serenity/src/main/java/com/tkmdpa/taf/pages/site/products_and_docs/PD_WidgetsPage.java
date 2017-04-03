package com.tkmdpa.taf.pages.site.products_and_docs;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@DefaultUrl("/products-and-docs/widgets/")
public class PD_WidgetsPage extends AncestorPage {

    public final String pageHeader = "WIDGETS";

    @FindBy(xpath = "//a[@href='/products-and-docs/widgets/checkout/' and text()='CONFIGURE NOW']")
    private WebElementFacade checkoutWidgetButton;

    @FindBy(xpath = "//a[@href='/products-and-docs/widgets/event-discovery/' and text()='CONFIGURE NOW']")
    private WebElementFacade eventDiscoveryWidgetButton;

    @FindBy(xpath = "//a[@href='/products-and-docs/widgets/countdown/' and text()='CONFIGURE NOW']")
    private WebElementFacade countdownWidgetButton;

    @FindBy(xpath = "//a[@href='/products-and-docs/widgets/calendar/' and text()='CONFIGURE NOW']")
    private WebElementFacade calendarWidgetButton;

    @FindBy(xpath = "//a[@href='/products-and-docs/widgets/wordpress/ticketmaster.zip' and text()='DOWNLOAD NOW']")
    private WebElementFacade wordPressWidgetDownloadButton;

    @FindBy(xpath = "//a[@href='/products-and-docs/widgets/wordpress/' and text()='LEARN MORE']")
    private WebElementFacade wordPressWidgetLearnButton;

    @FindBy(xpath = "//a[@class='button button-blue' and text()='LEARN MORE!']")
    private WebElementFacade directPaymentButton;

    public Map<String, WebElementFacade> getClickableElements() {
        Map<String, WebElementFacade> elements = new HashMap<String, WebElementFacade>();
        elements.put("Checkout Widget Button", checkoutWidgetButton);
        elements.put("Discovery Widget Button", eventDiscoveryWidgetButton);
        elements.put("Countdown Widget Button", countdownWidgetButton);
        elements.put("Calendar Widget Button", calendarWidgetButton);
        elements.put("WordPress Widget Download Button", wordPressWidgetDownloadButton);
        elements.put("WordPress Widget Learn Button", wordPressWidgetLearnButton);
        elements.put("DirectPaymentButton", directPaymentButton);
        return elements;
    }

    public void switchToNewTab() {
        ArrayList<String> newTab = new ArrayList<String>(this.getDriver().getWindowHandles());
        this.getDriver().switchTo().window(newTab.get(1));
    }
}
