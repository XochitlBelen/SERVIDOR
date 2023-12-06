const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
const port = 3002;
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'tmo_general'
});
connection.connect((err) => {
    if (err) {
        console.error('No se puedo conectr a la BD', err);
        return;
    }
    console.log('conexion exitosa');
});
app.listen(port, () => {
    console.log('servidor escuchando mediante el puerto', port)
});

//INSERTAR CONTROL PRODUCCION
app.post('/insertProduc',(req,res)=>{
    const{
        FECHA_PRODUCCION,
        FOLIO_PRODUCCION,
        TOTAL_PIEZAS_PRODUCCION,
        ID_TURNO,
        ID_PERSONAL,
        ID_UNIDADES,
        CLAVE_MATERIA,
        DESCRIPCION,
        CODIGO_MAQUINA
    }=req.body;

    console.log('DATOS RECIBIDOS:',{
        FECHA_PRODUCCION,
        FOLIO_PRODUCCION,
        TOTAL_PIEZAS_PRODUCCION,
        ID_TURNO,
        ID_PERSONAL,
        ID_UNIDADES,
        CLAVE_MATERIA,
        DESCRIPCION,
        CODIGO_MAQUINA
    });

    connection.query('CALL sp_InsertarControlProduccion(?,?,?,?,?,?,?,?,?)', [ FECHA_PRODUCCION,
        FOLIO_PRODUCCION,
        TOTAL_PIEZAS_PRODUCCION,
        ID_TURNO,
        ID_PERSONAL,
        ID_UNIDADES,
        CLAVE_MATERIA,
        DESCRIPCION,
        CODIGO_MAQUINA],(err,results)=>{
            if(err){
                console.error('ERROR AL INSERTAR UN NUEVO CONTROL DE PRODUCCION');
                res.status(500).json({error:'ERROR AL OBTENER LOS DATOS'});
                return;
            }
            res.json({message: 'DATOS INSERTADOS CORRECTAMENTE' });    
        }
    );

});



//INSERTAR LIBERACION DE PRIMERA PIEZA
app.post('/InsertNpz',(req,res)=>{
    const{
        FECHA_LIBERACION,
        CODIGO_MAQUINA,
        ID_PERSONAL,
        ID_TURNO
    
    }=req.body;

    console.log('DATOS RECIBIDOS:',{
        FECHA_LIBERACION,
        CODIGO_MAQUINA,
        ID_PERSONAL,
        ID_TURNO
    });

    connection.query('CALL sp_InsertarNuevaLiberacionPieza (?,?,?,?)', [ FECHA_LIBERACION,
        CODIGO_MAQUINA,
        ID_PERSONAL,
        ID_TURNO],(err,results)=>{
            if(err){
                console.error('ERROR AL INSERTAR UNA NUEVA LIBERACION DE PIEZA');
                res.status(500).json({error:'ERROR AL OBTENER LOS DATOS'});
                return;
            }
            res.json({message: 'DATOS INSERTADOS CORRECTAMENTE' });    
        }
    );

});

//INSERTAR MAQUINADO
app.post('/InsertMaqu',(req,res)=>{
    const{
        CODIGO_MAQUINA,
        NOMBRE_MAQUINA,
        ID_AREA_MAQUINADO,
        DESCRIPCION_MAQUINA,
        STATUS_MAQUINA
    
    }=req.body;

    console.log('DATOS RECIBIDOS:',{
        CODIGO_MAQUINA,
        NOMBRE_MAQUINA,
        ID_AREA_MAQUINADO,
        DESCRIPCION_MAQUINA,
        STATUS_MAQUINA
    
    });

    connection.query('CALL sp_Insertar_Maquinado (?,?,?,?,?)', [ CODIGO_MAQUINA,
        NOMBRE_MAQUINA,
        ID_AREA_MAQUINADO,
        DESCRIPCION_MAQUINA,
        STATUS_MAQUINA],(err,results)=>{
            if(err){
                console.error('ERROR AL INSERTAR UN NUEVO REGISTRO DE MAQUINADO');
                res.status(500).json({error:'ERROR AL OBTENER LOS DATOS'});
                return;
            }
            res.json({message: 'DATOS INSERTADOS CORRECTAMENTE' });    
        }
    );

});

