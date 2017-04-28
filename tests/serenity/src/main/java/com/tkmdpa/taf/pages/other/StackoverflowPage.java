package com.tkmdpa.taf.pages.other;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.At;

@At("http://stackoverflow.com/questions/tagged/ticketmaster-api")
public class StackoverflowPage extends AncestorPage {

    @FindBy(xpath = "//div[@id='hlogo']")
    private WebElementFacade titleImageElement;

    public WebElementFacade returnTitleImageElement(){
        return titleImageElement;
    }
}
