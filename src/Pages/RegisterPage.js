import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import AppNavbar from '../components/AppNavbar';
import '../styling/Registration.css';
import Header from '../components/Header';

function RegistrationForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); // Email state
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    // const [GitHubLink, setGitHubLink] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: name, password })
            });
    
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to register');
            }
            setSubmitted(true);
            navigate('/login');
        } catch (error) {
            setRegistrationError(error.message);
        }
    };

    return (
        <>
        {/* <div className="image-sec"></div> */}
            {/* <AppNavbar /> */}
            <Header />
            <Container className="registration-container">
                <Card className="registration-card">
                    <Card.Body>
                        <h1 className="registration-heading">Registration Form</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            {passwordError && (
                                <Alert variant="danger" className="mb-3">
                                    Passwords do not match. Please try again.
                                </Alert>
                            )}

                            {registrationError && (
                                <Alert variant="danger" className="mb-3">
                                    {registrationError}
                                </Alert>
                            )}

                            <Button variant="outline-primary" type="submit">
                                Register
                            </Button>
                        </Form>

                        {submitted && !passwordError && (
                            <Alert variant="outline-success" className="mt-3">
                                Registration Successful!
                            </Alert>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default RegistrationForm;
// import React, { useState } from 'react';
// import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate for programmatic navigation
// import AppNavbar from '../components/AppNavbar';
// import '../styling/Registration.css'; // External CSS file

// function RegistrationForm() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [submitted, setSubmitted] = useState(false);
//     const [passwordError, setPasswordError] = useState(false);
//     const [GitHubLink, setGitHubLink] = useState('');
    
//     const navigate = useNavigate();  // Hook for programmatically navigating

//     const handleSubmit = (event) => {
//         event.preventDefault();
        
//         // Check if password matches confirm password
//         if (password !== confirmPassword) {
//             setPasswordError(true);
//             return;  // Stop the submission if passwords do not match
//         }

//         // If passwords match, proceed with form submission logic
//         // console.log({ name, email, password, confirmPassword });
//         setPasswordError(false);  // Reset password error state
//         setSubmitted(true);

//         setTimeout(() => {
//             navigate('/LoginPage');  // Redirect to LoginPage after the delay
//         }, 2000);  // 2-second delay
//         // After successful form submission, navigate to the desired page
//         // navigate('/LoginPage');
//     };

//     return (
//         <>
//             <AppNavbar />
        
//             <Container className="registration-container">
//                 <Card className="registration-card">
//                     <Card.Body>
//                         <h1 className="registration-heading">Registration Form</h1>
//                         <Form onSubmit={handleSubmit}>
//                             <Form.Group className="mb-3" controlId="formBasicName">
//                                 <Form.Label>Full Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter full name"
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>

//                             <Form.Group className="mb-3" controlId="formBasicEmail">
//                                 <Form.Label>Email Address</Form.Label>
//                                 <Form.Control
//                                     type="email"
//                                     placeholder="Enter email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>

//                             <Form.Group className="mb-3" controlId="formBasicPassword">
//                                 <Form.Label>Password</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>

//                             <Form.Group className="mb-3" controlId="formConfirmPassword">
//                                 <Form.Label>Confirm Password</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     placeholder="Confirm Password"
//                                     value={confirmPassword}
//                                     onChange={(e) => setConfirmPassword(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>

//                             {/* Password mismatch error message */}
//                             {passwordError && (
//                                 <Alert variant="danger" className="mb-3">
//                                     Passwords do not match. Please try again.
//                                 </Alert>
//                             )}

//                             <Form.Group className="mb-3" controlId="formGitHubLink">
//                                 <Form.Label>GitHub Link</Form.Label>
//                                 <Form.Control
//                                     type="url"
//                                     placeholder="Enter GitHub Profile URL"
//                                     value={GitHubLink}
//                                     onChange={(e) => setGitHubLink(e.target.value)}
//                                     required
//                                 />
//                             </Form.Group>

//                             <Button variant="primary" type="submit">
//                                 Register
//                             </Button>
//                         </Form>

//                         {submitted && !passwordError && (
//                             <Alert variant="success" className="mt-3">
//                                 Registration Successful!
//                             </Alert>
//                         )}
//                     </Card.Body>
//                 </Card>
//             </Container>
//         </>
//     );
// }

// export default RegistrationForm;

