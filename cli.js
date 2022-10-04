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

