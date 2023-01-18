$(document).ready(function (){
    let users = getAllUsers();
});

$('#addUserForm').on("submit",function(e) {
    var form = $(this);
    var data = form.serialize();
    console.log(data);
    $.post('/create-user', data, function(res) {
        if (res.success) {
            location.reload();
        } else {
            alert(res.error);
        }
    });
});