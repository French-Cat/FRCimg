const quotes = ["why am I here again?", "look behind you lmao", "boo", "panik", "qwq", "fak", "i have the attention span of a goldfish on meth", "British and German accents are fine asf", "Screaming & Crying rn", "i feel dead inside lol", "im a simp", "friday the 13th >>>", "rawr", "why hello there, I hope you have cookies enabled >:D", "webpage hit counter.", "Sometimes, I miss the people who hurt me most.", "nya~", "sobbing rn", "i like horror movies", "I <3 Catboys", "fuck it break a mirror", "Jason Voorhees fine asf", "Ghostface is way more than fine asf", "catboys make life better", "i like vr", "full body tracking is expensive asf tho", "my life is like a bike through an avalanche", "powered by no sleep", "react is painful", "wait why is this here..?", "wtf I don't remember coding that", "owo", "sadge", "insert crying here", "running over people is fun", "Too lazy for a suicide", "scream >>", "Damn. That's brighter than discord light mode"];
const folderSize = require("./util/foldersize.js");
const format = require("./util/sizeformat.js");
const config = require("./config.json");
const express = require('express');
const JSONdb = require('simple-json-db');
const db = new JSONdb("uploads.json");
const fileUpload = require("express-fileupload");
const ZWS = require("zws");

function buildPage(file_url) {
    const desc = quotes[Math.floor(Math.random() * quotes.length)]

    return `<title>FRCimg</title>
    <link rel="icon" href="https://i.smol.win/img.svg" type="image/svg+xml">
    <meta name="title" content="FRCimg">
    <meta name="description" content="${desc}?">
    <meta name="robots" content="index, follow">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="language" content="English">
    <meta name="revisit-after" content="1 days">
    <meta name="author" content="FRCat">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#2f3136">
    <meta property="og:title" content="FRCimg">
    <meta property="og:site_name" content="FRCimg">
    <meta property="og:url" content="${file_url}">
    <meta property="og:description" content="${desc}?">
    <meta property="og:type" content="website">
    <meta property="og:audio" content="${file_url}">
    <meta property="og:video" content="${file_url}">
    <meta property="og:image" content="${file_url}">
    <meta property="twitter:card" content="summary_large">
    <meta property="twitter:site" content="@Fr3nch_C4t">
    <meta property="twitter:description" content="${desc}?">
    <meta property="twitter:title" content="FRCimg">
    <meta property="twitter:image" content="${file_url}">
    <iframe src="${file_url}" style="border:0px" name="FRCimg" scrolling="no" height="100%" width="100%" allowfullscreen></iframe>
    <style>body{margin:0px;}</style>`
}


module.exports = { folderSize, format, config, express, db, fileUpload, buildPage, ZWS }