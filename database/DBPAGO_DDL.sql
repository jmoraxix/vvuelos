SET XACT_ABORT ON

BEGIN TRANSACTION VVUELOSBD_PAGO

CREATE TABLE [Transaccion_Tarjeta] (
    [Codigo] int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [Num_Tarjeta] bigint  NOT NULL,
    [Mes_Exp] int  NOT NULL ,
    [Ano_Exp] int  NOT NULL ,
    [CVV] int  NOT NULL ,
    [Monto] DECIMAL(20,2)  NOT NULL ,
    [Tipo] VARCHAR(2) NOT NULL,
    CONSTRAINT chk_Tipo_T CHECK (Tipo IN ('V', 'MC'))
)

CREATE TABLE [Tarjeta] (
    [Num_Tarjeta] bigint  NOT NULL PRIMARY KEY,
    [Mes_Exp] int  NOT NULL ,
    [Ano_Exp] int  NOT NULL ,
    [CVV] int  NOT NULL ,
    [Saldo] DECIMAL(20,2)  NOT NULL ,
    [Tipo] VARCHAR(2) NOT NULL,
    CONSTRAINT chk_Tipo CHECK (Tipo IN ('V', 'MC'))
)

CREATE TABLE [Transaccion_EasyPay] (
    [Codigo] int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [Num_Cuenta] int  NOT NULL,
    [Codigo_Seguridad] int  NOT NULL,
    [Monto] DECIMAL(20,2)  NOT NULL ,
    [Contrasena] VARCHAR(25) NOT NULL
)

CREATE TABLE [EasyPay] (
    [Num_Cuenta] int  NOT NULL PRIMARY KEY,
    [Codigo_Seguridad] int  NOT NULL,
    [Saldo] DECIMAL(20,2)  NOT NULL ,
    [Contrasena] VARCHAR(25) NOT NULL
)

ALTER TABLE [Transaccion_Tarjeta] WITH CHECK ADD CONSTRAINT [FK_Transaccion_Tarjeta] FOREIGN KEY([Num_Tarjeta])
REFERENCES [Tarjeta] ([Num_Tarjeta])

ALTER TABLE [Transaccion_EasyPay] WITH CHECK ADD CONSTRAINT [FK_Transaccion_EasyPay] FOREIGN KEY([Num_Cuenta])
REFERENCES [EasyPay] ([Num_Cuenta])

COMMIT TRANSACTION VVUELOSBD_PAGO