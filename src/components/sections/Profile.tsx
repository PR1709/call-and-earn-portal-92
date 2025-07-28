import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Camera, Save, LogOut, ArrowLeft } from 'lucide-react';

interface ProfileProps {
  onBack?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onBack }) => {
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@admin.com',
    role: 'Super Admin',
    phone: '+91 98765 43210',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleImageUpload = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Image upload functionality will be available soon.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      variant: "destructive",
    });
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
              Update your profile photo
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={isEditing ? editedProfile.profileImage : profile.profileImage} />
                <AvatarFallback className="bg-green-500 text-white text-2xl">
                  {profile.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                  onClick={handleImageUpload}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="text-center">
              <h3 className="font-medium text-lg">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.role}</p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={isEditing ? editedProfile.name : profile.name}
                  onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={isEditing ? editedProfile.email : profile.email}
                  onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={profile.role}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={isEditing ? editedProfile.phone : profile.phone}
                  onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <div className="space-x-2">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </>
                )}
              </div>
              
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Additional account preferences and security settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Security</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Two-Factor Authentication
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Preferences</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy Settings
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
