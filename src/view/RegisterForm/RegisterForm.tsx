import { FC } from "react";
import { Button, Grid, Stack, TextFieldProps, Typography } from "@mui/material";
import { Input } from "../../components";

import { SubmitHandler, useForm } from "react-hook-form";

export const InputGridItem: FC<
  { label: string } & Omit<TextFieldProps, "label">
> = ({ label, ...props }) => {
  return (
    <>
      <Grid alignSelf="center" item xs={2} sm={2} md={2} marginTop={4}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item md={4} xs={4} sm={4} marginTop={4}>
        <Input fullWidth label={label} {...props} />
      </Grid>
    </>
  );
};

interface IRegisterProps {
  name: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const { register, handleSubmit } = useForm<IRegisterProps>({
    values: { email: "", name: "", password: "" },
  });

  const onSubmit: SubmitHandler<IRegisterProps> = (data) => {
    console.log(data);
  };

  return (
    <Stack
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        paddingTop: "5rem",
        background: "rgba(0,0,0,0.5)",
      }}
    >
      <Stack
        sx={{
          minWidth: "10rem",
          background: "rgba(255,255,255,0.7)",
          padding: "1rem 2rem",
          borderRadius: "0.5rem",
          maxWidth: "30rem",
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        }}
      >
        <Typography color="#38508f" variant="h4" alignSelf="center">
          Register Form
        </Typography>
        <form
          onSubmit={(e) => {
            console.log(e);
            e.preventDefault();
            void handleSubmit(onSubmit)(e);
          }}
        >
          <Grid container columns={6}>
            <InputGridItem
              label="Name"
              {...register("name", { required: true })}
            />
            <InputGridItem
              label="E-mail"
              {...register("email", { required: true })}
            />
            <InputGridItem
              label="Password"
              {...register("password", { required: true })}
            />
            <Grid
              item
              md={3}
              sm={3}
              xs={3}
              marginTop={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button color="error" variant="outlined">
                Reset
              </Button>
            </Grid>

            <Grid
              item
              md={3}
              sm={3}
              xs={3}
              marginTop={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type="submit"
                disableElevation
                color="success"
                variant="contained"
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </Stack>
  );
};
