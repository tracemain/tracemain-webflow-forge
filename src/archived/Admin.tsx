// import { useState } from 'react';
// import { 
//   Settings, 
//   FileText, 
//   Users, 
//   BarChart3, 
//   Eye, 
//   Edit3, 
//   Trash2, 
//   Plus,
//   Save,
//   Home
// } from 'lucide-react';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Textarea } from '../components/ui/textarea';
// import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

// const Admin = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isEditing, setIsEditing] = useState(false);

//   // Mock data - in real implementation, this would come from your JSON files
//   const [contentData, setContentData] = useState({
//     hero: {
//       title: "Build Next-Gen AI Applications",
//       subtitle: "From LLM-powered agentic systems to advanced data science platforms, we help entrepreneurs and enterprises build cutting-edge AI solutions.",
//       primaryButton: "Start Your Project",
//       secondaryButton: "View Our Work"
//     },
//     about: {
//       title: "About Tracemain",
//       description: "Tracemain is a pioneering AI development company that specializes in creating next-generation artificial intelligence solutions."
//     }
//   });

//   const sidebarItems = [
//     { id: 'overview', label: 'Overview', icon: BarChart3 },
//     { id: 'content', label: 'Content Management', icon: FileText },
//     { id: 'blog', label: 'Blog Management', icon: Edit3 },
//     { id: 'settings', label: 'Settings', icon: Settings },
//   ];

//   const handleSave = () => {
//     // In a real implementation, this would save to your JSON files
//     console.log('Saving content:', contentData);
//     setIsEditing(false);
//     // Here you would implement the actual save functionality
//   };

//   return (
//     <div className="min-h-screen bg-background flex">
//       {/* Sidebar */}
//       <div className="w-64 glass border-r border-white/10 p-6">
//         <div className="flex items-center mb-8">
//           <img 
//             src="/lovable-uploads/1861a34a-e307-498c-a038-bb4d7d010a16.png" 
//             alt="Tracemain" 
//             className="h-8 w-auto mr-3"
//           />
//           <span className="font-bold">Admin Panel</span>
//         </div>

//         <nav className="space-y-2">
//           <a 
//             href="/"
//             className="flex items-center px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-white/5 transition-colors group"
//           >
//             <Home className="w-5 h-5 mr-3" />
//             Back to Website
//           </a>
          
//           {sidebarItems.map(item => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors group ${
//                 activeTab === item.id 
//                   ? 'bg-primary text-white' 
//                   : 'text-muted-foreground hover:text-primary hover:bg-white/5'
//               }`}
//             >
//               <item.icon className="w-5 h-5 mr-3" />
//               {item.label}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//               <p className="text-muted-foreground">Manage your website content and settings</p>
//             </div>
            
//             {activeTab === 'content' && (
//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   onClick={() => setIsEditing(!isEditing)}
//                   className="glass-button"
//                 >
//                   <Edit3 className="w-4 h-4 mr-2" />
//                   {isEditing ? 'Cancel' : 'Edit'}
//                 </Button>
//                 {isEditing && (
//                   <Button onClick={handleSave} className="gradient-primary">
//                     <Save className="w-4 h-4 mr-2" />
//                     Save Changes
//                   </Button>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Overview Tab */}
//           {activeTab === 'overview' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               <Card className="glass-card">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium text-muted-foreground">
//                     Total Blog Posts
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">12</div>
//                   <p className="text-xs text-muted-foreground">+2 from last month</p>
//                 </CardContent>
//               </Card>

//               <Card className="glass-card">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium text-muted-foreground">
//                     Page Views
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">1,234</div>
//                   <p className="text-xs text-muted-foreground">+15% from last month</p>
//                 </CardContent>
//               </Card>

//               <Card className="glass-card">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium text-muted-foreground">
//                     Contact Forms
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">45</div>
//                   <p className="text-xs text-muted-foreground">+8 from last week</p>
//                 </CardContent>
//               </Card>

//               <Card className="glass-card">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium text-muted-foreground">
//                     Last Updated
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">Today</div>
//                   <p className="text-xs text-muted-foreground">Content published</p>
//                 </CardContent>
//               </Card>
//             </div>
//           )}

