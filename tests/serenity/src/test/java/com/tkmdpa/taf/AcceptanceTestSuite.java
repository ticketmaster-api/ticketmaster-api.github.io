package com.tkmdpa.taf;

import com.epam.reportportal.jbehave.ReportPortalFormat;
import com.epam.reportportal.jbehave.ReportPortalViewGenerator;
import net.serenitybdd.jbehave.SerenityStories;
import org.jbehave.core.configuration.Configuration;

public class AcceptanceTestSuite extends SerenityStories {
    public static String baseTestedUrl = new SerenityStories().getEnvironmentVariables().getProperty("webdriver.base.url");

    public Configuration configuration() {
        final Configuration configuration = super.configuration();
        return configuration
                .useStoryReporterBuilder(configuration.storyReporterBuilder().withFormats(ReportPortalFormat.INSTANCE))
                .useViewGenerator(new ReportPortalViewGenerator());
    }

}
