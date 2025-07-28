
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Search, MessageSquare, Clock, CheckCircle, AlertCircle, User, Send, Paperclip, Plus, Upload } from 'lucide-react';

const tickets = [
  {
    id: "TIC-001",
    user: "Rahul Sharma",
    subject: "Payment not credited",
    date: "2024-06-08 14:30",
    status: "Open",
    urgency: "High",
    assignedAgent: "Sarah Wilson",
    category: "Payment Issue",
    messages: [
      { sender: "Rahul Sharma", message: "My payment of ₹500 was deducted but not credited to wallet", time: "14:30", type: "user" },
      { sender: "Sarah Wilson", message: "Hi Rahul, I'm looking into this issue. Can you provide the transaction ID?", time: "14:45", type: "agent" }
    ]
  },
  {
    id: "TIC-002",
    user: "Priya Patel",
    subject: "Unable to withdraw earnings",
    date: "2024-06-08 12:15",
    status: "In Progress",
    urgency: "Medium",
    assignedAgent: "Mike Johnson",
    category: "Withdrawal Issue",
    messages: [
      { sender: "Priya Patel", message: "I'm unable to withdraw my earnings. Getting error message.", time: "12:15", type: "user" },
      { sender: "Mike Johnson", message: "Can you share a screenshot of the error?", time: "12:30", type: "agent" },
      { sender: "Priya Patel", message: "Here's the screenshot", time: "13:00", type: "user" }
    ]
  },
  {
    id: "TIC-003",
    user: "Amit Kumar",
    subject: "Ad tip not received",
    date: "2024-06-07 16:20",
    status: "Resolved",
    urgency: "Low",
    assignedAgent: "Sarah Wilson",
    category: "Ad Tip Issue",
    messages: [
      { sender: "Amit Kumar", message: "I watched an ad but didn't receive the promised tip", time: "16:20", type: "user" },
      { sender: "Sarah Wilson", message: "Your ad tip has been credited to your account. You should see it now.", time: "16:45", type: "agent" }
    ]
  }
];

const supportAgents = [
  { id: 1, name: "Sarah Wilson", avatar: "SW" },
  { id: 2, name: "Mike Johnson", avatar: "MJ" },
  { id: 3, name: "Lisa Chen", avatar: "LC" },
  { id: 4, name: "David Brown", avatar: "DB" }
];

const users = [
  { id: 1, name: "Rahul Sharma", email: "rahul@example.com" },
  { id: 2, name: "Priya Patel", email: "priya@example.com" },
  { id: 3, name: "Amit Kumar", email: "amit@example.com" },
  { id: 4, name: "Sneha Singh", email: "sneha@example.com" },
  { id: 5, name: "Vikram Rao", email: "vikram@example.com" }
];

