package bla.tm.pages.pantheon;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.At;

@At("https://developer-acct.ticketmaster.com/user/login")
public class UserLogInPage extends AncestorPage {

    public final String pageHeader = "LOG IN";

    @FindBy(xpath = "//h1[@class='only-desktop']")
    private WebElementFacade pageTitle;

    @FindBy(xpath = "//div[@class='text-wrapper col-lg-6 col-sm-12 col-xs-12']/a[@title='Create a new user account.']")
    private WebElementFacade createNewAccountButton;

    @FindBy(xpath = "//input[@id='edit-name']")
    private WebElementFacade nameTextField;

    @FindBy(xpath = "//input[@id='edit-pass']")
    private WebElementFacade passwordTextField;

    @FindBy(xpath = "//button[@id='edit-submit']")
    private WebElementFacade logInButton;

    @FindBy(xpath = "//form[@id='user-login']/div/a[@href='/user/password']")
    private WebElementFacade forgotYourPasswordLink;

    public WebElementFacade getCreateNewAccountButton() {
        return createNewAccountButton;
    }

    public WebElementFacade getNameTextField() {
        return nameTextField;
    }

    public WebElementFacade getPasswordTextField() {
        return passwordTextField;
    }

    public WebElementFacade getLogInButton() {
        return logInButton;
    }

    public WebElementFacade getForgotYourPasswordLink() {
        return forgotYourPasswordLink;
    }

    public String getTitleText() {
        return pageTitle.getText();
    }

}
