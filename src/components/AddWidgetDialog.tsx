import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AppDispatch, addWidget } from "../store";
import { ChartDataItem } from "../types/AddWidgetDialogTypes";

interface AddWidgetDialogProps {
    open: boolean;
    onClose: () => void;
    categories: any[];
    clickedCategoryId?: string; 
    onWidgetAdded?: (id: string) => void;
}

export default function AddWidgetDialog({
    open,
    onClose,
    categories,
    clickedCategoryId,
    onWidgetAdded
}: AddWidgetDialogProps) {
    const dispatch = useDispatch<AppDispatch>();

    const [name, setName] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const [chartData, setChartData] = useState<ChartDataItem[]>([]);

    // Initialize selected category based on clickedCategoryId
    useEffect(() => {
        if (clickedCategoryId) {
            setSelectedCategoryId(clickedCategoryId);
        } else if (categories.length > 0) {
            setSelectedCategoryId(categories[0].id);
        }
    }, [clickedCategoryId, categories]);

    // Initialize chartData with one empty item
    useEffect(() => {
        if (chartData.length === 0) addChartItem();
    }, []);

    const handleAdd = () => {
        if (!name || !selectedCategoryId) return;

        const newWidgetId = Date.now().toString();
        const widget = { id: newWidgetId, name, chartData };

        // Add widget to Redux store
        dispatch(addWidget({ categoryId: selectedCategoryId, widget }));

        // Notify parent component for scroll/highlight
        if (onWidgetAdded) onWidgetAdded(newWidgetId);

        // Reset form
        setName("");
        setChartData([]);
        onClose();
    };

    const handleChartChange = (
        index: number,
        field: keyof ChartDataItem,
        value: string
    ) => {
        setChartData((prev) =>
            prev.map((item, i) =>
                i === index
                    ? {
                          ...item,
                          [field]: field === "value" ? Number(value) : value,
                      }
                    : item
            )
        );
    };

    const addChartItem = () => {
        setChartData([...chartData, { label: "", value: 0, color: "#000000" }]);
    };

    const removeChartItem = (index: number) => {
        setChartData(chartData.filter((_, i) => i !== index));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add Widget</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    <TextField
                        label="Widget name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <FormControl fullWidth>
                        <InputLabel id="cat-label">Category</InputLabel>
                        <Select
                            labelId="cat-label"
                            value={selectedCategoryId}
                            label="Category"
                            disabled={!!clickedCategoryId}
                            onChange={(e) =>
                                setSelectedCategoryId(String(e.target.value))
                            }
                        >
                            {categories.map((c) => (
                                <MenuItem key={c.id} value={c.id}>
                                    {c.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Inline chart form */}
                    <Box display="flex" flexDirection="column" gap={2}>
                        {chartData.map((item, idx) => (
                            <Box key={idx} display="flex" gap={1} alignItems="center">
                                <TextField
                                    label="Label"
                                    value={item.label}
                                    onChange={(e) =>
                                        handleChartChange(idx, "label", e.target.value)
                                    }
                                    required
                                />
                                <TextField
                                    label="Value"
                                    type="number"
                                    value={item.value}
                                    onChange={(e) =>
                                        handleChartChange(idx, "value", e.target.value)
                                    }
                                    required
                                />
                                <TextField
                                    label="Color"
                                    type="color"
                                    value={item.color}
                                    onChange={(e) =>
                                        handleChartChange(idx, "color", e.target.value)
                                    }
                                />
                                <IconButton onClick={() => removeChartItem(idx)}>
                                    <Delete />
                                </IconButton>
                            </Box>
                        ))}
                        <Button variant="contained" onClick={addChartItem}>
                            Add Chart Item
                        </Button>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleAdd}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}