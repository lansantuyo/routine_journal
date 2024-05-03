import { TextInput, PasswordInput, Button, Paper, Title, Container, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Login() {
    const navigate = useNavigate(); // Create a navigate function

    // Function to navigate to the Register page
    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <Container size={420} my={40}>
            <Title>Login</Title>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput
                    label="Username"
                    required
                />
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    required
                    mt="md"
                />
                <Group mt="md">
                    <Button type="submit">Login</Button>
                    <Button type="button" onClick={handleRegister} variant="outline" color="gray">Register</Button> {/* Add a Register button */}
                </Group>
            </Paper>
        </Container>
    );
}
