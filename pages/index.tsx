import Head from "next/head";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Circular from "@material-ui/core/CircularProgress";
import { oneMiType } from "../globalType";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    // setTimeout(() => {
    //   router.push("/control");
    // }, 5000);

    axios
      .get(`/api/mi/read/${user.name}`)
      .then((result: AxiosResponse<oneMiType>) => {
        if (result.data.oriId_m) router.push("/control");
        else router.push("/welcome");
      })
      .catch((err) => console.log(err));

    return (
      <>
        <Head>
          <title>アカウント情報を確認しています</title>
        </Head>

        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4" color="primary">
            アカウント情報を確認しています.....
          </Typography>
          <Box paddingY="30px">
            <Circular color="primary" size={60} />
          </Box>
        </Box>
      </>
    );
  }

  const loginClick = () => {
    router.push("/api/auth/login");
  };

  return (
    <>
      <Head>
        <title>EHR Controlのログイン</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Paper elevation={3}>
          <Box
            width="400px"
            height="250px"
            paddingX="20px"
            paddingY="30px"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="h4">EHR Control</Typography>
            <Typography variant="subtitle1">
              病院やクリニックの管理・運営
            </Typography>

            <Button variant="outlined" color="primary" onClick={loginClick}>
              ログイン ＆ 新規アカウント作成
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
