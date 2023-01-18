//this is supposed to be the api calls for the views but ngl idk if i did this correctly

// 25 get owner view
async function getOwner() {
    //  return await $.get('/owner');
      $.get('/owner', function(res) {
          console.log(res);
          var table = $('#ownertable'); //name of table that needs to be used to call it
          for (var i = 0; i < res.length; i++) {
              var row = $('<tr></tr>');
              row.append($('<td></td>').text(res[i].address));
              row.append($('<td></td>').text('\xa0\xa0\xa0' + res[i].debt)); //xa0 creates a space
              row.append($('<td></td>').text('\xa0\xa0\xa0' + res[i].first_name)); //xa0 creates a space
              row.append($('<td></td>').text('\xa0\xa0\xa0' + res[i].highs)); //xa0 creates a space
              row.append($('<td></td>').text('\xa0\xa0\xa0' +res[i].last_name));
              row.append($('<td></td>').text('\xa0\xa0\xa0' + res[i].lows)); //xa0 creates a space
              row.append($('<td></td>').text('\xa0\xa0\xa0' +res[i].num_places));
              row.append($('<td></td>').text('\xa0\xa0\xa0' + res[i].num_restaurants)); //xa0 creates a space
              row.append($('<td></td>').text('\xa0\xa0\xa0' +res[i].username)); // idk why birthdate isnt showing
              table.append(row);
          }
      });
      return getOwner;
  }

  //function to actually print the table
  $(function() {
    $('#ownertable').bootstrapTable({
        data: getOwner()
    });
  });

  //26 get employee view
//username, first_name, last_name, address, birthdate, taxID, hired, employee_experience, salary
async function getEmployee() {
   // return await $.get('/employee');
   $.get('/employee', function(res) {
    console.log(res);
    var table = $('#employeetable');
    for (var i = 0; i < res.length; i++) {
        var row = $('<tr></tr>');
        row.append($('<td></td>').text(res[i].experience));
        row.append($('<td></td>').text('\xa0\xa0\xa0'+ (new Date(res[i].hired).toISOString().slice(0, 10))));
        row.append($('<td></td>').text('\xa0\xa0\xa0'+res[i].licenseID));
        row.append($('<td></td>').text('\xa0\xa0\xa0'+res[i].manager_status));
        row.append($('<td></td>').text('\xa0\xa0\xa0'+res[i].piloting_experience));
        row.append($('<td></td>').text('\xa0\xa0\xa0'+res[i].salary));
        row.append($('<td></td>').text('\xa0\xa0\xa0'+res[i].taxID));
        row.append($('<td></td>').text('\xa0\xa0\xa0'+res[i].username));
        table.append(row);
    }
});

return getEmployee;
}

$(function() {
    $('#employeetable').bootstrapTable({
        data: getEmployee()
    });
  });

//27 get pilot view
//username, licenseID, pilot_experience
async function getPilot() {
    //return await $.get('/pilot');
    $.get('/pilot', function(res) {
        console.log(res);
        var table = $('#pilottable');
        for (var i = 0; i < res.length; i++) {
            var row = $('<tr></tr>');
            row.append($('<td></td>').text(res[i].username));
            row.append($('<td></td>').text('\xa0\xa0\xa0' +res[i].licenseID));
            row.append($('<td></td>').text('\xa0\xa0\xa0' +res[i].experience));
            row.append($('<td></td>').text('\xa0\xa0\xa0' +res[i].num_drones));
            row.append($('<td></td>').text('\xa0\xa0\xa0' +res[i].num_locations));
            table.append(row);
        }
    });

    return getPilot;
}
//function to actually print the table
$(function() {
    $('#pilottable').bootstrapTable({
        data: getPilot()
    });
  });

//28 get location view
//label, x_coord, y_coord, space
async function getLocation() {
   // return await $.get('/location');
   $.get('/location', function(res) {
    console.log(res);
    var table = $('#locationtable');
    for (var i = 0; i < res.length; i++) {
        var row = $('<tr></tr>');
        row.append($('<td></td>').text(res[i].delivery_services));
        row.append($('<td></td>').text('\xa0\xa0\xa0'+res[i].drones));
        row.append($('<td></td>').text('\xa0\xa0\xa0'+res[i].label));
        row.append($('<td></td>').text('\xa0\xa0\xa0'+res[i].restaurants));
        row.append($('<td></td>').text('\xa0\xa0\xa0' +res[i].x_coord));
        row.append($('<td></td>').text('\xa0\xa0\xa0' +res[i].y_coord));
        table.append(row);
    }
});

return getLocation;
}

//function to actually print the table
$(function() {
    $('#locationtable').bootstrapTable({
        data: getLocation()
    });
  });

//29 ingredient view
//barcode, iname, weight
async function getIngredient() {
    //return await $.get('/ingredient');
    $.get('/ingredient', function(res) {
        console.log(res);
        var table = $('#ingredienttable');
        for (var i = 0; i < res.length; i++) {
            var row = $('<tr></tr>');
            row.append($('<td></td>').text(res[i].amount_available));
            row.append($('<td></td>').text('\xa0\xa0\xa0' +res[i].high_price));
            row.append($('<td></td>').text('\xa0\xa0\xa0' +res[i].ingredient_name));
            row.append($('<td></td>').text('\xa0\xa0\xa0'+res[i].location));
            row.append($('<td></td>').text('\xa0\xa0\xa0'+res[i].low_price));
            table.append(row);
        }
    });

    return getIngredient;
}

//function to actually print the table
$(function() {
    $('#ingredienttable').bootstrapTable({
        data: getIngredient()
    });
  });

//30 service view
//id, long_name, home_base, manager
async function getService() {
    //return await $.get('/service');
    $.get('/service', function(res) {
        console.log(res);
        var table = $('#servicetable');
        for (var i = 0; i < res.length; i++) {
            var row = $('<tr></tr>');
            row.append($('<td></td>').text(res[i].cost_carried));
            row.append($('<td></td>').text('\xa0\xa0\xa0' +res[i].home_base));
            row.append($('<td></td>').text('\xa0\xa0\xa0' +res[i].id));
            row.append($('<td></td>').text('\xa0\xa0\xa0' +res[i].ingredients_carried));
            row.append($('<td></td>').text('\xa0\xa0\xa0'+res[i].long_name));
            row.append($('<td></td>').text('\xa0\xa0\xa0'+res[i].manager));
            row.append($('<td></td>').text('\xa0\xa0\xa0'+res[i].revenue));
            row.append($('<td></td>').text('\xa0\xa0\xa0'+res[i].weight_carried));
            table.append(row);
        }
    });

    return getService;
}

//function to actually print the table
$(function() {
    $('#servicetable').bootstrapTable({
        data: getService()
    });
  });
