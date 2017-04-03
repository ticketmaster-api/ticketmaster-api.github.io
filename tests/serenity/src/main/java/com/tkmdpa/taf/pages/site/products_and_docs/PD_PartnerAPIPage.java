package com.tkmdpa.taf.pages.site.products_and_docs;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

import java.util.HashMap;
import java.util.Map;

@DefaultUrl("/products-and-docs/apis/partner/")
public class PD_PartnerAPIPage extends AncestorPage {

    public final String pageHeader = "PARTNER API";

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Overview')]]/p[contains(.,'Example:')]/code")
    private WebElementFacade apikey01PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Event Details  [GET]')]]/p[contains(.,'/partners/v1/events/{event_id}?apikey=')]")
    private WebElementFacade apikey02PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-bash' and contains(.,'https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB?apikey')]")
    private WebElementFacade apikey03PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-bash' and contains(.,'https://app.ticketmaster.com/partners/v1/events/53-45243/NY1/id')]")
    private WebElementFacade apikey04PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-bash' and contains(.,'https://app.ticketmaster.com/partners/v1/events?apikey=')]")
    private WebElementFacade apikey05PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-bash' and contains(.,'https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/availability')]")
    private WebElementFacade apikey06PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Captcha [GET]')]]/p[contains(.,'/partners/v1/captcha?apikey')]")
    private WebElementFacade apikey07PlaceHolder;

    @FindBy(xpath = "//h2[contains(text(),'Captcha')]/following-sibling::div[@class='reqres-wrapper'][.//a[contains(text(),'html')]]//code[contains(.,'/partners/v1/captcha?apikey=')]")
    private WebElementFacade apikey08PlaceHolder;

