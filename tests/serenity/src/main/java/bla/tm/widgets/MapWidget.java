package bla.tm.widgets;

import net.serenitybdd.core.annotations.ImplementedBy;

@ImplementedBy(MapWidgetImpl.class)
public interface MapWidget extends AnsestorWidget{

    String getCityFieldValue();
}
