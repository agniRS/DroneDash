const path = require('path');
require('dotenv').config();
const Database = require('./database');
const db = new Database(
    process.env.DB_HOST ?? '34.139.30.197',
    process.env.DB_USERNAME ?? 'app_service_account',
    process.env.DB_PASSWORD ?? '*g)h*Xzp53,Tb~92'
);

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Call the add_owner stored procedure
app.post('/add-owner', async (req, res) => {
    const { username, first_name, last_name, address, birthdate } = req.body;
    db.addOwner(username, first_name, last_name, address, birthdate)
        .then((result) => res.send(result))
        .catch(error => res.status(400).send(error));
});

// Call the add_employee stored procedure
app.post('/add-employee', async (req, res) => {
    const { username, first_name, last_name, address, birthdate, taxID, hired, employee_experience, salary } = req.body;
    db.addEmployee(username, first_name, last_name, address, birthdate, taxID, hired, employee_experience, salary)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the addPilotRole stored procedure
app.post('/add-pilot-role', async (req, res) => {
    const { username, licenseID, pilot_experience } = req.body;
    db.addPilotRole(username, licenseID, pilot_experience)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the addWorkerRole stored procedure
app.post('/add-worker-role', async (req, res) => {
    const { username } = req.body;
    db.addWorkerRole(username)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the add_ingredient stored procedure
app.post('/add-ingredient', async (req, res) => {
    const { barcode, iname, weight } = req.body;
    db.addIngredient(barcode, iname, weight)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the add_drone stored procedure
app.post('/add-drone', async (req, res) => {
    const { id, tag, fuel, capacity, sales, flown_by } = req.body;
    db.addDrone(id, tag, fuel, capacity, sales, flown_by)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the add_restaurant stored procedure
app.post('/add-restaurant', async (req, res) => {
    const { long_name, rating, spent, location } = req.body;
    db.addRestaurant(long_name, rating, spent, location)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the add_delivery_service stored procedure
app.post('/add-delivery-service', async (req, res) => {
    const { id, long_name, home_base, manager } = req.body;
    db.addDeliveryService(id, long_name, home_base, manager)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the add_delivery_service stored procedure
app.post('/add-location', async (req, res) => {
    const { label, x_coord, y_coord, space } = req.body;
    db.addLocation(label, x_coord, y_coord, space)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the start_funding stored procedure
app.post('/start-funding', async (req, res) => {
    const { funded_by, long_name } = req.body;
    db.startFunding(funded_by, long_name)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the hire_employee stored procedure
app.post('/hire-employee', async (req, res) => {
    const { username, delivery_id } = req.body;
    db.hireEmployee(username, delivery_id)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the fire_employee stored procedure
app.post('/fire-employee', async (req, res) => {
    const { username, id } = req.body;
    db.fireEmployee(username, id)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the manage_service stored procedure
app.post('/manage-service', async (req, res) => {
    const { username, id } = req.body;
    db.manageService(username, id)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the takeover_drone stored procedure
app.post('/takeover-drone', async (req, res) => {
    const { drone_id, drone_tag, new_pilot } = req.body;
    db.takeoverDrone(drone_id, drone_tag, new_pilot)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the join_swarm stored procedure
app.post('/join-swarm', async (req, res) => {
    const { drone_id, drone_tag, swarm_tag } = req.body;
    db.joinSwarm(drone_id, drone_tag, swarm_tag)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the leave_swarm stored procedure
app.post('/leave-swarm', async (req, res) => {
    const { drone_id, drone_tag } = req.body;
    db.leaveSwarm(drone_id, drone_tag)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the load_drone stored procedure
app.post('/load-drone', async (req, res) => {
    const { drone_id, drone_tag, barcode, more_packages, price } = req.body;
    db.loadDrone(drone_id, drone_tag, barcode, more_packages, price)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the refuel_drone stored procedure
app.post('/refuel-drone', async (req, res) => {
    const { drone_id, drone_tag, fuel } = req.body;
    db.refuelDrone(drone_id, drone_tag, fuel)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the fly_drone stored procedure
app.post('/fly-drone', async (req, res) => {
    const { drone_id, drone_tag, destination } = req.body;
    db.flyDrone(drone_id, drone_tag, destination)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the purchase_ingredient stored procedure
app.post('/purchase-ingredient', async (req, res) => {
    const { long_name, drone_id, drone_tag, barcode, quantity } = req.body;
    db.purchaseIngredient(long_name, drone_id, drone_tag, barcode, quantity)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the remove_ingredient stored procedure
app.post('/remove-ingredient', async (req, res) => {
    const { barcode } = req.body;
    db.removeIngredient(barcode)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the remove_drone stored procedure
app.post('/remove-drone', async (req, res) => {
    const { drone_id, drone_tag } = req.body;
    db.removeDrone(drone_id, drone_tag)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Call the remove_pilot_role stored procedure
app.post('/remove-pilot-role', async (req, res) => {
    const { username } = req.body;
    db.removePilotRole(username)
        .then((result) => res.send(200))
        .catch(error => res.status(400).send(error));
});

// Display the owner view
app.get('/owner', (req, res) => {
    db.displayOwnerView()
        .then(results => res.json(results))
        .catch(error => res.send(error));
});

// Display the employee view
app.get('/employee', (req, res) => {
    db.displayEmployeeView()
        .then(results => res.json(results))
        .catch(error => res.send(error));
});

// Display the pilot view
app.get('/pilot', (req, res) => {
    db.displayPilotView()
        .then(results => res.json(results))
        .catch(error => res.send(error));
});

// Display the location view
app.get('/location', (req, res) => {
    db.displayLocationView()
        .then(results => res.json(results))
        .catch(error => res.send(error));
});

// Display the ingredient view
app.get('/ingredient', (req, res) => {
    db.displayIngredientView()
        .then(results => res.json(results))
        .catch(error => res.send(error));
});

// Display the service view
app.get('/service', (req, res) => {
    db.displayServiceView()
        .then(results => res.json(results))
        .catch(error => res.send(error));
});

app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(3000, () => {
    console.log('Listening on port 3000!');

    db.init();
});