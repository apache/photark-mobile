var uri=2;
var nickname;
var date;
var time;
var locaton;
var description;
var people=new Array();

function openDB() {
	var db = window.openDatabase("photark", "1.0", "DB", 1000000);
	db.transaction(populateDB, errorCB, successCB);
}

function populateDB(tx) {
	tx.executeSql('DROP TABLE IF EXISTS MAIN');
	tx.executeSql('CREATE TABLE IF NOT EXISTS MAIN (uri unique,nickname, date,time,location,description)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS PEOPLE (uri,name)');
	updateDB();
}

function errorCB(err) {
	alert("Error processing SQL: " + err.code);
}

function successCB() {
	alert("success!");
}


function viewData(){
	var db = window.openDatabase("photark", "1.0", "DB", 1000000);
	db.transaction(retriviewDB, errorCB, successCB);
}

function retriviewDB(tx){
	tx.executeSql('SELECT * FROM MAIN', [], querySuccess, errorCB);
}

function querySuccess(tx, results){
	var len = results.rows.length;
	for (var i=0; i<len; i++){
		alert(results.rows.item(i).uri+" "+results.rows.item(i).nickname+" ");
		break;
	}
}

function updateDB(){
	var db = window.openDatabase("photark", "1.0", "DB", 1000000);
	db.transaction(insertToDB, errorCB, successCB);
}

function insertToDB(tx) {
	tx.executeSql('INSERT INTO MAIN (uri,nickname, date,time,location,description) VALUES (1,"'+nickname+'","'+date+'","'+time+'","'+locaton+'","'+description+'")');
	viewData();
}
