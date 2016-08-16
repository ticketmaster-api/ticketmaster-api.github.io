package bla.tm.pages.site.products_and_docs;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;


@DefaultUrl("/products-and-docs/apis/getting-started/")
public class PD_GettingStartedPage extends AncestorPage {

    public final String pageHeader = "GETTING STARTED";

    @FindBy(xpath = "//table[@class='article double-margin']/tbody")
    private WebElementFacade availableResourcesTable;

    @FindBy(xpath = "//div[@class='content getting-started']/ul[@class='events-tracker events-tracker_col-view']")
    private WebElementFacade summaryWidget;

    public WebElementFacade getAvailableResourcesTable() {
       return  availableResourcesTable;
    }

    public WebElementFacade getSummaryWidget() {
        return  summaryWidget;
    }

}
