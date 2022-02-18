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
        <Link key={key} href="#" underline={"none"} color={"inherit"} onClick={onClick}>
            <ListItem button key={key}>
                <ListItemIcon>
                    {key % 2 === 0 ? <CategoryIcon/> : <ListAltIcon/>}
                </ListItemIcon>
                <ListItemText primary={menuName}/>
            </ListItem>
        </Link>
    );
};