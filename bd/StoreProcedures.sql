use `mydb`

delimiter $$
create procedure sp_login (
    in pUsuario varchar(30),
    in pPassword varchar(30)
)
begin
    declare passwordMD5 varchar(32);
    
    if exists(select u.usuario from Usuario u where u.activo = 1) then
        set passwordMD5 = md5(pPassword);
        
        select u.usuario from Usuario u  
        where (u.usuario = pUsuario) and (u.contrasena = passwordMD5);
    end if;
 
end $$
delimiter ; 

delimiter $$
create procedure sp_historialLogin (
	in _usuario varchar(30)
)
begin
	insert into HistorialLogin (usuario, fecha)
    values (_usuario, NOW());
end $$
delimiter ;



delimiter $$
create procedure sp_cambiarContrasena (
	in _usuario varchar(30),
    in _contrasenaActual varchar(32),
    in _contrasenaNueva varchar(32)
)
begin
	declare valid int;
	declare contrasenaNuevaMD5 varchar(32);
    declare contrasenaActualMD5 varchar(32);
    set contrasenaNuevaMD5 = md5(_contrasenaNueva);
    set contrasenaActualMD5 = md5(_contrasenaActual);
    if exists(select * from Usuario where usuario = _usuario and contrasena = contrasenaActualMD5) then
		update Usuario set contrasena = contrasenaNuevaMD5 where usuario = _usuario;
        set valid = 1;
	else
		set valid = 0;
	end if;
    select valid;
end $$
delimiter ;

delimiter $$
create procedure sp_agregarUsuario (

	in _usuario varchar(30),
    in _contrasena varchar(30), 
	in _cedula varchar(11),
	in _nombre varchar(60),
	in _correo varchar(60),
	in _tipo varchar(15),
    in _activo bit,
	in _fechaInicioAutorizacion datetime,
	in _fechaFinalAutorizacion datetime
)
begin
	declare contrasenaMD5 varchar(32);
    set contrasenaMD5 = md5(_contrasena);
	insert into Usuario (usuario, contrasena, cedula, nombre, correo, tipo, activo, fechaInicioAutorizacion, fechaFinalAutorizacion)
    values (_usuario, contrasenaMD5, _cedula, _nombre, _correo, _tipo, _activo, _fechaInicioAutorizacion, _fechaFinalAutorizacion);
    
    select max(usuario) as usuario from Usuario;
    
end $$
delimiter ;


-- Obtiene todos los usuarios
delimiter $$
create procedure sp_obtenerUsuarios()
    begin
        select * from Usuario where activo = 1;
    end $$
delimiter ;

-- Recupera un usuario por username
delimiter $$
create procedure sp_getUserByUsername(
        in _usuario varchar(30)
    )
begin
    select * from Usuario where usuario = _usuario;
end $$
delimiter ;

delimiter $$
create procedure sp_actualizarUsuario(
    IN _usuario varchar(30),
    IN _contrasena varchar (32),
    IN _nombre varchar(60),
    IN _cedula varchar(11),
    in _correo varchar(60),
    in _tipo varchar(15),
    in _activo bit,
    in _fechaInicioAutorizacion datetime,
    in _fechaFinalAutorizacion datetime
)
begin
    update Usuario set     nombre = _nombre,
                           cedula = _cedula,
                           correo = _correo,
                           tipo = _tipo,
                           activo = _activo,
                           fechaInicioAutorizacion = _fechaInicioAutorizacion,
                           fechaFinalAutorizacion = _fechaFinalAutorizacion
    where usuario = _usuario;
end $$
delimiter ;

delimiter $$
create procedure sp_historialGestionUsuario (
	in _usuarioEjecutador varchar(30),
    in _usuarioGestionado varchar(30),
    in _accion char
)
begin
	insert into HistorialGestionUsuario (usuarioEjecutador, usuarioGestionado, fecha, accion)
    values (_usuarioEjecutador, _usuarioGestionado, NOW(), _accion);
end $$
delimiter ;


