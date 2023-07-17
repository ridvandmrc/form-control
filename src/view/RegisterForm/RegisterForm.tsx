import { FC } from "react";
import { Button, Grid, Stack, TextFieldProps, Typography } from "@mui/material";
import { Input } from "../../components";

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const InputGridItem: FC<
  {
    label: string;
    name: string;
    formHookApi: ReturnType<typeof useForm<any>>;
  } & Omit<TextFieldProps, "label" | "name">
> = ({ label, formHookApi, name, ...props }) => {
  const { register } = formHookApi;
  return (
    <>
      <Grid alignSelf="center" item xs={2} sm={2} md={2} marginTop={4}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item md={4} xs={4} sm={4} marginTop={4}>
        <Input
          formHookApi={formHookApi}
          fullWidth
          label={label}
          name={name}
          inputProps={{ ...register(name, { required: true }) }}
          {...props}
        />
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
  const formApi = useForm<IRegisterProps>({
    values: { email: "", name: "", password: "" },
    mode: "onChange",
    resolver: yupResolver<Partial<IRegisterProps>>(
      yup.object<IRegisterProps>({
        name: yup
          .string()
          .trim()
          .required("this field is required")
          .min(3, "It should be 2 chars min"),
        email: yup
          .string()
          .trim()
          .email("it should be correct e-mail format")
          .required("it should be filled"),
        password: yup.string().trim().required("this field is required"),
      })
    ),
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
        <form onSubmit={(e) => void formApi.handleSubmit(onSubmit)(e)}>
          <Grid container columns={6}>
            <InputGridItem label="Name" name="name" formHookApi={formApi} />
            <InputGridItem label="E-mail" name="email" formHookApi={formApi} />
            <InputGridItem
              label="Password"
              name="password"
              formHookApi={formApi}
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
                disabled={!formApi.formState.isValid}
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
