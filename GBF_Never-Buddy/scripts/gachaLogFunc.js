/*
function addDateToForm() {
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

*/


function LoadDropDownData() {
    characterList.clear();
    let index = 0;
    let sqlite3 = require('sqlite3');
    let db = new sqlite3.Database('./databases/localDB.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the localDB database.');
    });
    db.serialize(() => {
        db.each(`SELECT * 
				 FROM GachaCharacters`, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            let charData = new Character(row.Name, row.Series, row.Element, row.Image, row.Link);
            console.log(charData.name + "\t" + charData.link);
            characterList.set(index, charData);
            index++;
            console.log(characterList.size);
        });
    });
    console.log(characterList.size);
    retreiveGachaData();
}

function loadCharacterDropdown() {

        var date = document.getElementById('gachatime').value
        console.log(date);
        if (document.getElementById('vol').value != 0) {
            console.log("Data is avaliable");
            addCharsToDropDown();
        }
  

}

function addCharsToDropDown() {
    let size = characterList.size;
    console.log(characterList.size);
    if (size == 1) {
        LoadDropDownData();
    }
    else {
        fillDropdown();
    }
}

const characterList = new Map([
    ["apples", 500],
]);

function fillDropdown() {
    var myDiv = document.getElementById('characterAdderSeg');
    document.getElementById('characterAdderSeg').style.display = "inline";
    for(const index of characterList.keys())
    {   
        const characterData = characterList.get(index);
        var selectList = document.getElementById('characterList');
        var option = document.createElement("option");
        option.setAttribute("value", characterData.name);
        option.text = characterData.name;
        selectList.appendChild(option);
        console.log(index, characterData.name);
    }


}

/**
 * Here an import process is used for our mock session
 */



function loadGachaLogFile() {
    if (loggedUser == "") {
        loginAuth();
        return;
    }
    var xmlFile = 'GachaLog.xml';
    parser = new DOMParser();
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", xmlFile, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(xhttp.responseText);
            addGachaOutput(this);
        }
    }
}

function addGachaOutput(xml) {
    console.log("Appending to gachaLog");
    var newAtt, newNode;
    var xmlDoc = xml.responseXML;
    var a = xmlDoc.documentElement;
    var doc = xmlDoc.getElementsByTagName("gachas")[0];
    newNode = xmlDoc.createElement("gacha");
    newAtt = xmlDoc.createAttribute("user");
    var user = loggedUser;
    newAtt.nodeValue = user;
    var crystals = document.getElementById('crystalsUsed').value;
    cost = xmlDoc.createElement("crystalsUsed");
    cost.nodeValue = crystals;
    newNode.setAttribute("user", loggedUser);
    newNode.appendChild(cost);
    for (i = 0; i < characterNumber; i++) {
        var charId = "char " + i;
        newCharImg = xmlDoc.createElement("character");
        newText = document.getElementById(charId).src;
        newCharImg.nodeValue = newText;
        newNode.appendChild(newCharImg);
        console.log("Appending " + newCharImg);
    }
    var y, i, txt, test;
    doc.appendChild(newNode);
    test = xmlDoc.createElement("edition");
    doc.append(test);
    console.log("Appended to gachaLog");
    xlen = doc.childNodes.length;
    y = doc.firstChild;
    txt = "";
    for (i = 0; i < xlen; i++) {
        if (y.nodeType == 1) {
            txt += y.nodeName;
        }
        console.log(txt);
        y = y.nextSibling;
    }
}

let characterNumber = 0;

function addCharacterToWall() {
    let index = document.getElementById("characterList").selectedIndex;
    console.log("Selected char is at " + index);
    var character = characterList.get(index);
    var myDiv = document.getElementById('characterWall');
    var characterArt = document.createElement('img');
    characterArt.setAttribute('src', character.characterImage());
    var idName = "char " + characterNumber.toString();
    //console.log(idName);
    characterArt.setAttribute("onclick", "deleteCharArt(this);");
    characterArt.setAttribute('width', "150");
    characterArt.setAttribute('width', "86");
    characterArt.setAttribute("id", idName);
    myDiv.append(characterArt);
    characterNumber++;
}

function deleteCharArt(ele) {
    var id = ele.id;
    var element = document.getElementById(id);
    console.log("removing " + id);
    element.remove();
    console.log("Gone");

}

function loadCharacterImage() {
    let index = document.getElementById("characterList").selectedIndex;
    console.log("Selected char is at " + index);
    var character = characterList.get(index);
    console.log(character.characterImage());
    document.getElementById('characterIcon').src = character.characterImage();

}

class Character {

    constructor(name, series, element, image, link) {
        this.name = name;
        this.series = series;
        this.element = element;
        this.image = image;
        this.link = link;
    }
    characterImage() {
        return this.image;
    }
    characterName() {
        return this.name;
    }
}

class Characters {
    constructor() {
        this.characters = [];
    }
    newCharacter(name, link) {
        let c = new Character(name, link);
        this.characters.push(c);
        return c;
    }
    getCharacter(index) {
        return this.characters[index];
    }
}