delimiter $$
create procedure sp_agregarFuncionario (

	in _cedula varchar(11), 
	in _nombre varchar(60),
	in _apellido1 VARCHAR(60),
	in _apellido2 VARCHAR(60),
	in _activo bit,
	in _fechaNacimiento datetime,
	in _areaEspecialidad varchar(60)
)
begin
	insert into Funcionario (cedula, nombre, apellido1, apellido2, activo, fechaNacimiento, areaEspecialidad)
    values (_cedula, _nombre, _apellido1, _apellido2, _activo, _fechaNacimiento, _areaEspecialidad);
    
    select max(id) as id from Funcionario;
end $$
delimiter ; 

delimiter $$
create procedure sp_HistorialGestionFuncionario (
	in _usuario varchar(30),
    in _idFuncionario int,
    in _accion char
) 
begin 
	insert into HistorialGestionFuncionario(usuario, idFuncionario, fecha, accion)
    values (_usuario, _idFuncionario, NOW(), _accion);
end $$
delimiter ; 

delimiter $$ 
create procedure sp_obtenerDependencias()
	begin
		select * from Dependencia;
	end $$
delimiter ;

delimiter $$
create procedure sp_agregarDependencia (

	 in _codigo varchar(10), 
	 in _nombre varchar(60)
)
begin
	insert into Dependencia (codigo, nombre)
    values (_codigo, _nombre);
    
    select max(id) as id from Dependencia;
end $$
delimiter ;

delimiter $$
create procedure sp_actualizarDependencia (	
    in _id int,
    in _codigo varchar(10),
    in _nombre varchar(60)
)
begin
	update Dependencia set codigo = _codigo, nombre = _nombre where id = _id;
end $$
delimiter ;
select * from HistorialGestionDependencia
delimiter $$
create procedure sp_historialGestionDependencia (
	in _usuario varchar(30),
    in _idDependencia int,
    in _accion char
)
begin
	insert into HistorialGestionDependencia (usuario, idDependencia, fecha, accion)
    values (_usuario, _idDependencia, NOW(), _accion);
end $$
delimiter ;

delimiter $$
create procedure sp_agregarPerteneceFuncionarioDependencia (

	 in _idFuncionario int,
	 in _idDependencia int, 
	 in _activo bit
)
begin
	insert into Pertenece (idFuncionario, idDependencia, activo)
    values (_idFuncionario, _idDependencia, _activo);
end $$
delimiter ;

delimiter $$
create procedure sp_agregarAntecedente (
	
	 in _idFuncionario int,
	 in _descripcion varchar(60)
)
begin
	insert into Antecedente (idFuncionario, descripcion)
    values (_idFuncionario, _descripcion);
end $$
delimiter ;

delimiter $$
create procedure sp_agregarTitulo (
	
	 in _idFuncionario int,
     in _titulo varchar(30),
     in _universidad varchar(30),
     in _gradoAcademico varchar(30),
	 in _annoObtencion varchar(4)
)
begin
	insert into Titulo (idFuncionario, titulo, universidad, gradoAcademico, annoObtencion)
    values (_idFuncionario, _titulo, _universidad, _gradoAcademico, _annoObtencion);
end $$
delimiter ;

delimiter $$
create procedure sp_agregarPlaza (
	
     in _descripcion varchar(60),
     in _fechaRegistro datetime,
     in _activo bit
)
begin
	insert into Plaza (descripcion, fechaRegistro, activo)
    values (_descripcion, _fechaRegistro, _activo);
end $$
delimiter ;


