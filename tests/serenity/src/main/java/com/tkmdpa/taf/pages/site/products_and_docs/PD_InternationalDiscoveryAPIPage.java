package com.tkmdpa.taf.pages.site.products_and_docs;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

import java.util.HashMap;
import java.util.Map;

@DefaultUrl("/products-and-docs/apis/international-discovery/")
public class PD_InternationalDiscoveryAPIPage extends AncestorPage {

    public final String pageHeader = "INTERNATIONAL DISCOVERY API";

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h3[contains(.,'Overview')]]/ul[./li[contains(.,'apikey')]]/li/code[2]")
    private WebElementFacade apikey01PlaceHolder;

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
        return elements;
    }
}
