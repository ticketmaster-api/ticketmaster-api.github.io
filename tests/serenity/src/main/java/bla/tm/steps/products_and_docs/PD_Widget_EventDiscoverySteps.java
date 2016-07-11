package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_Widget_EventDiscoveryPage;
import net.thucydides.core.annotations.Step;

public class PD_Widget_EventDiscoverySteps {

    PD_Widget_EventDiscoveryPage eventDiscoveryWidgetPage;

    @Step
    public void openPage() {
        eventDiscoveryWidgetPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        eventDiscoveryWidgetPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return eventDiscoveryWidgetPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        eventDiscoveryWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
