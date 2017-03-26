CREATE SCHEMA `mydb` DEFAULT CHARACTER SET utf8;
USE `mydb`;

create table `mydb`.`Usuario` (
  `usuario` VARCHAR(30) NOT NULL,
  `contrasena` VARCHAR(32) NOT NULL, 
  `cedula` VARCHAR(11) NOT NULL,
  `nombre` VARCHAR(60) NOT NULL,
  `correo` VARCHAR(60) NOT NULL,
  `tipo` VARCHAR(15) NOT NULL,
  `activo` bit NOT NULL,
  `fechaInicioAutorizacion` DATETIME NOT NULL,
  `fechaFinalAutorizacion` DATETIME NOT NULL,
  PRIMARY KEY (`usuario`))
ENGINE = InnoDB;

create table `mydb`.`HistorialLogin` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `usuario` varchar(30) not null,
    `fecha` varchar(20) not null,
    primary key (`id`),
    CONSTRAINT `fk_usuario_historial`
		FOREIGN KEY (`usuario`)
		REFERENCES `Usuario` (`usuario`))
ENGINE = InnoDB;

create table `mydb`.`HistorialGestionUsuario` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `usuarioEjecutador` varchar(30) not null,
    `usuarioGestionado` varchar(30) not null,
    `fecha` varchar(20) not null,
    `accion` char not null, /* 'i' = insertar / 'm' = modificar / 'd' = deshabilitar */
    primary key (`id`),
    CONSTRAINT `fk_usuarioEjec_gestion_usuario_historial`
		FOREIGN KEY (`usuarioEjecutador`)
		REFERENCES `Usuario` (`usuario`),
	
    CONSTRAINT `fk_usuarioGest_gestion_usuario_historial`
		FOREIGN KEY (`usuarioGestionado`)
		REFERENCES `Usuario` (`usuario`))
ENGINE = InnoDB;

create table `mydb`.`Funcionario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cedula` VARCHAR(11) NOT NULL, 
  `nombre` VARCHAR(60) NOT NULL,
  `apellido1` VARCHAR(60) NOT NULL,
  `apellido2` VARCHAR(60) NOT NULL,
  `activo` BIT NOT NULL DEFAULT 1,
  `fechaNacimiento` DATETIME NOT NULL,
  `areaEspecialidad` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

create table `mydb`.`HistorialGestionFuncionario` (
	`id` int not null auto_increment,
    `usuario` varchar(30) not null,
    `idFuncionario` int not null,
    `fecha` varchar(20) not null,
    `accion` char not null, /* 'i' = insertar / 'm' = modificar / 'd' = deshabilitar */
    primary key (`id`),
    CONSTRAINT `fk_usuario_gestion_funcionario_historial`
		FOREIGN KEY (`usuario`)
		REFERENCES `Usuario` (`usuario`),
	
    CONSTRAINT `fk_idFuncionario_gestion_funcionario_historial`
		FOREIGN KEY (`idFuncionario`)
		REFERENCES `Funcionario` (`id`))
ENGINE = InnoDB;