//INSERTAR MATERIA PRIMA
app.post('/InsertMatPrim',(req,res)=>{
    const{
        CLAVE_MATERIA,
        NOMBRE_MATERIA,
        DESCRIPCION,
        CANTIDAD,
        STOCK_MIN,
        STOCK_MAX,
        ID_PROVEEDOR
    
    }=req.body;

    console.log('DATOS RECIBIDOS:',{
        CLAVE_MATERIA,
        NOMBRE_MATERIA,
        DESCRIPCION,
        CANTIDAD,
        STOCK_MIN,
        STOCK_MAX,
        ID_PROVEEDOR
    
    });

    connection.query('CALL sp_insertar_materia_prima (?,?,?,?,?,?,?)', [ CLAVE_MATERIA,
        NOMBRE_MATERIA,
        DESCRIPCION,
        CANTIDAD,
        STOCK_MIN,
        STOCK_MAX,
        ID_PROVEEDOR],(err,results)=>{
            if(err){
                console.error('ERROR AL INSERTAR UNA NUEVA MATERIA PRIMA');
                res.status(500).json({error:'ERROR AL OBTENER LOS DATOS'});
                return;
            }
            res.json({message: 'DATOS INSERTADOS CORRECTAMENTE' });    
        }
    );

});

//INSERTAR PERSONAL
app.post('/InsertPer',(req,res)=>{
    const{
        NOMBRE_PERSONAL,
        APELLIDO_PATERNO,
        APELLIDO_MATERNO,
        DIRECCION,
        TELEFONO,
        EMIAL,
        ID_ROL,
        ID_SUBAREA
    
    }=req.body;

    console.log('DATOS RECIBIDOS:',{
        NOMBRE_PERSONAL,
        APELLIDO_PATERNO,
        APELLIDO_MATERNO,
        DIRECCION,
        TELEFONO,
        EMIAL,
        ID_ROL,
        ID_SUBAREA
    
    });

    connection.query('CALL sp_insertar_personal (?,?,?,?,?,?,?,?)', [ NOMBRE_PERSONAL,
        APELLIDO_PATERNO,
        APELLIDO_MATERNO,
        DIRECCION,
        TELEFONO,
        EMIAL,
        ID_ROL,
        ID_SUBAREA],(err,results)=>{
            if(err){
                console.error('ERROR AL INSERTAR UN NUEVO PERSONAL');
                res.status(500).json({error:'ERROR AL OBTENER LOS DATOS'});
                return;
            }
            res.json({message: 'DATOS INSERTADOS CORRECTAMENTE' });    
        }
    );

});


//INSERTAR SUBAREAS
app.post('/InsertSubar',(req,res)=>{
    const{

        NOMBRE_SUBAREA,
        ID_AREA
    
    }=req.body;

    console.log('DATOS RECIBIDOS:',{
     
        NOMBRE_SUBAREA,
        ID_AREA
    
    });

    connection.query('CALL sp_insertar_subareas (?,?)', [ NOMBRE_SUBAREA,
        ID_AREA],(err,results)=>{
            if(err){
                console.error('ERROR AL INSERTAR UNA NUEVA SUBAREA');
                res.status(500).json({error:'ERROR AL OBTENER LOS DATOS'});
                return;
            }
            res.json({message: 'DATOS INSERTADOS CORRECTAMENTE' });    
        }
    );

});

