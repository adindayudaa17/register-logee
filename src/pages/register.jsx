import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import Notification from '../components/ui/notification'
import useNotification from '../hooks/useNotification'
import { TruckIcon, UserIcon, BuildingIcon, FileIcon } from 'lucide-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/ui/spinner'

export default function RegisterPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        businessName: '',
        businessType: '',
        businessAddress: '',
        suratIzinUsaha: null,
        npwp: null,
        ktp: null,
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setSubmitting] = useState(false)
    const { notification, showNotification, hideNotification } = useNotification()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target
        setFormData(prevState => ({ ...prevState, [name]: files[0] }))
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
    }

    const validateStep = (stepFields) => {
        const newErrors = {}
        stepFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'This field is required'
            }
        })
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNext = () => {
        const stepFields = {
            1: ['name', 'email', 'password', 'phoneNumber'],
            2: ['businessName', 'businessType', 'businessAddress'],
            3: ['suratIzinUsaha', 'npwp', 'ktp']
        }
        if (validateStep(stepFields[step])) {
            setStep(step + 1)
        }
    }

    const handlePrevious = () => {
        setStep(step - 1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        if (validateStep(['suratIzinUsaha', 'npwp', 'ktp'])) {
            // Create a FormData object to handle file uploads
            const formDataToSend = new FormData();

            // Assuming formData contains all form fields including files
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('businessName', formData.businessName);
            formDataToSend.append('businessType', formData.businessType);
            formDataToSend.append('businessAddress', formData.businessAddress);

            // Append files
            formDataToSend.append('suratIzinUsaha', formData.suratIzinUsaha);
            formDataToSend.append('npwp', formData.npwp);
            formDataToSend.append('ktp', formData.ktp);

            try {
                // Make an Axios POST request to the API endpoint
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // For file uploads
                    },
                });

                // Handle success - maybe update UI, clear form, or navigate
                if (response.status === 201) {
                    setSubmitting(false)
                    showNotification('success', response.data.message)
                    navigate('/success')
                }
                // Do something like redirecting the user or showing a success message

            } catch (error) {
                // Handle error response
                setSubmitting(false)
                showNotification('error', error.response ? error.response.data.message : 'Error please try again');
            }
        }
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <div className="mb-4">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="mt-1"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            {errors.name && <p className="mt-1 text-xs text-[#E8590C]">{errors.name}</p>}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <p className="mt-1 text-xs text-[#E8590C]">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            {errors.password && <p className="mt-1 text-xs text-[#E8590C]">{errors.password}</p>}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                required
                                className="mt-1"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                            {errors.phoneNumber && <p className="mt-1 text-xs text-[#E8590C]">{errors.phoneNumber}</p>}
                        </div>
                    </>
                )
            case 2:
                return (
                    <>
                        <div className="mb-4">
                            <Label htmlFor="businessName">Business Name</Label>
                            <Input
                                id="businessName"
                                name="businessName"
                                type="text"
                                required
                                className="mt-1"
                                value={formData.businessName}
                                onChange={handleInputChange}
                            />
                            {errors.businessName && <p className="mt-1 text-xs text-[#E8590C]">{errors.businessName}</p>}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="businessType">Business Type</Label>
                            <Select name="businessType" onValueChange={(value) => {
                                setFormData(prevState => ({ ...prevState, businessType: value }))
                                setErrors(prevErrors => ({ ...prevErrors, businessType: '' }))
                            }}>
                                <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Select business type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="logistic">Logistic</SelectItem>
                                    <SelectItem value="shipping">Shipping</SelectItem>
                                    <SelectItem value="warehouse">Warehouse</SelectItem>
                                    <SelectItem value ="food and beverage">FnB</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.businessType && <p className="mt-1 text-xs text-[#E8590C]">{errors.businessType}</p>}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="businessAddress">Business Address</Label>
                            <textarea
                                id="businessAddress"
                                name="businessAddress"
                                rows={3}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#E8590C] focus:border-[#E8590C] sm:text-sm"
                                placeholder="Enter your business address"
                                value={formData.businessAddress}
                                onChange={handleInputChange}
                            ></textarea>
                            {errors.businessAddress && <p className="mt-1 text-xs text-[#E8590C]">{errors.businessAddress}</p>}
                        </div>
                    </>
                )
            case 3:
                return (
                    <>
                        <div className="mb-4">
                            <Label htmlFor="suratIzinUsaha">Surat Izin Usaha</Label> <p className="text-sm"> * PDF or Image</p>
                            <Input
                                id="suratIzinUsaha"
                                name="suratIzinUsaha"
                                type="file"
                                required
                                className="mt-1"
                                onChange={handleFileChange}
                            />
                            {errors.suratIzinUsaha && <p className="mt-1 text-xs text-[#E8590C]">{errors.suratIzinUsaha}</p>}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="npwp">NPWP</Label> <p className="text-sm"> * PDF or Image</p>
                            <Input
                                id="npwp"
                                name="npwp"
                                type="file"
                                required
                                className="mt-1"
                                onChange={handleFileChange}
                            />
                            {errors.npwp && <p className="mt-1 text-xs text-[#E8590C]">{errors.npwp}</p>}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="ktp">KTP</Label> <p className="text-sm"> * PDF or Image</p>
                            <Input
                                id="ktp"
                                name="ktp"
                                type="file"
                                required
                                className="mt-1"
                                onChange={handleFileChange}
                            />
                            {errors.ktp && <p className="mt-1 text-xs text-[#E8590C]">{errors.ktp}</p>}
                        </div>
                    </>
                )
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left side with gradient background and illustration */}
            <div className="lg:w-1/2 bg-gradient-to-br from-[#E8590C] to-[#FFA500] p-8 lg:p-12 flex items-center justify-center">
                <div className="text-center">
                    <TruckIcon className="w-24 h-24 text-white mb-8 mx-auto" />
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">Welcome to Logee</h1>
                    <p className="text-xl text-white">Your Logistics and Shipping Solution</p>
                </div>
            </div>

            {/* Right side with the form */}
            <div className="lg:w-1/2 bg-white p-8 lg:p-12 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Register for Logee</h2>
                    <div className="mb-8 flex items-center justify-between">
                        <div className={`step-icon ${step >= 1 ? 'text-[#E8590C]' : 'text-gray-400'}`}>
                            <UserIcon className="w-6 h-6" />
                        </div>
                        <div className={`h-1 flex-1 mx-2 ${step >= 2 ? 'bg-[#E8590C]' : 'bg-gray-300'}`}></div>
                        <div className={`step-icon ${step >= 2 ? 'text-[#E8590C]' : 'text-gray-400'}`}>
                            <BuildingIcon className="w-6 h-6" />
                        </div>
                        <div className={`h-1 flex-1 mx-2 ${step >= 3 ? 'bg-[#E8590C]' : 'bg-gray-300'}`}></div>
                        <div className={`step-icon ${step >= 3 ? 'text-[#E8590C]' : 'text-gray-400'}`}>
                            <FileIcon className="w-6 h-6" />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {renderStep()}
                        <div className="flex justify-between">
                            {step > 1 && (
                                <Button type="button" onClick={handlePrevious} variant="outline">
                                    Previous
                                </Button>
                            )}
                            {step < 3 ? (
                                <Button type="button" onClick={handleNext} className="bg-[#E8590C] hover:bg-[#d14e0b] text-white ml-auto">
                                    Next
                                </Button>
                            ) : (
                                <Button type="submit" className="bg-[#E8590C] hover:bg-[#d14e0b] text-white ml-auto" disabled={isSubmitting}>
                                    {isSubmitting ? (<Spinner />) : "Register"}
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
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