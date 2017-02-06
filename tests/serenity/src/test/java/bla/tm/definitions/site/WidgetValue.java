package bla.tm.definitions.site;

import org.jbehave.core.model.ExamplesTable;
import org.jbehave.core.steps.Parameters;

/**
 * Created by Maksym_Mazurkevych on 2/5/2017.
 */
public class WidgetValue {

    protected String apiKey;
    protected String keyWord;
    protected String zipCode;
    protected String city;
    protected String attractionId;
    protected String venueId;
    protected String promoterId;
    protected String source;
    protected String countryCode;
    protected String classificationName;
    protected String eventCount;

    protected void getWidgetValues(ExamplesTable valuesTable) {
        for (Parameters row : valuesTable.getRowsAsParameters()) {
            apiKey = row.valueAs("apiKey", String.class);
            keyWord = row.valueAs("keyWord", String.class);
            zipCode = row.valueAs("zipCode", String.class);
            city = row.valueAs("city", String.class);
            attractionId = row.valueAs("attractionId", String.class);
            venueId = row.valueAs("venueId", String.class);
            promoterId = row.valueAs("promoterId", String.class);
            source = row.valueAs("source", String.class);
            countryCode = row.valueAs("countryCode", String.class);
            classificationName = row.valueAs("classificationName", String.class);
            eventCount = row.valueAs("eventCount", String.class);
        }
    }

}
