package com.tkmdpa.taf.pages.site.products_and_docs;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

import java.util.HashMap;
import java.util.Map;

@DefaultUrl("/products-and-docs/tutorials/events-search/")
public class PD_Tutorials_EventSearchPage extends AncestorPage {

    public final String pageHeader = "EVENTS SEARCH TUTORIALS";

    @FindBy(xpath = "//div[@class='announcement']/a[@href='/products-and-docs/tutorials/events-search/search_events_in_location.html' and text()='Learn more']")
    private WebElementFacade locateEventOnMapWidgetButton;

    @FindBy(xpath = "//div[@class='announcement']/h3/a[text()='Tutorial - Locate events on a map']")
    private WebElementFacade locateEventOnMapWidgetHeaderLink;

    @FindBy(xpath = "//div[@class='tutorials-article']/a/img[@alt='Tutorial - Locate events on a map']")
    private WebElementFacade locateEventOnMapWidgetImageLink;

    @FindBy(xpath = "//div[@class='announcement']/a[@href='/products-and-docs/tutorials/events-search/search_events_with_discovery_api.html' and text()='Learn more']")
    private WebElementFacade getStartedWithDiscoveryAPIWidgetButton;

    @FindBy(xpath = "//div[@class='announcement']/h3/a[text()='Get started with The Discovery API']")
    private WebElementFacade getStartedWithDiscoveryAPIWidgetHeaderLink;

    @FindBy(xpath = "//div[@class='tutorials-article']/a/img[@alt='Get started with The Discovery API']")
    private WebElementFacade getStartedWithDiscoveryAPIWidgetImageLink;

    public Map<String, WebElementFacade> getClickableElements() {
        Map<String, WebElementFacade> elements = new HashMap<String, WebElementFacade>();
        elements.put("Locate Event On Map Widget Button", locateEventOnMapWidgetButton);
        elements.put("Locate Event On Map Widget Header Link", locateEventOnMapWidgetHeaderLink);
        elements.put("Locate Event On Map Widget Image Link", locateEventOnMapWidgetImageLink);
        elements.put("Get Started WIth Discovery API Widget Button", getStartedWithDiscoveryAPIWidgetButton);
        elements.put("Get Started WIth Discovery API Widget Header Link", getStartedWithDiscoveryAPIWidgetHeaderLink);
        elements.put("Get Started WIth Discovery API Widget Image Link", getStartedWithDiscoveryAPIWidgetImageLink);
        return elements;
    }
}
