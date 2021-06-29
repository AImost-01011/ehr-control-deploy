import React, { useState } from "react";
import Link from "next/link";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const NavMenu: React.FC = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);

  const openClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      overflow="auto"
      height={`${857 - 44}px`}
      borderRight={1}
      borderColor="grey.500"
    >
      <List component="nav">
        <Link href="/control/staff_list">
          <ListItem button divider={true}>
            <ListItemText primary="スタッフリスト" />
          </ListItem>
        </Link>

        <ListItem button divider={true} onClick={openClick}>
          <ListItemText primary="医療機関の情報" />
        </ListItem>
        <Collapse in={isOpen} unmountOnExit>
          <List component="div" disablePadding>
            <Link href="/control/property">
              <ListItem button divider={true} className={classes.nested}>
                <ListItemText primary="おしらせの管理" />
              </ListItem>
            </Link>

            <Link href="/control/property">
              <ListItem button divider={true} className={classes.nested}>
                <ListItemText primary="医療機関について" />
              </ListItem>
            </Link>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default NavMenu;
