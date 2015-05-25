/*
Function to properly format params for REST / AJAX Requests
Accepts a config object as parameter. The object contains
**
controlClassName : The class of html controls from which to extract the parameter value.
Defaults to "request-controls"
**
**
requestParamNameAttribute : The html attribute from which to extract the parameter name
defaults to "data-request-param-name"
**
**
requestParamRequiredAttribute: The html attribute from which to extract the boolean value
indicating whether or not the given param should be required.
defaults to "data-param-required"
**
*/
function generateParam(configObject){
	//Init generatedParam
	var GenParam = {};
	//set default values
	configObject = configObject || {};
	configObject.controlClassName = configObject.controlClassName || "request-controls";
	configObject.requestParamNameAttribute = configObject.requestParamNameAttribute || "data-request-param-name";
	configObject.requestParamRequiredAttribute = configObject.requestParamRequiredAttribute || "data-param-required";
    
	//Get controls collection
	var controls = $("." + configObject.controlClassName);
	if(controls.size() < 1){
		return null;
	}

	controls.each(function(){
		var paramName = $(this).attr(configObject.requestParamNameAttribute);
		var paramIsRequired = $(this).attr(configObject.requestParamRequiredAttribute);
		var paramValue = $(this).val();
		if(paramValue == "" && !!paramIsRequired){
			return null; //return null because required param is missing.
		}
		if(paramValue !== ""){
			GenParam[paramName] = paramValue;
		}
	});
	return GenParam;
}

//No Jquery
function generateParamNJQ(configObject){
	//Init generatedParam
	var GenParam = {};
	//set default values
	configObject = configObject || {};
	configObject.controlClassName = configObject.controlClassName || "request-controls";
	configObject.requestParamNameAttribute = configObject.requestParamNameAttribute || "data-request-param-name";
	configObject.requestParamRequiredAttribute = configObject.requestParamRequiredAttribute || "data-param-required";
    
	//Get controls collection
	var controls = document.getElementsByClassName(configObject.controlClassName);
	if(controls.length< 1){
		return null;
	}
	var controlsLength = controls.length;
	for(var x = 0; x < controlsLength; x++){
		var control = controls[x];
		var paramName = control.getAttribute(configObject.requestParamNameAttribute);
		var paramIsRequired = control.getAttribute(configObject.requestParamRequiredAttribute);
		var paramValue = control.value;
		if(paramValue == "" && !!paramIsRequired){
			return null; //return null because required param is missing.
		}
		if(paramValue !== ""){
			GenParam[paramName] = paramValue;
		}

	} 
	return GenParam;
}