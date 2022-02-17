import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt';

export interface IDrawerMenuItem {
}

export interface DrawerMenuItemPropTypes {
    key?: number,
    menuName: string,
}

export const DrawerMenuItem: IDrawerMenuItem = ({key = 0, menuName}: DrawerMenuItemPropTypes) => {
    return (
        <ListItem button key={key}>
            <ListItemIcon>
                {key % 2 === 0 ? <CategoryIcon/> : <ListAltIcon/>}
            </ListItemIcon>
            <ListItemText primary={menuName}/>
        </ListItem>
    );
};