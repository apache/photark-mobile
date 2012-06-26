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

function search(){
	var name=$("searchName").value();
	var startDate=$("searchStartDate").value();
	var endDate=$("searchEndDate").value();
	var location=$("searchLocation").value();
	var people=$("searchPeople").value().split(",");
	
	if(name!===undefined && name!=""){
		searchDB('WHERE name LIKE "%'+name+'%"');
	}
}


function showResults() {
	var result=getResult();
	alert(result[0]);
	//TODO implement
	
}