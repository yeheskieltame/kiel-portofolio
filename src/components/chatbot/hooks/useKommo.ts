
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface KommoConfig {
  domain: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

interface KommoAuth {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}

export const useKommo = () => {
  const [auth, setAuth] = useState<KommoAuth>({
    accessToken: null,
    refreshToken: null,
    expiresAt: null
  });
  
  const [isConnected, setIsConnected] = useState(false);
  
  // Kommo configuration - these should be set in your Kommo app settings
  const kommoConfig: KommoConfig = {
    domain: "your-domain.kommo.com", // Replace with your Kommo domain
    clientId: "your-client-id", // Replace with your Kommo Client ID
    clientSecret: "your-client-secret", // Replace with your Kommo Client Secret
    redirectUri: window.location.origin + "/kommo-callback"
  };

  useEffect(() => {
    // Load stored auth tokens
    const storedAuth = localStorage.getItem('kommo_auth');
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      setAuth(parsedAuth);
      
      // Check if token is still valid
      if (parsedAuth.expiresAt && Date.now() < parsedAuth.expiresAt) {
        setIsConnected(true);
      } else if (parsedAuth.refreshToken) {
        refreshAccessToken(parsedAuth.refreshToken);
      }
    }
  }, []);

  const initiateAuth = () => {
    const authUrl = `https://${kommoConfig.domain}/oauth2/authorize?` +
      `client_id=${kommoConfig.clientId}&` +
      `response_type=code&` +
      `redirect_uri=${encodeURIComponent(kommoConfig.redirectUri)}&` +
      `scope=crm`;
    
    window.location.href = authUrl;
  };

  const handleAuthCallback = async (code: string) => {
    try {
      const response = await fetch(`https://${kommoConfig.domain}/oauth2/access_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: kommoConfig.clientId,
          client_secret: kommoConfig.clientSecret,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: kommoConfig.redirectUri
        })
      });

      const data = await response.json();
      
      if (data.access_token) {
        const newAuth = {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          expiresAt: Date.now() + (data.expires_in * 1000)
        };
        
        setAuth(newAuth);
        setIsConnected(true);
        localStorage.setItem('kommo_auth', JSON.stringify(newAuth));
        
        toast({
          title: "Connected to Kommo",
          description: "Your chatbot is now connected to Kommo CRM",
        });
      }
    } catch (error) {
      console.error('Kommo auth error:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Kommo. Please try again.",
        variant: "destructive",
      });
    }
  };

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const response = await fetch(`https://${kommoConfig.domain}/oauth2/access_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: kommoConfig.clientId,
          client_secret: kommoConfig.clientSecret,
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
      });

      const data = await response.json();
      
      if (data.access_token) {
        const newAuth = {
          accessToken: data.access_token,
          refreshToken: data.refresh_token || refreshToken,
          expiresAt: Date.now() + (data.expires_in * 1000)
        };
        
        setAuth(newAuth);
        setIsConnected(true);
        localStorage.setItem('kommo_auth', JSON.stringify(newAuth));
      } else {
        setIsConnected(false);
        localStorage.removeItem('kommo_auth');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      setIsConnected(false);
      localStorage.removeItem('kommo_auth');
    }
  };

  const createLead = async (contactData: {
    name: string;
    email?: string;
    phone?: string;
    message: string;
  }) => {
    if (!auth.accessToken || !isConnected) {
      throw new Error('Not connected to Kommo');
    }

    try {
      const response = await fetch(`https://${kommoConfig.domain}/api/v4/leads`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{
          name: `Website Lead: ${contactData.name}`,
          custom_fields_values: [
            {
              field_code: 'EMAIL',
              values: [{ value: contactData.email }]
            },
            {
              field_code: 'PHONE',
              values: [{ value: contactData.phone }]
            }
          ],
          _embedded: {
            contacts: [{
              name: contactData.name,
              custom_fields_values: [
                {
                  field_code: 'EMAIL',
                  values: [{ value: contactData.email }]
                },
                {
                  field_code: 'PHONE',
                  values: [{ value: contactData.phone }]
                }
              ]
            }]
          }
        }])
      });

      const data = await response.json();
      
      if (response.ok) {
        // Add note to the lead with the message
        const leadId = data._embedded.leads[0].id;
        await addNoteToLead(leadId, contactData.message);
        return data;
      } else {
        throw new Error(data.detail || 'Failed to create lead');
      }
    } catch (error) {
      console.error('Create lead error:', error);
      throw error;
    }
  };

  const addNoteToLead = async (leadId: number, message: string) => {
    if (!auth.accessToken || !isConnected) {
      return;
    }

    try {
      await fetch(`https://${kommoConfig.domain}/api/v4/leads/${leadId}/notes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{
          note_type: 'common',
          params: {
            text: `Website Message: ${message}`
          }
        }])
      });
    } catch (error) {
      console.error('Add note error:', error);
    }
  };

  return {
    isConnected,
    initiateAuth,
    handleAuthCallback,
    createLead,
    auth
  };
};
