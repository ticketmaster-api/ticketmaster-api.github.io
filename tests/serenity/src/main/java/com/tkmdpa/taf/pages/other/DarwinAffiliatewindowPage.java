package com.tkmdpa.taf.pages.other;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.At;

@At("https://darwin.affiliatewindow.com/login")
public class DarwinAffiliatewindowPage extends AncestorPage {

    @FindBy(xpath = "//img[@alt='Affiliate Window Logo']")
    private WebElementFacade titleImageElement;

    public WebElementFacade returnTitleImageElement(){
        return titleImageElement;
    }
}
