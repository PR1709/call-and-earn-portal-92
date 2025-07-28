
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Heart, Video, Image, QrCode, Share, Users, Trophy, Coins, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EarningActivity {
  id: string;
  type: 'watch_ad' | 'tip_tube' | 'post_earn' | 'scan_qr' | 'share_earn' | 'refer_earn';
  amount: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'credited';
  details?: any;
}

interface UserEarnings {
  totalEarnings: number;
  pendingEarnings: number;
  activities: EarningActivity[];
  streaks: {
    watchAds: number;
    posts: number;
    referrals: number;
  };
  achievements: string[];
}

const EARNING_RATES = {
  watch_ad: 2,
  like_ad: 1,
  tip_tube_view: 0.05,
  tip_tube_upload: 50, // per 1000 views
  post_earn: 5,
  scan_qr: 3,
  share_earn: 1.5,
  refer_earn: 5
};

const MILESTONES = {
  watch_ads: [10, 50, 100, 500],
  posts: [5, 25, 100],
  referrals: [1, 10, 50, 100]
};

export const EarningFeaturesManager: React.FC<{ userId: string }> = ({ userId }) => {
  const [earnings, setEarnings] = useState<UserEarnings>({
    totalEarnings: 0,
    pendingEarnings: 0,
    activities: [],
    streaks: { watchAds: 0, posts: 0, referrals: 0 },
    achievements: []
  });
  const [activeFeature, setActiveFeature] = useState<string>('watch-ads');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Watch & Like Ads Feature
  const [adProgress, setAdProgress] = useState(0);
  const [adsWatched, setAdsWatched] = useState(0);
  const [isWatchingAd, setIsWatchingAd] = useState(false);

  // Tip Tube Feature
  const [videoTitle, setVideoTitle] = useState('');
  const [videoViews, setVideoViews] = useState(0);
  const [videosUploaded, setVideosUploaded] = useState(0);

  // Post & Earn Feature
  const [postContent, setPostContent] = useState('');
  const [postsShared, setPostsShared] = useState(0);

  // Scan & Earn Feature
  const [scannedCodes, setScannedCodes] = useState(0);

  // Share & Earn Feature
  const [shareLink, setShareLink] = useState('');
  const [sharesCompleted, setSharesCompleted] = useState(0);

  // Refer & Earn Feature
  const [referralCode, setReferralCode] = useState(`REF${userId}${Math.random().toString(36).substr(2, 4).toUpperCase()}`);
  const [referralsCount, setReferralsCount] = useState(0);

  const creditEarnings = (type: EarningActivity['type'], amount: number, details?: any) => {
    const newActivity: EarningActivity = {
      id: Date.now().toString(),
      type,
      amount,
      timestamp: new Date(),
      status: 'completed',
      details
    };

    setEarnings(prev => ({
      ...prev,
      totalEarnings: prev.totalEarnings + amount,
      activities: [newActivity, ...prev.activities.slice(0, 49)] // Keep last 50 activities
    }));

    toast({
      title: "Earnings Credited!",
      description: `₹${amount} added to your wallet`,
      className: "bg-green-50 border-green-200"
    });
  };

  const watchAd = async () => {
    if (isWatchingAd) return;
    
    setIsWatchingAd(true);
    setAdProgress(0);
    
    // Simulate watching ad
    const interval = setInterval(() => {
      setAdProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsWatchingAd(false);
          setAdsWatched(prev => prev + 1);
          creditEarnings('watch_ad', EARNING_RATES.watch_ad, { adId: `ad_${Date.now()}` });
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const likeAd = () => {
    creditEarnings('watch_ad', EARNING_RATES.like_ad, { action: 'like' });
    toast({
      title: "Ad Liked!",
      description: `₹${EARNING_RATES.like_ad} earned for liking the ad`,
    });
  };

  const uploadVideo = () => {
    if (!videoTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a video title",
        variant: "destructive"
      });
      return;
    }

    setVideosUploaded(prev => prev + 1);
    setVideoTitle('');
    
    toast({
      title: "Video Uploaded!",
      description: "Your video is now live. You'll earn ₹50 for every 1,000 views!",
    });
  };

  const simulateVideoViews = () => {
    const newViews = Math.floor(Math.random() * 100) + 50;
    setVideoViews(prev => {
      const totalViews = prev + newViews;
      const earningsFromViews = Math.floor(totalViews / 1000) * EARNING_RATES.tip_tube_upload;
      
      if (Math.floor(totalViews / 1000) > Math.floor(prev / 1000)) {
        creditEarnings('tip_tube', EARNING_RATES.tip_tube_upload, { views: totalViews });
      }
      
      return totalViews;
    });
  };

  const sharePost = () => {
    if (!postContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter post content",
        variant: "destructive"
      });
      return;
    }

    setPostsShared(prev => prev + 1);
    setPostContent('');
    creditEarnings('post_earn', EARNING_RATES.post_earn, { postId: `post_${Date.now()}` });
  };

  const scanQRCode = () => {
    setScannedCodes(prev => prev + 1);
    creditEarnings('scan_qr', EARNING_RATES.scan_qr, { qrId: `qr_${Date.now()}` });
    
    toast({
      title: "QR Code Scanned!",
      description: "Reward unlocked successfully!",
    });
  };

  const shareContent = () => {
    if (!shareLink.trim()) {
      toast({
        title: "Error",
        description: "Please enter content to share",
        variant: "destructive"
      });
      return;
    }

    setSharesCompleted(prev => prev + 1);
    setShareLink('');
    creditEarnings('share_earn', EARNING_RATES.share_earn, { shareId: `share_${Date.now()}` });
  };

  const generateReferralLink = () => {
    const link = `https://app.example.com/join?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    
    toast({
      title: "Referral Link Copied!",
      description: "Share this link with friends to earn ₹5 per referral",
    });
  };

  const simulateReferralJoin = () => {
    setReferralsCount(prev => prev + 1);
    creditEarnings('refer_earn', EARNING_RATES.refer_earn, { referralCode });
    
    toast({
      title: "New Referral!",
      description: "Someone joined using your referral code!",
      className: "bg-purple-50 border-purple-200"
    });
  };

  return (
    <div className="space-y-6">
      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Coins className="h-4 w-4 text-yellow-600" />
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{earnings.totalEarnings.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Trophy className="h-4 w-4 text-orange-600" />
              Activities Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earnings.activities.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeFeature} onValueChange={setActiveFeature}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="watch-ads">Watch Ads</TabsTrigger>
          <TabsTrigger value="tip-tube">Tip Tube</TabsTrigger>
          <TabsTrigger value="post-earn">Post & Earn</TabsTrigger>
          <TabsTrigger value="scan-earn">Scan & Earn</TabsTrigger>
          <TabsTrigger value="share-earn">Share & Earn</TabsTrigger>
          <TabsTrigger value="refer-earn">Refer & Earn</TabsTrigger>
        </TabsList>

        <TabsContent value="watch-ads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Watch & Like Ads
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Ads Watched Today: {adsWatched}</span>
                <Badge>₹{EARNING_RATES.watch_ad} per ad</Badge>
              </div>
              
              {isWatchingAd && (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Watching ad...</div>
                  <Progress value={adProgress} className="w-full" />
                </div>
              )}
              
              <div className="flex gap-2">
                <Button 
                  onClick={watchAd} 
                  disabled={isWatchingAd}
                  className="flex-1"
                >
                  {isWatchingAd ? 'Watching...' : 'Watch Ad'}
                </Button>
                <Button 
                  onClick={likeAd} 
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  Like Ad (₹{EARNING_RATES.like_ad})
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tip-tube" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-blue-500" />
                Tip Tube (Video Platform)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Videos Uploaded</label>
                  <div className="text-2xl font-bold">{videosUploaded}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Total Views</label>
                  <div className="text-2xl font-bold">{videoViews.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload New Video</label>
                <Input
                  placeholder="Enter video title..."
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={uploadVideo} className="flex-1">
                  Upload Video
                </Button>
                <Button onClick={simulateVideoViews} variant="outline">
                  Simulate Views
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Earn ₹50 for every 1,000 views on your videos
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="post-earn" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5 text-green-500" />
                Post & Earn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Posts Shared: {postsShared}</span>
                <Badge>₹{EARNING_RATES.post_earn} per post</Badge>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Create Post</label>
                <Input
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
              </div>
              
              <Button onClick={sharePost} className="w-full">
                Share Post & Earn
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scan-earn" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-purple-500" />
                Scan & Earn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>QR Codes Scanned: {scannedCodes}</span>
                <Badge>₹{EARNING_RATES.scan_qr} per scan</Badge>
              </div>
              
              <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                <QrCode className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Scan QR codes in ads to unlock instant rewards
                </p>
                <Button onClick={scanQRCode}>
                  Simulate QR Scan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="share-earn" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share className="h-5 w-5 text-orange-500" />
                Share & Earn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Content Shared: {sharesCompleted}</span>
                <Badge>₹{EARNING_RATES.share_earn} per share</Badge>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Share Content</label>
                <Input
                  placeholder="Enter content link to share..."
                  value={shareLink}
                  onChange={(e) => setShareLink(e.target.value)}
                />
              </div>
              
              <Button onClick={shareContent} className="w-full">
                Share & Earn
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="refer-earn" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-500" />
                Refer & Earn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Successful Referrals: {referralsCount}</span>
                <Badge>₹{EARNING_RATES.refer_earn} per referral</Badge>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Referral Code</label>
                <div className="flex gap-2">
                  <Input value={referralCode} readOnly />
                  <Button onClick={generateReferralLink} variant="outline">
                    Copy Link
                  </Button>
                </div>
              </div>
              
              <Button onClick={simulateReferralJoin} className="w-full" variant="outline">
                Simulate Referral Join
              </Button>
              
              <div className="text-xs text-muted-foreground">
                Withdrawable after 1,000 app downloads milestone
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Earning Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {earnings.activities.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No activities yet. Start earning by using the features above!
              </p>
            ) : (
              earnings.activities.slice(0, 10).map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {activity.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <span className="text-sm">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    +₹{activity.amount}
                  </span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
