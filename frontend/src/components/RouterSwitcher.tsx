import { Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import TextComponent from './Text';
import ButtonComponent from './Button';
import JournalEntryPage from '../pages/JournalEntryPage';
import TestJournalEntry from '../pages/TestJournalEntry';
import HomePage from '../pages/HomePage';
import ActivityDetailPage from '../pages/ActivityDetailPage';
import TimerPage from '../pages/TimerPage';
const RouterSwitcher = () => {
    return (
        <Routes>
            {/*Replace path with path, element with component of that page*/}
            <Route path="*" element={<NotFound />} />
            <Route path="/Journal" element={<JournalEntryPage />} />
            <Route path="/TestJournal" element={<TestJournalEntry />} />
            <Route path="/Activities" element={<ButtonComponent />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/Detail" element={<ActivityDetailPage />} />
            <Route path="/Timer" element={<TimerPage />} />
        </Routes>
    );
};

export default RouterSwitcher;