//INSERTAR VERIFICACION PINTURA
app.post('/InsertVerPin',(req,res)=>{
    const{
        
        ID_SUBAREA,
        CODIGO_MAQUINA,
        FECHA,
        DESCRIPCION_PIEZA,
        SOLDADURA_COMPLETA,
        LIMPIEZA_SOLUBLES,
        PINTURA_UNIFORME,
        HORA_INICIO,
        HORA_FINAL,
        ID_UNIDADES,
        ID_PERSONAL,
        AYUDA_VISUAL

    
    }=req.body;

    console.log('DATOS RECIBIDOS:',{

        ID_SUBAREA,
        CODIGO_MAQUINA,
        FECHA,
        DESCRIPCION_PIEZA,
        SOLDADURA_COMPLETA,
        LIMPIEZA_SOLUBLES,
        PINTURA_UNIFORME,
        HORA_INICIO,
        HORA_FINAL,
        ID_UNIDADES,
        ID_PERSONAL,
        AYUDA_VISUAL
    
    });

    connection.query('CALL sp_insertar_verificacion_pintura (?,?,?,?,?,?,?,?,?,?,?,?)', [
        ID_SUBAREA,
        CODIGO_MAQUINA,
        FECHA,
        DESCRIPCION_PIEZA,
        SOLDADURA_COMPLETA,
        LIMPIEZA_SOLUBLES,
        PINTURA_UNIFORME,
        HORA_INICIO,
        HORA_FINAL,
        ID_UNIDADES,
        ID_PERSONAL,
        AYUDA_VISUAL],(err,results)=>{
            if(err){
                console.error('ERROR AL INSERTAR UNA NUEVA VERIFICACION DE PINTURA');
                res.status(500).json({error:'ERROR AL OBTENER LOS DATOS'});
                return;
            }
            res.json({message: 'DATOS INSERTADOS CORRECTAMENTE' });    
        }
    );

});

//INSERTAR VERIFICACION ESTAMPADO
app.post('/InsertVerEstamp',(req,res)=>{
    const{
        
        ID_SUBAREA,
        CODIGO_MAQUINA,
        FECHA,
        HORA_INICIO,
        HORA_FINAL,
        DESCRIPCION_PIEZA,
        LARGO_PIEZA,
        ANCHO_PIEZA,
        DIAMETRO_BARRENO,
        ALTURA_PIEZA,
        BARRENO_UNIFORME,
        LIBRE_MARCAS,
        OBSERVACIONES,
        ID_UNIDADES,
        ID_PERSONAL,
        AYUDA_VISUAL
        

    
    }=req.body;

    console.log('DATOS RECIBIDOS:',{

        ID_SUBAREA,
        CODIGO_MAQUINA,
        FECHA,
        HORA_INICIO,
        HORA_FINAL,
        DESCRIPCION_PIEZA,
        LARGO_PIEZA,
        ANCHO_PIEZA,
        DIAMETRO_BARRENO,
        ALTURA_PIEZA,
        BARRENO_UNIFORME,
        LIBRE_MARCAS,
        OBSERVACIONES,
        ID_UNIDADES,
        ID_PERSONAL,
        AYUDA_VISUAL
    
    });

    connection.query('CALL sp_insertar_verificacion_procesos_estampado (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
        ID_SUBAREA,
        CODIGO_MAQUINA,
        FECHA,
        HORA_INICIO,
        HORA_FINAL,
        DESCRIPCION_PIEZA,
        LARGO_PIEZA,
        ANCHO_PIEZA,
        DIAMETRO_BARRENO,
        ALTURA_PIEZA,
        BARRENO_UNIFORME,
        LIBRE_MARCAS,
        OBSERVACIONES,
        ID_UNIDADES,
        ID_PERSONAL,
        AYUDA_VISUAL],(err,results)=>{
            if(err){
                console.error('ERROR AL INSERTAR UNA NUEVA VERIFICACION DE ESTAMPADO');
                res.status(500).json({error:'ERROR AL OBTENER LOS DATOS'});
                return;
            }
            res.json({message: 'DATOS INSERTADOS CORRECTAMENTE' });    
        }
    );

});

