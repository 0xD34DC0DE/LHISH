import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {useAuthGet} from "../hooks/QueryHooks";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {TemplateIdNamePairListView} from "../views/TemplateIdNamePairListView";

export interface TemplateDropDownRef {
    reset: () => void;
}

export interface TemplateDropDownProps {
    setTemplateId: (categoryId: string | null) => void;
    setError: (error: string | null) => void;
}

export const TemplateDropDown = forwardRef<TemplateDropDownRef, TemplateDropDownProps>(
    ({setError, setTemplateId}: TemplateDropDownProps, ref) => {
        const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");

        const [getTemplateIdNamePairs, templateIdNamePairs, templateIdNamePairsError, templateIdNamePairsReset] =
            useAuthGet<TemplateIdNamePairListView>(
                "http://localhost:8080/template/all/ids"
            );

        useImperativeHandle(ref, () => ({
            reset: () => {
                setSelectedTemplateId("");
                templateIdNamePairsReset();
                getTemplateIdNamePairs();
            }
        }));

        useEffect(() => {
            getTemplateIdNamePairs()
        }, []);

        useEffect(() => {
            setError(templateIdNamePairsError);
        }, [templateIdNamePairsError]);

        useEffect(() => {
            if (selectedTemplateId !== "") {
                setTemplateId(selectedTemplateId);
            } else {
                setTemplateId(null);
            }
        }, [selectedTemplateId]);

        const getIds = () => {
            return templateIdNamePairs ? templateIdNamePairs.templateIds : [];
        };

        const getNames = () => {
            return templateIdNamePairs ? templateIdNamePairs.templateNames : [];
        };

        function getIdNamePairs() {
            const names = getNames();
            return getIds().map((k, i) =>
                [k, names[i]] // zip id and category name
            );
        }

        return <Select
            labelId="template-id-select-label"
            id="template-id-select"
            value={selectedTemplateId}
            label="Template"
            defaultValue=""
            onChange={(e: SelectChangeEvent) => setSelectedTemplateId(e.target.value)}
        >
            {getIdNamePairs().map(pair => (
                <MenuItem key={pair[0]} value={pair[0]}>{pair[1]}</MenuItem>
            ))}
        </Select>;
    })