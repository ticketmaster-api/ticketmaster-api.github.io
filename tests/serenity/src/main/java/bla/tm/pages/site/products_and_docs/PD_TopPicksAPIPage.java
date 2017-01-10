package bla.tm.pages.site.products_and_docs;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

import java.util.HashMap;
import java.util.Map;

@DefaultUrl("/products-and-docs/apis/top-picks/")
public class PD_TopPicksAPIPage extends AncestorPage {

    public final String pageHeader = "TOP PICKS API";

    @FindBy(xpath = "//div[h2[@id='overview']]/p[contains(., 'Example: ')]/code")
    private WebElementFacade apikey01PlaceHolder;

    @FindBy(xpath = "//div[h2[@id='top-picks-details']]/p[@class='code red']")
    private WebElementFacade apikey02PlaceHolder;

    @FindBy(xpath = "//div[@class='reqres-wrapper']/figure/pre/code[@class='language-bash']")
    private WebElementFacade apikey03PlaceHolder;

    public Map<String,WebElementFacade> getAPIKeyPlaceHoldersList() {
        Map<String,WebElementFacade> elements = new HashMap<>();
        elements.put("apikey01PlaceHolder", apikey01PlaceHolder);
        elements.put("apikey02PlaceHolder", apikey02PlaceHolder);
        elements.put("apikey03PlaceHolder", apikey03PlaceHolder);
        return elements;
    }
}
