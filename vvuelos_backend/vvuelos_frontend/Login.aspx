<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="vvuelos_backend.vvuelos_frontend.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 1010px;
            height: 312px;
        }
        #Password1 {
            width: 490px;
            height: 28px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div style="text-align: center">
        </div>
        <p style="text-align: center">
            <img alt="" class="auto-style1" src="../Imagenes/Logo.jpg.png" /></p>
        <p style="text-align: center; font-weight: 700; font-size: xx-large">
            Usuario:</p>
        <p style="text-align: center; font-weight: 700; font-size: xx-large">
            <asp:TextBox ID="TextBox1" runat="server" Height="27px" Width="490px"></asp:TextBox>
        </p>
        <p style="text-align: center; font-weight: 700; font-size: xx-large">
            Contraseña:</p>
        <p style="text-align: center; font-weight: 700; font-size: xx-large">
            <input id="Password1" type="password" /></p>
        <p style="text-align: center; font-weight: 700; font-size: xx-large">
            <asp:Button ID="Button1" runat="server" BackColor="#0066FF" Height="51px" OnClick="Button1_Click" Text="Iniciar Sesion" Width="160px" />
            &nbsp;<asp:Button ID="Button2" runat="server" BackColor="#0066FF" Height="51px" style="margin-left: 0px" Text="Registrarse" Width="181px" />
        </p>
        <p style="text-align: center; font-weight: 700; font-size: xx-large">
            &nbsp;</p>
    </form>
</body>
</html>
