import React from "react";

export interface ChartDataItem {
    label: string;
    value: number;
    color?: string;
}

interface CloudAccountsDashboardProps {
    data: ChartDataItem[];
}

const CloudAccountsDashboard: React.FC<CloudAccountsDashboardProps> = ({ data }) => {
    const defaultColors = ["#4285f4", "#e8eaed", "#fbbc05", "#34a853"];
    const total = data.reduce((sum, item) => sum + item.value, 0);

    const radius = 50;
    const circumference = 2 * Math.PI * radius;

    let offset = 0; // cumulative offset

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {/* Donut Chart */}
            <div style={{ position: "relative", width: 120, height: 120 }}>
                <svg width={120} height={120}>
                    {/* Base Circle */}
                    <circle
                        cx={60}
                        cy={60}
                        r={radius}
                        fill="none"
                        stroke="#f0f0f0"
                        strokeWidth={12}
                    />
                    {/* Pie Arcs */}
                    {data.map((item, idx) => {
                        const percentage = total ? item.value / total : 0;
                        const dash = percentage * circumference;

                        const circle = (
                            <circle
                                key={idx}
                                cx={60}
                                cy={60}
                                r={radius}
                                fill="none"
                                stroke={item.color || defaultColors[idx % defaultColors.length]}
                                strokeWidth={12}
                                strokeDasharray={`${dash} ${circumference - dash}`}
                                strokeDashoffset={circumference - offset}
                                transform="rotate(-90 60 60)"
                                strokeLinecap="butt"
                            />
                        );

                        offset += dash;
                        return circle;
                    })}
                </svg>
                {/* Center Text - Positioned absolutely over SVG */}
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center"
                }}>
                    <div style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#333",
                        lineHeight: "1.2"
                    }}>
                        {total}
                    </div>
                    <div style={{
                        fontSize: "12px",
                        color: "#666",
                        lineHeight: "1.2"
                    }}>
                        Total
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {data.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div
                            style={{
                                backgroundColor: item.color || defaultColors[idx % defaultColors.length],
                                width: 12,
                                height: 12,
                            }}
                        />
                        <span style={{ fontSize: 14, color: "#333" }}>
                            {item.label} <span style={{ fontWeight: "bold" }}>({item.value})</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CloudAccountsDashboard;