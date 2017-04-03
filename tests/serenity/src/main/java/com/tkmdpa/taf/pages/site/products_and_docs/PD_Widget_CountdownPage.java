package com.tkmdpa.taf.pages.site.products_and_docs;

import com.tkmdpa.taf.pages.AncestorPage;
import com.tkmdpa.taf.widgets.CountdownWidget;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.thucydides.core.annotations.DefaultUrl;

@DefaultUrl("/products-and-docs/widgets/countdown/")
public class PD_Widget_CountdownPage extends AncestorPage {

    public final String pageHeader = "COUNTDOWN WIDGET";

    @FindBy(xpath = "//div[div[form[@class='main-widget-config-form common_tabs']]]")
    private CountdownWidget countdownWidget;

    public CountdownWidget getCountdownWidget() {return countdownWidget;}
}
