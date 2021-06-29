import React, { useState } from "react";
import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Circular from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";

import checkHira from "../../utils/checkHira";

const welcome: React.FC = () => {
  //auth0
  const { user, error, isLoading } = useUser();

  //form data
  const [miName, setMiName] = useState("");
  const [miHira, setMiHira] = useState("");
  const [zip_m, setZip_m] = useState("");
  const [address1_m, setAddress1_m] = useState("");
  const [address2_m, setAddress2_m] = useState("");
  const [phone_m, setPhone_m] = useState("");
  const [fax_m, setFax_m] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  //for welcome page
  const [isCircular, setIsCircular] = useState("hidden");

  const router = useRouter();

  const inputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    switch (e.currentTarget.id) {
      case "miName":
        setMiName(e.target.value);
        break;

      case "miHira":
        setMiHira(e.target.value);
        break;

      case "zip":
        setZip_m(e.target.value);
        break;

      case "add1":
        setAddress1_m(e.target.value);
        break;

      case "add2":
        setAddress2_m(e.target.value);
        break;

      case "phone":
        setPhone_m(e.target.value);
        break;

      case "fax":
        setFax_m(e.target.value);
        break;

      case "conEmail":
        setContactEmail(e.target.value);
        break;

      default:
        break;
    }
  };

  const desideClick = () => {
    if (miName && miHira && checkHira(miHira)) {
      setIsCircular("visible");

      axios
        .post("/api/mi/create", {
          miName: miName,
          miHira: miHira,
          zip_m: zip_m,
          address1_m: address1_m,
          address2_m: address2_m,
          phone_m: phone_m,
          fax_m: fax_m,
          contactEmail: contactEmail,
          email_m: user.name,
        })
        .then((result) => {
          if (result.status === 200) {
            router.replace("/");
            setIsCircular("hidden");
          }
        })
        .catch((err) => console.log(err));
    } else {
      window.alert(
        "医療機関の名前といりょうきかんのなまえ(ひらがな)は必須です。"
      );
    }

    // setTimeout(() => {
    //   router.push("/");
    // }, 5000);
  };

  return (
    <>
      <Head>
        <title>EHRアカウントを作る</title>
      </Head>

      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Paper elevation={0} square={true}>
          <Box width="600px" paddingX="30px" paddingY="20px" overflow="auto">
            <Box marginY="10px">
              <Typography variant="h4" color="primary">
                EHR Controlへようこそ
              </Typography>
              <Typography variant="subtitle1">
                以下の入力欄を埋めて始めましょう
              </Typography>
            </Box>

            <Box marginY="4px">
              <Paper elevation={1}>
                <Box paddingX="20px" paddingY="10px">
                  <TextField
                    label="医療機関の名前"
                    helperText="正式名称で入力してください"
                    fullWidth={true}
                    onChange={inputChange}
                    id="miName"
                  />
                  <TextField
                    label="いりょうきかんのなまえ(ひらがな)"
                    helperText="正式名称をひらがなで入力してください"
                    fullWidth={true}
                    onChange={inputChange}
                    id="miHira"
                  />
                </Box>
              </Paper>
            </Box>

            <Box marginY="4px">
              <Paper elevation={1}>
                <Box paddingX="20px" paddingY="10px">
                  <TextField
                    label="郵便番号"
                    helperText="例）000-0000"
                    fullWidth={true}
                    onChange={inputChange}
                    id="zip"
                  />
                  <TextField
                    label="住所(都道府県・市区町村・番地)"
                    helperText="例）北海道　〇〇市　〇〇区　南〇〇条　東〇〇丁目　〇〇-〇"
                    fullWidth={true}
                    onChange={inputChange}
                    id="add1"
                  />
                  <TextField
                    label="住所(ビル名など)"
                    helperText="例）〇〇ビル　4階"
                    fullWidth={true}
                    onChange={inputChange}
                    id="add2"
                  />
                </Box>
              </Paper>
            </Box>

            <Box marginY="4px">
              <Paper elevation={1}>
                <Box paddingX="20px" paddingY="10px">
                  <TextField
                    label="電話番号"
                    helperText="例）0000-0000-0000"
                    fullWidth={true}
                    onChange={inputChange}
                    id="phone"
                  />
                  <TextField
                    label="FAX"
                    helperText="例）0000-0000-0000"
                    fullWidth={true}
                    onChange={inputChange}
                    id="fax"
                  />
                  <TextField
                    label="メールアドレス(患者からの問い合わせ用)"
                    helperText="例）example@demo.com *患者からの問い合わせを受けるものです。EHR Controlで登録したメールアドレスは使わないでください"
                    fullWidth={true}
                    onChange={inputChange}
                    id="conEmail"
                  />
                </Box>
              </Paper>
            </Box>

            <Box
              paddingY="10px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                color="primary"
                title="上記の内容で間違いがなければ押してください"
                onClick={desideClick}
              >
                決定
              </Button>

              <Box
                marginLeft="10px"
                width="20px"
                height="20px"
                visibility={isCircular}
              >
                <Circular color="primary" size={20} />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default welcome;
