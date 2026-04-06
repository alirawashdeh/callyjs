"use strict";
var AFTERNOON_TIME = 14;
var EVENING_TIME = 20;
var MORNING_TIME = 10;
var MIDDAY_TIME = 12;

function Cally(text, currentdate) {

  this.startdate = currentdate;
  this.enddate = currentdate;
  this.allday = false;

  this.startdatefound = false;
  this.enddatefound = false;
  this.starttimefound = false;
  this.endtimefound = false;

  this.subject = "";
  this.subjectfound = false;

  this.pmKeywordFound = false; // set to true if "afternoon, evening, tonight" keywords found

  var subjectstart = 0;
  var subjectend;

  this.textString = "";
  this.textStringLower = "";

  // Helper functions
  this.isUntilExpression = function(pos) {
    var beforeMatch = this.textStringLower.substring(0, pos);
    return beforeMatch.match(/\buntil\b/);
  };

  this.setStartTime = function(hours, minutes) {
    minutes = minutes || 0;
    this.startdate.setHours(hours, minutes, 0, 0);
    this.starttimefound = true;
  };

  this.setEndTime = function(hours, minutes) {
    minutes = minutes || 0;
    this.enddate = new Date(this.startdate.getFullYear(), this.startdate.getMonth(), this.startdate.getDate(), hours, minutes, 0, 0);
    this.endtimefound = true;
  };

  this.createDateFromTime = function(hours, minutes) {
    minutes = minutes || 0;
    return new Date(this.startdate.getFullYear(), this.startdate.getMonth(), this.startdate.getDate(), hours, minutes, 0, 0);
  };

  this.parse = function() {
    if (this.textString.length > 0) {
      this.findDayOfWeek(); //e.g. Monday Tuesday
      if (!this.startdatefound) {
        this.findDateKeyword(); //e.g. Tonight, Tomorrow, Next Year, in 1 month
      }
      this.findDateAndMonth();
      this.findTimeKeyword(); // e.g. evening, morning, in 1 hour
      this.findTimeNumber(); // e.g. 3PM, 15:00
      this.findDuration(); // e.g. for 2 hours
      this.findUntil(); // e.g. until 5pm

      if (this.starttimefound === false) {
        this.startdate.setHours(0, 0, 0, 0);
      }

      if (!this.endtimefound) {
        this.enddate = new Date(this.startdate);
      }

      this.findAllDayKeyword(); // e.g. all day
      this.populateSubject(); // e.g. 'Meet John'

      if (this.endtimefound === false) {
        this.enddate.setHours(0, 0, 0, 0);
      }
      
      // For all-day events, reset end time to midnight even if duration was found
      if (this.allday && this.endtimefound) {
        this.enddate.setHours(0, 0, 0, 0);
      }
    }
  };


  // Find day of week e.g. Monday, Mon, Tuesday etc.
  this.findDayOfWeek = function() {
    var days = [
      { name: 'sun|sunday', index: 0 },
      { name: 'monday|mon', index: 1 },
      { name: 'tuesday|tues|tue', index: 2 },
      { name: 'wednesday|wed', index: 3 },
      { name: 'thursday|thurs|thur|thu', index: 4 },
      { name: 'friday|fri', index: 5 },
      { name: 'saturday|sat', index: 6 }
    ];

    for (var i = 0; i < days.length; i++) {
      var day = days[i];
      var regexPattern = new RegExp('([^a-z]+|^)(on |this )*(' + day.name + ')([^a-z]+|$)');
      var regexPos = this.textStringLower.search(regexPattern);

      if (regexPos > -1) {
        var nextFound = this.findNext(regexPos);
        this.setSubjectEndPos(regexPos);
        this.setDayOfWeek(day.index, nextFound);
        break;
      }
    }
  };

  // returns true if the word "next" appears immediately prior to the position supplied
  // used for e.g. "next Monday"
  this.findNext = function(dayPos) {
    var regexNextPos = this.textStringLower.substring(0, dayPos + 1).search(/(next )$/);
    if (regexNextPos > -1) {
      this.setSubjectEndPos(regexNextPos);
      return true;
    }
    return false;
  };

  // Sets day of week, e.g. "0" for Sunday, "1" for Monday
  this.setDayOfWeek = function(day, nextFound) {
    var defaultDate = this.startdate ? this.startdate : new Date();
    var currentDay = defaultDate.getDay();
    var diff = 0; // Number of days away the found day is

    if (currentDay >= day) {
      diff = day + 7 - currentDay;
    } else {
      diff = day - currentDay;
    }

    if (nextFound) {
      // if it's a Saturday, all but "next sat" should be >7 days away
      if ((currentDay == 6)) {
        if (diff < 7) {
          diff = diff + 7;
        }
      } else {
        // if it's a sunday, all but "next sat" / "next sun" is >7 days away
        if ((currentDay === 0)) {
          if (diff < 6) {
            diff = diff + 7;
          }
        } else {
          // if found day is past Saturday, add 7 days
          if (diff < (8 - currentDay)) {
            diff = diff + 7;
          }
        }
      }

    }
    defaultDate.setDate(defaultDate.getDate() + diff);
    this.startdate = defaultDate;
    this.startdatefound = true;
  };

  // Find date and month - e.g. on 12th November
  this.findDateAndMonth = function() {
    var months = [
      { name: 'jan', fullName: 'january', index: 0 },
      { name: 'feb', fullName: 'february', index: 1 },
      { name: 'mar', fullName: 'march', index: 2 },
      { name: 'apr', fullName: 'april', index: 3 },
      { name: 'may', fullName: 'may', index: 4 },
      { name: 'jun', fullName: 'june', index: 5 },
      { name: 'jul', fullName: 'july', index: 6 },
      { name: 'aug', fullName: 'august', index: 7 },
      { name: 'sep', fullName: 'september', index: 8 },
      { name: 'oct', fullName: 'october', index: 9 },
      { name: 'nov', fullName: 'november', index: 10 },
      { name: 'dec', fullName: 'december', index: 11 }
    ];

    for (var i = 0; i < months.length; i++) {
      var month = months[i];
      var regexPattern = new RegExp('([^a-z0-9]+|^)(on |on the )?([1-9][0-9]*)(st|nd|rd|th)?( of)?( ' + month.name + '| ' + month.fullName + ')([^a-z]+|$)');
      var regexPos = this.textStringLower.search(regexPattern);

      if (regexPos > -1) {
        var matches = this.textStringLower.match(regexPattern);
        if (matches && matches[3]) {
          var newDate = new Date(this.startdate.getFullYear(), month.index, Number(matches[3]));
          
          if (newDate < this.startdate) {
            this.startdate.setFullYear(newDate.getFullYear() + 1);
          }
          this.startdate.setDate(newDate.getDate());
          this.startdate.setMonth(newDate.getMonth());
        }
        this.setSubjectEndPos(regexPos);
        this.startdatefound = true;
        break;
      }
    }
  };

  // Find date keyword - e.g. Today, Tomorrow, Next Week
  this.findDateKeyword = function() {
    var defaultDate = this.startdate ? this.startdate : new Date();
    
    var dateKeywords = [
      {
        regex: /([^a-z]+|^)(today)([^a-z]+|$)/,
        handler: function() {
          this.startdatefound = true;
        }
      },
      {
        regex: /([^a-z]+|^)(tomorrow)([^a-z]+|$)/,
        handler: function() {
          this.startdate.setDate(defaultDate.getDate() + 1);
          this.startdatefound = true;
        }
      },
      {
        regex: /([^a-z]+|^)(this afternoon)([^a-z]+|$)/,
        handler: function() {
          this.startdatefound = true;
          this.starttimefound = true;
          this.startdate.setHours(AFTERNOON_TIME, 0, 0, 0);
          this.pmKeywordFound = true;
        }
      },
      {
        regex: /([^a-z]+|^)(tonight)|(this evening)([^a-z]+|$)/,
        handler: function() {
          this.startdatefound = true;
          this.starttimefound = true;
          this.startdate.setHours(EVENING_TIME, 0, 0, 0);
          this.pmKeywordFound = true;
        }
      },
      {
        regex: /([^a-z]+|^)(in the morning)([^a-z]+|$)/,
        handler: function() {
          this.startdatefound = true;
          this.starttimefound = true;
          this.startdate.setDate(defaultDate.getDate() + 1);
          this.startdate.setHours(MORNING_TIME, 0, 0, 0);
        }
      },
      {
        regex: /([^a-z]+|^)(next week)([^a-z]+|$)/,
        handler: function() {
          this.startdatefound = true;
          this.startdate.setDate(defaultDate.getDate() + 7);
        }
      },
      {
        regex: /([^a-z]+|^)(next month)([^a-z]+|$)/,
        handler: function() {
          this.startdatefound = true;
          this.startdate.setMonth(defaultDate.getMonth() + 1);
        }
      },
      {
        regex: /([^a-z]+|^)(next year)([^a-z]+|$)/,
        handler: function() {
          this.startdatefound = true;
          this.startdate.setFullYear(defaultDate.getFullYear() + 1);
        }
      }
    ];

    var numericPatterns = [
      {
        regex: /([^a-z]+|^)(in )([1-9][0-9]*)( days| day)([^a-z]+|$)/,
        handler: function(matches) {
          this.startdate.setDate(defaultDate.getDate() + Number(matches[3]));
        }
      },
      {
        regex: /([^a-z]+|^)(in )([1-9][0-9]*)( weeks| week)([^a-z]+|$)/,
        handler: function(matches) {
          this.startdate.setDate(defaultDate.getDate() + (Number(matches[3]) * 7));
        }
      },
      {
        regex: /([^a-z]+|^)(in )([1-9][0-9]*)( months| month)([^a-z]+|$)/,
        handler: function(matches) {
          this.startdate.setMonth(defaultDate.getMonth() + Number(matches[3]));
        }
      },
      {
        regex: /([^a-z]+|^)(in )([1-9][0-9]*)( years| year)([^a-z]+|$)/,
        handler: function(matches) {
          this.startdate.setFullYear(defaultDate.getFullYear() + Number(matches[3]));
        }
      }
    ];

    // Check simple keywords first
    for (var i = 0; i < dateKeywords.length; i++) {
      var keyword = dateKeywords[i];
      var pos = this.textStringLower.search(keyword.regex);
      
      if (pos > -1) {
        keyword.handler.call(this);
        this.setSubjectEndPos(pos);
        return;
      }
    }

    // Check numeric patterns
    for (var j = 0; j < numericPatterns.length; j++) {
      var pattern = numericPatterns[j];
      var numericPos = this.textStringLower.search(pattern.regex);
      
      if (numericPos > -1) {
        var matches = this.textStringLower.match(pattern.regex);
        if (matches && matches[3]) {
          this.startdatefound = true;
          pattern.handler.call(this, matches);
        }
        this.setSubjectEndPos(numericPos);
        return;
      }
    }
  };

  // Find time keyword - e.g. Morning, Afternoon, Evening
  this.findTimeKeyword = function() {
    var timeKeywords = [
      {
        regex: /([^a-z]+|^)(morning)([^a-z]+|$)/,
        handler: function() {
          this.starttimefound = true;
          this.startdate.setHours(MORNING_TIME, 0, 0, 0);
        }
      },
      {
        regex: /([^a-z]+|^)(afternoon)([^a-z]+|$)/,
        handler: function() {
          this.starttimefound = true;
          this.startdate.setHours(AFTERNOON_TIME, 0, 0, 0);
          this.pmKeywordFound = true;
        }
      },
      {
        regex: /([^a-z]+|^)(night)|(evening)([^a-z]+|$)/,
        handler: function() {
          this.starttimefound = true;
          this.startdate.setHours(EVENING_TIME, 0, 0, 0);
          this.pmKeywordFound = true;
        }
      },
      {
        regex: /([^a-z]+|^)(noon)|(midday)([^a-z]+|$)/,
        handler: function() {
          this.starttimefound = true;
          this.startdate.setHours(MIDDAY_TIME, 0, 0, 0);
        }
      }
    ];

    var timePatterns = [
      {
        regex: /([^a-z]+|^)(in )([1-9][0-9]*)( hours| hour)([^a-z]+|$)/,
        handler: function(matches) {
          this.starttimefound = true;
          this.startdate.setHours(this.startdate.getHours() + Number(matches[3]));
        }
      },
      {
        regex: /([^a-z]+|^)(in )([1-9][0-9]*)( minutes| minute)([^a-z]+|$)/,
        handler: function(matches) {
          this.starttimefound = true;
          this.startdate.setMinutes(this.startdate.getMinutes() + Number(matches[3]));
        }
      }
    ];

    // Check simple keywords first
    for (var i = 0; i < timeKeywords.length; i++) {
      var keyword = timeKeywords[i];
      var pos = this.textStringLower.search(keyword.regex);
      
      if (pos > -1) {
        keyword.handler.call(this);
        this.setSubjectEndPos(pos);
        return;
      }
    }

    // Check time patterns
    for (var j = 0; j < timePatterns.length; j++) {
      var pattern = timePatterns[j];
      var timePos = this.textStringLower.search(pattern.regex);
      
      if (timePos > -1) {
        var matches = this.textStringLower.match(pattern.regex);
        if (matches && matches[3]) {
          pattern.handler.call(this, matches);
        }
        this.setSubjectEndPos(timePos);
        return;
      }
    }
  };

  // Find time number - e.g. 3PM, 15:00
  this.findTimeNumber = function() {
    var expressionPrefix = "([^a-z]+|^)(at |starting at )";
    var expressionSuffix = "([^a-z]+|$)";

    var timePatterns = [
      {
        name: 'PM time',
        searchRegex: expressionPrefix + "*[0-1]*[0-9](:[0-5][0-9])?(pm| pm)" + expressionSuffix,
        matchRegex: /([0-1]*[0-9])(:([0-5][0-9]))?( pm|pm| am|am)/,
        handler: function(matches) {
          var hours = Number(matches[1]) + 12;
          if (hours == 24) hours = 12;
          var minutes = matches[3] ? Number(matches[3]) : 0;
          this.setStartTime(hours, minutes);
        }
      },
      {
        name: 'AM time',
        searchRegex: expressionPrefix + "*[0-1]*[0-9](:[0-5][0-9])?(am| am)" + expressionSuffix,
        matchRegex: /([0-1]*[0-9])(:([0-5][0-9]))?( pm|pm| am|am)/,
        handler: function(matches) {
          var hours = Number(matches[1]);
          if (hours == 12) hours = 0;
          var minutes = matches[3] ? Number(matches[3]) : 0;
          this.setStartTime(hours, minutes);
        }
      },
      {
        name: '24-hour time',
        searchRegex: expressionPrefix + "*[0-2]*[0-9](:[0-5][0-9])" + expressionSuffix,
        matchRegex: /([0-2]*[0-9])(:([0-5][0-9]))/,
        handler: function(matches) {
          var hours = Number(matches[1]);
          var minutes = matches[3] ? Number(matches[3]) : 0;
          this.setStartTime(hours, minutes);
        }
      },
      {
        name: '4-digit time',
        searchRegex: expressionPrefix + "*[0-2][0-9]([0-5][0-9])" + expressionSuffix,
        matchRegex: /([0-2][0-9])([0-5][0-9])/,
        handler: function(matches) {
          var hours = Number(matches[1]);
          var minutes = matches[2] !== null ? Number(matches[2]) : 0;
          this.setStartTime(hours, minutes);
        }
      },
      {
        name: '2-digit time',
        searchRegex: expressionPrefix + "([0-1]*[0-9])" + expressionSuffix,
        matchRegex: expressionPrefix + "([0-1]*[0-9])" + expressionSuffix,
        handler: function(matches) {
          var hours = Number(matches[3]);
          if (hours <= 12) {
            if (!this.startdatefound && hours <= this.startdate.getHours()) {
              hours += 12;
            }
          }
          this.setStartTime(hours, 0);
        }
      },
      {
        name: 'Half past',
        searchRegex: expressionPrefix + "*(half past |half )([1-9][0-9]*)" + expressionSuffix,
        matchRegex: expressionPrefix + "*(half past |half )([1-9][0-9]*)" + expressionSuffix,
        handler: function(matches) {
          var hours = Number(matches[4]);
          this.setStartTime(hours, 30);
        }
      },
      {
        name: 'Quarter past',
        searchRegex: expressionPrefix + "*(quarter past )([1-9][0-9]*)" + expressionSuffix,
        matchRegex: expressionPrefix + "*(quarter past )([1-9][0-9]*)" + expressionSuffix,
        handler: function(matches) {
          var hours = Number(matches[4]);
          this.setStartTime(hours, 15);
        }
      },
      {
        name: 'Quarter to',
        searchRegex: expressionPrefix + "*(quarter to )([1-9][0-9]*)" + expressionSuffix,
        matchRegex: expressionPrefix + "*(quarter to )([1-9][0-9]*)" + expressionSuffix,
        handler: function(matches) {
          var hours = Number(matches[4]) - 1;
          this.setStartTime(hours, 45);
        }
      },
      {
        name: 'Time number words',
        searchRegex: expressionPrefix + "(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)(am| am)?(pm| pm)?" + expressionSuffix,
        matchRegex: expressionPrefix + "(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)(am| am)?(pm| pm)?" + expressionSuffix,
        handler: function(matches) {
          var hours = this.convertTimeNumber(matches[3]);
          if (hours <= 12) {
            if (!this.startdatefound && hours <= this.startdate.getHours()) {
              hours += 12;
            }
          }
          this.setStartTime(hours, 0);
          if(matches[5]){
            this.pmKeywordFound = true;
          }
        }
      }
    ];

    // Check each time pattern
    for (var i = 0; i < timePatterns.length; i++) {
      var pattern = timePatterns[i];
      var pos = this.textStringLower.search(pattern.searchRegex);
      
      if (pos > -1) {
        // Check if this time is part of an "until" expression
        if (this.isUntilExpression(pos)) {
          continue; // Skip times that are part of "until X"
        }
        
        var matches = this.textStringLower.match(pattern.matchRegex);
        if (matches) {
          pattern.handler.call(this, matches);
        }
        this.setSubjectEndPos(pos);
        break;
      }
    }

    // Apply PM adjustment if needed
    if (this.pmKeywordFound) {
      if (this.startdate.getHours() <= 12) {
        this.startdate.setHours(this.startdate.getHours() + 12);
      }
    }
  };


  // Find duration - e.g. for 2 hours or for one hour
  this.findDuration = function() {
    var durationPatterns = [
      {
        name: 'minutes',
        regex: /([^a-z]+|^)(for )([1-9][0-9]*|one|two|three|four|five|six|seven|eight|nine|a|an)( minutes| mins| min| minute)([^a-z]+|$)/,
        multiplier: 60000 // milliseconds in a minute
      },
      {
        name: 'hours', 
        regex: /([^a-z]+|^)(for )([1-9][0-9]*|one|two|three|four|five|six|seven|eight|nine|a|an)( hours| hour)([^a-z]+|$)/,
        multiplier: 3600000 // milliseconds in an hour
      },
      {
        name: 'days',
        regex: /([^a-z]+|^)(for )([1-9][0-9]*|one|two|three|four|five|six|seven|eight|nine|a|an)( days| day)([^a-z]+|$)/,
        multiplier: 86400000 // milliseconds in a day
      },
      {
        name: 'weeks',
        regex: /([^a-z]+|^)(for )([1-9][0-9]*|one|two|three|four|five|six|seven|eight|nine|a|an)( weeks| week| wk| wks)([^a-z]+|$)/,
        multiplier: 604800000 // milliseconds in a week (7 days)
      },
      {
        name: 'months',
        regex: /([^a-z]+|^)(for )([1-9][0-9]*|one|two|three|four|five|six|seven|eight|nine|a|an)( months| month)([^a-z]+|$)/,
        isMonth: true // Special handling for months
      },
      {
        name: 'years',
        regex: /([^a-z]+|^)(for )([1-9][0-9]*|one|two|three|four|five|six|seven|eight|nine|a|an)( years| year)([^a-z]+|$)/,
        isYear: true // Special handling for years
      }
    ];

    for (var i = 0; i < durationPatterns.length; i++) {
      var pattern = durationPatterns[i];
      var pos = this.textStringLower.search(pattern.regex);
      
      if (pos > -1) {
        var matches = this.textStringLower.match(pattern.regex);
        if (matches && matches[3]) {
          this.endtimefound = true;
          
          // If no explicit start time was found, set default start time
          if (!this.starttimefound) {
            this.starttimefound = true;
          }
          
          // Convert word number to digit, handling "a" and "an" as 1
          var duration = this.convertTimeNumber(matches[3]);
          if (duration === 0 && (matches[3] === 'a' || matches[3] === 'an')) {
            duration = 1;
          }
          duration = duration || parseInt(matches[3]) || 0;
          
          // Special handling for months (can't use milliseconds)
          if (pattern.isMonth) {
            this.enddate = new Date(this.startdate);
            this.enddate.setMonth(this.enddate.getMonth() + duration);
          } else if (pattern.isYear) {
            this.enddate = new Date(this.startdate);
            this.enddate.setFullYear(this.enddate.getFullYear() + duration);
          } else {
            this.enddate = new Date(this.startdate.getTime() + duration * pattern.multiplier);
          }

          if((this.enddate.getDate() != this.startdate.getDate()) ||
          (this.enddate.getMonth() != this.startdate.getMonth()) ||
          (this.enddate.getFullYear() != this.startdate.getFullYear())) {
            this.enddatefound = true;
          }
        }
        this.setSubjectEndPos(pos);
        break;
      }
    }
  };



  // Find all day keyword - e.g. "all day"
  this.findAllDayKeyword = function() {

    var regexAllDayPos = this.textStringLower.search(/([^a-z]+|^)(all day|all-day)([^a-z]+|$)/);

    if (regexAllDayPos > -1) {
      this.allday = true;
      this.setSubjectEndPos(regexAllDayPos);
    }
  };

  this.convertTimeNumber = function(text) {
    switch(text) {
      case "one":
      return 1;
      case "two":
      return 2;
      case "three":
      return 3;
      case "four":
      return 4;
      case "five":
      return 5;
      case "six":
      return 6;
      case "seven":
      return 7;
      case "eight":
      return 8;
      case "nine":
      return 9;
      case "ten":
      return 10;
      case "eleven":
      return 11;
      case "twelve":
      return 12;
      default:
      return 0;
    }
  };

  this.setSubjectEndPos = function(pos) {
    if (pos < subjectend) {
      subjectend = pos;
    }
  };

  this.populateSubject = function() {
    this.subject = this.textString.substring(subjectstart, subjectend).trim();
    if ((!!this.subject) & (this.subject.length > 0)) {
      this.subjectfound = true;
    }
  };

  // Find until time - e.g. "until 5pm", "until half past 9", "until quarter to 9", "until 11PM", "until 2200", "until 21:00", "until eight"
  this.findUntil = function() {
    var untilRegex, pos, matches, hours, minutes;
    
    // Test for PM times first (most specific)
    untilRegex = /([^a-z]+|^)(until )([0-9]{1,2})(?::([0-5][0-9]))?(pm| pm)([^a-z]+|$)/;
    pos = this.textStringLower.search(untilRegex);
    
    if (pos > -1) {
      matches = this.textStringLower.match(untilRegex);
      if (matches && matches[3]) {
        hours = parseInt(matches[3]);
        minutes = matches[4] ? parseInt(matches[4]) : 0;
        
        // Handle PM
        if (hours <= 12) {
          hours += 12;
        }
        if (hours == 24) hours = 12;
        
        this.setEndTime(hours, minutes);
        this.setSubjectEndPos(pos);
        return;
      }
    }
    
    // Test for AM times
    untilRegex = /([^a-z]+|^)(until )([0-9]{1,2})(?::([0-5][0-9]))?(am| am)([^a-z]+|$)/;
    pos = this.textStringLower.search(untilRegex);
    
    if (pos > -1) {
      matches = this.textStringLower.match(untilRegex);
      if (matches && matches[3]) {
        hours = parseInt(matches[3]);
        minutes = matches[4] ? parseInt(matches[4]) : 0;
        
        // Handle AM
        if (hours == 12) hours = 0;
        
        this.setEndTime(hours, minutes);
        this.setSubjectEndPos(pos);
        return;
      }
    }
    
    // Test for 24-hour time with colon
    untilRegex = /([^a-z]+|^)(until )([0-2]{1}[0-9]):([0-5][0-9])([^a-z]+|$)/;
    pos = this.textStringLower.search(untilRegex);
    
    if (pos > -1) {
      matches = this.textStringLower.match(untilRegex);
      if (matches && matches[3]) {
        hours = parseInt(matches[3]);
        minutes = parseInt(matches[4]);
        
        this.setEndTime(hours, minutes);
        this.setSubjectEndPos(pos);
        return;
      }
    }
    
    // Test for 4-digit time (military)
    untilRegex = /([^a-z]+|^)(until )([0-2]{1}[0-9])([0-5][0-9])([^a-z]+|$)/;
    pos = this.textStringLower.search(untilRegex);
    
    if (pos > -1) {
      matches = this.textStringLower.match(untilRegex);
      if (matches && matches[3]) {
        hours = parseInt(matches[3]);
        minutes = parseInt(matches[4]);
        
        this.setEndTime(hours, minutes);
        this.setSubjectEndPos(pos);
        return;
      }
    }
    
    // Test for half past with word numbers
    untilRegex = /([^a-z]+|^)(until )(half past )(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)([^a-z]+|$)/;
    pos = this.textStringLower.search(untilRegex);
    
    if (pos > -1) {
      matches = this.textStringLower.match(untilRegex);
      if (matches && matches[4]) {
        hours = this.convertTimeNumber(matches[4]);
        
        this.setEndTime(hours, 30);
        this.setSubjectEndPos(pos);
        return;
      }
    }
    
    // Test for half past with numeric
    untilRegex = /([^a-z]+|^)(until )(half past )([1-9][0-9]*)([^a-z]+|$)/;
    pos = this.textStringLower.search(untilRegex);
    
    if (pos > -1) {
      matches = this.textStringLower.match(untilRegex);
      if (matches && matches[4]) {
        hours = parseInt(matches[4]);
        
        this.setEndTime(hours, 30);
        this.setSubjectEndPos(pos);
        return;
      }
    }
    
    // Test for half with word numbers
    untilRegex = /([^a-z]+|^)(until )(half )(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)([^a-z]+|$)/;
    pos = this.textStringLower.search(untilRegex);
    
    if (pos > -1) {
      matches = this.textStringLower.match(untilRegex);
      if (matches && matches[4]) {
        hours = this.convertTimeNumber(matches[4]);
        
        this.setEndTime(hours, 30);
        this.setSubjectEndPos(pos);
        return;
      }
    }
    
    // Test for half with numeric
    untilRegex = /([^a-z]+|^)(until )(half )([1-9][0-9]*)([^a-z]+|$)/;
    pos = this.textStringLower.search(untilRegex);
    
    if (pos > -1) {
      matches = this.textStringLower.match(untilRegex);
      if (matches && matches[4]) {
        hours = parseInt(matches[4]);
        
        this.setEndTime(hours, 30);
        this.setSubjectEndPos(pos);
        return;
      }
    }
    
    // Test for quarter past with word numbers
    untilRegex = /([^a-z]+|^)(until )(quarter past )(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)([^a-z]+|$)/;
    pos = this.textStringLower.search(untilRegex);
    
    if (pos > -1) {
      matches = this.textStringLower.match(untilRegex);
      if (matches && matches[4]) {
        hours = this.convertTimeNumber(matches[4]);
        
        this.setEndTime(hours, 15);
        this.setSubjectEndPos(pos);
        return;
      }
    }
    
    // Test for quarter past with numeric
    untilRegex = /([^a-z]+|^)(until )(quarter past )([1-9][0-9]*)([^a-z]+|$)/;
    pos = this.textStringLower.search(untilRegex);
    
    if (pos > -1) {
      matches = this.textStringLower.match(untilRegex);
      if (matches && matches[4]) {
        hours = parseInt(matches[4]);
        
        this.setEndTime(hours, 15);
        this.setSubjectEndPos(pos);
        return;
      }
    }
    
    // Test for quarter to with word numbers
    untilRegex = /([^a-z]+|^)(until )(quarter to )(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)([^a-z]+|$)/;
    pos = this.textStringLower.search(untilRegex);
    
    if (pos > -1) {
      matches = this.textStringLower.match(untilRegex);
      if (matches && matches[4]) {
        hours = this.convertTimeNumber(matches[4]);
        
        this.setEndTime(hours - 1, 45);
        this.setSubjectEndPos(pos);
        return;
      }
    }
    
    // Test for quarter to with numeric
    untilRegex = /([^a-z]+|^)(until )(quarter to )([1-9][0-9]*)([^a-z]+|$)/;
    pos = this.textStringLower.search(untilRegex);
    
    if (pos > -1) {
      matches = this.textStringLower.match(untilRegex);
      if (matches && matches[4]) {
        hours = parseInt(matches[4]);
        
        this.setEndTime(hours - 1, 45);
        this.setSubjectEndPos(pos);
        return;
      }
    }
    
    // Test for word numbers (one to nine)
    untilRegex = /([^a-z]+|^)(until )(one|two|three|four|five|six|seven|eight|nine)([^a-z]+|$)/;
    pos = this.textStringLower.search(untilRegex);
    
    if (pos > -1) {
      matches = this.textStringLower.match(untilRegex);
      if (matches && matches[3]) {
        hours = this.convertTimeNumber(matches[3]);
        
        this.setEndTime(hours, 0);
        this.setSubjectEndPos(pos);
        return;
      }
    }
    
    // Test for simple numeric time (fallback)
    untilRegex = /([^a-z]+|^)(until )([0-9]{1,2})([^a-z]+|$)/;
    pos = this.textStringLower.search(untilRegex);
    
    if (pos > -1) {
      matches = this.textStringLower.match(untilRegex);
      if (matches && matches[3]) {
        hours = parseInt(matches[3]);
        
        this.setEndTime(hours, 0);
        this.setSubjectEndPos(pos);
        return;
      }
    }
  };

  // Constructor
  this.textString = text;
  this.textStringLower = text.toLowerCase();
  subjectend = text.length;
  this.parse();
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
module.exports = Cally;
