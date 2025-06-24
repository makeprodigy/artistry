"use client"

import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import * as yup from "yup"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Upload, X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"

// Form validation schema
const onboardingSchema = yup.object({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  bio: yup.string().required("Bio is required").min(10, "Bio must be at least 10 characters").max(500, "Bio must be less than 500 characters"),
  categories: yup.array().of(yup.string()).min(1, "Please select at least one category").required("Categories are required"),
  languages: yup.array().of(yup.string()).min(1, "Please select at least one language").required("Languages are required"),
  feeRange: yup.string().required("Fee range is required"),
  location: yup.string().required("Location is required"),
  profileImage: yup.mixed().nullable()
})

type OnboardingFormData = yup.InferType<typeof onboardingSchema>

const categories = [
  "Visual Arts", "Music", "Dance", "Theater", "Writing", "Photography", 
  "Digital Art", "Sculpture", "Painting", "Film", "Animation", "Design"
]

const languages = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese", 
  "Chinese", "Japanese", "Korean", "Hindi", "Arabic", "Russian"
]

const feeRanges = [
  "$0 - $50", "$50 - $100", "$100 - $250", "$250 - $500", 
  "$500 - $1000", "$1000 - $2500", "$2500+"
]

export default function OnboardingPage() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(onboardingSchema),
    defaultValues: {
      name: '',
      bio: '',
      categories: [],
      languages: [],
      feeRange: '',
      location: '',
      profileImage: null
    }
  })

  const sections = [
    { title: "Personal Information", description: "Tell us about yourself" },
    { title: "Professional Details", description: "Your artistic expertise" },
    { title: "Location & Pricing", description: "Where you work and your rates" },
    { title: "Review & Submit", description: "Review your information" }
  ]

  const handleCategoryToggle = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category]
    
    setSelectedCategories(updatedCategories)
    setValue("categories", updatedCategories)
  }

  const handleLanguageToggle = (language: string) => {
    const updatedLanguages = selectedLanguages.includes(language)
      ? selectedLanguages.filter(l => l !== language)
      : [...selectedLanguages, language]
    
    setSelectedLanguages(updatedLanguages)
    setValue("languages", updatedLanguages)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setValue("profileImage", file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setValue("profileImage", null)
    setProfileImagePreview(null)
  }

  const nextSection = async () => {
    // Define which fields to validate for each section
    const fieldsToValidate = {
      0: ['name', 'bio'], // Section 0: Personal Information
      1: ['categories', 'languages'], // Section 1: Professional Details  
      2: ['location', 'feeRange'], // Section 2: Location & Pricing
      3: [] // Section 3: Review (no validation needed)
    }

    const currentFields = fieldsToValidate[currentSection as keyof typeof fieldsToValidate]
    
    // Additional validation for multi-select fields
    if (currentSection === 1) {
      if (selectedCategories.length === 0) {
        alert('Please select at least one category before proceeding.')
        return
      }
      if (selectedLanguages.length === 0) {
        alert('Please select at least one language before proceeding.')
        return
      }
    }
    
    // Only validate current section fields
    const isValid = currentFields.length === 0 || await trigger(currentFields as (keyof OnboardingFormData)[])
    
    if (isValid && currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    } else if (!isValid) {
      // Show a toast or alert for validation errors
      alert('Please fill in all required fields correctly before proceeding.')
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const onSubmit = (data: OnboardingFormData) => {
    console.log("Form Data:", {
      ...data,
      profileImage: data.profileImage ? {
        name: (data.profileImage as File).name,
        size: (data.profileImage as File).size,
        type: (data.profileImage as File).type
      } : null
    })
    alert("Form submitted successfully! Check console for data.")
  }

  const watchedValues = watch()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center text-gray-300 hover:text-white bg-gray-800/50 backdrop-blur-md border border-gray-600/30 hover:bg-gray-700/50 transition-all duration-200 rounded-full w-10 h-10 p-0 justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-2xl">Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">Artistry</span></h1>
          <p className="text-lg text-gray-300">Let&apos;s set up your artist profile</p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {sections.map((section, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shadow-lg ${
                    index <= currentSection
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                      : "bg-gray-700/50 text-gray-400 border border-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="text-xs text-gray-300 mt-2 text-center max-w-20">
                  {section.title}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="shadow-2xl bg-gray-800/50 backdrop-blur-md border border-orange-500/20">
          <CardHeader>
            <CardTitle className="text-white text-xl">{sections[currentSection].title}</CardTitle>
            <CardDescription className="text-gray-300">{sections[currentSection].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Section 0: Personal Information */}
              {currentSection === 0 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-white">Full Name *</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Enter your full name"
                      className="mt-1 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-white">Bio *</Label>
                    <Textarea
                      id="bio"
                      {...register("bio")}
                      placeholder="Tell us about your artistic journey, experience, and what makes you unique..."
                      className="mt-1 min-h-[120px] bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500"
                    />
                    {errors.bio && (
                      <p className="text-red-400 text-sm mt-1">{errors.bio.message}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-white">Profile Image (Optional)</Label>
                    <div className="mt-1">
                      {profileImagePreview ? (
                        <div className="relative inline-block">
                          <img
                            src={profileImagePreview}
                            alt="Profile preview"
                            className="w-32 h-32 object-cover rounded-lg border border-orange-500/30"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0 bg-red-500/80 hover:bg-red-600"
                            onClick={removeImage}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-orange-500/50 rounded-lg cursor-pointer hover:bg-gray-700/30 hover:border-orange-400 transition-all duration-200">
                          <Upload className="w-8 h-8 text-orange-400 mb-2" />
                          <span className="text-sm text-gray-300">Upload Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Section 1: Professional Details */}
              {currentSection === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-white">Categories * (Select all that apply)</Label>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700/30 transition-colors">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryToggle(category)}
                            className="border-gray-500 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-orange-500 data-[state=checked]:to-pink-500"
                          />
                          <Label htmlFor={category} className="text-sm text-gray-300 cursor-pointer">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {selectedCategories.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedCategories.map((category) => (
                          <Badge key={category} className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-200 border-orange-400/30 hover:from-orange-500/30 hover:to-pink-500/30">
                            {category}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="ml-1 h-auto p-0 text-orange-300 hover:text-orange-100"
                              onClick={() => handleCategoryToggle(category)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    {errors.categories && (
                      <p className="text-red-400 text-sm mt-1">{errors.categories.message}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-white">Languages Spoken * (Select all that apply)</Label>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3">
                      {languages.map((language) => (
                        <div key={language} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700/30 transition-colors">
                          <Checkbox
                            id={language}
                            checked={selectedLanguages.includes(language)}
                            onCheckedChange={() => handleLanguageToggle(language)}
                            className="border-gray-500 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-violet-500"
                          />
                          <Label htmlFor={language} className="text-sm text-gray-300 cursor-pointer">
                            {language}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {selectedLanguages.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedLanguages.map((language) => (
                          <Badge key={language} className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-200 border-purple-400/30 hover:from-purple-500/30 hover:to-violet-500/30">
                            {language}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="ml-1 h-auto p-0 text-purple-300 hover:text-purple-100"
                              onClick={() => handleLanguageToggle(language)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    {errors.languages && (
                      <p className="text-red-400 text-sm mt-1">{errors.languages.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Section 2: Location & Pricing */}
              {currentSection === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="location" className="text-white">Location *</Label>
                    <Input
                      id="location"
                      {...register("location")}
                      placeholder="City, State/Country"
                      className="mt-1 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500"
                    />
                    {errors.location && (
                      <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="feeRange" className="text-white">Fee Range *</Label>
                    <Controller
                      name="feeRange"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="mt-1 bg-gray-700/50 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500">
                            <SelectValue placeholder="Select your fee range" className="text-gray-400" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            {feeRanges.map((range) => (
                              <SelectItem key={range} value={range} className="text-white hover:bg-gray-700 focus:bg-gray-700">
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.feeRange && (
                      <p className="text-red-400 text-sm mt-1">{errors.feeRange.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Section 3: Review & Submit */}
              {currentSection === 3 && (
                <div className="space-y-6">
                  <div className="bg-gray-700/30 backdrop-blur-sm p-6 rounded-lg border border-orange-500/20">
                    <h3 className="text-lg font-semibold mb-4 text-white">Review Your Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="text-gray-300">
                        <strong className="text-orange-300">Name:</strong> {watchedValues.name || "Not provided"}
                      </div>
                      <div className="text-gray-300">
                        <strong className="text-orange-300">Location:</strong> {watchedValues.location || "Not provided"}
                      </div>
                      <div className="md:col-span-2 text-gray-300">
                        <strong className="text-orange-300">Bio:</strong> {watchedValues.bio || "Not provided"}
                      </div>
                      <div className="text-gray-300">
                        <strong className="text-orange-300">Categories:</strong>{" "}
                        {selectedCategories.length > 0 ? selectedCategories.join(", ") : "None selected"}
                      </div>
                      <div className="text-gray-300">
                        <strong className="text-purple-300">Languages:</strong>{" "}
                        {selectedLanguages.length > 0 ? selectedLanguages.join(", ") : "None selected"}
                      </div>
                      <div className="text-gray-300">
                        <strong className="text-orange-300">Fee Range:</strong> {watchedValues.feeRange || "Not selected"}
                      </div>
                      <div className="text-gray-300">
                        <strong className="text-orange-300">Profile Image:</strong>{" "}
                        {profileImagePreview ? "Image uploaded" : "No image uploaded"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 shadow-2xl px-8 py-4 text-lg font-semibold"
                    >
                      Complete Registration
                    </Button>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-600/50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevSection}
                  disabled={currentSection === 0}
                  className="flex items-center bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-gray-600/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>

                {currentSection < sections.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextSection}
                    className="flex items-center bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white border-0 shadow-lg"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : null}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 