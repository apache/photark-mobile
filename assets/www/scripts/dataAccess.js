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
var nickname;
var date;
var time;
var location;
var description;
var people=new Array();
var db;
var clause;
var result;


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
	return location;
}

function getDescription(){
	return description;
}

function getPeople(){
	return people;
}

function openDB() {
	db = window.openDatabase("photark", "1.0", "DB", 1000000);
	db.transaction(populateDB, errorCB, successCB);
}

function getResult() {
	return result;
}

function populateDB(tx) {
//	tx.executeSql('DROP TABLE IF EXISTS MAIN');
//	tx.executeSql('DROP TABLE IF EXISTS PEOPLE');
	tx.executeSql('CREATE TABLE IF NOT EXISTS MAIN (uri unique,nickname, date,time,location,description)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS PEOPLE (uri,name,PRIMARY KEY (uri, name))');
}

function errorCB(err) {
	alert("Error processing SQL: " + err.code);
}

function successCB() {
	//Do nothing
}

function viewData(){
//	var db = window.openDatabase("photark", "1.0", "DB", 1000000);
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
	///	location=results.rows.item(i).location;
		description=results.rows.item(i).description;
	}	
	updateHome();
}

function queryPeopleSuccess(tx, results) {
	var len = results.rows.length;
	for (var i=0; i<len; i++){
		people[i]=results.rows.item(i).name;
	}
}

function updateDB(){
	var db = window.openDatabase("photark", "1.0", "DB", 1000000);
	db.transaction(insertToDB, errorCB, successCB);
}

function insertToDB(tx) {
	tx.executeSql('REPLACE INTO MAIN (uri,nickname, date,time,location,description) VALUES ("'+uri+'","'+nickname+'","'+date+'","'+time+'","'+location+'","'+description+'")');
	for (var i = 0; i < people.length; i++) {
		tx.executeSql('REPLACE INTO PEOPLE (uri,name) VALUES ("'+uri+'","'+people[i]+'")');
	}
}

function updateHome(){
	$("#metadata").append("<p> Name:"+nickname+"</p>");
	$("#metadata").append("<p> Location:"+location+"</p>");
}


function searchDB(s){
	clause=s;
	db.transaction(queryDB, errorCB, successCB);
}

function queryDB(tx){
	tx.executeSql('SELECT * FROM MAIN WHERE'+clause, [], searchSuccess, errorCB);
}

function searchSuccess() {
	var len = results.rows.length;
	result=new Array();
	for (var i=0; i<len; i++){
		result[i]=results.rows.item(i).name;
	}
	clause="";
}


