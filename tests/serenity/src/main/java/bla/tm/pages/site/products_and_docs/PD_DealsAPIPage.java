package bla.tm.pages.site.products_and_docs;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

import java.util.HashMap;
import java.util.Map;

@DefaultUrl("/products-and-docs/apis/deals-api/")
public class PD_DealsAPIPage extends AncestorPage {

    public final String pageHeader = "DEALS API";

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Overview')]]/p[contains(.,'Example ')]/code")
    private WebElementFacade apikey01PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Group Ticket Deals')]]/p[contains(.,'EXCLUSIVE')]")
    private WebElementFacade apikey02PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Group Ticket Deals')]]/p[contains(.,'marketIds=27')]")
    private WebElementFacade apikey03PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Group Ticket Deals')]]/p[contains(.,'radius=2&radiusUnit=miles&latitude=34.101279&longitude=-118.343552')]")
    private WebElementFacade apikey04PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-http']/span[@class='nn' and contains(.,'/dc/content/v1/deals/events?apikey')]")
    private WebElementFacade apikey05PlaceHolder;

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
        elements.put("apikey02PlaceHolder", apikey02PlaceHolder);
        elements.put("apikey03PlaceHolder", apikey03PlaceHolder);
        elements.put("apikey04PlaceHolder", apikey04PlaceHolder);
        elements.put("apikey05PlaceHolder", apikey05PlaceHolder);
        return elements;
    }
}
