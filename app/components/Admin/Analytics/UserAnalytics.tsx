import { styles } from "@/app/styles/style";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import Loader from "@/app/components/Loader/Loader";

interface IUserAnalytics {
    isDashboard?: boolean
}

interface ICustomTooltip {
    active?: boolean
    payload?: any
    label?: string
}

const CustomTooltip = ({ active, payload }:ICustomTooltip ) => {
    if (active && payload && payload.length) {
        return (
            <div>
                <p>{`Зарегестрировано : ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

const UserAnalytics = ({ isDashboard }: IUserAnalytics) => {
    const { data, isLoading } = useGetUsersAnalyticsQuery({});

    const analyticsData: any = [];

    data &&
    data.users.last12Months.forEach((item: any) => {
        analyticsData.push({ name: item.month, count: item.count });
    });
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div
                    className={`${
                        !isDashboard
                            ? "mt-[50px]"
                            : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
                    }`}
                >
                    <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
                        <h1
                            className={`${styles.title} ${
                                isDashboard && "!text-[20px]"
                            } px-5 !text-start`}
                        >
                            Аналитика регистрации пользователей
                        </h1>
                        {!isDashboard && (
                            <p className={`${styles.label} px-5`}>
                                Данные за последние 12 месяцев{" "}
                            </p>
                        )}
                    </div>

                    <div
                        className={`w-full ${
                            isDashboard ? "h-[30vh]" : "h-screen"
                        } flex items-center justify-center`}
                    >
                        <ResponsiveContainer
                            width={isDashboard ? "100%" : "90%"}
                            height={!isDashboard ? "50%" : "100%"}
                        >
                            <AreaChart
                                data={analyticsData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <XAxis dataKey="name"/>
                                <YAxis />
                                <Tooltip content={<CustomTooltip />}/>
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#4d62d9"
                                    fill="#4d62d9"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserAnalytics;