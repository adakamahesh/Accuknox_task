import React from "react";
import { Widget } from "../types/widgets";
import CloudAccountsDashboard from "./widgets/CloudAccountsDashboard";
import StackedBar from "./widgets/StackedBar";
import BarGraph from "./widgets/BarGraph";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface WidgetCardProps {
  widget: Widget;
  graphType: string;
  onRemove?: (id: string) => void;
  highlighted?: boolean;
}

const WidgetCard: React.FC<WidgetCardProps> = ({
  widget,
  graphType,
  onRemove,
  highlighted,
}) => {
  const getGraphByGraphType = (chartData: any) => {
    if (graphType === "pie" && chartData.length) {
      return <CloudAccountsDashboard data={chartData} />;
    } else if (graphType === "line" && chartData.length) {
      return <StackedBar data={chartData} height={15} />;
    } else {
      return <BarGraph data={chartData} />;
    }
  };

  return (
    <Box
      position="relative"
      bgcolor="white"
      borderRadius={2}
      p={1}
      width="100%"
      height="100%"
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography fontSize="14px" fontWeight="bold">
          {widget.name}
        </Typography>

        {onRemove && (
          <IconButton
            size="small"
            onClick={() => onRemove(widget.id)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      {getGraphByGraphType(widget.chartData)}
    </Box>
  );
};

export default WidgetCard;