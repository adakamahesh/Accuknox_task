import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import WidgetCard from "./WidgetCard";
import AddWidgetDialog from "./AddWidgetDialog";
import { removeWidget } from "../redux_store/slices/dashboardSlice";
import { Category, Widget } from "../types/widgets";

export default function Dashboard() {
  const categories = useSelector((store: RootState) => store.dashboard);
  const dispatch = useDispatch<AppDispatch>();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const containerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleOpen = (catId?: string) => {
    setCategoryId(catId);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleRemoveWidget = (categoryId: string, widgetId: string) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  const getFilteredWidgets = (widgets: Widget[]) =>
    widgets.filter((w) => w.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    if (categoryId && highlightedId) {
      const container = containerRefs.current[categoryId];
      if (!container) return;

      // wait until new widget is in the DOM
      requestAnimationFrame(() => {
        const newWidgetEl = container.querySelector(
          `[data-widget-id="${highlightedId}"]`
        ) as HTMLElement;

        if (newWidgetEl) {
          newWidgetEl.scrollIntoView({ behavior: "smooth", inline: "center" });

          const timer = setTimeout(() => setHighlightedId(null), 2000);
          return () => clearTimeout(timer);
        }
      });
    }
  }, [categories, highlightedId, categoryId]);

  return (
    <Box p={3} bgcolor="#f0f4ff">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">CNAPP Dashboard</Typography>

        <Box display="flex" gap={2}>
          <TextField
            size="small"
            label="Search widgets"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="contained" onClick={() => handleOpen()}>
            + Add Widget
          </Button>
        </Box>
      </Box>

      {categories.map((cat: Category) => (
        <Box key={cat.id} mb={4}>
          <Typography variant="h6" mb={1}>{cat.name}</Typography>

          <Box display="flex" gap={2}>
            {/* Widgets scroll container */}
            <div
              ref={(el) => {
                containerRefs.current[cat.id] = el ?? null;
              }}
              style={{
                width: "66%",
                display: "flex",
                overflowX: "auto",
                alignItems: "center",
                gap: "16px",
                padding: "8px",
                whiteSpace: "nowrap",
              }}
            >
              {getFilteredWidgets(cat.widgets).map((w: Widget) => (
                <Box
                  key={w.id}
                  data-widget-id={w.id}
                  flex="0 0 50%"
                  maxWidth="49%"
                  height={"250px"}
                >
                  <WidgetCard
                    widget={w}
                    graphType={cat.type}
                    highlighted={highlightedId === w.id}
                    onRemove={() => handleRemoveWidget(cat.id, w.id)}
                  />
                </Box>
              ))}
            </div>

            {/* Add button */}
            <Box
              className="bg-white rounded p-4"
              style={{
                width: "33%",
                minWidth: "200px",
                height: "250px",
                marginTop: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button size="small" onClick={() => handleOpen(cat.id)}>
                + Add to this category
              </Button>
            </Box>
          </Box>
        </Box>
      ))}

      <AddWidgetDialog
        open={open}
        onClose={handleClose}
        categories={categories}
        clickedCategoryId={categoryId}
        onWidgetAdded={(id: string) => setHighlightedId(id)}
      />
    </Box>
  );
}