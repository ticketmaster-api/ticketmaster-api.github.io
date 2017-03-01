package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.AnyPageSteps;
import bla.tm.steps.products_and_docs.PD_APIExplorerV2Steps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class PD_APIExplorerV2Definition {

    @Steps
    PD_APIExplorerV2Steps apiExplorerV2Page;

    @Steps
    AnyPageSteps anyPage;

    @Given("open API Explorer V2 page")
    public void openAPIExplorerPage() {
        apiExplorerV2Page.openPage();
    }

    @Then("check general page elements for API Explorer V2 Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        apiExplorerV2Page.checkIfTitleIsCorrect();
        apiExplorerV2Page.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check $tag is present in the source code page")
    public void checkIfTagIsPresentInThePagesSourceCode(String text){
        apiExplorerV2Page.checkIfSourceCodeContainsTag(text);
    }

}
