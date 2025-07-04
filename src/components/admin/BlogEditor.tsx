import { useEffect, useRef, useState } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Code from '@editorjs/code';
import Image from '@editorjs/image';
import SimpleImage from '@editorjs/simple-image';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ImageUpload from './ImageUpload';

interface BlogEditorProps {
  initialData?: {
    title: string;
    slug: string;
    excerpt: string;
    content: OutputData;
    hero_image_url: string;
    tags: string[];
    featured: boolean;
    published: boolean;
  };
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const BlogEditor = ({ initialData, onSave, onCancel, isLoading }: BlogEditorProps) => {
  const editorRef = useRef<EditorJS | null>(null);
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [heroImageUrl, setHeroImageUrl] = useState(initialData?.hero_image_url || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [published, setPublished] = useState(initialData?.published || false);
  const [previewData, setPreviewData] = useState<OutputData | null>(initialData?.content || null);

  // Handle file upload for EditorJS
  const uploadFile = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-content')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('blog-content')
        .getPublicUrl(filePath);

      return {
        success: 1,
        file: {
          url: data.publicUrl,
          name: file.name,
          size: file.size
        }
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: 0,
        message: 'Upload failed'
      };
    }
  };

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: 'editor',
        placeholder: 'Start writing your blog post...',
        data: initialData?.content || { blocks: [] },
        onChange: async () => {
          if (editorRef.current) {
            try {
              const outputData = await editorRef.current.save();
              setPreviewData(outputData);
            } catch (error) {
              console.log('Error getting editor data:', error);
            }
          }
        },
        tools: {
          header: {
            class: Header,
            config: {
              levels: [1, 2, 3, 4],
              defaultLevel: 2
            }
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true
          },
          list: {
            class: List,
            inlineToolbar: true
          },
          quote: {
            class: Quote,
            inlineToolbar: true
          },
          code: Code,
          image: {
            class: Image,
            config: {
              uploader: {
                uploadByFile: uploadFile,
              }
            }
          },
          simpleImage: {
            class: SimpleImage,
            inlineToolbar: true
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: 'https://jsonkeeper.com/b/VHYC' // Mock endpoint, you can implement your own
            }
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                vimeo: true,
                imgur: true,
                twitter: true,
                instagram: true
              }
            }
          }
        }
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!initialData) {
      setSlug(generateSlug(value));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    if (!editorRef.current) return;

    try {
      const content = await editorRef.current.save();
      
      const blogData = {
        title,
        slug,
        excerpt,
        content,
        hero_image_url: heroImageUrl,
        tags,
        featured,
        published
      };

      onSave(blogData);
    } catch (error) {
      console.error('Error saving blog post:', error);
    }
  };

  const renderPreview = (content: any) => {
    if (!content || !content.blocks) return null;

    return content.blocks.map((block: any, index: number) => {
      switch (block.type) {
        case 'header':
          const HeaderTag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
          return (
            <HeaderTag key={index} className={`font-bold mb-4 ${
              block.data.level === 1 ? 'text-3xl' : 
              block.data.level === 2 ? 'text-2xl' : 
              block.data.level === 3 ? 'text-xl' : 'text-lg'
            }`}>
              {block.data.text}
            </HeaderTag>
          );
        case 'paragraph':
          return (
            <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
              {block.data.text}
            </p>
          );
        case 'list':
          return block.data.style === 'ordered' ? (
            <ol key={index} className="list-decimal list-inside mb-4 text-muted-foreground">
              {block.data.items.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className="mb-1">{item}</li>
              ))}
            </ol>
          ) : (
            <ul key={index} className="list-disc list-inside mb-4 text-muted-foreground">
              {block.data.items.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className="mb-1">{item}</li>
              ))}
            </ul>
          );
        case 'quote':
          return (
            <blockquote key={index} className="border-l-4 border-primary pl-4 py-2 mb-4 italic text-muted-foreground">
              {block.data.text}
              {block.data.caption && (
                <cite className="block text-sm mt-2 text-muted-foreground/70">
                  — {block.data.caption}
                </cite>
              )}
            </blockquote>
          );
        case 'code':
          return (
            <pre key={index} className="bg-muted p-4 rounded-lg mb-4 overflow-x-auto">
              <code className="text-sm">{block.data.code}</code>
            </pre>
          );
        case 'image':
        case 'simpleImage':
          return (
            <div key={index} className="mb-4">
              <img 
                src={block.data.file?.url || block.data.url} 
                alt={block.data.caption || ''} 
                className="w-full rounded-lg"
              />
              {block.data.caption && (
                <p className="text-sm text-muted-foreground mt-2 text-center italic">
                  {block.data.caption}
                </p>
              )}
            </div>
          );
        case 'embed':
          return (
            <div key={index} className="mb-4">
              <div className="aspect-video">
                <iframe
                  src={block.data.embed}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
              {block.data.caption && (
                <p className="text-sm text-muted-foreground mt-2 text-center italic">
                  {block.data.caption}
                </p>
              )}
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {initialData ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Post'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    id="editor" 
                    className="min-h-[400px] prose prose-lg max-w-none"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter blog post title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="blog-post-url-slug"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Brief description of your blog post"
                      rows={3}
                    />
                  </div>

                  <ImageUpload
                    value={heroImageUrl}
                    onChange={setHeroImageUrl}
                    label="Hero Image"
                    placeholder="Upload or enter hero image URL"
                  />

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X 
                            className="w-3 h-3 cursor-pointer" 
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={featured}
                        onCheckedChange={setFeatured}
                      />
                      <Label htmlFor="featured">Featured Post</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={published}
                        onCheckedChange={setPublished}
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <article className="max-w-4xl">
                {heroImageUrl && (
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-8 overflow-hidden">
                    <img 
                      src={heroImageUrl} 
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-4 gradient-text">
                    {title || 'Untitled Post'}
                  </h1>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map(tag => (
                      <span 
                        key={tag}
                        className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {excerpt && (
                    <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                      {excerpt}
                    </p>
                  )}
                </div>

                <div className="prose prose-lg max-w-none">
                  {previewData && renderPreview(previewData)}
                </div>
              </article>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogEditor;