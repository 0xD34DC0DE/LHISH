import React, {useState, forwardRef, useImperativeHandle, ReactElement} from "react";
import {DrawerMenuItem} from "./DrawerMenuItem";
import {Box, List, Drawer} from "@mui/material";

export type DrawerRef = {
    openDrawer: () => void,
    closeDrawer: () => void
}

type DrawerProps = {
    children?: React.ReactNode | React.ReactNode[] | null
}

export const MenuDrawer = forwardRef<DrawerRef, DrawerProps>(({children}, ref) => {
    const [opened, setOpened] = useState(false);

    const onToggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setOpened(!opened);
    };

    useImperativeHandle(ref, () => ({
        openDrawer: () => {
            setOpened(true);
        },
        closeDrawer: () => {
            setOpened(false);
        }
    }));

    const mapChildren = (children: React.ReactNode) => {
        if(!children)
            return [];

        // Sets the key of the children
        if(Array.isArray(children)) {
            return React.Children.map(children, e => e);
        } else {
            return React.Children.map([children], e => e);
        }
    }

    return (
        <Drawer
            anchor="left"
            open={opened}
            onClose={() => setOpened(false)}
        >
            <Box role="presentation">
                <List>
                    {mapChildren(children)}
                </List>
            </Box>
        </Drawer>
    );
});