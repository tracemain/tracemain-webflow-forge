import { useState, useEffect } from 'react';
import { 
  Settings, 
  FileText, 
  Users, 
  BarChart3, 
  Eye, 
  Edit3, 
  Trash2, 
  Plus,
  Save,
  Home,
  LogOut,
  Globe,
  Mail,
  Phone,
  MapPin,
  Image,
  Link,
  Calendar,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

// Import content data
import contentData from '@/data/content.json';
import blogsData from '@/data/blogs.json';

const AdminV2 = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [blogModalOpen, setBlogModalOpen] = useState(false);

  // Content state management
  const [content, setContent] = useState(contentData);
  const [blogs, setBlogs] = useState(blogsData.blogs);

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Tracemain Team',
    tags: '',
    featured: false,
    imageUrl: '/api/placeholder/800/400'
  });

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'hero', label: 'Hero Section', icon: Eye },
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'about', label: 'About Section', icon: Users },
    { id: 'contact', label: 'Contact Info', icon: Mail },
    { id: 'blog', label: 'Blog Management', icon: FileText },
    { id: 'seo', label: 'SEO Settings', icon: Globe },
  ];

  const handleSave = () => {
    // In a real implementation, this would save to your JSON files
    toast({
      title: "Content Saved",
      description: "Your changes have been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    });
  };

  const handleBlogSave = () => {
    if (selectedBlog) {
      // Update existing blog
      setBlogs(blogs.map(blog => 
        blog.id === selectedBlog.id 
          ? { ...blogForm, id: selectedBlog.id, publishDate: selectedBlog.publishDate, tags: blogForm.tags.split(',').map(t => t.trim()) }
          : blog
      ));
    } else {
      // Create new blog
      const newBlog = {
        ...blogForm,
        id: (blogs.length + 1).toString(),
        publishDate: new Date().toISOString().split('T')[0],
        tags: blogForm.tags.split(',').map(t => t.trim())
      };
      setBlogs([...blogs, newBlog]);
    }
    
    setBlogModalOpen(false);
    resetBlogForm();
    toast({
      title: selectedBlog ? "Blog Updated" : "Blog Created",
      description: "Blog post has been saved successfully.",
    });
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: 'Tracemain Team',
      tags: '',
      featured: false,
      imageUrl: '/api/placeholder/800/400'
    });
    setSelectedBlog(null);
  };

  const handleEditBlog = (blog: any) => {
    setSelectedBlog(blog);
    setBlogForm({
      ...blog,
      tags: blog.tags.join(', ')
    });
    setBlogModalOpen(true);
  };

  const handleDeleteBlog = (blogId: string) => {
    setBlogs(blogs.filter(blog => blog.id !== blogId));
    toast({
      title: "Blog Deleted",
      description: "Blog post has been deleted successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 glass border-r border-white/10 p-6">
        <div className="flex items-center mb-8">
          <img 
            src="/lovable-uploads/1861a34a-e307-498c-a038-bb4d7d010a16.png" 
            alt="Tracemain" 
            className="h-8 w-auto mr-3"
          />
          <span className="font-bold">CMS Admin</span>
        </div>

        <div className="mb-6 p-3 glass-card rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.email}
              </p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
        </div>

        <nav className="space-y-2 mb-8">
          <a 
            href="/"
            className="flex items-center px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-white/5 transition-colors group"
          >
            <Home className="w-5 h-5 mr-3" />
            Back to Website
          </a>
          
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors group ${
                activeTab === item.id 
                  ? 'bg-primary text-white' 
                  : 'text-muted-foreground hover:text-primary hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>

        <Button
          onClick={handleSignOut}
          variant="outline"
          className="w-full glass-button"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Content Management System</h1>
              <p className="text-muted-foreground">Manage your website content, blogs, and settings</p>
            </div>
            
            {(activeTab !== 'overview' && activeTab !== 'blog') && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="glass-button"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
                {isEditing && (
                  <Button onClick={handleSave} className="gradient-primary">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Total Blog Posts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{blogs.length}</div>
                    <p className="text-xs text-muted-foreground">Published articles</p>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                      <Eye className="w-4 h-4 mr-2" />
                      Featured Posts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{blogs.filter(blog => blog.featured).length}</div>
                    <p className="text-xs text-muted-foreground">Featured articles</p>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Services Listed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{content.services.items.length}</div>
                    <p className="text-xs text-muted-foreground">Active services</p>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Last Updated
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Today</div>
                    <p className="text-xs text-muted-foreground">Content updated</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogs.slice(0, 3).map((blog) => (
                      <div key={blog.id} className="flex items-center space-x-4 p-3 rounded-lg bg-white/5">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-medium">{blog.title}</p>
                          <p className="text-sm text-muted-foreground">Published on {blog.publishDate}</p>
                        </div>
                        <Badge variant={blog.featured ? "default" : "secondary"}>
                          {blog.featured ? "Featured" : "Standard"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Hero Section Tab */}
          {activeTab === 'hero' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Hero Section Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Badge Text</Label>
                    {isEditing ? (
                      <Input
                        value={content.hero.badge}
                        onChange={(e) => setContent({
                          ...content,
                          hero: { ...content.hero, badge: e.target.value }
                        })}
                        className="glass mt-2"
                      />
                    ) : (
                      <p className="text-muted-foreground mt-2">{content.hero.badge}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label>Main Title</Label>
                    {isEditing ? (
                      <Input
                        value={content.hero.title}
                        onChange={(e) => setContent({
                          ...content,
                          hero: { ...content.hero, title: e.target.value }
                        })}
                        className="glass mt-2"
                      />
                    ) : (
                      <p className="text-muted-foreground mt-2">{content.hero.title}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Subtitle</Label>
                  {isEditing ? (
                    <Textarea
                      value={content.hero.subtitle}
                      onChange={(e) => setContent({
                        ...content,
                        hero: { ...content.hero, subtitle: e.target.value }
                      })}
                      className="glass mt-2 min-h-[100px]"
                    />
                  ) : (
                    <p className="text-muted-foreground mt-2">{content.hero.subtitle}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Primary Button Text</Label>
                    {isEditing ? (
                      <Input
                        value={content.hero.primaryButton}
                        onChange={(e) => setContent({
                          ...content,
                          hero: { ...content.hero, primaryButton: e.target.value }
                        })}
                        className="glass mt-2"
                      />
                    ) : (
                      <p className="text-muted-foreground mt-2">{content.hero.primaryButton}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label>Secondary Button Text</Label>
                    {isEditing ? (
                      <Input
                        value={content.hero.secondaryButton}
                        onChange={(e) => setContent({
                          ...content,
                          hero: { ...content.hero, secondaryButton: e.target.value }
                        })}
                        className="glass mt-2"
                      />
                    ) : (
                      <p className="text-muted-foreground mt-2">{content.hero.secondaryButton}</p>
                    )}
                  </div>
                </div>

                {/* Hero Stats */}
                <div>
                  <Label className="text-lg font-semibold">Statistics</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {content.hero.stats.map((stat, index) => (
                      <Card key={index} className="glass-card">
                        <CardContent className="p-4">
                          <Label>Number</Label>
                          {isEditing ? (
                            <Input
                              value={stat.number}
                              onChange={(e) => {
                                const newStats = [...content.hero.stats];
                                newStats[index] = { ...stat, number: e.target.value };
                                setContent({
                                  ...content,
                                  hero: { ...content.hero, stats: newStats }
                                });
                              }}
                              className="glass mt-2 mb-2"
                            />
                          ) : (
                            <p className="text-muted-foreground mt-2 mb-2">{stat.number}</p>
                          )}
                          
                          <Label>Label</Label>
                          {isEditing ? (
                            <Input
                              value={stat.label}
                              onChange={(e) => {
                                const newStats = [...content.hero.stats];
                                newStats[index] = { ...stat, label: e.target.value };
                                setContent({
                                  ...content,
                                  hero: { ...content.hero, stats: newStats }
                                });
                              }}
                              className="glass mt-2"
                            />
                          ) : (
                            <p className="text-muted-foreground mt-2">{stat.label}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Services Section
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Section Title</Label>
                  {isEditing ? (
                    <Input
                      value={content.services.title}
                      onChange={(e) => setContent({
                        ...content,
                        services: { ...content.services, title: e.target.value }
                      })}
                      className="glass mt-2"
                    />
                  ) : (
                    <p className="text-muted-foreground mt-2">{content.services.title}</p>
                  )}
                </div>

                <div>
                  <Label>Section Subtitle</Label>
                  {isEditing ? (
                    <Textarea
                      value={content.services.subtitle}
                      onChange={(e) => setContent({
                        ...content,
                        services: { ...content.services, subtitle: e.target.value }
                      })}
                      className="glass mt-2"
                    />
                  ) : (
                    <p className="text-muted-foreground mt-2">{content.services.subtitle}</p>
                  )}
                </div>

                <div>
                  <Label className="text-lg font-semibold">Service Items</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {content.services.items.map((service, index) => (
                      <Card key={index} className="glass-card">
                        <CardContent className="p-4 space-y-4">
                          <div>
                            <Label>Service Title</Label>
                            {isEditing ? (
                              <Input
                                value={service.title}
                                onChange={(e) => {
                                  const newItems = [...content.services.items];
                                  newItems[index] = { ...service, title: e.target.value };
                                  setContent({
                                    ...content,
                                    services: { ...content.services, items: newItems }
                                  });
                                }}
                                className="glass mt-2"
                              />
                            ) : (
                              <p className="text-muted-foreground mt-2">{service.title}</p>
                            )}
                          </div>
                          
                          <div>
                            <Label>Description</Label>
                            {isEditing ? (
                              <Textarea
                                value={service.description}
                                onChange={(e) => {
                                  const newItems = [...content.services.items];
                                  newItems[index] = { ...service, description: e.target.value };
                                  setContent({
                                    ...content,
                                    services: { ...content.services, items: newItems }
                                  });
                                }}
                                className="glass mt-2 min-h-[80px]"
                              />
                            ) : (
                              <p className="text-muted-foreground mt-2">{service.description}</p>
                            )}
                          </div>

                          <div>
                            <Label>Features (comma-separated)</Label>
                            {isEditing ? (
                              <Textarea
                                value={service.features.join(', ')}
                                onChange={(e) => {
                                  const newItems = [...content.services.items];
                                  newItems[index] = { 
                                    ...service, 
                                    features: e.target.value.split(',').map(f => f.trim())
                                  };
                                  setContent({
                                    ...content,
                                    services: { ...content.services, items: newItems }
                                  });
                                }}
                                className="glass mt-2"
                              />
                            ) : (
                              <div className="mt-2 space-y-1">
                                {service.features.map((feature, featureIndex) => (
                                  <Badge key={featureIndex} variant="secondary" className="mr-2 mb-1">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* About Section Tab */}
          {activeTab === 'about' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  About Section
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Section Title</Label>
                  {isEditing ? (
                    <Input
                      value={content.about.title}
                      onChange={(e) => setContent({
                        ...content,
                        about: { ...content.about, title: e.target.value }
                      })}
                      className="glass mt-2"
                    />
                  ) : (
                    <p className="text-muted-foreground mt-2">{content.about.title}</p>
                  )}
                </div>

                <div>
                  <Label>Description Paragraphs</Label>
                  {content.about.description.map((paragraph, index) => (
                    <div key={index} className="mt-4">
                      <Label className="text-sm">Paragraph {index + 1}</Label>
                      {isEditing ? (
                        <Textarea
                          value={paragraph}
                          onChange={(e) => {
                            const newDescription = [...content.about.description];
                            newDescription[index] = e.target.value;
                            setContent({
                              ...content,
                              about: { ...content.about, description: newDescription }
                            });
                          }}
                          className="glass mt-2 min-h-[100px]"
                        />
                      ) : (
                        <p className="text-muted-foreground mt-2">{paragraph}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <Label>Achievements</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {content.about.achievements.map((achievement, index) => (
                      <div key={index}>
                        {isEditing ? (
                          <Input
                            value={achievement}
                            onChange={(e) => {
                              const newAchievements = [...content.about.achievements];
                              newAchievements[index] = e.target.value;
                              setContent({
                                ...content,
                                about: { ...content.about, achievements: newAchievements }
                              });
                            }}
                            className="glass"
                          />
                        ) : (
                          <Badge variant="outline" className="w-full justify-start p-3">
                            {achievement}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-semibold">Company Values</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {content.about.values.map((value, index) => (
                      <Card key={index} className="glass-card">
                        <CardContent className="p-4 space-y-4">
                          <div>
                            <Label>Value Title</Label>
                            {isEditing ? (
                              <Input
                                value={value.title}
                                onChange={(e) => {
                                  const newValues = [...content.about.values];
                                  newValues[index] = { ...value, title: e.target.value };
                                  setContent({
                                    ...content,
                                    about: { ...content.about, values: newValues }
                                  });
                                }}
                                className="glass mt-2"
                              />
                            ) : (
                              <p className="text-muted-foreground mt-2 font-medium">{value.title}</p>
                            )}
                          </div>
                          
                          <div>
                            <Label>Description</Label>
                            {isEditing ? (
                              <Textarea
                                value={value.description}
                                onChange={(e) => {
                                  const newValues = [...content.about.values];
                                  newValues[index] = { ...value, description: e.target.value };
                                  setContent({
                                    ...content,
                                    about: { ...content.about, values: newValues }
                                  });
                                }}
                                className="glass mt-2 min-h-[80px]"
                              />
                            ) : (
                              <p className="text-muted-foreground mt-2">{value.description}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Section Title</Label>
                  {isEditing ? (
                    <Input
                      value={content.contact.title}
                      onChange={(e) => setContent({
                        ...content,
                        contact: { ...content.contact, title: e.target.value }
                      })}
                      className="glass mt-2"
                    />
                  ) : (
                    <p className="text-muted-foreground mt-2">{content.contact.title}</p>
                  )}
                </div>

                <div>
                  <Label>Section Subtitle</Label>
                  {isEditing ? (
                    <Textarea
                      value={content.contact.subtitle}
                      onChange={(e) => setContent({
                        ...content,
                        contact: { ...content.contact, subtitle: e.target.value }
                      })}
                      className="glass mt-2"
                    />
                  ) : (
                    <p className="text-muted-foreground mt-2">{content.contact.subtitle}</p>
                  )}
                </div>

                <div>
                  <Label className="text-lg font-semibold">Contact Information</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {content.contact.info.map((info, index) => (
                      <Card key={index} className="glass-card">
                        <CardContent className="p-4 space-y-4">
                          <div className="flex items-center space-x-2">
                            {info.title === 'Email Us' && <Mail className="w-4 h-4" />}
                            {info.title === 'Call Us' && <Phone className="w-4 h-4" />}
                            {info.title === 'Visit Us' && <MapPin className="w-4 h-4" />}
                            <Label>Title</Label>
                          </div>
                          {isEditing ? (
                            <Input
                              value={info.title}
                              onChange={(e) => {
                                const newInfo = [...content.contact.info];
                                newInfo[index] = { ...info, title: e.target.value };
                                setContent({
                                  ...content,
                                  contact: { ...content.contact, info: newInfo }
                                });
                              }}
                              className="glass"
                            />
                          ) : (
                            <p className="text-muted-foreground">{info.title}</p>
                          )}
                          
                          <div>
                            <Label>Value</Label>
                            {isEditing ? (
                              <Input
                                value={info.value}
                                onChange={(e) => {
                                  const newInfo = [...content.contact.info];
                                  newInfo[index] = { ...info, value: e.target.value };
                                  setContent({
                                    ...content,
                                    contact: { ...content.contact, info: newInfo }
                                  });
                                }}
                                className="glass mt-2"
                              />
                            ) : (
                              <p className="text-muted-foreground mt-2">{info.value}</p>
                            )}
                          </div>
                          
                          <div>
                            <Label>Link/URL</Label>
                            {isEditing ? (
                              <Input
                                value={info.href}
                                onChange={(e) => {
                                  const newInfo = [...content.contact.info];
                                  newInfo[index] = { ...info, href: e.target.value };
                                  setContent({
                                    ...content,
                                    contact: { ...content.contact, info: newInfo }
                                  });
                                }}
                                className="glass mt-2"
                              />
                            ) : (
                              <p className="text-muted-foreground mt-2">{info.href}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Blog Management Tab */}
          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Blog Management</h2>
                <Button 
                  onClick={() => {
                    resetBlogForm();
                    setBlogModalOpen(true);
                  }}
                  className="gradient-primary"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </div>

              <div className="grid gap-4">
                {blogs.map(blog => (
                  <Card key={blog.id} className="glass-card">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{blog.title}</h3>
                            {blog.featured && (
                              <Badge className="bg-primary">Featured</Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-3">{blog.excerpt}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {blog.publishDate}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {blog.author}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-3">
                            {blog.tags.map((tag: string, tagIndex: number) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline" className="glass-button">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="glass-button"
                            onClick={() => handleEditBlog(blog)}
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="glass-button text-destructive"
                            onClick={() => handleDeleteBlog(blog.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Blog Modal */}
              {blogModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <Card className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <CardHeader>
                      <CardTitle>
                        {selectedBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={blogForm.title}
                            onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                            className="glass mt-2"
                            placeholder="Blog post title"
                          />
                        </div>
                        <div>
                          <Label>Slug</Label>
                          <Input
                            value={blogForm.slug}
                            onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                            className="glass mt-2"
                            placeholder="blog-post-slug"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Excerpt</Label>
                        <Textarea
                          value={blogForm.excerpt}
                          onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                          className="glass mt-2"
                          placeholder="Brief description of the blog post"
                        />
                      </div>

                      <div>
                        <Label>Content (Markdown)</Label>
                        <Textarea
                          value={blogForm.content}
                          onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                          className="glass mt-2 min-h-[200px]"
                          placeholder="Write your blog content in Markdown format..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Author</Label>
                          <Input
                            value={blogForm.author}
                            onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                            className="glass mt-2"
                          />
                        </div>
                        <div>
                          <Label>Tags (comma-separated)</Label>
                          <Input
                            value={blogForm.tags}
                            onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                            className="glass mt-2"
                            placeholder="AI, Technology, Innovation"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={blogForm.featured}
                          onCheckedChange={(checked) => setBlogForm({ ...blogForm, featured: checked })}
                        />
                        <Label>Featured Post</Label>
                      </div>

                      <div>
                        <Label>Featured Image URL</Label>
                        <Input
                          value={blogForm.imageUrl}
                          onChange={(e) => setBlogForm({ ...blogForm, imageUrl: e.target.value })}
                          className="glass mt-2"
                          placeholder="/api/placeholder/800/400"
                        />
                      </div>

                      <div className="flex justify-end space-x-4 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setBlogModalOpen(false)}
                          className="glass-button"
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleBlogSave} className="gradient-primary">
                          {selectedBlog ? 'Update Post' : 'Create Post'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* SEO Settings Tab */}
          {activeTab === 'seo' && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  SEO Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Site Title</Label>
                  <Input
                    placeholder="Tracemain - AI-Powered Solutions"
                    className="glass mt-2"
                  />
                </div>

                <div>
                  <Label>Meta Description</Label>
                  <Textarea
                    placeholder="Build next-generation AI applications with Tracemain's expert team. From LLM-powered agentic systems to data science platforms."
                    className="glass mt-2"
                  />
                </div>

                <div>
                  <Label>Keywords</Label>
                  <Textarea
                    placeholder="AI development, machine learning, data science, LLM, agentic systems"
                    className="glass mt-2"
                  />
                </div>

                <div>
                  <Label>Open Graph Image URL</Label>
                  <Input
                    placeholder="/og-image.jpg"
                    className="glass mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Twitter Handle</Label>
                    <Input
                      placeholder="@tracemain"
                      className="glass mt-2"
                    />
                  </div>
                  <div>
                    <Label>LinkedIn URL</Label>
                    <Input
                      placeholder="https://linkedin.com/company/tracemain"
                      className="glass mt-2"
                    />
                  </div>
                </div>

                <Button className="gradient-primary">
                  <Save className="w-4 h-4 mr-2" />
                  Save SEO Settings
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminV2;