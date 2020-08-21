import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap';
import Logout from '../auth/logout';

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

        return (
            <div style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <Navbar color="dark" dark expand="md" >
                    <NavbarBrand href="/">OSRS Raids Finder</NavbarBrand>
                    <NavbarToggler onClick={toggle} className="mr-2" />
                    <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/setup">Setup</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/Sjs445/OSRS-Raids-Finder">Github</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/contact">Contact Us</NavLink>
                        </NavItem>
                        <NavItem>
                            <Logout />
                        </NavItem>
                    </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
};

export default NavBar;