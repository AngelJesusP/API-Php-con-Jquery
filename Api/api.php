<?php
    include '../Php/conexion.php';

    /* Si hay una peticion POST entonces realiza el registro de los datos */
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $inputs = $_POST;      
        $dependencia = $inputs['dependencia'];
        $tipo = $inputs['tipo'];
        $nombre = $inputs['nombre'];
        $apellido = $inputs['apellido'];
        $asunto = $inputs['asunto'];
        $descripcion = $inputs['descripcion'];
        $SQl_query = "INSERT INTO usuario(dependencia,tipo,nombres,apellidos,asunto,descripcion)
        VALUES('$dependencia','$tipo','$nombre','$apellido','$asunto','$descripcion')";
        
        $conexionMysql = new Conexion();
        $conexion = $conexionMysql->getConexion();
        $statement = $conexion->prepare($SQl_query);
        $valor = $statement->execute();
        if ($valor) {
            echo "Registro realizado con exito";
        } else {
            echo "Error, Ocurrio un error al momento de registrar";
        }
        $statement->closeCursor();
        $conexionMysql = null;
    }

    /* Obtener todos los datos de la base de datos  */
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $SQl_query = "SELECT * FROM usuario";
        
        $conexionMysql = new Conexion();
        $conexion = $conexionMysql->getConexion();
        $statement = $conexion->prepare($SQl_query);
        $valor = $statement->execute();
        if ($valor) {
            while ($resultados = $statement->fetch(PDO::FETCH_ASSOC)) {
                $data['data'][] = $resultados;
            }
            $respuesta = json_encode($data);
            echo ($respuesta == null)? [] : $respuesta;
        } else {
            echo "0";
        }
        $statement->closeCursor();
        $conexion = null;              
    }

    /* Peticion para realizar la eliminacion de un registro segun el id */
    if($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        $id = $_REQUEST['id'];
        $SQl_query = "DELETE FROM usuario WHERE id = $id";

        $conexionMysql = new Conexion();
        $conexion = $conexionMysql->getConexion();
        $statement = $conexion->prepare($SQl_query);
        $valor = $statement->execute();
        if ($valor) {
            echo "Registro eliminado con exito"; 
        } else {
            echo "Error, no se pudo realizar la accion de eliminacion";
        }
        $statement->closeCursor();
        $conexion = null;
    }

    /* Peticion para cuando se desea realizar una actualizacion del */
    if($_SERVER['REQUEST_METHOD'] == 'PUT') {
        $dependencia = $_REQUEST['dep'];
        $tipo = $_REQUEST['tip'];
        $nombre = $_REQUEST['nom'];
        $apellido = $_REQUEST['ape'];
        $asunto = $_REQUEST['asu'];
        $id = $_REQUEST['id'];
        
        $SQl_query = "UPDATE usuario SET dependencia = '$dependencia', tipo = '$tipo', nombres = '$nombre', apellidos = '$apellido', asunto = '$asunto' WHERE id = $id";
        
        $conexionMysql = new Conexion();
        $conexion = $conexionMysql->getConexion();
        $statement = $conexion->prepare($SQl_query);
        $valor = $statement->execute();
        if ($valor) {
            echo "Actualizaion completada"; 
        } else {
            echo $SQl_query;
        }
        $statement->closeCursor();
        $conexion = null;
    }
?>