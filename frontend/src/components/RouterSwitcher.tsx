import { Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import Calendar from '../pages/Calendar';
import ActivityDetailsPage from '../pages/ActivityDetailsPage';
import TimerPage from '../pages/TimerPage';
import JournalEntryPage from "../pages/JournalEntryPage";
import ActivityPage from '../pages/ActivityPage';
import JournalEntriesPage from "../pages/JournalEntriesPage";

interface RouterSwitcherProps {
    username: string;
}

const RouterSwitcher: React.FC<RouterSwitcherProps> = ({ username }) => {
    console.log('RouterSwitcher component - username:', username);

    return (
        <Routes>
            {/*Replace path with path, element with component of that page*/}
            <Route path="*" element={<NotFound />} />
            <Route path="/Journal" element={<JournalEntryPage />} />
            <Route path="/JournalEntries" element={<JournalEntriesPage />} />
            <Route path="/Activities" element={<ActivityPage />} />
            <Route path="/Activities/:pk" element={<ActivityDetailsPage />} />
            <Route path="/" element={<Calendar username={username}/>} />
            <Route path="/Detail" element={<ActivityDetailsPage />} />
            {/*<Route path="/Timer" element={<TimerPage />} />*/}
        </Routes>
    );
};

export default RouterSwitcher;