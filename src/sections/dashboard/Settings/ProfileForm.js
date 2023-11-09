import React, { useCallback, useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../../components/hook-form/FormProvider";
import { RHFTextField, RHFUploadAvatar } from "../../../components/hook-form";
import { Button, Stack } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserProfile, showSnackbar } from "../../../redux/slices/app";
// import { AWS_S3_REGION, S3_BUCKET_NAME } from "../../../config";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { user } = useSelector((state) => state.app);
  const { isLoading } = useSelector((state) => state.auth);

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    bio: Yup.string().required("Bio is required"),
    avatar: Yup.string().required("Avatar is required").nullable(true),
  });

  const defaultValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    bio: user?.bio,
    // avatar: `https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${user?.avatar}`,
    avatar: user?.avatar,
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      //   Send API request
      console.log("DATA", data);
      dispatch(
        UpdateUserProfile({
          firstName: data?.firstName,
          lastName: data?.lastName,
          bio: data?.bio,
          avatar: file,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const maxSize = 3145728;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles);
      if (acceptedFiles.length >= 0) {
        const file = acceptedFiles[0];
        setFile(file);

        console.log (typeof file);

        if (file instanceof Blob || file instanceof File) {
          if (file.size <= maxSize) {
            // Check if the file size is within the limit
            const newFile = Object.assign(file, {
              preview: URL.createObjectURL(file),
            });

            if (file) {
              setValue("avatar", newFile, { shouldValidate: true });
            }
          } else {
            // File size exceeds the maxSize, show an alert to the user
            dispatch(
              showSnackbar({
                severity: "error",
                message: `File size exceeds the maximum allowed size (${maxSize} bytes). Please choose a smaller file.`,
              })
            );
          }
        } else {
          // Handle the case where the selected file is not a valid Blob or File
          dispatch(
            showSnackbar({
              severity: "error",
              message: `Please Choose another file! This file is not accepted!`,
            })
          );
        }
      }
    },
    [setValue, dispatch, maxSize]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <RHFUploadAvatar name="avatar" maxSize={maxSize} onDrop={handleDrop} />

        <RHFTextField
          helperText={"This name is visible to your contacts"}
          name="firstName"
          label="First Name"
        />
        <RHFTextField
          helperText={"This name is visible to your contacts"}
          name="lastName"
          label="Last Name"
        />
        <RHFTextField multiline rows={4} name="bio" label="Bio" />

        <Stack direction={"row"} justifyContent="end">
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            // loading={isLoading}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
