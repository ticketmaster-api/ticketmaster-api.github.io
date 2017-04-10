package com.tkmdpa.taf.pages.site.partners;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

@DefaultUrl("/partners/certified-partners/nexus/")
public class Partners_NexusPage extends AncestorPage {

    @FindBy(id = "email-nexus")
    private WebElementFacade emailField;

    @FindBy(id = "company-detail-text")
    private WebElementFacade descriptionField;

    @FindBy(id = "js_nexus_btn_alert_ok")
    private WebElementFacade okButton;

    public WebElementFacade getEmailField() {
        return emailField;
    }

    public WebElement getRadio(String name) {
        return getDriver().findElement(By.xpath(String.format("//div[@class='label-radio']/label[text()='%s']/../input", name)));
    }

    public WebElementFacade getDescription() {
        return descriptionField;
    }

    public WebElementFacade getSuccessfulSentEmailNotificationOKButton() {
        return okButton;
    }
}
