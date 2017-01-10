package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_Widget_WordPressPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class PD_Widget_WordPressWidgetSteps {
    PD_Widget_WordPressPage wordPressPage;

    @Step
    public void openPage() {
        wordPressPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (wordPressPage.getTitleText(), wordPressPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        wordPressPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
