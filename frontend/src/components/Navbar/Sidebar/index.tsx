// Imports:
import { ChevronLeft } from "@mui/icons-material";
import {
    Divider,
    Drawer,
    IconButton,
    List,
    ListSubheader,
    Tooltip,
    useMediaQuery,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import Logo from "../../../assets/icons/logo";
import useGetSidebarOptions from "../../../hooks/useGetSidebarOptions";
import SideBarItem from "./SidebarItem";
import UserProfile from "./UserProfile";

type Props = {
    /**
     * Whether the sidebar is open or not.
     */
    drawerOpen: boolean;
    /**
     * Function to close the sidebar.
     */
    setDrawerOpen: Dispatch<SetStateAction<boolean>>;
    /**
     * Width of the sidebar.
     */
    width: string;
};

const Sidebar = ({ width, setDrawerOpen, drawerOpen }: Props) => {
    const isSM = useMediaQuery("(max-width: 600px)");
    const { sidebarOptions } = useGetSidebarOptions();

    return (
        <Drawer
            /**
             * Variant basis of screen size -
             * for mobile device sidebar will slide in and
             * for desktop device sidebar will be fixed.
             */
            variant={isSM ? "temporary" : "permanent"}
            anchor="left"
            className="box-border"
            /**
             * Setting open and close state of the sidebar.
             * for mobile devices becuse it is temporary sidebar.
             */
            {...(isSM && {
                open: drawerOpen,
                onClose: () => setDrawerOpen(false),
            })}
        >
            {/**
             * List of sidebar options.
             */}
            <List
                className={`gap-1 flex flex-col ease-linear  transition-all `}
                disablePadding
                sx={{
                    width,
                }}
            >
                {/**
                 * Header for List
                 */}
                <ListSubheader className="w-full py-2 px-2 flex items-center h-[70px]">
                    <Tooltip title="Ax Studios">
                        <IconButton className={`w-16 mr-auto`} disableRipple>
                            <Logo />
                        </IconButton>
                    </Tooltip>
                    {/**
                     * Close button for closing the sidebar
                     */}
                    {drawerOpen && (
                        <Tooltip title="Close">
                            <IconButton
                                color="inherit"
                                onClick={() => setDrawerOpen(false)}
                            >
                                <ChevronLeft />
                            </IconButton>
                        </Tooltip>
                    )}
                </ListSubheader>
                {/* Divider */}
                <Divider />
                {/* User Profile */}
                <UserProfile drawerOpen={drawerOpen} />
                {/* All the options */}
                {sidebarOptions.map((menu) => (
                    <SideBarItem
                        key={menu.id}
                        drawerOpen={drawerOpen}
                        menu={menu}
                    />
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;