package com.tkmdpa.taf.pages.site.products_and_docs;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

import java.util.HashMap;
import java.util.Map;

@DefaultUrl("/products-and-docs/tutorials/widgets/")
public class PD_Tutorials_WidgetsPage extends AncestorPage {

    public static final String pageHeader = "WIDGETS TUTORIALS";

    @FindBy(xpath = "//div[@class='announcement']/a[text()='Learn more']")
    private WebElementFacade addingEventDiscoveryWidgetButton;

    @FindBy(xpath = "//div[@class='announcement']/h3/a[text()='Adding Event Discovery widget to a website']")
    private WebElementFacade addingEventDiscoveryWidgetHeaderLink;

    @FindBy(xpath = "//div[@class='tutorials-article']/a/img[@alt='Adding Event Discovery widget to a website']")
    private WebElementFacade addingEventDiscoveryWidgetImageLink;

    public Map<String, WebElementFacade> getClickAbleElements() {
        Map<String, WebElementFacade> elements = new HashMap<>();
        elements.put("Adding Event Discovery Widget Button", addingEventDiscoveryWidgetButton);
        elements.put("Adding Event Discovery Widget Header Link", addingEventDiscoveryWidgetHeaderLink);
        elements.put("Adding Event Discovery Widget Image Link", addingEventDiscoveryWidgetImageLink);
        return elements;
    }

}