export const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [showRaiseComplaint, setShowRaiseComplaint] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [assignedAgent, setAssignedAgent] = useState('');
  const [internalNotes, setInternalNotes] = useState('');

  // Raise Complaint Form State
  const [complaintForm, setComplaintForm] = useState({
    userName: '',
    subject: '',
    description: '',
    category: 'General',
    urgency: 'Medium',
    uploadedFile: null
  });

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = activeTab === 'all' || ticket.status.toLowerCase().replace(' ', '-') === activeTab;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'Open': 'bg-blue-100 text-blue-800 border-blue-200',
      'In Progress': 'bg-orange-100 text-orange-800 border-orange-200',
      'Resolved': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      'High': 'bg-red-100 text-red-800 border-red-200',
      'Medium': 'bg-orange-100 text-orange-800 border-orange-200',
      'Low': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[urgency as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setAssignedAgent(ticket.assignedAgent);
    setShowTicketDetail(true);
  };

  const handleSendReply = () => {
    if (replyMessage.trim()) {
      console.log('Sending reply:', replyMessage);
      setReplyMessage('');
    }
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    console.log('Changing status:', ticketId, newStatus);
  };

  const handleAssignAgent = (ticketId: string, agent: string) => {
    console.log('Assigning agent:', ticketId, agent);
  };

  const handleRaiseComplaint = () => {
    console.log('Raising complaint:', complaintForm);
    setShowRaiseComplaint(false);
    setComplaintForm({
      userName: '',
      subject: '',
      description: '',
      category: 'General',
      urgency: 'Medium',
      uploadedFile: null
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setComplaintForm({ ...complaintForm, uploadedFile: file });
    }
  };

  const handleEscalate = () => {
    console.log('Escalating ticket:', selectedTicket?.id);
  };

  const handleMarkResolved = () => {
    console.log('Marking ticket as resolved:', selectedTicket?.id);
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Complaints & Support Management</h1>
          <p className="text-muted-foreground mt-2">Manage support tickets and customer complaints</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Advanced Search
          </Button>
          <Dialog open={showRaiseComplaint} onOpenChange={setShowRaiseComplaint}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6">
                <Plus className="h-4 w-4" />
                Raise Complaint
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">Raise New Complaint</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">User Name *</label>
                  <Select value={complaintForm.userName} onValueChange={(value) => setComplaintForm({...complaintForm, userName: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Search and select user" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.name}>
                          <div className="flex flex-col">
                            <span>{user.name}</span>
                            <span className="text-xs text-gray-500">{user.email}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Subject *</label>
                  <Input
                    placeholder="Enter complaint subject"
                    value={complaintForm.subject}
                    onChange={(e) => setComplaintForm({...complaintForm, subject: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Description *</label>
                  <Textarea
                    placeholder="Describe the issue in detail..."
                    value={complaintForm.description}
                    onChange={(e) => setComplaintForm({...complaintForm, description: e.target.value})}
                    className="min-h-24"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
                  <Select value={complaintForm.category} onValueChange={(value) => setComplaintForm({...complaintForm, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General Issue</SelectItem>
                      <SelectItem value="Payment Issue">Payment Issue</SelectItem>
                      <SelectItem value="Withdrawal Issue">Withdrawal Issue</SelectItem>
                      <SelectItem value="Ad Tip Issue">Ad Tip Issue</SelectItem>
                      <SelectItem value="Account Issue">Account Issue</SelectItem>
                      <SelectItem value="Technical Issue">Technical Issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Urgency Level</label>
                  <Select value={complaintForm.urgency} onValueChange={(value) => setComplaintForm({...complaintForm, urgency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Upload Proof (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                    </label>
                    {complaintForm.uploadedFile && (
                      <p className="text-sm text-green-600 mt-2">
                        File uploaded: {complaintForm.uploadedFile.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleRaiseComplaint} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Submit Complaint
                  </Button>
                  <Button variant="outline" onClick={() => setShowRaiseComplaint(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Open Tickets</CardTitle>
              <AlertCircle className="h-8 w-8 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-blue-600 text-sm mt-1">Awaiting Response</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-100 to-orange-200 text-orange-800 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">In Progress</CardTitle>
              <Clock className="h-8 w-8 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18</div>
            <p className="text-orange-600 text-sm mt-1">Being Handled</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-100 to-green-200 text-green-800 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Resolved Today</CardTitle>
              <CheckCircle className="h-8 w-8 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">15</div>
            <p className="text-green-600 text-sm mt-1">Successfully Closed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-100 to-purple-200 text-purple-800 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Avg Response Time</CardTitle>
              <MessageSquare className="h-8 w-8 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2.4h</div>
            <p className="text-purple-600 text-sm mt-1">This Week</p>
          </CardContent>
        </Card>
      </div>

      {/* Support Tickets - Made more visible and prominent */}
      <Card className="shadow-lg bg-white">
        <CardHeader className="border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900">Support Tickets</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64 bg-white border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-gray-200 px-6 pt-6">
              <TabsList className="grid w-full max-w-md grid-cols-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">All Tickets</TabsTrigger>
                <TabsTrigger value="open" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Open</TabsTrigger>
                <TabsTrigger value="in-progress" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">In Progress</TabsTrigger>
                <TabsTrigger value="resolved" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Resolved</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b border-gray-200">
                      <TableHead className="font-semibold text-gray-700 px-6 py-4">Ticket ID</TableHead>
                      <TableHead className="font-semibold text-gray-700 px-6 py-4">User</TableHead>
                      <TableHead className="font-semibold text-gray-700 px-6 py-4">Subject</TableHead>
                      <TableHead className="font-semibold text-gray-700 px-6 py-4">Category</TableHead>
                      <TableHead className="font-semibold text-gray-700 px-6 py-4">Urgency</TableHead>
                      <TableHead className="font-semibold text-gray-700 px-6 py-4">Status</TableHead>
                      <TableHead className="font-semibold text-gray-700 px-6 py-4">Assigned Agent</TableHead>
                      <TableHead className="font-semibold text-gray-700 px-6 py-4">Date</TableHead>
                      <TableHead className="text-right font-semibold text-gray-700 px-6 py-4">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                        <TableCell className="font-medium text-blue-600 px-6 py-4">{ticket.id}</TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <User className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-900">{ticket.user}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs px-6 py-4">
                          <div className="truncate font-medium text-gray-900">{ticket.subject}</div>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <span className="text-sm text-gray-600">{ticket.category}</span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <Badge className={`${getUrgencyColor(ticket.urgency)} border font-medium`}>
                            {ticket.urgency}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <Badge className={`${getStatusColor(ticket.status)} border font-medium`}>
                            {ticket.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-gray-900 px-6 py-4">{ticket.assignedAgent}</TableCell>
                        <TableCell className="text-gray-600 px-6 py-4">{ticket.date}</TableCell>
                        <TableCell className="text-right px-6 py-4">
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewTicket(ticket)}
                              className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 font-medium"
                            >
                              View
                            </Button>
                            <Select onValueChange={(value) => handleStatusChange(ticket.id, value)}>
                              <SelectTrigger className="w-32 h-8 text-sm">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Ticket Detail Modal */}
      <Dialog open={showTicketDetail} onOpenChange={setShowTicketDetail}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="border-b border-gray-200 pb-4">
            <DialogTitle className="flex items-center gap-4 text-xl">
              <span>Ticket Details - {selectedTicket?.id}</span>
              <Badge className={`${getStatusColor(selectedTicket?.status || '')} border`}>
                {selectedTicket?.status}
              </Badge>
              <Badge className={`${getUrgencyColor(selectedTicket?.urgency || '')} border`}>
                {selectedTicket?.urgency} Urgency
              </Badge>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 pt-4">
            {/* Ticket Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="text-sm font-medium text-muted-foreground">User</label>
                <p className="text-lg font-semibold">{selectedTicket?.user}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Subject</label>
                <p className="text-lg font-semibold">{selectedTicket?.subject}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Category</label>
                <p className="text-lg font-semibold">{selectedTicket?.category || 'General'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Date Created</label>
                <p className="text-lg font-semibold">{selectedTicket?.date}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <Button onClick={handleMarkResolved} className="bg-green-600 hover:bg-green-700">
                Mark as Resolved
              </Button>
              <Button variant="outline" onClick={handleEscalate} className="border-orange-300 text-orange-600 hover:bg-orange-50">
                Escalate
              </Button>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Assign to:</label>
                <Select value={assignedAgent} onValueChange={setAssignedAgent}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportAgents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.name}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  size="sm" 
                  onClick={() => handleAssignAgent(selectedTicket?.id, assignedAgent)}
                  variant="outline"
                >
                  Assign
                </Button>
              </div>
            </div>

            {/* Message Thread */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Conversation Thread</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto bg-gray-50 p-4 rounded-lg">
                {selectedTicket?.messages?.map((message: any, index: number) => (
                  <div key={index} className={`flex gap-3 ${message.type === 'agent' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md p-3 rounded-lg shadow-sm ${
                      message.type === 'agent' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white border border-gray-200'
                    }`}>
                      <div className="text-sm font-medium mb-1">{message.sender}</div>
                      <div className="text-sm">{message.message}</div>
                      <div className="text-xs opacity-70 mt-1">{message.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold border-b pb-2">Internal Notes (Admin Only)</h3>
              <Textarea
                placeholder="Add internal notes for team reference..."
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                className="min-h-16 bg-yellow-50 border-yellow-200"
              />
            </div>

            {/* Reply Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold border-b pb-2">Reply to Customer</h3>
              <Textarea
                placeholder="Type your response to the customer..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="min-h-20"
              />
              <div className="flex items-center gap-2">
                <Button onClick={handleSendReply} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4" />
                  Send Reply
                </Button>
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4" />
                  Attach File
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
