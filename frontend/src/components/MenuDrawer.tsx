import React, {useState, forwardRef, useImperativeHandle, ReactElement} from "react";
import {DrawerMenuItem, IDrawerMenuItem} from "./DrawerMenuItem";
import {Box, List, Drawer} from "@mui/material";

export type DrawerRef = {
    openDrawer: () => void
}

type ChildMenuItemType = React.FunctionComponent<IDrawerMenuItem>;
type FCChildMenuItemPropType = ChildMenuItemType | ChildMenuItemType[] | null;

type DrawerProps = {
    children?: FCChildMenuItemPropType | ReactElement
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
        }
    }));

    const mapChildren = (children: React.ReactNode) => {
        if(!children)
            return [];

        if(Array.isArray(children)) {
            return React.Children.map(children, e => e); // Sets the key of the children
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