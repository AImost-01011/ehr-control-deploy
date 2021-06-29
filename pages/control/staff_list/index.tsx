import React from "react";
import axios from "axios";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ControlAppbar from "../../../components/control/ControlAppbar";
import ControlFooter from "../../../components/control/ControlFooter";
import ControlNav from "../../../components/control/ControlNav";
import ControlStaffList from "../../../components/control/ControlStaffList";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "@auth0/nextjs-auth0";
import { oneMiData } from "../../../globalType";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMi, serversideData } from "../../../redux/oneMiSlice";
import { fetchStaff } from "../../../redux/staffSlice";

const index: React.FC<{ mi: oneMiData }> = ({ mi }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(serversideData(mi));
    dispatch(fetchMi(mi.email));
    dispatch(fetchStaff(mi.oriId_m));
  }, []);

  return (
    <>
      <Head>
        <title>スタッフリスト</title>
      </Head>

      <Box height="100%" display="flex" flexDirection="column">
        <ControlAppbar />

        <Box flexGrow={1}>
          <Grid container>
            <ControlNav />
            <ControlStaffList />
          </Grid>
        </Box>

        <ControlFooter />
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await getSession(context.req, context.res);

  const mi = await axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/mi/read/${user.name}`)
    .then((result) => result.data)
    .catch((err) => console.log(err));

  return {
    props: {
      mi: mi ?? null,
    },
  };
};

export default index;
