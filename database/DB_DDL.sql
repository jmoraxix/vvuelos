SET XACT_ABORT ON

BEGIN TRANSACTION VVUELOSBD

CREATE TABLE [Usuario] (
    [Usuario] VARCHAR(25)  NOT NULL ,
    [Contrasena] VARCHAR(25)  NOT NULL ,
    [Correo] VARCHAR(50)  NOT NULL ,
    [PreguntaSeg] VARCHAR(100)  NOT NULL ,
    [RespuestaSeg] VARCHAR(50)  NOT NULL ,
    CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED (
        [Usuario] ASC
    )
)

CREATE TABLE [Rol] (
    [Codigo] int  NOT NULL IDENTITY(1,1) ,
    [Nombre] VARCHAR(25)  NOT NULL ,
    CONSTRAINT [PK_Rol] PRIMARY KEY CLUSTERED (
        [Codigo] ASC
    )
)

CREATE TABLE [RolUsuario] (
    [UsuarioID] VARCHAR(25)  NOT NULL ,
    [RolID] int  NOT NULL 
)

CREATE TABLE [Aerolinea] (
    [Consecutivo] VARCHAR(25)  NOT NULL ,
    [Nombre] VARCHAR(25)  NOT NULL ,
    CONSTRAINT [PK_Aerolinea] PRIMARY KEY CLUSTERED (
        [Consecutivo] ASC
    )
)

CREATE TABLE [Pais] (
    [Consecutivo] VARCHAR(25)  NOT NULL ,
    [Nombre] VARCHAR(25)  NOT NULL ,
    CONSTRAINT [PK_Pais] PRIMARY KEY CLUSTERED (
        [Consecutivo] ASC
    )
)

CREATE TABLE [Puerta] (
    [Consecutivo] VARCHAR(25)  NOT NULL ,
    [Nombre] VARCHAR(25)  NOT NULL ,
    CONSTRAINT [PK_Puerta] PRIMARY KEY CLUSTERED (
        [Consecutivo] ASC
    )
)

CREATE TABLE [EstadoVuelo] (
    [Codigo] int  NOT NULL IDENTITY(1,1) ,
    [Nombre] VARCHAR(25)  NOT NULL ,
    CONSTRAINT [PK_EstadoVuelo] PRIMARY KEY CLUSTERED (
        [Codigo] ASC
    )
)

CREATE TABLE [Vuelo] (
    [Consecutivo] VARCHAR(25)  NOT NULL ,
    [AerolineaID] VARCHAR(25)  NOT NULL ,
    [PaisDestinoID] VARCHAR(25)  NOT NULL ,
    [PaisOrigenID] VARCHAR(25) NOT NULL,
    [FechaHoraSalida] datetime  NOT NULL ,
    [PuertaID] VARCHAR(25)  NOT NULL ,
    [EstadoVueloID] int  NOT NULL ,
    [Precio] [int] NOT NULL,
    [Capacidad] [int] NOT NULL,
    CONSTRAINT [PK_Vuelo] PRIMARY KEY CLUSTERED (
        [Consecutivo] ASC
    )
)

CREATE TABLE [TipoPago] (
    [Codigo] int  NOT NULL IDENTITY(1,1) ,
    [Nombre] VARCHAR(25)  NOT NULL ,
    CONSTRAINT [PK_TipoPago] PRIMARY KEY CLUSTERED (
        [Codigo] ASC
    )
)

CREATE TABLE [Reservacion] (
    [Consecutivo] VARCHAR(25)  NOT NULL ,
    [UsuarioID] VARCHAR(25)  NOT NULL ,
    [VueloID] VARCHAR(25)  NOT NULL ,
    [TipoPagoID] int  NOT NULL ,
    [Fecha] datetime  NOT NULL ,
    [CantidadCampos] int  NOT NULL ,
    CONSTRAINT [PK_Reservacion] PRIMARY KEY CLUSTERED (
        [Consecutivo] ASC
    )
)


CREATE TABLE [Clase] (
    [Codigo] int  NOT NULL IDENTITY(1,1) ,
    [Nombre] VARCHAR(25)  NOT NULL ,
    CONSTRAINT [PK_Clase] PRIMARY KEY CLUSTERED (
        [Codigo] ASC
    )
)

CREATE TABLE [Accion] (
    [Codigo] int  NOT NULL IDENTITY(1,1) ,
    [Nombre] VARCHAR(25)  NOT NULL ,
    CONSTRAINT [PK_Accion] PRIMARY KEY CLUSTERED (
        [Codigo] ASC
    )
)

CREATE TABLE [Bitacora] (
    [Codigo] int  NOT NULL IDENTITY(1,1) ,
    [UsuarioID] VARCHAR(25)  NOT NULL ,
    [ClaseID] int  NOT NULL ,
    [AccionID] int  NOT NULL ,
    [Detalle] varchar(500)  NOT NULL ,
    CONSTRAINT [PK_Bitacora] PRIMARY KEY CLUSTERED (
        [Codigo] ASC
    )
)

