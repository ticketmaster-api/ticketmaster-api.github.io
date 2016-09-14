package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_Widget_CountdownPage;
import net.serenitybdd.core.Serenity;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;
import org.junit.Assert;
import org.openqa.selenium.Keys;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static bla.tm.staticmethods.StaticMethods.*;
import static net.thucydides.core.webdriver.ThucydidesWebDriverSupport.getDriver;
import static org.junit.Assert.assertEquals;

public class PD_Widget_CountdownSteps {

    PD_Widget_CountdownPage countdownWidgetPage;

    @Step
    public void openPage() {
        countdownWidgetPage.open();
    }

    @Step
    public void closePage() {
        countdownWidgetPage.closeWindow();
    }

    @Step
    public void maximiseBrowserWindow() {
        countdownWidgetPage.maximisePageWindow();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (countdownWidgetPage.getTitleText(), countdownWidgetPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        countdownWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void clickLogIn() {
        countdownWidgetPage.getLogInButton().click();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        if ("{apikey}".equals(apikey)){
            assertEquals(countdownWidgetPage.getCountdownWidget().getAPIKeyTextField().getAttribute("value"), "5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG");
        }
        else {
            waitForSomeActionHappened(50);
            assertEquals(countdownWidgetPage.getCountdownWidget().getAPIKeyTextField().getAttribute("value"), apikey);
        }
    }

    public void apiKeyFieldIsNotEmpty() {
        String apiKey = countdownWidgetPage.getCountdownWidget().getAPIKeyTextField().getValue();
        Assert.assertFalse(apiKey == null || apiKey.length() == 0);
    }

    public void eventIdFieldIsNotEmpty() {
        String eventId = countdownWidgetPage.getCountdownWidget().getEventIDTextField().getValue();
        Assert.assertFalse(eventId == null || eventId.length() == 0);
    }

    public void storeCurrentApiKey() {
        String apiKey = countdownWidgetPage.getCountdownWidget().getAPIKeyTextField().getValue();
        Serenity.getCurrentSession().put("apiKey", apiKey);
    }

    public void storeCurrentEventId() {
        String eventId = countdownWidgetPage.getCountdownWidget().getEventIDTextField().getValue();
        Serenity.getCurrentSession().put("eventId", eventId);
    }

    public void clickOnGetButton() {
        WebElementFacade getCodeBtn = countdownWidgetPage.getCountdownWidget().getGetCodeButton();
        getDriver().manage().window().maximize();
        scrollToElement(getCodeBtn);
        hoverToElement(getCodeBtn);
        getCodeBtn.click();
    }

    public void thePopupEmbeddedCodeIsOpened() {
        Assert.assertTrue(countdownWidgetPage.getCountdownWidget().getEmbeddedHtmlCode().isDisplayed());
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void embeddedCodeContainsStoredApiKey() {
        String embeddedApiKeyValue = countdownWidgetPage.getCountdownWidget().getEmbeddedApiKey();
        String apiKeyValue = (String) Serenity.getCurrentSession().get("apiKey");
        Assert.assertEquals(String.format("The embedded code api key value is: %s but the apiKey value which was stored before is: %s ", embeddedApiKeyValue, apiKeyValue), apiKeyValue, embeddedApiKeyValue);
    }

    public void embeddedCodeContainsStoredEventId() {
        String embeddedEventIdValue = countdownWidgetPage.getCountdownWidget().getEmbeddedEventId();
        String eventIdValue = (String) Serenity.getCurrentSession().get("eventId");
        Assert.assertEquals(String.format("The embedded code eventId value is: %s but the eventId value which was stored before is: %s ", embeddedEventIdValue, eventIdValue), eventIdValue, embeddedEventIdValue);
    }

    public void submitForm() {
        countdownWidgetPage.getCountdownWidget().getEventIDTextField().sendKeys(Keys.ENTER);
    }

    public void setApiKey(String apiKey) {
        countdownWidgetPage.getCountdownWidget().getAPIKeyTextField().clear();
        countdownWidgetPage.getCountdownWidget().getAPIKeyTextField().sendKeys(apiKey);
    }

    public void setEventId(String eventId) {
        countdownWidgetPage.getCountdownWidget().getEventIDTextField().clear();
        countdownWidgetPage.getCountdownWidget().getEventIDTextField().sendKeys(eventId);
    }

    public void clickResetButton() {
        WebElementFacade resetBtn = countdownWidgetPage.getCountdownWidget().getResetButton();
        scrollToElement(resetBtn);
        hoverToElement(resetBtn);
        countdownWidgetPage.getCountdownWidget().getResetButton().click();
    }

    public void apiKeyFieldContainsStoredValue() {
        String actualApiKey = countdownWidgetPage.getCountdownWidget().getAPIKeyTextField().getValue();
        String expectedApiKey = (String) Serenity.getCurrentSession().get("apiKey");
        Assert.assertEquals(String.format("The apiKey should be %s but %s", expectedApiKey, actualApiKey), expectedApiKey, actualApiKey);
    }

    public void eventIdFieldContainsStoredValue() {
        String actualEventId = countdownWidgetPage.getCountdownWidget().getEventIDTextField().getValue();
        String expectedEventId = (String) Serenity.getCurrentSession().get("eventId");
        Assert.assertEquals(String.format("The eventId should be %s but %s", expectedEventId, actualEventId), expectedEventId, actualEventId);
    }

    public void clickOnGetEventId() {
        scrollToElement(countdownWidgetPage.getCountdownWidget().getEventIdLink());
        countdownWidgetPage.getCountdownWidget().getEventIdLink().click();
    }

    public void enterKeyword(String keyword) {
        countdownWidgetPage.getCountdownWidget().getKeywordField().sendKeys(keyword);
        countdownWidgetPage.getCountdownWidget().getKeywordField().sendKeys(Keys.ENTER);
    }

    public void clickSetThisIdOnFirstEvent() {
        countdownWidgetPage.getCountdownWidget().getSetThisId().click();
    }

    public void posterContainsKeyword(String keyword) {
        String posterText = countdownWidgetPage.getCountdownWidget().getPosterWindow().getText();
        Assert.assertTrue(String.format("The poster does not contains %s but has text: %s", keyword.toLowerCase(), posterText.toLowerCase()), keyword.toLowerCase().contains(posterText.toLowerCase()));
    }

    public void clickOnGetYourOwn() {
        countdownWidgetPage.getCountdownWidget().getGetYourOwn().click();
    }

    public void pageIsOpenedWithUrl(String url) {
        WebDriverWait wait = new WebDriverWait(getDriver(), 10);
        wait.until(ExpectedConditions.urlContains(url));
        String currentUrl = countdownWidgetPage.returnCurrentUrl();
        Assert.assertTrue(String.format("Current URl does not contain %s", currentUrl) ,currentUrl.contains(url));
    }

    public void switchToTab(String tab) {
        if(tab.contains("visual")){
            scrollToElement(countdownWidgetPage.getCountdownWidget().getVisualTab());
            countdownWidgetPage.getCountdownWidget().getVisualTab().click();
        }
        if(tab.contains("technical")){
            scrollToElement(countdownWidgetPage.getCountdownWidget().getTechnicalTab());
            countdownWidgetPage.getCountdownWidget().getTechnicalTab().click();
        }
    }

    public void setFullWidth() {
        countdownWidgetPage.getCountdownWidget().getFullWidthTab().click();
        Serenity.getCurrentSession().put("theme", "full-width");
    }

    public void storeTheme() {
        String themeName = countdownWidgetPage.getCountdownWidget().getActiveTheme().getText();
        Serenity.getCurrentSession().put("theme", themeName);
    }

    public void embeddedCodeContainsStoredTheme() {
        String embeddedThemeValue = countdownWidgetPage.getCountdownWidget().getEmbeddedTheme();
        String themeValue = (String) Serenity.getCurrentSession().get("theme");
        Assert.assertTrue(String.format("The embedded code theme value is: %s but the theme value which was stored before is: %s ", embeddedThemeValue, themeValue), embeddedThemeValue.equalsIgnoreCase(themeValue));
    }

    public void setPosterTheme() {
        countdownWidgetPage.getCountdownWidget().getPosterTab().click();
    }

    public void setLayoutResolutionTo(String layoutResolution) {
        if (layoutResolution == "300x250") {
            countdownWidgetPage.getCountdownWidget().getLayout300x250Tab().click();
        }
        if (layoutResolution == "300x600") {
            countdownWidgetPage.getCountdownWidget().getLayout300x600Tab().click();
        }
        if (layoutResolution == "custom") {
            countdownWidgetPage.getCountdownWidget().getLayoutCustomTab().click();
        }
    }

    public void storeLayoutResolution() {
        String activeLayoutResolution = countdownWidgetPage.getCountdownWidget().getActiveLayoutResolution().getText();
        Serenity.getCurrentSession().put("resolution", activeLayoutResolution);
    }

    public void embeddedCodeContainsStoredResolution() {
        String embeddedResolutionValue = countdownWidgetPage.getCountdownWidget().getEmbeddedResolution();
        String resolutionValue = (String) Serenity.getCurrentSession().get("resolution");
        Assert.assertTrue(String.format("The embedded code resolution value is: %s but the resulution value which was stored before is: %s ", embeddedResolutionValue, resolutionValue), embeddedResolutionValue.equalsIgnoreCase(resolutionValue));
    }

    public void setLayoutOrientation(String layoutOrientation) {
        if(layoutOrientation.equalsIgnoreCase("horizontal")){
            scrollToElement(countdownWidgetPage.getCountdownWidget().getLayoutHorisontalTab());
            countdownWidgetPage.getCountdownWidget().getLayoutHorisontalTab().click();
            Serenity.getCurrentSession().put("orientation", layoutOrientation);
        }
        if(layoutOrientation.equalsIgnoreCase("vertical")){
            scrollToElement(countdownWidgetPage.getCountdownWidget().getLayoutVerticalTab());
            countdownWidgetPage.getCountdownWidget().getLayoutVerticalTab().click();
            Serenity.getCurrentSession().put("orientation", layoutOrientation);
        }
    }

    public void storeLayoutOrientation() {
        String activeLayoutOrientation = countdownWidgetPage.getCountdownWidget().getActiveLayoutOrientation().getText();
        Serenity.getCurrentSession().put("orientation", activeLayoutOrientation);
    }

    public void embeddedCodeContainsStoredOrientation() {
        String embeddedOrientationValue = countdownWidgetPage.getCountdownWidget().getEmbeddedOrientation();
        String orientationValue = (String) Serenity.getCurrentSession().get("orientation");
        Assert.assertTrue(String.format("The embedded code orientation value is: %s but the orientation value which was stored before is: %s ", embeddedOrientationValue.toLowerCase(), orientationValue), embeddedOrientationValue.equalsIgnoreCase(orientationValue));
    }

    public void isEventMessageShown(String eventMessage) {
        String actualEventMessage = countdownWidgetPage.getCountdownWidget().getEventMessage().getText();
        Assert.assertTrue(actualEventMessage.contains(eventMessage));
    }
}
