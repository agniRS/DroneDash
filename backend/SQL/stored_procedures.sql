-- CS4400: Introduction to Database Systems (Fall 2022)
-- Project Phase III: Stored Procedures SHELL [v0] Monday, Oct 31, 2022
# set global transaction isolation level serializable;
# set global SQL_MODE = 'ANSI,TRADITIONAL';
set names utf8mb4;
set SQL_SAFE_UPDATES = 0;

use restaurant_supply_express;
-- -----------------------------------------------------------------------------
-- stored procedures and views
-- -----------------------------------------------------------------------------
/* Standard Procedure: If one or more of the necessary conditions for a procedure to
be executed is false, then simply have the procedure halt execution without changing
the database state. Do NOT display any error messages, etc. */

-- [1] add_owner()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new owner.  A new owner must have a unique
username.  Also, the new owner is not allowed to be an employee. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_owner;
# delimiter ;
create procedure add_owner (in ip_username varchar(40), in ip_first_name varchar(100),
                            in ip_last_name varchar(100), in ip_address varchar(500), in ip_birthdate date)
sp_main: begin
    IF (ip_username NOT IN  (
        SELECT distinct username FROM users))
    then
        insert into users values (ip_username, ip_first_name, ip_last_name, ip_address, ip_birthdate);
        insert into restaurant_owners values (ip_username);
    end if;
    -- ensure new owner has a unique username
end ;
# delimiter ;

-- [2] add_employee()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new employee without any designated pilot or
worker roles.  A new employee must have a unique username unique tax identifier. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_employee;
# delimiter ;
create procedure add_employee (in ip_username varchar(40), in ip_first_name varchar(100),
                               in ip_last_name varchar(100), in ip_address varchar(500), in ip_birthdate date,
                               in ip_taxID varchar(40), in ip_hired date, in ip_employee_experience integer,
                               in ip_salary integer)
sp_main: begin
    IF (ip_username IN  (
        SELECT username FROM employees))
    then leave sp_main; end if;
    IF (ip_taxID IN  (
        SELECT taxID FROM employees))
    then leave sp_main; end if;
    insert into users values (ip_username, ip_first_name, ip_last_name, ip_address, ip_birthdate);
    insert into employees values (ip_username,ip_taxID, ip_hired, ip_employee_experience, ip_salary);
    -- ensure new owner has a unique username
    -- ensure new employee has a unique tax identifier
end ;
# delimiter ;

