package bla.tm.widgets;

import bla.tm.staticmethods.MenuElements;
import net.serenitybdd.core.annotations.ImplementedBy;
import net.serenitybdd.core.pages.WebElementFacade;

import java.util.List;

@ImplementedBy(LeftMenuWidgetImpl.class)
public interface LeftMenuWidget extends AnsestorWidget{

    WebElementFacade getLeftMenu();

    List<MenuElements> getAllLeftMenuObject();

    List<MenuElements> getSelectedLeftMenuObject(String name);

}