//INSERTAR VERIFICACION SOLDADURA
app.post('/InsertVerSold',(req,res)=>{
    const{
        
        ID_SUBAREA,
        CODIGO_MAQUINA,
        FECHA,
        DESCRIPCION_PIEZA,
        COLOCACION_COMPONENTES,
        SOLDADURA_COMPLETA_UNIONES,
        SOLDADURA_LIBRE_PORO,
        HORA_INICIO,
        HORA_FINAL,
        ID_UNIDADES,
        ID_PERSONAL,
        AYUDA_VISUAL

        

    
    }=req.body;

    console.log('DATOS RECIBIDOS:',{

        ID_SUBAREA,
        CODIGO_MAQUINA,
        FECHA,
        DESCRIPCION_PIEZA,
        COLOCACION_COMPONENTES,
        SOLDADURA_COMPLETA_UNIONES,
        SOLDADURA_LIBRE_PORO,
        HORA_INICIO,
        HORA_FINAL,
        ID_UNIDADES,
        ID_PERSONAL,
        AYUDA_VISUAL
    
    });

    connection.query('CALL sp_insertar_verificacion_soldadura (?,?,?,?,?,?,?,?,?,?,?,?)', [
        
        ID_SUBAREA,
        CODIGO_MAQUINA,
        FECHA,
        DESCRIPCION_PIEZA,
        COLOCACION_COMPONENTES,
        SOLDADURA_COMPLETA_UNIONES,
        SOLDADURA_LIBRE_PORO,
        HORA_INICIO,
        HORA_FINAL,
        ID_UNIDADES,
        ID_PERSONAL,
        AYUDA_VISUAL],(err,results)=>{
            if(err){
                console.error('ERROR AL INSERTAR UNA NUEVA VERIFICACION DE SOLDADURA');
                res.status(500).json({error:'ERROR AL OBTENER LOS DATOS'});
                return;
            }
            res.json({message: 'DATOS INSERTADOS CORRECTAMENTE' });    
        }
    );

});


////////////////////////////////////VISUALIZAR//////////////////////////////////////////////////

//VISUALIZAR CONTROL PRODUCCION//
app.get('/VisuProduc', (req, res) => { //obtener datos req lo que manda le usuario res lo que se muestra (se manda front)
    connection.query('CALL sp_visualizar_control_produccion()', (err, results) => {
        if (err) {
            console.error('Error al obtener la visualizacion de produccion:', err);
            res.status(500).json({ error: 'Error al obtener la visualizacion de produccion' });
            return;
        }
        res.json(results);
    });
});

//VISUALIZAR LIBERACION PRIMERA PIEZA
app.get('/VisuPrimPz', (req, res) => { //obtener datos req lo que manda le usuario res lo que se muestra (se manda front)
    connection.query('CALL sp_visualizar_liberacion_pieza()', (err, results) => {
        if (err) {
            console.error('Error al obtener la visualizacion de la primera pieza:', err);
            res.status(500).json({ error: 'Error al obtener la  primera pieza' });
            return;
        }
        res.json(results);
    });
});

////////////////////////////////////ACTUALIZAR///////////////////////////////////////////////// 

////////////CONTROL PRODUCCION//////////////
app.put('/actContrPro/:id', (req, res) => {
    const { ID_CONTROL_PRODUCCION } = req.params;
    const { 
        FECHA_PRODUCCION,
        FOLIO_PRODUCCION,
        TOTAL_PIEZAS_PRODUCCION,
        ID_TURNO,
        ID_PERSONAL,
        ID_UNIDADES,
        CLAVE_MATERIA,
        DESCRIPCION,
        CODIGO_MAQUINA } = req.body;

    const sql = 'CALL sp_editar_ControlProduccion(?,?,?,?,?,?,?,?,?,?)';

    connection.query(sql, [ FECHA_PRODUCCION,
        FOLIO_PRODUCCION,
        TOTAL_PIEZAS_PRODUCCION,
        ID_TURNO,
        ID_PERSONAL,
        ID_UNIDADES,
        CLAVE_MATERIA,
        DESCRIPCION,
        CODIGO_MAQUINA,ID_CONTROL_PRODUCCION], (error, result) => {
        if (error) {
            console.error('Error updating user: ', error);
            res.status(500).json({ error: 'Error updating user' });
        } else {
            res.json({ message: 'User updated successfully' });
        }
     });
    });


//////LIBERACION DE PRIMERA PIEZA///////////////
app.put('/actLibPz/:id', (req, res) => {
    const { ID_LIBERACION } = req.params;
    const { 
        FECHA_LIBERACION,
        CODIGO_MAQUINA,
        ID_PERSONAL,
        ID_TURNO} = req.body;

    const sql = 'CALL sp_editar_liberacion_primera_pieza(?,?,?,?,?)';

    connection.query(sql, [ 
        FECHA_LIBERACION,
        CODIGO_MAQUINA,
        ID_PERSONAL,
        ID_TURNO,
        ID_LIBERACION], (error, result) => {
        if (error) {
            console.error('Error updating user: ', error);
            res.status(500).json({ error: 'Error updating user' });
        } else {
            res.json({ result });
        }
     });
    });

