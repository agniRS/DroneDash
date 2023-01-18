const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const util = require('util');

// node native promisify

class Database {
    constructor(host, username, password) {
        this.connection = mysql.createConnection({
            host: host,
            user: username,
            password: password,
            multipleStatements: true
        });
        this.query = util.promisify(this.connection.query).bind(this.connection);
    }

    async init() {
        await this.connection.connect();
        console.log("Connected to Database!");
        // let setup_sql = fs.readFileSync(path.join(__dirname, './sql/setup_db.sql'), 'utf8').toString();
        // await this.query(setup_sql);
        // console.log("Database tables have been set up!");
        // let procedure_sql = fs.readFileSync(path.join(__dirname, './sql/stored_procedures.sql'), 'utf8').toString();
        // await this.query(procedure_sql);
        // console.log("Database procedures have been set up!");
    }

    // Function to call the add_owner() stored procedure
    addOwner(username, first_name, last_name, address, birthdate) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL add_owner(?, ?, ?, ?, ?)', [username, first_name, last_name, address, birthdate], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the add_employee() stored procedure
    addEmployee(username, first_name, last_name, address, birthdate, taxID, hired, employee_experience, salary) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL add_employee(?, ?, ?, ?, ?, ?, ?, ?, ?)', [username, first_name, last_name, address, birthdate, taxID, hired, employee_experience, salary], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the add_pilot_role() stored procedure
    addPilotRole(username, licenseID, pilot_experience) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL add_pilot_role(?, ?, ?)', [username, licenseID, pilot_experience], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the add_worker_role() stored procedure
    addWorkerRole(username) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL add_worker_role(?)', [username], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the add_ingredient() stored procedure
    addIngredient(barcode, iname, weight) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL add_ingredient(?, ?, ?)', [barcode, iname, weight], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the add_drone() stored procedure
    addDrone(id, tag, fuel, capacity, sales, flown_by) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL add_drone(?, ?, ?, ?, ?, ?)', [id, tag, fuel, capacity, sales, flown_by], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the add_restaurant() stored procedure
    addRestaurant(long_name, rating, spent, location) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL add_restaurant(?, ?, ?, ?)', [long_name, rating, spent, location], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the add_delivery_service() stored procedure
    addDeliveryService(id, long_name, home_base, manager) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            console.log(id);
            console.log(long_name);
            console.log(home_base);
            console.log(manager);
            this.connection.query('CALL add_service(?, ?, ?, ?)', [id, long_name, home_base, manager], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the add_location() stored procedure
    addLocation(label, x_coord, y_coord, space) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL add_location(?, ?, ?, ?)', [label, x_coord, y_coord, space], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the start_funding() stored procedure
    startFunding(funded_by, long_name) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL start_funding(?, ?)', [funded_by, long_name], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the hire_employee() stored procedure
    hireEmployee(username, delivery_id) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL hire_employee(?, ?)', [username, delivery_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the fire_employee() stored procedure
    fireEmployee(username, id) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL fire_employee(?, ?)', [username, id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the manage_service() stored procedure
    manageService(username, id) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL manage_service(?, ?)', [username, id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the takeover_drone() stored procedure
    takeoverDrone(drone_id, drone_tag, new_pilot) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL takeover_drone(?, ?, ?)', [new_pilot, drone_id, drone_tag ], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the join_swarm() stored procedure
    joinSwarm(drone_id, drone_tag, swarm_tag) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL join_swarm(?, ?, ?)', [drone_id, drone_tag, swarm_tag], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the leave_swarm() stored procedure
    leaveSwarm(drone_id, drone_tag) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.quert('use restaurant_supply_express');
            this.connection.query('CALL leave_swarm(?, ?)', [drone_id, drone_tag], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the load_drone() stored procedure
    loadDrone(drone_id, drone_tag, barcode, more_packages, price) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL load_drone(?, ?, ?, ?, ?)', [drone_id, drone_tag, barcode, more_packages, price], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the refuel_drone() stored procedure
    refuelDrone(drone_id, drone_tag, fuel) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL refuel_drone(?, ?, ?)', [drone_id, drone_tag, fuel], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the fly_drone() stored procedure
    flyDrone(drone_id, drone_tag, destination) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL fly_drone(?, ?, ?)', [drone_id, drone_tag, destination], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the purchase_ingredient() stored procedure
    purchaseIngredient(long_name, drone_id, drone_tag, barcode, quantity) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL purchase_ingredient(?, ?, ?, ?, ?)', [long_name, drone_id, drone_tag, barcode, quantity], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the remove_ingredient() stored procedure
    removeIngredient(barcode) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL remove_ingredient(?)', [barcode], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

     // Function to call the remove_drone() stored procedure
     removeDrone(drone_id, drone_tag) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL remove_drone(?, ?)', [drone_id, drone_tag], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the remove_pilot_role() stored procedure
    removePilotRole(username) {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('CALL remove_pilot_role(?)', [username], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the display_owner_view() stored procedure
    displayOwnerView() {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('SELECT * FROM display_owner_view', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the display_employee_view() stored procedure
    displayEmployeeView() {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('SELECT * FROM display_employee_view', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the display_pilot_view() stored procedure
    displayPilotView() {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('SELECT * FROM display_pilot_view', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the display_location_view() stored procedure
    displayLocationView() {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('SELECT * FROM display_location_view', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the display_ingredient_view() stored procedure
    displayIngredientView() {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('SELECT * FROM display_ingredient_view', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Function to call the display_service_view() stored procedure
    displayServiceView() {
        return new Promise((resolve, reject) => {
            // Call the stored procedure
            this.connection.query('SELECT * FROM display_service_view', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = Database;