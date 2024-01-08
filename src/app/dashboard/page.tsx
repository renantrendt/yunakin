import React from 'react';
import { useFeatureFlag } from "@/hooks/useFeatureFlag"

export default function Dashboard() {
    const isNewDashboardEnabled = useFeatureFlag('newDashboard');

    return (
        <div>
            {isNewDashboardEnabled ? (
                <p>Welcome to the New Dashboard!</p>
            ) : (
                <p>Welcome to the Old Dashboard.</p>
            )}
        </div>
    );
}
