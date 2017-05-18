package com.tkmdpa.taf.widgets;


import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.support.pagefactory.ElementLocator;

public class FeedbackWidgetImpl extends AncestorWidgetImpl implements FeedbackWidget{

    @FindBy(xpath = ".//div[@class='modal-header']/div[@class='row']/h3[@class='modal-title col-lg-12']")
    private WebElementFacade feedbackTitleText;

    @FindBy(xpath = ".//label[@for='name']")
    private WebElementFacade feedbackNameLabel;

    @FindBy(xpath = ".//label[@for='email']")
    private WebElementFacade feedbackEmailLabel;

    @FindBy(xpath = ".//label[@for='subject']")
    private WebElementFacade feedbackSubjectLabel;

    @FindBy(xpath = ".//label[@for='description']")
    private WebElementFacade feedbackDescriptionLabel;

    @FindBy(id = "name")
    private WebElementFacade feedbackNameTextField;

    @FindBy(id = "email")
    private WebElementFacade feedbackEmailTextField;

    @FindBy(id = "subject")
    private WebElementFacade feedbackSubjectDropdown;

    @FindBy(id = "description")
    private WebElementFacade feedbackDescriptionTextField;

    @FindBy(id = "js_feedback_btn")
    private WebElementFacade feedbackSendButton;

    @FindBy(xpath = "//button[@class='close']")
    private WebElementFacade feedbackCloseButton;

    @FindBy(xpath = ".//*[contains(@id,'feedback-message-error')]")
    private WebElementFacade descriptionErrorMessage;

    public FeedbackWidgetImpl(final PageObject page, final ElementLocator locator, final WebElementFacade webElement,
                              final long timeoutInMilliseconds) {
        super(page, locator, webElement, timeoutInMilliseconds);
    }

    public FeedbackWidgetImpl(final PageObject page, final ElementLocator locator,
                              final long timeoutInMilliseconds) {
        super(page, locator, timeoutInMilliseconds);
    }

    @Override
    public WebElementFacade getTitleText() {
        return feedbackTitleText;
    }

    @Override
    public WebElementFacade getNameLabel() {
        return feedbackNameLabel;
    }

    @Override
    public WebElementFacade getEmailLabel() {
        return feedbackEmailLabel;
    }

    @Override
    public WebElementFacade getSubjectLabel() {
        return feedbackSubjectLabel;
    }

    @Override
    public WebElementFacade getDescriptionLable() {
        return feedbackDescriptionLabel;
    }

    @Override
    public WebElementFacade getNameTextField() {
        return feedbackNameTextField;
    }

    @Override
    public WebElementFacade getEmailTextField() {
        return feedbackEmailTextField;
    }

    @Override
    public WebElementFacade getSubjectDropdown() {
        return feedbackSubjectDropdown;
    }

    @Override
    public WebElementFacade getDescriptionTextField() {
        return feedbackDescriptionTextField;
    }

    @Override
    public WebElementFacade getSendButton() {
        return feedbackSendButton;
    }

    @Override
    public WebElementFacade getCloseButton() {
        return feedbackCloseButton;
    }

    @Override
    public WebElementFacade getDescriptionErrorMessage() {
        return descriptionErrorMessage;
    }

}
