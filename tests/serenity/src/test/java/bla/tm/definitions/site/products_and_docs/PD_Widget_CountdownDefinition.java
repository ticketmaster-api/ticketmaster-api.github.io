package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.pantheon.UserAccountSteps;
import bla.tm.steps.pantheon.UserLogInSteps;
import bla.tm.steps.products_and_docs.PD_Widget_CountdownSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class PD_Widget_CountdownDefinition {

    private String apiKey = "{apikey}";

    @Steps
    PD_Widget_CountdownSteps countdownWidgetPage;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    @Given("open Countdown Widget page")
    public void openCountdownWidgetPage() {
        countdownWidgetPage.closePage();
        countdownWidgetPage.maximiseBrowserWindow();
        countdownWidgetPage.openPage();
    }

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
    public void thenTheRequiredFieldsAreNotEmptyOnTheCountdownWidgetPage() {
        countdownWidgetPage.apiKeyFieldIsNotEmpty();
        countdownWidgetPage.eventIdFieldIsNotEmpty();
    }

    @Given("store ApiKey and EventId on Countdown Widget page")
    public void givenStoreApiKeyAndEventIdOnCountdownWidgetPage() {
        countdownWidgetPage.storeCurrentApiKey();
        countdownWidgetPage.storeCurrentEventId();
    }

    @When("click on \"Get code\" button")
    public void whenClickOnGetCodeButton() {
        countdownWidgetPage.clickOnGetButton();
    }

    @Then("the pop-up Embedded Code is opened")
    public void thenThePopupEmbeddedCodeIsOpened() {
        countdownWidgetPage.thePopupEmbeddedCodeIsOpened();
    }

    @Then("embedded html code contains stored ApiKey and EventId")
    public void thenEmbeddedHtmlCodeContainsStoredApiKeyAndEvendId() {
        countdownWidgetPage.embeddedCodeContainsStoredApiKey();
        countdownWidgetPage.embeddedCodeContainsStoredEventId();
    }


    @When("submit form")
    public void whenSubmitForm() {
        countdownWidgetPage.submitForm();
    }

    @Given("change value for ApiKey and EventId on Countdown Widget page")
    public void givenChangeValueForApiKeyAndEventIdOnCountdownWidgetPage() {
        String apiKey = "anyApiKey";
        String eventId = "anyEventId";
        countdownWidgetPage.setApiKey(apiKey);
        countdownWidgetPage.setEventId(eventId);
    }

    @When("click reset button")
    public void whenClickResetButton() {
        countdownWidgetPage.clickResetButton();
    }

    @Then("the ApiKey and EventId fields have stored values")
    public void thenTheApiKeyAndEventIdFieldsHaveStoredValues() {
        countdownWidgetPage.apiKeyFieldContainsStoredValue();
        countdownWidgetPage.eventIdFieldContainsStoredValue();
    }
    @When("get eventId by keyword $keyword")
    @Given("get eventId by keyword $keyword")
    public void givenGetEventIdByKeywordkeyword(String keyword) {
        countdownWidgetPage.clickOnGetEventId();
        countdownWidgetPage.enterKeyword(keyword); //and submit
    }

    @When("set first eventId from list")
    public void whenSetFirstEventIdFromList() {
        countdownWidgetPage.clickSetThisIdOnFirstEvent();
    }

    @Then("the event poster contains $keyword")
    public void thenTheEventPosterContainskeyword(String keyword) {
        countdownWidgetPage.posterContainsKeyword(keyword);
    }

    @When("I click on the 'Get your own' link to get api key")
    public void whenIClickOnTheGetYourOwnLinkToGetApiKey() {
        countdownWidgetPage.clickOnGetYourOwn();
    }

    @Then("The page is opened with url $url")
    public void thenThePageIsOpenedWithUrlurl(String url) {
        countdownWidgetPage.pageIsOpenedWithUrl(url);
    }

    @Given("switch to VISUAL Tab")
    public void givenSwitchToVISUALTab() {
        countdownWidgetPage.switchToTab("visual");
    }

    @Given("set theme to full-width")
    public void givenSetThemeToFullwidth() {
        countdownWidgetPage.setFullWidth();
    }

    @Given("store theme")
    public void givenStoreTheme() {
        countdownWidgetPage.storeTheme();
    }

    @Then("embedded html code contains stored theme")
    public void thenEmbeddedHtmlCodeContainsStoredTheme() {
        countdownWidgetPage.embeddedCodeContainsStoredTheme();
    }

    @Given("set theme to poster")
    public void givenSetThemeToPoster() {
        countdownWidgetPage.setPosterTheme();
    }

    @Given("set layout resolution to $layoutResolution")
    public void givenSetLayoutResolutionTolayoutResolution(String layoutResolution) {
        countdownWidgetPage.setLayoutResolutionTo(layoutResolution);
    }

    @Given("store layout resolution $layoutResolution")
    public void givenStoreLayoutResolutionlayoutResolution(String layoutResolution) {
        countdownWidgetPage.storeLayoutResolution();
    }


    @Then("embedded html code contains stored layout resolution")
    public void thenEmbeddedHtmlCodeContainsStoredLayoutResolution() {
        countdownWidgetPage.embeddedCodeContainsStoredResolution();
    }

    @Given("set layout orientation to $orientation")
    public void givenSetLayoutOrientationToorientation(String orientation) {
        countdownWidgetPage.setLayoutOrientation(orientation);
    }

    @Given("store layout orientation")
    public void givenStoreLayoutOrientation() {
        countdownWidgetPage.storeLayoutOrientation();
    }

    @Then("embedded html code contains stored layout orientation")
    public void thenEmbeddedHtmlCodeContainsStoredLayoutOrientation() {
        countdownWidgetPage.embeddedCodeContainsStoredOrientation();
    }

    @Given("enter custom ApiKey $apiKey")
    public void givenEnterCustomApiKeyInvalidApiKey123(String apiKey) {
        countdownWidgetPage.setApiKey(apiKey);
    }

    @Given("enter custom EventId $eventId")
    public void givenEnterCustomEventIdvvG1OZKzMxnx99(String eventId) {
        countdownWidgetPage.setEventId(eventId);
    }

    @Then("the event message is shown \"No results were found\"")
    public void thenTheEventMessageIsShownNoResultsWereFound() {
        countdownWidgetPage.isEventMessageShown("No results were found");
    }
}
