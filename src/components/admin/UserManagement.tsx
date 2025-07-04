import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url: string;
  role: string;
  approved: boolean;
  created_at: string;
  email?: string;
}

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        return;
      }

      setUsers(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ approved: true })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "User Approved",
        description: "User has been approved and can now access the admin panel.",
      });

      fetchUsers();
    } catch (error) {
      console.error('Error approving user:', error);
      toast({
        title: "Error",
        description: "Failed to approve user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRevokeUser = async (userId: string) => {
    if (!confirm('Are you sure you want to revoke this user\'s access?')) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ approved: false })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Access Revoked",
        description: "User access has been revoked.",
      });

      fetchUsers();
    } catch (error) {
      console.error('Error revoking user:', error);
      toast({
        title: "Error",
        description: "Failed to revoke user access. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Badge variant="outline">
          {users.filter(u => !u.approved).length} Pending Approval
        </Badge>
      </div>

      <div className="grid gap-4">
        {users.map(user => (
          <Card key={user.id}>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{user.display_name || 'Unnamed User'}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={user.approved ? "default" : "secondary"}>
                    {user.approved ? "Approved" : "Pending"}
                  </Badge>
                  <Badge variant="outline">{user.role}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  User ID: {user.user_id.slice(0, 8)}...
                </div>
                <div className="flex gap-2">
                  {user.approved ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRevokeUser(user.user_id)}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Revoke Access
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleApproveUser(user.user_id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;