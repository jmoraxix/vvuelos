import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, NavbarText, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./css/App.css";

const NavBar = (props) => {
  const cookies = new Cookies();
  const usuarioID = cookies.get('UsuarioID');
  const nombre = cookies.get('Nombre');
  const mensajeBienvenida = "Bienvenido " + (nombre? nombre : usuarioID);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
      <div>
        <Navbar color="primary" dark expand="md">
          <NavbarBrand href="/">vVuelos</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            { usuarioID &&
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/reservar">Crear reserva</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/misReservaciones">Mis reservas</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Mi cuenta</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Administraci&oacute;n
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/admin/usuarios" className="text-muted">Usuario</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/admin/roles" className="text-muted">Roles</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/admin/usuarios/roles" className="text-muted">Asignar roles</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/admin/aerolineas" className="text-muted">Aerol&iacute;neas</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/admin/paises" className="text-muted">Paises</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/admin/puertas" className="text-muted">Puertas</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/admin/estadosVuelos" className="text-muted">Estados de vuelos</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/admin/vuelos" className="text-muted">Vuelos</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/admin/tiposPago" className="text-muted">Tipos de Pago</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/admin/reservaciones" className="text-muted">Reservaciones</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/admin/consecutivo" className="text-muted">Consecutivo</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/admin/clase" className="text-muted">Clase</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/admin/accion" className="text-muted">Acci&oacute;n</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/admin/bitacoras" className="text-muted">Bit&aacute;cora</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/admin/error" className="text-muted">Errores</NavLink>
                    </NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="/logout">Cerrar Sesi&oacute;n</NavLink>
              </NavItem>
            </Nav>
            }
            {
              usuarioID &&
              <NavbarText>{mensajeBienvenida}</NavbarText>
            }
          </Collapse>
        </Navbar>
      </div>
  );
}

export default NavBar;