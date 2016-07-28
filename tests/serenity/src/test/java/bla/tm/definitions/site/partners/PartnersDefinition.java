package bla.tm.definitions.site.partners;

import bla.tm.steps.partners.PartnersSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class PartnersDefinition {

    @Steps
    PartnersSteps partnersPage;

    @Given("open Partners page")
    public void openPartnersPage() {
        partnersPage.maximiseBrowserWindow();
        partnersPage.openPage();
    }

    @Then("check general page elements for Partners Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        partnersPage.checkIfTitleIsCorrect();
        partnersPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
