import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Save, User, FileText, Settings, Users } from 'lucide-react';
import BlogManagement from '@/components/admin/BlogManagement';
import UserManagement from '@/components/admin/UserManagement';

interface ContentData {
  id?: string;
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta_text: string;
    cta_link: string;
    background_image: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    stats: Array<{
      number: string;
      label: string;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    address: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    og_image: string;
  };
}

const AdminV2 = () => {
  const { user, session, loading, signOut } = useAuth();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isApproved, setIsApproved] = useState(false);
  const [content, setContent] = useState<ContentData>({
    hero: {
      title: "Building the Future with AI",
      subtitle: "Advanced AI Solutions",
      description: "Transform your business with cutting-edge artificial intelligence and data science solutions",
      cta_text: "Get Started",
      cta_link: "/contact",
      background_image: "/lovable-uploads/1861a34a-e307-498c-a038-bb4d7d010a16.png"
    },
    services: {
      title: "Our Services",
      subtitle: "What We Offer",
      items: [
        {
          title: "AI Development",
          description: "Custom AI solutions tailored to your business needs",
          icon: "brain"
        },
        {
          title: "Data Science",
          description: "Transform your data into actionable insights",
          icon: "chart"
        },
        {
          title: "Machine Learning",
          description: "Advanced ML models for predictive analytics",
          icon: "cpu"
        }
      ]
    },
    about: {
      title: "About Tracemain",
      subtitle: "Who We Are",
      description: "We are a team of AI experts passionate about building intelligent systems that solve real-world problems.",
      features: [
        "Expert AI Development Team",
        "Cutting-edge Technology Stack",
        "Proven Track Record",
        "24/7 Support"
      ],
      stats: [
        { number: "100+", label: "Projects Completed" },
        { number: "50+", label: "Happy Clients" },
        { number: "5+", label: "Years Experience" }
      ]
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Contact Us",
      email: "contact@tracemain.com",
      phone: "+1 (555) 123-4567",
      address: "123 AI Street, Tech City, TC 12345"
    },
    seo: {
      title: "Tracemain - AI Solutions & Data Science",
      description: "Leading AI development company providing custom artificial intelligence solutions, data science consulting, and machine learning services.",
      keywords: ["AI", "Machine Learning", "Data Science", "Artificial Intelligence", "Custom Solutions"],
      og_image: "/lovable-uploads/1861a34a-e307-498c-a038-bb4d7d010a16.png"
    }
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        setUserProfile(data);
        setIsApproved(data?.approved || false);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleSave = async () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been saved locally.",
    });
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isApproved) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Awaiting Approval</h1>
          <p className="text-muted-foreground mb-6">
            Your admin account is pending approval. Please contact an existing administrator to approve your access.
          </p>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {userProfile?.display_name || 'Admin'}
            </p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="blog">
              <FileText className="w-4 h-4 mr-2" />
              Blog Management
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blog" className="space-y-6">
            <BlogManagement />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserManagement />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Configure your website settings and preferences here.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input
                    id="site-name"
                    value={content.hero.title}
                    onChange={(e) => setContent({
                      ...content,
                      hero: { ...content.hero, title: e.target.value }
                    })}
                  />
                </div>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminV2;