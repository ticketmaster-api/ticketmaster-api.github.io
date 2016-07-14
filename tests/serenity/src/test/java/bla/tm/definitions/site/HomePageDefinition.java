package bla.tm.definitions.site;

import bla.tm.steps.AnyPageSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;
import static org.junit.Assert.assertTrue;
import bla.tm.steps.HomePageSteps;

public class HomePageDefinition {

    @Steps
    HomePageSteps homePage;

    @Steps
    AnyPageSteps anyPage;

    @Given("open Home page")
    public void givenOpenHomePage() {
        homePage.maximiseBrowserWindow();
        homePage.openPage();
    }

    @When("check visibility and click $key element")
    public void clickGetAPIKeyButton(String key) {
        homePage.validateAndClickElement(key);
    }

    @Then("check that new page has $url and $title")
    public void checkIfPageIsOpened(String url, String title){
        anyPage.checkIfPageIsOpened(url,title);
    }

    @Then("check general page elements for Home Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        homePage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that Twitter's list of events is shown")
    public void checkTwittersList() {
        assertTrue(homePage.isDisplayedTwittersList());
    }

}
