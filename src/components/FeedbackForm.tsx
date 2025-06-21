
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface FeedbackFormData {
  orderId: string;
  customerName: string;
  rating: string;
  category: string;
  comment: string;
}

const FeedbackForm = () => {
  const { toast } = useToast();
  const [feedbackData, setFeedbackData] = useState<FeedbackFormData>({
    orderId: '',
    customerName: '',
    rating: '',
    category: '',
    comment: ''
  });

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

  return (
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
  );
};

export default FeedbackForm;
