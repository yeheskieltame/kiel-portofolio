
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Settings } from "lucide-react";
import { useKommo } from "./hooks/useKommo";

export const KommoSetup = () => {
  const { isConnected, initiateAuth } = useKommo();

  if (isConnected) {
    return (
      <div className="flex items-center gap-2 text-green-600 text-sm">
        <CheckCircle className="h-4 w-4" />
        <span>Connected to Kommo CRM</span>
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
        <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-semibold">Setup Required</p>
            <p>Please configure your Kommo credentials in the useKommo.ts file before connecting.</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <p className="font-semibold">Required Configuration:</p>
          <ul className="space-y-1 text-gray-600">
            <li>• Kommo domain (your-domain.kommo.com)</li>
            <li>• Client ID from your Kommo app</li>
            <li>• Client Secret from your Kommo app</li>
            <li>• Redirect URI configured in Kommo</li>
          </ul>
        </div>

        <Button 
          onClick={initiateAuth}
          className="w-full"
          disabled={!isConnected}
        >
          Connect to Kommo
        </Button>
      </CardContent>
    </Card>
  );
};
