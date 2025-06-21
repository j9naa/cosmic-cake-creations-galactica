import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { User, Calendar, MessageCircle } from 'lucide-react';

interface Feedback {
  id: string;
  orderId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  category: string;
}

const FeedbackSystem = () => {
  const { toast } = useToast();
  const [feedbackData, setFeedbackData] = useState({
    orderId: '',
    customerName: '',
    rating: '',
    category: '',
    comment: ''
  });

  const [feedbackList] = useState<Feedback[]>([
    {
      id: '1',
      orderId: 'CKV-123456-001',
      customerName: 'Captain Zara Nova',
      rating: 5,
      comment: 'Absolutely stellar! The Nebula Red Velvet was out of this world. Perfect delivery to Mars Colony Alpha.',
      date: '2025-01-16',
      category: 'Taste'
    },
    {
      id: '2',
      orderId: 'CKV-123456-003',
      customerName: 'Dr. Luna Starlight',
      rating: 5,
      comment: 'The galaxy design was breathtaking! Andromeda Alex did an amazing job. Will definitely order again.',
      date: '2025-01-19',
      category: 'Design'
    },
    {
      id: '3',
      orderId: 'CKV-123456-002',
      customerName: 'Admiral Rex Cosmos',
      rating: 4,
      comment: 'Great taste and presentation. Delivery was prompt to Europa Station. Only minor issue was the Solar Swirls were a bit too sweet.',
      date: '2025-01-21',
      category: 'Overall'
    }
  ]);

  const ratingOptions = ['1', '2', '3', '4', '5'];
  const categoryOptions = ['Taste', 'Design', 'Delivery', 'Customer Service', 'Overall'];

  const handleSubmitFeedback = () => {
    if (!feedbackData.orderId || !feedbackData.customerName || !feedbackData.rating || !feedbackData.comment) {
      toast({
        title: "Incomplete Feedback",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log('Feedback submitted:', {
      ...feedbackData,
      date: new Date().toISOString(),
      id: Date.now().toString()
    });

    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your cosmic review. Your feedback helps us improve our galactic service.",
    });

    // Reset form
    setFeedbackData({
      orderId: '',
      customerName: '',
      rating: '',
      category: '',
      comment: ''
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-cosmic-silver/30'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
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
          Cosmic Feedback System
        </h2>
        <p className="text-cosmic-silver text-lg">
          Share your galactic experience and help us improve
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Feedback Form */}
        <Card className="cosmic-card text-white border-cosmic-silver/20">
          <CardHeader>
            <CardTitle className="font-orbitron text-cosmic-purple">Submit Your Feedback</CardTitle>
            <CardDescription className="text-cosmic-silver">
              Tell us about your cosmic cake experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="orderId" className="text-cosmic-silver">Order ID *</Label>
              <Input 
                id="orderId"
                value={feedbackData.orderId}
                onChange={(e) => setFeedbackData(prev => ({ ...prev, orderId: e.target.value }))}
                className="bg-cosmic-gray/50 border-cosmic-silver/30 text-white placeholder:text-cosmic-silver/50"
                placeholder="e.g., CKV-123456-001"
              />
            </div>
            
            <div>
              <Label htmlFor="customerName" className="text-cosmic-silver">Your Name *</Label>
              <Input 
                id="customerName"
                value={feedbackData.customerName}
                onChange={(e) => setFeedbackData(prev => ({ ...prev, customerName: e.target.value }))}
                className="bg-cosmic-gray/50 border-cosmic-silver/30 text-white placeholder:text-cosmic-silver/50"
                placeholder="Enter your galactic name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-cosmic-silver">Rating *</Label>
                <Select value={feedbackData.rating} onValueChange={(value) => setFeedbackData(prev => ({ ...prev, rating: value }))}>
                  <SelectTrigger className="bg-cosmic-gray/50 border-cosmic-silver/30 text-white">
                    <SelectValue placeholder="Rate your experience" />
                  </SelectTrigger>
                  <SelectContent className="bg-cosmic-gray border-cosmic-silver/30">
                    {ratingOptions.map(rating => (
                      <SelectItem key={rating} value={rating} className="text-white hover:bg-cosmic-purple/20">
                        {rating} Star{rating !== '1' ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-cosmic-silver">Category</Label>
                <Select value={feedbackData.category} onValueChange={(value) => setFeedbackData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="bg-cosmic-gray/50 border-cosmic-silver/30 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-cosmic-gray border-cosmic-silver/30">
                    {categoryOptions.map(category => (
                      <SelectItem key={category} value={category} className="text-white hover:bg-cosmic-purple/20">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="comment" className="text-cosmic-silver">Your Review *</Label>
              <Textarea 
                id="comment"
                value={feedbackData.comment}
                onChange={(e) => setFeedbackData(prev => ({ ...prev, comment: e.target.value }))}
                className="bg-cosmic-gray/50 border-cosmic-silver/30 text-white placeholder:text-cosmic-silver/50"
                placeholder="Share your cosmic cake experience..."
                rows={4}
              />
            </div>

            <Button 
              onClick={handleSubmitFeedback}
              className="w-full bg-cosmic-purple hover:bg-cosmic-purple/80 text-white font-medium transition-all duration-300"
            >
              Submit Cosmic Feedback
            </Button>
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <div className="space-y-6">
          <Card className="cosmic-card text-white border-cosmic-silver/20">
            <CardHeader>
              <CardTitle className="font-orbitron text-cosmic-blue">Recent Reviews</CardTitle>
              <CardDescription className="text-cosmic-silver">
                See what other cosmic customers are saying
              </CardDescription>
            </CardHeader>
          </Card>

          {feedbackList.map((feedback) => (
            <Card key={feedback.id} className="cosmic-card text-white border-cosmic-silver/20 hover:border-cosmic-purple/50 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-cosmic-blue" />
                        <span className="font-medium text-white">{feedback.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-cosmic-silver">
                        <span>Order: {feedback.orderId}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(feedback.date)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      {renderStars(feedback.rating)}
                      {feedback.category && (
                        <Badge 
                          variant="outline" 
                          className="bg-cosmic-blue/10 border-cosmic-blue/30 text-cosmic-blue text-xs"
                        >
                          {feedback.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <MessageCircle className="w-4 h-4 text-cosmic-purple mt-1 flex-shrink-0" />
                    <p className="text-cosmic-silver leading-relaxed">{feedback.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackSystem;
