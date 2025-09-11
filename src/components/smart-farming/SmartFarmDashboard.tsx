import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import heroImage from '@/assets/smart-farm-hero.jpg';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  Fan,
  Sprout,
  Globe,
  Activity
} from 'lucide-react';

interface SensorData {
  temperature: number;
  humidity: number;
  ethylene: number;
  ventilation: boolean;
  irrigation: boolean;
  lighting: boolean;
  autoVentilation: boolean;
}

const SmartFarmDashboard = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 24.5,
    humidity: 62,
    ethylene: 2.3,
    ventilation: false,
    irrigation: true,
    lighting: true,
    autoVentilation: true,
  });

  // Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        temperature: 24.5 + (Math.random() - 0.5) * 2,
        humidity: 62 + (Math.random() - 0.5) * 8,
        ethylene: 2.3 + (Math.random() - 0.5) * 0.8,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const translations = {
    en: {
      title: "Smart Farm Control Center",
      subtitle: "Real-time monitoring and control system",
      temperature: "Temperature",
      humidity: "Humidity",
      ethylene: "Ethylene Gas",
      controls: "System Controls",
      ventilation: "Ventilation",
      irrigation: "Irrigation",
      lighting: "LED Lighting",
      autoVent: "Auto Ventilation",
      alerts: "System Alerts",
      optimal: "Optimal",
      warning: "Warning",
      critical: "Critical",
      ethyleneAlert: "Ethylene levels indicate accelerated ripening",
      tempAlert: "Temperature outside optimal range",
      active: "Active",
      inactive: "Inactive",
      on: "ON",
      off: "OFF"
    },
    es: {
      title: "Centro de Control Agrícola Inteligente",
      subtitle: "Sistema de monitoreo y control en tiempo real",
      temperature: "Temperatura",
      humidity: "Humedad",
      ethylene: "Gas Etileno",
      controls: "Controles del Sistema",
      ventilation: "Ventilación",
      irrigation: "Riego",
      lighting: "Iluminación LED",
      autoVent: "Ventilación Automática",
      alerts: "Alertas del Sistema",
      optimal: "Óptimo",
      warning: "Advertencia",
      critical: "Crítico",
      ethyleneAlert: "Los niveles de etileno indican maduración acelerada",
      tempAlert: "Temperatura fuera del rango óptimo",
      active: "Activo",
      inactive: "Inactivo",
      on: "ENCENDIDO",
      off: "APAGADO"
    }
  };

  const t = translations[language];

  const getStatusColor = (value: number, type: string) => {
    switch (type) {
      case 'temperature':
        if (value >= 20 && value <= 26) return 'success';
        if (value >= 18 && value <= 28) return 'warning';
        return 'critical';
      case 'humidity':
        if (value >= 55 && value <= 70) return 'success';
        if (value >= 45 && value <= 80) return 'warning';
        return 'critical';
      case 'ethylene':
        if (value <= 1.5) return 'success';
        if (value <= 3.0) return 'warning';
        return 'critical';
      default:
        return 'success';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return t.optimal;
      case 'warning': return t.warning;
      case 'critical': return t.critical;
      default: return t.optimal;
    }
  };

  const toggleControl = (control: keyof SensorData) => {
    setSensorData(prev => ({
      ...prev,
      [control]: !prev[control]
    }));
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero Background Section */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Smart farming greenhouse with advanced monitoring technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Sprout className="animate-pulse-glow" size={48} />
              {t.title}
            </h1>
            <p className="text-xl opacity-90">{t.subtitle}</p>
          </div>
        </div>
        
        {/* Language Toggle - Floating */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant={language === 'en' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setLanguage('en')}
            className="animate-scale-in bg-white/10 border-white/20 text-white hover:bg-white/20"
            style={{ animationDelay: '0.1s' }}
          >
            <Globe className="mr-2" size={16} />
            EN
          </Button>
          <Button
            variant={language === 'es' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setLanguage('es')}
            className="animate-scale-in bg-white/10 border-white/20 text-white hover:bg-white/20"
            style={{ animationDelay: '0.2s' }}
          >
            <Globe className="mr-2" size={16} />
            ES
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="gradient-earth relative -mt-16 z-10">
        <div className="max-w-7xl mx-auto space-y-6 p-4 sm:p-6 pt-20">

        {/* Ethylene Gas Monitor - Full Width */}
        <Card className="hover-lift animate-scale-in border-2" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Activity className="text-accent animate-pulse" size={24} />
              {t.ethylene} Monitor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-foreground">
                  {sensorData.ethylene.toFixed(1)} <span className="text-xl text-muted-foreground">ppm</span>
                </div>
                <Badge 
                  variant={getStatusColor(sensorData.ethylene, 'ethylene') === 'success' ? 'secondary' : 'destructive'}
                  className={`px-3 py-1 text-sm font-medium ${
                    getStatusColor(sensorData.ethylene, 'ethylene') === 'critical' ? 'alert-critical' : ''
                  }`}
                >
                  {getStatusText(getStatusColor(sensorData.ethylene, 'ethylene'))}
                </Badge>
              </div>
              <div className="flex-1 max-w-md">
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      getStatusColor(sensorData.ethylene, 'ethylene') === 'success' ? 'gradient-success' :
                      getStatusColor(sensorData.ethylene, 'ethylene') === 'warning' ? 'bg-warning' : 'bg-critical'
                    }`}
                    style={{ width: `${Math.min((sensorData.ethylene / 5) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0 ppm</span>
                  <span>5 ppm</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sensor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Temperature */}
          <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3">
                <Thermometer className="text-accent" size={20} />
                {t.temperature}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-foreground">
                  {sensorData.temperature.toFixed(1)}°C
                </div>
                <Badge 
                  variant={getStatusColor(sensorData.temperature, 'temperature') === 'success' ? 'secondary' : 'destructive'}
                  className="px-3 py-1"
                >
                  {getStatusText(getStatusColor(sensorData.temperature, 'temperature'))}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Humidity */}
          <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.5s' }}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3">
                <Droplets className="text-accent" size={20} />
                {t.humidity}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-foreground">
                  {sensorData.humidity.toFixed(0)}%
                </div>
                <Badge 
                  variant={getStatusColor(sensorData.humidity, 'humidity') === 'success' ? 'secondary' : 'destructive'}
                  className="px-3 py-1"
                >
                  {getStatusText(getStatusColor(sensorData.humidity, 'humidity'))}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.6s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Zap className="text-accent animate-pulse" size={20} />
              {t.controls}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Ventilation */}
              <Button
                variant={sensorData.ventilation ? 'default' : 'outline'}
                onClick={() => toggleControl('ventilation')}
                className={`h-20 flex-col gap-2 transition-all duration-300 animate-scale-in ${
                  sensorData.ventilation ? 'control-active' : ''
                }`}
                style={{ animationDelay: '0.7s' }}
              >
                <Fan className={`${sensorData.ventilation ? 'animate-spin' : ''}`} size={24} />
                <div className="text-center">
                  <div className="font-semibold">{t.ventilation}</div>
                  <div className="text-xs">{sensorData.ventilation ? t.on : t.off}</div>
                </div>
              </Button>

              {/* Auto Ventilation */}
              <Button
                variant={sensorData.autoVentilation ? 'default' : 'outline'}
                onClick={() => toggleControl('autoVentilation')}
                className={`h-20 flex-col gap-2 transition-all duration-300 animate-scale-in ${
                  sensorData.autoVentilation ? 'control-active' : ''
                }`}
                style={{ animationDelay: '0.8s' }}
              >
                <Wind className={`${sensorData.autoVentilation ? 'animate-pulse' : ''}`} size={24} />
                <div className="text-center">
                  <div className="font-semibold">{t.autoVent}</div>
                  <div className="text-xs">{sensorData.autoVentilation ? t.active : t.inactive}</div>
                </div>
              </Button>

              {/* Irrigation */}
              <Button
                variant={sensorData.irrigation ? 'default' : 'outline'}
                onClick={() => toggleControl('irrigation')}
                className={`h-20 flex-col gap-2 transition-all duration-300 animate-scale-in ${
                  sensorData.irrigation ? 'control-active' : ''
                }`}
                style={{ animationDelay: '0.9s' }}
              >
                <Droplets className={`${sensorData.irrigation ? 'animate-bounce-soft' : ''}`} size={24} />
                <div className="text-center">
                  <div className="font-semibold">{t.irrigation}</div>
                  <div className="text-xs">{sensorData.irrigation ? t.on : t.off}</div>
                </div>
              </Button>

              {/* Lighting */}
              <Button
                variant={sensorData.lighting ? 'default' : 'outline'}
                onClick={() => toggleControl('lighting')}
                className={`h-20 flex-col gap-2 transition-all duration-300 animate-scale-in ${
                  sensorData.lighting ? 'control-active' : ''
                }`}
                style={{ animationDelay: '1s' }}
              >
                <Zap className={`${sensorData.lighting ? 'animate-pulse-glow' : ''}`} size={24} />
                <div className="text-center">
                  <div className="font-semibold">{t.lighting}</div>
                  <div className="text-xs">{sensorData.lighting ? t.on : t.off}</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <div className="space-y-4 animate-scale-in" style={{ animationDelay: '1.1s' }}>
          <h3 className="text-xl font-semibold flex items-center gap-3">
            <AlertTriangle className="text-warning animate-bounce-soft" size={20} />
            {t.alerts}
          </h3>
          
          {sensorData.ethylene > 3.0 && (
            <Alert className="border-critical bg-critical/10 alert-critical">
              <AlertTriangle className="h-4 w-4 text-critical animate-bounce-soft" />
              <AlertDescription className="text-critical-foreground">
                {t.ethyleneAlert}
              </AlertDescription>
            </Alert>
          )}
          
          {(sensorData.temperature < 18 || sensorData.temperature > 28) && (
            <Alert className="border-warning bg-warning/10">
              <Thermometer className="h-4 w-4 text-warning" />
              <AlertDescription className="text-warning-foreground">
                {t.tempAlert}
              </AlertDescription>
            </Alert>
          )}
          
          {sensorData.ethylene <= 1.5 && sensorData.temperature >= 20 && sensorData.temperature <= 26 && (
            <Alert className="border-success bg-success/10">
              <CheckCircle className="h-4 w-4 text-success" />
              <AlertDescription className="text-success-foreground">
                All systems operating within optimal parameters
              </AlertDescription>
            </Alert>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default SmartFarmDashboard;