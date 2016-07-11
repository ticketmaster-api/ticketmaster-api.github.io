package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.AnyPageSteps;
import bla.tm.steps.products_and_docs.PD_WidgetsSteps;
import net.thucydides.core.annotations.Managed;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;


public class PD_WidgetsDefinition {

    @Steps
    PD_WidgetsSteps widgetsPage;

    @Steps
    AnyPageSteps anyPage;

    @Given("open Widgets page")
    public void givenOpenWidgetsPage() {
        widgetsPage.maximiseBrowserWindow();
        widgetsPage.openPage();
    }

    @When("check visibility and click $key element of Widgets page")
    public void checkIfElementVisibleAndClickIt(String key) {
        widgetsPage.validateAndClickElement(key);
    }

    @Then("check general page elements for Widgets Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        widgetsPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that new page opened from Widgets page has $url and $title")
    public void checkIfPageIsOpened(String url, String title){
        anyPage.checkIfPageIsOpened(url,title);
    }

    @Then("check that new page opened from Direct Payment Button has has appropriate url")
    public void checkDirectPaymentButton(){
        widgetsPage.switchToNewTab();
        anyPage.checkIfPageIsOpened("https://www.universe.com/directpayments","Direct Payments");
        widgetsPage.closeAllTabs();
    }
}
