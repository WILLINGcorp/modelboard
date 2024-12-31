import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const AccountManagementSection = () => {
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleEmailUpdate = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Please check your email to confirm the change",
      });
      setNewEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update email",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Password updated successfully",
      });
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-modelboard-gray">
      <CardHeader>
        <CardTitle className="text-white">Account Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Change Email</h3>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="New email address"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="bg-modelboard-dark text-white"
            />
            <Button 
              onClick={handleEmailUpdate}
              disabled={!newEmail || loading}
              className="w-full bg-modelboard-red hover:bg-red-600"
            >
              Update Email
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Change Password</h3>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-modelboard-dark text-white"
            />
            <Input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-modelboard-dark text-white"
            />
            <Button 
              onClick={handlePasswordUpdate}
              disabled={!currentPassword || !newPassword || loading}
              className="w-full bg-modelboard-red hover:bg-red-600"
            >
              Update Password
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};