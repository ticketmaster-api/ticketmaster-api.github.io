package bla.tm.widgets;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WidgetObject;
import net.serenitybdd.core.pages.WidgetObjectImpl;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.pagefactory.ElementLocator;

public abstract class AnsestorWidgetImpl extends WidgetObjectImpl implements AnsestorWidget {

    public AnsestorWidgetImpl(final PageObject page, final ElementLocator locator, final WebElement webElement,
                                 final long timeoutInMilliseconds) {
        super(page, locator, webElement, timeoutInMilliseconds);
    }

    public AnsestorWidgetImpl(final PageObject page, final ElementLocator locator,
                                 final long timeoutInMilliseconds) {
        super(page, locator, timeoutInMilliseconds);
    }

    public boolean isVisible(final boolean expectedResult) {
        return expectedResult ? this.isVisible() : this.isCurrentlyVisible();
    }
}
