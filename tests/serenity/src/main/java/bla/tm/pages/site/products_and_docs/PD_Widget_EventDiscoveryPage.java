package bla.tm.pages.site.products_and_docs;

import bla.tm.pages.AncestorPage;
import bla.tm.widgets.EventDiscoveryWidget;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.thucydides.core.annotations.DefaultUrl;

@DefaultUrl("/products-and-docs/widgets/event-discovery/")
public class PD_Widget_EventDiscoveryPage extends AncestorPage {

    public final String pageHeader = "WIDGETS";

    @FindBy(xpath = "//form[@class='main-widget-config-form common_tabs']")
    private EventDiscoveryWidget eventDiscoveryWidget;

    public EventDiscoveryWidget getEventDiscoveryWidget() {return eventDiscoveryWidget;}

}
