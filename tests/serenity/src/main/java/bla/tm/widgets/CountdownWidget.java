package bla.tm.widgets;

import net.serenitybdd.core.annotations.ImplementedBy;
import net.serenitybdd.core.pages.WebElementFacade;

@ImplementedBy(CountdownWidgetImpl.class)
public interface CountdownWidget extends AnsestorWidget{

    WebElementFacade getAPIKeyTextField();
}
