--Inserts
CREATE TRIGGER [AfterInsertT_Aerolinea]
ON [Aerolinea]
AFTER INSERT
AS
INSERT INTO [Bitacora] ([UsuarioID],[ClaseID],[AccionID],[Detalle]) VALUES (N'Admin',1,1,CONCAT(N'Se inserto una Aerolinea en la base de datos con el consecutivo', (SELECT TOP 1 inserted.Consecutivo FROM inserted)))
GO

CREATE TRIGGER [AfterInsertT_Pais]
ON [Pais]
AFTER INSERT
AS
INSERT INTO [Bitacora] ([UsuarioID],[ClaseID],[AccionID],[Detalle]) VALUES (N'Admin',2,1,CONCAT(N'Se inserto una Pais en la base de datos con el consecutivo', (SELECT TOP 1 inserted.Consecutivo FROM inserted)))
GO

CREATE TRIGGER [AfterInsertT_Puerta]
ON [Puerta]
AFTER INSERT
AS
INSERT INTO [Bitacora] ([UsuarioID],[ClaseID],[AccionID],[Detalle]) VALUES (N'Admin',3,1,CONCAT(N'Se inserto una Puerta en la base de datos con el consecutivo', (SELECT TOP 1 inserted.Consecutivo FROM inserted)))
GO

CREATE TRIGGER [AfterInsertT_Vuelo]
ON [Vuelo]
AFTER INSERT
AS
INSERT INTO [Bitacora] ([UsuarioID],[ClaseID],[AccionID],[Detalle]) VALUES (N'Admin',4,1,CONCAT(N'Se inserto una Vuelo en la base de datos con el consecutivo', (SELECT TOP 1 inserted.Consecutivo FROM inserted)))
GO

CREATE TRIGGER [AfterInsertT_Reservacion]
ON [Reservacion]
AFTER INSERT
AS
INSERT INTO [Bitacora] ([UsuarioID],[ClaseID],[AccionID],[Detalle]) VALUES (N'Admin',5,1,CONCAT(N'Se inserto una Reservacion en la base de datos con el consecutivo', (SELECT TOP 1 inserted.Consecutivo FROM inserted)))
GO

--Deletes
CREATE TRIGGER [AfterDeleteT_Aerolinea]
ON [Aerolinea]
AFTER DELETE
AS
INSERT INTO [Bitacora] ([UsuarioID],[ClaseID],[AccionID],[Detalle]) VALUES (N'Admin',1,3,CONCAT(N'Se elimino una Aerolinea en la base de datos con el consecutivo', (SELECT TOP 1  deleted.Consecutivo FROM deleted)))
GO

CREATE TRIGGER [AfterDeleteT_Pais]
ON [Pais]
AFTER DELETE
AS
INSERT INTO [Bitacora] ([UsuarioID],[ClaseID],[AccionID],[Detalle]) VALUES (N'Admin',2,3,CONCAT(N'Se elimino una Pais en la base de datos con el consecutivo', (SELECT TOP 1  deleted.Consecutivo FROM deleted)))
GO

CREATE TRIGGER [AfterDeleteT_Puerta]
ON [Puerta]
AFTER DELETE
AS
INSERT INTO [Bitacora] ([UsuarioID],[ClaseID],[AccionID],[Detalle]) VALUES (N'Admin',3,3,CONCAT(N'Se elimino una Puerta en la base de datos con el consecutivo', (SELECT TOP 1  deleted.Consecutivo FROM deleted)))
GO

CREATE TRIGGER [AfterDeleteT_Vuelo]
ON [Vuelo]
AFTER DELETE
AS
INSERT INTO [Bitacora] ([UsuarioID],[ClaseID],[AccionID],[Detalle]) VALUES (N'Admin',4,3,CONCAT(N'Se elimino una Vuelo en la base de datos con el consecutivo', (SELECT TOP 1  deleted.Consecutivo FROM deleted)))
GO

CREATE TRIGGER [AfterDeleteT_Reservacion]
ON [Reservacion]
AFTER DELETE
AS
INSERT INTO [Bitacora] ([UsuarioID],[ClaseID],[AccionID],[Detalle]) VALUES (N'Admin',5,3,CONCAT(N'Se elimino una Reservacion en la base de datos con el consecutivo', (SELECT TOP 1  deleted.Consecutivo FROM deleted)))
GO

--Updates
CREATE TRIGGER [AfterUpdateT_Aerolinea]
ON [Aerolinea]
AFTER UPDATE
AS
INSERT INTO [Bitacora] ([UsuarioID],[ClaseID],[AccionID],[Detalle]) VALUES (N'Admin',1,2,CONCAT(N'Se actualizo una Aerolinea en la base de datos con el consecutivo', (SELECT TOP 1 inserted.Consecutivo FROM inserted)))
GO

CREATE TRIGGER [AfterUpdateT_Pais]
ON [Pais]
AFTER UPDATE
AS
INSERT INTO [Bitacora] ([UsuarioID],[ClaseID],[AccionID],[Detalle]) VALUES (N'Admin',2,2,CONCAT(N'Se actualizo una Pais en la base de datos con el consecutivo', (SELECT TOP 1 inserted.Consecutivo FROM inserted)))
GO

CREATE TRIGGER [AfterUpdateT_Puerta]
ON [Puerta]
AFTER UPDATE
AS
INSERT INTO [Bitacora] ([UsuarioID],[ClaseID],[AccionID],[Detalle]) VALUES (N'Admin',3,2,CONCAT(N'Se actualizo una Puerta en la base de datos con el consecutivo', (SELECT TOP 1 inserted.Consecutivo FROM inserted)))
GO

CREATE TRIGGER [AfterUpdateT_Vuelo]
ON [Vuelo]
AFTER UPDATE
AS
INSERT INTO [Bitacora] ([UsuarioID],[ClaseID],[AccionID],[Detalle]) VALUES (N'Admin',4,2,CONCAT(N'Se actualizo una Vuelo en la base de datos con el consecutivo', (SELECT TOP 1 inserted.Consecutivo FROM inserted)))
GO

CREATE TRIGGER [AfterUpdateT_Reservacion]
ON [Reservacion]
AFTER UPDATE
AS
INSERT INTO [Bitacora] ([UsuarioID],[ClaseID],[AccionID],[Detalle]) VALUES (N'Admin',5,2,CONCAT(N'Se actualizo una Reservacion en la base de datos con el consecutivo', (SELECT TOP 1 inserted.Consecutivo FROM inserted)))
GO

--Logica reservaciones
CREATE TRIGGER [AfterInsertReservacionVuelo]
ON [Reservacion]
AFTER INSERT
AS
UPDATE [Vuelo] SET Capacidad = Capacidad - (SELECT TOP 1 inserted.CantidadCampos FROM inserted)
