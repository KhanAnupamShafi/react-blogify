import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../shared/InputField';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URI}/auth/register`,
        data
      );
      console.log(response);
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error ||
        'Registration was unsuccessful - ' +
          error?.response?.status +
          ' ' +
          error?.response?.statusText;
      console.log(error);
      setError('root.serverError', {
        type: '500',
        message: errorMessage,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <InputField
        label="First Name"
        type="text"
        name="firstName"
        register={register}
        errors={errors.firstName}
        rules={{
          required: `First Name is Required`,
        }}
      />
      <InputField
        label="Last Name"
        type="text"
        name="lastName"
        register={register}
        errors={errors.lastName}
        rules={{
          required: `Last Name is Required`,
        }}
      />
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
          Create Account
        </button>
      </div>
      <p className="text-center">
        Already have account?{' '}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegistrationForm;
