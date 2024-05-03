import { TextInput, PasswordInput, Button, Paper, Title, Container, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Form from "../components/Form";

export default function Login() {
    const navigate = useNavigate(); // Create a navigate function

    // Function to navigate to the Register page
    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <Form route="/api/token/" method="login" />
    );
}
