$('#add_employeeform').on("submit",async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await addEmployee(data);
});

$('#add_pilotform').on("submit",async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await addPilotRole(data);
});

$('#add_worker_Roleform').on("submit",async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await addWorkerRole(data);
});
$('#hire_employeeform').on("submit",async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await hireEmployee(data);
});

$('#fire_employeeform').on("submit",async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await fireEmployee(data);
});

$('#manage_serviceform').on("submit",async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await manageService(data);
});

$('#remove_pilotform').on("submit",async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await removePilotRole(data);
});


