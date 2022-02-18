import {Link, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt';

export interface DrawerMenuItemPropTypes {
    key?: number,
    menuName: string,
    onClick: () => void
}

export const DrawerMenuItem = ({key = 0, menuName, onClick}: DrawerMenuItemPropTypes) => {
    return (
            <ListItem button key={key} onClick={onClick} divider>
                <ListItemIcon>
                    {key % 2 === 0 ? <CategoryIcon/> : <ListAltIcon/>}
                </ListItemIcon>
                <ListItemText sx={{marginRight: 2}} primary={menuName}/>
            </ListItem>
    );
};