CREATE TABLE [Consecutivo] (
    [Codigo] int  NOT NULL IDENTITY(1,1) ,
    [ClaseID] int  NOT NULL ,
    [TienePrefijo] BIT  NOT NULL ,
    [Prefijo] VARCHAR(25)  NOT NULL ,
    [TieneRango] BIT  NOT NULL ,
    [RangoInicial] int  NOT NULL ,
    [RangoFinal] int  NOT NULL ,
    [Actual] [int] NOT NULL,
    CONSTRAINT [PK_Consecutivo] PRIMARY KEY CLUSTERED (
        [Codigo] ASC
    )
)

CREATE TABLE [Error] (
    [Codigo] int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [Numero] VARCHAR(25)  NOT NULL ,
    [Fecha] datetime  DEFAULT GETDATE() ,
    [Mensaje] VARCHAR(500)  NOT NULL 
    )

ALTER TABLE [RolUsuario] WITH CHECK ADD CONSTRAINT [FK_RolUsuario_UsuarioID] FOREIGN KEY([UsuarioID])
REFERENCES [Usuario] ([Usuario])

ALTER TABLE [RolUsuario] CHECK CONSTRAINT [FK_RolUsuario_UsuarioID]

ALTER TABLE [RolUsuario] WITH CHECK ADD CONSTRAINT [FK_RolUsuario_RolID] FOREIGN KEY([RolID])
REFERENCES [Rol] ([Codigo])

ALTER TABLE [RolUsuario] CHECK CONSTRAINT [FK_RolUsuario_RolID]

ALTER TABLE [Vuelo] WITH CHECK ADD CONSTRAINT [FK_Vuelo_AerolineaID] FOREIGN KEY([AerolineaID])
REFERENCES [Aerolinea] ([Consecutivo])

ALTER TABLE [Vuelo] CHECK CONSTRAINT [FK_Vuelo_AerolineaID]

ALTER TABLE [Vuelo] WITH CHECK ADD CONSTRAINT [FK_Vuelo_PaisDestinoID] FOREIGN KEY([PaisDestinoID])
REFERENCES [Pais] ([Consecutivo])

ALTER TABLE [Vuelo] CHECK CONSTRAINT [FK_Vuelo_PaisDestinoID]

ALTER TABLE [Vuelo] WITH CHECK ADD CONSTRAINT [FK_Vuelo_PaisOrigenID] FOREIGN KEY([PaisOrigenID])
REFERENCES [Pais] ([Consecutivo])

ALTER TABLE [Vuelo] CHECK CONSTRAINT [FK_Vuelo_PaisOrigenID]

ALTER TABLE [Vuelo] WITH CHECK ADD CONSTRAINT [FK_Vuelo_PuertaID] FOREIGN KEY([PuertaID])
REFERENCES [Puerta] ([Consecutivo])

ALTER TABLE [Vuelo] CHECK CONSTRAINT [FK_Vuelo_PuertaID]

ALTER TABLE [Vuelo] WITH CHECK ADD CONSTRAINT [FK_Vuelo_EstadoVueloID] FOREIGN KEY([EstadoVueloID])
REFERENCES [EstadoVuelo] ([Codigo])

ALTER TABLE [Vuelo] CHECK CONSTRAINT [FK_Vuelo_EstadoVueloID]

ALTER TABLE [Reservacion] WITH CHECK ADD CONSTRAINT [FK_Reservacion_UsuarioID] FOREIGN KEY([UsuarioID])
REFERENCES [Usuario] ([Usuario])

ALTER TABLE [Reservacion] CHECK CONSTRAINT [FK_Reservacion_UsuarioID]

ALTER TABLE [Reservacion] WITH CHECK ADD CONSTRAINT [FK_Reservacion_VueloID] FOREIGN KEY([VueloID])
REFERENCES [Vuelo] ([Consecutivo])

ALTER TABLE [Reservacion] CHECK CONSTRAINT [FK_Reservacion_VueloID]

ALTER TABLE [Reservacion] WITH CHECK ADD CONSTRAINT [FK_Reservacion_TipoPagoID] FOREIGN KEY([TipoPagoID])
REFERENCES [TipoPago] ([Codigo])

ALTER TABLE [Reservacion] CHECK CONSTRAINT [FK_Reservacion_TipoPagoID]

ALTER TABLE [Bitacora] WITH CHECK ADD CONSTRAINT [FK_Bitacora_UsuarioID] FOREIGN KEY([UsuarioID])
REFERENCES [Usuario] ([Usuario])

ALTER TABLE [Bitacora] CHECK CONSTRAINT [FK_Bitacora_UsuarioID]

ALTER TABLE [Bitacora] WITH CHECK ADD CONSTRAINT [FK_Bitacora_ClaseID] FOREIGN KEY([ClaseID])
REFERENCES [Clase] ([Codigo])

