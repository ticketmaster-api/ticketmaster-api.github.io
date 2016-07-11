package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_Tutorials_Widgets_EventDiscoveryWidgetPage;
import net.thucydides.core.annotations.Step;

public class PD_Tutorials_Widgets_EventDiscoveryWidgetSteps {

    PD_Tutorials_Widgets_EventDiscoveryWidgetPage tutorialsWidgetsEventDiscoveryWidgetPage;

    @Step
    public void openPage() {
        tutorialsWidgetsEventDiscoveryWidgetPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        tutorialsWidgetsEventDiscoveryWidgetPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return tutorialsWidgetsEventDiscoveryWidgetPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsWidgetsEventDiscoveryWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
