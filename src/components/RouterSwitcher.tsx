import { Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import TextComponent from './Text';
import ButtonComponent from './Button';
import JournalEntryPage from '../pages/JournalEntryPage';
import HomePage from '../pages/HomePage';
import ActivityDetailPage from '../pages/ActivityDetailPage';

const RouterSwitcher = () => {
    return (
        <Routes>
            {/*Replace path with path, element with component of that page*/}
            <Route path="*" element={<NotFound />} />
            <Route path="/Journal" element={<JournalEntryPage />} />
            <Route path="/Activities" element={<ButtonComponent />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/Detail" element={<ActivityDetailPage />} /> 
        </Routes>
    );
};

export default RouterSwitcher;