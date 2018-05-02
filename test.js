function setParameterTable() {
    var test = window.location.search.substring(1).split("&");
    var table = document.getElementById("parameters");
    var parameterDict = {};

    for(i = 0; i < test.length; i++){
        name = test[i].split("=")[0];
        value = test[i].split("=")[1];

        var row = table.insertRow(i+1);
        row.insertCell(0).innerHTML = name;
        row.insertCell(1).innerHTML = value;
    }
}
