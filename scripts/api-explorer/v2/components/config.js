var base = {};
var CONFIG_URL = '../../apidescription.xml';

//gets important elements from WADL document and writes them into global variables
var parseXMLDoc = function (xml) {
    //get all APIs
    var APIs = $(xml).find("resources"),
        isFirstMethod = true; //variable to store the very first method found

    APIs.each(function(){
        //get all methods in the API
        var methods = $(this).find('resource');

        methods.each(function(index, element){
            var me = $(element), //method
                method = $(me.find('method')[0]), //get method details object
                category = method.find('[primary="true"]').text(), //get API name
                params = me.find('param'), //method params
                parameters = {}; //temporary object to store param data

            params.each(function(index, element){ //fill param object with required data
                var that = $(this);
                parameters[that.attr('name')] = {
                    'name': that.attr('name'),
                    'required': that.attr('required'),
                    'type': that.attr('type'),
                    'style': that.attr('style'),
                    'default': that.attr('default'),
                    'doc': that.first('doc').text().trim()
                }
            });

            if (!base[category]){
                base[category] = {}; // create new API in base object if there is none
            }

            base[category][method.attr("id")] = {
                'id' : method.attr("id"), // method id
                'name' : method.attr("apigee:displayName") ? method.attr("apigee:displayName") : method.attr("id"), // method name
                'method' : method.attr('name'), // GET or POST
                'category' : category, // API name
                'path': me.attr('path'), // method URL
                'parameters': parameters, // method parameters
                'base' : me.parent().attr('base'), // method base link
                'documentation' : $(method.find('doc')[0]).attr('apigee:url'), // link to documentation
                'description' : $(method.find('doc')[0]).text().trim() //method description
            };
        });
    });
};

//gets document from WADL configuration file
var readFromWADL = function () {
    $.ajax({
        url: CONFIG_URL,
        async : false,
        dataType: ($.browser.msie) ? "text" : "xml",
        success : function(response){
            var xml;

            if (typeof response == "string"){
                xml = new ActiveXObject("Microsoft.XMLDOM");
                xml.async = false;
                xml.loadXML(response);
            } else {
                xml = response;
            }
            parseXMLDoc(xml);
        },

        error: function(XMLHttpRequest, textStatus, errorThrown){
            alert('Data Could Not Be Loaded - '+ textStatus);
        }
    });
};
readFromWADL();
module.exports = base;
