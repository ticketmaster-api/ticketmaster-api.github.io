package bla.tm.pages;

import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.pages.PageObject;

import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebElement;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;


public class AncestorPage extends PageObject {

    @FindBy(xpath = "//h1")
    public WebElementFacade titleText;

    @FindBy(xpath = "//nav[@id='menu']")
    private WebElementFacade headerMenu;

    @FindBy(xpath = "//div[@id='footer']")
    private WebElementFacade footerMenu;

    @FindBy(xpath = "//div[@id='footer-blogs']")
    private WebElementFacade footerMenu2;

    @FindBy(xpath = "//button[@id='js_feedback_open']")
    private WebElementFacade feedbackButton;

    @FindBy(xpath = "//div[@id='disqus_thread']")
    private WebElementFacade disqusOption;

    @FindBy(xpath = "//div[@id='search']")
    private WebElementFacade searchOption;

    @FindBy(xpath = "//div/ul[@id='scrollable-element']")
    private WebElementFacade leftSideMenu;

    public WebElementFacade getFeedbackButton() {
        return feedbackButton;
    }

    public String getTitleText() {
        return titleText.getText();
    }

    public void maximisePageWindow() {
        super.getDriver().manage().window().maximize();
    }

    public String returnCurrentUrl(){
        return this.getDriver().getCurrentUrl();
    }

    private boolean iSDisplayedFooterMenu() {
        try { return footerMenu.isDisplayed();
        } catch (NoSuchElementException e) {
            return footerMenu2.isDisplayed();
        }
    }

    private boolean iSDisplayedDisqusFeature() {
        try { return disqusOption.isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    private boolean iSDisplayedLeftSideMenu() {
        try { return leftSideMenu.isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        assertTrue(headerMenu.isDisplayed());
        assertTrue(iSDisplayedFooterMenu());
        assertTrue(feedbackButton.isDisplayed());
        assertTrue(searchOption.isDisplayed());

        if (disqus){assertTrue(iSDisplayedDisqusFeature());}
        else {assertFalse(iSDisplayedDisqusFeature());}

        if (leftMenu){assertTrue(iSDisplayedLeftSideMenu());}
        else {assertFalse(iSDisplayedLeftSideMenu());}
    }

}
