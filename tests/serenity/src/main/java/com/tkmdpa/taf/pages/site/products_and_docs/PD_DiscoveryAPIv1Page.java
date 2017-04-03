package com.tkmdpa.taf.pages.site.products_and_docs;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

import java.util.HashMap;
import java.util.Map;

@DefaultUrl("/products-and-docs/apis/discovery-api/v1/")
public class PD_DiscoveryAPIv1Page extends AncestorPage {

    public final String pageHeader = "DISCOVERY API";

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Overview')]]/p[contains(.,'Example:')]/code")
    private WebElementFacade apikey01PlaceHolder;

//    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Overview')]]/p[./strong[contains(.,'Get a list of all events in the United States')]]/code")
//    private WebElementFacade apikey02PlaceHolder;
//
//    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Overview')]]/p[./strong[contains(.,'Search for events sourced by Universe')]]/code")
//    private WebElementFacade apikey03PlaceHolder;
//
//    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Overview')]]/p[./strong[contains(.,'Search for music events in the Los Angeles')]]/code")
//    private WebElementFacade apikey04PlaceHolder;
//
//    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Overview')]]/p[./strong[contains(.,'Get a list of all events for Adele in Canada')]]/code")
//    private WebElementFacade apikey05PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Search Events')]]/div/figure/pre/code[@class='language-js']/span[@class='s2' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey06PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Search Events')]]/div/figure/pre/code[@class='language-bash']/span[@class='s1' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey07PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-http']/span[@class='nn' and contains(.,'/discovery/v1/events.json')]")
    private WebElementFacade apikey08PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Get Event Details')]]/div/figure/pre/code[@class='language-js']/span[@class='s2' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey09PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Get Event Details')]]/div/figure/pre/code[@class='language-bash']/span[@class='s1' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey10PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-http']/span[@class='nn' and contains(.,'/discovery/v1/events/15004F83A3383A3E.json')]")
    private WebElementFacade apikey11PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Search Event Images')]]/div/figure/pre/code[@class='language-js']/span[@class='s2' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey12PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Search Event Images')]]/div/figure/pre/code[@class='language-bash']/span[@class='s1' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey13PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-http']/span[@class='nn' and contains(.,'/discovery/v1/events/0B004F0401BD55E5/images.json')]")
    private WebElementFacade apikey14PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Search Attractions')]]/div/figure/pre/code[@class='language-js']/span[@class='s2' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey15PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Search Attractions')]]/div/figure/pre/code[@class='language-bash']/span[@class='s1' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey16PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-http']/span[@class='nn' and contains(.,'/discovery/v1/attractions.json')]")
    private WebElementFacade apikey17PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Get Attraction Details')]]/div/figure/pre/code[@class='language-js']/span[@class='s2' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey19PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Get Attraction Details')]]/div/figure/pre/code[@class='language-bash']/span[@class='s1' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey20PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-http']/span[@class='nn' and contains(.,'/discovery/v1/attractions/768011.json')]")
    private WebElementFacade apikey21PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Search Categories')]]/div/figure/pre/code[@class='language-js']/span[@class='s2' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey22PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Search Categories')]]/div/figure/pre/code[@class='language-bash']/span[@class='s1' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey23PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-http']/span[@class='nn' and contains(.,'/discovery/v1/categories.json')]")
    private WebElementFacade apikey24PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Get Category Details')]]/div/figure/pre/code[@class='language-js']/span[@class='s2' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey25PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Get Category Details')]]/div/figure/pre/code[@class='language-bash']/span[@class='s1' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey26PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-http']/span[@class='nn' and contains(.,'/discovery/v1/categories/203.json')]")
    private WebElementFacade apikey27PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Search Venues')]]/div/figure/pre/code[@class='language-js']/span[@class='s2' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey28PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Search Venues')]]/div/figure/pre/code[@class='language-bash']/span[@class='s1' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey29PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-http']/span[@class='nn' and contains(.,'/discovery/v1/venues.json')]")
    private WebElementFacade apikey30PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Get Venue Details')]]/div/figure/pre/code[@class='language-js']/span[@class='s2' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey31PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Get Venue Details')]]/div/figure/pre/code[@class='language-bash']/span[@class='s1' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey32PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-http']/span[@class='nn' and contains(.,'/discovery/v1/venues/90150.json')]")
    private WebElementFacade apikey33PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Search Events')]]/div/a")
    private WebElementFacade codeSection;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Search Events')]]/div/blockquote/p/a[@href='#curl']")
    private WebElementFacade switchToCUrlCode;

    public WebElementFacade getSwitchToCUrlCode() {
        return switchToCUrlCode;
    }

    public WebElementFacade getCodeSection() {
        return codeSection;
    }

    public Map<String,WebElementFacade> getAPIKeyPlaceHoldersList() {
        Map<String,WebElementFacade> elements = new HashMap<>();
        elements.put("apikey01PlaceHolder", apikey01PlaceHolder);
//        elements.put("apikey02PlaceHolder", apikey02PlaceHolder);
//        elements.put("apikey03PlaceHolder", apikey03PlaceHolder);
//        elements.put("apikey04PlaceHolder", apikey04PlaceHolder);
//        elements.put("apikey05PlaceHolder", apikey05PlaceHolder);
        elements.put("apikey06PlaceHolder", apikey06PlaceHolder);
        elements.put("apikey08PlaceHolder", apikey08PlaceHolder);
        elements.put("apikey09PlaceHolder", apikey09PlaceHolder);
        elements.put("apikey11PlaceHolder", apikey11PlaceHolder);
        elements.put("apikey12PlaceHolder", apikey12PlaceHolder);
        elements.put("apikey14PlaceHolder", apikey14PlaceHolder);
        elements.put("apikey15PlaceHolder", apikey15PlaceHolder);
        elements.put("apikey17PlaceHolder", apikey17PlaceHolder);
        elements.put("apikey19PlaceHolder", apikey19PlaceHolder);
        elements.put("apikey21PlaceHolder", apikey21PlaceHolder);
        elements.put("apikey22PlaceHolder", apikey22PlaceHolder);
        elements.put("apikey24PlaceHolder", apikey24PlaceHolder);
        elements.put("apikey25PlaceHolder", apikey25PlaceHolder);
        elements.put("apikey27PlaceHolder", apikey27PlaceHolder);
        elements.put("apikey28PlaceHolder", apikey28PlaceHolder);
        elements.put("apikey30PlaceHolder", apikey30PlaceHolder);
        elements.put("apikey31PlaceHolder", apikey31PlaceHolder);
        elements.put("apikey33PlaceHolder", apikey33PlaceHolder);
        return elements;
    }

    public Map<String,WebElementFacade> getAPIKeyHiddenPlaceHoldersList() {
        Map<String,WebElementFacade> elements = new HashMap<>();
        elements.put("apikey07PlaceHolder", apikey07PlaceHolder);
        elements.put("apikey10PlaceHolder", apikey10PlaceHolder);
        elements.put("apikey13PlaceHolder", apikey13PlaceHolder);
        elements.put("apikey16PlaceHolder", apikey16PlaceHolder);
        elements.put("apikey20PlaceHolder", apikey20PlaceHolder);
        elements.put("apikey23PlaceHolder", apikey23PlaceHolder);
        elements.put("apikey26PlaceHolder", apikey26PlaceHolder);
        elements.put("apikey29PlaceHolder", apikey29PlaceHolder);
        elements.put("apikey32PlaceHolder", apikey32PlaceHolder);
        return elements;
    }
}