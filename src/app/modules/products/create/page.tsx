"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, ImagePlus } from "lucide-react"
import { productsApi } from "@/lib/api/products"
import { Textarea } from "@/components/ui/textarea"

interface Plan {
  id: string
  name: string
  description: string
  features: string[]
  pricing: {
    monthly: number
    annual: number
  }
}

interface ProductForm {
  name: string
  slug: string
  description: string
  logo: File | null
  plans: Plan[]
  status: 'active' | 'inactive'
  price: number
}

const defaultPlan: Plan = {
  id: "1",
  name: "",
  description: "",
  features: [""],
  pricing: {
    monthly: 0,
    annual: 0,
  },
}

export default function CreateProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    slug: "",
    description: "",
    logo: null,
    plans: [{ ...defaultPlan }],
    status: "inactive",
    price: 0
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, logo: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePlanChange = (index: number, field: string, value: string | number) => {
    const updatedPlans = [...formData.plans]
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      const parentObj = updatedPlans[index][parent as keyof Plan] as Record<string, number>
      updatedPlans[index] = {
        ...updatedPlans[index],
        [parent]: {
          ...parentObj,
          [child]: value,
        },
      }
    } else {
      updatedPlans[index] = {
        ...updatedPlans[index],
        [field]: value,
      }
    }
    setFormData({ ...formData, plans: updatedPlans })
  }

  const handleFeatureChange = (planIndex: number, featureIndex: number, value: string) => {
    const updatedPlans = [...formData.plans]
    updatedPlans[planIndex].features[featureIndex] = value
    setFormData({ ...formData, plans: updatedPlans })
  }

  const addFeature = (planIndex: number) => {
    const updatedPlans = [...formData.plans]
    updatedPlans[planIndex].features.push("")
    setFormData({ ...formData, plans: updatedPlans })
  }

  const removeFeature = (planIndex: number, featureIndex: number) => {
    const updatedPlans = [...formData.plans]
    updatedPlans[planIndex].features.splice(featureIndex, 1)
    setFormData({ ...formData, plans: updatedPlans })
  }

  const addPlan = () => {
    setFormData({
      ...formData,
      plans: [...formData.plans, { ...defaultPlan, id: String(formData.plans.length + 1) }],
    })
  }

  const removePlan = (index: number) => {
    const updatedPlans = formData.plans.filter((_, i) => i !== index)
    setFormData({ ...formData, plans: updatedPlans })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Submitting product:", formData)
    try {
      await productsApi.create(formData)
      router.push("/modules/products")
    } catch (error) {
      console.error("Failed to create product:", error)
    }
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit}>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Product Information */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Product</CardTitle>
              <CardDescription>
                Enter the basic information about your product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Enterprise Analytics Suite"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. enterprise-analytics"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your product..."
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Product Logo</Label>
                  <div className="mt-1 flex items-center space-x-4">
                    {previewUrl ? (
                      <div className="relative w-20 h-20">
                        <Image
                          src={previewUrl}
                          alt="Logo preview"
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                        <ImagePlus className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="max-w-xs"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plans */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Plans</CardTitle>
                  <CardDescription>
                    Create pricing plans for your product
                  </CardDescription>
                </div>
                <Button type="button" onClick={addPlan} className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {formData.plans.map((plan, planIndex) => (
                  <Card key={plan.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Input
                          value={plan.name}
                          onChange={(e) => handlePlanChange(planIndex, "name", e.target.value)}
                          placeholder="Plan name"
                          className="max-w-xs"
                        />
                        {formData.plans.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removePlan(planIndex)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        value={plan.description}
                        onChange={(e) => handlePlanChange(planIndex, "description", e.target.value)}
                        placeholder="Plan description"
                        rows={2}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Monthly Price ($)</Label>
                          <Input
                            type="number"
                            value={plan.pricing.monthly}
                            onChange={(e) => handlePlanChange(planIndex, "pricing.monthly", Number(e.target.value))}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Annual Price ($)</Label>
                          <Input
                            type="number"
                            value={plan.pricing.annual}
                            onChange={(e) => handlePlanChange(planIndex, "pricing.annual", Number(e.target.value))}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Features</Label>
                        <div className="space-y-2 mt-1">
                          {plan.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <Input
                                value={feature}
                                onChange={(e) => handleFeatureChange(planIndex, featureIndex, e.target.value)}
                                placeholder="e.g. 10 GB Storage"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => removeFeature(planIndex, featureIndex)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => addFeature(planIndex)}
                            className="w-full mt-2"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Feature
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/modules/products")}>
              Cancel
            </Button>
            <Button type="submit">Create Product</Button>
          </div>
        </div>
      </form>
    </div>
  )
} 