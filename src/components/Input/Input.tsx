import { FC } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useForm } from "react-hook-form";

export const Input: FC<
  TextFieldProps & { formHookApi: ReturnType<typeof useForm<any>> }
> = ({ formHookApi, name, ...props }) => {
  const { formState } = formHookApi;

  return (
    <TextField
      error={!!formState.errors[name || ""]}
      helperText={formState.errors[name || ""] ? "This Field is required" : ""}
      variant="outlined"
      {...props}
    />
  );
};