-- [3] add_pilot_role()
-- -----------------------------------------------------------------------------
/* This stored procedure adds the pilot role to an existing employee.  The
employee/new pilot must have a unique license identifier. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_pilot_role;
# delimiter ;
create procedure add_pilot_role (in ip_username varchar(40), in ip_licenseID varchar(40),
                                 in ip_pilot_experience integer)
sp_main: begin
    -- ensure new employee exists
    IF( ip_username NOT IN (SELECT username FROM employees))
    then leave sp_main; end if;
    -- ensure new pilot has a unique license identifier
    IF ( ip_licenseID IN (SELECT licenseID from pilots))
    then leave sp_main; end if;
    insert into pilots values (ip_username, ip_licenseID, ip_pilot_experience);
    -- ensure new pilot has a unique license identifier
end ;
# delimiter ;

-- [4] add_worker_role()
-- -----------------------------------------------------------------------------
/* This stored procedure adds the worker role to an existing employee. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_worker_role;
# delimiter ;
create procedure add_worker_role (in ip_username varchar(40))
sp_main: begin
    -- ensure new employee exists
    IF( ip_username NOT IN (SELECT username FROM employees))
    then leave sp_main; end if;
    insert into workers values (ip_username);
end ;
# delimiter ;

-- [5] add_ingredient()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new ingredient.  A new ingredient must have a
unique barcode. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_ingredient;
# delimiter ;
create procedure add_ingredient (in ip_barcode varchar(40), in ip_iname varchar(100),
                                 in ip_weight integer)
sp_main: begin
    -- ensure new ingredient doesn't already exist
    IF( ip_barcode IN (SELECT barcode FROM ingredients))
    then leave sp_main; end if;
    insert into ingredients values (ip_barcode, ip_iname, ip_weight);
end ;
# delimiter ;

-- [6] add_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new drone.  A new drone must be assigned 
to a valid delivery service and must have a unique tag.  Also, it must be flown
by a valid pilot initially (i.e., pilot works for the same service), but the pilot
can switch the drone to working as part of a swarm later. And the drone's starting
location will always be the delivery service's home base by default. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_drone;
# delimiter ;
create procedure add_drone (in ip_id varchar(40), in ip_tag integer, in ip_fuel integer,
                            in ip_capacity integer, in ip_sales integer, in ip_flown_by varchar(40))
sp_main: begin
    -- ensure new drone doesn't already exist
    IF exists(SELECT * FROM drones where id = ip_id and tag = ip_tag)
    then leave sp_main; end if;
    -- ensure that the delivery service exists
    IF( ip_id NOT IN (SELECT id FROM delivery_services))
    then leave sp_main; end if;
    -- ensure that a valid pilot will control the drone
    IF(ip_flown_by NOT IN (SELECT work_for.username FROM work_for JOIN pilots where work_for.username = pilots.username
                                                                                and ( ip_id = work_for.id)))
    then leave sp_main; end if;
    insert into drones values (ip_id, ip_tag, ip_fuel, ip_capacity, ip_sales, ip_flown_by, null, null,
                               (select home_base from delivery_services where id = ip_id));

end ;
# delimiter ;

-- [7] add_restaurant()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new restaurant.  A new restaurant must have a
unique (long) name and must exist at a valid location, and have a valid rating.
And a resturant is initially "independent" (i.e., no owner), but will be assigned
an owner later for funding purposes. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_restaurant;
# delimiter ;
create procedure add_restaurant (in ip_long_name varchar(40), in ip_rating integer,
                                 in ip_spent integer, in ip_location varchar(40))
sp_main: begin
    -- ensure new restaurant doesn't already exist
    IF( ip_long_name IN (SELECT long_name FROM restaurants))
    then leave sp_main; end if;
    -- ensure that the location is valid
    IF ip_location IN (SELECT location FROM restaurants WHERE location = NULL)
    then leave sp_main; end if;
    IF ip_location NOT IN (SELECT location FROM restaurants)
    then leave sp_main; end if;
    -- ensure that the rating is valid (i.e., between 1 and 5 inclusively)
    IF ip_rating NOT IN (SELECT rating FROM restaurants WHERE rating >= 1 and rating <= 5)
    then leave sp_main; end if;
    insert into restaurants values (ip_long_name, ip_rating, ip_spent, ip_location, null);
end ;
# delimiter ;

-- [8] add_service()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new delivery service.  A new service must have
a unique identifier, along with a valid home base and manager. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_service;
# delimiter ;
create procedure add_service (in ip_id varchar(40), in ip_long_name varchar(100),
                              in ip_home_base varchar(40), in ip_manager varchar(40))
sp_main: begin
    -- ensure new delivery service doesn't already exist
    IF( ip_id IN (SELECT id FROM delivery_services))
    then leave sp_main; end if;
    -- ensure that the home base location is valid
    IF(ip_home_base NOT IN (SELECT label FROM locations))
    then leave sp_main; end if;
    -- ensure that the manager is valid
    IF(ip_manager IN (SELECT manager FROM delivery_services JOIN workers
                          WHERE delivery_services.manager = workers.username))
    then leave sp_main; end if;
    insert into delivery_services values (ip_id, ip_long_name, ip_home_base, ip_manager);

end ;
# delimiter ;

-- [9] add_location()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new location that becomes a new valid drone
destination.  A new location must have a unique combination of coordinates.  We
could allow for "aliased locations", but this might cause more confusion that
it's worth for our relatively simple system. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_location;
# delimiter ;
create procedure add_location (in ip_label varchar(40), in ip_x_coord integer,
                               in ip_y_coord integer, in ip_space integer)
sp_main: begin
    IF (ip_label IN (
        SELECT label FROM locations))
    then leave sp_main; end if;
    IF exists(SELECT * FROM locations where x_coord = ip_x_coord and y_coord = ip_y_coord)
    then leave sp_main; end if;
    insert into locations values(ip_label, ip_x_coord, ip_y_coord, ip_space);
    -- ensure new location doesn't already exist
    -- ensure that the coordinate combination is distinct
end ;
# delimiter ;

-- [10] start_funding()
-- -----------------------------------------------------------------------------
/* This stored procedure opens a channel for a restaurant owner to provide funds
to a restaurant. If a different owner is already providing funds, then the current
owner is replaced with the new owner.  The owner and restaurant must be valid. */
-- -----------------------------------------------------------------------------
drop procedure if exists start_funding;
# delimiter ;
create procedure start_funding (in ip_owner varchar(40), in ip_long_name varchar(40))
sp_main: begin
    IF (ip_owner NOT IN (
        SELECT username FROM restaurant_owners))
    then leave sp_main; end if;
    IF (ip_long_name NOT IN (
        SELECT long_name FROM restaurants))
    then leave sp_main; end if;

    -- IF (funded_by in (select funded_by from restaurants where funded_by != null))
    update restaurants set funded_by = ip_owner where long_name = ip_long_name; -- end if;


    -- ensure the owner and restaurant are valid
