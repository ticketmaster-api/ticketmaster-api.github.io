package bla.tm.pages.site.products_and_docs;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

import java.util.HashMap;
import java.util.Map;

@DefaultUrl("/products-and-docs/apis/season-ticketing/")
public class PD_SeasonTicketingAPIPage extends AncestorPage {

    public final String pageHeader = "SEASON TICKETING API";

    @FindBy(xpath = "//div[h2[@id='getting-your-api-key']]/ul/li[contains(., 'The caller (or calling application) will:')]/ul/li/code")
    private WebElementFacade apikey01PlaceHolder;

    @FindBy(xpath = "//div[h2[@id='getting-your-api-key']]/p[contains(., \"Format: \")]/code")
    private WebElementFacade apikey02PlaceHolder;

    @FindBy(xpath = "//div[h2[@id='getting-your-api-key']]/p[@class='code red']")
    private WebElementFacade apikey03PlaceHolder;

    public Map<String,WebElementFacade> getAPIKeyPlaceHoldersList() {
        Map<String,WebElementFacade> elements = new HashMap<>();
        elements.put("apikey01PlaceHolder", apikey01PlaceHolder);
        elements.put("apikey02PlaceHolder", apikey02PlaceHolder);
        elements.put("apikey03PlaceHolder", apikey03PlaceHolder);
        return elements;
    }
}
