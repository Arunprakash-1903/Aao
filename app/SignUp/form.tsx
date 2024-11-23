'use client';

import { FormEvent } from 'react';

export default function Form() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/signup`, {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    });
    console.log({ response });
  };
  return (
<form
  onSubmit={handleSubmit}
  className="flex flex-col gap-4 p-6 mx-auto max-w-md mt-10 bg-white rounded-lg shadow-md"
>
  <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">Sign Up</h1>
  <input
    name="email"
    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500"
    type="email"
    placeholder="Email"
    required
  />
  <input
    name="password"
    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500"
    type="password"
    placeholder="Password"
    required
  />
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 focus:ring focus:ring-blue-300 transition duration-300"
  >
    Register
  </button>
</form>

  );
}