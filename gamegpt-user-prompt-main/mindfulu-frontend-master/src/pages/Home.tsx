import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/Layout';
import { useNavigate } from 'react-router-dom';
import { 
  Gamepad2, 
  Brain, 
  Target, 
  Sparkles,
  ArrowRight 
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Game Generation",
      description: "Create custom educational games using advanced AI technology"
    },
    {
      icon: Target,
      title: "Targeted Learning",
      description: "Games designed to meet specific learning objectives and age groups"
    },
    {
      icon: Gamepad2,
      title: "Interactive Experience",
      description: "Engaging gameplay that makes learning fun and memorable"
    },
    {
      icon: Sparkles,
      title: "Dynamic Content",
      description: "Unique game experiences generated based on your requirements"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Welcome to Dynamic Game Generator
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create personalized educational games powered by AI. Transform your learning objectives into engaging interactive experiences.
          </p>
          
          <Button 
            size="lg" 
            onClick={() => navigate('/dynamic')}
            className="text-lg px-8 py-6 h-auto"
          >
            <Gamepad2 className="mr-2 h-5 w-5" />
            Start Creating Games
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Start Section */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Describe Your Game</h3>
                <p className="text-muted-foreground">Tell us what kind of educational game you want to create</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">AI Generates Content</h3>
                <p className="text-muted-foreground">Our AI creates a custom game based on your requirements</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Play & Learn</h3>
                <p className="text-muted-foreground">Enjoy your personalized educational gaming experience</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}