create table `mydb`.`Dependencia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(10) NOT NULL, 
  `nombre` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

create table `mydb`.`HistorialGestionDependencia` (
	`id` int not null auto_increment,
    `usuario` varchar(30) not null,
    `idDependencia` int not null,
    `fecha` varchar(20) not null,
    `accion` char not null, /* 'i' = insertar / 'm' = modificar / 'd' = deshabilitar */
    primary key (`id`),
    constraint `fk_usuario_dependencia_historial`
		foreign key (`usuario`)
        references `Usuario` (`usuario`),
        
	constraint `fk_dependencia_historial`
		foreign key (`idDependencia`)
        references `Dependencia` (`id`))
ENGINE = InnoDB;

create table `mydb`.`Pertenece` (
  `idFuncionario` INT NOT NULL,
  `idDependencia` INT NOT NULL, 
  `activo` BIT NOT NULL DEFAULT 1,
  
  PRIMARY KEY (`idFuncionario`,`idDependencia`),
  
  CONSTRAINT `fk_pertenece_funcionario`
	FOREIGN KEY (`idFuncionario`)
    REFERENCES `Funcionario` (`id`),
  
  CONSTRAINT `fk_pertenece_dependencia`
    FOREIGN KEY (`idDependencia`)
    REFERENCES `Dependencia` (`id`))
ENGINE = InnoDB;

create table `mydb`.`Antecedente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idFuncionario` INT NOT NULL, 
  `descripcion` VARCHAR(60) NOT NULL,
  
  PRIMARY KEY (`id`,`idFuncionario`),
  
  CONSTRAINT `fk_antecedente_funcionario`
	FOREIGN KEY (`idFuncionario`)
    REFERENCES `Funcionario` (`id`))
ENGINE = InnoDB;

create table `mydb`.`Titulo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idFuncionario` INT NOT NULL, 
  `titulo` VARCHAR(30) NOT NULL,
  `universidad` VARCHAR(30) NOT NULL,
  `gradoAcademico` VARCHAR(30) NOT NULL,
  `annoGraduacion` VARCHAR(4) NOT NULL,
  
  PRIMARY KEY (`id`,`idFuncionario`),
  
  CONSTRAINT `fk_titulo_funcionario`
	FOREIGN KEY (`idFuncionario`)
    REFERENCES `Funcionario` (`id`))
ENGINE = InnoDB;

create table `mydb`.`Plaza` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(60) NOT NULL, 
  `fechaRegistro` DATETIME NOT NULL,
  `activo` BIT NOT NULL DEFAULT 1,
  
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


create table `mydb`.`CaracteristicaPlaza` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idPlaza` INT NOT NULL, 
  `codigo` VARCHAR(8) NOT NULL,
  `periodo` VARCHAR(30) NOT NULL,  -- ??
  `programa` INT NOT NULL,
  `categoria` VARCHAR(6) NOT NULL,   	   -- ??
  `tce` VARCHAR(10) NOT NULL,
  `activo` BIT NOT NULL DEFAULT 1,
  `puesto` VARCHAR(30) NOT NULL, 
  `porcentajeCreacion` INT NOT NULL,
  `asignacionDependencia` BIT NOT NULL DEFAULT 0,
  `fechaAutorizacionInicio` DATETIME NOT NULL,
  `fechaAutorizacionFinal` DATETIME,
  `articulo` VARCHAR(10) NOT NULL, 
  `numeroAcuerdo` INT NOT NULL,
  `fechaAcuerdo` DATETIME NOT NULL,
  
  PRIMARY KEY (`id`,`idPlaza`),
  
  CONSTRAINT `fk_caracteristica_plaza`
	FOREIGN KEY (`idPlaza`)
    REFERENCES `Plaza` (`id`))
ENGINE = InnoDB;

create table `mydb`.`PlazaDependencia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idPlaza` INT NOT NULL, 
  `idDependencia` INT NOT NULL,
  `porcentajeAcordado` INT NOT NULL,
  `activo` BIT NOT NULL DEFAULT 1,
  `fechaInicio` DATETIME NOT NULL,
  `fechaFinal` DATETIME NOT NULL,
  `indefinida` BIT NOT NULL DEFAULT 0,
  `descripcion` VARCHAR(60) NOT NULL,
  
  PRIMARY KEY (`id`,`idPlaza`,`idDependencia`),
  
  CONSTRAINT `fk_plazaDependencia_plaza`
	FOREIGN KEY (`idPlaza`)
    REFERENCES `Plaza` (`id`),
  
  CONSTRAINT `fk_plazaDependencia_dependencia`
    FOREIGN KEY (`idDependencia`)
    REFERENCES `Dependencia` (`id`))
ENGINE = InnoDB;

create table `mydb`.`ResolucionRectoriaPlaza` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `numeroResolucion` INT NOT NULL, 
  `fechaResolucion` DATETIME NOT NULL,
  `nombreRector` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

create table `mydb`.`DatosResolucionPlaza` (
	`idPlazaAfectada` int not null,
    `idResolucionRectoriaPlaza` int not null,
    `fechaInicioAfectacion` datetime not null,
    `fechaFinalAfectacion` datetime not null,
    `puestoAutorizado` varchar(20) not null,
    `categoríaAutorizada` varchar(20) not null,
    `porcentajeJornadaAutorizado` int not null,
    `activo` bit not null,
    primary key (`idPlazaAfectada`,	`idResolucionRectoriaPlaza`),
    
    constraint `fk_idPlazaAfectada` 
		foreign key (`idPlazaAfectada`) 
        references `mydb`.`Plaza` (`id`),
        
	constraint `fk_idResolucionRectoriaPlaza`
		foreign key (`idResolucionRectoriaPlaza`) 
        references `mydb`.`ResolucionRectoriaPlaza` (`id`)
)
engine = innodb;

create table `mydb`.`PlazaResolucionRectoriaPlaza` (
	`idPlaza` int not null,
    `idResolucionRectoriaPlaza` int not null,
    primary key (`idPlaza`, `idResolucionRectoriaPlaza`),
    
    constraint `fk_idPlaza`
		foreign key (`idPlaza`)
        references `mydb`.`Plaza` (`id`),
        
	constraint `fk_idPlazaResolucionRectoriaPlaza`
		foreign key (`idResolucionRectoriaPlaza`)
        references `mydb`.`ResolucionRectoriaPlaza` (`id`)
)
engine = innodb;


