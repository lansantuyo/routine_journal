import { useState } from "react";
import { TextInput, PasswordInput, Button, Paper, Title, Container, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";

const Form: React.FC<{ route: string; method: "login" | "register"; }> = ({ route, method }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light');

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
    }

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
        <Container 
            size={920} 
            my={40}
            style={{ 
                backgroundColor: computedColorScheme === 'dark' ? '#2D2222' : '#EAD8C2', 
                color: '#EAD8C2',
                padding: '40px',
                width: '100%',
                maxWidth: '500px',
                margin: '0 auto'
            }}
        >
            <Title 
                order={1} 
                style={{ 
                    marginBottom: '20px', 
                    color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F',
                    fontFamily: 'Inter' 
                }}
            >
                {method === "login" ? "Login" : "Register"}
            </Title>
            <Paper 
                withBorder 
                shadow="md" 
                p={30} 
                mt={30} 
                radius="md"
                style={{ backgroundColor: '#543F3F' }}
            >
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        withAsterisk
                        label="Username"
                        {...form.getInputProps('username')}
                        style={{ marginBottom: '20px' }}
                    />
                    <PasswordInput
                        withAsterisk
                        label="Password"
                        {...form.getInputProps('password')}
                        style={{ marginBottom: '20px' }}
                    />
                    <Button 
                        type="submit" 
                        loading={loading}
                        style={{ 
                            backgroundColor: computedColorScheme === 'light' ? '#413030' : '#EAD8C2', 
                            color: computedColorScheme === 'light' ? '#EAD8C2' : '#543F3F',
                            fontWeight: 'bold', 
                            width: '100%', 
                            marginTop: '20px' 
                        }}
                    >
                        {method === "login" ? "Login" : "Register"}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Form;