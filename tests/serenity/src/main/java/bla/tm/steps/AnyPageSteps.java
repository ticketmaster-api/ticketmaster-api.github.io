package bla.tm.steps;

import bla.tm.pages.AnyPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class AnyPageSteps {

    AnyPage anyPage;

    @Step
    public void openPage() {
        anyPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        anyPage.maximisePageWindow();
    }

    @Step
    public String getTitleText() {
        return anyPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        anyPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public String returnCurrentUrl() {
        return anyPage.returnCurrentUrl();
    }

    public void checkIfPageIsOpened(String url, String title){
        if (url.contains("{url}")) {assertEquals(anyPage.returnCurrentUrl(), url.replace("{url}", anyPage.baseTestedUrl));}
        else {
            try {
                Thread.sleep(1000);
            } catch(InterruptedException ex) {
                Thread.currentThread().interrupt();
            }
            assertEquals(anyPage.returnCurrentUrl(), url);
        };

        anyPage.checkIsElementIsShown(title);
    }
}
