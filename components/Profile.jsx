"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiActivity, FiCalendar, FiUser, FiMail, FiTrendingUp, FiSettings, FiLogOut } from 'react-icons/fi';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  FunnelChart,
  Funnel,
  Cell,
  BarChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState(null);
const [showMeetingModal, setShowMeetingModal] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setCompanyData({
        name: 'Acme Inc.',
        logo: 'https://via.placeholder.com/150',
        email: 'contact@acme.com',
        leadsContacted: 124,
        scheduledMeetings: 18,
        conversionRate: '24%',
        monthlyGrowth: '+12%'
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
const leadsOverTimeData1 = [
  { date: 'Jan 1', leadsAdded: 20, leadsContacted: 15 },
  { date: 'Jan 2', leadsAdded: 25, leadsContacted: 18 },
  { date: 'Jan 3', leadsAdded: 18, leadsContacted: 12 },
  { date: 'Jan 4', leadsAdded: 30, leadsContacted: 22 },
  { date: 'Jan 5', leadsAdded: 22, leadsContacted: 18 },
  { date: 'Jan 6', leadsAdded: 28, leadsContacted: 20 },
  { date: 'Jan 7', leadsAdded: 35, leadsContacted: 28 },
];
const funnelData = [
  { name: 'Leads Added', value: 100 },
  { name: 'Contacted', value: 80 },
  { name: 'Replied', value: 50 },
  { name: 'Meeting', value: 30 },
  { name: 'Converted', value: 15 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const leadSourceData = [
  { name: 'Website', leads: 400, converted: 60 },
  { name: 'LinkedIn', leads: 300, converted: 45 },
  { name: 'Referrals', leads: 200, converted: 35 },
  { name: 'Cold Email', leads: 150, converted: 10 },
  { name: 'Events', leads: 100, converted: 25 },
];
const campaignData = [
  { subject: 'Open Rate', A: 78, B: 65 },
  { subject: 'Click Rate', A: 45, B: 38 },
  { subject: 'Reply Rate', A: 22, B: 18 },
  { subject: 'Meeting Rate', A: 15, B: 12 },
  { subject: 'Conversion', A: 8, B: 5 },
];
const activityData1 = [
  {
    icon: <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>,
    iconBg: 'bg-blue-100',
    title: 'New lead added',
    description: 'John Smith from Acme Corp',
    time: '2 minutes ago'
  },
  {
    icon: <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>,
    iconBg: 'bg-green-100',
    title: 'Email sent',
    description: 'Initial outreach to Sarah Johnson',
    time: '1 hour ago'
  },
  {
    icon: <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>,
    iconBg: 'bg-purple-100',
    title: 'Meeting scheduled',
    description: 'Product demo with Tech Solutions',
    time: '3 hours ago'
  },
  {
    icon: <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>,
    iconBg: 'bg-yellow-100',
    title: 'Deal closed',
    description: 'Acme Corp - $12,000 annual contract',
    time: 'Yesterday'
  }
];
  // Chart data
  const leadsOverTimeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Leads Contacted',
        data: [12, 19, 15, 27, 34, 42, 38],
        borderColor: 'rgba(124, 58, 237, 1)',
        backgroundColor: 'rgba(124, 58, 237, 0.2)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Meetings Scheduled',
        data: [3, 5, 7, 9, 11, 13, 15],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const activityData = [
    { id: 1, type: 'email', contact: 'john.doe@example.com', time: '10 mins ago', status: 'sent' },
    { id: 2, type: 'meeting', contact: 'Jane Smith', time: '2 hours ago', status: 'scheduled' },
    { id: 3, type: 'call', contact: 'Mike Johnson', time: '1 day ago', status: 'completed' },
    { id: 4, type: 'followup', contact: 'Sarah Williams', time: '2 days ago', status: 'pending' },
    { id: 5, type: 'email', contact: 'david.brown@example.com', time: '3 days ago', status: 'opened' },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'email': return <FiMail className="text-purple-500" />;
      case 'meeting': return <FiCalendar className="text-blue-500" />;
      case 'call': return <FiUser className="text-green-500" />;
      case 'followup': return <FiTrendingUp className="text-yellow-500" />;
      default: return <FiActivity className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-purple-100 text-purple-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'opened': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
// State for settings
const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  const storedDarkMode = localStorage.getItem('darkMode');
  if (storedDarkMode !== null) {
    setDarkMode(JSON.parse(storedDarkMode));
  }
}, []);
useEffect(() => {
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
}, [darkMode]);

const [user, setUser] = useState({
  avatar: '',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  githubConnected: true
});

const [notifications, setNotifications] = useState({
  newLeads: true,
  meetingReminders: true,
  proposalViews: false,
  teamActivity: true
});

const [dashboardWidgets, setDashboardWidgets] = useState({
  leadsGraph: true,
  activityLog: true,
  campaignTracker: false
});

const [dashboardOrder, setDashboardOrder] = useState([
  { id: 1, name: 'Leads Graph' },
  { id: 2, name: 'Activity Log' },
  { id: 3, name: 'Campaign Tracker' }
]);

// Toggle functions
const toggleNotification = (type) => {
  setNotifications(prev => ({...prev, [type]: !prev[type]}));
};

const toggleWidget = (widget) => {
  setDashboardWidgets(prev => ({...prev, [widget]: !prev[widget]}));
};
  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center bg-gray-50"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen min-w-screen bg-gray-50"
    >
      {/* Sidebar */}
      <div className="flex">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-64 fixed h-screen bg-white shadow-lg z-10"
        >
          <div className="p-6 border-b border-gray-200">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center mb-4"
            >
              <img 
                src={companyData.logo} 
                alt="Company Logo" 
                className="w-16 h-16 rounded-full object-cover border-2 border-purple-500 shadow-md"
              />
            </motion.div>
            <motion.h2 
              className="text-xl font-semibold text-center text-gray-800"
              whileHover={{ scale: 1.02 }}
            >
              {companyData.name}
            </motion.h2>
            <p className="text-sm text-center text-gray-500 mt-1">{companyData.email}</p>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              <motion.li
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiActivity className="mr-3" />
                  Dashboard
                </button>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === 'leads' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiUser className="mr-3" />
                  Leads
                </button>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => setActiveTab('meetings')}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === 'meetings' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiCalendar className="mr-3" />
                  Meetings
                </button>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === 'analytics' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiTrendingUp className="mr-3" />
                  Analytics
                </button>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
               <button
  onClick={() => window.open('https://render-lead-loom.onrender.com/', '_blank')}
  className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === 'services' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
>
  <FiTrendingUp className="mr-3" />
  Services
</button>

              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiSettings className="mr-3" />
                  Settings
                </button>
              </motion.li>
            </ul>
          </nav>

          <div className="absolute bottom-0 w-full p-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center w-full p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiLogOut className="mr-3" />
              Logout
            </motion.button>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex-1 ml-64 p-8 text-black"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <motion.h1 
                    className="text-3xl font-bold text-gray-800"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                  >
                    Dashboard
                  </motion.h1>
                  <motion.p 
                    className="text-sm text-gray-500"
                    initial={{ x: 20 }}
                    animate={{ x: 0 }}
                  >
                    Last updated: {new Date().toLocaleDateString()}
                  </motion.p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-black">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Leads Contacted</p>
                        <h3 className="text-2xl font-bold mt-1">{companyData.leadsContacted}</h3>
                      </div>
                      <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                        <FiUser size={20} />
                      </div>
                    </div>
                    <p className="text-sm text-green-500 mt-2">{companyData.monthlyGrowth} from last month</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Scheduled Meetings</p>
                        <h3 className="text-2xl font-bold mt-1">{companyData.scheduledMeetings}</h3>
                      </div>
                      <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                        <FiCalendar size={20} />
                      </div>
                    </div>
                    <p className="text-sm text-green-500 mt-2">+3 this week</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Conversion Rate</p>
                        <h3 className="text-2xl font-bold mt-1">{companyData.conversionRate}</h3>
                      </div>
                      <div className="p-3 rounded-full bg-green-100 text-green-600">
                        <FiTrendingUp size={20} />
                      </div>
                    </div>
                    <p className="text-sm text-green-500 mt-2">+2% from last quarter</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Active Campaigns</p>
                        <h3 className="text-2xl font-bold mt-1">4</h3>
                      </div>
                      <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                        <FiMail size={20} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">2 ending soon</p>
                  </motion.div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                  >
                    <h3 className=" text-black text-lg font-semibold mb-4">Leads Over Time</h3>
                    <div className="h-64">
                      <Line 
                        data={leadsOverTimeData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                          },
                        }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                  >
                    <h3 className="text-lg  text-black font-semibold mb-4">Activity Breakdown</h3>
                    <div className="h-64">
                      <Bar 
                        data={{
                          labels: ['Emails', 'Calls', 'Meetings', 'Follow-ups'],
                          datasets: [{
                            label: 'Activities',
                            data: [45, 22, 18, 15],
                            backgroundColor: [
                              'rgba(124, 58, 237, 0.8)',
                              'rgba(59, 130, 246, 0.8)',
                              'rgba(16, 185, 129, 0.8)',
                              'rgba(245, 158, 11, 0.8)'
                            ],
                            borderColor: [
                              'rgba(124, 58, 237, 1)',
                              'rgba(59, 130, 246, 1)',
                              'rgba(16, 185, 129, 1)',
                              'rgba(245, 158, 11, 1)'
                            ],
                            borderWidth: 1
                          }]
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              display: false
                            },
                          },
                        }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Recent Activities */}
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                >
                  <div className="flex text-black justify-between items-center mb-4">
                    <h3 className=" text-black text-lg font-semibold">Recent Activities</h3>
                    <button className="text-sm text-purple-600 hover:text-purple-800">View All</button>
                  </div>
                  <div className="space-y-4">
                    {activityData.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex text-black items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="p-2 mr-4 rounded-full bg-gray-100">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium capitalize">{activity.type} with {activity.contact}</p>
                            <span className="text-sm text-gray-500">{activity.time}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(activity.status)}`}>
                            {activity.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'leads' && (
  <motion.div
    key="leads"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">Leads Management</h1>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
        Add New Lead
      </button>
    </div>

    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search leads..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex space-x-2">
          <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Filter by Status</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Lost</option>
          </select>
          <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Sort by</option>
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>Name (A-Z)</option>
            <option>Name (Z-A)</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((lead) => (
              <tr key={lead} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">JD</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">John Doe</div>
                      <div className="text-sm text-gray-500">Lead Source: Website</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Acme Inc</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">john@example.com</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">(555) 123-4567</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Qualified
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 days ago</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">23</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            1
          </button>
          <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  </motion.div>
)}

{activeTab === 'meetings' && (
  <motion.div
    key="meetings"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">Meetings Schedule</h1>
      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
        onClick={() => setShowMeetingModal(true)}
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Schedule Meeting
      </button>
    </div>

    {/* Analytics Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm font-medium">Upcoming</h3>
        <p className="text-2xl font-bold text-blue-600">12</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
        <p className="text-2xl font-bold text-green-600">48</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm font-medium">No-show Rate</h3>
        <p className="text-2xl font-bold text-red-600">8%</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm font-medium">Avg Duration</h3>
        <p className="text-2xl font-bold text-purple-600">32m</p>
      </div>
    </div>

    {/* Upcoming Meetings */}
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Upcoming Meetings (5)</h2>
        <div className="flex space-x-2">
          <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            <option>All Types</option>
            <option>Sales</option>
            <option>Support</option>
            <option>Demo</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((meeting) => (
          <div key={meeting} className="border-l-4 border-blue-500 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">Product Demo with Acme Corp</h3>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Today, 2:00 PM - 2:30 PM (in 1h 23m)</span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>John Smith (Acme), Sarah Johnson (You)</span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  <span>Zoom Meeting (link sent)</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Join</button>
                <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Reschedule</button>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">Cancel</button>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Suggested Follow-ups:</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Send proposal</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Share case studies</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Past Meetings */}
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Past Meetings (12)</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[1, 2, 3, 4].map((meeting) => (
              <tr key={meeting} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Follow-up discussion</div>
                  <div className="text-sm text-gray-500">Sales</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">John Smith (Acme)</div>
                  <div className="text-sm text-gray-500">You, Marketing Team</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2 days ago
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  45m
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Notes</button>
                  <button className="text-purple-600 hover:text-purple-900">Follow-up</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">12</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            1
          </button>
          <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>

    {/* Meeting Modal (would be conditionally rendered) */}
    {showMeetingModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Schedule New Meeting</h3>
              <button onClick={() => setShowMeetingModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input type="time" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option selected>45 minutes</option>
                  <option>60 minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">With Lead</label>
                <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select lead...</option>
                  <option>John Smith (Acme Corp)</option>
                  <option>Sarah Johnson (Tech Solutions)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Type</label>
                <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Sales</option>
                  <option>Support</option>
                  <option>Demo</option>
                  <option>Strategy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="radio" id="zoom" name="platform" className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="zoom" className="ml-2 block text-sm text-gray-700">Zoom</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="google-meet" name="platform" className="h-4 w-4 text-blue-600 focus:ring-blue-500" checked />
                    <label htmlFor="google-meet" className="ml-2 block text-sm text-gray-700">Google Meet</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="in-person" name="platform" className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="in-person" className="ml-2 block text-sm text-gray-700">In Person</label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="send-invite" className="h-4 w-4 text-blue-600 focus:ring-blue-500" checked />
                <label htmlFor="send-invite" className="ml-2 block text-sm text-gray-700">Send calendar invite automatically</label>
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="set-reminder" className="h-4 w-4 text-blue-600 focus:ring-blue-500" checked />
                <label htmlFor="set-reminder" className="ml-2 block text-sm text-gray-700">Set reminder (15 minutes before)</label>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowMeetingModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700"
              >
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </motion.div>
)}

            {activeTab === 'analytics' && (
  <motion.div
    key="analytics"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
        <div className="flex space-x-2">
          <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>Custom Range</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ... KPI cards remain unchanged ... */}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads Over Time */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Leads Over Time</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={leadsOverTimeData1}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="leadsAdded" stackId="1" stroke="#8884d8" fill="#8884d8" name="Leads Added" />
                <Area type="monotone" dataKey="leadsContacted" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Leads Contacted" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Conversion Funnel</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip />
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Source Analysis */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Lead Source Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadSourceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="leads" fill="#8884d8" name="Total Leads" />
                <Bar dataKey="converted" fill="#82ca9d" name="Converted" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={campaignData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Tooltip />
                <Radar name="Campaign A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Campaign B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {activityData1.map((activity, index) => (
            <div key={index} className="flex items-start">
              <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${activity.iconBg}`}>
                {activity.icon}
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                <div className="text-sm text-gray-500">{activity.description}</div>
                <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
)}

       {activeTab === 'services' && null}

            {activeTab === 'settings' && (
  <motion.div
    key="settings"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="text-gray-800 dark:text-gray-200 "
  >
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl text-black font-bold mb-8">Account Settings</h1>

      {/* Dark Mode Toggle */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">🌙 Theme Preferences</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Switch between light and dark mode</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={darkMode}
              onChange={() => {
                const newMode = !darkMode;
                setDarkMode(newMode);
                localStorage.setItem('darkMode', JSON.stringify(newMode));
              }}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium">
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
          </label>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">👤 Profile Information</h2>
        
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative">
            <img 
              className="w-20 h-20 rounded-full object-cover" 
              src={user.avatar || "https://via.placeholder.com/150"} 
              alt="Profile" 
            />
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <div>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">Upload new photo</button>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">JPG, GIF or PNG. Max size 2MB</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input 
              type="text" 
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" 
              value={user.firstName}
              onChange={(e) => setUser({...user, firstName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input 
              type="text" 
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" 
              value={user.lastName}
              onChange={(e) => setUser({...user, lastName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" 
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input 
                type="password" 
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" 
                value="••••••••"
                disabled
              />
              <button className="absolute right-3 top-2 text-blue-600 dark:text-blue-400 text-sm font-medium">
                Change
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Connected Accounts</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <span>GitHub</span>
            </div>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">
              {user.githubConnected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">🛎️ Notification Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">New leads</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when new leads are added</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.newLeads} onChange={() => toggleNotification('newLeads')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Meeting reminders</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Reminders before scheduled meetings</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.meetingReminders} onChange={() => toggleNotification('meetingReminders')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Proposal views</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">When your proposals are viewed</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.proposalViews} onChange={() => toggleNotification('proposalViews')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Team activity</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Important actions by your team members</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.teamActivity} onChange={() => toggleNotification('teamActivity')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Dashboard Customization */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">📊 Dashboard Customization</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Leads Graph</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Show leads over time visualization</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={dashboardWidgets.leadsGraph} onChange={() => toggleWidget('leadsGraph')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Activity Log</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Recent team activity timeline</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={dashboardWidgets.activityLog} onChange={() => toggleWidget('activityLog')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Campaign Tracker</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Performance of marketing campaigns</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={dashboardWidgets.campaignTracker} onChange={() => toggleWidget('campaignTracker')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Advanced: Drag and Drop Reordering */}
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-medium mb-3">Reorder Dashboard Sections</h3>
            <div className="space-y-2">
              {dashboardOrder.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-gray-400 cursor-move" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span>{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{index + 1}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Drag and drop to reorder your dashboard sections</p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileDashboard;