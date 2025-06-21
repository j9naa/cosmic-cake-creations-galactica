
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const CakeCustomizer = () => {
  const { toast } = useToast();
  const [orderData, setOrderData] = useState({
    customerName: '',
    address: '',
    planetSystem: '',
    layers: '2',
    cakeSize: '',
    flavor: '',
    toppings: [] as string[],
    customDesign: '',
    deliveryType: '',
    deliveryDate: '',
    paymentMethod: '',
    specialInstructions: ''
  });

  const layerOptions = ['1', '2', '3', '4', '5'];
  const sizeOptions = ['Small (6")', 'Medium (8")', 'Large (10")', 'Extra Large (12")', 'Galactic (14")'];
  const flavorOptions = [
    'Cosmic Chocolate', 'Stardust Vanilla', 'Nebula Red Velvet', 
    'Galactic Strawberry', 'Asteroid Lemon', 'Saturn Ring Caramel'
  ];
  const toppingOptions = [
    'Starlight Sprinkles', 'Cosmic Crystals', 'Galactic Glaze', 
    'Nebula Dust', 'Asteroid Chunks', 'Solar Swirls', 'Planetary Pearls'
  ];
  const deliveryTypes = ['Standard Warp', 'Express Hyperspace', 'Premium Teleport'];
  const paymentMethods = ['Galactic Credits', 'Cosmic Coins', 'Stardust Exchange', 'Quantum Currency'];

  const artists = [
    'Zara Nebula', 'Cosmic Chen', 'Stellar Santos', 'Galaxy Grace', 'Andromeda Alex'
  ];

  const generateOrderId = () => {
    const prefix = 'CKV';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleToppingToggle = (topping: string) => {
    setOrderData(prev => ({
      ...prev,
      toppings: prev.toppings.includes(topping) 
        ? prev.toppings.filter(t => t !== topping)
        : [...prev.toppings, topping]
    }));
  };

  const handleSubmitOrder = () => {
    if (!orderData.customerName || !orderData.address || !orderData.cakeSize || !orderData.flavor) {
      toast({
        title: "Incomplete Order",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const orderId = generateOrderId();
    const assignedArtist = artists[Math.floor(Math.random() * artists.length)];
    
    console.log('Order submitted:', {
      orderId,
      ...orderData,
      artistAssigned: assignedArtist,
      orderDate: new Date().toISOString()
    });

    toast({
      title: "Order Confirmed!",
      description: `Your cosmic creation order ${orderId} has been submitted and assigned to ${assignedArtist}.`,
    });

    // Reset form
    setOrderData({
      customerName: '',
      address: '',
      planetSystem: '',
      layers: '2',
      cakeSize: '',
      flavor: '',
      toppings: [],
      customDesign: '',
      deliveryType: '',
      deliveryDate: '',
      paymentMethod: '',
      specialInstructions: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold font-orbitron text-white mb-4">
          Cosmic Cake Customizer
        </h2>
        <p className="text-cosmic-silver text-lg">
          Design your perfect galactic confection
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Customer Information */}
        <Card className="cosmic-card text-white border-cosmic-silver/20">
          <CardHeader>
            <CardTitle className="font-orbitron text-cosmic-blue">Customer Information</CardTitle>
            <CardDescription className="text-cosmic-silver">
              Tell us where to deliver your cosmic creation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="customerName" className="text-cosmic-silver">Full Name *</Label>
              <Input 
                id="customerName"
                value={orderData.customerName}
                onChange={(e) => setOrderData(prev => ({ ...prev, customerName: e.target.value }))}
                className="bg-cosmic-gray/50 border-cosmic-silver/30 text-white placeholder:text-cosmic-silver/50"
                placeholder="Enter your galactic name"
              />
            </div>
            <div>
              <Label htmlFor="address" className="text-cosmic-silver">Delivery Address *</Label>
              <Textarea 
                id="address"
                value={orderData.address}
                onChange={(e) => setOrderData(prev => ({ ...prev, address: e.target.value }))}
                className="bg-cosmic-gray/50 border-cosmic-silver/30 text-white placeholder:text-cosmic-silver/50"
                placeholder="Planet, System, Sector, Galaxy coordinates"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="planetSystem" className="text-cosmic-silver">Planet System</Label>
              <Input 
                id="planetSystem"
                value={orderData.planetSystem}
                onChange={(e) => setOrderData(prev => ({ ...prev, planetSystem: e.target.value }))}
                className="bg-cosmic-gray/50 border-cosmic-silver/30 text-white placeholder:text-cosmic-silver/50"
                placeholder="e.g., Sol System, Kepler-442, Proxima Centauri"
              />
            </div>
          </CardContent>
        </Card>

        {/* Cake Design */}
        <Card className="cosmic-card text-white border-cosmic-silver/20">
          <CardHeader>
            <CardTitle className="font-orbitron text-cosmic-purple">Cake Design</CardTitle>
            <CardDescription className="text-cosmic-silver">
              Customize your galactic masterpiece
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-cosmic-silver">Layers</Label>
                <Select value={orderData.layers} onValueChange={(value) => setOrderData(prev => ({ ...prev, layers: value }))}>
                  <SelectTrigger className="bg-cosmic-gray/50 border-cosmic-silver/30 text-white">
                    <SelectValue placeholder="Select layers" />
                  </SelectTrigger>
                  <SelectContent className="bg-cosmic-gray border-cosmic-silver/30">
                    {layerOptions.map(layer => (
                      <SelectItem key={layer} value={layer} className="text-white hover:bg-cosmic-purple/20">
                        {layer} {layer === '1' ? 'Layer' : 'Layers'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-cosmic-silver">Size *</Label>
                <Select value={orderData.cakeSize} onValueChange={(value) => setOrderData(prev => ({ ...prev, cakeSize: value }))}>
                  <SelectTrigger className="bg-cosmic-gray/50 border-cosmic-silver/30 text-white">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent className="bg-cosmic-gray border-cosmic-silver/30">
                    {sizeOptions.map(size => (
                      <SelectItem key={size} value={size} className="text-white hover:bg-cosmic-purple/20">
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-cosmic-silver">Flavor *</Label>
              <Select value={orderData.flavor} onValueChange={(value) => setOrderData(prev => ({ ...prev, flavor: value }))}>
                <SelectTrigger className="bg-cosmic-gray/50 border-cosmic-silver/30 text-white">
                  <SelectValue placeholder="Choose your cosmic flavor" />
                </SelectTrigger>
                <SelectContent className="bg-cosmic-gray border-cosmic-silver/30">
                  {flavorOptions.map(flavor => (
                    <SelectItem key={flavor} value={flavor} className="text-white hover:bg-cosmic-purple/20">
                      {flavor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-cosmic-silver">Toppings</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {toppingOptions.map(topping => (
                  <Badge 
                    key={topping}
                    variant={orderData.toppings.includes(topping) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 ${
                      orderData.toppings.includes(topping) 
                        ? 'bg-cosmic-purple text-white' 
                        : 'bg-transparent border-cosmic-silver/30 text-cosmic-silver hover:border-cosmic-purple/50'
                    }`}
                    onClick={() => handleToppingToggle(topping)}
                  >
                    {topping}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="customDesign" className="text-cosmic-silver">Custom Design Notes</Label>
              <Textarea 
                id="customDesign"
                value={orderData.customDesign}
                onChange={(e) => setOrderData(prev => ({ ...prev, customDesign: e.target.value }))}
                className="bg-cosmic-gray/50 border-cosmic-silver/30 text-white placeholder:text-cosmic-silver/50"
                placeholder="Describe any special design elements, colors, themes..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delivery & Payment */}
      <Card className="cosmic-card text-white border-cosmic-silver/20">
        <CardHeader>
          <CardTitle className="font-orbitron text-cosmic-blue">Delivery & Payment</CardTitle>
          <CardDescription className="text-cosmic-silver">
            Choose your delivery preferences and payment method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-cosmic-silver">Delivery Type</Label>
                <Select value={orderData.deliveryType} onValueChange={(value) => setOrderData(prev => ({ ...prev, deliveryType: value }))}>
                  <SelectTrigger className="bg-cosmic-gray/50 border-cosmic-silver/30 text-white">
                    <SelectValue placeholder="Select delivery method" />
                  </SelectTrigger>
                  <SelectContent className="bg-cosmic-gray border-cosmic-silver/30">
                    {deliveryTypes.map(type => (
                      <SelectItem key={type} value={type} className="text-white hover:bg-cosmic-purple/20">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="deliveryDate" className="text-cosmic-silver">Preferred Delivery Date</Label>
                <Input 
                  id="deliveryDate"
                  type="date"
                  value={orderData.deliveryDate}
                  onChange={(e) => setOrderData(prev => ({ ...prev, deliveryDate: e.target.value }))}
                  className="bg-cosmic-gray/50 border-cosmic-silver/30 text-white"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-cosmic-silver">Payment Method</Label>
                <Select value={orderData.paymentMethod} onValueChange={(value) => setOrderData(prev => ({ ...prev, paymentMethod: value }))}>
                  <SelectTrigger className="bg-cosmic-gray/50 border-cosmic-silver/30 text-white">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-cosmic-gray border-cosmic-silver/30">
                    {paymentMethods.map(method => (
                      <SelectItem key={method} value={method} className="text-white hover:bg-cosmic-purple/20">
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="specialInstructions" className="text-cosmic-silver">Special Instructions</Label>
                <Textarea 
                  id="specialInstructions"
                  value={orderData.specialInstructions}
                  onChange={(e) => setOrderData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                  className="bg-cosmic-gray/50 border-cosmic-silver/30 text-white placeholder:text-cosmic-silver/50"
                  placeholder="Any special requests or dietary requirements..."
                  rows={2}
                />
              </div>
            </div>
          </div>
          
          <Separator className="my-6 bg-cosmic-silver/20" />
          
          <div className="text-center">
            <Button 
              onClick={handleSubmitOrder}
              className="bg-cosmic-purple hover:bg-cosmic-purple/80 text-white px-8 py-3 text-lg font-medium transition-all duration-300"
            >
              Launch Your Cosmic Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CakeCustomizer;
