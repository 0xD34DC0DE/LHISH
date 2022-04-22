import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useAuthGet} from "../hooks/QueryHooks";
import {CategoryIdNamePairListView} from "../views/CategoryIdNamePairListView";
import {SelectValidationWrapper, SelectValidationWrapperRef} from "./SelectValidationWrapper";

export interface CategoryDropDownRef {
    reset: () => void;
    validate: () => boolean;
}

export interface CategoryDropDownProps {
    setCategoryId: (categoryId: string | null) => void;
    setError: (error: string | null) => void;
}

export const CategoryDropDown = forwardRef<CategoryDropDownRef, CategoryDropDownProps>(
    ({setCategoryId, setError}: CategoryDropDownProps, ref) => {
        const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
        const categorySelectRef = useRef<SelectValidationWrapperRef>(null);

        const [getCategoryIdNamePairs, categoryIdNamePairs, categoryIdNamePairsError, categoryIdNamePairsReset] =
            useAuthGet<CategoryIdNamePairListView>(
                "http://localhost:8080/category/all/ids"
            );

        useImperativeHandle(ref, () => ({
            reset: () => {
                setSelectedCategoryId("");
                categoryIdNamePairsReset();
                getCategoryIdNamePairs();
            },
            validate: () => {
                if(!categorySelectRef.current?.validate()){
                    setError("Category is required");
                    return false;
                }
                return true;
            }
        }));

        useEffect(() => {
            getCategoryIdNamePairs()
        }, []);

        useEffect(() => {
            setError(categoryIdNamePairsError);
        }, [categoryIdNamePairsError]);

        useEffect(() => {
            if (selectedCategoryId !== "") {
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

        const getIdNamePairs = () => {
            const names = getNames();
            return getIds().map((k, i) =>
                [k, names[i]] // zip id and category name
            );
        };

        return <SelectValidationWrapper
            validator={() => selectedCategoryId === "" ? "Category is required" : null}
            setValue={setSelectedCategoryId}
            label={"Category"}
            ref={categorySelectRef}
            sx={{marginTop: 1, marginBottom: 1}}
            setError={setError}
        >
            <Select
                defaultValue=""
            >
                {getIdNamePairs().map(pair => (
                    <MenuItem key={pair[0]} value={pair[0]}>{pair[1]}</MenuItem>
                ))}
            </Select>
        </SelectValidationWrapper>
    })