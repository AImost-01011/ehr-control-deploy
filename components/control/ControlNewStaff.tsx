import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { CircularProgress, List, ListItem } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import MulInput from "../reusables/MulInput";
import { RootState } from "../../redux/store";

function ControlNewStaff() {
  //create data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstHira, setFirstHira] = useState("");
  const [lastHira, setLastHira] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string[]>([""]);

  const [isCreate, setIsCreate] = useState("none");

  const miSelector = useSelector((state: RootState) => state.oneMi);
  const dispatch = useDispatch();
  const router = useRouter();

  const inputChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    switch (e.currentTarget.id) {
      case "lastName":
        setLastName(e.target.value);
        break;

      case "firstName":
        setFirstName(e.target.value);
        break;

      case "lastHira":
        setLastHira(e.target.value);
        break;

      case "firstHira":
        setFirstHira(e.target.value);
        break;

      case "email":
        setEmail(e.target.value);
        break;

      default:
        break;
    }
  };

  const decideClick = () => {
    setIsCreate("flex");

    axios
      .post("/api/staff/create", {
        lastName: lastName,
        firstName: firstName,
        lastHira: lastHira,
        firstHira,
        oriId_m: miSelector.oriId_m,
        role: role,
        email_s: email,
      })
      .then((result) => {
        if (result.status === 200) {
          router.push("/control/staff_list");
        }
      })
      .catch((err) => console.log(err));

    // setTimeout(() => {
    //   router.push("/control/staff_list");
    // }, 5000);
  };

  return (
    <Grid item xs={9}>
      <Box paddingX="30px" paddingY="20px" height="90%">
        <Typography variant="h4" color="primary">
          スタッフアカウントを追加する
        </Typography>

        <Box width="100%" mt="20px">
          <List component={Paper}>
            <ListItem>
              <Typography variant="h5">{miSelector.miName.name}</Typography>
            </ListItem>

            <Divider />

            <ListItem>
              <Box display="flex" justifyContent="space-around" width="100%">
                <Box width="40%">
                  <TextField
                    variant="filled"
                    size="small"
                    fullWidth
                    label="スタッフの名字"
                    id="lastName"
                    onChange={inputChange}
                  />
                </Box>

                <Box width="40%">
                  <TextField
                    variant="filled"
                    size="small"
                    fullWidth
                    label="スタッフの名前"
                    id="firstName"
                    onChange={inputChange}
                  />
                </Box>
              </Box>
            </ListItem>

            <Divider />

            <ListItem>
              <Box display="flex" justifyContent="space-around" width="100%">
                <Box width="40%">
                  <TextField
                    variant="filled"
                    size="small"
                    fullWidth
                    label="すたっふのみょうじ(ひらがな)"
                    helperText="ひらがなで入力してください"
                    id="lastHira"
                    onChange={inputChange}
                  />
                </Box>

                <Box width="40%">
                  <TextField
                    variant="filled"
                    size="small"
                    fullWidth
                    label="すたっふのなまえ(ひらがな)"
                    helperText="ひらがなで入力してください"
                    id="firstHira"
                    onChange={inputChange}
                  />
                </Box>
              </Box>
            </ListItem>

            <Divider />

            <ListItem>
              <TextField
                variant="filled"
                size="small"
                fullWidth
                label="EHR Edit で登録したメールアドレス"
                helperText="EHR Edit でアカウントを作成してなければ先にそちらでアカウントをつくってください"
                id="email"
                onChange={inputChange}
              />
            </ListItem>

            <ListItem>
              <MulInput
                value={role}
                setValue={setRole}
                label="この医療機関での役割"
                variant="filled"
                hint="例）内科"
              />
            </ListItem>

            <Divider />

            <ListItem button style={{ backgroundColor: "#00afcc" }}>
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                color="#fff"
                onClick={decideClick}
              >
                スタッフを追加する
              </Box>
            </ListItem>

            <ListItem dense>
              <Box
                display={isCreate}
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                <CircularProgress />
                <Box width="10px" />
                <Typography variant="subtitle1" color="primary">
                  上記のアカウントを追加しています
                </Typography>
              </Box>
            </ListItem>
          </List>
        </Box>

        <Box width="100%" display="flex" justifyContent="center" my="10px">
          <Link href="/control/staff_list">
            <Button variant="contained">やめる</Button>
          </Link>
        </Box>
      </Box>
    </Grid>
  );
}

export default ControlNewStaff;
