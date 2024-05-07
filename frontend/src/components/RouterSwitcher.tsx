import { Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import Calendar from '../pages/Calendar';
import ActivityDetailsPage from '../pages/ActivityDetailsPage';
import TimerPage from '../pages/TimerPage';
import JournalEntryPage from "../pages/JournalEntryPage";
import ActivityPage from '../pages/ActivityPage';
const RouterSwitcher = () => {
    return (
        <Routes>
            {/*Replace path with path, element with component of that page*/}
            <Route path="*" element={<NotFound />} />
            <Route path="/Journal" element={<JournalEntryPage />} />
            <Route path="/Activities" element={<ActivityPage />} />
            <Route path="/Activities/:pk" element={<ActivityDetailsPage />} />
            <Route path="/" element={<Calendar />} />
            <Route path="/Detail" element={<ActivityDetailsPage />} />
            <Route path="/Timer" element={<TimerPage />} />
        </Routes>
    );
};

export default RouterSwitcher;