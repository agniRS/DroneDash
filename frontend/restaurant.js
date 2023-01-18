$('#add_ownerform').on("submit",async function (e) {
    //e.preventDefault();
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await addOwner(data);
});

$('#add_restaurantform').on("submit", async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await addRestaurant(data);
});

$('#start_fundingform').on("submit", async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await startFunding(data);
});

$('#add_serviceform').on("submit", async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await addDeliveryService(data);
});

$('#add_ingredientform').on("submit", async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await addIngredient(data);
});

$('#remove_ingredientform').on("submit",async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await removeIngredient(data);
});

$('#purchase_ingredientform').on("submit",async function (e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);

    await purchaseIngredient(data);
});

