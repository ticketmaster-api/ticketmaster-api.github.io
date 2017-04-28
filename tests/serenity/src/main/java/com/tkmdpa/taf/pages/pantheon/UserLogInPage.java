package com.tkmdpa.taf.pages.pantheon;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.At;

@At("https://developer-acct.ticketmaster.com/user/login")
public class UserLogInPage extends AncestorPage {

    public static final String PAGE_HEADER = "LOG IN";

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

    @FindBy(xpath = "//div[@class='user-login-reset-pass']/a")
    private WebElementFacade forgotYourPasswordLink;

    @FindBy(xpath = "//a[text()=\"Log in using OpenID\"]")
    private WebElementFacade openIDButton;

    @FindBy(id = "edit-openid-identifier")
    private WebElementFacade openIdInputField;

    public WebElementFacade getOpenIdInputField() {
        return openIdInputField;
    }

    public WebElementFacade getOpenIDButton() {
        return openIDButton;
    }

    public WebElementFacade getCreateNewAccountButton() {
        return waitFor(createNewAccountButton);
    }

    public WebElementFacade getNameTextField() {
        return waitFor(nameTextField);
    }

    public WebElementFacade getPasswordTextField() {
        return waitFor(passwordTextField);
    }

    public WebElementFacade getLogInButton() {
        return waitFor(logInButton);
    }

    public WebElementFacade getForgotYourPasswordLink() {
        return waitFor(forgotYourPasswordLink);
    }

    public String getTitleText() {
        return pageTitle.getText();
    }

}
