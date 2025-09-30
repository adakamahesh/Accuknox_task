import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, Widget } from "../../types/widgets";

const initialState: Category[] = [
    {
        id: "1",
        name: "CSPM Executive Dashboard",
        type: "pie",
        widgets: [
            {
                id: "w-chart-1",
                name: "Cloud Accounts",
                chartData: [
                    { label: "Connected", value: 2, color: "#4285F4" },
                    { label: "Not Connected", value: 2, color: "#7988a7ff" },
                ],
            },
            {
                id: "w-chart-2",
                name: "Cloud Accounts Risk Assessment",
                chartData: [
                    { label: "Failed", value: 1689, color: "#8b1010ff" },
                    { label: "Warning", value: 681, color: "#dce62bff" },
                    { label: "Not available", value: 206, color: "#87887dff" },
                    { label: "Passed", value: 7253, color: "#1ce670ff" },
                ],
            },
        ],
    },
    {
        id: "2", name: "CWPP Dashboard", type: "pie", widgets: [
            {
                id: "w-chart-1",
                name: "Top 5 Namespace Specific Alerts",
                chartData: [],
            },
            {
                id: "w-chart-2",
                name: "Workload Alerts",
                chartData: [],
            },
        ]
    },
    {
        id: "3", name: "Registry Scan", type: "line", widgets: [
            {
                id: "w-chart-1",
                name: "Image Risk Assessment",
                chartData: [
                    { label: "Critcal", value: 9, color: "#3f0e0eff" },
                    { label: "High", value: 150, color: "#8d2036ff" },
                    { label: "Low", value: 20, color: "#87887dff" },
                    { label: "Emegency", value: 72, color: "#1ce670ff" },
                ],
            },
            {
                id: "w-chart-2",
                name: "Image Security Issues",
                chartData: [
                    { label: "Critcal", value: 2, color: "#3f0e0eff" },
                    { label: "High", value: 2, color: "#8d2036ff" },
                    { label: "Low", value: 2, color: "#87887dff" },
                    { label: "Emegency", value: 1, color: "#1ce670ff" },
                ],
            },
        ]
    },
];

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        addWidget: (
            state,
            action: PayloadAction<{ categoryId: string; widget: Widget }>
        ) => {
            const cat = state.find((c) => c.id === action.payload.categoryId);
            if (cat) cat.widgets.push(action.payload.widget);
        },
        removeWidget: (
            state,
            action: PayloadAction<{ categoryId: string; widgetId: string }>
        ) => {
            const cat = state.find((c) => c.id === action.payload.categoryId);
            if (cat) {
                cat.widgets = cat.widgets.filter((w) => w.id !== action.payload.widgetId);
            }
        },
    },
});

export const { addWidget, removeWidget } = dashboardSlice.actions;

export const store = configureStore({
    reducer: {
        dashboard: dashboardSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;