package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_Widget_CountdownPage;
import net.thucydides.core.annotations.Step;

public class PD_Widget_CountdownSteps {

    PD_Widget_CountdownPage countdownWidgetPage;

    @Step
    public void openPage() {
        countdownWidgetPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        countdownWidgetPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return countdownWidgetPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        countdownWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