create table `mydb`.`Contrato` (
	`id` int not null auto_increment,
    `idContratoLiberado` int null,
    `idDependencia` int not null,
    `idFuncionario` int not null,
    `activo` bit not null,
    `actividad` varchar(30) not null,
    `descripcion` varchar(40) not null,
    `anno` int not null,
    `fechaInicio` datetime not null,
    `fechaFinal` datetime not null,
    `númeroConcurso` varchar(10) not null,
    `suplencia` bit not null,
    `porqueContratacion` varchar(40) not null,
    `quienNombro` varchar(50) not null,
    `puestoQuienNombro` varchar(15) not null,
    `porcentajeTotalContratacion` int not null,
    `porcentajeLiberado` int null,
    
    primary key (`id`, `idDependencia`, `idFuncionario`),
    
    constraint `fk_idDependenciaContrato`
		foreign key (`idDependencia`)
        references `mydb`.`Dependencia` (`id`),
        
	constraint `fk_idFuncionarioContrato`
		foreign key (`idFuncionario`)
        references `mydb`.`Funcionario` (`id`)
	/*
	constraint `fk_idContratoLiberadoContrato`
		foreign key (`idContratoLiberado`)
        references `mydb`.`Contrato` (`idContratoLiberado`)*/
)
engine = innodb;


create table `mydb`.`ResolucionRectoriaPersona` (
	`id` int not null auto_increment,
    `idContrato` int not null,
    `idDependecia` int not null,
    `idFuncionario` int not null,
    `numeroResolucion` int not null,
    `fechaResolucion` datetime not null,
    `nombreRector` varchar(50) not null,
    
    primary key (`id`),
    
    constraint `fk_idContratoDependenciaFuncionario`
		foreign key (`idContrato`, `idDependecia`, `idFuncionario`)
        references `mydb`.`Contrato` (`id`, `idDependencia`, `idFuncionario`)
)
engine = innodb;


create table `mydb`.`DatosResolucionPersona` (
	`idPlazaAsignada` int not null,
    `idResolucionPersona` int not null,
    `fechaInicioAfectacion` datetime not null,
    `fechaFinalAfectacion` datetime not null,
    `puestoAutorizado` varchar(20) not null,
    `categoriaAutorizada` varchar(20) not null,
    `activo` bit not null, 
    `porcentajeJornadaAutorizado` int not null,
    `cedula` int not null,
    `nombre` varchar(15) not null,
    `apellido1` varchar(15) not null,
    `apellido2` varchar(15) not null,
    `gradoAcademico` varchar(40) not null, 
    `codigoCursoAutorizado` varchar(10) not null,
    
    primary key (`idPlazaAsignada`, `idResolucionPersona`),
    
    constraint `fk_idPlazaAsignada`
		foreign key (`idPlazaAsignada`)
        references `mydb`.`Plaza` (`id`),
        
	constraint `fk_idResolucionPersona`
		foreign key (`idResolucionPersona`)
        references `mydb`.`ResolucionRectoriaPersona` (`id`)
)
engine = innodb;


create table `mydb`.`Ampliacion` (
	`id` int not null auto_increment,
    `idContrato` int not null,
    `idDependencia` int not null,
    `idFuncionario` int not null,
    `tipo` varchar(15) not null,
    `puestoQuienDioPermiso` varchar(20) not null,
    `quienDioPermiso` varchar(50) not null,
    `tienePermiso` bit not null,
    `fechaInicio` datetime not null,
    `fechaFinal` datetime not null,
    
    primary key (`id`),
    
    constraint `fk_idContratoDependenciaFuncionarioAmpliacion`
		foreign key (`idContrato`, `idDependencia`, `idFuncionario`)
		references `mydb`.`Contrato` (`id`, `idDependencia`, `idFuncionario`)
)
engine = innodb;


create table `mydb`.`PlazaContratacion` (
	`idPlaza` int not null,
    `idContrato` int not null,
    `idDependencia` int not null,
    `idFuncionario` int not null,
    `idCaracteristicaPlaza` int not null,
    `porcentajeContratacion` int not null,
    
    primary key (`idCaracteristicaPlaza`, `idPlaza`, `idContrato`, `idDependencia`, `idFuncionario`),
    
    constraint `fk_idCaracteristicaPlaza`
		foreign key (`idCaracteristicaPlaza`, `idPlaza`)
        references `mydb`.`CaracteristicaPlaza` (`id`, `idPlaza`),
	
	constraint `fk_idContrato`
		foreign key (`idContrato`, `idDependencia`, `idFuncionario`)
        references `mydb`.`Contrato` (`id`, `idDependencia`, `idFuncionario`)
)
engine = innodb; 

INSERT INTO Usuario(usuario, contrasena, cedula, nombre, correo, tipo, activo, fechaInicioAutorizacion, fechaFinalAutorizacion) 
    VALUES('jose', md5('123'), '207510507', 'Jose', 'correo', 'Administrador', 1, '2017-01-02', '2017-02-03');