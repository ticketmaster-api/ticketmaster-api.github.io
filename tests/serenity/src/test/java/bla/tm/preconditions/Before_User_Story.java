package bla.tm.preconditions;

import bla.tm.definitions.site.pantheon.UserLogInDefinition;
import org.jbehave.core.annotations.BeforeScenario;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.FileReader;
import java.io.IOException;

import static net.serenitybdd.core.Serenity.getCurrentSession;

public class Before_User_Story {

    @BeforeScenario()
    public void putUserCredsInSession () throws IOException, ParseException {
        System.out.println("Before Story ...");
        UserLogInDefinition definition = new UserLogInDefinition();

        //Before test is started we are going to put user credentials to current Session
        getCurrentSession().put("username", definition.getLogin(parseJson()));
        getCurrentSession().put("password", definition.getPassword(parseJson()));
    }

    public JSONObject parseJson(){
        JSONParser parser = new JSONParser();

        Object obj = null;
        try {
            obj = parser.parse(new FileReader(System.getProperty("user.dir") + "\\src\\test\\resources\\json\\users.json"));
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = (JSONObject) obj;
        return jsonObject;
    }

}
