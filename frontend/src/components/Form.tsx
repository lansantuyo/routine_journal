import { useState } from "react";
import { TextInput, PasswordInput, Button, Paper, Title, Container } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";

const Form: React.FC<{ route: string; method: "login" | "register"; }> = ({ route, method }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },

        validate: {
            username: (value) => (value ? null : 'Username is required'),
            password: (value) => (value ? null : 'Password is required'),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        try {
            const { username, password } = values;
            const res = await api.post(route, { username, password });
            if (method == "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login/");
            }
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container size={420} my={40}>
            <Title order={1}>{method === "login" ? "Login" : "Register"}</Title>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        withAsterisk
                        label="Username"
                        {...form.getInputProps('username')}
                    />
                    <PasswordInput
                        withAsterisk
                        label="Password"
                        {...form.getInputProps('password')}
                    />
                    <Button type="submit" loading={loading}>
                        {method === "login" ? "Login" : "Register"}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Form;
