package com.tkmdpa.taf;

import com.epam.reportportal.jbehave.ReportPortalFormat;
import com.epam.reportportal.jbehave.ReportPortalViewGenerator;
import net.serenitybdd.jbehave.SerenityStories;
import org.jbehave.core.configuration.MostUsefulConfiguration;
import org.jbehave.core.reporters.StoryReporterBuilder;

public class AcceptanceTestSuite extends SerenityStories {
    public static String baseTestedUrl = new SerenityStories().getEnvironmentVariables().getProperty("webdriver.base.url");


    public AcceptanceTestSuite() {
        new MostUsefulConfiguration()
                .useStoryReporterBuilder(new StoryReporterBuilder()
                        .withFormats(ReportPortalFormat.INSTANCE))
                .useViewGenerator(new ReportPortalViewGenerator());
    }
}