////ACTUALIZAR MAQUINADOOO/////

app.put('/actMaqu/:id', (req, res) => {
    const { CODIGO_MAQUINA } = req.params;
    const { 
        NOMBRE_MAQUINA,
        ID_AREA_MAQUINADO,
        DESCRIPCION_MAQUINA,
        STATUS_MAQUINA

         } = req.body;

    const sql = 'CALL sp_editar_maquinado(?,?,?,?,?)';

    connection.query(sql, [ 
        NOMBRE_MAQUINA,
        ID_AREA_MAQUINADO,
        DESCRIPCION_MAQUINA,
        STATUS_MAQUINA,
        CODIGO_MAQUINA], (error, result) => {
        if (error) {
            console.error('Error updating user: ', error);
            res.status(500).json({ error: 'Error updating user' });
        } else {
            res.json({ result});
        }
     });
    });


////ACTUALIZAR MATERIA PRIMA////
app.put('/actMatPrim/:id', (req, res) => {
    const { CLAVE_MATERIA } = req.params;
    const { 
        NOMBRE_MATERIA,
        DESCRIPCION,
        CANTIDAD,
        STOCK_MIN,
        STOCK_MAX,
        ID_PROVEEDOR
        

         } = req.body;

    const sql = 'CALL sp_editar_materia_prima(?,?,?,?,?,?,?)';

    connection.query(sql, [ CLAVE_MATERIA,
        NOMBRE_MATERIA,
        DESCRIPCION,
        CANTIDAD,
        STOCK_MIN,
        STOCK_MAX,
        ID_PROVEEDOR], (error, result) => {
        if (error) {
            console.error('Error updating user: ', error);
            res.status(500).json({ error: 'Error updating user' });
        } else {
            res.json({ message: 'User updated successfully' });
        }
     });
    });


////ACTUALIZAR PERSONAL////////
app.put('/actPers/:id', (req, res) => {
    const { ID_PERSONAL } = req.params;
    const { 
        NOMBRE_PERSONAL,
        APELLIDO_PATERNO,
        APELLIDO_MATERNO,
        DIRECCION,
        TELEFONO,
        EMAIL,
        ID_ROL,
        ID_SUBAREA
        
        

         } = req.body;

    const sql = 'CALL sp_editar_personal(?,?,?,?,?,?,?,?,?)';

    connection.query(sql, [ ID_PERSONAL,
        NOMBRE_PERSONAL,
        APELLIDO_PATERNO,
        APELLIDO_MATERNO,
        DIRECCION,
        TELEFONO,
        EMAIL,
        ID_ROL], (error, result) => {
        if (error) {
            console.error('Error updating user: ', error);
            res.status(500).json({ error: 'Error updating user' });
        } else {
            res.json({ message: 'User updated successfully' });
        }
     });
    });


///ACTUALIZAR AREAS////
app.put('/actSubAr/:id', (req, res) => {
    const { ID_AREA } = req.params;
    const { 
        NOMBRE_AREA,
        DESCRIPCION
        

         } = req.body;

    const sql = 'CALL sp_editar_personal(?,?,?,?,?,?,?,?,?)';

    connection.query(sql, [ ID_AREA,
        NOMBRE_AREA,
        DESCRIPCION
        ], (error, result) => {
        if (error) {
            console.error('Error updating user: ', error);
            res.status(500).json({ error: 'Error updating user' });
        } else {
            res.json({ message: 'User updated successfully' });
        }
     });
    });




/////////////////ELIMINAR///////////////////////////////////////////////////////////


app.delete('/ElimContrPro/:id', (req, res) => {
    const { ID_CONTROL_PRODUCCION } = req.params;

    const sql = 'CALL sp_eliminar_control_produccion(?)';

    connection.query(sql, [ ID_CONTROL_PRODUCCION], (error, result) => {
        if (error) {
            console.error('Error updating user: ', error);
            res.status(500).json({ error: 'Error updating user' });
        } else {
            res.json({ message: 'User updated successfully' });
        }
     });
    });
