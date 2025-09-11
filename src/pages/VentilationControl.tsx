import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { 
  Fan, 
  Thermometer, 
  Wind, 
  ArrowLeft,
  RotateCcw,
  RotateCw,
  Globe,
  Settings,
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface VentilationData {
  temperature: number;
  fanSpeed: number;
  fanDirection: 'clockwise' | 'anticlockwise';
  autoMode: boolean;
  fanActive: boolean;
  airflowLevel: number;
}

const VentilationControl = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [ventilationData, setVentilationData] = useState<VentilationData>({
    temperature: 24.5,
    fanSpeed: 75,
    fanDirection: 'clockwise',
    autoMode: true,
    fanActive: true,
    airflowLevel: 82
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVentilationData(prev => {
        const newTemp = 24.5 + (Math.random() - 0.5) * 4;
        let newDirection = prev.fanDirection;
        let newSpeed = prev.fanSpeed;
        
        // Auto mode logic: temperature-based fan control
        if (prev.autoMode) {
          if (newTemp > 26) {
            newDirection = 'clockwise'; // Exhaust hot air
            newSpeed = Math.min(100, 60 + (newTemp - 26) * 10);
          } else if (newTemp < 22) {
            newDirection = 'anticlockwise'; // Pull in fresh air
            newSpeed = Math.max(30, 80 - (22 - newTemp) * 10);
          } else {
            newSpeed = 50; // Normal circulation
          }
        }

        return {
          ...prev,
          temperature: newTemp,
          fanSpeed: prev.autoMode ? newSpeed : prev.fanSpeed,
          fanDirection: prev.autoMode ? newDirection : prev.fanDirection,
          airflowLevel: 70 + Math.random() * 20
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const translations = {
    en: {
      title: "Smart Airflow Control",
      subtitle: "Temperature-Based Fan Logic System",
      backToDashboard: "Back to Dashboard",
      temperature: "Current Temperature",
      fanControl: "Fan Control Panel",
      fanSpeed: "Fan Speed",
      fanDirection: "Fan Direction",
      airflowLevel: "Airflow Level",
      autoMode: "Auto Mode",
      manualControl: "Manual Control",
      clockwise: "Clockwise (Exhaust)",
      anticlockwise: "Anticlockwise (Intake)",
      optimal: "Optimal",
      warning: "Warning",
      critical: "Critical",
      active: "Active",
      inactive: "Inactive",
      systemStatus: "System Status",
      tempOptimal: "Temperature within optimal range",
      tempHigh: "High temperature - Fan exhausting hot air",
      tempLow: "Low temperature - Fan pulling fresh air",
      autoModeDesc: "Smart logic manages airflow automatically",
      manualModeDesc: "Manual control of fan direction and speed"
    },
    hi: {
      title: "स्मार्ट वायुप्रवाह नियंत्रण",
      subtitle: "तापमान-आधारित पंखा तर्क प्रणाली",
      backToDashboard: "डैशबोर्ड पर वापस",
      temperature: "वर्तमान तापमान",
      fanControl: "पंखा नियंत्रण पैनल",
      fanSpeed: "पंखे की गति",
      fanDirection: "पंखे की दिशा",
      airflowLevel: "वायुप्रवाह स्तर",
      autoMode: "स्वचालित मोड",
      manualControl: "मैन्युअल नियंत्रण",
      clockwise: "दक्षिणावर्त (निकास)",
      anticlockwise: "वामावर्त (सेवन)",
      optimal: "उत्तम",
      warning: "चेतावनी",
      critical: "गंभीर",
      active: "सक्रिय",
      inactive: "निष्क्रिय",
      systemStatus: "सिस्टम स्थिति",
      tempOptimal: "तापमान उत्तम सीमा में",
      tempHigh: "उच्च तापमान - पंखा गर्म हवा निकाल रहा है",
      tempLow: "कम तापमान - पंखा ताजी हवा खींच रहा है",
      autoModeDesc: "स्मार्ट तर्क स्वचालित रूप से वायुप्रवाह प्रबंधित करता है",
      manualModeDesc: "पंखे की दिशा और गति का मैन्युअल नियंत्रण"
    }
  };

  const t = translations[language];

  const getTemperatureStatus = () => {
    if (ventilationData.temperature >= 22 && ventilationData.temperature <= 26) return 'optimal';
    if (ventilationData.temperature > 28 || ventilationData.temperature < 20) return 'critical';
    return 'warning';
  };

  const toggleFanDirection = () => {
    if (!ventilationData.autoMode) {
      setVentilationData(prev => ({
        ...prev,
        fanDirection: prev.fanDirection === 'clockwise' ? 'anticlockwise' : 'clockwise'
      }));
    }
  };

  const adjustFanSpeed = (delta: number) => {
    if (!ventilationData.autoMode) {
      setVentilationData(prev => ({
        ...prev,
        fanSpeed: Math.max(0, Math.min(100, prev.fanSpeed + delta))
      }));
    }
  };

  const toggleAutoMode = () => {
    setVentilationData(prev => ({
      ...prev,
      autoMode: !prev.autoMode
    }));
  };

  return (
    <div className="min-h-screen gradient-earth">
      <div className="max-w-7xl mx-auto space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="hover-scale bg-white/10 border-white/20 text-foreground hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft className="mr-2" size={16} />
            {t.backToDashboard}
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant={language === 'en' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
              className="hover-scale"
            >
              <Globe className="mr-2" size={16} />
              EN
            </Button>
            <Button
              variant={language === 'hi' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setLanguage('hi')}
              className="hover-scale"
            >
              <Globe className="mr-2" size={16} />
              हिं
            </Button>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
            <Wind className="text-accent animate-pulse" size={40} />
            {t.title}
          </h1>
          <p className="text-xl text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Main Control Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Temperature Monitor */}
          <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Thermometer className="text-accent" size={20} />
                {t.temperature}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold">
                  {ventilationData.temperature.toFixed(1)}°C
                </div>
                <Badge 
                  variant={getTemperatureStatus() === 'optimal' ? 'secondary' : 'destructive'}
                  className="px-3 py-1"
                >
                  {t[getTemperatureStatus() as keyof typeof t]}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Fan Visualization */}
          <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Fan className="text-accent" size={20} />
                {t.fanControl}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Fan 
                    size={80} 
                    className={`text-primary transition-all duration-300 ${
                      ventilationData.fanActive 
                        ? ventilationData.fanDirection === 'clockwise' 
                          ? 'animate-spin' 
                          : 'animate-[spin_1s_reverse_linear_infinite]'
                        : ''
                    }`}
                  />
                  <div className="absolute -bottom-2 -right-2">
                    {ventilationData.fanDirection === 'clockwise' ? (
                      <RotateCw className="text-accent" size={16} />
                    ) : (
                      <RotateCcw className="text-accent" size={16} />
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-sm">
                    {ventilationData.fanDirection === 'clockwise' ? t.clockwise : t.anticlockwise}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t.fanSpeed}: {ventilationData.fanSpeed}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Airflow Level */}
          <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Activity className="text-accent animate-pulse" size={20} />
                {t.airflowLevel}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-3xl font-bold text-center">
                  {ventilationData.airflowLevel.toFixed(0)}%
                </div>
                <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500 gradient-success"
                    style={{ width: `${ventilationData.airflowLevel}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Auto Mode Control */}
          <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings className="text-accent" size={20} />
                {ventilationData.autoMode ? t.autoMode : t.manualControl}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{t.autoMode}</span>
                <Switch 
                  checked={ventilationData.autoMode}
                  onCheckedChange={toggleAutoMode}
                  className="hover-scale"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {ventilationData.autoMode ? t.autoModeDesc : t.manualModeDesc}
              </p>
              
              {!ventilationData.autoMode && (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t.fanDirection}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleFanDirection}
                      className="hover-scale"
                    >
                      {ventilationData.fanDirection === 'clockwise' ? (
                        <RotateCw size={16} />
                      ) : (
                        <RotateCcw size={16} />
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t.fanSpeed}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => adjustFanSpeed(-10)}
                        className="hover-scale"
                      >
                        -
                      </Button>
                      <span className="px-3 py-1 bg-muted rounded text-sm">
                        {ventilationData.fanSpeed}%
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => adjustFanSpeed(10)}
                        className="hover-scale"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Activity className="text-accent" size={20} />
                {t.systemStatus}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {getTemperatureStatus() === 'optimal' && (
                <Alert className="border-success bg-success/10">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <AlertDescription className="text-success-foreground">
                    {t.tempOptimal}
                  </AlertDescription>
                </Alert>
              )}
              
              {ventilationData.temperature > 26 && (
                <Alert className="border-warning bg-warning/10">
                  <AlertTriangle className="h-4 w-4 text-warning animate-bounce-soft" />
                  <AlertDescription className="text-warning-foreground">
                    {t.tempHigh}
                  </AlertDescription>
                </Alert>
              )}
              
              {ventilationData.temperature < 22 && (
                <Alert className="border-primary bg-primary/10">
                  <Wind className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-primary-foreground">
                    {t.tempLow}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VentilationControl;