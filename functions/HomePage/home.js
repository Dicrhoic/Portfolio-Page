
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