    @FindBy(xpath = "//h2[contains(text(),'Captcha')]/following-sibling::div[@class='reqres-wrapper'][.//a[contains(text(),'json')]]//code[contains(.,'/partners/v1/captcha?apikey=')]")
    private WebElementFacade apikey081PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Reserve tickets and create a Cart [POST]')]]/p[contains(.,'/partners/v1/events/{event_id}/cart?apikey=')]")
    private WebElementFacade apikey09PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-bash' and contains(.,'https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/cart?apikey=')]")
    private WebElementFacade apikey10PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Shipping Options [GET]')]]/p[contains(.,'/partners/v1/events/{event_id}/cart/shipping?apikey')]")
    private WebElementFacade apikey11PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-bash' and contains(.,'https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/cart/shipping?apikey=')]")
    private WebElementFacade apikey12PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Shipping Options [PUT]')]]/p[contains(.,'/partners/v1/events/{event_id}/cart/shipping?apikey')]")
    private WebElementFacade apikey13PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-js']/span[contains(.,'//app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/cart/shipping?apikey')]")
    private WebElementFacade apikey14PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Encryption Certificate [GET]')]]/p[contains(.,'/partners/v1/certificate?apikey=')]")
    private WebElementFacade apikey15PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-bash' and contains(.,'https://app.ticketmaster.com/partners/v1/certificate?apikey=')]")
    private WebElementFacade apikey16PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Add Billing Information [PUT]')]]/p[contains(.,'/partners/v1/events/{event_id}/cart/payment?apikey=')]")
    private WebElementFacade apikey17PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-bash' and contains(.,'https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/cart/payment?apikey') and contains(.,'70561111')]")
    private WebElementFacade apikey18PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-bash' and contains(.,'https://app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/cart/payment?apikey') and contains(.,'john.doe@ticketmaster.com')]")
    private WebElementFacade apikey20PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Commit Cart [PUT]')]]/p[contains(.,'/partners/v1/events/{event_id}/cart?apikey')]")
    private WebElementFacade apikey21PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Delete Cart [DELETE]')]]/p[contains(.,'/partners/v1/events/0B004ED9FC825ACB/cart?apikey=')]")
    private WebElementFacade apikey23PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-js' and not(contains(.,'Your reference number'))]/span[@class='c1' and contains(.,'//app.ticketmaster.com/partners/v1/events/0B004ED9FC825ACB/cart?apikey=')]")
    private WebElementFacade apikey24PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Polling [GET]')]]/figure/pre/code/span[contains(.,'https://app.ticketmaster.com/partners/v1/polling/cart/tickets/PUT/00000001080E06000000006BB7C4A8C0?apikey=')]")
    private WebElementFacade apikey25PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Polling [GET]')]]/p[contains(.,'/partners/v1/polling/…/?apikey=')]")
    private WebElementFacade apikey26PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-bash' and contains(.,'https://app.ticketmaster.com/partners/v1/polling/cart/tickets/PUT/00000001080E06000000006BB7C4A8C0?apikey=')]")
    private WebElementFacade apikey27PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Add Member Payment Information to Ticketmaster Account [POST]')]]/p[contains(.,'/partners/v1/member/billing?apikey=')]")
    private WebElementFacade apikey28PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-bash' and contains(.,'https://app.ticketmaster.com/partners/v1/member/billing?apikey=') and contains(., 'Los Angeles')]")
    private WebElementFacade apikey29PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'View Member Payment Information [GET]')]]/p[contains(.,'/partners/v1/member/billing?apikey=')]")
    private WebElementFacade apikey30PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-bash' and contains(.,'https://app.ticketmaster.com/partners/v1/member/billing?apikey=') and not(contains(., 'Los Angeles'))]")
    private WebElementFacade apikey31PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Order management [GET]')]]/p[contains(.,'/partners/v1/orders?order_token={order_token}?apikey=')]")
    private WebElementFacade apikey32PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-bash' and contains(.,'https://app.ticketmaster.com/partners/v1/orders?order_token=28a67e13-7233-45a5lsGPQy0MZ3J7ZOQRjcW52NHhG083D?apikey=')]")
    private WebElementFacade apikey33PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Unredeemed orders [GET]')]]/p[contains(.,'/partners/v1/orders/unredeemed?apikey=')]")
    private WebElementFacade apikey34PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-bash' and contains(.,'https://app.ticketmaster.com/partners/v1/orders/unredeemed?apikey=')]")
    private WebElementFacade apikey35PlaceHolder;

    public Map<String,WebElementFacade> getAPIKeyPlaceHoldersList() {
        Map<String,WebElementFacade> elements = new HashMap<>();
//        elements.put("apikey01PlaceHolder", apikey01PlaceHolder);
        elements.put("apikey02PlaceHolder", apikey02PlaceHolder);
//        elements.put("apikey03PlaceHolder", apikey03PlaceHolder);
//        elements.put("apikey04PlaceHolder", apikey04PlaceHolder);
//        elements.put("apikey05PlaceHolder", apikey05PlaceHolder);
//        elements.put("apikey06PlaceHolder", apikey06PlaceHolder);
        elements.put("apikey07PlaceHolder", apikey07PlaceHolder);
        elements.put("apikey08PlaceHolder", apikey08PlaceHolder);
        elements.put("apikey081PlaceHolder", apikey08PlaceHolder);
        elements.put("apikey09PlaceHolder", apikey09PlaceHolder);
//        elements.put("apikey10PlaceHolder", apikey10PlaceHolder);
        elements.put("apikey11PlaceHolder", apikey11PlaceHolder);
//        elements.put("apikey12PlaceHolder", apikey12PlaceHolder);
        elements.put("apikey13PlaceHolder", apikey13PlaceHolder);
//        elements.put("apikey14PlaceHolder", apikey14PlaceHolder);
        elements.put("apikey15PlaceHolder", apikey15PlaceHolder);
//        elements.put("apikey16PlaceHolder", apikey16PlaceHolder);
        elements.put("apikey17PlaceHolder", apikey17PlaceHolder);
//        elements.put("apikey18PlaceHolder", apikey18PlaceHolder);
//        elements.put("apikey20PlaceHolder", apikey20PlaceHolder);
        elements.put("apikey21PlaceHolder", apikey21PlaceHolder);
        elements.put("apikey23PlaceHolder", apikey23PlaceHolder);
//        elements.put("apikey24PlaceHolder", apikey24PlaceHolder);
//        elements.put("apikey25PlaceHolder", apikey25PlaceHolder);
        elements.put("apikey26PlaceHolder", apikey26PlaceHolder);
//        elements.put("apikey27PlaceHolder", apikey27PlaceHolder);
        elements.put("apikey28PlaceHolder", apikey28PlaceHolder);
//        elements.put("apikey29PlaceHolder", apikey29PlaceHolder);
        elements.put("apikey30PlaceHolder", apikey30PlaceHolder);
//        elements.put("apikey31PlaceHolder", apikey31PlaceHolder);
        elements.put("apikey32PlaceHolder", apikey32PlaceHolder);
//        elements.put("apikey33PlaceHolder", apikey33PlaceHolder);
        elements.put("apikey34PlaceHolder", apikey34PlaceHolder);
//        elements.put("apikey35PlaceHolder", apikey35PlaceHolder);
        return elements;
    }
}
