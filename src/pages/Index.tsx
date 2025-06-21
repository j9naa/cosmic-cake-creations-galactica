
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cake, Calendar, User, Percent } from 'lucide-react';
import CakeCustomizer from '../components/CakeCustomizer';
import OrderManager from '../components/OrderManager';
import FeedbackSystem from '../components/FeedbackSystem';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const promotions = [
    { id: 1, title: "Galactic Explorer Special", discount: "15% OFF", description: "First-time customers across all star systems" },
    { id: 2, title: "Nebula Bundle", discount: "20% OFF", description: "Orders above 500 Galactic Credits" },
    { id: 3, title: "Asteroid Belt Express", discount: "Free Delivery", description: "Same-day delivery in local systems" }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'customize':
        return <CakeCustomizer />;
      case 'orders':
        return <OrderManager />;
      case 'feedback':
        return <FeedbackSystem />;
      default:
        return (
          <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center py-20">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-6xl font-bold font-orbitron mb-6 bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent">
                  Welcome to Cakeverse
                </h1>
                <p className="text-xl text-cosmic-silver mb-8 leading-relaxed">
                  The galaxy's premier destination for custom-designed cakes. 
                  Experience artisanal craftsmanship delivered across star systems.
                </p>
                <Button 
                  onClick={() => setActiveSection('customize')}
                  className="bg-cosmic-purple hover:bg-opacity-80 text-white px-8 py-3 text-lg font-medium transition-all duration-300"
                >
                  Start Your Cosmic Creation
                </Button>
              </div>
            </section>

            {/* Features Section */}
            <section className="grid md:grid-cols-3 gap-8 py-16">
              <Card className="cosmic-card text-white border-cosmic-silver/20 hover:border-cosmic-purple/50 transition-all duration-300">
                <CardHeader className="text-center">
                  <Cake className="w-12 h-12 mx-auto mb-4 text-cosmic-blue" />
                  <CardTitle className="font-orbitron">Custom Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-cosmic-silver text-center">
                    Craft unique cakes with our advanced design system. Choose layers, toppings, and cosmic themes.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="cosmic-card text-white border-cosmic-silver/20 hover:border-cosmic-blue/50 transition-all duration-300">
                <CardHeader className="text-center">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-cosmic-purple" />
                  <CardTitle className="font-orbitron">Galactic Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-cosmic-silver text-center">
                    Express delivery across star systems. From Earth to Alpha Centauri in record time.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="cosmic-card text-white border-cosmic-silver/20 hover:border-cosmic-blue/50 transition-all duration-300">
                <CardHeader className="text-center">
                  <User className="w-12 h-12 mx-auto mb-4 text-cosmic-blue" />
                  <CardTitle className="font-orbitron">Master Artisans</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-cosmic-silver text-center">
                    Our certified cake artists bring decades of experience from across the galaxy.
                  </CardDescription>
                </CardContent>
              </Card>
            </section>

            {/* Promotions Section */}
            <section className="py-16">
              <h2 className="text-3xl font-bold font-orbitron text-center mb-12 text-white">
                Current Galactic Promotions
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {promotions.map((promo) => (
                  <Card key={promo.id} className="cosmic-card text-white border-cosmic-silver/20 hover:border-cosmic-purple/50 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Percent className="w-5 h-5 text-cosmic-purple" />
                        <Badge variant="secondary" className="bg-cosmic-purple/20 text-cosmic-purple border-cosmic-purple/30">
                          {promo.discount}
                        </Badge>
                      </div>
                      <CardTitle className="font-orbitron text-lg">{promo.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-cosmic-silver">
                        {promo.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Navigation */}
      <nav className="border-b border-cosmic-silver/20 backdrop-blur-sm bg-cosmic-deep/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Cake className="w-8 h-8 text-cosmic-purple" />
              <span className="text-2xl font-bold font-orbitron text-white">Cakeverse</span>
            </div>
            <div className="flex space-x-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'customize', label: 'Customize' },
                { id: 'orders', label: 'Orders' },
                { id: 'feedback', label: 'Feedback' }
              ].map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  onClick={() => setActiveSection(item.id)}
                  className={`font-medium transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'bg-cosmic-purple text-white' 
                      : 'text-cosmic-silver hover:text-white hover:bg-cosmic-purple/20'
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-cosmic-silver/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-cosmic-silver">
            <p className="font-orbitron">© 2025 Cakeverse. Delivering sweetness across the galaxy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
