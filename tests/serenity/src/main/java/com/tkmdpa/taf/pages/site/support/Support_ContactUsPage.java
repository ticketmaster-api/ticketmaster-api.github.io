package com.tkmdpa.taf.pages.site.support;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

@DefaultUrl("/support/contact-us/")
public class Support_ContactUsPage extends AncestorPage {

    public static final String PAGE_HEADER = "CONTACT US";

    @FindBy(xpath = "//textarea[@id='message-detail-text']")
    private WebElementFacade descriptionField;

    @FindBy(id = "first-name")
    private WebElementFacade firstNameField;

    @FindBy(id = "email-contact")
    private WebElementFacade emailAdressField;


    public static String getPageHeader() {
        return PAGE_HEADER;
    }

    public WebElementFacade getFirstNameField() {
        return firstNameField;
    }

    public WebElementFacade getEmailAddressField() {
        return emailAdressField;
    }

    public WebElementFacade getDescriptionField() {
        return descriptionField;
    }

}
