import { TextInput, PasswordInput, Button, Paper, Title, Container, Group } from '@mantine/core';

export default function Register() {
    return (
        <Container size={420} my={40}>
            <Title>Register</Title>
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
                <TextInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    required
                    mt="md"
                />
                <Group mt="md">
                    <Button type="submit">Register</Button>
                </Group>
            </Paper>
        </Container>
    );
}
