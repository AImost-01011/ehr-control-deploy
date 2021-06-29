import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ControlAppbar from "../../../../components/control/ControlAppbar";
import ControlNav from "../../../../components/control/ControlNav";
import ControlFooter from "../../../../components/control/ControlFooter";
import ControlStaff from "../../../../components/control/ControlStaff";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import { oneMiData, oneStaffDataType } from "../../../../globalType";
import { fetchMi, serversideData } from "../../../../redux/oneMiSlice";
import { cleanStaff, setStaff } from "../../../../redux/oneStaffSlice";

const detail: React.FC<{ mi: oneMiData; staff: oneStaffDataType }> = ({
  mi,
  staff,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(serversideData(mi));
    dispatch(fetchMi(mi.email));
  }, []);

  useEffect(() => {
    dispatch(setStaff(staff));
    return () => {
      dispatch(cleanStaff());
    };
  }, []);

  return (
    <>
      <Head>
        <title>{`${staff.staffName.name}の詳細`}</title>
      </Head>

      <Box height="100%" display="flex" flexDirection="column">
        <ControlAppbar />

        <Box flexGrow={1}>
          <Grid container>
            <ControlNav />
            <ControlStaff />
          </Grid>
        </Box>

        <ControlFooter />
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await getSession(context.req, context.res);

  const { oriId_s } = context.query;

  const mi = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/mi/read/${user.name}`)
    .then((result) => result.data)
    .catch((err) => console.log(err));

  const staff = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/staff/read/${oriId_s}`)
    .then((result) => result.data)
    .catch((err) => console.log(err));

  return {
    props: {
      mi: mi ?? null,
      staff: staff ?? null,
    },
  };
};

export default detail;
