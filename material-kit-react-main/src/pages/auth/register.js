import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      
      nombres: '',
      corrreo: '',
      passwor: '',
      submit: null
    },
    validationSchema: Yup.object({
      
      nombres: Yup
        .string()
        .max(255)
        .required('nombres is required'),
        corrreo: Yup
        .string()
      .email('Must be a valid corrreo')
        .max(255)
        .required('corrreo is required'),
      passwor: Yup
        .string()
        .max(255)
        .required('passwor is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
       const data = JSON.stringify(values);
       const carga = await fetch  ('http://localhost:5000/apip/',{
        method:'POST',
         body: data,
         headers: {
          'Content-Type':'application/json',
         }
       })
       console.log('exito')

      } catch (err) {
        console.log('error al crear')
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Head>
        <title>
          Register | Devias Kit
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Register
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Already have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.nombres && formik.errors.nombres)}
                  fullWidth
                  helperText={formik.touched.nombres && formik.errors.nombres}
                  label="nombres"
                  name="nombres"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.nombres}
                />
                <TextField
                  error={!!(formik.touched.corrreo && formik.errors.corrreo)}
                  fullWidth
                  helperText={formik.touched.corrreo && formik.errors.corrreo}
                  label="corrreo Address"
                  name="corrreo"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="corrreo"
                  value={formik.values.corrreo}
                />
                <TextField
                  error={!!(formik.touched.passwor && formik.errors.passwor)}
                  fullWidth
                  helperText={formik.touched.passwor && formik.errors.passwor}
                  label="passwor"
                  name="passwor"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.passwor}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
