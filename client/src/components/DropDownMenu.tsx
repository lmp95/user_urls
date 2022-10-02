import { Menu, MenuItem } from "@mui/material";
import React, { MouseEventHandler } from "react";

function DropDownMenu({ options, anchorEl, onSelect, onClose }: { options: any[], anchorEl: HTMLElement | null, onSelect: any, onClose: MouseEventHandler }) {

    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            {
                options.map((option, i) => (
                    <MenuItem key={i} onClick={() => onSelect(i)}>{option.value}</MenuItem>
                ))
            }
        </Menu>
    );
}

export default DropDownMenu;