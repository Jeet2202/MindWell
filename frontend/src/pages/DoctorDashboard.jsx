import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Mock Data
  const stats = [
    { title: "Today's Appointments", value: 5, icon: 'fa-calendar-check', color: 'text-purple-600 bg-purple-100', change: '+2 from yesterday' },
    { title: 'Pending Requests', value: 3, icon: 'fa-clock', color: 'text-yellow-600 bg-yellow-100', change: '+1 from yesterday' },
    { title: 'Active Students', value: 24, icon: 'fa-users', color: 'text-green-600 bg-green-100', change: '+12% this week' },
    { title: 'Alerts to Review', value: 2, icon: 'fa-exclamation-triangle', color: 'text-red-600 bg-red-100', change: '-1 from yesterday' }
  ]

  const upcomingAppointments = [
    { id: 1, name: 'Jessica Brown', time: '09:00 AM', type: 'Individual', status: 'Confirmed', img: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Michael Chen', time: '10:30 AM', type: 'Group Session', status: 'Confirmed', img: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Alex Martinez', time: '01:00 PM', type: 'Individual', status: 'Pending', img: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Sarah Wilson', time: '03:00 PM', type: 'Individual', status: 'Confirmed', img: 'https://i.pravatar.cc/150?img=4' }
  ]

  const alerts = [
    { id: 1, name: 'Alex Martinez', type: 'High Stress', message: 'Reported high stress levels during chatbot interaction', time: '1 hour ago', severity: 'high' },
    { id: 2, name: 'Sarah Johnson', type: 'Missed Session', message: 'Missed scheduled appointment without notice', time: '3 hours ago', severity: 'medium' }
  ]

  const patients = [
    { id: 1, name: 'Jessica Brown', age: 20, status: 'Improving', lastVisit: '2 days ago', risk: 'Low' },
    { id: 2, name: 'Alex Martinez', age: 22, status: 'At Risk', lastVisit: '1 week ago', risk: 'High' },
    { id: 3, name: 'Michael Chen', age: 19, status: 'Stable', lastVisit: '3 days ago', risk: 'Medium' },
    { id: 4, name: 'Sarah Wilson', age: 21, status: 'Improving', lastVisit: 'Yesterday', risk: 'Low' },
    { id: 5, name: 'David Lee', age: 23, status: 'Stable', lastVisit: '2 weeks ago', risk: 'Low' }
  ]

  // Chart Data
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Average Student Mood',
        data: [6.5, 6.8, 7.2, 7.0, 7.5, 7.8, 8.0],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Anxiety Reports',
        data: [4, 3, 5, 2, 3, 1, 2],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
      }
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 10,
      }
    }
  }

  const handleLogout = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-white shadow-xl z-50 w-64 transform ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300`}>
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <i className="fas fa-brain text-white text-sm"></i>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            MindWell MD
          </span>
        </div>

        <nav className="p-4 space-y-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <i className="fas fa-home w-6"></i>
            <span className="font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'appointments' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <i className="fas fa-calendar-alt w-6"></i>
            <span className="font-medium">Appointments</span>
          </button>

          <button
            onClick={() => setActiveTab('patients')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'patients' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <i className="fas fa-user-injured w-6"></i>
            <span className="font-medium">Patients</span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'resources' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <i className="fas fa-book-medical w-6"></i>
            <span className="font-medium">Resources</span>
          </button>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium"
          >
            <i className="fas fa-sign-out-alt w-6"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm z-40 p-4 flex justify-between items-center lg:px-8">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="lg:hidden text-gray-600">
            <i className="fas fa-bars text-xl"></i>
          </button>

          <h1 className="text-xl font-bold text-gray-800 ml-2 lg:ml-0 capitalize">
            {activeTab} Overview
          </h1>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <button className="text-gray-500 hover:text-purple-600 transition-colors relative">
                <i className="fas fa-bell text-xl"></i>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right hidden md:block">
                <p className="font-bold text-gray-900 text-sm">Dr. Emily Wilson</p>
                <p className="text-xs text-gray-500">Senior Counselor</p>
              </div>
              <img src="https://i.pravatar.cc/150?img=5" alt="Dr Profile" className="w-10 h-10 rounded-full border-2 border-purple-200" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">

          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-gray-500 font-medium mb-1">{stat.title}</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.color}`}>
                        <i className={`fas ${stat.icon} text-lg`}></i>
                      </div>
                    </div>
                    <p className={`text-xs font-semibold flex items-center ${stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                      <i className={`fas fa-arrow-${stat.change.includes('+') ? 'up' : 'down'} mr-1`}></i>
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Col - Chart & Appointments */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Chart */}
                  <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Patient Progress Overview</h3>
                    <div className="h-64">
                      <Line data={chartData} options={chartOptions} />
                    </div>
                  </div>

                  {/* Recent Appointments Table */}
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-gray-900">Today's Schedule</h3>
                      <button className="text-purple-600 text-sm font-semibold hover:text-purple-700">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 text-left">
                          <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Time</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Patient</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {upcomingAppointments.map((apt) => (
                            <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">{apt.time}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-3">
                                  <img src={apt.img} alt={apt.name} className="w-8 h-8 rounded-full" />
                                  <span className="text-sm font-medium text-gray-800">{apt.name}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">{apt.type}</td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                  }`}>
                                  {apt.status}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex space-x-2">
                                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Video Call">
                                    <i className="fas fa-video"></i>
                                  </button>
                                  <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Chat">
                                    <i className="fas fa-comment"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Right Col - Alerts & Quick Actions */}
                <div className="space-y-8">
                  {/* Alerts */}
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Critical Alerts</h3>
                    <div className="space-y-4">
                      {alerts.map((alert) => (
                        <div key={alert.id} className="p-4 rounded-xl bg-red-50 border border-red-100">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center space-x-2">
                              <i className="fas fa-exclamation-circle text-red-500"></i>
                              <span className="font-bold text-red-700 text-sm">{alert.type}</span>
                            </div>
                            <span className="text-xs text-red-400">{alert.time}</span>
                          </div>
                          <p className="text-sm text-gray-800 font-medium mb-1">{alert.name}</p>
                          <p className="text-xs text-gray-600 mb-3">{alert.message}</p>
                          <button className="w-full py-2 bg-white text-red-600 text-xs font-bold rounded-lg border border-red-200 hover:bg-red-50 transition-colors">
                            Review Now
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
                    <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all text-left px-4 flex items-center">
                        <i className="fas fa-plus-circle mr-3"></i> Create Appointment
                      </button>
                      <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all text-left px-4 flex items-center">
                        <i className="fas fa-file-prescription mr-3"></i> Send Resources
                      </button>
                      <button className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all text-left px-4 flex items-center">
                        <i className="fas fa-user-plus mr-3"></i> Add New Patient
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PATIENTS TAB */}
          {activeTab === 'patients' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Patient List</h2>
                <div className="flex space-x-3 w-full md:w-auto">
                  <div className="relative flex-1">
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input type="text" placeholder="Search patients..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 w-full" />
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700">
                    <i className="fas fa-filter mr-2"></i>Filter
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Patient Name</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Age</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Last Visit</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Risk Level</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {patients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{patient.name}</td>
                        <td className="px-6 py-4 text-gray-600">{patient.age}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${patient.status === 'At Risk' ? 'bg-red-100 text-red-700' :
                              patient.status === 'Improving' ? 'bg-green-100 text-green-700' :
                                'bg-blue-100 text-blue-700'
                            }`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{patient.lastVisit}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${patient.risk === 'High' ? 'bg-red-500' :
                                patient.risk === 'Medium' ? 'bg-yellow-500' :
                                  'bg-green-500'
                              }`}></div>
                            <span className="text-sm font-medium">{patient.risk}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-gray-400 hover:text-purple-600 mr-3">
                            <i className="fas fa-file-medical-alt text-lg"></i>
                          </button>
                          <button className="text-gray-400 hover:text-blue-600">
                            <i className="fas fa-comment-medical text-lg"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* OTHER TABS PLACEHOLDERS */}
          {(activeTab === 'appointments' || activeTab === 'resources') && (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <i className="fas fa-tools text-6xl mb-4 text-gray-300"></i>
              <h2 className="text-2xl font-bold text-gray-700">Under Construction</h2>
              <p>This section is currently being updated with new features.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default DoctorDashboard
