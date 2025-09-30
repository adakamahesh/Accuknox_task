import React from "react";
import { Box, Typography } from "@mui/material";
import { ChartDataItem } from "../../types/widgets";

interface StackedBarProps {
    data: ChartDataItem[];
    height?: number;
}

const StackedBar: React.FC<StackedBarProps> = ({ data, height = 20 }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <Box marginTop='2rem'>
            {/* Stacked Bar Chart */}
            <Box
                display="flex"
                justifyContent="space-between"
                mb={1}
                marginTop='1rem'
            >
                <Typography fontWeight="bold">
                    {total} Total
                </Typography>
            </Box>
            <Box
                display="flex"
                width="100%"
                height={height}
                borderRadius={10}
                overflow="hidden"
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
            <Box
                display="flex"
                flexWrap="wrap"
                gap={2}
                mt={2}
            >
                {data.map((item, idx) => (
                    <Box
                        key={idx}
                        display="flex"
                        alignItems="center"
                        gap={1}
                        sx={{
                            flex: "0 0 calc(50% - 8px)", // two per row; subtract half of gap for perfect fit
                        }}
                    >
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