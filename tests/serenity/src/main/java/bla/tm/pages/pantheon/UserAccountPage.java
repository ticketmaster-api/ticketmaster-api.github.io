package bla.tm.pages.pantheon;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;

public class UserAccountPage extends AncestorPage {

    public final String pageHeader = "THESE ARE YOUR APPS!\n" +
                                     "EXPLORE THEM!";

    @FindBy(xpath = "//div[@class='truncate']/a")
    private WebElementFacade firstUserAccount;

    @FindBy(xpath = "//div[@id='keys0']/div/div/table/tbody/tr[./td[contains(.,'Consumer Key')]]/td[2]/span")
    private WebElementFacade customerKey;

    @FindBy(xpath = "//a[@href='/user']")
    private WebElementFacade loggedUserEmailLink;

    @FindBy(xpath = "//ul[@class='dropdown-menu']/li/a[@href='/user/me/edit']")
    private WebElementFacade editProfileLink;

    @FindBy(xpath = "//div[@class='add-app-button']/a")
    private WebElementFacade addNewAppButton;

    public String getTitleText() {
        return this.titleText.getText();
    }

    public WebElementFacade getFirstUserAccount() {
        return firstUserAccount;
    }

    public WebElementFacade getCustomerKey() {
        return customerKey;
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
