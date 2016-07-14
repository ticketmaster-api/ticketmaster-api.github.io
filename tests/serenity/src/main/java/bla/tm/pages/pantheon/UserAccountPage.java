package bla.tm.pages.pantheon;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;

public class UserAccountPage extends AncestorPage {

    @FindBy(xpath = "//div[@class='truncate']/a")
    private WebElementFacade firstUserAccount;

    @FindBy(xpath = "//div[@id='keys0']/div/div/table/tbody/tr[./td[contains(.,'Consumer Key')]]/td[2]/span")
    private WebElementFacade customerKey;

    public WebElementFacade getFirstUserAccount() {
        return firstUserAccount;
    }

    public WebElementFacade getCustomerKey() {
        return customerKey;
    }

}
