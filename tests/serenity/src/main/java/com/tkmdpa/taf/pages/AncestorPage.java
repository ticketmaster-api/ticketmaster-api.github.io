package com.tkmdpa.taf.pages;

import com.tkmdpa.taf.widgets.*;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.pages.PageObject;
import org.openqa.selenium.NoSuchElementException;

import java.util.logging.Level;
import java.util.logging.Logger;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class AncestorPage extends PageObject {

    private static final Logger LOGGER = Logger.getLogger(String.valueOf(AncestorPage.class));

    @FindBy(xpath = "//form[@class='main-widget-config-form common_tabs']")
    private EventDiscoveryWidget eventDiscoveryWidget;

    @FindBy(xpath = "//div[div[form[@class='main-widget-config-form common_tabs']]]")
    private CountdownWidget countdownWidget;

    @FindBy(xpath = "//div[div[form[@class='main-widget-config-form common_tabs']]]")
    private CalendarWidget calendarWidget;

    @FindBy(xpath = "//div[div[form[@class='main-widget-config-form common_tabs']]]/div[1]")
    protected MapWidget mapWidget;

    public CountdownWidget getCountDownWidget() {
        return countdownWidget;
    }

    public EventDiscoveryWidget getEventDiscoveryWidget() {return eventDiscoveryWidget;}

    public CalendarWidget getCalendarWidget() {return calendarWidget;}

    public MapWidget getMapWidget() {
        return mapWidget;
    }

    @FindBy(xpath = "//div[./ul[@id='scrollable-element']]")
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

    @FindBy(xpath = "//*[@id='footer-white']")
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

    @FindBy(xpath = "//div[ul[@id='scrollable-element']]")
    private WebElementFacade leftSideMenu;

    @FindBy(xpath = "//div[@class='search-container']//a[text()='Login']")
    private WebElementFacade logInLink;

    @FindBy(xpath = "//div[@class='user-control-section']/a[@href='/user/login']")
    private WebElementFacade logInLinkPantheon;

    @FindBy(xpath = "//button[text()='SEND']")
    private WebElementFacade sendButton;

    public WebElementFacade getSendButton() {
        return sendButton;
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

    private boolean isDisplayedFooterMenu() {
        try {
            return footerMenu.isDisplayed();
        } catch (NoSuchElementException e) {
            try {
                return footerMenu2.isDisplayed();
            } catch  (NoSuchElementException x) {
                return footerMenu3.isDisplayed();
            }
        }
    }

    private boolean iSDisplayedDisqusFeature() {
        try {
            return disqusOption.isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    private boolean iSDisplayedLeftSideMenu() {
        try {
            return leftSideMenu.isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }

    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        headerMenu.shouldBeVisible();
        isDisplayedFooterMenu();
        feedbackButton.shouldBeVisible();
        searchOption.shouldBeVisible();
        logInLink.shouldBeVisible();
        if (disqus){
            assertTrue(iSDisplayedDisqusFeature());
        }
        else {
            assertFalse(iSDisplayedDisqusFeature());
        }
        if (leftMenu){
            assertTrue(iSDisplayedLeftSideMenu());
        }
        else {
            assertFalse(iSDisplayedLeftSideMenu());
        }
    }

    public void checkGeneralPageElementsPantheon(){
        headerMenuPantheon.shouldBeVisible();
        assertTrue(isDisplayedFooterMenu());
        logInLinkPantheon.shouldBeVisible();
    }

    public void checkGeneralPageElementsPantheonLoggedIn(){
        headerMenuPantheon.shouldBeVisible();
        assertTrue(isDisplayedFooterMenu());
    }

    public FeedbackWidget getFeedbackWidget() {return feedbackWidget;}

    public LeftMenuWidget getLeftSideMenuWidget() {return leftSideMenuWidget;}

    public void scrollToElement(WebElementFacade element){
        int screenHeight = getDriver().manage().window().getSize().getHeight();
            evaluateJavascript("window.scrollTo(0," + (element.getLocation().y - screenHeight / 2) + ")");
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
            LOGGER.log(Level.WARNING, "Interrupted!", e);
            Thread.currentThread().interrupt();
        }
    }

    public String getPageSource() {
        return getDriver().getPageSource();
    }


    public boolean checkIsPresentAndDisplayed(WebElementFacade webElementFacade) {
        try {
            return webElementFacade.isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }

}
