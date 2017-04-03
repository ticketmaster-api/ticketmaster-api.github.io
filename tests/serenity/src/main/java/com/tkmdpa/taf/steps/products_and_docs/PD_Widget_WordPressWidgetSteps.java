package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_Widget_WordPressPage;
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
