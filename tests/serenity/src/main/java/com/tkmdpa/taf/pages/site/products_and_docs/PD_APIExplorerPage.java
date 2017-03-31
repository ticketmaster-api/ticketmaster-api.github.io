package com.tkmdpa.taf.pages.site.products_and_docs;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

@DefaultUrl("/api-explorer/")
public class PD_APIExplorerPage extends AncestorPage {

    public final String pageHeader = "THE API EXPLORER";

    @FindBy(xpath = "//input[@id='api-key']")
    private WebElementFacade apikeyTextField;

    @FindBy(xpath = "//div[contains(@class,'horizontal-events-tracker__section')]")
    private WebElementFacade summaryWidget;

    public WebElementFacade getAPIKeyTextField() {
        return apikeyTextField;
    }

    public WebElementFacade getSummaryWidget() {
        return  summaryWidget;
    }
}
