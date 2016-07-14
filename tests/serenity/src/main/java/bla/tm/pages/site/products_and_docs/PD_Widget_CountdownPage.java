package bla.tm.pages.site.products_and_docs;

import bla.tm.pages.AncestorPage;
import bla.tm.widgets.CountdownWidget;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.thucydides.core.annotations.DefaultUrl;

@DefaultUrl("/products-and-docs/widgets/countdown/")
public class PD_Widget_CountdownPage extends AncestorPage {

    @FindBy(xpath = "//form[@class='main-widget-config-form common_tabs']")
    private CountdownWidget countdownWidget;

    public CountdownWidget getCountdownWidget() {return countdownWidget;}


}
