package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.products_and_docs.PD_APIExplorerSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

import static org.junit.Assert.assertTrue;

public class PD_APIExplorerDefinition {

    @Steps
    PD_APIExplorerSteps apiExplorerPage;

    @Given("open API Explorer page")
    public void givenOpenAPIExplorerPage() {
        apiExplorerPage.maximiseBrowserWindow();
        apiExplorerPage.openPage();
    }

    @Then("check general page elements for API Explorer Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        apiExplorerPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
