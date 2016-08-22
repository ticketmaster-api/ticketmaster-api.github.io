package bla.tm.steps.partners;

import bla.tm.pages.site.partners.PartnersPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class PartnersSteps {

    PartnersPage partnersPage;

    @Step
    public void openPage() {
        partnersPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        partnersPage.maximisePageWindow();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (partnersPage.getTitleText(), partnersPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        partnersPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
