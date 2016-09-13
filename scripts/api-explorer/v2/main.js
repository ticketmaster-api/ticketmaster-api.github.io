var base = {};
var CONFIG_URL = '../../apidescription.xml';
var appVM, menuVM, filterVM, methodsVM, paramsVM;

//gets important elements from WADL document and writes them into global variables
var parseXMLDoc = function(xml){
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
var readFromWADL = function(){
  var xml;
  $.ajax({
    url: CONFIG_URL,
    async : false,
    dataType: ($.browser.msie) ? "text" : "xml",
    success : function(response){
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


/**
 * AppViewModel
 * @param base {object} global data object
 */
function AppViewModel(obj) {
  var base = obj || {};
  appVM = this;

  // sub-models
  this.filter = new FilterViewModel(base);
  this.menu = new MenuViewModel(base);
}

/**
 * Menu View-Model
 * @param base
 * @constructor
 */
function MenuViewModel(base) {
  menuVM = this;
  this.categories = ko.observableArray(Object.keys(base).map(function (item) {
    return {
      checked: ko.observable(false),
      name: item
    }
  }));

  // initial load
  this.selectCategory(Object.keys(base)[0]);
}

/**
 * Menu View-Model method
 * @param categoryName
 */
MenuViewModel.prototype.selectCategory = function (categoryName) {
  methodsVM.updateModel(categoryName);
  checkActive(menuVM.categories, categoryName);
};

/**
 * Filter View-Model
 * @param base
 * @constructor
 */
function FilterViewModel(base) {
  filterVM = this;

  // sub-models
  this.methods = new MethodsViewModel(base);
  this.params = new ParamsViewModel(base);

  // observables
  this.isEnabled = ko.observable(true);
}

/**
 * Methods View-Model
 * @param base
 * @constructor
 */
function MethodsViewModel(base) {
  methodsVM = this;

  // observables
  this.apikey = ko.observable('');
  this.radiosArr = ko.observableArray([]); // {method: 'str', checked: false}
  this.selectArr = ko.observableArray([]); // {name: 'str', checked: false, about: 'str'}
  this.selected = ko.observable('')
}

/**
 * Methods View-Model method
 * @param name
 */
MethodsViewModel.prototype.updateModel = function (name) {
  var radios = getModelArray({
    obj: base[name],
    arr: [{
      checked: true,
      name: 'ALL'
    }],
    prop:'method'
  });

  var options = getModelArray({
    obj: base[name],
    prop:'name'
  });

  methodsVM.radiosArr(radios);
  methodsVM.selectArr(options);
  methodsVM.selected('Choose method...');
};


/**
 * Params View-Model
 * @param base
 * @constructor
 */
function ParamsViewModel(base) {
  paramsVM = this;

  // observables
  this.fieldsArr = ko.observableArray([]); // {name: 'str', value: 'str', isDirty: false, valid: true, about: 'str'}
}



// Activates knockout.js
ko.applyBindings(new AppViewModel(base));


function getModelArray(params) {
  var obj = params.obj || {},
    arr = params.arr || [],
    prop = params.prop || 'name';

  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) { continue; }

    var item = arr.find(function (m1) {
      return m1.name === obj[i][prop];
    });

    if (item) { continue; }

    arr.push({
      checked: false,
      name: obj[i][prop]
    });
  }
  return arr;
}

function checkActive(koArr, activeElem) {
  if (!koArr && !activeElem) {return false;}

  koArr(koArr().map(function (obj) {
    if (obj.name === activeElem) {
      obj.checked(true);
    } else {
      obj.checked(false);
    }
    return obj;
  }));
}
