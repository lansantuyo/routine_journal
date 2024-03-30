import { Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import TextComponent from './Text';
import ButtonComponent from './Button';
import JournalEntryPage from '../pages/JournalEntryPage';

const RouteSwitcher = () => {
    return (
        <Routes>
            {/*Replace path with path, element with component of that page*/}
            <Route path="*" element={<NotFound />} />
            <Route path="/Journal" element={<JournalEntryPage />} />
            <Route path="/Activities" element={<ButtonComponent />} />
            <Route path="/Homepage" element={<ButtonComponent />} />
        </Routes>
    );
};

export default RouteSwitcher;