//           {/* Content Management Tab */}
//           {activeTab === 'content' && (
//             <div className="space-y-8">
//               {/* Hero Section */}
//               <Card className="glass-card">
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <Eye className="w-5 h-5 mr-2" />
//                     Hero Section
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Main Title</label>
//                     {isEditing ? (
//                       <Input
//                         value={contentData.hero.title}
//                         onChange={(e) => setContentData({
//                           ...contentData,
//                           hero: { ...contentData.hero, title: e.target.value }
//                         })}
//                         className="glass"
//                       />
//                     ) : (
//                       <p className="text-muted-foreground">{contentData.hero.title}</p>
//                     )}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Subtitle</label>
//                     {isEditing ? (
//                       <Textarea
//                         value={contentData.hero.subtitle}
//                         onChange={(e) => setContentData({
//                           ...contentData,
//                           hero: { ...contentData.hero, subtitle: e.target.value }
//                         })}
//                         className="glass"
//                       />
//                     ) : (
//                       <p className="text-muted-foreground">{contentData.hero.subtitle}</p>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Primary Button</label>
//                       {isEditing ? (
//                         <Input
//                           value={contentData.hero.primaryButton}
//                           onChange={(e) => setContentData({
//                             ...contentData,
//                             hero: { ...contentData.hero, primaryButton: e.target.value }
//                           })}
//                           className="glass"
//                         />
//                       ) : (
//                         <p className="text-muted-foreground">{contentData.hero.primaryButton}</p>
//                       )}
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Secondary Button</label>
//                       {isEditing ? (
//                         <Input
//                           value={contentData.hero.secondaryButton}
//                           onChange={(e) => setContentData({
//                             ...contentData,
//                             hero: { ...contentData.hero, secondaryButton: e.target.value }
//                           })}
//                           className="glass"
//                         />
//                       ) : (
//                         <p className="text-muted-foreground">{contentData.hero.secondaryButton}</p>
//                       )}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* About Section */}
//               <Card className="glass-card">
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <Users className="w-5 h-5 mr-2" />
//                     About Section
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Section Title</label>
//                     {isEditing ? (
//                       <Input
//                         value={contentData.about.title}
//                         onChange={(e) => setContentData({
//                           ...contentData,
//                           about: { ...contentData.about, title: e.target.value }
//                         })}
//                         className="glass"
//                       />
//                     ) : (
//                       <p className="text-muted-foreground">{contentData.about.title}</p>
//                     )}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Description</label>
//                     {isEditing ? (
//                       <Textarea
//                         value={contentData.about.description}
//                         onChange={(e) => setContentData({
//                           ...contentData,
//                           about: { ...contentData.about, description: e.target.value }
//                         })}
//                         className="glass min-h-[100px]"
//                       />
//                     ) : (
//                       <p className="text-muted-foreground">{contentData.about.description}</p>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           )}

//           {/* Blog Management Tab */}
//           {activeTab === 'blog' && (
//             <div className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-2xl font-bold">Blog Management</h2>
//                 <Button className="gradient-primary">
//                   <Plus className="w-4 h-4 mr-2" />
//                   New Post
//                 </Button>
//               </div>

//               <div className="grid gap-4">
//                 {/* Mock blog posts */}
//                 {[1, 2, 3].map(post => (
//                   <Card key={post} className="glass-card">
//                     <CardContent className="p-4">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h3 className="font-semibold">Blog Post Title {post}</h3>
//                           <p className="text-sm text-muted-foreground">Published on Jan 15, 2024</p>
//                         </div>
//                         <div className="flex gap-2">
//                           <Button size="sm" variant="outline" className="glass-button">
//                             <Eye className="w-4 h-4" />
//                           </Button>
//                           <Button size="sm" variant="outline" className="glass-button">
//                             <Edit3 className="w-4 h-4" />
//                           </Button>
//                           <Button size="sm" variant="outline" className="glass-button text-destructive">
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Settings Tab */}
//           {activeTab === 'settings' && (
//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold">Settings</h2>
              
//               <Card className="glass-card">
//                 <CardHeader>
//                   <CardTitle>General Settings</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Site Title</label>
//                     <Input placeholder="Tracemain" className="glass" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Site Description</label>
//                     <Textarea placeholder="AI-powered solutions company..." className="glass" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Contact Email</label>
//                     <Input placeholder="hello@tracemain.com" className="glass" />
//                   </div>
//                   <Button className="gradient-primary">Save Settings</Button>
//                 </CardContent>
//               </Card>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;