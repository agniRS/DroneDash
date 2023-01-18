async function getAllUsers() {
    $.get('/get-all-users', function(res) {
        console.log(res);
        var table = $('#userTable');
        for (var i = 0; i < res.length; i++) {
            var row = $('<tr></tr>');
            row.append($('<td></td>').text(res[i].username));
            row.append($('<td></td>').text(res[i].first_name));
            row.append($('<td></td>').text(res[i].last_name));
            row.append($('<td></td>').text(res[i].email));
            row.append($('<td></td>').text(res[i].type));
            table.append(row);
        }
    });
    return allUsers;
}

// 1owner
async function addOwner(data) {
    try {
        let response = await $.post('/add-owner', data);
    } catch {
        alert("Error with trying to call add owner procedure");
    }
    location.reload();
}
//2 employee
async function addEmployee(data) {
    try {
        let response = await $.post('/add-employee', data);
    } catch {
        alert("Error with trying to call add employee procedure");
    }
    location.reload();
}

// 3pilot role
async function addPilotRole(data) {
    try {
        let response = await $.post('/add-pilot-role', data);
    } catch {
        alert("Error with trying to call add pilot role procedure");
    }
    location.reload();
}

//4 worker role
async function addWorkerRole(data) {
    try {
        let response = await $.post('/add-worker-role', data);
    } catch {
        alert("Error with trying to call add pilot role procedure");
    }
    location.reload();
}

//5 add-ingredient
async function addIngredient(data) {
    try {
        let response = await $.post('/add-ingredient', data);
    } catch {
        alert("Error with trying to call add ingredient procedure");
    }
    location.reload();
}

//6 add drone
async function addDrone(data) {
    try {
        let response = await $.post('/add-drone', data);
    } catch {
        alert("Error with trying to call add drone procedure");
    }
    location.reload();
}
// 7 add restaurant
async function addRestaurant(data) {
    try {
        let response = await $.post('/add-restaurant', data);
    } catch {
        alert("Error with trying to call add restaurant procedure");
    }
    location.reload();
}

// 8 add deliv service
async function addDeliveryService(data) {
    try {
        let response = await $.post('/add-delivery-service', data);
    } catch {
        alert("Error with trying to call add delivery service procedure");
    }
    location.reload();
}

//9 add location
async function addLocation(data) {
    try {
        let response = await $.post('/add-location', data);
    } catch {
        alert("Error with trying to call add location procedure");
    }
    location.reload();
}

// 10 start funding
async function startFunding(data) {
    try {
        let response = await $.post('/start-funding', data);
    } catch {
        alert("Error with trying to call start funding procedure");
    }
    location.reload();
}

// 11 hire employee

async function hireEmployee(data) {
    try {
        let response = await $.post('/hire-employee', data);
    } catch {
        alert("Error with trying to call hire employee procedure");
    }
    location.reload();
}

// 12 fire employee

async function fireEmployee(data) {
    try {
        let response = await $.post('/fire-employee', data);
    } catch {
        alert("Error with trying to call fire-employee procedure");
    }
    location.reload();
}

// 13 manageService

async function manageService(data) {
    try {
        let response = await $.post('/manage-service', data);
    } catch {
        alert("Error with trying to call manage service procedure");
    }
    location.reload();
}

// 14 takeoverDrone

async function takeoverDrone(data) {
    try {
        let response = await $.post('/takeover-drone', data);
    } catch {
        alert("Error with trying to call takedrone drone procedure");
    }
    location.reload();
}

//15 joinSwarm

async function joinSwarm(data) {

    try {
        let response = await $.post('/join-swarm', data);
    } catch {
        alert("Error with trying to call join swarm procedure");
    }
    location.reload();
}

//16 leaveSwarm

async function leaveSwarm(data) {
    try {
        let response = await $.post('/leave-swarm', data);
    } catch {
        alert("Error with trying to call leave swarm procedure");
    }
    location.reload();
}

//17 loadDrone

async function loadDrone(data) {
    try {
        let response = await $.post('/load-drone', data);
    } catch {
        alert("Error with trying to call load drone procedure");
    }
    location.reload();
}

// 18 refuelDrone

async function refuelDrone(data) {
    try {
        let response = await $.post('/refuel-drone', data);
    } catch {
        alert("Error with trying to call refuel drone procedure");
    }
    location.reload();
}

//19 fuelRequired

//20 flyDrone

async function flyDrone(data) {
    try {
        let response = await $.post('/fly-drone', data);
    } catch {
        alert("Error with trying to call fly drone procedure");
    }
    location.reload();
}

//21 purchase ingredient

async function purchaseIngredient(data) {
    try {
        let response = await $.post('/purchase-ingredient', data);
    } catch {
        alert("Error with trying to call purchase ingredient procedure");
    }
    location.reload();
}

//22 remove ingredient

async function removeIngredient(data) {
    try {
        let response = await $.post('/remove-ingredient', data);
    } catch {
        alert("Error with trying to call remove ingredient procedure");
    }
    location.reload();
}

//23 remove drone

async function removeDrone(data) {
    try {
        let response = await $.post('/remove-drone', data);
    } catch {
        alert("Error with trying to call remove drone procedure");
    }
    location.reload();
}

//24 remove pilot
async function removePilotRole(data) {
    try {
        let response = await $.post('/remove-pilot-role', data);
    } catch {
        alert("Error with trying to call remove pilot procedure");
    }
    location.reload();
}


// 25 get owner view
async function getOwners() {
  return await $.get('/owner');
    
}

//26 get employee view
//username, first_name, last_name, address, birthdate, taxID, hired, employee_experience, salary
async function getEmployees() {
    return await $.get('/employee');
}

//27 get pilot view

async function getPilots() {
    return await $.get('/pilot');
}

//28 get location view
async function getLocations() {
    return await $.get('/location');
}

//29 ingredient view
async function getIngredients() {
    return await $.get('/ingredient');
}

//30 service view
async function getServices() {
    return await $.get('/service');
}


