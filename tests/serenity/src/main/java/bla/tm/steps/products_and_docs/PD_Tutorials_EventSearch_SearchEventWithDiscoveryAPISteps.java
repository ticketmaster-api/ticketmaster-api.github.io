package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_Tutorials_EventSearch_SearchEventWithDiscoveryAPIPage;
import net.thucydides.core.annotations.Step;

public class PD_Tutorials_EventSearch_SearchEventWithDiscoveryAPISteps {

    PD_Tutorials_EventSearch_SearchEventWithDiscoveryAPIPage tutorialsEventSearchSearchEventWithDiscoveryAPIPage;

    @Step
    public void openPage() {
        tutorialsEventSearchSearchEventWithDiscoveryAPIPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        tutorialsEventSearchSearchEventWithDiscoveryAPIPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return tutorialsEventSearchSearchEventWithDiscoveryAPIPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsEventSearchSearchEventWithDiscoveryAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }
}

