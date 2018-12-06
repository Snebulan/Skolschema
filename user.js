// ==UserScript==
// @name         Skola24 Schema
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Visa hela veckan
// @author       Sebastian
// @match        https://web.skola24.se/timetable/timetable-viewer/TUC.skola24.se/TUC/class/SYNE18LIN/
// @grant        none
// ==/UserScript==

setTimeout(function(){
    if(window.jQuery) {
        var debug = false;
        var today = new Date();
        var dayNames = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
        Date.prototype.getWeek = function() {
            var onejan = new Date(this.getFullYear(), 0, 1);
            return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
        }
        var weekNumber = today.getWeek();
        if(today.getDay() == 0 || today.getDay() == 6) {
            if(weekNumber>=52) {
                weekNumber = 1;
            } else {
                weekNumber+1;
            }
        }
        $('#selectedWeekDropDown').val(weekNumber);
        $('button:contains("Vecka")').click();
        if(debug) {
            console.log('Week: ',weekNumber);
            console.log('Day: ',today.getDay());
            console.log('Day: ',dayNames[today.getDay()]);
        }
    }
}, 1500);