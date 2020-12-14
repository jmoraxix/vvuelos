import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./css/App.css";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
      <div>
        <Navbar color="primary" dark expand="md">
          <NavbarBrand href="/">vVuelos</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink to="/">Crear reserva</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/">Mis reservas</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/">Mi cuenta</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Administraci&oacute;n
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/usuarios" className="text-muted">Usuario</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/roles" className="text-muted">Roles</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/aerolineas" className="text-muted">Aerolineas</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/paises" className="text-muted">Paises</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/puertas" className="text-muted">Puertas</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/estadosVuelos" className="text-muted">Estados de vuelos</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/vuelos" className="text-muted">Vuelos</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/tiposPago" className="text-muted">Tipos de Pago</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/reservaciones" className="text-muted">Reservaciones</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/consecutivo" className="text-muted">Consecutivo</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/clase" className="text-muted">Clase</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/accion" className="text-muted">Accion</NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink href="/bitacora" className="text-muted">Bitacora</NavLink>
                    </NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
             
              <NavItem>
                <NavLink to="/logout">Cerrar Sesion</NavLink>
              </NavItem>
             
              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
  );
}

export default NavBar;