delimiter $$
create procedure sp_agregarCaracteristicaPlaza (
	
	 in _idPlaza int, 
	 in _codigo varchar(8),
	 in _periodo varchar(30),  -- ??
	 in _programa int,
	 in _categoria int,   	   -- ??
	 in _tce int,
	 in _activo bit,
	 in _puesto varchar(30),
	 in _porcentajeCreacion int,
	 in _asignacionDependencia bit,
	 in _fechaAutorizacionInicio datetime,
	 in _fechaAutorizacionFinal datetime,
	 in _articulo varchar(10),
	 in _numeroAcuerdo int,
	 in _fechaAcuerdo datetime
)
begin
	insert into CaracteristicaPlaza (idPlaza, codigo, periodo, programa, categoria, tce, activo, puesto, 
    porcentajeCreacion, asignacionDependencia,fechaAutorizacionInicio, fechaAutorizacionFinal, articulo, numeroAcuerdo, fechaAcuerdo)
    values (_idPlaza, _codigo, _periodo, _programa, _categoria, _tce, _activo, _puesto, 
    _porcentajeCreacion, _asignacionDependencia, _fechaAutorizacionInicio, _fechaAutorizacionFinal, _articulo, _numeroAcuerdo, _fechaAcuerdo);
end $$
delimiter ;


delimiter $$
create procedure sp_agregarPlazaDependencia (
	
	 in _idPlaza int, 
     in _idDependencia int,
     in _porcentajeAcordado int,
	 in _activo bit,
	 in _fechaInicio datetime,
	 in _fechaFinal datetime,
	 in _indefinida bit,
     in _descripcion varchar(60)
)
begin
	insert into PlazaDependencia (idPlaza, idDependencia, porcentajeAcordado, activo, fechaInicio, fechaFinal, indefinida, descripcion)
    values (_idPlaza, _idDependencia, _porcentajeAcordado, _activo, _fechaInicio, _fechaFinal, _indefinida, _descripcion);
end $$
delimiter ;


delimiter $$
create procedure sp_agregarResolucionRectoriaPlaza (

    in _numeroResolucion int,
    in _fechaResolucion datetime,
    in _nombreRector varchar(60)
)
begin
	insert into ResolucionRectoriaPlaza (numeroResolucion, fechaResolucion, nombreRector)
    values (_numeroResolucion, _fechaResolucion, _nombreRector);
end $$
delimiter ;


delimiter $$
create procedure sp_agregarDatosResolucionPlaza (

	in _idPlazaAfectada int,
    in _idResolucionRectoriaPlaza int,
    in _fechaInicioAfectacion datetime,
    in _fechaFinalAfectacion datetime,
    in _puestoAutorizado varchar(20),
    in _categoríaAutorizada varchar(20),
    in _porcentajeJornadaAutorizado int,
    in _activo bit
)
begin
	insert into DatosResolucionPlaza (idPlazaAfectada, idResolucionRectoriaPlaza, fechaInicioAfectacion, fechaFinalAfectacion, puestoAutorizado, categoríaAutorizada, porcentajeJornadaAutorizado, activo)
    values (_idPlazaAfectada, _idResolucionRectoriaPlaza, _fechaInicioAfectacion, _fechaFinalAfectacion, _puestoAutorizado, _categoríaAutorizada, _porcentajeJornadaAutorizado, _activo);
end $$
delimiter ;


delimiter $$
create procedure sp_agregarPlazaResolucionRectoriaPlaza (

    in _idContratoLiberado int,
    in _idDependencia int,
    in _idFuncionario int,
    in _activo bit,
    in _actividad varchar(30),
    in _descripcion varchar(40),
    in _anno int,
    in _fechaInicio datetime,
    in _fechaFinal datetime,
    in _númeroConcurso varchar(10),
    in _suplencia bit,
    in _porqueContratacion varchar(40),
    in _quienNombro varchar(50),
    in _puestoQuienNombro varchar(15),
    in _porcentajeTotalContratacion int,
    in _porcentajeLiberado int
)
begin
	insert into PlazaResolucionRectoriaPlaza (idPlaza, idResolucionRectatoriaPlaza)
    values (_idPlaza, _idResolucionRectoriaPlaza);
end $$
delimiter ;


delimiter $$
create procedure sp_agregarResolucionRectoriaPersona (

    in _idContrato int,
    in _numeroResolucion int,
    in _fechaResolucion datetime,
    in _nombreRector varchar(50)
)
begin
	insert into ResolucionRectoriaPersona (idContrato, numeroResolucion, fechaResolucion, nombreRector)
    values (_idContrato, _numeroResolucion, _fechaResolucion, _nombreRector);
