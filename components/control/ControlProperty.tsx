import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NoticeInput from "./controlProperty/NoticeInput";
import Paper from "@material-ui/core/Paper";
import NoticeList from "./controlProperty/NoticeList";
import { CircularProgress, TextField } from "@material-ui/core";
import { RootState } from "../../redux/store";
import { changeMiInfo } from "../../redux/oneMiSlice";
import MulInput from "../reusables/MulInput";

const ControlProperty: React.FC = () => {
  //data
  const [miName, setMiName] = useState("");
  const [miHira, setMiHira] = useState("");
  const [zip_m, setZip_m] = useState("");
  const [address1_m, setAddress1_m] = useState("");
  const [address2_m, setAddress2_m] = useState("");
  const [phone_m, setPhone_m] = useState("");
  const [fax_m, setFax_m] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [department, setDepartment] = useState<string[]>([""]);

  //controler
  const [sendButton, setSendButton] = useState(
    <Typography variant="body2" color="initial">
      変更
    </Typography>
  );

  const miSelector = useSelector((state: RootState) => state.oneMi);
  const dispatch = useDispatch();

  useEffect(() => {
    if (miSelector.oriId_m) {
      setMiName(miSelector.miName.name);
      setMiHira(miSelector.miName.hira);
      setZip_m(miSelector.location.zip_m);
      setAddress1_m(miSelector.location.address1_m);
      setAddress2_m(miSelector.location.address2_m);
      setPhone_m(miSelector.contact.phone_m);
      setFax_m(miSelector.contact.fax_m);
      setContactEmail(miSelector.contact.contactEmail);
      setDepartment(
        miSelector.department.length ? miSelector.department : [""]
      );
    }
  }, [miSelector.oriId_m]);

  useEffect(() => {
    if (
      !miSelector.loading &&
      sendButton !==
      (
        <Typography variant="body2" color="initial">
          変更
        </Typography>
      )
    ) {
      setSendButton(
        <Typography variant="body2" color="initial">
          変更
        </Typography>
      );
    }
  }, [miSelector.loading]);

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

      case "contactEmail":
        setContactEmail(e.target.value);
        break;

      default:
        break;
    }
  };

  const changeClick = () => {
    setSendButton(
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        width="140px"
      >
        <CircularProgress color="inherit" size={20} />
        <Typography variant="body2" color="initial">
          変更しています...
        </Typography>
      </Box>
    );

    dispatch(
      changeMiInfo({
        miName: miName,
        miHira: miHira,
        zip_m: zip_m,
        address1_m: address1_m,
        address2_m: address2_m,
        phone_m: phone_m,
        fax_m: fax_m,
        contactEmail: contactEmail,
        oriId_m: miSelector.oriId_m,
        department: department,
      })
    );
  };

  return (
    <Grid xs={10} item>
      <Box
        width="100%"
        height="100%"
        px="30px"
        py="20px"
        style={{ maxHeight: "857px", overflowY: "scroll" }}
      >
        <Typography variant="h4" color="primary">
          医療機関の情報
        </Typography>

        <Box component={Paper} py="8px" px="12px" my="10px">
          <Typography variant="h5">おしらせの管理</Typography>

          <NoticeInput />
          <NoticeList />
        </Box>

        <Box component={Paper} py="8px" px="12px" my="10px">
          <Typography variant="h5">医療機関について</Typography>

          <Box width="100%" py="8px">
            <TextField
              label="医療機関の名前"
              helperText="正式名称で入力してください"
              fullWidth
              size="small"
              id="miName"
              value={miName}
              onChange={inputChange}
            />
            <TextField
              label="いりょうきかんのなまえ(ひらがな)"
              helperText="正式名称をひらがなで入力してください"
              fullWidth
              size="small"
              id="miHira"
              value={miHira}
              onChange={inputChange}
            />
          </Box>

          <Box width="100%" py="8px">
            <TextField
              label="郵便番号"
              helperText="例）000-0000"
              fullWidth
              size="small"
              id="zip"
              value={zip_m}
              onChange={inputChange}
            />
            <TextField
              label="住所(都道府県・市区町村・番地)"
              helperText="例）北海道　〇〇市　〇〇区　南〇〇条　東〇〇丁目　〇〇-〇"
              fullWidth
              size="small"
              id="add1"
              value={address1_m}
              onChange={inputChange}
            />
            <TextField
              label="住所(ビル名など)"
              helperText="例）〇〇ビル　4階"
              fullWidth
              size="small"
              id="add2"
              value={address2_m}
              onChange={inputChange}
            />
          </Box>

          <Box width="100%" py="8px">
            <TextField
              label="電話番号"
              helperText="例）0000-0000-0000"
              fullWidth
              size="small"
              id="phone"
              value={phone_m}
              onChange={inputChange}
            />
            <TextField
              label="FAX"
              helperText="例）0000-0000-0000"
              fullWidth
              size="small"
              id="fax"
              value={fax_m}
              onChange={inputChange}
            />
            <TextField
              label="メールアドレス(患者からの問い合わせ用)"
              helperText="例）example@demo.com *患者からの問い合わせを受けるものです。EHR Controlで登録したメールアドレスは使わないでください"
              fullWidth
              size="small"
              id="contactEmail"
              value={contactEmail}
              onChange={inputChange}
            />
          </Box>

          <Box>
            <MulInput
              label="診療科目"
              setValue={setDepartment}
              value={department}
              variant="filled"
              hint="例）内科"
            />
          </Box>

          <Box width="100%" display="flex" justifyContent="center" py="8px">
            <Button variant="contained" color="primary" onClick={changeClick}>
              {sendButton}
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default ControlProperty;
