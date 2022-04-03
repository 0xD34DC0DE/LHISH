import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useAuthGet} from "../hooks/QueryHooks";
import {CategoryIdNamePairListView} from "../views/CategoryIdNamePairListView";

export interface CategoryDropDownRef {
    reset: () => void;
}

export interface CategoryDropDownProps {
    setCategoryId: (categoryId: string | null) => void;
    setError: (error: string | null) => void;
}

export const CategoryDropDown = forwardRef<CategoryDropDownRef, CategoryDropDownProps>(
    ({setCategoryId, setError}: CategoryDropDownProps, ref) => {
        const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

        const [getCategoryIdNamePairs, categoryIdNamePairs, categoryIdNamePairsError, categoryIdNamePairsReset] =
            useAuthGet<CategoryIdNamePairListView>(
                "http://localhost:8080/category/all/ids"
            );

        useImperativeHandle(ref, () => ({
            reset: () => {
                setSelectedCategoryId("");
                categoryIdNamePairsReset();
                getCategoryIdNamePairs();
            }
        }));

        useEffect(() => {
            getCategoryIdNamePairs()
        }, []);

        useEffect(() => {
            setError(categoryIdNamePairsError);
        }, [categoryIdNamePairsError]);

        useEffect(() => {
            if(selectedCategoryId !== "") {
                setCategoryId(selectedCategoryId);
            } else {
                setCategoryId(null);
            }
        }, [selectedCategoryId]);

        const getIds = () => {
            return categoryIdNamePairs ? categoryIdNamePairs.categoryIds : [];
        };

        const getNames = () => {
            return categoryIdNamePairs ? categoryIdNamePairs.categoryNames : [];
        };

        function getIdNamePairs() {
            const names = getNames();
            return getIds().map((k, i) =>
                [k, names[i]] // zip id and category name
            );
        }

        return <Select
            labelId="category-id-select-label"
            id="category-id-select"
            value={selectedCategoryId}
            label="Category"
            defaultValue=""
            onChange={(e: SelectChangeEvent) => setSelectedCategoryId(e.target.value)}
        >
            {getIdNamePairs().map(pair => (
                <MenuItem key={pair[0]} value={pair[0]}>{pair[1]}</MenuItem>
            ))}
        </Select>;
    })