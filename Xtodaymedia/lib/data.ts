export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  featuredImage: string;
  isEditorsPick: boolean;
  views?: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  duration: string;
  views: number;
  publishedAt: string;
  thumbnail: string;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  spotifyId: string;
  season: number;
  episode: number;
  duration: string;
  publishedAt: string;
  thumbnail: string;
}

export interface TeamMember {
  id: string;
  name: string;
  username: string;
  role: string;
  bio: string;
  avatar: string;
  expertise: string[];
  social: {
    twitter?: string;
    linkedin?: string;
    email: string;
  };
}

export const categories = [
  'STEM', 
  'Social Studies', 
  'Politics', 
  'Philosophy', 
  'Art & Literature', 
  'Women Rights',
  'Science & Technology'
];

export const articles: Article[] = [];

export const videos: Video[] = [];

export const podcasts: Podcast[] = [];

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Buse Altunbağ',
    username: 'buse.altunbag',
    role: 'Founder',
    bio: 'Founder and chief editor of Vertias Today, a student-led journal amplifying youth perspectives across diverse fields. Personally focused on neuroscience and biology, with a strong commitment to women\'s rights and youth empowerment. Uses science communication as a platform to amplify underrepresented voices, oversees editorial strategy, curates impactful scientific content, and leads initiatives promoting equitable access to STEM education and awareness.',
    avatar: '/avatars/buse-altunbag.jpg',
    expertise: ['Academic Publishing', 'Student Leadership', 'Neuroscience', 'Biology', 'Women\'s Rights', 'Youth Empowerment'],
    social: {
      twitter: 'https://twitter.com/busealtunbag',
      linkedin: 'https://linkedin.com/in/busealtunbag',
      email: 'buse.altunbag@veritastoday.org'
    }
  },
  {
    id: '2',
    name: 'Mehmet Arda Gün',
    username: 'mehmet.arda.gun',
    role: 'Head of YouTube & Editor',
    bio: 'Head of YouTube operations and editor for Vertias Today, a student-led journal amplifying youth perspectives. Also, a young entrepreneur with an interest in economics, leveraging digital media and creative strategies to expand youth-driven initiatives. Oversees video content strategy, editorial processes, and innovative projects that combine communication, business insight, and social impact.',
    avatar: '/avatars/mehmet-arda.jpg',
    expertise: ['Digital Media', 'Economics', 'Youth Engagement', 'Video Content Strategy', 'Editorial Processes'],
    social: {
      twitter: 'https://twitter.com/mehmetardagun',
      linkedin: 'https://linkedin.com/in/mehmetardagun',
      email: 'mehmet.arda@veritastoday.org'
    }
  },
  {
    id: '3',
    name: 'Rumet Asan',
    username: 'rumet.asan',
    role: 'Technology Editor & Website Developer',
    bio: 'Student at Ruzgar Science School, specialized in web technologies and digital platform development. Manages Vertias Today\'s technology-focused content and actively participates in website development processes. Strengthens the platform\'s technical infrastructure with deep knowledge in modern web technologies and user experience.',
    avatar: '/avatars/rumet-asan.jpg',
    expertise: ['Web Technologies', 'Website Development', 'Digital Platform', 'User Experience'],
    social: {
      twitter: 'https://twitter.com/rumetasan',
      linkedin: 'https://linkedin.com/in/rumetasan',
      email: 'rumet.asan@veritastoday.org'
    }
  }
];

export const featuredContent = {
  hero: {
    title: 'The Middle East\'s largest student-led academic journal',
    subtitle: 'Delivering trustworthy journalism through articles, videos, and podcasts with a focus on user experience and accessibility.',
    image: '/images/hero-bg.jpg'
  },
  editorsPicks: [],
  latestArticles: [],
  featuredVideo: null,
  featuredPodcast: null
};