package bla.tm.pages.site.products_and_docs;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

import java.util.HashMap;
import java.util.Map;


@DefaultUrl("/products-and-docs/apis/getting-started/")
public class PD_GettingStartedPage extends AncestorPage {

    public final String pageHeader = "GETTING STARTED";

    @FindBy(xpath = "//table[@class='article double-margin']/tbody")
    private WebElementFacade availableResourcesTable;

    @FindBy(xpath = "//div[contains(@class,'horizontal-events-tracker__section')]")
    private WebElementFacade summaryWidget;

    @FindBy(xpath = "//div[@class='content getting-started']/figure/pre/code[@class='language-json']/span[@class='s2' and contains(., 'Rate limit quota violation. Quota limit  exceeded. Identifier :')]")
    private WebElementFacade apikey01PlaceHolder;

    public WebElementFacade getAvailableResourcesTable() {
       return  availableResourcesTable;
    }

    public WebElementFacade getSummaryWidget() {
        return  summaryWidget;
    }

    public Map<String,WebElementFacade> getAPIKeyPlaceHoldersList() {
        Map<String,WebElementFacade> elements = new HashMap<>();
        elements.put("apikey01PlaceHolder", apikey01PlaceHolder);
        return elements;
    }

}
