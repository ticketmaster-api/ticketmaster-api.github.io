package bla.tm.widgets;

import net.serenitybdd.core.annotations.ImplementedBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.serenitybdd.core.pages.WidgetObject;

@ImplementedBy(AnsestorWidgetImpl.class)
public interface AnsestorWidget extends WidgetObject {

    boolean isVisible(boolean expectedResult);
    WebElementFacade getEmbeddedHtmlCode();
    String getEmbeddedValueOf(String valueName);
}
