package bla.tm.definitions.site.widgets;

import bla.tm.steps.pantheon.UserAccountSteps;
import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_Widget_CountdownSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class CountdownWidgetDefinition {
    private String apiKey = "{apikey}";

    @Steps
    PD_Widget_CountdownSteps countdownWidgetPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    //Given
    @Given("store ApiKey and EventId on Countdown Widget page")
    public void storeApiKeyAndEventIdOnCountdownWidgetPage() {
        countdownWidgetPage.storeCurrentApiKey();
        countdownWidgetPage.storeCurrentEventId();
    }

    @Given("change value for ApiKey and EventId on Countdown Widget page")
    public void changeValueForApiKeyAndEventIdOnCountdownWidgetPage() {
        String apiKey = "anyApiKey";
        String eventId = "anyEventId";
        countdownWidgetPage.setApiKey(apiKey);
        countdownWidgetPage.setEventId(eventId);
    }

    @When("get eventId by keyword $keyword")
    @Given("get eventId by keyword $keyword")
    public void getEventIdByKeyword(String keyword) {
        countdownWidgetPage.clickOnGetEventId();
        countdownWidgetPage.enterKeyword(keyword); //and submit
    }

    @Given("switch to VISUAL Tab")
    public void switchToVisualTab() {
        countdownWidgetPage.switchToTab("visual");
    }

    @Given("set theme to full-width")
    public void setThemeToFullWidth() {
        countdownWidgetPage.setFullWidth();
    }

    @Given("set theme to poster")
    public void setThemeToPoster() {
        countdownWidgetPage.setPosterTheme();
    }

    @Given("set layout resolution to $layoutResolution")
    public void setLayoutResolution(String layoutResolution) {
        countdownWidgetPage.setLayoutResolutionTo(layoutResolution);
    }

    @Given("store layout resolution $layoutResolution")
    public void storeLayoutResolution(String layoutResolution) {
        countdownWidgetPage.storeLayoutResolution();
    }

    @Given("set layout orientation to $orientation")
    public void setLayoutOrientation(String orientation) {
        countdownWidgetPage.setLayoutOrientation(orientation);
    }

    @Given("enter custom ApiKey $apiKey")
    public void enterCustomApiKey(String apiKey) {
        countdownWidgetPage.setApiKey(apiKey);
    }

    @Given("enter custom EventId $eventId")
    public void enterCustomEventId(String eventId) {
        countdownWidgetPage.setEventId(eventId);
    }

    //When
    @When("User is not logged to site (Countdown Widget)")
    public void openLogInPageAndCheckUserIsNotLoggedIn() {
        countdownWidgetPage.clickLogIn();
        userLogInPage.isPageOpened();
        countdownWidgetPage.openPage();
    }

    @When("User is logged to site (Countdown Widget)")
    public void openLogInPageAndLogIn() {
        countdownWidgetPage.clickLogIn();
        userLogInPage.logInToAccount();
        apiKey = userAccountSteps.getAPIKeyOfUser();
        countdownWidgetPage.openPage();
    }

    @When("click on \"Get code\" button")
    public void clickOnGetCodeButton() {
        countdownWidgetPage.clickOnGetButton();
    }

    @When("submit form")
    public void submitForm() {
        countdownWidgetPage.submitForm();
    }

    @When("click reset button")
    public void clickResetButton() {
        countdownWidgetPage.clickResetButton();
    }

    @When("set first eventId from list")
    public void setFirstEventIdFromList() {
        countdownWidgetPage.clickSetThisIdOnFirstEvent();
    }

    @When("I click on the 'Get your own' link to get api key")
    public void clickOnTheGetYourOwnLinkToGetApiKey() {
        countdownWidgetPage.clickOnGetYourOwn();
    }

    //Then
    @Then("check general page elements for Countdown Widget Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        countdownWidgetPage.checkIfTitleIsCorrect();
        countdownWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Countdown Widget page")
    public void checkAPIKeyPlaceholders(){
        countdownWidgetPage.checkAPIKeyPlaceholders(apiKey);
    }

    @Then("the required fields are not empty on the Countdown Widget page")
    public void checkThatRequiredFieldsAreNotEmptyOnTheCountdownWidgetPage() {
        countdownWidgetPage.apiKeyFieldIsNotEmpty();
        countdownWidgetPage.checkThatEventIdFieldIsNotEmpty();
    }

    @Then("the pop-up Embedded Code is opened")
    public void checkThatPopupEmbeddedCodeIsOpened() {
        countdownWidgetPage.checkThatPopupEmbeddedCodeIsOpened();
    }

    @Then("embedded html code contains stored ApiKey and EventId")
    public void checkThatEmbeddedHtmlCodeContainsStoredApiKeyAndEvendId() {
        countdownWidgetPage.checkThatEmbeddedCodeContainsStoredApiKey();
        countdownWidgetPage.checkThatEmbeddedCodeContainsStoredEventId();
    }

    @Then("the ApiKey and EventId fields have stored values")
    public void checkThatApiKeyAndEventIdFieldsHaveStoredValues() {
        countdownWidgetPage.checkThatApiKeyFieldContainsStoredValue();
        countdownWidgetPage.checkThatEventIdFieldContainsStoredValue();
    }

    @Then("the event poster contains $keyword")
    public void checkThatEventPosterContainskeyword(String keyword) {
        countdownWidgetPage.checkThatPosterContainsKeyword(keyword);
    }

    @Then("The page is opened with url $url")
    public void checkThatPageIsOpenedWithUrl(String url) {
        countdownWidgetPage.checkThatPageIsOpenedWithUrl(url);
    }

    @Then("embedded html code contains stored theme")
    public void checkThatEmbeddedHtmlCodeContainsStoredTheme() {
        countdownWidgetPage.checkThatEmbeddedCodeContainsStoredTheme();
    }

    @Then("embedded html code contains stored layout resolution")
    public void checkThatEmbeddedHtmlCodeContainsStoredLayoutResolution() {
        countdownWidgetPage.checkThatEmbeddedCodeContainsStoredResolution();
    }

    @Then("embedded html code contains stored layout orientation")
    public void checkThatEmbeddedHtmlCodeContainsStoredLayoutOrientation() {
        countdownWidgetPage.checkThatEmbeddedCodeContainsStoredOrientation();
    }

    @Then("the event message is shown \"$message\"")
    public void checkThatEventMessageIsShown(String message) {
        countdownWidgetPage.checkThatEventMessageIsShown(message);
    }
}
