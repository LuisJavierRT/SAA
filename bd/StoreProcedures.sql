use `mydb`

#SP para validar un usuario en el sistema
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
        where (u.usuario = pUsuario) and (u.contraseña = passwordMD5);
    end if;
 
end $$
delimiter ; 

delimiter $$
create procedure sp_agregarUsuario (

	in _usuario varchar(30),
    in _contraseña varchar(30), 
	in _cedula varchar(11),
	in _nombre varchar(60),
	in _correo varchar(60),
	in _tipo varchar(15),
    in _activo bit,
	in _fechaInicioAutorizacion datetime ,
	in _fechaFinalAutorizacion datetime
)
begin
	insert into Usuario (usuario, contraseña, cedula, nombre, correo, tipo, activo, fechaInicioAutorizacion, fechaFinalAutorizacion)
    values (_usuario, _contraseña, _cedula, _nombre, _correo, _tipo, _activo, _fechaInicioAutorizacion, _fechaFinalAutorizacion);
end $$
delimiter ;


delimiter $$
create procedure sp_getUsers ()
    begin
        select * from Usuario;
    end $$
delimiter ;

-- recupera un usuario por username
delimiter $$
create procedure sp_getUserByUsername(
        in _usuario varchar(30)
    )
begin
    select * from Usuario where usuario = _usuario;
end $$
delimiter ;


delimiter $$
-- actualiza un usuario
create procedure sp_actualizarUsuario(
    IN _usuario varchar(30),
    IN _contraseña varchar (32),
    IN _nombre varchar(60),
    IN _cedula varchar(11),
    in _correo varchar(60),
    in _tipo varchar(15),
    in _activo bit,
    in _fechaInicioAutorizacion datetime,
    in _fechaFinalAutorizacion datetime
)
begin
    update Usuario set     contraseña = _contraseña,
                           nombre = _nombre,
                           cedula = _cedula,
                           correo = _correo,
                           tipo = _tipo,
                           activo = _activo,
                           fechaInicioAutorizacion = _fechaInicioAutorizacion,
                           fechaFinalAutorizacion = _fechaFinalAutorizacion
    where usuario = _usuario;
end $$
delimiter ;


--- -----------------------------------------------------------------///////////////////-----------________________--

delimiter $$
create procedure sp_agregarFuncionario (

	in _id int,
	in _cedula varchar(11), 
	in _nombre varchar(60),
	in _apellido1 VARCHAR(60),
	in _apellido2 VARCHAR(60),
	in _activo bit,
	in _fechaNacimiento datetime,
	in _areaEspecialidad varchar(60)
)
begin
	insert into Funcionario (id, cedula, nombre, apellido1, apellido2, activo, fechaNacimiento, areaEspecialidad)
    values (_id, _cedula, _nombre, _apellido1, _apellido2, _activo, _fechaNacimiento, _areaEspecialidad);
end $$
delimiter ;


delimiter $$
create procedure sp_agregarDependencia (

	 in _id int,
	 in _codigo varchar(10), 
	 in _nombre varchar(60)
)
begin
	insert into Dependencia (id, codigo, nombre)
    values (_id, _codigo, _nombre);
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
	
     in _id int,
	 in _idFuncionario int,
	 in _descripcion varchar(60)
)
begin
	insert into Antecedente (id, idFuncionario, descripcion)
    values (_id, _idFuncionario, _descripcion);
end $$
delimiter ;

delimiter $$
create procedure sp_agregarTitulo (
	
     in _id int,
	 in _idFuncionario int,
     in _titulo varchar(30),
     in _universidad varchar(30),
     in _gradoAcademico varchar(30),
	 in _añoObtencion varchar(4)
)
begin
	insert into Titulo (id, idFuncionario, titulo, universidad, gradoAcademico, añoObtencion)
    values (_id, _idFuncionario, _titulo, _universidad, _gradoAcademico, _añoObtencion);
end $$
delimiter ;


delimiter $$
create procedure sp_agregarPlaza (
	
     in _id int,
     in _descripcion varchar(60),
     in _fechaRegistro datetime,
     in _activo bit
)
begin
	insert into Plaza (id, descripcion, fechaRegistro, activo)
    values (_id, _descripcion, _fechaRegistro, _activo);
end $$
delimiter ;


delimiter $$
create procedure sp_agregarCaracteristicaPlaza (
	
     in _id int,
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
	insert into CaracteristicaPlaza (id, idPlaza, codigo, periodo, programa, categoria, tce, activo, puesto, 
    porcentajeCreacion, asignacionDependencia,fechaAutorizacionInicio, fechaAutorizacionFinal, articulo, numeroAcuerdo, fechaAcuerdo)
    values (_id, _idPlaza, _codigo, _periodo, _programa, _categoria, _tce, _activo, _puesto, 
    _porcentajeCreacion, _asignacionDependencia, _fechaAutorizacionInicio, _fechaAutorizacionFinal, _articulo, _numeroAcuerdo, _fechaAcuerdo);
end $$
delimiter ;


delimiter $$
create procedure sp_agregarPlazaDependencia (
	
     in _id int,
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
	insert into PlazaDependencia (id, idPlaza, idDependencia, porcentajeAcordado, activo, fechaInicio, fechaFinal, indefinida, descripcion)
    values (_id, _idPlaza, _idDependencia, _porcentajeAcordado, _activo, _fechaInicio, _fechaFinal, _indefinida, _descripcion);
end $$
delimiter ;


delimiter $$
create procedure sp_agregarResolucionRectoriaPlaza (

	in _id int,
    in _numeroResolucion int,
    in _fechaResolucion datetime,
    in _nombreRector varchar(60)
)
begin
	insert into ResolucionRectoriaPlaza (id, numeroResolucion, fechaResolucion, nombreRector)
    values (_id, _numeroResolucion, _fechaResolucion, _nombreRector);
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
	in _id int,
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
	in _id int,
    in _idContrato int,
    in _numeroResolucion int,
    in _fechaResolucion datetime,
    in _nombreRector varchar(50)
)
begin
	insert into ResolucionRectoriaPersona (id, idContrato, numeroResolucion, fechaResolucion, nombreRector)
    values (_id, _idContrato, _numeroResolucion, _fechaResolucion, _nombreRector);
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
	in _id int,
    in _idContrato int,
    in _tipo varchar(15),
    in _puestoQuienDioPermiso varchar(20),
    in _quienDioPermiso varchar(50),
    in _tienePermiso bit,
    in _fechaInicio datetime,
    in _fechaFinal datetime
)
begin
	insert into Ampliacion (id, idContrato, tipo, puestoQuienDioPermiso, quienDioPermiso, tienePermiso, fechaInicio, fechaFinal)
    values (_id, _idContrato, _tipo, _puestoQuienDioPermiso, _quienDioPermiso, _tienePermiso, _fechaInicio, _fechaFinal);
end $$
delimiter ;


delimiter $$
create procedure sp_agregarContrato (
	in _id int,
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
	insert into Contrato (id, idContratoLiberado, idDependencia, idFuncionario, activo, actividad, descripcion, anno, fechaInicio, fechaFinal, numeroConcurso, suplencia, porqueContratacion, quienNombro, puestoQuienNombro, porcentajeTotalContratacion, porcentajeLiberado)
    values (_id, _idContratoLiberado, _idDependencia, _idFuncionario, _activo, _actividad, _descripcion, _anno, _fechaInicio, _fechaFinal, _numeroConcurso, _suplencia, _porqueContratacion, _quienNombro, _puestoQuienNombro, _porcentajeTotalContratacion, _porcentajeLiberado);
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