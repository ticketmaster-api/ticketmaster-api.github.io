package com.tkmdpa.taf.pages.site.products_and_docs;

import com.tkmdpa.taf.pages.AncestorPage;
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

    @FindBy(xpath = "//*[@id='main-block']/div/figure[2]/pre/code/span[@class='s2' and contains(., 'Rate limit quota violation. Quota limit  exceeded. Identifier :')]")
    private WebElementFacade apikeyPlaceHolder;

    public WebElementFacade getAvailableResourcesTable() {
       return  availableResourcesTable;
    }

    public WebElementFacade getSummaryWidget() {
        return  summaryWidget;
    }

    public Map<String,WebElementFacade> getAPIKeyPlaceHoldersList() {
        Map<String,WebElementFacade> elements = new HashMap<>();
        elements.put("apikeyPlaceHolder", apikeyPlaceHolder);
        return elements;
    }

}
