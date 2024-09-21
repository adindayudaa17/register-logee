import React from 'react'
import { CheckCircle } from 'lucide-react'
import { Button } from "../components/ui/button"

export default function AfterRegisterSuccess() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-[#E8590C]" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Registration Successful!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for registering with Logee. Our admin team will review your data.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    We will notify you once the review process is complete. Please check your email regularly.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Button
            type="button"
            className="w-full bg-[#E8590C] hover:bg-[#d14e0b] text-white"
            onClick={() => window.location.href = '/'}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  )
}