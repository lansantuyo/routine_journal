import { Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import JournalEntryPage from '../pages/JournalEntryPage';
import Calendar from '../pages/Calendar';
import ActivityDetailPage from '../pages/ActivityDetailPage';
import TimerPage from '../pages/TimerPage';
import ActivityPage from '../pages/ActivityPage';
import AddActivityForm from '../pages/AddActivity';
const RouterSwitcher = () => {
    return (
        <Routes>
            {/*Replace path with path, element with component of that page*/}
            <Route path="*" element={<NotFound />} />
            <Route path="/Journal" element={<JournalEntryPage />} />
            <Route path="/Activities" element={<ActivityPage />} />
            <Route path="/" element={<Calendar />} />
            <Route path="/Detail" element={<ActivityDetailPage />} />
            <Route path="/Timer" element={<TimerPage />} />
            <Route path="/AddActivity" element = {<AddActivityForm />} />
        </Routes>
    );
};

export default RouterSwitcher;