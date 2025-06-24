import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface KommoConfig {
  domain: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  widgetId: string;
  widgetHash: string;
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
  
  // Kommo configuration with your actual domain and widget details
  const kommoConfig: KommoConfig = {
    domain: "riorblade09.kommo.com",
    clientId: "your-client-id", // You'll need to get this from Kommo integrations
    clientSecret: "your-client-secret", // You'll need to get this from Kommo integrations
    redirectUri: window.location.origin + "/kommo-callback",
    widgetId: "1046136",
    widgetHash: "f2edac3055e0ee9f04312978c5f5382d8b0b5803f72da0bf3bd81bcf38a209d2"
  };

  useEffect(() => {
    // Load Kommo widget script
    loadKommoWidget();
    
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

  const loadKommoWidget = () => {
    // Initialize Kommo widget
    if (typeof window !== 'undefined') {
      (window as any).crmPlugin = (window as any).crmPlugin || {
        id: kommoConfig.widgetId,
        hash: kommoConfig.widgetHash,
        locale: "id",
        setMeta: function(p: any) {
          this.params = (this.params || []).concat([p]);
        }
      };

      // Load the widget script if not already loaded
      if (!document.getElementById('crm_plugin_script')) {
        const script = document.createElement('script');
        script.async = true;
        script.id = 'crm_plugin_script';
        script.src = 'https://gso.kommo.com/js/button.js';
        document.head?.appendChild(script);
      }
    }
  };

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

  // Function to show Kommo widget
  const showKommoWidget = () => {
    if (typeof window !== 'undefined' && (window as any).crmPlugin) {
      (window as any).crmPlugin('show');
    }
  };

  return {
    isConnected,
    initiateAuth,
    handleAuthCallback,
    createLead,
    showKommoWidget,
    auth,
    config: kommoConfig
  };
};
