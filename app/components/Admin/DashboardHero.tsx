import React, {FC, useState} from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardWidgets from "@/app/components/Admin/Widgets/DashboardWidgets";

interface IDashboardHero {
    isDashboard?: boolean
}

const DashboardHero:FC<IDashboardHero>= ({isDashboard}) => {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <DashboardHeader open={open} setOpen={setOpen}/>
            {isDashboard && <DashboardWidgets open={open} />}
        </div>
    );
};

export default DashboardHero;