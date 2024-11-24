'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

// Zod schema for validation
const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export default function Form() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    // Validate form data using Zod
    const validation = signupSchema.safeParse(values);

    if (!validation.success) {
      const fieldErrors: { [key: string]: string } = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({}); // Clear previous errors

    try {
      const response = await fetch(`/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);

      // Redirect to the login page
      router.push('/Login');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <form
    onSubmit={handleSubmit}
    className="flex flex-col gap-4 p-6 w-full max-w-md bg-white rounded-lg shadow-md"
  >
    <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h1>

    {/* Name Input */}
    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
        Name
      </label>
      <input
        name="name"
        id="name"
        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500"
        type="text"
        placeholder="Name"
        required
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
    </div>

    {/* Email Input */}
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
        Email
      </label>
      <input
        name="email"
        id="email"
        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500"
        type="email"
        placeholder="Email"
        required
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
    </div>

    {/* Password Input */}
    <div className="mb-4">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
        Password
      </label>
      <input
        name="password"
        id="password"
        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500"
        type="password"
        placeholder="Password"
        required
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
    </div>

    {/* Confirm Password Input */}
    <div className="mb-4">
      <label
        htmlFor="confirmPassword"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Confirm Password
      </label>
      <input
        name="confirmPassword"
        id="confirmPassword"
        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500"
        type="password"
        placeholder="Confirm Password"
        required
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
      )}
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 focus:ring focus:ring-blue-300 transition duration-300"
    >
      Register
    </button>
  </form>
</div>


  );
}
