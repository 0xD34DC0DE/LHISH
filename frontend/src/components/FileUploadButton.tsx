import {useEffect, useState} from "react";
import {Button, FormControl, Stack, Typography} from "@mui/material";

export interface FileUploadButtonProps {

}

//https://javascript.plainenglish.io/how-to-add-a-file-input-button-and-display-a-preview-image-with-react-2568d9d849f5

export const FileUploadButton = ({}: FileUploadButtonProps) => {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [imageUrl, setImageUrl] = useState(null);

    const getFilename = (): string => selectedFile?.name ?? "";


    useEffect(() => {
        if (selectedFile) {
            //setImageUrl(URL.createObjectURL(selectedFile));
        }
    }, [selectedFile]);

    return (
        <Stack direction={"row"} sx={{marginTop: 1}}>
            <Button variant="contained" color="primary" component="label"
                    sx={{paddingTop: 1, paddingBottom: 1}}>
                Upload File
                <input
                    accept="image/*"
                    type="file"
                    id="select-image"
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