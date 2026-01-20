import { useState } from 'react'

function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [signupType, setSignupType] = useState('student')

  const openSignupModal = (type = 'student') => {
    setSignupType(type)
    setShowSignupModal(true)
  }

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark')
  }

  const handleLogin = (type) => {
    // For now, just navigate to the appropriate dashboard
    window.location.href = type === 'student' ? '/student' : '/doctor'
  }

  return (
    <div className="relative bg-gray-50 transition-colors duration-300 overflow-x-hidden w-full">
      {/* Floating shapes */}
      <div className="shape shape-1 float-animation"></div>
      <div className="shape shape-2 float-animation"></div>

      {/* Header */}
      <header className="glass sticky top-0 z-40 transition-all duration-300">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-brain text-white text-xl"></i>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                MindWell
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#services" className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium relative group">
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#reviews" className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium relative group">
                Reviews
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <i className="fas fa-moon text-gray-700"></i>
              </button>
              <button onClick={() => setShowLoginModal(true)} className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium">
                <i className="fas fa-sign-in-alt mr-2"></i>Login
              </button>
              <button onClick={() => openSignupModal('student')} className="btn-primary text-white px-6 py-2 rounded-xl font-semibold">
                Sign Up
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 gradient-primary opacity-10"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-12 lg:mb-0 slide-in-left">
                <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-6">
                  <i className="fas fa-sparkles mr-2"></i>
                  <span className="text-sm font-medium">Transform Your Mental Wellness</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Your Journey to{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Mental Wellness
                  </span>{' '}
                  Starts Here
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Experience a revolutionary approach to mental health care. Connect with expert counselors,
                  access personalized resources, and join a supportive community dedicated to your well-being.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => openSignupModal('student')} className="btn-primary text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center">
                    <i className="fas fa-graduation-cap mr-3"></i>
                    Join as Student
                  </button>
                  <button onClick={() => openSignupModal('counselor')} className="glass-dark text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center">
                    <i className="fas fa-user-md mr-3"></i>
                    Join as Counselor
                  </button>
                </div>
                <div className="flex items-center space-x-8 mt-8">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      <img src="https://i.pravatar.cc/150?img=1" className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
                      <img src="https://i.pravatar.cc/150?img=2" className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
                      <img src="https://i.pravatar.cc/150?img=3" className="w-10 h-10 rounded-full border-2 border-white" alt="User" />
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-purple-600 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">+5k</span>
                      </div>
                    </div>
                    <span className="ml-3 text-gray-600">Trusted by thousands</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center slide-in-right">
                <div className="relative">
                  <div className="absolute inset-0 gradient-accent rounded-3xl blur-3xl opacity-30"></div>
                  <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=500&fit=crop" alt="Mental Health Support" className="relative rounded-3xl shadow-2xl" />
                  <div className="success-badge -bottom-8 -left-8 bg-white p-2 rounded-3xl shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=220&h=120&fit=crop" alt="Success Achievement" className="rounded-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 fade-in-up">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-6">
                <i className="fas fa-star mr-2"></i>
                <span className="text-sm font-medium">Premium Services</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Comprehensive Mental Health{' '}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Solutions</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our range of services designed to support your mental wellness journey with professional care and innovative approaches.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card-modern p-8 rounded-2xl fade-in-up">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300">
                  <i className="fas fa-comments text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">One-on-One Counseling</h3>
                <p className="text-gray-600 mb-6">
                  Private, confidential sessions with licensed mental health professionals in a secure online environment.
                </p>
                <div className="flex items-center text-purple-600 font-medium">
                  <span>Learn more</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </div>
              </div>
              <div className="card-modern p-8 rounded-2xl fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 gradient-success rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300">
                  <i className="fas fa-users text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Group Support</h3>
                <p className="text-gray-600 mb-6">
                  Connect with peers in supportive group sessions facilitated by experienced counselors and build lasting relationships.
                </p>
                <div className="flex items-center text-purple-600 font-medium">
                  <span>Learn more</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </div>
              </div>
              <div className="card-modern p-8 rounded-2xl fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300">
                  <i className="fas fa-book-open text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Educational Resources</h3>
                <p className="text-gray-600 mb-6">
                  Access to curated mental health resources, articles, self-help tools, and guided meditation sessions.
                </p>
                <div className="flex items-center text-purple-600 font-medium">
                  <span>Learn more</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 fade-in-up">
                <div className="relative">
                  <div className="absolute inset-0 gradient-secondary rounded-3xl blur-3xl opacity-30"></div>
                  <img src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=600&h=500&fit=crop" alt="About MindWell" className="relative rounded-3xl shadow-2xl" />
                  <div className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                    <div className="text-center">
                      <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">10K+</div>
                      <div className="text-gray-600 font-medium">Happy Students</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-6">
                  <i className="fas fa-heart mr-2"></i>
                  <span className="text-sm font-medium">Our Story</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Empowering Minds,{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Transforming Lives</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  MindWell is a revolutionary mental health platform designed specifically for students and educational institutions. We believe that mental wellness is the foundation of academic success and personal growth.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our mission is to break down barriers to mental health care by providing accessible, affordable, and high-quality counseling services. We connect students with licensed professionals who understand the unique challenges faced in academic environments.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-purple-50 rounded-2xl">
                    <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                    <div className="text-gray-700 font-medium">Expert Counselors</div>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-2xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                    <div className="text-gray-700 font-medium">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 fade-in-up">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-6">
                <i className="fas fa-quote-left mr-2"></i>
                <span className="text-sm font-medium">Testimonials</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                What Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Community Says</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real stories from real people who have transformed their lives with MindWell
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card-modern p-8 rounded-2xl fade-in-up">
                <div className="flex items-center mb-6">
                  <img src="https://i.pravatar.cc/150?img=5" alt="User" className="w-14 h-14 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                    <div className="flex text-yellow-400">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "MindWell helped me through a difficult semester. My counselor was incredibly supportive and understanding. I couldn't have made it without them."
                </p>
                <div className="flex items-center text-purple-600">
                  <i className="fas fa-graduation-cap mr-2"></i>
                  <span className="text-sm font-medium">Psychology Student</span>
                </div>
              </div>
              <div className="card-modern p-8 rounded-2xl fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center mb-6">
                  <img src="https://i.pravatar.cc/150?img=12" alt="User" className="w-14 h-14 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Michael Chen</h4>
                    <div className="flex text-yellow-400">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "The convenience of online sessions made it easy to fit therapy into my busy schedule. Highly recommend for any student struggling with stress."
                </p>
                <div className="flex items-center text-purple-600">
                  <i className="fas fa-laptop-code mr-2"></i>
                  <span className="text-sm font-medium">Computer Science</span>
                </div>
              </div>
              <div className="card-modern p-8 rounded-2xl fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center mb-6">
                  <img src="https://i.pravatar.cc/150?img=9" alt="User" className="w-14 h-14 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Dr. Emily Roberts</h4>
                    <div className="flex text-yellow-400">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "As a counselor on MindWell, I appreciate the platform's commitment to quality care and the supportive community it has built."
                </p>
                <div className="flex items-center text-purple-600">
                  <i className="fas fa-user-md mr-2"></i>
                  <span className="text-sm font-medium">Licensed Counselor</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowLoginModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowLoginModal(false)} className="float-right text-gray-500 hover:text-gray-700">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600 mb-6">Sign in to continue to MindWell</p>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">I am a:</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleLogin('student')}
                  className="border-2 border-purple-600 bg-purple-600 text-white rounded-xl p-3 font-semibold"
                >
                  <i className="fas fa-graduation-cap mr-2"></i>Student
                </button>
                <button
                  onClick={() => handleLogin('counselor')}
                  className="border-2 border-gray-300 rounded-xl p-3 font-semibold hover:border-purple-600"
                >
                  <i className="fas fa-user-md mr-2"></i>Counselor
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input type="email" className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none" placeholder="your.email@example.com" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input type="password" className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none" placeholder="Enter your password" />
            </div>

            <button
              onClick={() => handleLogin('student')}
              className="w-full btn-primary text-white px-6 py-3 rounded-xl font-semibold"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>Sign In
            </button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowSignupModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowSignupModal(false)} className="float-right text-gray-500 hover:text-gray-700">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Join MindWell</h2>
            <p className="text-gray-600 mb-6">Start your mental wellness journey today</p>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Join as:</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className={`border-2 rounded-xl p-3 font-semibold ${signupType === 'student' ? 'border-purple-600 bg-purple-600 text-white' : 'border-gray-300 hover:border-purple-600'}`}
                  onClick={() => setSignupType('student')}
                >
                  <i className="fas fa-graduation-cap mr-2"></i>Student
                </button>
                <button
                  className={`border-2 rounded-xl p-3 font-semibold ${signupType === 'counselor' ? 'border-purple-600 bg-purple-600 text-white' : 'border-gray-300 hover:border-purple-600'}`}
                  onClick={() => setSignupType('counselor')}
                >
                  <i className="fas fa-user-md mr-2"></i>Counselor
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input type="text" className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none" placeholder="John Doe" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input type="email" className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none" placeholder="your.email@example.com" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input type="password" className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-purple-600 outline-none" placeholder="Create a strong password" />
            </div>

            <button
              onClick={() => handleLogin(signupType)}
              className="w-full btn-primary text-white px-6 py-3 rounded-xl font-semibold"
            >
              <i className="fas fa-user-plus mr-2"></i>Create Account
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LandingPage
