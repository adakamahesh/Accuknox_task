import React from "react";
import { Widget } from "../types/widgets";
import CloudAccountsDashboard from "./widgets/CloudAccountsDashboard";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StackedBar from "./widgets/StackedBar";
import BarGraph from "./widgets/BarGraph";

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
    <div
      className="bg-white rounded p-4 w-full h-100"
    >
      {onRemove && (
        <IconButton
          size="small"
          onClick={() => onRemove(widget.id)}
          style={{
            position: "absolute",
            top: "4px",
            right: "4px",
            color: "black",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}

      <h3 className="font-semibold mb-2" style={{ fontSize: "18px" }}>
        {widget.name}
      </h3>

      {getGraphByGraphType(widget.chartData)}
    </div>
  );
};

export default WidgetCard;