ALTER TABLE [Bitacora] CHECK CONSTRAINT [FK_Bitacora_ClaseID]

ALTER TABLE [Bitacora] WITH CHECK ADD CONSTRAINT [FK_Bitacora_AccionID] FOREIGN KEY([AccionID])
REFERENCES [Accion] ([Codigo])

ALTER TABLE [Bitacora] CHECK CONSTRAINT [FK_Bitacora_AccionID]

ALTER TABLE [Consecutivo] WITH CHECK ADD CONSTRAINT [FK_Consecutivo_ClaseID] FOREIGN KEY([ClaseID])
REFERENCES [Clase] ([Codigo])

ALTER TABLE [Consecutivo] CHECK CONSTRAINT [FK_Consecutivo_ClaseID]

CREATE INDEX [idx_Usuario_Correo]
ON [Usuario] ([Correo])

ALTER TABLE Reservacion ADD CONSTRAINT DF_Reservacion DEFAULT GETDATE() FOR Fecha;

COMMIT TRANSACTION VVUELOSBD

INSERT [dbo].[Accion] ([Nombre]) VALUES (N'Agregar')
INSERT [dbo].[Accion] ([Nombre]) VALUES (N'Modificar')
INSERT [dbo].[Accion] ([Nombre]) VALUES (N'Eliminar')

INSERT [dbo].[Clase] ([Nombre]) VALUES (N'Aerolinea')
INSERT [dbo].[Clase] ([Nombre]) VALUES (N'Pais')
INSERT [dbo].[Clase] ([Nombre]) VALUES (N'Puerta')
INSERT [dbo].[Clase] ([Nombre]) VALUES (N'Vuelo')
INSERT [dbo].[Clase] ([Nombre]) VALUES (N'Reservacion')

INSERT [dbo].[Consecutivo] ([ClaseID], [TienePrefijo], [Prefijo], [TieneRango], [RangoInicial], [RangoFinal], [Actual]) VALUES (1, 1, N'AE-', 1, 100, 200, 100)
INSERT [dbo].[Consecutivo] ([ClaseID], [TienePrefijo], [Prefijo], [TieneRango], [RangoInicial], [RangoFinal], [Actual]) VALUES (2, 1, N'PA-', 1, 100, 200, 100)
INSERT [dbo].[Consecutivo] ([ClaseID], [TienePrefijo], [Prefijo], [TieneRango], [RangoInicial], [RangoFinal], [Actual]) VALUES (3, 1, N'PU-', 1, 100, 200, 100)
INSERT [dbo].[Consecutivo] ([ClaseID], [TienePrefijo], [Prefijo], [TieneRango], [RangoInicial], [RangoFinal], [Actual]) VALUES (4, 1, N'VU-', 1, 100, 200, 100)
INSERT [dbo].[Consecutivo] ([ClaseID], [TienePrefijo], [Prefijo], [TieneRango], [RangoInicial], [RangoFinal], [Actual]) VALUES (5, 1, N'RE-', 1, 100, 200, 100)

INSERT [dbo].[EstadoVuelo] ([Nombre]) VALUES (N'A Tiempo')
INSERT [dbo].[EstadoVuelo] ([Nombre]) VALUES (N'Atrasado')
INSERT [dbo].[EstadoVuelo] ([Nombre]) VALUES (N'Cancelado')
INSERT [dbo].[EstadoVuelo] ([Nombre]) VALUES (N'En Ruta')
INSERT [dbo].[EstadoVuelo] ([Nombre]) VALUES (N'Prueba')

INSERT [dbo].[Pais] ([Consecutivo], [Nombre]) VALUES (N'1', N'Panama')
INSERT [dbo].[Pais] ([Consecutivo], [Nombre]) VALUES (N'2', N'Costa Rica')

INSERT [dbo].[Rol] ([Nombre]) VALUES (N'Administrador')
INSERT [dbo].[Rol] ([Nombre]) VALUES (N'Cliente')

INSERT [dbo].[TipoPago] ([Nombre]) VALUES (N'Tarjeta')
INSERT [dbo].[TipoPago] ([Nombre]) VALUES (N'Efectivo')
INSERT [dbo].[TipoPago] ([Nombre]) VALUES (N'Easy Pay')

INSERT [dbo].[Usuario] ([Usuario], [Contrasena], [Correo], [PreguntaSeg], [RespuestaSeg]) VALUES (N'josef14', N'1234', N'josef@gmail.com', N'¿Cual es su comida favorita?', N'Hamburguesas')
INSERT [dbo].[Usuario] ([Usuario], [Contrasena], [Correo], [PreguntaSeg], [RespuestaSeg]) VALUES (N'sebas31', N'1234', N'sebas@gmail.com', N'¿Cual es su comida favorita?', N'Pizza')

INSERT [dbo].[Aerolinea] ([Consecutivo], [Nombre]) VALUES (N'0', N'American Airlines')