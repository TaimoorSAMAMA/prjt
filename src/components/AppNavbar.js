import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

function AppNavbar() {
    return (
        <div className="sticky-navbar"> {/* Ensure a container for sticky positioning */}
            <Navbar expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/" className="navbar-brand-style">GenResume</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0 nav-style">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                        </Nav>
                        <Nav>
                            <Link to="/LoginPage" className="btn btn-outline-success me-3 linkbutton1">Login</Link>
                            <Link to="/RegisterPage" className="btn btn-outline-success">Register</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default AppNavbar;

// import React from 'react';
// import { Navbar, Container, Nav } from 'react-bootstrap';
// import { Link } from "react-router-dom";

// function AppNavbar() {
//     return (
//         <Navbar expand="lg" className="sticky-navbar">
//             <Container fluid>
//                 <Navbar.Brand href="/" className="navbar-brand-style">GenResume</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="navbarScroll" />
//                 <Navbar.Collapse id="navbarScroll">
//                     <Nav className="me-auto my-2 my-lg-0 nav-style">
//                         <Nav.Link href="/">Home</Nav.Link>
//                         <Nav.Link href="#features">Features</Nav.Link>
//                     </Nav>
//                     <Nav>
//                         <Link to="/LoginPage" className="btn btn-outline-success me-3 linkbutton1">Login</Link>
//                         <Link to="/RegisterPage" className="btn btn-outline-success">Register</Link>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// }

// export default AppNavbar;

// import React from 'react';
// import { Navbar, Container, Nav } from 'react-bootstrap';
// import { Link } from "react-router-dom";

// function AppNavbar() {
//     return (
//         <Navbar expand="lg" className="bg-body-tertiary sticky-navbar"  >
//             <Container fluid>
//                 <Navbar.Brand href="/" className="navbar-brand-style">GenResume</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="navbarScroll" />
//                 <Navbar.Collapse id="navbarScroll">
//                     <Nav className="me-auto my-2 my-lg-0 nav-style">
//                         <Nav.Link href="/">Home</Nav.Link>
//                         <Nav.Link href="#features">Features</Nav.Link>
//                     </Nav>
//                     <Nav >
//                         <Link to="/LoginPage" className="btn btn-outline-success me-3 linkbutton1">Login</Link>
//                         <Link to="/RegisterPage" className="btn btn-outline-success">Register</Link>
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// }

// export default AppNavbar;