end ;
# delimiter ;

-- [11] hire_employee()
-- -----------------------------------------------------------------------------
/* This stored procedure hires an employee to work for a delivery service.
Employees can be combinations of workers and pilots. If an employee is actively
controlling drones or serving as manager for a different service, then they are
not eligible to be hired.  Otherwise, the hiring is permitted. */
-- -----------------------------------------------------------------------------
drop procedure if exists hire_employee;
# delimiter ;
create procedure hire_employee (in ip_username varchar(40), in ip_id varchar(40))
sp_main: begin
    if(0=(select count(*) from work_for where username=ip_username and id=ip_id ))then
        if(1=(select count(*) from delivery_services where id=ip_id))then
            if(0=(select count(*) from delivery_services where manager=ip_username))then
                if(0=(select count(*) from drones where flown_by=ip_username))then
                    insert into work_for values (ip_username,ip_id);
                end if;
            end if;
        end if;
    end if;
end ;
# delimiter ;

-- [12] fire_employee()
-- -----------------------------------------------------------------------------
/* This stored procedure fires an employee who is currently working for a delivery
service.  The only restrictions are that the employee must not be: [1] actively
controlling one or more drones; or, [2] serving as a manager for the service.
Otherwise, the firing is permitted. */
-- -----------------------------------------------------------------------------
drop procedure if exists fire_employee;
# delimiter ;
create procedure fire_employee (in ip_username varchar(40), in ip_id varchar(40))
sp_main: begin
    -- ensure that the employee is currently working for the service
    IF( (ip_username, ip_id) NOT IN (
        SELECT username, id FROM work_for))
    then  leave sp_main; end if;
    -- ensure that the employee isn't an active manager
    IF (ip_username IN (
        SELECT manager FROM delivery_services))
    then leave sp_main; end if;
    -- ensure that the employee isn't controlling any drones
    IF (ip_username IN (
        SELECT flown_by FROM drones ))
    then leave sp_main; end if;
    delete from work_for where(ip_username = username and ip_id = id);
end ;
# delimiter ;

-- [13] manage_service()
-- -----------------------------------------------------------------------------
/* This stored procedure appoints an employee who is currently hired by a delivery
service as the new manager for that service.  The only restrictions are that: [1]
the employee must not be working for any other delivery service; and, [2] the
employee can't be flying drones at the time.  Otherwise, the appointment to manager
is permitted.  The current manager is simply replaced.  And the employee must be
granted the worker role if they don't have it already. */
-- -----------------------------------------------------------------------------
drop procedure if exists manage_service;
# delimiter ;
create procedure manage_service (in ip_username varchar(40), in ip_id varchar(40))
sp_main: begin
    -- ensure that the employee is currently working for the service
    IF( (ip_username, ip_id) NOT IN (
        SELECT username, id FROM work_for))
    then leave sp_main; end if;
    -- ensure that the employee is not flying any drones
    IF( ip_username IN ( SELECT flown_by FROM drones))
    then leave sp_main; end if;
    -- ensure that the employee isn't working for any other services
    IF( ip_username IN (
        SELECT username FROM work_for
        WHERE ip_id != id ))
    then leave sp_main; end if;
    -- add the worker role if necessary
    IF( ip_username NOT IN (
        SELECT username FROM workers)) then
        insert into workers values(ip_username, ip_id); end if;
    update delivery_services set manager = ip_username where id = ip_id;
