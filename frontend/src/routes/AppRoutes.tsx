import { Routes, Route } from 'react-router-dom'
import MainLayout from "@/components/layouts/MainLayout";
import SearchScorePage from '@/pages/SearchScorePage';
import DashboardPage from '@/pages/DashboardPage';
import ReportPage from '@/pages/ReportPage';
import TopStudentsPage from '@/pages/TopStudentsPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<SearchScorePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/search-scores" element={<SearchScorePage />} />
                <Route path="/reports" element={<ReportPage />} />
                <Route path="/top-students" element={<TopStudentsPage />} />
            </Route>
        </Routes>
    )
}