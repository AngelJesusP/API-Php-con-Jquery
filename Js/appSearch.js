$(getAjax());

function getAjax(valor) {
    $.ajax({
        merhod: "GET",
        url: "Api/api.php"
    })
    .done(function(response) {
        let datos = JSON.parse(response);
        for (let i = 0; i < datos.data.length; i++) {
            if (datos.data[i].id == valor) {
                $('#dependencia').val(datos.data[i].dependencia);
                $('#tipo').val(datos.data[i].tipo);
                $('#nombre').val(datos.data[i].nombres);
                $('#apellido').val(datos.data[i].apellidos);
                $('#asunto').val(datos.data[i].asunto);
                $('#descripcion').val(datos.data[i].descripcion);
            }
        }
    });
}
$(document).on('keyup', '#idBuscar', function() {
    let dato = $(this).val();
    if(dato != "") {
        getAjax(dato);
    } else {
        getAjax();
    }
});