end ;
# delimiter ;

-- [14] takeover_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure allows a valid pilot to take control of a lead drone owned
by the same delivery service, whether it's a "lone drone" or the leader of a swarm.
The current controller of the drone is simply relieved of those duties. And this
should only be executed if a "leader drone" is selected. */
-- -----------------------------------------------------------------------------
drop procedure if exists takeover_drone;
# delimiter ;
create procedure takeover_drone (in ip_username varchar(40), in ip_id varchar(40),
                                 in ip_tag integer)
sp_main: begin
    -- ensure that the employee is currently working for the service
    IF((ip_username, ip_id) NOT IN (
        SELECT username, id FROM work_for))
    then leave sp_main; end if;
    -- ensure that the selected drone is owned by the same service and is a leader and not follower
    IF( ip_tag not in (select tag from drones where ip_id = id and flown_by is not null))
    then leave sp_main; end if;
    -- ensure that the employee isn't a manager
    IF( ip_username in (select manager from delivery_services))
    then leave sp_main; end if;
    -- ensure that the employee is a valid pilot
    if ip_username not in (select username from pilots)
    then leave sp_main; end if;

    update drones set flown_by = ip_username where (ip_tag = tag and ip_id = id);
end ;
# delimiter ;

-- [15] join_swarm()
-- -----------------------------------------------------------------------------
/* This stored procedure takes a drone that is currently being directly controlled
by a pilot and has it join a swarm (i.e., group of drones) led by a different
directly controlled drone. A drone that is joining a swarm connot be leading a
different swarm at this time.  Also, the drones must be at the same location, but
they can be controlled by different pilots. */
-- -----------------------------------------------------------------------------
drop procedure if exists join_swarm;
# delimiter ;
create procedure join_swarm (in ip_id varchar(40), in ip_tag integer,
                             in ip_swarm_leader_tag integer)
sp_main: begin
    -- ensure that the swarm leader is a different drone
    IF(ip_swarm_leader_tag IN (SELECT tag FROM drones WHERE tag = ip_tag))
    then leave sp_main; end if;
    -- ensure that the drone joining the swarm is valid and owned by the service
    IF( (ip_id, ip_tag) in (select id, tag from drones where id = ip_id and flown_by = null))
    then leave sp_main; end if;
    -- ensure that the drone joining the swarm is not already leading a swarm
    IF exists(SELECT * FROM drones where swarm_tag = ip_tag and swarm_id = ip_id)
    then leave sp_main; end if;
    -- ensure that the swarm leader drone is directly controlled
    IF( (ip_id, ip_tag) in (select id, tag from drones where flown_by = null))
    then leave sp_main; end if;
    -- ensure that the drones are at the same location
    if ((select hover from drones where ip_id = id and ip_tag = tag) != (select hover from drones where ip_id = id and swarm_tag = ip_tag))
    then leave sp_main; end if;
    update drones set swarm_tag = ip_swarm_leader_tag , swarm_id = ip_id, flown_by = null where (id = ip_id and tag = ip_tag);


end ;
# delimiter ;

-- [16] leave_swarm()
-- -----------------------------------------------------------------------------
/* This stored procedure takes a drone that is currently in a swarm and returns
it to being directly controlled by the same pilot who's controlling the swarm. */
-- -----------------------------------------------------------------------------
drop procedure if exists leave_swarm;
# delimiter ;
create procedure leave_swarm (in ip_id varchar(40), in ip_swarm_tag integer)
sp_main: begin
    -- ensure that the selected drone is owned by the service and flying in a swarm
    if((ip_id, ip_swarm_tag) not in
       (select id, tag from drones where swarm_id is not null and swarm_tag is not null))
    then leave sp_main; end if;

    update drones set flown_by = (select flown_by from
        (select b.flown_by, c.id, c.tag from drones as b join drones as c on b.id = c.swarm_id and b.tag = c.swarm_tag) as itable
                                  where ip_id = itable.id and ip_swarm_tag = itable.tag) where ip_id = id and ip_swarm_tag = tag;

    update drones set swarm_id = null where ip_id = id and ip_swarm_tag = tag;
    update drones set swarm_tag = null where ip_id = id and ip_swarm_tag = tag;

