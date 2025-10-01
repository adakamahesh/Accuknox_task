import React from "react";
import { Box, Typography } from "@mui/material";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

interface BarGraphProps {
    data: { label: string; value: number; color: string }[];
    height?: number;
}

const BarGraph: React.FC<BarGraphProps> = ({ data, height = 30 }) => {
    if (!data || data.length === 0) {
        // No data state
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                gap={1}
            >
                <SignalCellularAltIcon sx={{ color: "#ccc", fontSize: 40 }} />
                <Typography variant="body2" color="#999">
                    No Graph Data Available
                </Typography>
            </Box>
        );
    }

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <Box width="100%">
            {/* Totals */}
            <Box display="flex" justifyContent="center" mb={1} gap={4}>
                <Typography variant="subtitle2" fontWeight="bold">
                    Total Count: {total}
                </Typography>
                <Typography variant="subtitle2" fontWeight="bold">
                    Total Test: {data.length}
                </Typography>
            </Box>

            {/* Bar Graph */}
            <Box
                display="flex"
                width="100%"
                borderRadius={10}
                overflow="hidden"
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
        </Box>
    );
};

export default BarGraph;