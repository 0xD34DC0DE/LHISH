import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {useAuthGet} from "../hooks/QueryHooks";
import {MenuItem, Select} from "@mui/material";
import {TemplateIdNamePairListView} from "../views/TemplateIdNamePairListView";
import {SelectValidationWrapper, SelectValidationWrapperRef} from "./SelectValidationWrapper";

export interface TemplateDropDownRef {
    reset: () => void;
    validate: () => boolean;
}

export interface TemplateDropDownProps {
    setTemplateId: (categoryId: string | null) => void;
    setError: (error: string | null) => void;
}

export const TemplateDropDown = forwardRef<TemplateDropDownRef, TemplateDropDownProps>(
    ({setError, setTemplateId}: TemplateDropDownProps, ref) => {
        const templateSelectRef = useRef<SelectValidationWrapperRef>(null);
        const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");

        const [getTemplateIdNamePairs, templateIdNamePairs, templateIdNamePairsError, templateIdNamePairsReset] =
            useAuthGet<TemplateIdNamePairListView>(
                "http://localhost:8080/template/all/ids"
            );

        useImperativeHandle(ref, () => ({
            reset: () => {
                templateIdNamePairsReset();
                getTemplateIdNamePairs();
            },
            validate: () => {
                return templateSelectRef.current?.validate() ?? false;
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

        return (
            <SelectValidationWrapper
                validator={() => selectedTemplateId === "" ? "Template is required" : null}
                label={"Template"}
                setValue={setSelectedTemplateId}
                ref={templateSelectRef}
                sx={{marginTop: 1, marginBottom: 1}}
                setError={setError}
            >
                <Select>
                    {getIdNamePairs().map(pair =>
                        <MenuItem key={pair[0]} value={pair[0]}>{pair[1]}</MenuItem>
                    )}
                </Select>
            </SelectValidationWrapper>
        );
    }
);

// <FormControl fullWidth sx={{marginTop: 1, marginBottom: 1}} error={selectedTemplateIdErrorProps.error}>
//                 <InputLabel id="template-id-select-label">Template</InputLabel>
//                 <Select
//                     labelId="template-id-select-label"
//                     id="template-id-select"
//                     value={selectedTemplateId}
//                     label="Template"
//                     defaultValue=""
//                     onChange={setSelectedTemplateId}
//                     onFocus={selectedTemplateIdErrorProps.onFocus}
//                 >
//                     {getIdNamePairs().map(pair => (
//                         <MenuItem key={pair[0]} value={pair[0]}>{pair[1]}</MenuItem>
//                     ))}
//                 </Select>
//                 {selectedTemplateIdErrorProps.error &&
//                     <FormHelperText>{selectedTemplateIdErrorProps.helperText}</FormHelperText>
//                 }
//             </FormControl>