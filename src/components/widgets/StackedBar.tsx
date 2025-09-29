import React from "react";
import { Box , Typography } from "@mui/material";

export interface ChartDataItem {
    label: string;
    value: number;
    color: string;
}

interface StackedBarProps {
    data: ChartDataItem[];
    height?: number;
}

const StackedBar: React.FC<StackedBarProps> = ({ data, height = 20 }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <Box>
            {/* Stacked Bar Chart */}
                {/* Totals */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    mb={1} // margin bottom for spacing
                    marginTop='1rem'
                >
                    <Typography  fontWeight="bold">
                         {total} Total 
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    width="100%"
                    height={height}
                    borderRadius={10}
                    overflow="hidden"
                    marginTop='2rem'
                    flex={1}
                >
                    {data.map((item, index) => (
                        <Box
                            key={item.label || index}
                            sx={{
                                width: `${(item.value / total) * 100}%`,
                                backgroundColor: item.color,
                            }}
                        />
                    ))}
                </Box>

                {/* Legend */}
                <Box display="flex" flexWrap="wrap" gap={2} justifyContent="space-between" marginTop='2rem'>
                    {data.map((item, idx) => (
                        <Box key={idx} display="flex" alignItems="center" gap={1}>
                            <Box
                                width={12}
                                height={12}
                                sx={{
                                    backgroundColor: item.color,
                                }}
                            />
                            <Box fontSize={14} color="#333">
                                {item.label} <Box component="span" fontWeight="bold">({item.value})</Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            );
};

export default StackedBar;