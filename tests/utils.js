/*global define, console*/
define([],
    function () {

        'use strict';

        var Utils = function () {

            function replacePlaceholders(paths, FENIX_CDN) {
                for (var i in Object.keys(paths.paths)) {
                    if (paths.paths.hasOwnProperty(Object.keys(paths.paths)[i])) {
                        paths.paths[Object.keys(paths.paths)[i]] = paths.paths[Object.keys(paths.paths)[i]].replace('{FENIX_CDN}', FENIX_CDN);
                    }
                }
                return paths;
            }

            function createDiv(id) {
                var div = document.createElement("div");
                div.style.height = "450px";
                id = id || getRandomID();
                div.id = id;
                document.body.appendChild(div);
                return '#' + id;
            }

            function getRandomID() {
                return Math.random().toString(36).substring(7);
            }

            return {
                replacePlaceholders: replacePlaceholders,
                createDiv: createDiv
            };
        };
    return Utils();
});
