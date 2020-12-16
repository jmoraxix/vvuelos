--Stored Procedure para generar consecutivos nuevos de cada clase
CREATE PROCEDURE CrearConsecutivo @ClaID int
AS
INSERT INTO Consecutivo(ClaseID, TienePrefijo, Prefijo, TieneRango, RangoInicial, RangoFinal, Actual)
SELECT ClaseID, TienePrefijo, Prefijo, TieneRango, RangoInicial, RangoFinal, Actual +1 AS ActualActualizado
FROM Consecutivo 
WHERE Actual = (SELECT MAX(Actual) AS Actualmax FROM Consecutivo WHERE ClaseID = @ClaID) AND ClaseID = @ClaID

--select para conseguir el consecutivo
SELECT CONCAT(Prefijo, Actual) As ConsecutivoAerolinea
FROM Consecutivo
Where Actual = (SELECT MAX(Actual) AS Actualmax FROM Consecutivo WHERE ClaseID = 1)

--trigger para insertar consecutivo en aerolinea
CREATE TRIGGER InsteadOfInsertAerolinea
ON Aerolinea
INSTEAD OF INSERT
AS
BEGIN
EXEC CrearConsecutivo @ClaID = 1
INSERT INTO Aerolinea VALUES (
(SELECT CONCAT(Prefijo, Actual) As ConsecutivoAerolinea
FROM Consecutivo
Where Actual = (SELECT MAX(Actual) AS Actualmax FROM Consecutivo WHERE ClaseID = 1) AND ClaseID = 1),
(SELECT TOP 1  inserted.Nombre FROM inserted))
END

--trigger para insertar consecutivo en pais
CREATE TRIGGER InsteadOfInsertPais
ON Pais
INSTEAD OF INSERT
AS
BEGIN
EXEC CrearConsecutivo @ClaID = 2
INSERT INTO Pais VALUES (
(SELECT CONCAT(Prefijo, Actual) As ConsecutivoPais
FROM Consecutivo
Where Actual = (SELECT MAX(Actual) AS Actualmax FROM Consecutivo WHERE ClaseID = 2) AND ClaseID = 2),
(SELECT TOP 1  inserted.Nombre FROM inserted))
END

--trigger para insertar consecutivo en puerta
CREATE TRIGGER InsteadOfInsertPuerta
ON Puerta
INSTEAD OF INSERT
AS
BEGIN
EXEC CrearConsecutivo @ClaID = 3
INSERT INTO Puerta VALUES (
(SELECT CONCAT(Prefijo, Actual) As ConsecutivoPuerta
FROM Consecutivo
Where Actual = (SELECT MAX(Actual) AS Actualmax FROM Consecutivo WHERE ClaseID = 3) AND ClaseID = 3),
(SELECT TOP 1  inserted.Nombre FROM inserted))
END

--trigger para insertar consecutivo en vuelo
CREATE TRIGGER InsteadOfInsertVuelo
ON Vuelo
INSTEAD OF INSERT
AS
BEGIN
EXEC CrearConsecutivo @ClaID = 4
INSERT INTO Vuelo VALUES (
(SELECT CONCAT(Prefijo, Actual) As ConsecutivoVuelo
FROM Consecutivo
Where Actual = (SELECT MAX(Actual) AS Actualmax FROM Consecutivo WHERE ClaseID = 4) AND ClaseID = 4),
(SELECT TOP 1  inserted.AerolineaID FROM inserted),
(SELECT TOP 1  inserted.PaisDestinoID FROM inserted),
(SELECT TOP 1  inserted.PaisOrigenID FROM inserted),
(SELECT TOP 1  inserted.FechaHoraSalida FROM inserted),
(SELECT TOP 1  inserted.PuertaID FROM inserted),
(SELECT TOP 1  inserted.EstadoVueloID FROM inserted),
(SELECT TOP 1  inserted.Precio FROM inserted),
(SELECT TOP 1  inserted.Capacidad FROM inserted))
END

--trigger para insertar consecutivo reservacion
CREATE TRIGGER InsteadOfInsertReservacion
ON Reservacion
INSTEAD OF INSERT
AS
BEGIN
EXEC CrearConsecutivo @ClaID = 5
INSERT INTO Reservacion VALUES (
(SELECT CONCAT(Prefijo, Actual) As ConsecutivoReservacion
FROM Consecutivo
Where Actual = (SELECT MAX(Actual) AS Actualmax FROM Consecutivo WHERE ClaseID = 5) AND ClaseID = 5),
(SELECT TOP 1  inserted.UsuarioID FROM inserted),
(SELECT TOP 1  inserted.VueloID FROM inserted),
(SELECT TOP 1  inserted.TipoPagoID FROM inserted),
(SELECT TOP 1  inserted.Fecha FROM inserted),
(SELECT TOP 1  inserted.CantidadCampos FROM inserted))
END