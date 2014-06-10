/*!
 * Ajax-Module - Medieninformatik 3
 *
 * Copyright(c) 2012 Bremen, Germany
 *
 * Author:
 *     Andre Koenig <akoenig@stud.hs-bremen.de>
 *
 * MIT Licensed
 *
 */

"use strict";

var Ajax = (function () {

	return {
		getJSON : function (url, callback) {
			if (!url) {
				throw new Error('getJSON: Bitte eine URL angeben.');
			}

			if (!callback || typeof callback !== 'function') {
				throw new Error('getJSON: Bitte eine Callback-Funktion angeben.');
			}

			var request = new XMLHttpRequest();

			request.addEventListener("load", function (evt) {
				try {
					var data = eval(evt.target.responseText);

					callback(data);
				} catch (e) {
					throw new Error('getJSON: Die JSON-Datei ist nicht valide. Bitte ueberpruefe die Syntax.');
				}
			});

			request.open('GET', url, false);
			request.send();
		}
	};

}());