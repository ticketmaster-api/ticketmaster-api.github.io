package bla.tm.pages;

import bla.tm.staticmethods.MenuElements;
import bla.tm.widgets.FeedbackWidget;
import bla.tm.widgets.LeftMenuWidget;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.pages.PageObject;
import org.openqa.selenium.NoSuchElementException;

import java.util.List;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class AncestorPage extends PageObject {

    public List<MenuElements> leftMenuElements;

//    WIDGETS

    @FindBy(xpath = "//div/ul[@id='scrollable-element']")
    private LeftMenuWidget leftSideMenuWidget;

    @FindBy(xpath = "//div[@id='feedback-modal']")
    private FeedbackWidget feedbackWidget;

//    PAGE ELEMENTS

    @FindBy(xpath = "//h1")
    public WebElementFacade titleText;

    @FindBy(xpath = "//nav[@id='menu']")
    private WebElementFacade headerMenu;

    @FindBy(xpath = "//nav[@id='top-menu-items']")
    private WebElementFacade headerMenuPantheon;

    @FindBy(xpath = "//div[@id='footer']")
    private WebElementFacade footerMenu;

    @FindBy(xpath = "//div[@id='footer-blogs']")
    private WebElementFacade footerMenu2;

    @FindBy(xpath = "//div[@id='footer-white']")
    private WebElementFacade footerMenu3;

    @FindBy(xpath = "//button[@id='js_feedback_open']")
    private WebElementFacade feedbackButton;

    @FindBy(xpath = "//div[@id='disqus_thread']")
    private WebElementFacade disqusOption;

    @FindBy(xpath = "//div[@id='search']")
    private WebElementFacade searchOption;

    @FindBy(xpath = "//div[@id='search']/div")
    private WebElementFacade searchButton;

    @FindBy(xpath = "//div[@id='search']/form[@id='cse-search-box']/div/input[@class='q']")
    private WebElementFacade searchTextInput;

    @FindBy(xpath = "//div/ul[@id='scrollable-element']")
    private WebElementFacade leftSideMenu;

    @FindBy(xpath = "//div[@class='search-container']//a[text()='Login']")
    private WebElementFacade logInLink;

    @FindBy(xpath = "//div[@class='user-control-section']/a[@href='/user/login']")
    private WebElementFacade logInLinkPantheon;

    public void closeWindow() {
        super.getDriver().close();
    }

    public void maximisePageWindow() {
        super.getDriver().manage().window().maximize();
    }

    public String returnCurrentUrl(){
        return this.getDriver().getCurrentUrl();
    }

    public WebElementFacade getFeedbackButton() {
        return feedbackButton;
    }

    public WebElementFacade getLogInButton() {
        return logInLink;
    }

    public WebElementFacade getSearchButton() {
        return searchButton;
    }

    public WebElementFacade getSearchTextInput() {
        return searchTextInput;
    }

    public String getTitleText() {
        return titleText.getText();
    }

    private boolean iSDisplayedFooterMenu() {
        try { return footerMenu.isDisplayed();
        } catch (NoSuchElementException e) {
            try {return footerMenu2.isDisplayed();
            } catch  (NoSuchElementException x) {
                return footerMenu3.isDisplayed();
            }
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
        headerMenu.shouldBeVisible();
        iSDisplayedFooterMenu();
        feedbackButton.shouldBeVisible();
        searchOption.shouldBeVisible();
        logInLink.shouldBeVisible();

        if (disqus){assertTrue(iSDisplayedDisqusFeature());}
        else {assertFalse(iSDisplayedDisqusFeature());}

        if (leftMenu){assertTrue(iSDisplayedLeftSideMenu());}
        else {assertFalse(iSDisplayedLeftSideMenu());}
    }

    public void checkGeneralPageElementsPantheon(){
        headerMenuPantheon.shouldBeVisible();
        assertTrue(iSDisplayedFooterMenu());
        logInLinkPantheon.shouldBeVisible();
    }

    public void checkGeneralPageElementsPantheonLoggedIn(){
        headerMenuPantheon.shouldBeVisible();
        assertTrue(iSDisplayedFooterMenu());
    }

    public FeedbackWidget getFeedbackWidget() {return feedbackWidget;}

    public LeftMenuWidget getLeftSideMenuWidget() {return leftSideMenuWidget;}

}
