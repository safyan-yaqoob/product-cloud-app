"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, ImagePlus } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Plan {
  id: string;
  name: string;
  description: string;
  features: string[];
  pricing: {
    monthly: number;
    annual: number;
  };
}

interface ProductForm {
  name: string;
  slug: string;
  description: string;
  logo: File | null;
  plans: Plan[];
  status: 'active' | 'draft';
}

interface Props {
  params: {
    id: string;
  };
}

// Dummy data - replace with API call
const mockProduct: ProductForm = {
  name: 'Enterprise Analytics Suite',
  slug: 'enterprise-analytics',
  description: 'Advanced analytics and reporting platform for businesses',
  logo: null,
  status: 'active',
  plans: [
    {
      id: '1',
      name: 'Basic',
      description: 'Perfect for small teams',
      features: [
        'Up to 5 team members',
        'Basic analytics dashboard',
        'Email support',
        '5GB storage',
      ],
      pricing: {
        monthly: 49,
        annual: 470,
      },
    },
    {
      id: '2',
      name: 'Premium',
      description: 'Best for growing businesses',
      features: [
        'Up to 20 team members',
        'Advanced analytics',
        'Priority email support',
        '20GB storage',
        'Custom reports',
      ],
      pricing: {
        monthly: 99,
        annual: 990,
      },
    },
  ],
};

export default function EditProductPage({ params }: Props) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'info' | 'plans'>('info')
  const [formData, setFormData] = useState<ProductForm>(mockProduct)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    // Here you would fetch the product data using the ID
    console.log('Fetching product:', params.id)
  }, [params.id])

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
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
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
    updatedPlans[planIndex].features.push('')
    setFormData({ ...formData, plans: updatedPlans })
  }

  const removeFeature = (planIndex: number, featureIndex: number) => {
    const updatedPlans = [...formData.plans]
    updatedPlans[planIndex].features.splice(featureIndex, 1)
    setFormData({ ...formData, plans: updatedPlans })
  }

  const addPlan = () => {
    const newPlan: Plan = {
      id: String(formData.plans.length + 1),
      name: '',
      description: '',
      features: [''],
      pricing: {
        monthly: 0,
        annual: 0,
      },
    }
    setFormData({
      ...formData,
      plans: [...formData.plans, newPlan],
    })
  }

  const removePlan = (index: number) => {
    const updatedPlans = formData.plans.filter((_, i) => i !== index)
    setFormData({ ...formData, plans: updatedPlans })
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('Updating product:', formData)
    try {
      // Here you would make an API call to update the product
      router.push('/modules/products')
    } catch (error) {
      console.error('Failed to update product:', error)
    }
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <Button variant="outline" onClick={() => router.push('/modules/products')}>
            Back to Products
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'info' | 'plans')}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="info">Product Information</TabsTrigger>
            <TabsTrigger value="plans">Plans & Pricing</TabsTrigger>
          </TabsList>

          {activeTab === 'info' ? (
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>
                  Update your product details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="mt-1"
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
                  <div className="flex justify-end">
                    <Button type="submit" onClick={handleSubmit}>
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Plans & Pricing</CardTitle>
                    <CardDescription>
                      Manage your product plans
                    </CardDescription>
                  </div>
                  <Button onClick={addPlan} className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Plan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {formData.plans.map((plan, planIndex) => (
                    <Card key={plan.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Input
                            value={plan.name}
                            onChange={(e) => handlePlanChange(planIndex, 'name', e.target.value)}
                            placeholder="Plan name"
                            className="max-w-xs"
                          />
                          {formData.plans.length > 1 && (
                            <Button
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
                          onChange={(e) => handlePlanChange(planIndex, 'description', e.target.value)}
                          placeholder="Plan description"
                          rows={2}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Monthly Price ($)</Label>
                            <Input
                              type="number"
                              value={plan.pricing.monthly}
                              onChange={(e) => handlePlanChange(planIndex, 'pricing.monthly', Number(e.target.value))}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Annual Price ($)</Label>
                            <Input
                              type="number"
                              value={plan.pricing.annual}
                              onChange={(e) => handlePlanChange(planIndex, 'pricing.annual', Number(e.target.value))}
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
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => removeFeature(planIndex, featureIndex)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
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
          )}
        </Tabs>
      </div>
    </div>
  )
} 