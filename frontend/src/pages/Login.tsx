import { useNavigate } from 'react-router-dom';
import Form from "../components/Form";
import { useUser } from '../components/UserContext';

export default function Login() {
    const navigate = useNavigate(); // Create a navigate function
    const { setUsername } = useUser(); // Get setUsername from UserContext

    // Function to navigate to the Register page
    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <Form route="/api/token/" method="login" setUsername={setUsername} />
    );
}
