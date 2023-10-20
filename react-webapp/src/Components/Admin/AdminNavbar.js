import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const AdminNavBar = () => {
    return (
        <Navbar display="flex" bg="dark" variant="dark" expand="sm" className="pb-3">
            <Container>                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} exact to='/employees'>Employees</Nav.Link>
                        <Nav.Link as={NavLink} exact to='/absencetype'>Absences</Nav.Link>
                        <Nav.Link as={NavLink} exact to='/appliances'>Appliances</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}