end ;
# delimiter ;

-- [17] load_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to add some quantity of fixed-size packages of
a specific ingredient to a drone's payload so that we can sell them for some
specific price to other restaurants.  The drone can only be loaded if it's located
at its delivery service's home base, and the drone must have enough capacity to
carry the increased number of items.

The change/delta quantity value must be positive, and must be added to the quantity
of the ingredient already loaded onto the drone as applicable.  And if the ingredient
already exists on the drone, then the existing price must not be changed. */
-- -----------------------------------------------------------------------------
drop procedure if exists load_drone;
# delimiter ;
create procedure load_drone (in ip_id varchar(40), in ip_tag integer, in ip_barcode varchar(40),
	in ip_more_packages integer, in ip_price integer)
sp_main: begin
	-- ensure that the drone being loaded is owned by the service
    if (1 = (select count(*) from drones where id=ip_id and tag=ip_tag)) then
        -- ensure that the drone is located at the service home base
		if ((select hover from drones where id=ip_id and tag=ip_tag) = (select home_base from delivery_services where id=ip_id)) then
        	-- ensure that the ingredient is valid
			if (1 = (select count(*) from ingredients where barcode=ip_barcode)) then
            	-- ensure that the quantity of new packages is greater than zero
                if (ip_more_packages > 0) then
                	-- ensure that the drone has sufficient capacity to carry the new packages
-- 					SET @weight = (select weight from ingredients where barcode=ip_barcode) * ip_more_packages;
--                  SET @drone_init_weight = (select sum(quantity * weight) from (select barcode, quantity from payload where id=ip_id and tag=ip_tag) as temp natural join ingredients);

                    SET @capacity = (select capacity from drones where id=ip_id and tag=ip_tag);
                    SET @drone_init_capacity = (select sum(quantity) from payload where id=ip_id and tag=ip_tag);
                    if (@drone_init_capacity + ip_more_packages <= @capacity) then
                        -- add more of the ingredient to the drone
                        if (1 = (select count(*) from payload where id=ip_id and tag=ip_tag and barcode=ip_barcode)) then
							SET @new_quantity = (select quantity from payload where id=ip_id and tag=ip_tag and barcode=ip_barcode) + ip_more_packages;
							update payload set quantity=@new_quantity where id=ip_id and tag=ip_tag and barcode=ip_barcode;
                        else
							insert into payload values (ip_id, ip_tag, ip_barcode, ip_more_packages, ip_price);
                        end if;
                    end if;
                end if;
            end if;
        end if;
    end if;
end ;
# delimiter ;

-- [18] refuel_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to add more fuel to a drone. The drone can only
be refueled if it's located at the delivery service's home base. */
-- -----------------------------------------------------------------------------
drop procedure if exists refuel_drone;
# delimiter ;
create procedure refuel_drone (in ip_id varchar(40), in ip_tag integer, in ip_more_fuel integer)
sp_main: begin
	-- ensure that the drone being switched is valid and owned by the service
    -- ensure that the drone is located at the service home base
	if(1=(select count(*) from delivery_services where id=ip_id )and 1=(select count(*) from drones where tag=ip_tag and id=ip_id))then
		if((select (hover) from drones where id=ip_id and tag=ip_tag)=(select (home_base) from delivery_services where id=ip_id))then
			update drones set fuel=(fuel+ip_more_fuel) where id=ip_id and tag=ip_tag;
		end if;
	end if;

end ;
# delimiter ;

