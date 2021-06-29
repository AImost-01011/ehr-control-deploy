import React from "react";
import Link from "next/link";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {
  TableContainer,
  TableBody,
  TableRow,
  Table,
  TableCell,
  TableHead,
} from "@material-ui/core";

const ControlTop: React.FC = () => {
  return (
    <Grid item xs={10}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Box width="800px">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>EHR Controlのトップページ</TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell align="right">
                    <Link href="/control/staff_list">
                      <Button variant="text" fullWidth>
                        スタッフリスト
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    医療機関で働くスタッフたちを管理します。
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right">
                    <Link href="/control/property">
                      <Button variant="text" fullWidth>
                        お知らせの管理
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    患者や外部に告知したいことを入力します。
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right">
                    <Link href="/control/property">
                      <Button variant="text" fullWidth>
                        医療機関について
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>医療機関の名前や住所情報を管理します。</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Grid>
  );
};

export default ControlTop;
