$(function(){
    
    /* Evento click para registrar la informacion */
    $('#btnRegistrar').on('click', function(e) {
        let json = {
            "dependencia": $('#dependencia').val(),
            "tipo": $('#tipo').val(),
            "nombre": $('#nombre').val(),
            "apellido": $('#apellido').val(),
            "asunto": $('#asunto').val(),
            "descripcion": $('#descripcion').val() 
        };
        if (getCamposVacios(json) == true) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingrese todos los campos, para realizar el registro',
                footer: 'NO DEJE CAMPOS VACIOS'
            })
        } else {
            e.preventDefault();
            const url = 'Api/api.php';
            let ajax = getAjax(json, url);
            ajax.done(function(response) {         
                console.log("Registro realizado con exito");
                console.log(response);
            });
            ajax.fail(function(response) {
                console.log("Error, no se pudo realizar la accion!!");
                console.log(response);
            });
        }
    });

    function getAjax(json, url) {
        let ajax = $.ajax({
            method: "POST",
            url: url,
            data: json
        });
        return ajax;
    }

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
        if (json.descripcion == "") {
            return true;
        }
        return false;
    }
});