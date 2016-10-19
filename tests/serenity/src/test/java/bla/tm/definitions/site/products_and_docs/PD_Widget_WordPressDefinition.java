package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.products_and_docs.PD_Widget_WordPressWidgetSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class PD_Widget_WordPressDefinition {
    @Steps
    PD_Widget_WordPressWidgetSteps wordPressWidgetPage;

    @Given("open WordPress Widget page")
    public void openEventDiscoveryWidgetPage() {
        wordPressWidgetPage.openPage();
    }

    @Then("check general page elements for WordPress Widget Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        wordPressWidgetPage.checkIfTitleIsCorrect();
        wordPressWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
