SET XACT_ABORT ON

BEGIN TRANSACTION VVUELOSBD_PAGO

CREATE TABLE [Tarjeta] (
    [Num_Tarjeta] bigint  NOT NULL PRIMARY KEY,
    [Mes_Exp] int  NOT NULL ,
    [Ano_Exp] int  NOT NULL ,
    [CVV] int  NOT NULL ,
    [Monto] DECIMAL(10,2)  NOT NULL ,
    [Tipo] VARCHAR(2) NOT NULL,
    CONSTRAINT chk_Tipo CHECK (Tipo IN ('V', 'MC'))
)

CREATE TABLE [EasyPay] (
    [Num_Cuenta] int  NOT NULL PRIMARY KEY,
    [Codigo_Seguridad] int  NOT NULL,
    [Contrasena] VARCHAR(25) NOT NULL
)

COMMIT TRANSACTION VVUELOSBD_PAGO