'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Integration {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected';
  icon: string;
}

const mockIntegrations: Integration[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing and subscription management',
    status: 'connected',
    icon: '💳',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Team communication and notifications',
    status: 'disconnected',
    icon: '💬',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Code repository and version control',
    status: 'connected',
    icon: '📦',
  },
  {
    id: 'google',
    name: 'Google Workspace',
    description: 'Email, calendar, and document collaboration',
    status: 'disconnected',
    icon: '📧',
  },
];

export default function IntegrationsPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>
            Connect your favorite tools and services to enhance your workflow.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockIntegrations.map((integration) => (
              <Card key={integration.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{integration.icon}</div>
                      <div>
                        <h3 className="text-lg font-medium">{integration.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge variant={integration.status === 'connected' ? 'success' : 'secondary'}>
                      {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                    </Badge>
                    <Button
                      variant={integration.status === 'connected' ? 'destructive' : 'default'}
                      size="sm"
                    >
                      {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 