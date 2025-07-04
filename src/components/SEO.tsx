import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({ 
  title = "Tracemain - AI-Powered Solutions | Build Next-Gen AI Applications",
  description = "From LLM-powered agentic systems to advanced data science platforms, we help entrepreneurs and enterprises build cutting-edge AI solutions. Expert AI development team ready to transform your ideas into powerful applications.",
  keywords = "AI development, machine learning, data science, LLM, agentic systems, artificial intelligence, AI consulting, enterprise AI, AI applications, data analytics, predictive analytics, natural language processing, computer vision",
  image = "/og-image.jpg",
  url = "https://tracemain.com",
  type = "website"
}: SEOProps) => {
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Tracemain" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Tracemain" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Tracemain",
          "description": description,
          "url": url,
          "logo": "/lovable-uploads/1861a34a-e307-498c-a038-bb4d7d010a16.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-123-4567",
            "contactType": "customer service",
            "email": "hello@tracemain.com"
          },
          "sameAs": [
            "https://linkedin.com/company/tracemain",
            "https://twitter.com/tracemain"
          ],
          "services": [
            "AI Development",
            "Machine Learning",
            "Data Science",
            "LLM Implementation",
            "Enterprise AI Solutions"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;