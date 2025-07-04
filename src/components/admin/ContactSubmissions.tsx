import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Mail, Phone, Building, Calendar, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  created_at: string;
  read: boolean;
}

const ContactSubmissions = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching submissions:', error);
        return;
      }

      setSubmissions(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Submission Deleted",
        description: "Contact submission has been deleted successfully.",
      });

      fetchSubmissions();
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast({
        title: "Error",
        description: "Failed to delete submission. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMarkRead = async (id: string, read: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ read: !read })
        .eq('id', id);

      if (error) throw error;

      fetchSubmissions();
    } catch (error) {
      console.error('Error updating submission:', error);
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
        <h2 className="text-2xl font-bold">Contact Submissions</h2>
        <Badge variant="outline">
          {submissions.filter(s => !s.read).length} Unread
        </Badge>
      </div>

      <div className="grid gap-4">
        {submissions.map(submission => (
          <Card key={submission.id} className={!submission.read ? "border-primary/50 bg-primary/5" : ""}>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{submission.name}</CardTitle>
                    {!submission.read && (
                      <Badge variant="default" className="text-xs">New</Badge>
                    )}
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    {submission.subject}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      <span>{submission.email}</span>
                    </div>
                    {submission.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{submission.phone}</span>
                      </div>
                    )}
                    {submission.company && (
                      <div className="flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        <span>{submission.company}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(submission.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMarkRead(submission.id, submission.read)}
                  >
                    {submission.read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Contact Submission</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Name</label>
                            <p className="text-sm text-muted-foreground">{submission.name}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Email</label>
                            <p className="text-sm text-muted-foreground">{submission.email}</p>
                          </div>
                          {submission.phone && (
                            <div>
                              <label className="text-sm font-medium">Phone</label>
                              <p className="text-sm text-muted-foreground">{submission.phone}</p>
                            </div>
                          )}
                          {submission.company && (
                            <div>
                              <label className="text-sm font-medium">Company</label>
                              <p className="text-sm text-muted-foreground">{submission.company}</p>
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium">Subject</label>
                          <p className="text-sm text-muted-foreground">{submission.subject}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Message</label>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {submission.message}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Submitted</label>
                          <p className="text-sm text-muted-foreground">
                            {new Date(submission.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(submission.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {submission.message}
              </p>
            </CardContent>
          </Card>
        ))}
        
        {submissions.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No contact submissions yet.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ContactSubmissions;