-- [19] fly_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to move a single or swarm of drones to a new
location (i.e., destination). The main constraints on the drone(s) being able to
move to a new location are fuel and space.  A drone can only move to a destination
if it has enough fuel to reach the destination and still move from the destination
back to home base.  And a drone can only move to a destination if there's enough
space remaining at the destination.  For swarms, the flight directions will always
be given to the lead drone, but the swarm must always stay together. */
-- -----------------------------------------------------------------------------
drop procedure if exists fly_drone;
# delimiter ;
create procedure fly_drone (in ip_id varchar(40), in ip_tag integer, in ip_destination varchar(40))
sp_main: begin

	declare x_dest int;
	declare y_dest int;
	declare space_avail int;
    declare x_home int;
    declare y_home int;
	declare space_taken int;
    declare distance int;
	set x_dest = (select x_coord from locations where ip_destination = locations.label);
	set y_dest = (select y_coord from locations where ip_destination = locations.label);
	set space_avail = (select locations.space from locations where ip_destination = locations.label);
	set x_home = (select x_coord from drones, delivery_services, locations
		where ip_id = delivery_services.id and ip_tag = drones.tag and ip_id = drones.id and delivery_services.home_base = locations.label);
	set y_home = (select x_coord from drones, delivery_services, locations
		where ip_id = delivery_services.id and ip_tag = drones.tag and ip_id = drones.id and delivery_services.home_base = locations.label);
	set space_taken = (
		select count(*) from drones as sub
			join drones as leader on ip_id = sub.swarm_id and ip_tag = sub.swarm_tag and ip_id = leader.id and ip_tag = leader.tag
		) + 1;
	set distance = (select ceiling((sqrt(power((x_dest - locations.x_coord), 2)+power((y_dest - locations.y_coord),2))))
		from drones,locations where drones.hover = locations.label and ip_tag = drones.tag and ip_id = drones.id);

	-- ensure that the lead drone being flown is directly controlled and owned by the service
    if(1=(select count(*) from drones where id=ip_id and tag=ip_tag)) then
		-- ensure that the destination is a valid location
		if(1=(select count(*) from locations where ip_destination = locations.label)) then
			-- ensure that the drone isn't already at the location
			if(1=(select count(*) from drones where id=ip_id and tag=ip_tag and hover != ip_destination)) then
				-- ensure that the drone/swarm has enough fuel to reach the destination and (then) home base
				if(1=(select count(*) from drones,locations where drones.id=ip_id and drones.tag=ip_tag and drones.hover = locations.label and
                drones.fuel > distance)) then
					-- ensure that the drone/swarm has enough space at the destination for the flight
                    if(1=(select count(*) from locations where ip_destination = locations.label and locations.space > space_taken)) then

						update drones
                        set drones.hover = ip_destination, drones.fuel = drones.fuel - distance
                        where drones.id=ip_id and drones.tag=ip_tag;

                        if(1=(select count(*) from drones where ip_id = drones.swarm_id and ip_tag = drones.swarm_tag)) then
							update drones
                            set drones.hover = ip_destination, drones.fuel = drones.fuel - distance
                            where ip_id = drones.swarm_id and ip_tag = drones.swarm_tag;
						end if;

					end if;
				end if;
			end if;
		end if;
	end if;
end ;
# delimiter ;

-- [20] purchase_ingredient()
-- -----------------------------------------------------------------------------
/* This stored procedure allows a restaurant to purchase ingredients from a drone
at its current location.  The drone must have the desired quantity of the ingredient
being purchased.  And the restaurant must have enough money to purchase the
ingredients.  If the transaction is otherwise valid, then the drone and restaurant
information must be changed appropriately.  Finally, we need to ensure that all
quantities in the payload table (post transaction) are greater than zero. */
-- -----------------------------------------------------------------------------
drop procedure if exists purchase_ingredient;
# delimiter ;
create procedure purchase_ingredient (in ip_long_name varchar(40), in ip_id varchar(40),
                                      in ip_tag integer, in ip_barcode varchar(40), in ip_quantity integer)
