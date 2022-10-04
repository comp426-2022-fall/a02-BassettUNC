#!/usr/bin/env node

import moment from "moment-timezone";
import fetch from "node-fetch";

//Select args for help
const args = process.argv.slice(2);
if(args[0] == '-h'){
	console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE")
	console.log( "-h           Show this help message and exit.")
	console.log("-n, -s        Latitude: N positive; S negative.")
	console.log("-e, -w        Longitude: E positive; W negative.")
	console.log("-z            Time zone: uses tz.guess() from moment-timezone by default.")
	console.log("-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.")
	console.log("-j            Echo pretty JSON from open-meteo API and exit.")
	process.exit(0)
}

//Extract system timezone
const timezone = moment.tz.guest();

//Define Required Vars

const lat = "35.875";
const lon = "-79.0";

//Define fetch Url
const url = "https://api.open-meteo.com/v1/forecast?" + "latitude=" + latitude + "&longitude=" + longitude + "&daily=precipitation_sum,precipitation_hours" +timezone

// Make a request
const response = await fetch(url);

// Get the data from the request
const data = await response.json();

//Define days from minimist args
const days = args.d

if (days == 0) {
	if (data.daily.precipitation_hours[days] == 0) {
		console.log("You will not need your galoshes today.");
	} else {
		console.log("You might need your galoshes today.");
	}
} else if (days > 1) {
	if (data.daily.precipitation_hours[days] == 0) {
		console.log("You will not need your galoshes");
	} else {
		console.log("You might need your galoshes");
	}
	console.log(" in" + days + " days");
} else {
	if (data.daily.precipitation_hours[days] == 0) {
		console.log("You will not need your galoshes tomorrow.");
	} else {
		console.log("You might need your galoshes tomorrow.");
	}	
}

