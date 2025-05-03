'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
  organization: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    slack: boolean;
  };
}

const mockProfile: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '👤', // In a real app, this would be an image URL
  role: 'Administrator',
  organization: 'Acme Inc.',
  timezone: 'UTC+00:00',
  notifications: {
    email: true,
    push: true,
    slack: false,
  },
};

const timezones = [
  { value: "UTC+00:00", label: "UTC+00:00" },
  { value: "UTC+01:00", label: "UTC+01:00" },
  { value: "UTC+02:00", label: "UTC+02:00" },
  { value: "UTC+03:00", label: "UTC+03:00" },
  { value: "UTC+04:00", label: "UTC+04:00" },
  { value: "UTC+05:00", label: "UTC+05:00" },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(mockProfile);

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.startsWith('notifications.')) {
      const notificationType = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationType]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your personal information and preferences
              </CardDescription>
            </div>
            <Button
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-5 mb-6">
            <div className="flex-shrink-0">
              <span className="inline-block h-14 w-14 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                <span className="flex h-full w-full items-center justify-center text-3xl">
                  {profile.avatar}
                </span>
              </span>
            </div>
            <div>
              <h2 className="text-xl font-medium">{profile.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</p>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={formData.timezone}
                    onValueChange={(value) => handleInputChange('timezone', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((timezone) => (
                        <SelectItem key={timezone.value} value={timezone.value}>
                          {timezone.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Preferences</h3>
                <div className="space-y-4">
                  {Object.entries(formData.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <Label htmlFor={`notifications.${key}`} className="flex items-center space-x-2">
                        <span className="capitalize">{key}</span>
                        <span className="text-sm text-gray-500">notifications</span>
                      </Label>
                      <Switch
                        id={`notifications.${key}`}
                        checked={value}
                        onCheckedChange={(checked) => handleInputChange(`notifications.${key}`, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <CardFooter className="px-0 pb-0">
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          ) : (
            <dl className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{profile.role}</dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Organization</dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{profile.organization}</dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Timezone</dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{profile.timezone}</dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Notifications</dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                  <ul className="space-y-2">
                    {Object.entries(profile.notifications).map(([key, value]) => (
                      <li key={key} className="flex items-center">
                        <span className={`h-2 w-2 rounded-full mr-2 ${value ? 'bg-green-400' : 'bg-gray-300'}`} />
                        <span className="capitalize">{key}</span> notifications {value ? 'enabled' : 'disabled'}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 