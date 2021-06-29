import React, { useEffect } from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ControlAppbar from "../../../components/control/ControlAppbar";
import ControlFooter from "../../../components/control/ControlFooter";
import ControlNav from "../../../components/control/ControlNav";
import ControlNewStaff from "../../../components/control/ControlNewStaff";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import { oneMiData } from "../../../globalType";
import { useDispatch } from "react-redux";
import { fetchMi, serversideData } from "../../../redux/oneMiSlice";

const NewStaff: React.FC<{ mi: oneMiData }> = ({ mi }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(serversideData(mi));
    dispatch(fetchMi(mi.email));
  }, []);

  return (
    <>
      <Head>
        <title>スタッフを追加する</title>
      </Head>

      <Box height="100%" display="flex" flexDirection="column">
        <ControlAppbar />

        <Box flexGrow={1}>
          <Grid container>
            <ControlNav />
            <ControlNewStaff />
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

export default NewStaff;
