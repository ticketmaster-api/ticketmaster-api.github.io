package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_Page;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class PD_Steps {

    PD_Page productsAndDocstPage;

    @Step
    public void openPage() {
        productsAndDocstPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (productsAndDocstPage.getTitleText(), productsAndDocstPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        productsAndDocstPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
