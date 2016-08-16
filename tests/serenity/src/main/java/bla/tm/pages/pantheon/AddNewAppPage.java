package bla.tm.pages.pantheon;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;

public class AddNewAppPage extends AncestorPage {

    @FindBy(xpath = "//input[@name='human']")
    private WebElementFacade nameTextInput;

    public WebElementFacade getNameTextInput() {
        return nameTextInput;
    }

}