sp_main: begin
    -- ensure that the restaurant is valid
    if(ip_long_name not in (select long_name from restaurants))
    then leave sp_main; end if;
    -- ensure that the drone is valid and exists at the resturant's location
    if ((ip_id, ip_tag) not in (select id, tag from drones))
        -- or ip_id, ip_tag not in (select id, tag from drones where hover = ip_long_name))
    then leave sp_main; end if;

    if((ip_id, ip_tag) not in (select drones.id, drones.tag from drones join restaurants
    on hover = restaurants.location and ip_long_name = restaurants.long_name))
    then leave sp_main; end if;
    -- ensure that the drone has enough of the requested ingredient
    if (
            (select quantity from payload where ip_id = id and ip_tag = tag and ip_barcode = barcode) < ip_quantity)
    then leave sp_main; end if;
    -- update the drone's payload
    set @newquant = ((select quantity from payload where ip_id = id and ip_tag = tag and ip_barcode = barcode) - ip_quantity);
    update payload set quantity = @newquant where  ip_id = id and ip_tag = tag and ip_barcode = barcode;
    -- update the monies spent and gained for the drone and restaurant
    set @newspent = (select spent from restaurants where long_name = ip_long_name) + (ip_quantity * (select price from payload where ip_id = id and ip_tag = tag and ip_barcode = barcode));
    update restaurants set spent = @newspent where long_name = ip_long_name;
    set @newsales  = (select sales from drones where ip_id = id and ip_tag = tag) + (ip_quantity * (select price from payload where (ip_id = id and ip_tag = tag and ip_barcode = barcode)));
    update drones set sales = @newsales where ip_id = id and ip_tag = tag;
    -- PIAZZA SAID TO IGNORE THIS REQUIREMENT, MAKE SURE TO WRITE IN NOTES THAT WE DID THIS post@495
    -- ensure all quantities in the payload table are greater than zero
    if ( (select quantity from payload where ip_id = id and ip_tag = tag and ip_barcode = barcode) <= 0)
    then update payload set quantity = 0 where ip_id = id and ip_tag = tag and ip_barcode = barcode;
    end if;


end ;
# delimiter ;

-- [21] remove_ingredient()
-- -----------------------------------------------------------------------------
/* This stored procedure removes an ingredient from the system.  The removal can
occur if, and only if, the ingredient is not being carried by any drones. */
-- -----------------------------------------------------------------------------
drop procedure if exists remove_ingredient;
# delimiter ;
create procedure remove_ingredient (in ip_barcode varchar(40))
sp_main: begin
    -- ensure that the ingredient exists
    if(ip_barcode not in (select barcode from ingredients))
    then leave sp_main; end if;
    -- ensure that the ingredient is not being carried by any drones
    if(ip_barcode in (select barcode from payload))
    then leave sp_main; end if;
    delete from ingredients where ip_barcode = barcode;
end ;
# delimiter ;

-- [22] remove_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a drone from the system.  The removal can
occur if, and only if, the drone is not carrying any ingredients, and if it is
not leading a swarm. */
-- -----------------------------------------------------------------------------
drop procedure if exists remove_drone;
# delimiter ;
create procedure remove_drone (in ip_id varchar(40), in ip_tag integer)
sp_main: begin
    -- ensure that the drone exists
    if((ip_id, ip_tag) not in (select id, tag from drones where id is not null and tag is not null))
    then leave sp_main; end if;
    -- ensure that the drone is not carrying any ingredients
    if((ip_id, ip_tag) in (select id, tag from payload))
    then leave sp_main; end if;
    -- ensure that the drone is not leading a swarm
    if((ip_id, ip_tag) in (select swarm_id, swarm_tag from drones where swarm_id is not null and swarm_tag is not null))
    then leave sp_main; end if;
    delete from drones where id = ip_id and tag = ip_tag;


end ;
# delimiter ;

-- [23] remove_pilot_role()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a pilot from the system.  The removal can
occur if, and only if, the pilot is not controlling any drones.  Also, if the
pilot also has a worker role, then the worker information must be maintained;
otherwise, the pilot's information must be completely removed from the system. */
-- -----------------------------------------------------------------------------
drop procedure if exists remove_pilot_role;
# delimiter ;
create procedure remove_pilot_role (in ip_username varchar(40))
sp_main: begin
    delete pilots
    from pilots
             left outer join drones on ip_username = drones.flown_by
    where pilots.username = ip_username and drones.flown_by is null;
    	delete users
	from users
		left outer join drones on ip_username = drones.flown_by
        		left outer join workers on ip_username = workers.username
	where users.username = ip_username and drones.flown_by is null and workers.username is null;
end ;
# delimiter ;

