import React, { useState, useRef, useEffect } from 'react';
import { musicianJokes, denveryLifeJokes, audioEngineerJokes } from './robHigginsContext';
import { trackChatAction, trackChatMessage } from '@/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface AIChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm Rob's AI assistant! 🤖 Ask me about Rob Higgins - his tech career, musical background, projects like JDOM or RC-10 Remote, his journey from audio engineer to AI systems leader, or life in Denver. If I don't know something, I'll share a joke about dogs, drummers, or mountain life! 🐕🥁🏔️",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const dogJokes = [
    "Why don't dogs make good DJs? Because they have such ruff beats! 🐕🎵",
    "What do you call a sleeping bull dog at a drum kit? A bull-dozer! 🐕💤",
    "Why did the dog go to the bank? To make a de-paws-it! But he should have learned TypeScript instead! 🐕💰",
    "What's a dog's favorite type of pizza? Pup-peroni! Just like Rob's favorite coding snack! 🐕🍕",
    "Why don't dogs ever pay off their credit cards? They only make the mini-mum payment! 🐕💳"
  ];

  const drummerJokes = [
    "Why do bands have bass players? To translate for the drummer! 🥁😄",
    "What did the drummer get on his IQ test? Drool! But at least Rob codes better than he drums! 🥁🧠",
    "How do you know when a drummer is at your door? The knocking speeds up and they don't know when to come in! 🥁🚪",
    "What's the difference between a drummer and a savings bond? Eventually a savings bond will mature and earn money! 🥁💰",
    "Why do drummer jokes exist? So bass players have something to laugh at! 🥁😂"
  ];

  const getRandomJoke = () => {
    const allJokes = [...dogJokes, ...drummerJokes, ...musicianJokes, ...denveryLifeJokes, ...audioEngineerJokes];
    return allJokes[Math.floor(Math.random() * allJokes.length)];
  };

  const shouldUseJoke = (query: string) => {
    const robKeywords = [
      'rob', 'higgins', 'experience', 'skill', 'project', 'work', 'developer', 'engineer', 
      'github', 'portfolio', 'ar', 'vr', 'react', 'typescript', 'javascript', 'music', 
      'guitar', 'drums', 'audio', 'denver', 'colorado', 'zion', 'illinois', 'chicago',
      'florida', 'panorama', 'snap', 'vertebrae', 'ai', 'ml', 'full sail', 'education', 
      'jdom', 'rc-10', 'father', 'family', 'surf', 'onewheel', 'pedal', 'born', 'live', 
      'background', 'career', 'job', 'current', 'three.js', 'webgl', '3d', 'fullstack',
      'moved', 'college', 'school', 'location', 'programming', 'coding', 'self-taught',
      'learned', 'years', 'decades', 'software', 'separator', 'stem', 'stems', 'vocals',
      'instruments', 'processing'
    ];
    const lowerQuery = query.toLowerCase();
    return !robKeywords.some(keyword => lowerQuery.includes(keyword));
  };

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay - responses based on comprehensive robHigginsContext knowledge base
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Check if question is about Rob using the comprehensive context
    if (shouldUseJoke(userMessage)) {
      return getRandomJoke();
    }

    // Personal/Background questions
    if (lowerMessage.includes('born') || lowerMessage.includes('from') || lowerMessage.includes('zion') || lowerMessage.includes('illinois') || lowerMessage.includes('background') || lowerMessage.includes('personal')) {
      return "Rob was born and raised in Zion, Illinois, near Chicago. He lived there until moving to Florida for college at Full Sail University. After graduating, he moved to Los Angeles for 14 years before settling in Denver 8 years ago. He brings Midwest work ethic, Southern hospitality, West Coast creativity, and mountain lifestyle balance!";
    }

    // Music/Audio questions
    if (lowerMessage.includes('music') || lowerMessage.includes('guitar') || lowerMessage.includes('drums') || lowerMessage.includes('audio') || lowerMessage.includes('musician') || lowerMessage.includes('pedal')) {
      return "Rob is a passionate musician who plays guitar, drums, and sings! He's an audio engineer with an AAS from Full Sail University (2003) and is Digidesign Certified in ProTools. His recent obsession is guitar pedals - he loves both playing music and building the tech that creates it. This musical background gives him a unique creative perspective in his coding work.";
    }

    // Education questions
    if (lowerMessage.includes('education') || lowerMessage.includes('school') || lowerMessage.includes('college') || lowerMessage.includes('full sail') || lowerMessage.includes('degree') || lowerMessage.includes('florida')) {
      return "Rob has an Associate of Arts and Sciences (AAS) in Recording Arts Technology from Full Sail University in Florida (2003) and is Digidesign Certified in ProTools 210M and 210P. However, he's been a self-taught software engineer for over 30 years - started learning and building projects for fun decades ago! His formal audio engineering education complements his extensive self-directed programming journey.";
    }

    // Location/Denver/LA questions
    if (lowerMessage.includes('denver') || lowerMessage.includes('colorado') || lowerMessage.includes('los angeles') || lowerMessage.includes('la') || lowerMessage.includes('live') || lowerMessage.includes('location') || lowerMessage.includes('moved')) {
      return "Rob's lived quite the geographic journey! Born near Chicago in Zion, Illinois (until 18), then moved to Florida for college at Full Sail University. After graduating, he spent 14 formative years in Los Angeles (perfect for the entertainment/tech scene), and has been in Denver for the past 8 years. From Midwest to Southeast to West Coast to Mountain West - quite the American tour!";
    }

    // Hobbies/Fun questions
    if (lowerMessage.includes('hobby') || lowerMessage.includes('fun') || lowerMessage.includes('surf') || lowerMessage.includes('onewheel') || lowerMessage.includes('father') || lowerMessage.includes('family')) {
      return "For fun, Rob plays guitar, drums, sings, and builds apps! He's also into surfing (those LA years), oneWheeling around Denver, and spending time with his family as a father. His recent obsession with guitar pedals shows how he combines his love for music with his technical skills - always building something cool!";
    }

    // GitHub repository questions  
    if (lowerMessage.includes('github') || lowerMessage.includes('repository') || lowerMessage.includes('repo')) {
      return "Rob's GitHub (https://github.com/higginsrob) showcases his diverse projects: RC-10 Remote (combining his drummer background with coding), JDOM library (published on NPM), and this portfolio site. His repositories span web development, AR/VR, and AI/ML, demonstrating his range from hardware integration to cutting-edge AI systems.";
    }

    // Programming/Coding experience questions
    if (lowerMessage.includes('programming') || lowerMessage.includes('coding') || lowerMessage.includes('self-taught') || lowerMessage.includes('learned') || lowerMessage.includes('years') || lowerMessage.includes('experience')) {
      return "Rob is a self-taught software engineer with over 30 years of experience! He started learning and building projects for fun decades ago and has continuously evolved with technology trends. This passion-driven approach spans multiple programming eras - from early personal computing to today's AI systems. His deep foundation gives him unique insights into software architecture and problem-solving.";
    }

    // Skills questions
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('typescript') || lowerMessage.includes('react')) {
      return "Rob's a Full Stack Developer with expert-level TypeScript (92%), React.js (95%), and JavaScript (95%). He's advanced in Three.js/WebGL for 3D work, Node.js for backend, and has strong AI/ML skills including LLMs and prompt engineering (85%). Built on 30+ years of self-taught programming experience, his skills are complemented by professional audio engineering background.";
    }

    // Current work/Panorama questions
    if (lowerMessage.includes('panorama') || lowerMessage.includes('current') || lowerMessage.includes('job') || lowerMessage.includes('head of engineering') || lowerMessage.includes('ai')) {
      return "Rob is currently Head of Engineering at Panorama AI Systems, where he leads teams building LLM and AI agent systems for business intelligence. His focus is on proving that LLMs can accurately answer business questions without hallucinations - a critical challenge in enterprise AI deployment. He's architecting secure data aggregation systems that power reliable AI systems.";
    }

    // Experience/Career questions
    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('career') || lowerMessage.includes('snap') || lowerMessage.includes('vertebrae')) {
      return "Rob's career spans audio engineering to cutting-edge tech leadership. He was Tech Lead at Snap Inc. (ARES Web SDK for AR), Senior Fullstack Engineer at Vertebrae (AR/VR experiences), and now heads engineering at Panorama AI. His journey from music production to AI systems shows his ability to adapt and excel across evolving technologies.";
    }

    // Project questions
    if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('jdom') || lowerMessage.includes('rc-10') || lowerMessage.includes('ares') || lowerMessage.includes('audio') || lowerMessage.includes('separator') || lowerMessage.includes('stem')) {
      return "Rob's projects reflect his diverse interests: JDOM (lightweight DOM library on NPM), RC-10 Remote (web interface for his Boss drum machine), Audio Separator + Stem Player (AI-powered audio processing tool that separates music into individual stems), ARES Web SDK (AR experiences for Snap), and 3D visualization tools. Each project combines his technical skills with creative problem-solving, especially where music and code intersect!";
    }

    // AR/VR questions
    if (lowerMessage.includes('ar') || lowerMessage.includes('vr') || lowerMessage.includes('three.js') || lowerMessage.includes('webgl') || lowerMessage.includes('3d')) {
      return "Rob's AR/VR expertise comes from hands-on work at Snap Inc. and Vertebrae, building enterprise AR SDKs, 3D product viewers, and Virtual Try On experiences. His Three.js/WebGL skills (88% proficiency) enable him to create immersive web experiences that bridge the physical and digital worlds.";
    }

    // Default response using context
    return "Rob Higgins is a self-taught software engineer with over 30 years of programming experience who currently heads engineering at Panorama AI Systems. From starting as a passion project decades ago to building cutting-edge AI systems, he combines his audio engineering background with deep technical expertise. Is there something specific about his 30+ year coding journey, projects, or skills you'd like to know more about?";
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const messageText = input.trim();
    
    // Track the message with the actual user text
    trackChatMessage(messageText);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await simulateAIResponse(input.trim());
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Woof! Something went wrong. Why don't dogs make good comedians? Because they only know one trick! 🐕😄",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          trackChatAction('open');
          onToggle();
        }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-50 group"
        aria-label="Open AI Chat"
      >
        <span className="text-2xl group-hover:scale-110 transition-transform">🤖</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white dark:bg-secondary-800 rounded-lg shadow-2xl border border-secondary-200 dark:border-secondary-700 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-700">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🤖</span>
          <div>
            <h3 className="font-semibold text-secondary-900 dark:text-white">Rob's AI Assistant</h3>
            <p className="text-xs text-secondary-600 dark:text-secondary-400">Ask me about Rob!</p>
          </div>
        </div>
        <button
          onClick={() => {
            trackChatAction('close');
            onToggle();
          }}
          className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 transition-colors"
          aria-label="Close chat"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-900 dark:text-white'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-secondary-100 dark:bg-secondary-700 text-secondary-900 dark:text-white p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-secondary-200 dark:border-secondary-700">
        <div className="flex space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Rob's projects, skills, or GitHub..."
            className="flex-1 p-2 border border-secondary-300 dark:border-secondary-600 rounded-lg resize-none bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-300 disabled:dark:bg-secondary-600 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;