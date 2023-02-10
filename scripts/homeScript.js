var loggedUser = "";
function loginAuth() {
	var xmlFile = './databases/accounts.xml';
	var xmlDoc, parser, xmlU, xmlP;
	parser = new DOMParser();
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", xmlFile, true);
	xhttp.send();
	xhttp.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			console.log(xhttp.responseText);
			credentialAuth(this);
		}
	}
}
function credentialAuth(xml) {
	var u = document.getElementById('username').value;
	var p = document.getElementById('password').value;
	console.log("P" + p, " U: " + u);
	var xmlDoc = xml.responseXML;
	var x = xmlDoc.documentElement;
	var y = xmlDoc.documentElement.childNodes;
	var txt = " ";
	var z;
	for (i = 0; i < y.length; i++) {
		for (z = 0; z < y[i].childNodes.length; z++) {
			if (y[i].childNodes[z].nodeType != 3) {
				txt += "Node " + i + " Nodename: " + y[i].childNodes[z].nodeName +
					" (value at index " + z + ": " + y[i].childNodes[z].childNodes[0].nodeValue + ")";
				//console.log(txt);
				txt = "";
				var a = y[i].childNodes[1].childNodes[0].nodeValue
				var b = y[i].childNodes[3].childNodes[0].nodeValue
				if (a == u && b == p) {
					document.getElementById("loginBtn").style.display = "none";
					document.getElementById("login").style.display = "none";
					alert("Login successful. Welcome " + a);
					loggedUser = a;
					checkLoginStatus();
					break;
				}
			}
		}
	}
}
function checkLoginStatus() {
	if (loggedUser == "") {
		var audio = new Audio('https://gbf.wiki/images/4/40/Vbli_atk_03_b.mp3');
		audio.muted = true;
		document.getElementById("signoutBtn").style.display = "none";
		alert("Please Login")
		//console.log("Playing audio");
		//audio.play();
		document.getElementById("login").style.display = "block";
	}
	if (loggedUser != "") {
		document.getElementById("signoutBtn").style.display = "inline";
	}
}
function logout() {
	loggedUser = "";
	document.getElementById("loginBtn").style.display = "inline";
	document.getElementById("signoutBtn").style.display = "none";
}
function loadLoginForm() {
	document.getElementById('login').style.display = "block";
	document.getElementById('login').style.style = "width:auto";
}
function helpPass() {
	alert("Message Dichroic on Discord");
}
function openCity(evt, cityName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " active";
}
function gachaDropDownNav() {

}
function openNav(evt, tabName) {
	console.log("Trying func");
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
}

function openNavBar() {
    document.getElementById("menuVertNavBar").style.width = "250px";
    document.getElementById("main").style.marginLeft= "250px";
    //document.body.style.backgroundColor = "white";
	LoadDropDownData();
  }

function closeNav() {
    document.getElementById("menuVertNavBar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
  }

/*
Due to no php sessions can't be save thus a concecrate js file is used for a mock session
 */
//gacha log Functions