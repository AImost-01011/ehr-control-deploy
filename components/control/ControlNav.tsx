import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import NavMenu from "./ControlNav/NavMenu";
import { Divider } from "@material-ui/core";
import { RootState } from "../../redux/store";

const ControlNav: React.FC = () => {
  const miSelector = useSelector((state: RootState) => state.oneMi);

  return (
    <Grid xs={2} item>
      <Box
        height="44px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingX="16px"
        borderRight={1}
        borderColor="grey.500"
      >
        <Box minWidth="87px">
          <Link href="/api/auth/logout">
            <Button
              variant="contained"
              color="primary"
              size="small"
              disableElevation
            >
              ログアウト
            </Button>
          </Link>
        </Box>

        <Box maxWidth="70%">
          <Typography variant="body1" noWrap={true}>
            {miSelector.miName.name}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <NavMenu />
    </Grid>
  );
};

export default ControlNav;
