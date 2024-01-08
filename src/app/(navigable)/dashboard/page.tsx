import React from 'react';
import { useFeatureFlag } from "@/hooks/useFeatureFlag"
import Sidebar from '@/components/navigation/Sidebar';

export default function Dashboard() {
    const isNewDashboardEnabled = useFeatureFlag('newDashboard');

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-4">
                {/* Dashboard content goes here */}
            </div>
        </div>
    );
}
