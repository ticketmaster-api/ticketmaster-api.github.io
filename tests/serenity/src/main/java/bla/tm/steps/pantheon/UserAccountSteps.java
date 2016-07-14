package bla.tm.steps.pantheon;

import bla.tm.pages.pantheon.UserAccountPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertTrue;

public class UserAccountSteps {

    UserAccountPage userAccountPage;

    @Step
    public String getAPIKeyOfUser() {
        userAccountPage.getFirstUserAccount().click();
        return userAccountPage.getCustomerKey().getText();
    }

}
