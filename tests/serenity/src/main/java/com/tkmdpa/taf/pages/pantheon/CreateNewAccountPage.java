package com.tkmdpa.taf.pages.pantheon;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.At;

@At("https://developer-acct.ticketmaster.com/user/register")
public class CreateNewAccountPage extends AncestorPage {

    public static final String PAGE_HEADER = "CREATE NEW ACCOUNT";
    private final String firstNameLabel = "First Name";
    private final String lastNameLabel = "Last Name";
    private final String companyNameLabel = "Company Name";
    private final String companySiteUrlLabel = "Company Site URL";
    private final String userNameLabel = "Username";
    private final String emailAddressLabel = "E-mail address";

    @FindBy(id = "edit-submit")
    private WebElementFacade createNewAccountButton;

    @FindBy(id = "edit-field-terms-and-conditions-und")
    private WebElementFacade termOfUse;

    public WebElementFacade getTermOfUse(){
        return termOfUse;
    }

    private WebElementFacade getWebElementOnRegisterPage(String name) {
        WebElementFacade appNameWebElement = find(By.xpath(String.format("//label[text()='%s ']/../input", name)));
        return appNameWebElement;
    }

    public static String getPageHeader() {
        return PAGE_HEADER;
    }

    public String getTitleText() {
        return this.titleText.getText();
    }

    public WebElementFacade getCreateNewAccountButton() {
        return createNewAccountButton;
    }

    public void setFirstName(String text) {
        getWebElementOnRegisterPage(firstNameLabel).clear();
        getWebElementOnRegisterPage(firstNameLabel).sendKeys(text);
    }

    public void setLastName(String text) {
        getWebElementOnRegisterPage(lastNameLabel).clear();
        getWebElementOnRegisterPage(lastNameLabel).sendKeys(text);
    }

    public void setCompanyName(String text) {
        getWebElementOnRegisterPage(companyNameLabel).clear();
        getWebElementOnRegisterPage(companyNameLabel).sendKeys(text);
    }

    public void setCompanySiteUrl(String text) {
        getWebElementOnRegisterPage(companySiteUrlLabel).clear();
        getWebElementOnRegisterPage(companySiteUrlLabel).sendKeys(text);
    }

    public void setUsername(String text) {
        getWebElementOnRegisterPage(userNameLabel).clear();
        getWebElementOnRegisterPage(userNameLabel).sendKeys(text);
    }

    public void setEmailAddress(String text) {
        getWebElementOnRegisterPage(emailAddressLabel).clear();
        getWebElementOnRegisterPage(emailAddressLabel).sendKeys(text);
    }

}
