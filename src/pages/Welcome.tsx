import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sprout, Shield, Users, ChevronRight } from 'lucide-react';
import heroImage from '@/assets/smart-farm-hero.jpg';

const Welcome = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const onboardingScreens = [
    {
      title: "Explore Smart Farming",
      subtitle: "Monitor your crops with advanced IoT sensors. Real-time data at your fingertips.",
      background: heroImage,
      buttonText: "Get Started",
      icon: Sprout,
      gradient: "from-green-600/80 via-green-700/70 to-green-800/90"
    },
    {
      title: "Your Crops, Our Priority",
      subtitle: "Advanced monitoring systems ensure optimal growing conditions 24/7.",
      background: "linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)",
      buttonText: "Continue",
      icon: Shield,
      illustration: true
    }
  ];

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-8xl font-bold text-white mb-4 animate-pulse-glow">
            01
          </div>
          <div className="flex items-center justify-center gap-2 text-white/80">
            <Sprout className="animate-bounce-soft" size={20} />
            <span className="text-lg">Loading Smart Farm</span>
          </div>
        </div>
      </div>
    );
  }

  const currentScreen = onboardingScreens[currentStep];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      {typeof currentScreen.background === 'string' && currentScreen.background.includes('gradient') ? (
        <div 
          className="absolute inset-0"
          style={{ background: currentScreen.background }}
        />
      ) : (
        <>
          <img 
            src={currentScreen.background as string}
            alt="Smart farming background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${currentScreen.gradient}`} />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Skip Button */}
        <div className="flex justify-end p-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            Skip
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-6 text-center text-white">
          {/* Illustration Area */}
          <div className="mb-12 animate-scale-in">
            {currentScreen.illustration ? (
              <div className="relative mx-auto w-64 h-64 mb-8">
                {/* Animated farmer illustration using icons */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4">
                    <Users className="text-white animate-bounce-soft" size={48} style={{ animationDelay: '0s' }} />
                    <currentScreen.icon className="text-white animate-bounce-soft" size={56} style={{ animationDelay: '0.2s' }} />
                    <Sprout className="text-white animate-bounce-soft" size={48} style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute top-8 left-8 w-4 h-4 bg-white/30 rounded-full animate-pulse" />
                <div className="absolute bottom-12 right-8 w-3 h-3 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-1/2 left-4 w-2 h-2 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            ) : (
              <currentScreen.icon className="mx-auto text-white animate-pulse-glow" size={72} />
            )}
          </div>

          {/* Text Content */}
          <div className="mb-16 space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {currentScreen.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-md mx-auto leading-relaxed">
              {currentScreen.subtitle}
            </p>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {onboardingScreens.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-6 space-y-4">
          {currentStep < onboardingScreens.length - 1 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="w-full h-14 text-lg font-semibold bg-white text-primary hover:bg-white/90 animate-scale-in hover-scale"
              style={{ animationDelay: '0.6s' }}
            >
              <span>{currentScreen.buttonText}</span>
              <ChevronRight className="ml-2" size={20} />
            </Button>
          ) : (
            <Button
              onClick={() => navigate('/dashboard')}
              className="w-full h-14 text-lg font-semibold bg-white text-primary hover:bg-white/90 animate-scale-in hover-scale"
              style={{ animationDelay: '0.6s' }}
            >
              <span>Enter Dashboard</span>
              <ArrowRight className="ml-2" size={20} />
            </Button>
          )}

          {/* Alternative action */}
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="w-full text-white/80 hover:text-white hover:bg-white/10"
          >
            Go directly to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;