package com.tkmdpa.taf.preconditions;

import com.tkmdpa.taf.definitions.pantheon.UserLogInDefinition;
import org.jbehave.core.annotations.BeforeScenario;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import static net.serenitybdd.core.Serenity.getCurrentSession;

public class Before_User_Scenario {

    @BeforeScenario()
    public void beforeEachScenario () {
        System.out.println("Before Scenario ...");
        UserLogInDefinition definition = new UserLogInDefinition();

        //Before test is started we are going to put user credentials to current Session
        getCurrentSession().put("username", definition.getLogin(parseJson("validUser")));
        getCurrentSession().put("password", definition.getPassword(parseJson("validUser")));
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
