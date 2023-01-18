$('#loginForm').submit(function(e) {
    e.preventDefault();
    var form = $(this);
    var data = form.serialize();
    console.log(data);
    $.post('/login', data, function(res) {
        if (res.success) {
            window.location.href = '/' + res.type + '.html';
        } else {
            alert("Could not login!");
        }
    });

});