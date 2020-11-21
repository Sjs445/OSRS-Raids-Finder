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
import NavbarText from "reactstrap/lib/NavbarText";
import Logout from '../auth/logout';
import styles from '../../styles/landing.module.css';

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
                    <NavbarText>Logged in as, {props.username}&nbsp;
                    {props.isGuide &&
                        <img src={"https://oldschool.runescape.wiki/images/a/a2/Quests.png?f5120"} className={styles.iconSize} alt="Quest Icon" title={"Raid Guide"} />
                    }</NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        )
};

export default NavBar;