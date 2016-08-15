package bla.tm;

import net.serenitybdd.jbehave.SerenityStories;

public class DefaultProperties {

    //    public String baseTestedUrl = new DriverProperties().getEnvironmentVariables().getProperty("webdriver.base.url");

    public String baseTestedUrl = new SerenityStories().getEnvironmentVariables().getProperty("webdriver.base.url");
}
