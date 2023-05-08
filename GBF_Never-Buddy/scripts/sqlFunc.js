class GachaData
{
    constructor(id, drawId, date, spark)
    {
        this.id = id;
        this.drawId = drawId;
        this.date = date;
        this.spark = spark;
    }
}

class Results
{
    constructor(id, drawId, characterString, summonString, drawNum, crystalsUsed)
    {
        this.id = id;
        this.drawId = drawId;
        this.characterString = characterString;
        this.summonString = summonString;
        this.drawNum = drawNum;
        this.crystalsUsed = crystalsUsed;
    }
}

const drawList = new Map([
    ["apples", 500],
]);

const resultsList = new Map([
    ["apples", 500],
]);

const dataTable = new Map([
    ["apples", 500],
]);

var db;

function retreiveGachaData()
{
    drawList.clear();
    resultsList.clear();
    let index = 0;
    let sqlite3 = require('sqlite3');
    db = new sqlite3.Database('./databases/localDB.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the localDB database.');
    });
    db.serialize(() => {
        db.each(`SELECT * 
				 FROM DrawData`, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            let data = new GachaData(row.Id, row.DrawID, row.Date, row.Spark);
            drawList.set(index, data);
            index++;
            console.log(drawList.size);
        });
    });
    index = 0;
    db.serialize(() => {
        db.each(`SELECT * 
				 FROM DrawResults`, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            let dataR = new Results(row.Id, row.DrawID, row.CharacterString, row.SummonString, row.DrawNum, row.CrystalsUsed);            
            resultsList.set(row.DrawID, dataR);
            index++;
            console.log("Results:" + resultsList.size);
        });
    });
    
}

function CreateTableData()
{   
    dataTable.clear();
    var old_tbody = document.getElementById("tbod");
    var new_tbody = document.createElement('tbody');
    console.log("Hello size: " + drawList.size);
    let itr1 = 0;
    for (const itr of resultsList.keys())
    {  
        var table = document.createElement("table");
        var thd = document.createElement("thead");
        var tTr = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.innerHTML = "Crystals Used";
        var th2 = document.createElement("th");
        var th3 = document.createElement("th");
        const data = resultsList.get(itr);
        table.appendChild(thd);
        table.appendChild(tTr);
        table.appendChild(th1);
        table.appendChild(th2);
        table.appendChild(th3);
        const tr = document.createElement("tr");
        const h1 = document.createElement("td");
        const a = document.createElement("a");
        a.innerHTML = data.crystalsUsed;
        const h2 = document.createElement("td");
        h2.innerHTML = data.characterString;
        const h3 = document.createElement("td");
        h3.innerHTML = data.summonString;
        h1.appendChild(a);
        tr.appendChild(h1);
        tr.appendChild(h2);
        tr.appendChild(h3);
        table.appendChild(tr);
        dataTable.set(itr, table);
        console.log("Table size:" + dataTable.size);
        itr1++;
    }
    itr1 = 0;
    for(const index of drawList.keys())
    {    
    
        const drawData = drawList.get(index);
        const tr = document.createElement("tr");
        const h1 = document.createElement("td");
        const a = document.createElement("a");
        a.innerHTML = drawData.id;
        const h2 = document.createElement("td");
        h2.innerHTML = drawData.date;
        const h3 = document.createElement("td");
        h3.innerHTML = drawData.spark;
        h1.appendChild(a);
        tr.appendChild(h1);
        tr.appendChild(h2);
        tr.appendChild(h3);
        const h4 = document.createElement("td");
        const tableData = dataTable.get(itr1);
        h4.append(tableData);       
        new_tbody.appendChild(tr);  
        new_tbody.appendChild(h4);
        console.log(tableData);      
        console.log(drawData.date);
        itr1++;
    }
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
}

function LoadGachaData(ele)
{   
    var id = ele.id;
    var dataNum = document.getElementById(id);
    console.log("Function id:" + id);
}

function func()
{
    var table = document.createElement("table");
    var target = id;
    let query = 'SELECT * FROM DrawResults WHERE id = ?';   
    db.each(query, [target], (err, row) => {
        if (err) {
          throw err;
        }
        let dataR = new Results(row.Id, row.DrawID, row.CharacterString, row.SummonString, row.DrawNum, row.CrystalsUsed);         
        console.log(dataR.crystalsUsed + '\t' + dataR.characterString);   
      });
}