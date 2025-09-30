import React from "react";
import { Box, Typography } from "@mui/material";
import { ChartDataItem } from "../../types/CloudAccountsDashboardTypes";

interface CloudAccountsDashboardProps {
    data: ChartDataItem[];
}

const CloudAccountsDashboard: React.FC<CloudAccountsDashboardProps> = ({ data }) => {
    const defaultColors = ["#4285f4", "#e8eaed", "#fbbc05", "#34a853"];
    const total = data.reduce((sum, item) => sum + item.value, 0);

    const radius = 50;
    const circumference = 2 * Math.PI * radius;

    let offset = 0;

    return (
        <Box display="flex" alignItems="center" gap="3rem" marginTop="1rem" >
            {/* Donut Chart */}
            <Box sx={{ position: "relative", width: 120, height: 120 }}>
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
                        const color = item.color || defaultColors[idx % defaultColors.length];

                        const circle = (
                            <circle
                                key={idx}
                                cx={60}
                                cy={60}
                                r={radius}
                                fill="none"
                                stroke={color}
                                strokeWidth={12}
                                strokeDasharray={`${dash} ${circumference - dash}`}
                                strokeDashoffset={circumference - offset}
                                transform="rotate(90 60 60)"
                                strokeLinecap="butt"
                            />
                        );

                        offset += dash;
                        return circle;
                    })}
                </svg>

                {/* Center Text */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" color="text.primary" lineHeight={1.2}>
                        {total}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" lineHeight={1.2}>
                        Total
                    </Typography>
                </Box>
            </Box>

            {/* Legend */}
            <Box display="flex" flexDirection="column" gap={1}>
                {data.map((item, idx) => (
                    <Box key={idx} display="flex" alignItems="center" gap={1}>
                        <Box
                            sx={{
                                bgcolor: item.color || defaultColors[idx % defaultColors.length],
                                width: 12,
                                height: 12,
                            }}
                        />
                        <Typography fontSize={14} color="text.primary">
                            {item.label}
                            <Box component="span" marginLeft="4px">
                                ({item.value})
                            </Box>
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default CloudAccountsDashboard;