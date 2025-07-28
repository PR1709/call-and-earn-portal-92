
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save } from 'lucide-react';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'Viewer' | 'Editor' | 'Finance' | 'Support';
  status: 'Active' | 'Inactive';
}

interface Permission {
  id: string;
  label: string;
  description: string;
}

interface RolePermissions {
  [key: string]: string[];
}

export const AdminRoles = () => {
  const { toast } = useToast();
  
  // Sample admin data
  const [admins, setAdmins] = useState<Admin[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Editor', status: 'Active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Finance', status: 'Active' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Support', status: 'Inactive' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Viewer', status: 'Active' },
  ]);

  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Viewer' as Admin['role'],
    status: 'Active' as Admin['status']
  });

  // Permissions data
  const permissions: Permission[] = [
    { id: 'view_dashboard', label: 'View Dashboard', description: 'Access to main dashboard and basic statistics' },
    { id: 'edit_content', label: 'Edit Content', description: 'Modify platform content and settings' },
    { id: 'manage_wallet', label: 'Manage Wallet & Earnings', description: 'Access financial data and earnings' },
    { id: 'handle_withdrawals', label: 'Handle Withdrawals', description: 'Process withdrawal requests' },
    { id: 'access_analytics', label: 'Access Analytics', description: 'View detailed analytics and reports' },
    { id: 'manage_complaints', label: 'Manage Complaints', description: 'Handle user support and complaints' },
  ];

  // Default role permissions
  const [rolePermissions, setRolePermissions] = useState<RolePermissions>({
    Viewer: ['view_dashboard'],
    Editor: ['view_dashboard', 'edit_content', 'access_analytics'],
    Finance: ['view_dashboard', 'manage_wallet', 'handle_withdrawals', 'access_analytics'],
    Support: ['view_dashboard', 'manage_complaints', 'access_analytics'],
  });

  const roles = ['Viewer', 'Editor', 'Finance', 'Support'];

  const handleAddAdmin = () => {
    const newAdmin: Admin = {
      id: Date.now().toString(),
      ...formData
    };
    setAdmins([...admins, newAdmin]);
    setFormData({ name: '', email: '', role: 'Viewer', status: 'Active' });
    setIsAddModalOpen(false);
    toast({
      title: "Admin Added",
      description: `${newAdmin.name} has been added successfully.`,
    });
  };

  const handleEditAdmin = () => {
    if (!selectedAdmin) return;
    
    setAdmins(admins.map(admin => 
      admin.id === selectedAdmin.id 
        ? { ...admin, ...formData }
        : admin
    ));
    setIsEditModalOpen(false);
    setSelectedAdmin(null);
    toast({
      title: "Admin Updated",
      description: `Admin details have been updated successfully.`,
    });
  };

  const handleRemoveAdmin = (adminId: string) => {
    const admin = admins.find(a => a.id === adminId);
    setAdmins(admins.filter(a => a.id !== adminId));
    toast({
      title: "Admin Removed",
      description: `${admin?.name} has been removed successfully.`,
      variant: "destructive",
    });
  };

  const openEditModal = (admin: Admin) => {
    setSelectedAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      role: admin.role,
      status: admin.status
    });
    setIsEditModalOpen(true);
  };

  const handlePermissionChange = (role: string, permissionId: string, checked: boolean) => {
    setRolePermissions(prev => ({
      ...prev,
      [role]: checked 
        ? [...prev[role], permissionId]
        : prev[role].filter(p => p !== permissionId)
    }));
  };

  const handleSaveRolePermissions = () => {
    toast({
      title: "Permissions Updated",
      description: "Role permissions have been saved successfully.",
    });
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Roles & Permissions</h1>
          <p className="text-muted-foreground">Manage administrators and their access permissions</p>
        </div>
      </div>

      {/* Add/Edit Admins Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Admin Management</CardTitle>
              <CardDescription>
                Add, edit, and manage administrator accounts
              </CardDescription>
            </div>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Admin
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Admin</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={formData.role} onValueChange={(value: Admin['role']) => setFormData({...formData, role: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="status"
                      checked={formData.status === 'Active'}
                      onCheckedChange={(checked) => setFormData({...formData, status: checked ? 'Active' : 'Inactive'})}
                    />
                    <Label htmlFor="status">Active Status</Label>
                  </div>
                  <Button onClick={handleAddAdmin} className="w-full">
                    Add Admin
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{admin.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={admin.status === 'Active' ? 'default' : 'destructive'}>
                        {admin.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditModal(admin)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveAdmin(admin.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Admin Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Admin</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select value={formData.role} onValueChange={(value: Admin['role']) => setFormData({...formData, role: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-status"
                checked={formData.status === 'Active'}
                onCheckedChange={(checked) => setFormData({...formData, status: checked ? 'Active' : 'Inactive'})}
              />
              <Label htmlFor="edit-status">Active Status</Label>
            </div>
            <Button onClick={handleEditAdmin} className="w-full">
              Update Admin
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Role Permissions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Configure access permissions for each administrator role
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {roles.map((role) => (
            <div key={role} className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-600">{role}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {permissions.map((permission) => (
                  <div key={permission.id} className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="flex-1 mr-3">
                      <Label 
                        htmlFor={`${role}-${permission.id}`}
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        {permission.label}
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        {permission.description}
                      </p>
                    </div>
                    <Switch
                      id={`${role}-${permission.id}`}
                      checked={rolePermissions[role]?.includes(permission.id) || false}
                      onCheckedChange={(checked) => 
                        handlePermissionChange(role, permission.id, checked)
                      }
                    />
                  </div>
                ))}
              </div>
              {role !== roles[roles.length - 1] && <hr className="my-6" />}
            </div>
          ))}
          
          <Button onClick={handleSaveRolePermissions} className="w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" />
            Save Role Permissions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
