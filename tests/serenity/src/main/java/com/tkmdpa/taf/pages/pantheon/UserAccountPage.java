package com.tkmdpa.taf.pages.pantheon;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

@DefaultUrl("/products-and-docs/widgets/map/")
public class UserAccountPage extends AncestorPage {

    public static final String PAGE_HEADER = "There are no applications here.\n" +
                                     "Create something!";

    @FindBy(xpath = "//div[@class='truncate']/a")
    private WebElementFacade firstUserApplication;

    @FindBy(xpath = "//div[@id='keys0']/div/div/table/tbody/tr[./td[contains(.,'Consumer Key')]]/td[2]/span")
    private WebElementFacade consumerKey;

    @FindBy(xpath = "//a[@href='/user']")
    private WebElementFacade loggedUserEmailLink;

    @FindBy(xpath = "//ul[@class='dropdown-menu']/li/a[@href='/user/me/edit']")
    private WebElementFacade editProfileLink;

    @FindBy(xpath = "//div[@class='add-app-button']/a")
    private WebElementFacade addNewAppButton;

    public String getTitleText() {
        return this.titleText.getText();
    }

    public WebElementFacade getFirstUserApplication() {
        return firstUserApplication;
    }

    public WebElementFacade getConsumerKey() {
        return consumerKey;
    }

    public WebElementFacade getLoggedUserEmailLink() {
        return loggedUserEmailLink;
    }

    public WebElementFacade getEditProfileLink() {
        return editProfileLink;
    }

    public WebElementFacade getAddNewAppButton() {
        return addNewAppButton;
    }

}
