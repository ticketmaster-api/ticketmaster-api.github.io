package bla.tm.widgets;

import net.serenitybdd.core.annotations.ImplementedBy;
import net.serenitybdd.core.pages.WebElementFacade;

@ImplementedBy(CalendarWidgetImpl.class)
public interface CalendarWidget extends AnsestorWidget {
    WebElementFacade getAPIKeyTextField();
    WebElementFacade getZipCodeTextField();
    WebElementFacade getKeywordTextField();
    String getEmbeddedValueOf(String valueName);
    WebElementFacade getRadiusDropdown();
    WebElementFacade getCountryDropdown();
}
