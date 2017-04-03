package com.tkmdpa.taf.pages.site.products_and_docs;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

import java.util.HashMap;
import java.util.Map;

@DefaultUrl("/products-and-docs/apis/commerce/")
public class PD_CommerceAPIPage extends AncestorPage {

    public final String pageHeader = "COMMERCE API";

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Event Offers')]]/div/figure/pre/code[@class='language-js']/span[@class='s2' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey01PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Event Offers')]]/div/figure/pre/code[@class='language-bash']/span[@class='s1' and contains(.,'https://app.ticketmaster.com')]")
    private WebElementFacade apikey02PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper']/div/figure/pre/code[@class='language-http']/span[@class='nn' and contains(.,'/commerce/v2/events/0B00508C829A3875/offers.json')]")
    private WebElementFacade apikey03PlaceHolder;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Event Offers')]]/div/a")
    private WebElementFacade codeSection;

    @FindBy(xpath = "//div[@class='article-wrapper' and ./h2[contains(.,'Event Offers')]]/div/blockquote/p/a[@href='#curl']")
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
        elements.put("apikey03PlaceHolder", apikey03PlaceHolder);
        return elements;
    }

    public Map<String,WebElementFacade> getAPIKeyHiddenPlaceHoldersList() {
        Map<String,WebElementFacade> elements = new HashMap<>();
        elements.put("apikey02PlaceHolder", apikey02PlaceHolder);
        return elements;
    }

}
