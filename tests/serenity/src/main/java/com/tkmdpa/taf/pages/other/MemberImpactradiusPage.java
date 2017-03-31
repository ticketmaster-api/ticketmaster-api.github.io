package com.tkmdpa.taf.pages.other;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.At;

@At("https://member.impactradius.com/bla/Ticketmasterdirect/login.user")
public class MemberImpactradiusPage extends AncestorPage {

    @FindBy(xpath = "//div[@id='brandedCt']/img']")
    private WebElementFacade titleImageElement;

    public WebElementFacade returnTitleImageElement(){
        return titleImageElement;
    }
}