-- [24] display_owner_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of an owner.
For each owner, it includes the owner's information, along with the number of
restaurants for which they provide funds and the number of different places where
those restaurants are located.  It also includes the highest and lowest ratings
for each of those restaurants, as well as the total amount of debt based on the
monies spent purchasing ingredients by all of those restaurants. And if an owner
doesn't fund any restaurants then display zeros for the highs, lows and debt. */
-- -----------------------------------------------------------------------------
create or replace view display_owner_view as
select username,
       (select first_name from users where restaurant_owners.username = users.username) as first_name,
       (select last_name from users where restaurant_owners.username = users.username) as last_name,
       (select address from users where restaurant_owners.username = users.username) as address,
       (ifnull((select count(*) from restaurants where restaurant_owners.username = funded_by), 0)) as num_restaurants,
       (ifnull((select count(distinct location) from restaurants where restaurant_owners.username = funded_by), 0)) as num_places,
       (ifnull((select max(rating) from restaurants where restaurant_owners.username = funded_by), 0)) as highs,
       (ifnull((select min(rating) from restaurants where restaurant_owners.username = funded_by), 0)) as lows,
       (ifnull((select sum(spent) from restaurants where username = funded_by), 0)) as debt
from restaurant_owners;


-- [25] display_employee_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of an employee.
For each employee, it includes the username, tax identifier, hiring date and
experience level, along with the license identifer and piloting experience (if
applicable), and a 'yes' or 'no' depending on the manager status of the employee. */
-- -----------------------------------------------------------------------------
create or replace view display_employee_view as
select username, taxID, salary, hired, experience,
       (ifnull((select licenseID from pilots where employees.username = pilots.username), 'n/a')) as licenseID,
       (ifnull((select experience from pilots where employees.username = pilots.username), 'n/a')) as piloting_experience,
       if (username in (select distinct manager from delivery_services), 'yes', 'no')  as manager_status
from employees;


-- [26] display_pilot_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a pilot.
For each pilot, it includes the username, licenseID and piloting experience, along
with the number of drones that they are controlling. */
-- -----------------------------------------------------------------------------
create or replace view display_pilot_view as
select username, licenseID, experience,
       ifnull((select count(*) from drones where username = flown_by), 0) +
       ifnull((select count(*) from (select a.swarm_id, a.swarm_tag from drones as a, drones as b where
               a.swarm_id = b.id and a.swarm_tag = b.tag and username = b.flown_by) as c group by c.swarm_id, c.swarm_tag), 0) as num_drones,
       ifnull((select count(distinct hover) from drones where flown_by = username)  , 0) as num_locations
from pilots group by username;

-- [27] display_location_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a location.
For each location, it includes the label, x- and y- coordinates, along with the
number of restaurants, delivery services and drones at that location. */
-- -----------------------------------------------------------------------------
create or replace view display_location_view as
select label, x_coord, y_coord,
       ifnull((select count(*) from restaurants where label = location), 0) as restaurants,
       ifnull((select count(*) from delivery_services where label = home_base), 0) as delivery_services,
       ifnull((select count(*) from drones where label = hover), 0) as drones
from locations;


-- [28] display_ingredient_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of the ingredients.
For each ingredient that is being carried by at least one drone, it includes a list of
the various locations where it can be purchased, along with the total number of packages
that can be purchased and the lowest and highest prices at which the ingredient is being
sold at that location. */
-- -----------------------------------------------------------------------------
create or replace view display_ingredient_view as
select iname as ingredient_name, hover as location, sum(quantity) as amount_available, min(price) as
                low_price, max(price) as high_price
from ingredients
         join payload on ingredients.barcode = payload.barcode
         join drones on payload.id = drones.id and payload.tag = drones.tag group by iname, hover;




-- [29] display_service_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a delivery
service.  It includes the identifier, name, home base location and manager for the
service, along with the total sales from the drones.  It must also include the number
of unique ingredients along with the total cost and weight of those ingredients being
carried by the drones. */
-- -----------------------------------------------------------------------------
create or replace view display_service_view as
select id, long_name, home_base, manager,
       (ifnull((select sum(sales) from drones where delivery_services.id = drones.id), 0)) as revenue,
       (ifnull((select count(distinct barcode) from payload where delivery_services.id = payload.id), 0)) as ingredients_carried,
       (ifnull((select sum((price * quantity)) from payload where delivery_services.id = payload.id), 0)) as cost_carried,
       (ifnull((select sum((weight * quantity)) from payload, ingredients where payload.barcode = ingredients.barcode and delivery_services.id = payload.id ), 0)) as weight_carried
from delivery_services;

