$(function(){
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
                    <tr idUsuario="${datos.data[i].id}" onclick="enviarRegistro(this)">
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

    $('#btnUpdate').on('click', function(e) {
        let json = {
            "dependencia": $('#dependencia').val(),
            "tipo": $('#tipo').val(),
            "nombre": $('#nombre').val(),
            "apellido": $('#apellido').val(),
            "asunto": $('#asunto').val(),
        };
        if (getCamposVacios(json) == true) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingrese todos los campos, para realizar el registro',
                footer: 'NO DEJE CAMPOS VACIOS'
            })
        } else {
            $.ajax({
                method: "PUT",
                url: "Api/api.php?dep="+json.dependencia+"&tip="+json.tipo+"&nom="+json.nombre+"&ape="+json.apellido+"&asu="+json.asunto+"&id="+$('#idCodigo').val()
            })
            .done(function(response) {
                console.log(response);
                getAjax_List();
            })
            .fail(function(response) {
                console.log("Error");
                console.log(response);
            });
        }
    });


    function getCamposVacios(json){
        if (json.dependencia == "") {
            return true;
        }
        if (json.nombre == "") {
            return true;
        }
        if (json.apellido == "") {
            return true;
        }
        if (json.asunto == "") {
            return true;
        }
        return false;
    }
});

function enviarRegistro(x) {
    let fila = x.rowIndex;
    let tabla = document.getElementById('tabla');
    $('#idCodigo').val(tabla.rows[fila].cells[0].innerHTML);
    $('#dependencia').val(tabla.rows[fila].cells[1].innerHTML);
    $('#tipo').val(tabla.rows[fila].cells[2].innerHTML);
    $('#nombre').val(tabla.rows[fila].cells[3].innerHTML);
    $('#apellido').val(tabla.rows[fila].cells[4].innerHTML);
    $('#asunto').val(tabla.rows[fila].cells[5].innerHTML);
}
