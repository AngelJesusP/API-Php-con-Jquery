$(function() {
    getAjax_List();

    function getAjax_List() {
        let ajax = $.ajax({
            method: "GET",
            url: "Api/api.php",
        });
        ajax.done(function(response) {
            let datos = JSON.parse(response);
            let codigoHtmlTable = '';
            for (let i = 0; i < datos.data.length; i++) {
                codigoHtmlTable += `
                    <tr idUsuario="${datos.data[i].id}">
                        <td class="valorId">${datos.data[i].id}</td>
                        <td>${datos.data[i].dependencia}</td>
                        <td>${datos.data[i].tipo}</td>
                        <td>${datos.data[i].nombres}</td>
                        <td>${datos.data[i].apellidos}</td>
                        <td>${datos.data[i].asunto}</td>
                        <td>${datos.data[i].descripcion}</td>
                        <td><button class="btn btn-danger" id="remover">REMOVE</button></td>
                    </tr>
                `;
            }
            $('#cuerpoTable').html(codigoHtmlTable);
        });
        ajax.fail(function(response) {
            console.log("Error, no se pudo listar");
            console.log(response);
        });
    }

    $(document).on('click', '#remover', function () {
        let element = $(this)[0].parentElement.parentElement;
        let datoId = $(element).attr('idUsuario');
        let ajax = $.ajax({
            method: "DELETE",
            url: "Api/api.php?id="+datoId,
        });
        ajax.done(function(response) {
            getAjax_List();
        });
        ajax.fail(function(response) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo eliminar el registro de la base de datos',
                footer: 'OCURRIO UN ERROR'
            })
            console.log("Error");
        });
    });
});