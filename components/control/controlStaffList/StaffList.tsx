import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { format } from "date-fns";

import { Box, Paper } from "@material-ui/core";
import {
  TableContainer,
  TableBody,
  TableRow,
  Table,
  TableCell,
  TableHead,
} from "@material-ui/core";
import { RootState } from "../../../redux/store";

const StaffList: React.FC = () => {
  const staffSelector = useSelector((state: RootState) => state.staff);
  const miSelector = useSelector((state: RootState) => state.oneMi);

  const staffList = staffSelector.staff.map((el, i) => {
    const targetAffi = el.miAffiliation.find(
      (ch) => ch.oriId_m === miSelector.oriId_m
    );
    const roles = targetAffi.role.join("、");

    return (
      <Link
        href="/control/staff_list/detail/:oriId_s"
        as={`/control/staff_list/detail/${el.oriId_s}`}
        key={i}
      >
        <TableRow>
          <TableCell>{el.staffName.name}</TableCell>
          <TableCell>{roles ? roles : "なし"}</TableCell>
          <TableCell>
            {el.message.content ? el.message.content : "なし"}
          </TableCell>
          <TableCell>
            {el.lastLogin
              ? format(new Date(el.lastLogin), "yyyy年MM月dd日")
              : "なし"}
          </TableCell>
        </TableRow>
      </Link>
    );
  });

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>氏名</TableCell>
              <TableCell>役割</TableCell>
              <TableCell>伝言</TableCell>
              <TableCell width="140px">最終更新</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{staffList}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StaffList;
