package bla.tm.pages.site.products_and_docs;

import bla.tm.pages.AncestorPage;
import bla.tm.widgets.FeedbackWidget;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

import java.util.HashMap;
import java.util.Map;

import static java.util.Optional.ofNullable;
import static junit.framework.TestCase.assertTrue;

@DefaultUrl("/products-and-docs/tutorials/widgets/")
public class PD_Tutorials_WidgetsPage extends AncestorPage {

    @FindBy(xpath = "//div[@class='announcement']/a[text()='Learn more']")
    private WebElementFacade addingEventDiscoveryWidgetButton;

    @FindBy(xpath = "//div[@id='feedback-modal']")
    private FeedbackWidget feedbackWidget;

    @FindBy(xpath = ".//button[@id='js_feedback_btn_alert_ok']")
    private WebElementFacade successfulSentEmailNotificationOKButton;

    private Map<String, WebElementFacade> getClickableElements() {
        Map<String, WebElementFacade> elements = new HashMap<String, WebElementFacade>();
        elements.put("Adding Event Discovery Widget Button", addingEventDiscoveryWidgetButton);
        return elements;
    }

    public WebElementFacade findWebElementByKey(String key) {
        return ofNullable(getClickableElements().get(key)).orElseThrow(
                () -> new RuntimeException("There is no such element on the page"));
    }

    public FeedbackWidget getFeedbackWidget() {return feedbackWidget;}

    public WebElementFacade getSuccessfulSentEmailNotificationOKButton() {
        return successfulSentEmailNotificationOKButton;
    }

}
