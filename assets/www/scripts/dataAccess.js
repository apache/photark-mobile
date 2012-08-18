/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var uri=0;
var nickname="Not defined.";
var date;
var time;
var loc;
var description;
var people=new Array();
var db;
var clause;
var result=new Array();


function getNickname(){
	return nickname;
}

function getDate(){
	return date;
}

function getTime(){
	return time;
}

function getLocation(){
	return loc;
}

function getDescription(){
	return description;
}

function getPeople(){
	return people;
}

function getURI() {
	return uri;
}


function openDB() {
	db = window.openDatabase("photark", "1.0", "DB", 1000000);
	db.transaction(populateDB, errorCB, successCB);
}

function getResult() {
	return result;
}

function populateDB(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS MAIN (uri unique,nickname, date,time,location,description)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS PEOPLE (uri,name,x,y,PRIMARY KEY (uri, name))');
}

function errorCB(err) {
	alert("Error processing SQL: " + err.code);
}

function successCB() {
	//Do nothing
}

function viewData(img){
	uri=img;
	clearData();
	db.transaction(retriviewDB, errorCB, successCB);
}

function retriviewDB(tx){
	tx.executeSql('SELECT * FROM MAIN WHERE URI="'+uri+'"', [], querySuccess, errorCB);
	tx.executeSql('SELECT * FROM PEOPLE WHERE URI="'+uri+'"', [], queryPeopleSuccess, errorCB);
}

function querySuccess(tx, results){
	var len = results.rows.length;
	for (var i=0; i<len; i++){
		nickname=results.rows.item(i).nickname;
		date=results.rows.item(i).date;
		time=results.rows.item(i).time;
		loc=results.rows.item(i).location;
		description=results.rows.item(i).description;
	}
}

function clearData(){
	nickname="Not defined.";
	date="";
	time="";
	loc="";
	description="";
	people=new Array();
	tagObjectsSaved=new Array();
}

function queryPeopleSuccess(tx, results) {
	var len = results.rows.length;
	for (var i=0; i<len; i++){
		people.push(results.rows.item(i).name);
		var tg1=new TagObject(results.rows.item(i).name,results.rows.item(i).x,results.rows.item(i).y);
		tagObjectsSaved.push(tg1);
	}
	updateHome();
}

function updateDB(){
	//var db = window.openDatabase("photark", "1.0", "DB", 1000000);
	db.transaction(insertToDB, errorCB, successCB);
	updateHome();
}

function insertToDB(tx) {	
	tx.executeSql('REPLACE INTO MAIN (uri,nickname, date,time,location,description) VALUES ("'+uri+'","'+nickname+'","'+date+'","'+time+'","'+loc+'","'+description+'")');
	for (var i = 0; i < people.length; i++) {
		tx.executeSql('REPLACE INTO PEOPLE (uri,name) VALUES ("'+uri+'","'+people[i]+'")');
	}
}

function updateHome(){
	temp4="";
	for (i = 0; i < tagObjectsSaved.length; i++) {
		temp4+=tagObjectsSaved[i].name+", ";
	}
	$("#metadata").html("");
	$("#metadata").append("<p> Name: "+nickname+"</p>");
	$("#metadata").append("<p> Location: "+loc+"</p>");
	$("#metadata").append("<p> Description: "+description+"</p>");
	$("#metadata").append("<p> Tags: "+temp4+"</p>");
	$("#metadata").append("<p> Date: "+date+"</p>");
	$("#metadata").append("<p> Time: "+time+"</p>");
}

function addTag(name,x,y){
	db.transaction(function(tx){
		  saveTag(tx,uri,name,x,y);
	}, errorCB, successCB);
}

function saveTag(tx,uri,name,x,y) {
	tx.executeSql('REPLACE INTO PEOPLE (uri,name,x,y) VALUES ("'+uri+'","'+name+'","'+x+'","'+y+'")');
}


function searchDB(s){
	clause=s;
	db.transaction(queryDB, errorCB, successCB);
}

//To search photos using people names
function searchPeople(s) {
	clause=s;
	db.transaction(queryDB, errorCB, successCB);
}

function queryDB(tx){
	tx.executeSql(clause,[], searchSuccess, errorCB);
}

function searchSuccess(tx, results) {
	var len = results.rows.length;
	result=new Array();
	for (var i=0; i<len; i++){
		result[i]=results.rows.item(i).uri;
	}
	clause="";
	showResults(result);
}

function deleteTags(){
	db.transaction(deleteTagRecords, errorCB, successCB);
}

function deleteTagRecords(tx){
	tx.executeSql('DELETE FROM PEOPLE WHERE URI="'+uri+'"');
}

function removeFromDB(){
	db.transaction(deleteRecords, errorCB, successCB);
}

function deleteRecords(tx) {
	tx.executeSql('DELETE FROM PEOPLE WHERE URI="'+uri+'"');
	tx.executeSql('DELETE FROM MAIN WHERE URI="'+uri+'"');
}








