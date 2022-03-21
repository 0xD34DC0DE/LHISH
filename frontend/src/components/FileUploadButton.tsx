import {useEffect, useState} from "react";
import {Button, FormControl, Stack, Typography} from "@mui/material";

export interface FileUploadButtonProps {
    id: string;
    accept: string;
    onFileChanged: (file: File) => void;
}

//https://javascript.plainenglish.io/how-to-add-a-file-input-button-and-display-a-preview-image-with-react-2568d9d849f5

export const FileUploadButton = ({accept, id, onFileChanged}: FileUploadButtonProps) => {
    const [selectedFile, setSelectedFile] = useState<File>();

    const getFilename = (): string => selectedFile?.name ?? "";

    useEffect(() => {
        if (selectedFile) {
            onFileChanged(selectedFile);
        }
    }, [selectedFile]);

    return (
        <Stack direction={"row"} sx={{marginTop: 1}}>
            <Button variant="contained" color="primary" component="label"
                    sx={{paddingTop: 1, paddingBottom: 1}}>
                Upload File
                <input
                    accept={accept}
                    type="file"
                    id={id}
                    hidden
                    onChange={e => {
                        if (e.target.files) {
                            setSelectedFile(e.target.files[0]);
                        }
                    }}
                />
            </Button>
            <Typography sx={{
                marginLeft: 2,
                display: "flex",
                flexGrow: "true",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column"
            }}>{getFilename()}</Typography>
        </Stack>
    );
};