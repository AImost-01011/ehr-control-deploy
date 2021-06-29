import React from "react";
import Link from "next/link";

import { Box, Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import StaffSearchbar from "./controlStaffList/StaffSearchbar";
import StaffList from "./controlStaffList/StaffList";
import Button from "@material-ui/core/Button";

const ControlStaffList: React.FC = () => {
  return (
    <Grid xs={10} item>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        paddingX="30px"
        paddingY="20px"
      >
        <Box>
          <Typography variant="h4" color="primary">
            スタッフリスト
          </Typography>
        </Box>
        <StaffSearchbar />
        <StaffList />

        <Box width="100%" display="flex" justifyContent="center" marginY="10px">
          <Link href="/control/staff_list/new_staff">
            <Button variant="outlined" color="primary">
              新しいスタッフアカウントを追加する
            </Button>
          </Link>
        </Box>
      </Box>
    </Grid>
  );
};

export default ControlStaffList;
