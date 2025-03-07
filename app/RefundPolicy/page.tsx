import React from 'react'

const Refund = () => {
  return (
<div className="bg-gray-100 flex justify-center items-center min-h-screen p-4">
    <div className="bg-white max-w-lg w-full p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800">Return Policy</h1>
        <p className="text-sm text-gray-600 mt-2">Last updated: March 05, 2025</p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">Refunds</h2>
        <p className="text-gray-600 mt-2">All sales are final and no refund will be issued.</p>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">Questions</h2>
        <p className="text-gray-600 mt-2">If you have any questions concerning our return policy, please contact us at:</p>
        <p className="mt-2">
            <a href="mailto:admin@architecture-academics.online" className="text-blue-600 font-medium hover:underline">
                admin@architecture-academics.online
            </a>
        </p>
    </div>
</div>
  )
}

export default Refund