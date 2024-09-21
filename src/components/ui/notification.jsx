import React from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

const Notification = ({ type, message, onClose }) => {
  const isSuccess = type === 'success'

  return (
    <div className={`fixed top-4 right-4 w-96 bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {isSuccess ? (
              <CheckCircle className="h-6 w-6 text-green-400" aria-hidden="true" />
            ) : (
              <XCircle className="h-6 w-6 text-red-400" aria-hidden="true" />
            )}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">
              {isSuccess ? 'Success' : 'Error'}
            </p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification