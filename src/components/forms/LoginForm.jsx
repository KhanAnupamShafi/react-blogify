import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import InputField from '../shared/InputField';

const LoginForm = () => {
  const { state: locationState } = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URI}/auth/login`,
        data
      );
      if (response.status === 200) {
        const { user, token } = response.data;
        if (token) {
          const accessToken = token.accessToken;
          const refreshToken = token.refreshToken;
          setAuth({ user, accessToken, refreshToken });

          if (locationState) {
            // redirect user back to where they were
            const { redirectTo } = locationState;
            navigate(`${redirectTo.pathname}${redirectTo.search}`);
          } else {
            navigate('/');
          }
        }
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error || 'Incorrect email or password';
      console.log(error);
      setError('root.serverError', {
        type: '500',
        message: errorMessage,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Email"
        type="email"
        name="email"
        register={register}
        errors={errors.email}
        rules={{
          required: `Email is Required`,
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Invalid email address',
          },
        }}
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        register={register}
        errors={errors.password}
        rules={{
          required: `Password is Required`,
          minLength: {
            value: 6,
            message: 'Your password must be at least 6 characters',
          },
        }}
      />

      <div className="mb-6">
        {errors?.root?.serverError && (
          <p role="alert" className="my-2 text-sm text-red-600">
            {errors.root.serverError.message}
          </p>
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200">
          Login
        </button>
      </div>
      <p className="text-center">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
