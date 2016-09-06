package bla.tm.widgets;

import net.serenitybdd.core.annotations.ImplementedBy;
import net.serenitybdd.core.pages.WebElementFacade;

@ImplementedBy(EventDiscoveryWidgetImpl.class)
public interface EventDiscoveryWidget extends AnsestorWidget{

    WebElementFacade getAPIKeyTextField();

}
