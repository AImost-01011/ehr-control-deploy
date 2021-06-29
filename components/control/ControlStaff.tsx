import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {
  TableContainer,
  TableBody,
  TableRow,
  Table,
  TableCell,
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { RootState } from "../../redux/store";
import MyTalk from "../reusables/MyTalk";
import YourTalk from "../reusables/YourTalk";
import { addBusiness } from "../../redux/oneMiSlice";

const ControlStaff: React.FC = () => {
  const [talk, setTalk] = useState<JSX.Element[]>([]);
  const [sendMessage, setSendMessage] = useState("");

  const dispatch = useDispatch();
  const staffSelector = useSelector((state: RootState) => state.oneStaff);
  const miSelector = useSelector((state: RootState) => state.oneMi);
  let workPlace = "";
  let roles = "";

  useEffect(() => {
    if (miSelector.oriId_m) {
      const talkData = miSelector.businessContact.filter(
        (el) => el.with === staffSelector.oriId_s
      );

      const formedTalk = talkData.sort((a, b) => {
        return b.update - a.update;
      });

      formedTalk.map((el, i) => {
        if (el.speaker === miSelector.oriId_m) {
          setTalk((prevProps) => [
            ...prevProps,
            <MyTalk
              content={el.content}
              update={el.update}
              isRead={el.isRead}
              key={`${i}`}
            />,
          ]);
        } else {
          setTalk((prevProps) => [
            ...prevProps,
            <YourTalk
              content={el.content}
              update={el.update}
              isRead={el.isRead}
              key={`${i}`}
            />,
          ]);
        }
      });
    }

    return () => {
      setTalk([]);
    };
  }, [miSelector.businessContact]);

  if (staffSelector.oriId_s) {
    const targetAffi = staffSelector.miAffiliation.find(
      (el) => el.oriId_m === miSelector.oriId_m
    );
    roles = targetAffi.role.join("、");
  }

  if (
    staffSelector.workSpace.mi === miSelector.oriId_m &&
    staffSelector.isLogin
  )
    workPlace = staffSelector.workSpace.space;
  else workPlace = "この医療機関にはいません";

  const messageChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    setSendMessage(e.target.value);
  };

  const sendClick = () => {
    dispatch(
      addBusiness({
        with: staffSelector.oriId_s,
        speaker: miSelector.oriId_m,
        content: sendMessage,
        oriId_m: miSelector.oriId_m,
      })
    );

    setSendMessage("");
  };

  return (
    <Grid xs={9} item>
      <Box height="100%" paddingX="30px" paddingY="20px">
        <Typography variant="h4" color="primary">
          スタッフの情報
        </Typography>

        <Box paddingX="20px" paddingY="14px">
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell width="120px" align="right">
                    名前
                  </TableCell>
                  <TableCell>{staffSelector.staffName.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right">担当</TableCell>
                  <TableCell>{roles ? roles : "なし"}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right">伝言</TableCell>
                  <TableCell>
                    <Typography variant="body1" color="initial">
                      {staffSelector.message.content
                        ? staffSelector.message.content
                        : "なし"}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      {staffSelector.message.update
                        ? format(
                            new Date(staffSelector.message.update),
                            "更新:yyyy年MM月dd日"
                          )
                        : ""}
                    </Typography>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right">場所</TableCell>
                  <TableCell>{workPlace}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box paddingX="20px" paddingY="14px">
          <Accordion>
            <AccordionSummary>
              <Typography variant="body1" color="initial">
                スタッフに連絡
              </Typography>
              {/* <Box paddingX="16px">
                <Typography variant="body1">content</Typography>
              </Box> */}
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" flexDirection="column" width="100%">
                <Box
                  display="flex"
                  flexDirection="column"
                  maxHeight="300px"
                  overflow="auto"
                  width="100%"
                  paddingX="40px"
                  marginBottom="10px"
                >
                  {talk}
                </Box>
                <FormControl margin="dense" variant="outlined">
                  <InputLabel variant="outlined">連絡</InputLabel>
                  <OutlinedInput
                    id=""
                    value={sendMessage}
                    onChange={messageChange}
                    label="連絡"
                    fullWidth
                    multiline
                    endAdornment={
                      <InputAdornment position="end">
                        <Button
                          variant="text"
                          color="primary"
                          title="この内容で送信します。"
                          onClick={sendClick}
                        >
                          送信
                        </Button>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box width="100%" display="flex" justifyContent="center">
          <Link href="/control/staff_list">
            <Button variant="contained">もどる</Button>
          </Link>
        </Box>
      </Box>
    </Grid>
  );
};

export default ControlStaff;
