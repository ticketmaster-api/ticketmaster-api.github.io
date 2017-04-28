package com.tkmdpa.taf.pages.site.products_and_docs;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

import java.util.HashMap;
import java.util.Map;

@DefaultUrl("/products-and-docs/apis/inventory-status/")
public class PD_InventoryStatusAPIPage extends AncestorPage {
    public final String pageHeader = "INVENTORY STATUS API";

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Overview')]]/p[contains(.,'Example:')]/code")
    private WebElementFacade apikey01PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/h2[@id='inventory-status-details']/following-sibling::p[contains(.,'apikey=')]")
    private WebElementFacade apikey02PlaceHolder;

    @FindBy(xpath = "//div[@class='reqres-wrapper']//code[contains(.,'apikey=')]")
    private WebElementFacade apikey03PlaceHolder;

    public Map<String,WebElementFacade> getAPIKeyPlaceHoldersList() {
        Map<String,WebElementFacade> elements = new HashMap<>();
        elements.put("apikey01PlaceHolder", apikey01PlaceHolder);
        elements.put("apikey02PlaceHolder", apikey02PlaceHolder);
        elements.put("apikey03PlaceHolder", apikey03PlaceHolder);

        return elements;
    }
}
