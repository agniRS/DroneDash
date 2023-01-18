$('#add_droneform').on("submit", async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await addDrone(data);
});

$('#add_locationform').on("submit",async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await addLocation(data);
});

$('#takeover_droneform').on("submit",async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await takeoverDrone(data);
});

$('#join_swarmform').on("submit",async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await joinSwarm(data);
});

$('#leave_swarmform').on("submit",async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await leaveSwarm(data);
});

$('#load_droneform').on("submit",async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await loadDrone(data);
});

$('#refuel_droneform').on("submit",async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await refuelDrone(data);
});

$('#fly_droneform').on("submit",async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await flyDrone(data);
});

$('#remove_droneform').on("submit",async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await removeDrone(data);
});


