import { getSession } from "@auth0/nextjs-auth0";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ControlAppbar from "../../../components/control/ControlAppbar";
import ControlFooter from "../../../components/control/ControlFooter";
import ControlNav from "../../../components/control/ControlNav";
import ControlProperty from "../../../components/control/ControlProperty";
import { oneMiData } from "../../../globalType";
import { fetchMi, serversideData } from "../../../redux/oneMiSlice";

const index: React.FC<{ mi: oneMiData }> = ({ mi }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(serversideData(mi));
    dispatch(fetchMi(mi.email));
  }, []);

  return (
    <>
      <Head>
        <title>医療機関の情報</title>
      </Head>

      <Box height="100%" display="flex" flexDirection="column">
        <ControlAppbar />

        <Box flexGrow={1}>
          <Grid container>
            <ControlNav />
            <ControlProperty />
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
