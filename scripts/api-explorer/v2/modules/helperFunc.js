exports.getModelArray = function getModelArray(params) {
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
            checked: ko.observable(false),
            name: obj[i][prop]
        });
    }
    return arr;
};

exports.checkActive = function checkActive(koArr, activeElem) {
    if (!koArr && !activeElem) {return false;}

    koArr(koArr().map(function (obj) {
        if (obj.name === activeElem) {
            obj.checked(true);
        } else {
            obj.checked(false);
        }
        return obj;
    }));
};

exports.iterate = function (obj) {
	for (var property in obj) {
		if (obj.hasOwnProperty(property)) {
			if (typeof obj[property] == "object") {
				iterate(obj[property]);
			}
			else {
				console.log('|' + property + " |  " + obj[property] + '|');
			}
		}
	}
};

