import React from 'react';
import { useFeatureFlag } from "@/hooks/useFeatureFlag"
import Sidebar from '@/components/navigation/Sidebar';
import DashboardNavbar from '@/components/dashboard/navbar/Navbar';

export default function Dashboard() {
    const isNewDashboardEnabled = useFeatureFlag('newDashboard');

    return (
        <div className="flex">
            <Sidebar />
            <DashboardNavbar />
            <div className="flex-1 p-4">
                {/* Dashboard content goes here */}
                <h1>Hi</h1>
            </div>
        </div>
    );
}
