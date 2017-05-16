package com.tkmdpa.taf.preconditions;

import com.tkmdpa.taf.definitions.pantheon.UserLogInDefinition;
import com.tkmdpa.taf.definitions.products_and_docs.PD_GettingStartedDefinition;
import org.jbehave.core.annotations.BeforeStory;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import static net.serenitybdd.core.Serenity.getCurrentSession;

public class BeforeUserStory {

    static Logger LOGGER = LoggerFactory.getLogger(BeforeUserScenario.class);

    @BeforeStory()
    public void beforeStory () {
        LOGGER.info("PUT CREDENTIALS INTO CURRENT SESSION");

        UserLogInDefinition definition = new UserLogInDefinition();
        PD_GettingStartedDefinition fun = new PD_GettingStartedDefinition();

        getCurrentSession().put("username", definition.getLogin(parseJson("validUser")));
        getCurrentSession().put("password", definition.getPassword(parseJson("validUser")));

        getCurrentSession().put("prodUserName", fun.getLogin(parseJson("prodUser")));
        getCurrentSession().put("prodPassword", fun.getPassword(parseJson("prodUser")));
    }

    public JSONObject parseJson(String fileName){
        File file = new File(ClassLoader.getSystemResource("json/" + fileName + ".json").getFile());

        JSONParser parser = new JSONParser();

        Object obj = null;
        try {
            obj = parser.parse(new FileReader(file));
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = (JSONObject) obj;
        return jsonObject;
    }
}
