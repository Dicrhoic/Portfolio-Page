
function LoadModal() {
    var modal = document.getElementById("infoModal");
    modal.style.display = "block";
}

function CloseModal() {
    var modal = document.getElementById("infoModal");
    modal.style.display = "none";
}

function LoadFilter() {
    console.log("Filtering");
    var f = document.getElementById("portfolio");  
    var fil = f.getElementsByClassName("filt");
    for(var i = 0; i < fil.length; i++)
    {
      console.log("Filter: " + i);
      fil[i].addEventListener("click", function()
      {
        var current = f.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
}

function FilterData(c){
  var x, i;
  x = document.getElementsByClassName("portfolio");
  var fil = f.getElementsByClassName("filt");
  (c == "all") ? c = "" : c = c;
  for(var i = 0; i < fil.length; i++)
  {
    
  }

}




function SearchName() {

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }