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
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function StudentDashboard() {
  const [currentMood, setCurrentMood] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [appointmentTab, setAppointmentTab] = useState('booking')
  const [selectedCounselor, setSelectedCounselor] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [sessionType, setSessionType] = useState('individual')

  // Available counselors
  const counselors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Anxiety & Depression',
      rating: 4.9,
      experience: '10+ years',
      avatar: 'https://i.pravatar.cc/150?img=47'
    },
    {
      id: 2,
      name: 'Dr. Michael Brown',
      specialty: 'Academic Stress',
      rating: 4.8,
      experience: '8 years',
      avatar: 'https://i.pravatar.cc/150?img=33'
    },
    {
      id: 3,
      name: 'Dr. Emily Roberts',
      specialty: 'Relationships & Social Anxiety',
      rating: 4.9,
      experience: '12 years',
      avatar: 'https://i.pravatar.cc/150?img=9'
    }
  ]

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  // Mock data for mood history initialized as state
  const [moodHistory, setMoodHistory] = useState([
    { day: 'Mon', score: 7 },
    { day: 'Tue', score: 6 },
    { day: 'Wed', score: 8 },
    { day: 'Thu', score: 7 },
    { day: 'Fri', score: 9 },
    { day: 'Sat', score: 8 },
    { day: 'Today', score: 0 } // Initialize Today with 0
  ])

  const moods = [
    { name: 'excited', emoji: '😊', color: 'bg-green-100 border-green-500', score: 10 },
    { name: 'happy', emoji: '😄', color: 'bg-blue-100 border-blue-500', score: 8 },
    { name: 'neutral', emoji: '😐', color: 'bg-yellow-100 border-yellow-500', score: 6 },
    { name: 'sad', emoji: '😢', color: 'bg-orange-100 border-orange-500', score: 4 },
    { name: 'stressed', emoji: '😰', color: 'bg-red-100 border-red-500', score: 2 }
  ]

  const upcomingAppointments = [
    {
      id: 1,
      counselor: 'Dr. Sarah Johnson',
      type: 'Individual Session',
      date: 'Tomorrow',
      time: '2:00 PM',
      avatar: 'https://i.pravatar.cc/150?img=47'
    },
    {
      id: 2,
      counselor: 'Group Session',
      type: 'Stress Management',
      date: 'Friday',
      time: '4:00 PM',
      avatar: null
    }
  ]

  const appointmentHistory = [
    {
      id: 1,
      counselor: 'Dr. Michael Brown',
      type: 'Individual Session',
      date: 'Jan 15, 2026',
      time: '3:00 PM',
      status: 'Completed',
      avatar: 'https://i.pravatar.cc/150?img=33'
    },
    {
      id: 2,
      counselor: 'Dr. Sarah Johnson',
      type: 'Individual Session',
      date: 'Jan 10, 2026',
      time: '2:00 PM',
      status: 'Completed',
      avatar: 'https://i.pravatar.cc/150?img=47'
    }
  ]

  const handleMoodSelect = (moodName) => {
    setCurrentMood(moodName)

    // Find the score for the selected mood
    const moodData = moods.find(m => m.name === moodName)
    if (moodData) {
      // Update the "Today" entry in moodHistory
      const newHistory = [...moodHistory]
      newHistory[newHistory.length - 1] = { day: 'Today', score: moodData.score }
      setMoodHistory(newHistory)
    }
  }

  const handleLogout = () => {
    window.location.href = '/'
  }

  const handleBookAppointment = () => {
    if (selectedCounselor && selectedDate && selectedTime) {
      // In a real app, this would send to backend
      alert(`Appointment booked with ${counselors.find(c => c.id === selectedCounselor)?.name} on ${selectedDate} at ${selectedTime}`)
      setSelectedCounselor(null)
      setSelectedDate('')
      setSelectedTime('')
      setAppointmentTab('upcoming') // Switch to upcoming tab
    } else {
      alert('Please select a counselor, date, and time')
    }
  }

  // Chart data
  const chartData = {
    labels: moodHistory.map(m => m.day),
    datasets: [
      {
        label: 'Mood Score',
        data: moodHistory.map(m => m.score),
        fill: true,
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderColor: 'rgba(102, 126, 234, 1)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(102, 126, 234, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  const averageMood = (moodHistory.reduce((acc, curr) => acc + curr.score, 0) / moodHistory.length).toFixed(1)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-brain text-white text-xl"></i>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                MindWell
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'dashboard'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-purple-600'
                  }`}
              >
                <i className="fas fa-home mr-2"></i>Dashboard
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'appointments'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-purple-600'
                  }`}
              >
                <i className="fas fa-calendar mr-2"></i>Appointments
              </button>
              <button
                onClick={() => window.location.href = '/learn'}
                className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:text-purple-600 transition-all"
              >
                <i className="fas fa-book-open mr-2"></i>Learn
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <i className="fas fa-bell text-gray-600 text-xl"></i>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <img
                  src="https://i.pravatar.cc/150?img=20"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-purple-500"
                />
                <div className="hidden lg:block">
                  <p className="font-semibold text-gray-800">Alex Johnson</p>
                  <p className="text-sm text-gray-500">Student</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <>
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex!</h1>
              <p className="text-gray-600">Here's your mental wellness overview for today</p>
            </div>

            {/* Dashboard Section */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Mood Tracker Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 col-span-full lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  <i className="fas fa-smile text-purple-600 mr-2"></i>How are you feeling today?
                </h3>
                <div className="flex justify-around items-center">
                  {moods.map((mood) => (
                    <button
                      key={mood.name}
                      onClick={() => handleMoodSelect(mood.name)}
                      className={`text-4xl hover:scale-110 transition transform ${currentMood === mood.name ? 'scale-125' : ''
                        } ${mood.color} w-16 h-16 rounded-full flex items-center justify-center border-2 ${currentMood === mood.name ? '' : 'border-transparent'}`}
                    >
                      {mood.emoji}
                    </button>
                  ))}
                </div>
                {currentMood && (
                  <p className="text-center mt-4 text-gray-600">
                    You're feeling <span className="font-semibold text-purple-600">{currentMood}</span> today
                  </p>
                )}
              </div>

              {/* Next Session Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                    <i className="fas fa-calendar-alt text-white text-xl"></i>
                  </div>
                  <span className="text-sm text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full">
                    Upcoming
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Next Session</h3>
                <p className="text-2xl font-bold text-gray-900">Tomorrow</p>
                <p className="text-sm text-gray-500">2:00 PM with Dr. Sarah</p>
              </div>

              {/* Sessions Completed Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 gradient-success rounded-xl flex items-center justify-center">
                    <i className="fas fa-check-circle text-white text-xl"></i>
                  </div>
                  <span className="text-sm text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full">
                    +3 this month
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Sessions Completed</h3>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-500">Great progress!</p>
              </div>
            </div>

            {/* Mood Trends Chart */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  <i className="fas fa-chart-line text-purple-600 mr-2"></i>Mood Trends (Last 7 Days)
                </h3>
                <div style={{ height: '300px' }}>
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>

              {/* Daily Mood Scores */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Daily Mood Scores</h3>
                <div className="space-y-3">
                  {moodHistory.slice(-5).reverse().map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">{item.day}</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className="gradient-primary h-2 rounded-full"
                            style={{ width: `${item.score * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-purple-600 font-bold">{item.score}/10</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-800">Average Mood</p>
                    <p className="text-2xl font-bold text-purple-600">{averageMood}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                <i className="fas fa-history text-purple-600 mr-2"></i>Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-check text-green-600"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Completed AI Assistant session</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-calendar text-blue-600"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Scheduled appointment with Dr. Sarah</p>
                    <p className="text-xs text-gray-500">Yesterday at 3:45 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-smile text-purple-600"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Logged mood: Happy</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'appointments' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Appointments</h1>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setAppointmentTab('booking')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${appointmentTab === 'booking'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <i className="fas fa-calendar-plus mr-2"></i>Book Appointment
              </button>
              <button
                onClick={() => setAppointmentTab('upcoming')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${appointmentTab === 'upcoming'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <i className="fas fa-clock mr-2"></i>Upcoming
              </button>
              <button
                onClick={() => setAppointmentTab('history')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${appointmentTab === 'history'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <i className="fas fa-history mr-2"></i>History
              </button>
            </div>

            {/* Booking Tab */}
            {appointmentTab === 'booking' && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Side - Counselor Selection */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      <i className="fas fa-user-md text-purple-600 mr-2"></i>Select Counselor
                    </h3>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                      {counselors.map((counselor) => (
                        <div
                          key={counselor.id}
                          onClick={() => setSelectedCounselor(counselor.id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedCounselor === counselor.id
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <img src={counselor.avatar} alt={counselor.name} className="w-12 h-12 rounded-full" />
                              <div>
                                <h4 className="font-bold text-gray-900">{counselor.name}</h4>
                                <p className="text-sm text-gray-600">{counselor.specialty}</p>
                                <p className="text-xs text-gray-500">{counselor.experience}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-yellow-500">
                                <i className="fas fa-star mr-1 text-sm"></i>
                                <span className="font-semibold">{counselor.rating}</span>
                              </div>
                              {selectedCounselor === counselor.id && (
                                <i className="fas fa-check-circle text-purple-600 text-lg mt-1"></i>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Side - Date & Time Selection */}
                  <div>
                    {/* Session Type */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-users text-purple-600 mr-2"></i>Session Type
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          className={`border-2 rounded-xl p-3 font-semibold transition-all ${sessionType === 'individual'
                            ? 'border-purple-600 bg-purple-50 text-purple-700'
                            : 'border-gray-300 hover:border-purple-400'
                            }`}
                          onClick={() => setSessionType('individual')}
                        >
                          <i className="fas fa-user mr-2"></i>Individual
                        </button>
                        <button
                          className={`border-2 rounded-xl p-3 font-semibold transition-all ${sessionType === 'group'
                            ? 'border-purple-600 bg-purple-50 text-purple-700'
                            : 'border-gray-300 hover:border-purple-400'
                            }`}
                          onClick={() => setSessionType('group')}
                        >
                          <i className="fas fa-users mr-2"></i>Group
                        </button>
                      </div>
                    </div>

                    {/* Date Selection */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-calendar text-purple-600 mr-2"></i>Select Date
                      </h3>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none font-medium"
                      />
                    </div>

                    {/* Time Selection */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-clock text-purple-600 mr-2"></i>Select Time
                      </h3>
                      <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
                        {availableTimes.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-lg font-semibold transition-all ${selectedTime === time
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Book Button */}
                    <button
                      onClick={handleBookAppointment}
                      disabled={!selectedCounselor || !selectedDate || !selectedTime}
                      className={`w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all ${selectedCounselor && selectedDate && selectedTime
                        ? 'btn-primary text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      <i className="fas fa-calendar-check mr-2"></i>
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Upcoming Appointments */}
            {appointmentTab === 'upcoming' && (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {appointment.avatar ? (
                          <img
                            src={appointment.avatar}
                            alt={appointment.counselor}
                            className="w-16 h-16 rounded-full"
                          />
                        ) : (
                          <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center">
                            <i className="fas fa-users text-white text-2xl"></i>
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{appointment.counselor}</h4>
                          <p className="text-gray-600">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{appointment.date}</p>
                        <p className="text-gray-600">{appointment.time}</p>
                        <button className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all">
                          <i className="fas fa-video mr-2"></i>Join Session
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Appointment History */}
            {appointmentTab === 'history' && (
              <div className="space-y-4">
                {appointmentHistory.map((appointment) => (
                  <div key={appointment.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={appointment.avatar}
                          alt={appointment.counselor}
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{appointment.counselor}</h4>
                          <p className="text-gray-600">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{appointment.date}</p>
                        <p className="text-gray-600">{appointment.time}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  )
}


export default StudentDashboard
