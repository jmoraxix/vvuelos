<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MenuPrincipal.aspx.cs" Inherits="vvuelos_backend.vvuelos_frontend.MenuPrincipal" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 1007px;
            height: 252px;
        }
        .auto-style2 {
            color: #000000;
        }
        .auto-style3 {
            color: #999999;
        }
        .auto-style4 {
            font-size: x-large;
        }
    </style>
</head>
<body style="height: 67px">
    <form id="form1" runat="server">
        <div>
            <asp:Panel ID="Panel1" runat="server" BackColor="#999999" Height="45px">
                <asp:Label ID="Label1" runat="server" Text="V-VUELOS" style="font-weight: 700; font-size: xx-large"></asp:Label>
                <asp:Panel ID="Panel4" runat="server" BackColor="#999999" Height="252px" style="margin-left: 1006px">
                    <asp:Panel ID="Panel5" runat="server" style="text-align: right">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; Bienvenido:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <asp:Panel ID="Panel6" runat="server" Height="225px">
                            &nbsp;&nbsp;&nbsp; Sr(a):
                            <asp:LoginName ID="LoginName1" runat="server" />
                            &nbsp;&nbsp;<span class="auto-style3">lllllllllllllllllllllllll&nbsp; </span><span class="auto-style2">
                            <br />
                            </span>
                            <asp:Button ID="Button2" runat="server" BackColor="#CCCCFF" BorderColor="#333333" Text="Cerrar Sesion" />
                            &nbsp;&nbsp;&nbsp;&nbsp; <span class="auto-style3">ñññññññññññññññ </span>&nbsp;&nbsp;&nbsp;
                        </asp:Panel>
                    </asp:Panel>
                </asp:Panel>
            </asp:Panel>
            <asp:Panel ID="Panel2" runat="server" Height="251px" Width="1010px">
                <img alt="" class="auto-style1" src="../Imagenes/DZ2YVDZI75AV3BOU4JBSQKHAEU.jpg" />
            </asp:Panel>
        </div>
        <asp:Panel ID="Panel3" runat="server" BackColor="#999999" Height="42px" style="margin-top: 0px" Width="1495px">
            <span class="auto-style4"><strong>Usted esta en:</strong></span></asp:Panel>
        <p>
            <asp:Button ID="Button3" runat="server" Height="39px" Text="Inicio" Width="80px" />
        </p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <asp:Button ID="Button4" runat="server" Text="Seguridad" />
        <p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <asp:Button ID="Button5" runat="server" Text="Usuarios" />
        </p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <asp:Button ID="Button6" runat="server" Height="23px" OnClick="Button6_Click" Text="-Crear Usuario" Width="121px" />
        <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <asp:Button ID="Button7" runat="server" Height="23px" Text="-Ver Usuarios" Width="131px" />
        <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <asp:Button ID="Button8" runat="server" Height="22px" Text="-Cambiar Contraseña" Width="162px" />
        <p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <asp:Button ID="Button9" runat="server" OnClick="Button9_Click" Text="Administracion" Width="150px" />
        </p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <asp:Button ID="Button10" runat="server" Height="21px" Text="-Consecutivos" Width="121px" />
    </form>
</body>
</html>
