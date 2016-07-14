package bla.tm.pages.site.products_and_docs;

import bla.tm.pages.AncestorPage;
import bla.tm.widgets.FeedbackWidget;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;
import java.util.HashMap;
import java.util.Map;

@DefaultUrl("/products-and-docs/tutorials/widgets/")
public class PD_Tutorials_WidgetsPage extends AncestorPage {

    @FindBy(xpath = "//div[@class='announcement']/a[text()='Learn more']")
    private WebElementFacade addingEventDiscoveryWidgetButton;

    @FindBy(xpath = "//div[@class='announcement']/h3/a[text()='Adding Event Discovery widget to your website']")
    private WebElementFacade addingEventDiscoveryWidgetHeaderLink;

    @FindBy(xpath = "//div[@class='tutorials-article']/a/img[@alt='Adding Event Discovery widget to your website']")
    private WebElementFacade addingEventDiscoveryWidgetImageLink;

    @FindBy(xpath = "//div[@id='feedback-modal']")
    private FeedbackWidget feedbackWidget;

    @FindBy(xpath = ".//button[@id='js_feedback_btn_alert_ok']")
    private WebElementFacade successfulSentEmailNotificationOKButton;

    public Map<String, WebElementFacade> getClickableElements() {
        Map<String, WebElementFacade> elements = new HashMap<String, WebElementFacade>();
        elements.put("Adding Event Discovery Widget Button", addingEventDiscoveryWidgetButton);
        elements.put("Adding Event Discovery Widget Header Link", addingEventDiscoveryWidgetHeaderLink);
        elements.put("Adding Event Discovery Widget Image Link", addingEventDiscoveryWidgetImageLink);
        return elements;
    }

    public FeedbackWidget getFeedbackWidget() {return feedbackWidget;}

    public WebElementFacade getSuccessfulSentEmailNotificationOKButton() {
        return successfulSentEmailNotificationOKButton;
    }

}
