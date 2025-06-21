
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar, User, Cake } from 'lucide-react';

interface Order {
  orderId: string;
  customerName: string;
  address: string;
  cakeDesign: string;
  layers: string;
  toppings: string[];
  artistAssigned: string;
  deliveryDate: string;
  deliveryType: string;
  paymentMethod: string;
  status: 'Pending' | 'In Progress' | 'Ready' | 'Delivered';
  orderDate: string;
}

const OrderManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchOrderId, setSearchOrderId] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  // Sample orders for demonstration
  useEffect(() => {
    const sampleOrders: Order[] = [
      {
        orderId: 'CKV-123456-001',
        customerName: 'Captain Zara Nova',
        address: 'Mars Colony Alpha, Sector 7, Sol System',
        cakeDesign: 'Nebula Red Velvet with Galactic Glaze',
        layers: '3',
        toppings: ['Starlight Sprinkles', 'Cosmic Crystals'],
        artistAssigned: 'Stellar Santos',
        deliveryDate: '2025-01-15',
        deliveryType: 'Express Hyperspace',
        paymentMethod: 'Galactic Credits',
        status: 'In Progress',
        orderDate: '2025-01-10T10:30:00Z'
      },
      {
        orderId: 'CKV-123456-002',
        customerName: 'Admiral Rex Cosmos',
        address: 'Europa Station, Jupiter System',
        cakeDesign: 'Cosmic Chocolate with Solar Swirls',
        layers: '4',
        toppings: ['Nebula Dust', 'Planetary Pearls', 'Asteroid Chunks'],
        artistAssigned: 'Galaxy Grace',
        deliveryDate: '2025-01-20',
        deliveryType: 'Standard Warp',
        paymentMethod: 'Cosmic Coins',
        status: 'Pending',
        orderDate: '2025-01-12T14:15:00Z'
      },
      {
        orderId: 'CKV-123456-003',
        customerName: 'Dr. Luna Starlight',
        address: 'Kepler-442b Research Facility',
        cakeDesign: 'Stardust Vanilla with Custom Galaxy Design',
        layers: '2',
        toppings: ['Galactic Glaze', 'Starlight Sprinkles'],
        artistAssigned: 'Andromeda Alex',
        deliveryDate: '2025-01-18',
        deliveryType: 'Premium Teleport',
        paymentMethod: 'Quantum Currency',
        status: 'Ready',
        orderDate: '2025-01-08T09:45:00Z'
      }
    ];
    setOrders(sampleOrders);
    setFilteredOrders(sampleOrders);
  }, []);

  useEffect(() => {
    if (searchOrderId.trim() === '') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => 
        order.orderId.toLowerCase().includes(searchOrderId.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchOrderId.toLowerCase())
      ));
    }
  }, [searchOrderId, orders]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'In Progress': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Ready': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Delivered': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default: return 'bg-cosmic-silver/20 text-cosmic-silver border-cosmic-silver/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold font-orbitron text-white mb-4">
          Order Management System
        </h2>
        <p className="text-cosmic-silver text-lg">
          Track your cosmic creations across the galaxy
        </p>
      </div>

      {/* Search Section */}
      <Card className="cosmic-card text-white border-cosmic-silver/20">
        <CardHeader>
          <CardTitle className="font-orbitron text-cosmic-blue">Order Search</CardTitle>
          <CardDescription className="text-cosmic-silver">
            Find your order by Order ID or Customer Name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="searchOrderId" className="text-cosmic-silver">Search Orders</Label>
              <Input 
                id="searchOrderId"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                className="bg-cosmic-gray/50 border-cosmic-silver/30 text-white placeholder:text-cosmic-silver/50"
                placeholder="Enter Order ID or Customer Name..."
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={() => setSearchOrderId('')}
                variant="outline"
                className="border-cosmic-silver/30 text-cosmic-silver hover:bg-cosmic-purple/20 hover:text-white"
              >
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Grid */}
      <div className="grid gap-6">
        {filteredOrders.length === 0 ? (
          <Card className="cosmic-card text-white border-cosmic-silver/20">
            <CardContent className="text-center py-12">
              <p className="text-cosmic-silver text-lg">No orders found matching your search.</p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.orderId} className="cosmic-card text-white border-cosmic-silver/20 hover:border-cosmic-purple/50 transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-orbitron text-cosmic-purple text-xl">
                      Order {order.orderId}
                    </CardTitle>
                    <CardDescription className="text-cosmic-silver mt-1">
                      Ordered on {formatDate(order.orderDate)}
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} font-medium`}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Customer Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-cosmic-blue" />
                      <span className="text-sm font-medium text-cosmic-blue">Customer</span>
                    </div>
                    <p className="text-white font-medium">{order.customerName}</p>
                    <p className="text-cosmic-silver text-sm">{order.address}</p>
                  </div>

                  {/* Cake Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Cake className="w-4 h-4 text-cosmic-purple" />
                      <span className="text-sm font-medium text-cosmic-purple">Cake Design</span>
                    </div>
                    <p className="text-white font-medium">{order.cakeDesign}</p>
                    <p className="text-cosmic-silver text-sm">{order.layers} layers</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {order.toppings.map((topping, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs bg-cosmic-purple/10 border-cosmic-purple/30 text-cosmic-purple"
                        >
                          {topping}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cosmic-blue" />
                      <span className="text-sm font-medium text-cosmic-blue">Delivery</span>
                    </div>
                    <p className="text-white font-medium">
                      {formatDate(order.deliveryDate)}
                    </p>
                    <p className="text-cosmic-silver text-sm">{order.deliveryType}</p>
                    <p className="text-cosmic-silver text-sm">Artist: {order.artistAssigned}</p>
                    <p className="text-cosmic-silver text-sm">Payment: {order.paymentMethod}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderManager;
