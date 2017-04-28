package com.tkmdpa.taf.pages.other;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.At;

@At("http://code.ticketmaster.com/")
public class CodeTicketmasterPage extends AncestorPage {

    @FindBy(xpath = "//h1[@id='logo']")
    private WebElementFacade titleImageElement;

    public WebElementFacade returnTitleImageElement(){
        return titleImageElement;
    }
}
