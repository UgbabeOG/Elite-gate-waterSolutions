/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
}

export default function SEOHead({
  title = 'Elite Gate Water Enterprises | Professional Borehole Drilling & Solar Pumps Nigeria',
  description = 'Elite Gate Multi Enterprises is a premier water engineering contractor specializing in deep rock borehole drilling, industrial water treatment plants, geological mapping, and sustainable solar-powered stanchion systems across Abuja, Nasarawa, and nationwide Nigeria.',
  keywords = 'borehole drilling Nigeria, solar water pump Abuja, water treatment Nasarawa, water quality test Lagos, geophysics survey Nigeria, deep rock well drill, UPVC pressure casing, Samson Alacha water, Elite Gate Multi Enterprises',
  url = 'https://elitegatewater.com',
  image = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
}: SEOHeadProps) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to find or create meta tag
    const setMetaTag = (attrName: string, attrValue: string, contentValue: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // 2. Set Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'author', 'Elite Gate Multi Enterprises');

    // 3. Set Open Graph (Facebook / LinkedIn) Meta Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:site_name', 'Elite Gate Multi Enterprises');

    // 4. Set Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

  }, [title, description, keywords, url, image]);

  return null; // This component operates entirely via head side effects
}
