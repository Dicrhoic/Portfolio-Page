function addDateToForm()
{   
    console.log("loading");
    const d = new Date();
    console.log(d);
    let y = d.getFullYear();
    let m = d.getMonth() + 1;
    let dy = d.getDay();
    let date = y + "-" + m + "-" + dy;
    console.log(date);
    document.getElementsByName('gachaDate').value = date;
}

function loadCharacterDropdown()
{   
    var date = document.getElementById('gachatime').value
    console.log(date);
    if(document.getElementById('vol').value !=0)
    {
        console.log("Data is avaliable");
        addCharsToDropDown();
    }
}

function addCharsToDropDown()
{
    var xmlFile = 'SSRCharacters.xml';
	var xmlDoc, parser, xmlU, xmlP;
	parser = new DOMParser();
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", xmlFile, true);
	xhttp.send();
	xhttp.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			//console.log(xhttp.responseText);
		}
	}
}

const characterList = new Map([
    ["apples", 500],
  ]);

function fillDropdown(xml)
{   

    characterList.clear();
    var txt = " ";
    var xmlDoc = xml.responseXML;   
	var a = xmlDoc.documentElement;
	var y = xmlDoc.documentElement.childNodes;
    x = xmlDoc.documentElement.childNodes;
    var myDiv = document.getElementById('characterAdderSeg');
    document.getElementById('characterAdderSeg').style.display = "inline";
    //var selectList = document.createElement("select");
    //selectList.setAttribute("id", "characterList");
    //myDiv.appendChild(selectList);
    var current = 0;
    for (i = 0; i < x.length ;i++) {
        for (z = 0; z < y[i].childNodes.length; z++) {
			if (y[i].childNodes[z].nodeType != 3) {
				txt += "Node " + i + " Nodename: " + y[i].childNodes[z].nodeName +
					" (value at index " + z + ": " + y[i].childNodes[z].childNodes[0].nodeValue + ")";
				//console.log(txt);
				txt = "";
                if(z == 1)
                {
                    var name = y[i].childNodes[1].childNodes[0].nodeValue; 
                    var image = y[i].childNodes[5].childNodes[0].nodeValue;
                    let newChrter = new Character(name, image);
                    characterList.set(i,newChrter);
                    console.log("This class is: " + characterList.get(i));
                    var selectList = document.getElementById('characterList');
                    var option = document.createElement("option");
                    option.setAttribute("value", name);
                    option.text = name;
                    selectList.appendChild(option);
                    //console.log("Appended " + i + " times");
                    console.log("Image link: " + newChrter.characterImage());
                }
 
			}
		}
    }
}

function test(xml)
{
    characterList.clear();
    var txt = " ";
    var xmlDoc = xml.responseXML;   
	var a = xmlDoc.documentElement;
	var y = xmlDoc.documentElement.childNodes;
    x = xmlDoc.documentElement.childNodes;
    var myDiv = document.getElementById('characterAdderSeg');
    document.getElementById('characterAdderSeg').style.display = "inline";
    //var selectList = document.createElement("select");
    //selectList.setAttribute("id", "characterList");
    //myDiv.appendChild(selectList);
    var current = 0;
    for (i = 0; i < x.length ;i++) {
        for (z = 0; z < y[i].childNodes.length; z++) {
			if (y[i].childNodes[z].nodeType != 3) {
				txt += "Node " + i + " Nodename: " + y[i].childNodes[z].nodeName +
					" (value at index " + z + ": " + y[i].childNodes[z].childNodes[0].nodeValue + ")";
				txt = "";
                if(z == 1)
                {
                    var name = y[i].childNodes[1].childNodes[0].nodeValue; 
                    var image = y[i].childNodes[5].childNodes[0].nodeValue;
                    let newChrter = new Character(name, image);
                    characterList.set(i,newChrter);
                    var selectList = document.getElementById('characterList');
                    var option = document.createElement("option");
                    option.setAttribute("value", name);
                    option.text = name;
                    selectList.appendChild(option);
                    console.log("Image link: " + newChrter.characterImage());
                }
 
			}
		}
    }
}

function loadCharacterImage()
{
    let index = document.getElementById("characterList").selectedIndex;
    console.log("Selected char is at " + index);
    var character = characterList.get(index);
    console.log(character.characterImage())
    document.getElementById('characterIcon').src = character.characterImage();
  
}

class Character
{
    constructor(name, link)
    {
        this.name = name;
        this.link = link;   
    }
    characterImage()
    {
        return this.link;
    }
    characterName()
    {
        return this.name;
    }
}