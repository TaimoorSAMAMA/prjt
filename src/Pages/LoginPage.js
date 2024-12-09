import React, { useState } from "react";
// import AppNavbar from '../components/AppNavbar';
import '../styling/LoginPage.css'; 
import { Button, Form, Alert, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from 'react-router-dom'
import Header from "../components/Header";
// import Hero from "../components/Hero";

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for programmatically navigating

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/api/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
    
            const data = await response.json();
            if (data.success) {
                navigate('/DashboardPage');
                setError('');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('Failed to connect to the server');
        }
    };

    return (
        <>
            {/* <div className="image-sec"></div> */}
            {/* <AppNavbar /> */}
            
            <Header />
            <Container className="login-container">
                <Card className="login-card">
                    <Card.Body>
                        <h1>Login</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            {error && <Alert variant="danger">{error}</Alert>} {/* Display error message if there is an error */}

                            <Button variant="outline-primary" type="submit">Login</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            
        </>
    );
}

export default LoginForm;

// import React, { useState } from "react";
// import AppNavbar from '../components/AppNavbar';
// import '../styling/LoginPage.css'; 
// import { Button, Form, Alert, Container, Card } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from 'react-router-dom'

// function LoginForm() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate(); // Hook for programmatically navigating

//     const handleSubmit = (event) => {
//         event.preventDefault(); // Prevent default form submission behavior

//         if (!username || !password) {
//             setError('Please enter both username and password'); // Validation error
//             return; // Stop the submission if fields are empty
//         }

//         // If validation is successful:
//         setError(''); // Clear any previous errors
//         navigate('/DashboardPage'); // Navigate to the dashboard page
//     };

//     return (
//         <>
//             <AppNavbar />
//             <Container className="login-container">
//                 <Card className="login-card">
//                     <Card.Body>
//                         <h1>Login</h1>
//                         <Form onSubmit={handleSubmit}>
//                             <Form.Group className="mb-3" controlId="formBasicEmail">
//                                 <Form.Label>Username</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter username"
//                                     value={username}
//                                     onChange={(e) => setUsername(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>

//                             <Form.Group className="mb-3" controlId="formBasicPassword">
//                                 <Form.Label>Password</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     placeholder="Enter password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>

//                             {error && <Alert variant="danger">{error}</Alert>} {/* Display error message if there is an error */}

//                             <Button variant="outline-success" type="submit">Login</Button>
//                         </Form>
//                     </Card.Body>
//                 </Card>
//             </Container>
//         </>
//     );
// }

// export default LoginForm;
