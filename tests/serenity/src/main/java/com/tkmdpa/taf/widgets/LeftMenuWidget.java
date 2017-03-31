package com.tkmdpa.taf.widgets;

import com.tkmdpa.taf.staticmethods.MenuElements;
import net.serenitybdd.core.annotations.ImplementedBy;
import net.serenitybdd.core.pages.WebElementFacade;

import java.util.List;

@ImplementedBy(LeftMenuWidgetImpl.class)
public interface LeftMenuWidget extends AncestorWidget {

    WebElementFacade getLeftMenu();

    List<MenuElements> getAllLeftMenuObject();

    List<MenuElements> getSelectedLeftMenuObject(String name);

}
