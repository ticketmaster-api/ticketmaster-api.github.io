package bla.tm.pages.site.products_and_docs;

import bla.tm.pages.AncestorPage;
import bla.tm.widgets.CalendarWidget;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.thucydides.core.annotations.DefaultUrl;

@DefaultUrl("/products-and-docs/widgets/calendar/")
public class PD_Widget_CalendarPage extends AncestorPage {

    public final String pageHeader = "CALENDAR WIDGET";

    @FindBy(xpath = "//div[div[form[@class='main-widget-config-form common_tabs']]]")
    private CalendarWidget calendarWidget;

    public CalendarWidget getCalendarWidget() {return calendarWidget;}
}
