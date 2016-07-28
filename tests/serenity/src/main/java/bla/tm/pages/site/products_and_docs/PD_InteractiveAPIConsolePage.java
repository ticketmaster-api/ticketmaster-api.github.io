package bla.tm.pages.site.products_and_docs;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

@DefaultUrl("/products-and-docs/apis/interactive-console/")
public class PD_InteractiveAPIConsolePage extends AncestorPage {

    public final String pageHeader = "INTERACTIVE API CONSOLE";

    @FindBy(xpath = "//span[@id='copy-clip']")
    private WebElementFacade apikeyCustomTokenField;

    @FindBy(xpath = "//div[@id='get-key-callout']/a")
    private WebElementFacade getAPIKeyButton;

    public WebElementFacade getAPIKeyCustomTokenField() {
        return apikeyCustomTokenField;
    }

    public WebElementFacade getGetAPIKeyButton() {
        return getAPIKeyButton;
    }

}
