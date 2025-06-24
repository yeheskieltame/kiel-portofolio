
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Settings, ExternalLink } from "lucide-react";
import { useKommo } from "./hooks/useKommo";

export const KommoSetup = () => {
  const { isConnected, initiateAuth, config } = useKommo();

  if (isConnected) {
    return (
      <div className="flex items-center gap-2 text-green-600 text-sm">
        <CheckCircle className="h-4 w-4" />
        <span>Connected to Kommo CRM ({config.domain})</span>
      </div>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Kommo CRM Setup
        </CardTitle>
        <CardDescription>
          Connect your chatbot to Kommo CRM for advanced lead management and automation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-sm text-green-800">
            <p className="font-semibold">Domain Configured</p>
            <p className="flex items-center gap-1">
              Connected to: <span className="font-mono">{config.domain}</span>
              <ExternalLink className="h-3 w-3" />
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-semibold">OAuth Setup Required</p>
            <p>Please configure OAuth credentials in your Kommo integrations panel before connecting.</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <p className="font-semibold">Required Configuration:</p>
          <ul className="space-y-1 text-gray-600">
            <li>• Go to Settings → Integrations in your Kommo account</li>
            <li>• Create a new integration or use existing one</li>
            <li>• Copy Client ID and Client Secret</li>
            <li>• Set redirect URI: {config.redirectUri}</li>
          </ul>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={() => window.open(`https://${config.domain}/settings/integrations`, '_blank')}
            variant="outline"
            className="flex-1"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Kommo
          </Button>
          
          <Button 
            onClick={initiateAuth}
            className="flex-1"
            disabled={true}
          >
            Connect
          </Button>
        </div>
        
        <p className="text-xs text-gray-500">
          Note: Update the clientId and clientSecret in useKommo.ts with your actual OAuth credentials.
        </p>
      </CardContent>
    </Card>
  );
};
