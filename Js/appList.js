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
                    <tr>
                        <td>${datos.data[i].id}</td>
                        <td>${datos.data[i].dependencia}</td>
                        <td>${datos.data[i].tipo}</td>
                        <td>${datos.data[i].nombres}</td>
                        <td>${datos.data[i].apellidos}</td>
                        <td>${datos.data[i].asunto}</td>
                        <td>${datos.data[i].descripcion}</td>
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
});