end $$
delimiter ;


delimiter $$
create procedure sp_agregarDatosResolucionPersona (
	in _idPlazaAsignada int,
    in _idResolucionPersona int,
    in _fechaInicioAfectacion datetime,
    in _fechaFinalAfectacion datetime,
    in _puestoAutorizado varchar(20),
    in _categoriaAutorizada varchar(20),
    in _activo bit, 
    in _porcentajeJornadaAutorizado int,
	in _cedula int,
    in _nombre varchar(15),
    in _apellido1 varchar(15),
    in _apellido2 varchar(15),
    in _gradoAcademico varchar(40), 
    in _codigoCursoAutorizado varchar(10)
)
begin
	insert into DatosResolucionPersona (idPlazaAsignada, idResolucionPersona, fechaInicioAfectacion, fechaFinalAfectacion, puestoAutorizado, categoriaAutorizada, activo, porcentajeJornadaAutorizado, cedula, nombre, apellido1, apellido2, gradoAcademico, codigoCursoAutorizado)
    values (_idPlazaAsignada, _idResolucionPersona, _fechaInicioAfectacion, _fechaFinalAfectacion, _puestoAutorizado, _categoriaAutorizada, _activo, _porcentajeJornadaAutorizado, _cedula, _nombre, _apellido1, _apellido2, _gradoAcademico, _codigoCursoAutorizado);
end $$
delimiter ;


delimiter $$
create procedure sp_agregarAmpliacion (

    in _idContrato int,
    in _tipo varchar(15),
    in _puestoQuienDioPermiso varchar(20),
    in _quienDioPermiso varchar(50),
    in _tienePermiso bit,
    in _fechaInicio datetime,
    in _fechaFinal datetime
)
begin
	insert into Ampliacion (idContrato, tipo, puestoQuienDioPermiso, quienDioPermiso, tienePermiso, fechaInicio, fechaFinal)
    values (_idContrato, _tipo, _puestoQuienDioPermiso, _quienDioPermiso, _tienePermiso, _fechaInicio, _fechaFinal);
end $$
delimiter ;


delimiter $$
create procedure sp_agregarContrato (

    in _idContratoLiberado int,
    in _idDependencia int,
    in _idFuncionario int,
    in _activo bit,
    in _actividad varchar(30),
    in _descripcion varchar(40),
    in _anno int,
    in _fechaInicio datetime,
    in _fechaFinal datetime,
    in _númeroConcurso varchar(10),
    in _suplencia bit,
    in _porqueContratacion varchar(40),
    in _quienNombro varchar(50),
    in _puestoQuienNombro varchar(15),
    in _porcentajeTotalContratacion int,
    in _porcentajeLiberado int
)
begin
	insert into Contrato (idContratoLiberado, idDependencia, idFuncionario, activo, actividad, descripcion, anno, fechaInicio, fechaFinal, numeroConcurso, suplencia, porqueContratacion, quienNombro, puestoQuienNombro, porcentajeTotalContratacion, porcentajeLiberado)
    values (_idContratoLiberado, _idDependencia, _idFuncionario, _activo, _actividad, _descripcion, _anno, _fechaInicio, _fechaFinal, _numeroConcurso, _suplencia, _porqueContratacion, _quienNombro, _puestoQuienNombro, _porcentajeTotalContratacion, _porcentajeLiberado);
end $$
delimiter ;

delimiter $$
create procedure sp_agregarPlazaContratacion (
	in _idPlaza int,
    in _idContrato int,
    in _idDependencia int,
    in _idFuncionario int,
    in _porcentajeContratacion int
)
begin  
	insert into PlazaContratacion (idPlaza, idContrato, idDependencia, idFuncionario, porcentajeContratacion)
    values (_idPlaza, _idContrato, _idDependencia, _idFuncionario, _porcentajeContratacion);
end $$
delimiter ;