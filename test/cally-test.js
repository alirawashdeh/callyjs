"use strict";
var assert = require('assert');
var Cally = require('../src/cally.js');

var eveningTime = 20;
var morningTime = 10;
var afternoonTime = 14;
var noonTime = 12;

describe('Cally', function() {

  // ********** Day of the week *************
  describe('Day of the week', function() {

    it("Does not find a date when no day of the week is present", function() {
      var appt;
      appt = new Cally("MOOONNNNNDDDAAAAYYYY", new Date());
      assert(!appt.startdatefound);
    });

    it("Can find full days of the week, for example: " +
    "Meet John Monday", function() {

      var appt;

      var date = new Date();
      appt = new Cally("Meet John monday", new Date());
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 1);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getDate() <= date.setDate(date.getDate() + 7));

      date = new Date();
      appt = new Cally("Meet John tuesday", new Date());
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 2);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getDate() <= date.setDate(date.getDate() + 7));

      date = new Date();
      appt = new Cally("Meet John wednesday", new Date());
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 3);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getDate() <= date.setDate(date.getDate() + 7));

      date = new Date();
      appt = new Cally("Meet John thursday", new Date());
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 4);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getDate() <= date.setDate(date.getDate() + 7));

      date = new Date();
      appt = new Cally("Meet John friday", new Date());
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 5);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getDate() <= date.setDate(date.getDate() + 7));

      date = new Date();
      appt = new Cally("Meet John saturday", new Date());
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 6);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getDate() <= date.setDate(date.getDate() + 7));

      date = new Date();
      appt = new Cally("Meet John sunday", new Date());
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() === 0);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getDate() <= date.setDate(date.getDate() + 7));
    });

    it("Can find shortened days of the week, for example: " +
    "Meet John Mon", function() {
      var appt;

      var date = new Date();
      appt = new Cally("Meet John mon", new Date());

      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 1);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getTime() <= date.setDate(date.getDate() + 7));

      date = new Date();
      appt = new Cally("Meet John tues", new Date());
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 2);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getTime() <= date.setDate(date.getDate() + 7));

      date = new Date();
      appt = new Cally("Meet John tue", new Date());
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 2);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getTime() <= date.setDate(date.getDate() + 7));

      date = new Date();
      appt = new Cally("Meet John wed", new Date());
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 3);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getTime() <= date.setDate(date.getDate() + 7));

      date = new Date();
      appt = new Cally("Meet John thurs", new Date());
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 4);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getTime() <= date.setDate(date.getDate() + 7));

      date = new Date();
      appt = new Cally("Meet John thur", new Date());
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 4);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getTime() <= date.setDate(date.getDate() + 7));


      date = new Date();
      appt = new Cally("Meet John thu", new Date());
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 4);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getTime() <= date.setDate(date.getDate() + 7));

      date = new Date();
      appt = new Cally("Meet John fri", new Date());
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 5);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getTime() <= date.setDate(date.getDate() + 7));

      date = new Date();
      appt = new Cally("Meet John sat", new Date());
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 6);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getTime() <= date.setDate(date.getDate() + 7));

      date = new Date();
      appt = new Cally("Meet John sun", new Date());
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() === 0);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getTime() <= date.setDate(date.getDate() + 7));
    });


    it("Can find day of the week keywords with 'Next', for example: " +
    "Meet John next mon", function() {
      var appt;

      //Monday
      var date = new Date("August 01, 2016 00:00:00");
      appt = new Cally("Meet John next mon", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 8);
      assert(appt.subjectfound === true);
      assert(appt.subject == "Meet John");

      date = new Date("August 01, 2016 00:00:00");
      appt = new Cally("Meet John next tues", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 9);

      date = new Date("August 01, 2016 00:00:00");
      appt = new Cally("Meet John next wed", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 10);

      date = new Date("August 01, 2016 00:00:00");
      appt = new Cally("Meet John next thurs", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 11);

      date = new Date("August 01, 2016 00:00:00");
      appt = new Cally("Meet John next fri", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 12);

      date = new Date("August 01, 2016 00:00:00");
      appt = new Cally("Meet John next sat", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 13);

      date = new Date("August 01, 2016 00:00:00");
      appt = new Cally("Meet John next sun", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 14);

      // Friday
      date = new Date("August 05, 2016 00:00:00");
      appt = new Cally("Meet John next mon", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 8);

      date = new Date("August 05, 2016 00:00:00");
      appt = new Cally("Meet John next tues", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 9);

      date = new Date("August 05, 2016 00:00:00");
      appt = new Cally("Meet John next wed", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 10);

      date = new Date("August 05, 2016 00:00:00");
      appt = new Cally("Meet John next thurs", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 11);

      date = new Date("August 05, 2016 00:00:00");
      appt = new Cally("Meet John next fri", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 12);

      date = new Date("August 05, 2016 00:00:00");
      appt = new Cally("Meet John next sat", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 13);

      date = new Date("August 05, 2016 00:00:00");
      appt = new Cally("Meet John next sun", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 14);


      // Saturday
      date = new Date("August 06, 2016 00:00:00");
      appt = new Cally("Meet John next mon", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 15);

      date = new Date("August 06, 2016 00:00:00");
      appt = new Cally("Meet John next tues", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 16);

      date = new Date("August 06, 2016 00:00:00");
      appt = new Cally("Meet John next wed", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 17);

      date = new Date("August 06, 2016 00:00:00");
      appt = new Cally("Meet John next thurs", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 18);

      date = new Date("August 06, 2016 00:00:00");
      appt = new Cally("Meet John next fri", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 19);

      date = new Date("August 06, 2016 00:00:00");
      appt = new Cally("Meet John next sat", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 13);

      date = new Date("August 06, 2016 00:00:00");
      appt = new Cally("Meet John next sun", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 14);



      // Sunday
      date = new Date("August 07, 2016 00:00:00");
      appt = new Cally("Meet John next mon", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 15);

      date = new Date("August 07, 2016 00:00:00");
      appt = new Cally("Meet John next tues", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 16);

      date = new Date("August 07, 2016 00:00:00");
      appt = new Cally("Meet John next wed", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 17);

      date = new Date("August 07, 2016 00:00:00");
      appt = new Cally("Meet John next thurs", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 18);

      date = new Date("August 07, 2016 00:00:00");
      appt = new Cally("Meet John next fri", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 19);

      date = new Date("August 07, 2016 00:00:00");
      appt = new Cally("Meet John next sat", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 13);

      date = new Date("August 07, 2016 00:00:00");
      appt = new Cally("Meet John next sun", date);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 14);
    });

    it("Can ignore words that contain days of the week, for example: " +
    "Meet John to discuss the Sunshine Monster Virtue Wedding Thunder Fritter Saturn", function() {
      var appt;

      var date = new Date();
      date.setHours(0, 0, 0, 0);
      appt = new Cally("Meet John to discuss the Sunshine Monster Virtue Wedding Thunder Fritter Saturn Cafe on Saturday", new Date());

      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 6);
      assert(appt.startdate.getTime() > date.getTime());
      assert(appt.startdate.getTime() <= date.setDate(date.getDate() + 7));
    });

    it("Can find a subject before a day of the week, for example: " +
    "Meet John Monday", function() {
      var appt;
      appt = new Cally("Meet John Monday", new Date());
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 1);
      assert(appt.subject == "Meet John");
    });

    it("Can find subject when there is a keyword prior to day of week, for example: " +
    "Meet John on Monday", function() {
      var appt;
      appt = new Cally("Meet John on Monday", new Date());
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 1);
      assert(appt.subject == "Meet John");


      appt = new Cally("Meet John this Tuesday", new Date());
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 2);
      assert(appt.subject == "Meet John");
    });

    it("Can find a subject before a day of the week with comma, for example: " +
    "Meet John, Monday", function() {
      var appt;
      appt = new Cally("Meet John, Monday", new Date());
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDay() == 1);
      assert(appt.subject == "Meet John");
    });

  });

  // ********** Date Keywords *************
  describe('Date Keywords', function() {

    it("Can find date keyword today", function() {
      var appt;
      appt = new Cally("Meet John today", new Date());
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      var date = new Date();
      assert(appt.startdate.getDate() == date.getDate());
      assert(appt.subject == "Meet John");
    });

    it("Can find date keyword tomorrow", function() {
      var appt;

      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John tomorrow", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);

      var dateClean = new Date("August 31, 2016 00:00:00");
      dateClean.setDate(dateClean.getDate() + 1);
      assert(appt.startdate.getDate() == dateClean.getDate());
      assert(appt.subject == "Meet John");
    });

    it("Can find date keyword this afternoon", function() {
      var appt;
      appt = new Cally("Meet John this afternoon", new Date());
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.starttimefound);

      var date = new Date();
      assert(appt.startdate.getDate() == date.getDate());
      assert(appt.startdate.getHours() == afternoonTime);
      assert(appt.subject == "Meet John");
    });

    it("Can find date keyword tonight", function() {
      var appt;
      appt = new Cally("Meet John tonight", new Date());
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.starttimefound);

      var date = new Date();
      assert(appt.startdate.getDate() == date.getDate());
      assert(appt.startdate.getHours() == eveningTime);
      assert(appt.subject == "Meet John");
    });

    it("Can find date keyword - this evening", function() {
      var appt;
      appt = new Cally("Meet John this evening", new Date());
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.starttimefound);

      var date = new Date();
      assert(appt.startdate.getDate() == date.getDate());
      assert(appt.startdate.getHours() == eveningTime);
      assert(appt.subject == "Meet John");
    });

    it("Can find date keyword - in the morning", function() {
      var appt;

      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John in the morning", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.starttimefound);

      var dateClean = new Date("August 31, 2016 00:00:00");
      dateClean.setDate(dateClean.getDate() + 1);
      assert(appt.startdate.getDate() == dateClean.getDate());
      assert(appt.startdate.getHours() == morningTime);
      assert(appt.subject == "Meet John");
    });

    it("Can find date keyword - next week", function() {
      var appt;

      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John next week", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);

      var dateClean = new Date("August 31, 2016 00:00:00");
      dateClean.setDate(dateClean.getDate() + 7);
      assert(appt.startdate.getDate() == dateClean.getDate());
      assert(appt.subject == "Meet John");
    });

    it("Can find date keyword - next month", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John next month", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);

      var dateClean = new Date("August 31, 2016 00:00:00");
      dateClean.setMonth(dateClean.getMonth() + 1);
      assert(appt.startdate.getMonth() == dateClean.getMonth());
      assert(appt.subject == "Meet John");
    });


    it("Can find date keyword - next year", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John next year", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);

      var dateClean = new Date("August 31, 2016 00:00:00");
      dateClean.setFullYear(dateClean.getFullYear() + 1);
      assert(appt.startdate.getFullYear() == dateClean.getFullYear());
      assert(appt.subject == "Meet John");
    });

    it("Can find date keyword - in X days", function() {
      var appt;
      appt = new Cally("Meet John in 3 days", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 3);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John in 20 days", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 20);
      assert(appt.subject == "Meet John");
    });

    it("Can find date keyword - in X weeks", function() {
      var appt;
      appt = new Cally("Meet John in 1 week", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 7);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John in 20 weeks", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 18);
      assert(appt.startdate.getMonth() === 0);
      assert(appt.subject == "Meet John");
    });

    it("Can find date keyword - in X months", function() {
      var appt;
      appt = new Cally("Meet John in 1 month", new Date("December 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getMonth() === 0);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John in 20 months", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getMonth() == 4);
      assert(appt.startdate.getFullYear() == 2018);
      assert(appt.subject == "Meet John");
    });

    it("Can find date keyword - in X years", function() {
      var appt;
      appt = new Cally("Meet John in 1 year", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getFullYear() == 2017);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John in 20 years", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getFullYear() == 2036);
      assert(appt.subject == "Meet John");
    });

    it("Can find date and month", function() {
      var appt;
      appt = new Cally("Meet John on 2nd January", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 2);
      assert(appt.startdate.getMonth() === 0);
      assert(appt.startdate.getFullYear() == 2017);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John 12th Feb", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 12);
      assert(appt.startdate.getMonth() == 1);
      assert(appt.startdate.getFullYear() == 2017);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John 21st Mar", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 21);
      assert(appt.startdate.getMonth() == 2);
      assert(appt.startdate.getFullYear() == 2017);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John on 12th April", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 12);
      assert(appt.startdate.getMonth() == 3);
      assert(appt.startdate.getFullYear() == 2017);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John on 2nd May", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 2);
      assert(appt.startdate.getMonth() == 4);
      assert(appt.startdate.getFullYear() == 2017);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John on 3rd June", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 3);
      assert(appt.startdate.getMonth() == 5);
      assert(appt.startdate.getFullYear() == 2017);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John on 5th July", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 5);
      assert(appt.startdate.getMonth() == 6);
      assert(appt.startdate.getFullYear() == 2017);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John on 30th August", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 30);
      assert(appt.startdate.getMonth() == 7);
      assert(appt.startdate.getFullYear() == 2017);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John on 20th September", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 20);
      assert(appt.startdate.getMonth() == 8);
      assert(appt.startdate.getFullYear() == 2016);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John on 20th October", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 20);
      assert(appt.startdate.getMonth() == 9);
      assert(appt.startdate.getFullYear() == 2016);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John on 20th Nov", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 20);
      assert(appt.startdate.getMonth() == 10);
      assert(appt.startdate.getFullYear() == 2016);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John on 20th December", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 20);
      assert(appt.startdate.getMonth() == 11);
      assert(appt.startdate.getFullYear() == 2016);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John on 20th of December", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 20);
      assert(appt.startdate.getMonth() == 11);
      assert(appt.startdate.getFullYear() == 2016);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John on the 20th of December", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.startdate.getDate() == 20);
      assert(appt.startdate.getMonth() == 11);
      assert(appt.startdate.getFullYear() == 2016);
      assert(appt.subject == "Meet John");
    });

  });

  // ********** Start Time Keywords *************
  describe('Start Time Keywords', function() {


    it("Can find time keywords - morning", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John tomorrow morning", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.starttimefound);

      var dateClean = new Date("August 31, 2016 00:00:00");
      dateClean.setDate(dateClean.getDate() + 1);
      assert(appt.startdate.getDate() == dateClean.getDate());
      assert(appt.startdate.getHours() == morningTime);
      assert(appt.subject == "Meet John");
    });

    it("Can find time keywords - afternoon", function() {
      var appt;

      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John tomorrow afternoon", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.starttimefound);

      var dateClean = new Date("August 31, 2016 00:00:00");
      dateClean.setDate(dateClean.getDate() + 1);
      assert(appt.startdate.getDate() == dateClean.getDate());
      assert(appt.startdate.getHours() == afternoonTime);
      assert(appt.subject == "Meet John");
    });

    it("Can find time keywords - night", function() {
      var appt;
      appt = new Cally("Meet John tomorrow night", new Date());
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.starttimefound);

      var date = new Date();
      assert(appt.startdate.getDate() == date.getDate() + 1);
      assert(appt.startdate.getHours() == eveningTime);
      assert(appt.subject == "Meet John");
    });

    it("Can find time keywords - evening", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John tomorrow evening", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.starttimefound);

      var dateClean = new Date("August 31, 2016 00:00:00");
      dateClean.setDate(dateClean.getDate() + 1);
      assert(appt.startdate.getDate() == dateClean.getDate());
      assert(appt.startdate.getHours() == eveningTime);
      assert(appt.subject == "Meet John");
    });

    it("Can find time keywords - tomorrow noon", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John tomorrow noon", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.starttimefound);

      var dateClean = new Date("August 31, 2016 00:00:00");
      dateClean.setDate(dateClean.getDate() + 1);
      assert(appt.startdate.getDate() == dateClean.getDate());
      assert(appt.startdate.getHours() == noonTime);
      assert(appt.subject == "Meet John");
    });

    it("Can find time keywords - tomorrow midday", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John tomorrow midday", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.starttimefound);

      var dateClean = new Date("August 31, 2016 00:00:00");
      dateClean.setDate(dateClean.getDate() + 1);
      assert(appt.startdate.getDate() == dateClean.getDate());
      assert(appt.startdate.getHours() == noonTime);
      assert(appt.subject == "Meet John");
    });

    it("Can find time keyword combined with day - Tuesday evening", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John Tuesday evening", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.starttimefound);

      assert(appt.startdate.getDay() == 2);
      assert(appt.startdate.getHours() == eveningTime);
      assert(appt.subject == "Meet John");
    });

    it("Can find time keywords - in X hours", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John in 1 hour", date);
      assert(appt.subjectfound);
      assert(appt.subject == "Meet John");
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 1);

      appt = new Cally("Meet John in 25 hours", new Date("August 31, 2016 21:53:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 22);
      assert(appt.startdate.getMinutes() == 53);
      assert(appt.startdate.getDate() == 1);
      assert(appt.startdate.getMonth() == 8); // september
      assert(appt.subject == "Meet John");
    });


    it("Can find time keywords - in X minutes", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John in 1 minute", date);
      assert(appt.subjectfound);
      assert(appt.subject == "Meet John");
      assert(appt.starttimefound);
      assert(appt.startdate.getMinutes() == 1);

      appt = new Cally("Meet John in 18 minutes", new Date("August 31, 2016 21:53:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 22);
      assert(appt.startdate.getMinutes() == 11);
      assert(appt.startdate.getDate() == 31);
      assert(appt.startdate.getMonth() == 7);
      assert(appt.subject == "Meet John");
    });
  });

  // ********** Start Time *************
  describe('Start Time', function() {

    it("Can find time - 11PM, 12PM, 3AM, 10:00AM, 10:30, 14:30, 6:30PM, 0900", function() {
      var appt;
      appt = new Cally("Meet John at 11PM", new Date());
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 23);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at 11 PM", new Date());
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 23);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at 12PM", new Date());
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 12);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at 3AM", new Date());
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 3);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at 12AM", new Date());
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() === 0);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at 3 AM", new Date());
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 3);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John 10:30AM", new Date());
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 10);
      assert(appt.startdate.getMinutes() == 30);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John 10:55 AM", new Date());
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 10);
      assert(appt.startdate.getMinutes() == 55);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John 10:55PM", new Date());
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 22);
      assert(appt.startdate.getMinutes() == 55);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John 03:01 PM", new Date());
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 15);
      assert(appt.startdate.getMinutes() == 1);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John 14:39", new Date());
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 14);
      assert(appt.startdate.getMinutes() == 39);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John 23:59", new Date());
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 23);
      assert(appt.startdate.getMinutes() == 59);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at 0800", new Date());
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 8);
      assert(appt.startdate.getMinutes() === 0);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at 7", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdate.getHours() == 7);
      assert(appt.startdate.getDate() == 31);
      assert(appt.startdate.getMonth() == 7);
      assert(appt.startdate.getFullYear() == 2016);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at 7", new Date("August 31, 2016 07:00:00"));
      assert(appt.subjectfound);
      assert(appt.startdate.getHours() == 19);
      assert(appt.startdate.getDate() == 31);
      assert(appt.startdate.getMonth() == 7);
      assert(appt.startdate.getFullYear() == 2016);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at 11", new Date("August 31, 2016 21:53:00"));
      assert(appt.subjectfound);
      assert(appt.startdate.getHours() == 23);
      assert(appt.startdate.getDate() == 31);
      assert(appt.startdate.getMonth() == 7);
      assert(appt.startdate.getFullYear() == 2016);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John in 3 days at 11", new Date("August 31, 2016 21:53:00"));
      assert(appt.subjectfound);
      assert(appt.startdate.getHours() == 11);
      assert(appt.startdate.getDate() == 3);
      assert(appt.startdate.getMonth() == 8);
      assert(appt.startdate.getFullYear() == 2016);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John in 3 days at 11:00", new Date("August 31, 2016 21:53:00"));
      assert(appt.subjectfound);
      assert(appt.startdate.getHours() == 11);
      assert(appt.startdate.getDate() == 3);
      assert(appt.startdate.getMonth() == 8);
      assert(appt.startdate.getFullYear() == 2016);
      assert(appt.subject == "Meet John");
    });

    it("Can find time - half past X", function() {
      var appt;
      appt = new Cally("Meet John at half past 9", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 9);
      assert(appt.startdate.getMinutes() == 30);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John half 8", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 8);
      assert(appt.startdate.getMinutes() == 30);
      assert(appt.subject == "Meet John");
    });


    it("Can find time - quarter past X", function() {
      var appt;
      appt = new Cally("Meet John at quarter past 9", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 9);
      assert(appt.startdate.getMinutes() == 15);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John quarter past 8", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 8);
      assert(appt.startdate.getMinutes() == 15);
      assert(appt.subject == "Meet John");
    });

    it("Can find time - quarter to X", function() {
      var appt;
      appt = new Cally("Meet John at quarter to 9", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 8);
      assert(appt.startdate.getMinutes() == 45);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John quarter to 8", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 7);
      assert(appt.startdate.getMinutes() == 45);
      assert(appt.subject == "Meet John");
    });

    it("Can find time - starting at", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John starting at 10PM", date);
      assert(appt.subjectfound);
      assert(appt.subject == "Meet John");
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 22);

      appt = new Cally("Meet John starting at quarter to 8", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 7);
      assert(appt.startdate.getMinutes() == 45);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John starting at half 5", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 5);
      assert(appt.startdate.getMinutes() == 30);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John starting at quarter past 5", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 5);
      assert(appt.startdate.getMinutes() == 15);
      assert(appt.subject == "Meet John");
    });

    it("Can find time combined with time of day - tonight at 8", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John tonight at 8", date);
      assert(appt.subjectfound);
      assert(appt.subject == "Meet John");
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 20);

      appt = new Cally("Meet John tomorrow night at 9", new Date("August 31, 2016 10:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 21);
      assert(appt.startdate.getMinutes() === 0);
      assert(appt.startdate.getDate() == 1);
      assert(appt.startdate.getMonth() == 8);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John this afternoon at 4", new Date("August 31, 2016 10:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 16);
      assert(appt.subject == "Meet John");


      appt = new Cally("Meet John at 4 this afternoon", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 16);
      assert(appt.subject == "Meet John");
    });

    it("Can find time words - one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve", function() {
      var appt;
      appt = new Cally("Meet John at one", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 1);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at two", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 2);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at three", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 3);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at four", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 4);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at five", new Date("August 31, 2016 08:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 17);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at six tonight", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 18);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at seven pm", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 19);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at eight", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 8);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at nine", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 9);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at ten", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 10);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at eleven", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 11);
      assert(appt.subject == "Meet John");

      appt = new Cally("Meet John at twelve", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 12);
      assert(appt.subject == "Meet John");
    });

      it("Can find all-day events", function() {
        var appt;
        appt = new Cally("Meet John tomorrow all day", new Date("August 31, 2016 00:00:00"));
        assert(appt.subjectfound);
        assert(appt.subject == "Meet John");
        assert(appt.startdate.getDate() == 1);
        assert(appt.startdate.getMonth() == 8);
        assert(appt.allday == true);

        appt = new Cally("Meet John all-day tomorrow", new Date("August 31, 2016 00:00:00"));
        assert(appt.subjectfound);
        assert(appt.subject == "Meet John");
        assert(appt.startdate.getDate() == 1);
        assert(appt.startdate.getMonth() == 8);
        assert(appt.allday == true);

      });

  });

  describe('Durations', function() {

    it("Doesn't have a duration if no duration found", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John tomorrow morning", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.starttimefound);
      assert(!appt.endtimefound);
      assert(appt.enddate.getHours() == 0);
      assert(appt.enddate.getMinutes() == 0);
    });

    it("Doesn't have a time if duration found for an all-day event", function() {
      var appt;
      var date = new Date("August 31, 2016 10:10:00");
      appt = new Cally("Meet John on Monday all day for 3 days", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.endtimefound);
      assert(appt.enddate.getHours() == 0);
      assert(appt.enddate.getMinutes() == 0);
    });

    it("Can find duration - for X days", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John tomorrow morning for 12 days", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.starttimefound);
      assert(appt.endtimefound);

      var dateClean = new Date("August 31, 2016 00:00:00");
      dateClean.setDate(dateClean.getDate() + 1);
      assert(appt.startdate.getDate() == dateClean.getDate());
      assert(appt.startdate.getHours() == morningTime);
      assert(appt.enddate.getDate() == 13);
      assert(appt.subject == "Meet John");
    });

    it("Can find duration - for X hours", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John tomorrow morning for 25 hours", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.starttimefound);
      assert(appt.endtimefound);

      var dateClean = new Date("August 31, 2016 00:00:00");
      dateClean.setDate(dateClean.getDate() + 1);
      assert(appt.startdate.getDate() == dateClean.getDate());
      assert(appt.startdate.getHours() == morningTime);
      assert(appt.enddate.getDate() == 2);
      assert(appt.enddate.getHours() == morningTime + 1);
      assert(appt.subject == "Meet John");
    });

    it("Can find duration - for X minutes", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John tomorrow morning for 120 minutes", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.starttimefound);
      assert(appt.endtimefound);

      var dateClean = new Date("August 31, 2016 00:00:00");
      dateClean.setDate(dateClean.getDate() + 1);
      assert(appt.startdate.getDate() == dateClean.getDate());
      assert(appt.startdate.getHours() == morningTime);
      assert(appt.enddate.getHours() == morningTime + 2);
      assert(appt.enddate.getMinutes() == 0);
      assert(appt.subject == "Meet John");
    });

    it("Can find duration - for X weeks", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John tomorrow morning for 2 weeks", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.starttimefound);
      assert(appt.endtimefound);
      assert(appt.enddatefound);

      var dateClean = new Date("August 31, 2016 00:00:00");
      dateClean.setDate(dateClean.getDate() + 1);
      assert(appt.startdate.getDate() == dateClean.getDate());
      assert(appt.startdate.getHours() == morningTime);
      assert(appt.enddate.getMonth() == 8);
      assert(appt.enddate.getDate() == 15);
      assert(appt.enddate.getMinutes() == 0);
      assert(appt.subject == "Meet John");
    });

    it("Can find duration - for X months", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John tomorrow morning for 2 months", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.enddatefound);
      assert(appt.starttimefound);
      assert(appt.endtimefound);
      
      var dateClean = new Date("August 31, 2016 00:00:00");
      dateClean.setDate(dateClean.getDate() + 1);
      assert(appt.startdate.getDate() == dateClean.getDate());
      assert(appt.startdate.getHours() == morningTime);
      assert(appt.enddate.getMonth() == 10);
      assert(appt.enddate.getMinutes() == 0);
      assert(appt.subject == "Meet John");
    });

   it("Can find duration - for X years", function() {
      var appt;
      var date = new Date("August 31, 2016 00:00:00");
      appt = new Cally("Meet John this evening for 2 years", date);
      assert(appt.subjectfound);
      assert(appt.startdatefound);
      assert(appt.enddatefound);
      assert(appt.starttimefound);
      assert(appt.endtimefound);
      
      var dateClean = new Date("August 31, 2016 00:00:00");
      dateClean.setFullYear(dateClean.getFullYear() + 2);
    
      assert(appt.enddate.getFullYear() == dateClean.getFullYear());
      assert(appt.enddate.getMonth() == dateClean.getMonth());
      assert(appt.enddate.getDate() == dateClean.getDate());
      assert(appt.startdate.getHours() == eveningTime);
      assert(appt.enddate.getMinutes() == 0);
      assert(appt.subject == "Meet John");
    });

    it("Can handle duration with no start time", function() {
      var appt;
      var date = new Date("August 31, 2016 10:30:00"); // Set explicit current time
      appt = new Cally("Meet John for 1 hour", date);
      
      assert(appt.subjectfound);
      assert(appt.subject == "Meet John");
      assert(appt.starttimefound);
      assert(appt.endtimefound);

      var dateClean = new Date("August 31, 2016 10:30:00");
      assert(appt.startdate.getDate() == dateClean.getDate());
      assert(appt.startdate.getMonth() == dateClean.getMonth());
      assert(appt.startdate.getFullYear() == dateClean.getFullYear());
      assert(appt.startdate.getHours() == dateClean.getHours());
      assert(appt.enddate.getHours() == dateClean.getHours() + 1);
      assert(appt.enddate.getMinutes() == dateClean.getMinutes());
    });

 it("Can find duration using time words, for example: Meet John for one hour", function() {
      var appt;
      var date = new Date("August 31, 2016 10:30:00"); // Set explicit current time
      appt = new Cally("Meet John for one hour", date);
      
      assert(appt.subjectfound);
      assert(appt.subject == "Meet John");
      assert(appt.starttimefound);
      assert(appt.endtimefound);

      var dateClean = new Date("August 31, 2016 10:30:00");
      assert(appt.startdate.getDate() == dateClean.getDate());
      assert(appt.startdate.getMonth() == dateClean.getMonth());
      assert(appt.startdate.getFullYear() == dateClean.getFullYear());
      assert(appt.startdate.getHours() == dateClean.getHours());
      assert(appt.enddate.getHours() == dateClean.getHours() + 1);
      assert(appt.enddate.getMinutes() == dateClean.getMinutes());
    });


   it("Can find duration - until X", function() {
      var appt = new Cally("Meet John at 4 until 8", new Date("August 31, 2016 00:00:00"));
      assert(appt.subjectfound);
      assert(appt.starttimefound);
      assert(appt.startdate.getHours() == 4);
      assert(appt.endtimefound);
      assert(appt.enddate.getHours() == 8);

      appt = new Cally("Meet John at 4 until eight", new Date("August 31, 2016 00:00:00"));
      assert(appt.startdate.getHours() == 4);
      assert(appt.enddate.getHours() == 8);

    });

   it("Can find duration - until half past X", function() {
      var appt;
      appt = new Cally("Meet John at 5 until half past 7", new Date("August 31, 2016 00:00:00"));
      assert(appt.startdate.getHours() == 5);
      assert(appt.enddate.getHours() == 7);
      assert(appt.enddate.getMinutes() == 30);

      appt = new Cally("Meet John at 3 until half 6", new Date("August 31, 2016 00:00:00"));
      assert(appt.startdate.getHours() == 3);
      assert(appt.enddate.getHours() == 6);
      assert(appt.enddate.getMinutes() == 30);
    });

   it("Can find duration - until quarter to/past X", function() {
      var appt;
      appt = new Cally("Meet John at 2 until quarter to 8", new Date("August 31, 2016 00:00:00"));
      assert(appt.startdate.getHours() == 2);
      assert(appt.enddate.getHours() == 7);
      assert(appt.enddate.getMinutes() == 45);

      appt = new Cally("Meet John at 2 until quarter past 3", new Date("August 31, 2016 00:00:00"));
      assert(appt.startdate.getHours() == 2);
      assert(appt.enddate.getHours() == 3);
      assert(appt.enddate.getMinutes() == 15);
    });

   it("Can find duration - until XPM, XX:XX, XX:XXPM", function() {
      var appt;
      appt = new Cally("Meet John at 5am until 8pm", new Date("August 31, 2016 00:00:00"));
      assert(appt.startdate.getHours() == 5);
      assert(appt.enddate.getHours() == 20);

      appt = new Cally("Meet John at 6 until 21:00", new Date("August 31, 2016 00:00:00"));
      assert(appt.startdate.getHours() == 6);
      assert(appt.enddate.getHours() == 21);

      appt = new Cally("Meet John at 7 until 6:00PM", new Date("August 31, 2016 00:00:00"));
      assert(appt.startdate.getHours() == 7);
      assert(appt.enddate.getHours() == 18);
    });

  it("Can find duration - finishing at X", function() {
      var appt;
      appt = new Cally("Meet John at 5am finishing 8", new Date("August 31, 2016 00:00:00"));
      assert(appt.startdate.getHours() == 5);
      assert(appt.enddate.getHours() == 8);

      appt = new Cally("Meet John at 4am finishing at 9", new Date("August 31, 2016 00:00:00"));
      assert(appt.startdate.getHours() == 4);
      assert(appt.enddate.getHours() == 9);
    });

  it("Can adjust duration so that the end time isn't before the start time", function() {
      var appt;
      appt = new Cally("Meet John at 3am finishing at 2", new Date("August 31, 2016 00:00:00"));
      assert(appt.startdate.getHours() == 3);
      assert(appt.enddate.getHours() == 14);
      assert(appt.startdate.getDate() == 31);
      assert(appt.enddate.getDate() == 31);
      assert(!appt.enddatefound);

      appt = new Cally("Meet John at 3pm finishing at 2", new Date("August 31, 2016 00:00:00"));
      assert(appt.startdate.getHours() == 15);
      assert(appt.enddate.getHours() == 2);
      assert(appt.startdate.getDate() == 31);
      assert(appt.enddate.getDate() == 1);
      assert(appt.enddatefound);

      appt = new Cally("Meet John at 3pm finishing at 2pm", new Date("August 31, 2016 00:00:00"));
      assert(appt.startdate.getHours() == 15);
      assert(appt.enddate.getHours() == 14);
      assert(appt.startdate.getDate() == 31);
      assert(appt.enddate.getDate() == 1);
      assert(appt.enddatefound);

      appt = new Cally("Meet John at 3am finishing at 2am", new Date("August 31, 2016 00:00:00"));
      assert(appt.startdate.getHours() == 3);
      assert(appt.enddate.getHours() == 2);
      assert(appt.startdate.getDate() == 31);
      assert(appt.enddate.getDate() == 1);
      assert(appt.enddatefound);
    });

    it("Can cater for duration - from X until Y", function() {
      var appt;
      appt = new Cally("Meet John from 10am until four", new Date("August 31, 2016 00:00:00"));
      assert(appt.startdate.getHours() == 10);
      assert(appt.enddate.getHours() == 16);
      assert(appt.startdate.getDate() == 31);
      assert(appt.enddate.getDate() == 31);
      assert(!appt.enddatefound);
      assert(appt.subject == "Meet John");
    });

  });

});
