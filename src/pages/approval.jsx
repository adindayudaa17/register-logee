import React, { useEffect, useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { CheckCircle, XCircle } from 'lucide-react'
import useNotification from '../hooks/useNotification'
import Notification from '../components/ui/notification'
import { useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import Spinner from '../components/ui/spinner'

export default function AdminApprovalPage() {
    const { token } = useParams();
    const [userData, setUserData] = useState(null);
    const [showRejectReason, setShowRejectReason] = useState(false)
    const [rejectReason, setRejectReason] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)
    const { notification, showNotification, hideNotification } = useNotification()

    const handleApprove = async () => {
        setShowRejectReason(false)
        setSubmitting(true)
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/approve/${token}`, {
                action: 'approve',
            });
            showNotification('success', response.data.message)
        } catch (error) {
            showNotification('error', error.response ? error.response.data.message : 'Error please try again');
        }
        setSubmitting(false)
    }

    const handleReject = async () => {
        setSubmitting(true)
        try {
            if (rejectReason.trim() === '') {
                showNotification('error', 'Please provide a reason for rejection');
                return;
            }

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/approve/${token}`, {
                action: 'reject',
                rejectReason: rejectReason
            });

            showNotification('success', response.data.message);
        } catch (error) {
            showNotification('error', error.response ? error.response.data.message : 'Error please try again');
        }
        setSubmitting(false)
    }

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Decode the JWT token
                setUserData(decodedToken); // Set the user data from the token
            } catch (error) {
                console.error('Invalid token:', error);
                showNotification('error', 'Invalid token');
            }
        }
    }, [token]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">Admin Approval</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Review and approve or reject the user registration
                    </p>
                </div>

                <div className="border-t border-b border-gray-200 py-4">
                    <h3 className="text-lg font-medium text-gray-900">User Details</h3>
                    <p className="mt-1 text-sm text-gray-600">Name: {userData ? userData.name : ''}</p>
                    <p className="mt-1 text-sm text-gray-600">Email: {userData ? userData.email : ''}</p>
                    <p className="mt-1 text-sm text-gray-600">Business: {userData ? userData.businessName : ''}</p>
                </div>

                <div className="flex justify-center space-x-4">
                    <Button
                        type="button"
                        onClick={handleApprove}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        {isSubmitting ? <Spinner /> : <CheckCircle className="mr-2 h-5 w-5" />}
                        {!isSubmitting && 'Approve'}
                    </Button>
                    <Button
                        type="button"
                        onClick={() => setShowRejectReason(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        <XCircle className="mr-2 h-5 w-5" />
                        Reject
                    </Button>
                </div>

                {showRejectReason && (
                    <div className="mt-4">
                        <Label htmlFor="rejectReason" className="block text-sm font-medium text-gray-700">
                            Reason for Rejection
                        </Label>
                        <Input
                            type="text"
                            name="rejectReason"
                            id="rejectReason"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#E8590C] focus:border-[#E8590C] sm:text-sm"
                            placeholder="Enter reason for rejection"
                        />
                        <div className="mt-4 flex justify-end">
                            <Button
                                type="button"
                                onClick={handleReject}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#E8590C] hover:bg-[#d14e0b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E8590C]"
                            >
                                {isSubmitting ? <Spinner /> : 'Submit Rejection'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={hideNotification}
                />
            )}
        </div>
    )
}