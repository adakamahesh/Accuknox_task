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
                <Typography fontSize="18px" fontWeight="bold">CNAPP Dashboard</Typography>
                <Box display="flex" gap={2}>
                    <TextField
                        size="small"
                        label="Search widgets"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={() => handleOpen()}
                        variant="outlined"
                        sx={{ borderColor: "lightgray", color: "gray" }}>
                        Add Widget +
                    </Button>
                </Box>
            </Box>

            {categories.map((cat: Category) => (
                <Box key={cat.id} mb={2}>
                    <Typography fontSize="16px" fontWeight="bold" marginLeft="5px">{cat.name}</Typography>
                    <Box display="flex" gap={2}>
                        {/* Widgets scroll container */}
                        <Box
                            ref={(el: HTMLDivElement | null) => {
                                containerRefs.current[cat.id] = el ?? null;
                            }}
                            sx={{
                                width: "66%",
                                display: "flex",
                                overflowX: "auto",
                                alignItems: "center",
                                gap: 2,        // theme.spacing(2) = 16px
                                p: 1,          // theme.spacing(1) = 8px
                                whiteSpace: "nowrap",
                            }}
                        >
                            {getFilteredWidgets(cat.widgets).map((w: Widget) => (
                                <Box
                                    key={w.id}
                                    data-widget-id={w.id}
                                    flex="0 0 50%"
                                    maxWidth="49%"
                                    height={"205px"}
                                >
                                    <WidgetCard
                                        widget={w}
                                        graphType={cat.type}
                                        highlighted={highlightedId === w.id}
                                        onRemove={() => handleRemoveWidget(cat.id, w.id)}
                                    />
                                </Box>
                            ))}
                        </Box>

                        {/* Add button */}
                        <Box
                            className="bg-white rounded p-4"
                            sx={{
                                width: "33%",
                                minWidth: 200,
                                height: 205,
                                mt: 0.75, // 6px => theme.spacing(0.75)
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Button size="small"
                                onClick={() => handleOpen(cat.id)}
                                variant="outlined"
                                sx={{ borderColor: "lightgray", color: "gray" }}>
                                + Add Widget
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