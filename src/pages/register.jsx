import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import Notification from '../components/ui/notification'
import useNotification from '../hooks/useNotification'
import { TruckIcon, FileIcon, UserIcon, BanknoteIcon } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/ui/spinner'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: '',
    businessManager: '',
    email: '',
    businessAddress: '',
    bankName: '',
    bankLocation: '',
    bankNumber: '',
    bankAccount: '',
    companyLogo: null,
    nidTdp: null,
    npwp: null,
    sipNib: null,
    ktp: null,
    aktaPendirian: null,
    aktaPengesahanPendirian: null,
    othersFile: null,
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
    if (files[0]) {
      const fileType = files[0].type
      if (fileType.startsWith('image/') || fileType === 'application/pdf') {
        setFormData(prevState => ({ ...prevState, [name]: files[0] }))
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
      } else {
        setErrors(prevErrors => ({ ...prevErrors, [name]: 'Only image or PDF files are accepted' }))
      }
    }
  }

  const validateStep = (stepFields) => {
    const newErrors = {}
    stepFields.forEach(field => {
      if (!formData[field] && field !== 'companyLogo' && field !== 'nidTdp' && field !== 'othersFile') {
        newErrors[field] = 'This field is required'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    const stepFields = {
      1: ['businessName', 'businessManager', 'email', 'businessAddress'],
      2: ['bankName', 'bankLocation', 'bankNumber', 'bankAccount'],
      3: ['companyLogo', 'nidTdp', 'npwp', 'sipNib', 'ktp', 'aktaPendirian', 'aktaPengesahanPendirian', 'othersFile']
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
    if (validateStep(['companyLogo', 'nidTdp', 'npwp', 'sipNib', 'ktp', 'aktaPendirian', 'aktaPengesahanPendirian', 'othersFile'])) {
      const formDataToSend = new FormData()

      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key])
      })

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        if (response.status === 201) {
          setSubmitting(false)
          showNotification('success', response.data.message)
          navigate('/success')
        }
      } catch (error) {
        setSubmitting(false)
        showNotification('error', error.response ? error.response.data.message : 'Error please try again')
      }
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="businessName">Nama Perusahaan</Label>
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
              <Label htmlFor="businessManager">Penanggung Jawab Perusahaan</Label>
              <Input
                id="businessManager"
                name="businessManager"
                type="text"
                required
                className="mt-1"
                value={formData.businessManager}
                onChange={handleInputChange}
              />
              {errors.businessManager && <p className="mt-1 text-xs text-[#E8590C]">{errors.businessManager}</p>}
            </div>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="businessAddress">Alamat Perusahaan</Label>
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
      case 2:
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="bankName">Nama Bank</Label>
              <Input
                id="bankName"
                name="bankName"
                type="text"
                required
                className="mt-1"
                value={formData.bankName}
                onChange={handleInputChange}
              />
              {errors.bankName && <p className="mt-1 text-xs text-[#E8590C]">{errors.bankName}</p>}
            </div>
            <div className="mb-4">
              <Label htmlFor="bankLocation">Lokasi KCP</Label>
              <Input
                id="bankLocation"
                name="bankLocation"
                type="text"
                required
                className="mt-1"
                value={formData.bankLocation}
                onChange={handleInputChange}
              />
              {errors.bankLocation && <p className="mt-1 text-xs text-[#E8590C]">{errors.bankLocation}</p>}
            </div>
            <div className="mb-4">
              <Label htmlFor="bankNumber">Nomor Rekening</Label>
              <Input
                id="bankNumber"
                name="bankNumber"
                type="text"
                required
                className="mt-1"
                value={formData.bankNumber}
                onChange={handleInputChange}
              />
              {errors.bankNumber && <p className="mt-1 text-xs text-[#E8590C]">{errors.bankNumber}</p>}
            </div>
            <div className="mb-4">
              <Label htmlFor="bankAccount">Nama Pemilik Rekening</Label>
              <Input
                id="bankAccount"
                name="bankAccount"
                type="text"
                required
                className="mt-1"
                value={formData.bankAccount}
                onChange={handleInputChange}
              />
              {errors.bankAccount && <p className="mt-1 text-xs text-[#E8590C]">{errors.bankAccount}</p>}
            </div>
          </>
        )
      case 3:
        return (
          <>
            <p className="mb-4 text-sm text-gray-600">Note: We only accept image (JPG, PNG, etc.) or PDF files for all document uploads.</p>
            <div className="mb-4">
              <Label htmlFor="companyLogo">Logo Perusahaan (Optional)</Label>
              <Input
                id="companyLogo"
                name="companyLogo"
                type="file"
                accept="image/*,application/pdf"
                className="mt-1"
                onChange={handleFileChange}
              />
              {errors.companyLogo && <p className="mt-1 text-xs text-[#E8590C]">{errors.companyLogo}</p>}
            </div>
            <div className="mb-4">
              <Label htmlFor="npwp">NPWP</Label>
              <Input
                id="npwp"
                name="npwp"
                type="file"
                accept="image/*,application/pdf"
                required
                className="mt-1"
                onChange={handleFileChange}
              />
              {errors.npwp && <p className="mt-1 text-xs text-[#E8590C]">{errors.npwp}</p>}
            </div>
            <div className="mb-4">
              <Label htmlFor="sipNib">SIP/NIB</Label>
              <Input
                id="sipNib"
                name="sipNib"
                type="file"
                accept="image/*,application/pdf"
                required
                className="mt-1"
                onChange={handleFileChange}
              />
              {errors.sipNib && <p className="mt-1 text-xs text-[#E8590C]">{errors.sipNib}</p>}
            </div>
            <div className="mb-4">
              <Label htmlFor="nidTdp">NID/TDP (Optional)</Label>
              <Input
                id="nidTdp"
                name="nidTdp"
                type="file"
                accept="image/*,application/pdf"
                className="mt-1"
                onChange={handleFileChange}
              />
              {errors.nidTdp && <p className="mt-1 text-xs text-[#E8590C]">{errors.nidTdp}</p>}
            </div>
            <div className="mb-4">
              <Label htmlFor="ktp">KTP Direktur</Label>
              <Input
                id="ktp"
                name="ktp"
                type="file"
                accept="image/*,application/pdf"
                required
                className="mt-1"
                onChange={handleFileChange}
              />
              {errors.ktp && <p className="mt-1 text-xs text-[#E8590C]">{errors.ktp}</p>}
            </div>
            <div className="mb-4">
              <Label htmlFor="aktaPendirian">Akta Pendirian Perusahaan</Label>
              <Input
                id="aktaPendirian"
                name="aktaPendirian"
                type="file"
                accept="image/*,application/pdf"
                required
                className="mt-1"
                onChange={handleFileChange}
              />
              {errors.aktaPendirian && <p className="mt-1 text-xs text-[#E8590C]">{errors.aktaPendirian}</p>}
            </div>
            <div className="mb-4">
              <Label htmlFor="aktaPengesahanPendirian">Pengesahan Akta Pendirian Perusaan</Label>
              <Input
                id="aktaPengesahanPendirian"
                name="aktaPengesahanPendirian"
                type="file"
                accept="image/*,application/pdf"
                required
                className="mt-1"
                onChange={handleFileChange}
              />
              {errors.aktaPengesahanPendirian && <p className="mt-1 text-xs text-[#E8590C]">{errors.aktaPengesahanPendirian}</p>}
            </div>
            <div className="mb-4">
              <Label htmlFor="nidTdp">Dokumen Pendukung (Optional)</Label>
              <Input
                id="othersFile"
                name="othersFile"
                type="file"
                accept="image/*,application/pdf"
                className="mt-1"
                onChange={handleFileChange}
              />
              {errors.othersFile && <p className="mt-1 text-xs text-[#E8590C]">{errors.othersFile}</p>}
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side */}
      <div className="lg:w-1/2 bg-gradient-to-br from-[#E8590C] to-[#FFA500] p-8 lg:p-12 flex items-center justify-center">
        <div className="text-center">
          <TruckIcon className="w-24 h-24 text-white mb-8 mx-auto" />
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">Welcome to Logee</h1>
          <p className="text-xl text-white">Your Logistics and Shipping Solution</p>
        </div>
      </div>

      {/* Right side */}
      <div className="lg:w-1/2 bg-white p-8 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center">
            {/* <div className="text-2xl lg:text-3xl font-bold text-gray-900">Register for </div> */}
            <img src="/logee.png" alt="logee" width={130} height={130} />
          </div>
          <div className="mb-8 flex items-center justify-between">
            <div className={`step-icon ${step >= 1 ? 'text-[#E8590C]' : 'text-gray-400'}`}>
              <UserIcon className="w-6 h-6" />
            </div>
            <div className={`h-1 flex-1 mx-2 ${step >= 2 ? 'bg-[#E8590C]' : 'bg-gray-300'}`}></div>
            <div className={`step-icon ${step >= 2 ? 'text-[#E8590C]' : 'text-gray-400'}`}>
              <BanknoteIcon className="w-6 h-6" />
            </div>
            <div className={`h-1 flex-1 mx-2 ${step >= 3 ? 'bg-[#E8590C]' : 'bg-gray-300'}`}></div>
            <div className={`step-icon ${step >= 3 ? 'text-[#E8590C]' : 'text-gray-400'}`}>
              <FileIcon className="w-6 h-6" />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStep()}
            <div className="flex justify-between">
              {step > 1 &&
                <Button type="button" onClick={handlePrevious} variant="outline">
                  Previous
                </Button>
              }
              {step < 3 ? (
                <Button type="button" onClick={handleNext} className="bg-[#E8590C] hover:bg-[#d14e0b] text-white ml-auto">
                  Next
                </Button>
              ) : (
                <Button type="submit" className="bg-[#E8590C] hover:bg-[#d14e0b] text-white ml-auto" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner /> : "Register"}
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