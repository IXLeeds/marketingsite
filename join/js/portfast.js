// some subs for compatibility in old school browsers

if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(fun /*, thisArg */) {
		"use strict";

		if (this === void 0 || this === null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function")
			throw new TypeError();

		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t)
			fun.call(thisArg, t[i], i, t);
		}
	};
}

if (!Object.keys) {
	Object.keys = (function () {
		var hasOwnProperty = Object.prototype.hasOwnProperty,
				hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
				dontEnums = [
					'toString',
					'toLocaleString',
					'valueOf',
					'hasOwnProperty',
					'isPrototypeOf',
					'propertyIsEnumerable',
					'constructor'
				],
				dontEnumsLength = dontEnums.length;

		return function (obj) {
			if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

			var result = [];

			for (var prop in obj) {
				if (hasOwnProperty.call(obj, prop)) result.push(prop);
			}

			if (hasDontEnumBug) {
				for (var i=0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
				}
			}
			return result;
		}
	})()
};

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

// IE sux

function toFixed(value, precision) {
    var power = Math.pow(10, precision || 0);
    return String(Math.round(value * power) / power);
}

// jquery ajax template

function ajaxReq(d) {
	if (d.data === undefined) {
		d.data = {};
	}

	resetFail(d.prefix);

	//d.data.token = readCookie('token');

	return(jQuery.ajax({
		url: d.url,
		type: 'POST',
		beforeSend: function(xhr) {
			xhr.setRequestHeader('X-Portfast-Token', readCookie('token'))
		},
		data: JSON.stringify(d.data, null, "  "),
		//data: JSON.stringify(d.data),
		contentType: "application/json",
		dataType: 'json',
		success: d.success,
		error: d.error
	}));

	/*
	// learn about jquery promises
	var xhr = new XMLHttpRequest();
	xhr.open("POST", d.url, true);
	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			switch (xhr.status) {
				case 200:
					d.success(JSON.parse(xhr.responseText));
					break;
				case 201:
					d.success({});
					break;
				case 202:
					d.success({});
					break;
				case 204:
					d.success({});
					break
				default:
					try {
						xhr.responseJSON = JSON.parse(xhr.responseText);
					}
					catch (err) {
						console.log("Could not decode: " + xhr.responseText);
					}
					d.error(xhr);
			}
		}
	}

	xhr.send(JSON.stringify(d.data));
	*/
}

function resetFail (prefix) {
	var r;
	if (prefix) {
		r = document.querySelectorAll('[id^="' + prefix + '"] [id$="-ct"]');
	} else {
		r = document.querySelectorAll('[id$="-ct"]');
	}
	for (var i=0; i<r.length; i++) {
		r[i].className = "";
	}
}

function processAjaxFail (xhr, su, prefix) {
	if (prefix === undefined) {
		prefix = "";
	}
	if (xhr.responseJSON) {
		alertSet(su,'danger',"<b>Error</b>: " + xhr.responseJSON.map(function(a) {return a.error}).join(", "));
		xhr.responseJSON.map(function(a) {return a.field}).forEach(function(f) {
			var ct = document.getElementById(prefix + f + "-ct");
			if (ct) {
				ct.className = "has-error";
			}
		});
	} else {
		alertSet(su,'danger',"<b>API error</b>: " + xhr.statusText + ((xhr.status == 500) ? " - support notified." : ""));
	}
}

function setSASending (su) {
	alertSet(su, 'info', "Sending to API...");
}

function setSASuccess (su, text) {
	if (text) {
		alertSet(su, 'success', "<b>Success</b>: " + text);
	} else {
		alertSet(su, 'success', "<b>Success</b>");
	}
}

