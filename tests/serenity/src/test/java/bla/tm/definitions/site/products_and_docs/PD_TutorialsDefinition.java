package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.AnyPageSteps;
import bla.tm.steps.products_and_docs.PD_TutorialsSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class PD_TutorialsDefinition {

    @Steps
    PD_TutorialsSteps tutorialsPage;

    @Steps
    AnyPageSteps anyPage;

    @Given("open Tutorials page")
    public void openTutorialsPage() {
        tutorialsPage.maximiseBrowserWindow();
        tutorialsPage.openPage();
    }

    @When("check visibility and click $key element of Tutorials page")
    public void checkIfElementVisibleAndClickIt(String key) {
        tutorialsPage.validateAndClickElement(key);
    }

    @Then("check general page elements for Tutorials Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsPage.checkIfTitleIsCorrect();
        tutorialsPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that new page opened from Tutorials page has $url and $title")
    public void checkIfPageIsOpened(String url, String title){
        anyPage.checkIfPageIsOpened(url,title);
    }

}
