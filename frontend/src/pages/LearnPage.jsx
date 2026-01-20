import { useState } from 'react'

function LearnPage() {
  const [activeTab, setActiveTab] = useState('modules')
  const [activeChatRoom, setActiveChatRoom] = useState(null)

  // Learning Modules Data
  const modules = [
    {
      id: 1,
      title: 'Anxiety Management',
      description: 'Learn effective techniques to manage and reduce daily anxiety.',
      progress: 65,
      chapters: [
        { title: 'Understanding Anxiety', duration: '10 min', completed: true },
        { title: 'Breathing Techniques', duration: '15 min', completed: true },
        { title: 'Cognitive Reframing', duration: '20 min', completed: false },
        { title: 'Exposure Therapy Basics', duration: '25 min', completed: false }
      ],
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 2,
      title: 'Stress Reduction',
      description: 'Master the art of staying calm under pressure.',
      progress: 30,
      chapters: [
        { title: 'Identifying Stressors', duration: '10 min', completed: true },
        { title: 'Mindfulness Basics', duration: '15 min', completed: false },
        { title: 'Progressive Relaxation', duration: '20 min', completed: false }
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'Sleep Hygiene',
      description: 'Improve your sleep quality for better mental health.',
      progress: 0,
      chapters: [
        { title: 'The Science of Sleep', duration: '15 min', completed: false },
        { title: 'Creating a Routine', duration: '10 min', completed: false },
        { title: 'Environment Optimization', duration: '15 min', completed: false }
      ],
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  // Assessments Data
  const assessments = [
    {
      id: 1,
      title: 'General Anxiety Scale (GAD-7)',
      description: 'Check your anxiety levels with this standard medical assessment.',
      questions: 7,
      time: '5 mins',
      lastTaken: '2 weeks ago',
      score: 'Mild'
    },
    {
      id: 2,
      title: 'Depression Index (PHQ-9)',
      description: 'Evaluate your mood and signs of depression.',
      questions: 9,
      time: '7 mins',
      lastTaken: 'Never',
      score: null
    },
    {
      id: 3,
      title: 'Stress Level Test',
      description: 'Measure your current stress load and coping capacity.',
      questions: 10,
      time: '5 mins',
      lastTaken: '1 month ago',
      score: 'Moderate'
    }
  ]

  // Chat Rooms Data
  const chatRooms = [
    { id: 1, name: 'Anxiety Support', online: 12, topic: 'Daily Check-in' },
    { id: 2, name: 'Academic Stress', online: 24, topic: 'Exam Preparation' },
    { id: 3, name: 'Mindfulness Practice', online: 8, topic: 'Evening Meditation' },
    { id: 4, name: 'Sleep Struggles', online: 15, topic: 'Night Routine' }
  ]

  const [messages, setMessages] = useState([
    { id: 1, user: 'Sarah', text: 'Has anyone tried the 4-7-8 breathing technique?', time: '10:30 AM', isMe: false },
    { id: 2, user: 'Mike', text: 'Yes! It really helps me before exams.', time: '10:32 AM', isMe: false },
    { id: 3, user: 'You', text: 'I need to try that. My anxiety is high today.', time: '10:33 AM', isMe: true },
    { id: 4, user: 'Sarah', text: 'Definitely give it a go. We can practice together in the mindfulness room later!', time: '10:34 AM', isMe: false },
  ])

  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        user: 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      }])
      setNewMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.href = '/'}>
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-brain text-white text-xl"></i>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                MindWell Learning
              </span>
            </div>

            <button
              onClick={() => window.location.href = '/student'}
              className="px-4 py-2 text-gray-600 hover:text-purple-600 font-medium transition-all"
            >
              <i className="fas fa-arrow-left mr-2"></i>Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Mental Health Resources</h1>
          <p className="text-gray-600 max-w-2xl">
            Explore our curated library of mental health resources, take assessments to track your progress,
            or connect with peers in our supportive community chat.
          </p>
        </div>

        {/* Categories / Tabs */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('modules')}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${activeTab === 'modules'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
          >
            <i className="fas fa-book-reader mr-2"></i>Learning Modules
          </button>
          <button
            onClick={() => setActiveTab('assessments')}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${activeTab === 'assessments'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
          >
            <i className="fas fa-clipboard-check mr-2"></i>Assessments
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${activeTab === 'chat'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
          >
            <i className="fas fa-comments mr-2"></i>Peer Support
          </button>
        </div>

        {/* Content Area */}
        <div className="min-h-[500px]">

          {/* Learning Modules Tab */}
          {activeTab === 'modules' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <div key={module.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
                  <div className={`h-24 bg-gradient-to-r ${module.color} p-6`}>
                    <div className="flex justify-between items-start text-white">
                      <i className="fas fa-brain text-2xl opacity-75"></i>
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                        {module.chapters.length} Chapters
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                    <p className="text-gray-600 text-sm mb-6 flex-1">{module.description}</p>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-semibold text-gray-700">Progress</span>
                        <span className="text-purple-600 font-bold">{module.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${module.color}`}
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {module.chapters.slice(0, 2).map((chapter, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <i className={`fas fa-check-circle mr-2 ${chapter.completed ? 'text-green-500' : 'text-gray-300'}`}></i>
                          <span className={chapter.completed ? 'line-through text-gray-400' : ''}>{chapter.title}</span>
                          <span className="ml-auto text-xs text-gray-400">{chapter.duration}</span>
                        </div>
                      ))}
                      {module.chapters.length > 2 && (
                        <div className="text-xs text-center text-gray-500 italic">
                          + {module.chapters.length - 2} more lessons
                        </div>
                      )}
                    </div>

                    <button className="w-full py-3 border-2 border-purple-600 text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-colors">
                      {module.progress > 0 ? 'Continue Learning' : 'Start Module'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Assessments Tab */}
          {activeTab === 'assessments' && (
            <div className="grid md:grid-cols-2 gap-8">
              {assessments.map((test) => (
                <div key={test.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 group hover:shadow-xl transition-all">
                  <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <i className="fas fa-clipboard-list text-white text-2xl"></i>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{test.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{test.description}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs font-medium text-gray-500">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                        <i className="fas fa-clock mr-1"></i>{test.time}
                      </span>
                      <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full">
                        <i className="fas fa-list-ol mr-1"></i>{test.questions} Questions
                      </span>
                      {test.score && (
                        <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full">
                          <i className="fas fa-history mr-1"></i>Result: {test.score}
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-purple-600 transition-colors whitespace-nowrap">
                    Take Test
                  </button>
                </div>
              ))}

              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <i className="fas fa-robot text-4xl text-purple-600 mb-4 float-animation"></i>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Detailed Analysis?</h3>
                <p className="text-gray-600 mb-4 max-w-sm">
                  Talk to our AI counselor for a personalized assessment and wellness plan.
                </p>
                <button className="px-6 py-2 bg-white text-purple-600 font-bold rounded-lg shadow-sm hover:shadow-md transition-all">
                  Start AI Chat
                </button>
              </div>
            </div>
          )}

          {/* Peer Support Chat Tab */}
          {activeTab === 'chat' && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row h-[600px]">

              {/* Sidebar / Rooms List */}
              <div className="md:w-1/3 bg-gray-50 border-r border-gray-100 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-800">Support Groups</h3>
                  <p className="text-xs text-gray-500">Find your safe space</p>
                </div>
                <div className="overflow-y-auto flex-1">
                  {chatRooms.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => setActiveChatRoom(room.id)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-purple-50 transition-colors ${activeChatRoom === room.id ? 'bg-purple-50 border-l-4 border-purple-600' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-gray-900">{room.name}</h4>
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                          {room.online} online
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">Topic: {room.topic}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col bg-white">
                {activeChatRoom ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
                      <div>
                        <h3 className="font-bold text-gray-900">{chatRooms.find(r => r.id === activeChatRoom).name}</h3>
                        <p className="text-xs text-green-600 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          Live Discussion
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <i className="fas fa-sign-out-alt"></i>
                      </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                      <div className="text-center">
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                          This is a safe space. Please be respectful and supportive.
                        </span>
                      </div>
                      {messages.map((msg) => (
                        <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                          <div className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${msg.isMe
                              ? 'bg-purple-600 text-white rounded-br-none'
                              : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                            }`}>
                            {!msg.isMe && <p className="text-xs font-bold text-purple-600 mb-1">{msg.user}</p>}
                            <p className="text-sm">{msg.text}</p>
                          </div>
                          <span className="text-xs text-gray-400 mt-1">{msg.time}</span>
                        </div>
                      ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type a supportive message..."
                          className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                        />
                        <button
                          onClick={handleSendMessage}
                          className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition-all shadow-md active:scale-95"
                        >
                          <i className="fas fa-paper-plane"></i>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <i className="fas fa-comments text-4xl text-gray-300"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">Select a Group</h3>
                    <p className="max-w-xs">
                      Choose a support group from the sidebar to start connecting with peers.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LearnPage