function validate_v4_any (address) {
	if (address.match(/\//)) {
		return validate_v4_cidr(address);
	}
	return validate_v4(address);
}

function validate_v6_any (address) {
	if (address.match(/\//)) {
		return validate_v6_cidr(address);
	}
	return validate_v6(address);
}

function validate_v4_cidr (address) {
	var sm = address.match(/(.+)\/(\d+)/);

	if (! sm) {
		return false;
	}

	if (validate_v4(sm[1])) {
		if (sm[2] > 32) {
			return false;
		}
		return true;
	}
	return false;
}

function validate_v6_cidr (address) {
	var sm = address.match(/(.+)\/(\d+)/);

	if (! sm) {
		return false;
	}

	if (validate_v6(sm[1])) {
		if (sm[2] > 128) {
			return false;
		}
		return true;
	}
	return false;
}

function validate_v4 (address) {
	var br = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
	if (! br.test(address)) {
		return false;
	}
	var r = address.split('.');

	for (var i in r) {
		if (r[i] > 255) {
			return false;
		}
	}

	return true;
}

function validate_v6 (address) {
	var segment = address.split(':');
	if (segment.length > 7) {
		return false;
	}

	for (var i = 0; i < segment.length; i++) {
		if (segment[i].length > 4) {
			return false;
		}
		if (segment[i].match(/[^0-9a-f]/i)) {
			return false;
		}
	}

	return true;
}

// page building subs

function buildFormGroups (parent, data) {
	for (var i = 0; i < data.length; i++) {
		var fg = appendFormGroup(parent);
		buildFormItems(fg, data[i]);
	}
}

function buildFormItems (parent, data) {
	for (var i = 0; i < data.length; i++) {
		addFormItem(parent,data[i]);
	}
}

function addFormItem (fg,d) {
	var f = d[0];
	d[0] = fg;

	switch (f) {
		case "div":
			appendDiv.apply(null,d);
			break;
		case "labelDiv":
			appendLabelDiv.apply(null,d);
			break;
		case "object":
			appendObject.apply(null,d);
			break;
		case "legend":
			appendLegend.apply(null,d);
			break;
		case "formField":
			appendFormField.apply(null,d);
			break;
		case "formText":
			appendFormText.apply(null,d);
			break;
		case "formHTML":
			appendFormHTML.apply(null,d);
			break;
		case "formTextArea":
			appendFormTextArea.apply(null,d);
			break;
		case "formSelect":
			appendSelect.apply(null,d);
			break;
		case "formGroupedSelect":
			appendGroupedSelect.apply(null,d);
			break;
		case "ccSelect":
			appendCCSelect.apply(null,d);
			break;
		case "alert":
			appendAlert.apply(null,d);
			break;
		case "submitButton":
			appendSubmitButton.apply(null,d);
			break;
		case undefined:
			break;
		default:
			alert("unidentified type: " + f);
	}
}

function appendObject (parent, object) {
	parent.appendChild(object);
}

function appendLegend (parent, text) {
	var legend = document.createElement('legend');
	legend.appendChild(document.createTextNode(text));
	parent.appendChild(legend);
	return legend;
}

function appendDiv (parent, id) {
	var div = document.createElement('div');
	div.id = id;
	parent.appendChild(div);
	return div;
}

function appendPanel (parent, title) {
	var dp = document.createElement('div');
	dp.className = "panel panel-default";

	var t = document.createElement('div');
	var h = document.createElement('h3');
	h.appendChild(document.createTextNode(title));
	h.className = 'panel-title';
	t.appendChild(h);
	t.className = 'panel-heading';
	dp.appendChild(t);

	var db = document.createElement('div');
	db.className = 'panel-body';

	dp.appendChild(db);

	parent.appendChild(dp);
	return db;
}

function appendForm (parent) {
	var f = document.createElement('form');
	f.className = 'form-horizontal';
	parent.appendChild(f);
	return f;
}

function appendFormGroup (parent) {
	var fg = document.createElement('div');
	fg.className = 'form-group';
	parent.appendChild(fg);
	return fg;
}

function appendFormField (parent, id, title, placeholder, type, value) {
	var pd = document.createElement('div');
	pd.id = id + '-ct';

	var label = document.createElement('label');
	if (title !== undefined) {
		label.appendChild(document.createTextNode(title));
	}
	label.htmlFor = id;
	label.id = id + "-label";
	label.className = 'col-sm-3 control-label';
	pd.appendChild(label);

	var div = document.createElement('div');
	div.className = 'col-md-8 col-sm-9';
	pd.appendChild(div);

	var input;
	if (type == "checkbox") {
		input = document.createElement('button');
		input.id = id;

		input.type = 'button';
		input.className = 'btn btn-checkbox';

		var span = document.createElement('span');
		span.className = 'glyphicon glyphicon-unchecked';
		span.style.fontSize = '1.5em';
		input.appendChild(span);

		input.iSpan = span;
		input.checked = value;
		input.iSpan.className = (input.checked) ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked';
		input.iSpan.style.color = (input.checked) ? '#000' : '#888';

		input.onclick = function () {
			this.checked = ! this.checked;
			this.iSpan.className = (this.checked) ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked';
			input.iSpan.style.color = (input.checked) ? '#000' : '#888';
			if (input.onchange) {
				input.onchange();
			}
		}
	} else {
		input = document.createElement('input');
		input.id = id;

		if (placeholder !== undefined) {
			input.placeholder = placeholder;
		}
		input.className = "form-control";
		input.autocomplete = 'off';

		if (type) {
			input.type = type;
			switch (type) {
				case "number":
					input.step = "any";
					break;
				case "range":
					input.style.border = 'none';
					input.style.marginBottom = '2px';
					div.className = 'col-md-7 col-sm-8';

					var scale = document.createElement('div');
					scale.className = 'hidden-xs col-sm-1 form-control-static';
					scale.style.paddingLeft = '0px';
					scale.style.fontWeight = 'bold';
					scale.id = id + "-scale";

					pd.appendChild(scale);

					break;
			}
		} else {
			input.type = "text";
		}
		if (value && value.length) {
			input.value = value;
		}
	}

	div.appendChild(input);
	parent.appendChild(pd);
}

function appendLabelDiv (parent, title, id) {
	var label = document.createElement('label');
	label.appendChild(document.createTextNode(title));
	label.className = 'col-sm-3 control-label';
	parent.appendChild(label);

	var div = document.createElement('div');
	div.className = 'col-md-8 col-sm-9';
	div.id = id;
	parent.appendChild(div);
}

function appendFormText (parent, title, text, id) {
	var label = document.createElement('label');
	label.appendChild(document.createTextNode(title));
	label.className = 'col-sm-3 control-label';
	parent.appendChild(label);

	var div = document.createElement('div');
	div.className = 'col-md-8 col-sm-9';

	var p = document.createElement('p');
	//p.className = 'form-control-static';
	p.style.marginLeft = '1em';
	if (typeof text === "object") {
		p.appendChild(text);
		p.style.paddingTop = '7px';
	} else {
		p.className = 'form-control-static';
		p.appendChild(document.createTextNode(text));
	}
	p.id = id;

	div.appendChild(p);
	parent.appendChild(div);
}

function appendFormHTML (parent, title, text, id) {
	var label = document.createElement('label');
	label.appendChild(document.createTextNode(title));
	label.className = 'col-sm-3 control-label';
	parent.appendChild(label);

	var div = document.createElement('div');
	div.className = 'col-md-8 col-sm-9';

	var p = document.createElement('p');
	p.style.marginLeft = '1em';

	p.className = 'form-control-static';
	p.innerHTML = text;

	p.id = id;

	div.appendChild(p);
	parent.appendChild(div);
}

function appendFormTextArea (parent, id, title, placeholder, value) {
	var pd = document.createElement('div');
	pd.id = id + '-ct';

	var label = document.createElement('label');
	label.appendChild(document.createTextNode(title));
	label.className = 'col-sm-3 control-label';
	pd.appendChild(label);

	var div = document.createElement('div');
	div.className = 'col-md-8 col-sm-9';

	var ta = document.createElement('textarea');
	ta.className = 'form-control';
	ta.id = id;
	if (value !== undefined) {
		ta.value = value;
	}
	if (placeholder !== undefined) {
		ta.placeholder = placeholder;
	}

	div.appendChild(ta);
	pd.appendChild(div);
	parent.appendChild(pd);
}

function appendSubmitButton (parent, id, text, bclass) {
	var div = document.createElement('div');
	div.className = 'col-sm-offset-3 col-sm-9'

	var button = document.createElement('input');
	button.type = 'submit';
	button.className = 'btn btn-' + ((bclass) ? bclass : 'default');
	button.id = id;

	button.value = text;

	div.appendChild(button);
	parent.appendChild(div);

	return button;
}

function mformat (n) {
	var nf;

	if (n >= 1099511627776 * 9.995) {
		var nf = toFixed(n / 1099511627776);
		nf += 'TB';
	} else if (n >= 1099511627776) {
		var nf = toFixed(n / 1099511627776,2);
		nf += 'TB';
	} else if (n >= 1073741824 * 9.995) {
		var nf = toFixed(n / 1073741824);
		nf += 'GB';
	} else if (n >= 1073741824) {
		var nf = toFixed(n / 1073741824,2);
		nf += 'GB';
	} else if (n >= 1048576 * 9.995) {
		var nf = toFixed(n / 1048576);
		nf += 'MB';
	} else if (n >= 1048576) {
		var nf = toFixed(n / 1048576,2);
		nf += 'MB';
	} else if (n >= 1024 * 9.995) {
		var nf = toFixed(n / 1024);
		nf += 'KB';
	} else if (n >= 1024) {
		var nf = toFixed(n / 1024,2);
		nf += 'KB';
	} else {
		var nf = toFixed(n);
		nf += ' bytes';
	}

	return nf;
}

function appendGroupedSelect (parent, name, description, content, value) {
	var div = document.createElement('div');
	div.id = name + '-ct';

	var ddd = document.createElement('div');
	var label = document.createElement('label');

	div.appendChild(label);
	div.appendChild(ddd);
	parent.appendChild(div);

	label.className = 'control-label col-sm-3';
	label.innerHTML = description;

	ddd.className = 'col-md-8 col-sm-9';

	input = document.createElement('select');
	input.className = "form-control";
	input.value = value;
	input.id = name;

	content.forEach(function(i) {
		var og = document.createElement('optgroup');
		og.label = i[0];
		appendSelectOptions(og, i[1], value);
		input.appendChild(og);
	});

	label.htmlFor = input.id;
	ddd.appendChild(input);
}

function appendSelect (parent, name, description, content, value) {
	var div = document.createElement('div');
	div.id = name + '-ct';

	var ddd = document.createElement('div');
	var label = document.createElement('label');

	div.appendChild(label);
	div.appendChild(ddd);
	parent.appendChild(div);

	label.className = 'control-label col-sm-3';
	label.innerHTML = description;

	ddd.className = 'col-md-8 col-sm-9';

	input = document.createElement('select');
	input.className = "form-control";
	input.value = value;
	input.id = name;

	appendSelectOptions(input, content, value);

	label.htmlFor = input.id;
	ddd.appendChild(input);
}

function appendSelectOptions(parent, content, value) {
	for (i=0; i<content.length; i++) {
		option = document.createElement('option');
		option.value = content[i][0];
		text = document.createTextNode(content[i][1]);

		if (content[i][0] === value) {
			option.selected = true;
		}

		option.appendChild(text);
		parent.appendChild(option);
	}
}

function appendCCSelect (parent, name, description, value) {
	if (! value) {
		value = "GB";
	}
	var div = document.createElement('div');
	div.id = name + '-ct';

	var ddd = document.createElement('div');
	var label = document.createElement('label');

	div.appendChild(label);
	div.appendChild(ddd);
	parent.appendChild(div);

	$.ajax({
		url: "/static/countrycodes.json",
		type: "GET",
		dataType: 'json',
		success: function (data) {
			//label.className = classes.controlLabel;
			label.className = 'control-label col-sm-3';
			label.innerHTML = description;

			//div.className = classes.input;
			ddd.className = 'col-md-8 col-sm-9';

			input = document.createElement('select');
			input.className = "form-control";
			input.value = value;
			input.id = name;

			for (var country in data) {
				option = document.createElement('option');
				option.value = country;
				text = document.createTextNode(data[country]);

				if (country === value) {
					option.selected = true;
				}

				option.appendChild(text);
				input.appendChild(option);
			}

			label.htmlFor = input.id;

			ddd.appendChild(input);
		}
	});
}

function appendAlert (parent, id) {
	var odiv = document.createElement('div');
	odiv.className = 'col-sm-offset-3 col-md-8 col-sm-9'

	var idiv = document.createElement('div');
	idiv.id = id;
	idiv.style.display = 'none';

	odiv.appendChild(idiv);
	parent.appendChild(odiv);

	return odiv;
}

function alertSet (alert, status, message) {
	alert.className = 'alert alert-' + status;
	// options are success info warning danger
	alert.style.display = 'block';
	alert.innerHTML = message;

//	if (status === "success") {
//		window.setTimeout(function () { alert.style.display = 'none' }, 1000);
//	}
}

function displayError (su, request, errorThrown) {
	var err;
	if (request.responseJSON) {
		err = request.responseJSON.map(function(a) {return a.error}).join(", ");
	} else {
		err = errorThrown;
	}
	alertSet(su,'danger','<b>Failed</b>: ' + err);
}


function addCol (row,r_text,className) {
	td = document.createElement('td');
	if (r_text === null) {
	} else if (typeof r_text === "object") {
		td.appendChild(r_text);
	} else {
		text = document.createTextNode(r_text);
		td.appendChild(text);
	}
	if (className) {
		td.className = className;
	}
	row.appendChild(td);
	return td;
}

//Object.prototype.removeChildren = function () {
//	while (Object.firstChild) {
//		Object.removeChild(Object.firstChild);
//	}
//}

function removeChildren (o) {
	while (o.firstChild) {
		o.removeChild(o.firstChild);
	}
}

function addButton (action) {
	var ab = document.createElement('span');
	ab.className = "addbutton glyphicon glyphicon-plus-sign";

	ab.onclick = action;
	return ab;
}


function removeButton (action) {
	var rm = document.createElement('span');
	rm.className = "removebutton glyphicon glyphicon-remove-sign";

	rm.onclick = action;
	return rm;
}

function createTable (parent, id, headers) {
	var table = document.createElement('table');
	table.className = 'table table-condensed';

	var thead = document.createElement('thead');
	var tr = document.createElement('tr');
	for (i=0; i<headers.length; i++) {
		var th = document.createElement('th');
		th.appendChild(document.createTextNode(headers[i]));
		tr.appendChild(th);
	}
	thead.appendChild(tr);
	table.appendChild(thead);

	var tbody = document.createElement('tbody');
	tbody.id = id;
	table.appendChild(tbody);

	if (parent) {
		parent.appendChild(table);
	}

	return tbody;
}
