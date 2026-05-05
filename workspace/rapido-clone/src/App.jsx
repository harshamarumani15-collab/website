import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Bike, CarFront, Truck, Clock, MapPin, Phone, Mail, Star, Shield, Zap, Users, Menu, X, ChevronDown, ChevronUp, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import './App.css'

// Header Component with Mobile Menu
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">Rapido</Link>
          
          {/* Desktop Navigation */}
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/booking">Book Now</Link></li>
            <li><Link to="/become-captain">Become a Captain</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>
    </header>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Rapido</h3>
            <p>Your trusted partner for quick and safe bike taxi services. We connect you with nearby captains for affordable rides.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/booking">Book Ride</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Info</h3>
            <ul>
              <li><Phone size={18} /> +91 9876543210</li>
              <li><Mail size={18} /> support@rapido.com</li>
              <li><MapPin size={18} /> Bangalore, India</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
              <span>Facebook</span>
              <span>Twitter</span>
              <span>Instagram</span>
              <span>LinkedIn</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Rapido Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Home Page Component
function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>India's Largest Bike Taxi Service</h1>
          <p>Safe, Affordable & Quick Rides at Your Fingertips</p>
          <div className="hero-buttons">
            <Link to="/booking" className="btn btn-primary">Book a Ride</Link>
            <Link to="/services" className="btn btn-secondary">Explore Services</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <Bike className="service-icon" size={64} />
              <h3>Bike Taxi</h3>
              <p>Quick and affordable bike rides for your daily commute. Beat the traffic with our experienced captains.</p>
            </div>
            <div className="service-card">
              <CarFront className="service-icon" size={64} />
              <h3>Auto Rickshaw</h3>
              <p>Comfortable auto rides for short distances. Perfect for family trips and group travel.</p>
            </div>
            <div className="service-card">
              <Truck className="service-icon" size={64} />
              <h3>Parcel Delivery</h3>
              <p>Fast and secure parcel delivery service. Get your packages delivered within hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Rapido?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <Zap className="feature-icon" size={48} />
              <h3>Quick Booking</h3>
              <p>Book your ride in seconds with our easy-to-use app and website interface.</p>
            </div>
            <div className="feature-item">
              <Shield className="feature-icon" size={48} />
              <h3>Safe Rides</h3>
              <p>All captains are verified and trained to ensure your safety during every ride.</p>
            </div>
            <div className="feature-item">
              <Star className="feature-icon" size={48} />
              <h3>Affordable</h3>
              <p>Get the best prices in town with transparent pricing and no hidden charges.</p>
            </div>
            <div className="feature-item">
              <Users className="feature-icon" size={48} />
              <h3>Experienced Captains</h3>
              <p>Ride with experienced and professional captains who know the city well.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Services Page Component
function ServicesPage() {
  const services = [
    {
      icon: <Bike size={64} />,
      title: 'Bike Taxi',
      description: 'Our flagship service offering quick and affordable bike rides. Perfect for solo travelers looking to beat traffic.',
      price: 'Starting at ₹10/km'
    },
    {
      icon: <CarFront size={64} />,
      title: 'Auto Rickshaw',
      description: 'Comfortable three-wheeler rides for families and groups. Ideal for short to medium distance travel.',
      price: 'Starting at ₹15/km'
    },
    {
      icon: <Truck size={64} />,
      title: 'Parcel Delivery',
      description: 'Express delivery service for documents and packages. Same-day delivery available in select cities.',
      price: 'Starting at ₹50'
    },
    {
      icon: <Clock size={64} />,
      title: 'Hourly Rentals',
      description: 'Rent a bike or auto for multiple hours. Perfect for shopping trips or multiple stops.',
      price: 'Starting at ₹200/hour'
    }
  ]

  return (
    <section className="services" style={{ paddingTop: '40px' }}>
      <div className="container">
        <h2 className="section-title">All Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p style={{ marginTop: '15px', fontWeight: '600', color: '#ffc107' }}>{service.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Booking Page Component
function BookingPage() {
  const [formData, setFormData] = useState({
    pickup: '',
    drop: '',
    serviceType: 'bike',
    date: '',
    phone: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Booking request submitted! We will contact you shortly.')
    setFormData({ pickup: '', drop: '', serviceType: 'bike', date: '', phone: '' })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section className="booking">
      <div className="container">
        <h2 className="section-title">Book Your Ride</h2>
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Service Type</label>
            <select 
              name="serviceType" 
              value={formData.serviceType} 
              onChange={handleChange}
              className="form-control"
            >
              <option value="bike">Bike Taxi</option>
              <option value="auto">Auto Rickshaw</option>
              <option value="parcel">Parcel Delivery</option>
            </select>
          </div>
          <div className="form-group">
            <label>Pickup Location</label>
            <input 
              type="text" 
              name="pickup" 
              value={formData.pickup} 
              onChange={handleChange}
              placeholder="Enter pickup location" 
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Drop Location</label>
            <input 
              type="text" 
              name="drop" 
              value={formData.drop} 
              onChange={handleChange}
              placeholder="Enter drop location" 
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Date & Time</label>
            <input 
              type="datetime-local" 
              name="date" 
              value={formData.date} 
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange}
              placeholder="Enter your phone number" 
              className="form-control"
              pattern="[0-9]{10}"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Book Now
          </button>
        </form>
      </div>
    </section>
  )
}

// About Page Component
function AboutPage() {
  return (
    <section className="services" style={{ paddingTop: '40px' }}>
      <div className="container">
        <h2 className="section-title">About Rapido</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '30px' }}>
            Rapido is India's largest bike taxi service, started with a vision to provide safe, affordable, and quick transportation solutions to millions of Indians. We connect everyday commuters with nearby trained captains who help them reach their destination quickly and economically.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '30px' }}>
            Founded in 2016, Rapido has completed over 100 million rides across 100+ cities in India. Our mission is to reduce traffic congestion and pollution by promoting shared mobility solutions.
          </p>
          <h3 style={{ fontSize: '28px', margin: '40px 0 20px', color: '#1a1a1a' }}>Our Mission</h3>
          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '30px' }}>
            To provide safe, reliable, and affordable transportation options while creating employment opportunities for lakhs of captains across India.
          </p>
          <h3 style={{ fontSize: '28px', margin: '40px 0 20px', color: '#1a1a1a' }}>Key Statistics</h3>
          <div className="features-grid" style={{ marginTop: '30px' }}>
            <div className="feature-item">
              <h3 style={{ fontSize: '36px', color: '#ffc107', marginBottom: '10px' }}>100M+</h3>
              <p>Total Rides Completed</p>
            </div>
            <div className="feature-item">
              <h3 style={{ fontSize: '36px', color: '#ffc107', marginBottom: '10px' }}>100+</h3>
              <p>Cities Covered</p>
            </div>
            <div className="feature-item">
              <h3 style={{ fontSize: '36px', color: '#ffc107', marginBottom: '10px' }}>10L+</h3>
              <p>Active Captains</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Page Component
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for contacting us! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section className="booking">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '40px' }}>
          <div>
            <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#1a1a1a' }}>Get in Touch</h3>
            <p style={{ marginBottom: '30px', lineHeight: '1.6' }}>
              Have questions or feedback? We'd love to hear from you. Fill out the form and our team will get back to you within 24 hours.
            </p>
            <div style={{ marginBottom: '20px' }}>
              <strong style={{ display: 'block', marginBottom: '5px' }}>Email:</strong>
              <span>support@rapido.com</span>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <strong style={{ display: 'block', marginBottom: '5px' }}>Phone:</strong>
              <span>+91 9876543210</span>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <strong style={{ display: 'block', marginBottom: '5px' }}>Address:</strong>
              <span>123, Tech Park, Bangalore, Karnataka 560001</span>
            </div>
          </div>
          <form className="booking-form" style={{ margin: 0 }} onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                placeholder="Enter your name" 
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                placeholder="Enter your email" 
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input 
                type="text" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange}
                placeholder="Enter subject" 
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange}
                placeholder="Enter your message" 
                className="form-control"
                rows="5"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

// Become a Captain Page Component
function BecomeCaptainPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    vehicleType: 'bike',
    vehicleNumber: '',
    licenseNumber: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for registering as a captain! Our team will contact you within 24 hours.')
    setFormData({ name: '', phone: '', city: '', vehicleType: 'bike', vehicleNumber: '', licenseNumber: '' })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section className="booking">
      <div className="container">
        <h2 className="section-title">Become a Rapido Captain</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', marginBottom: '40px', boxShadow: 'var(--shadow)' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '20px', color: 'var(--primary-black)' }}>Why Become a Captain?</h3>
            <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div className="feature-item" style={{ padding: '20px' }}>
                <CheckCircle size={40} color="#ffc107" />
                <h4 style={{ marginTop: '15px', marginBottom: '10px' }}>Earn Up to ₹30,000/month</h4>
                <p style={{ fontSize: '14px', color: 'var(--secondary-gray)' }}>Flexible earning potential based on your time commitment</p>
              </div>
              <div className="feature-item" style={{ padding: '20px' }}>
                <Clock size={40} color="#ffc107" />
                <h4 style={{ marginTop: '15px', marginBottom: '10px' }}>Flexible Hours</h4>
                <p style={{ fontSize: '14px', color: 'var(--secondary-gray)' }}>Work whenever you want, be your own boss</p>
              </div>
              <div className="feature-item" style={{ padding: '20px' }}>
                <Zap size={40} color="#ffc107" />
                <h4 style={{ marginTop: '15px', marginBottom: '10px' }}>Weekly Payouts</h4>
                <p style={{ fontSize: '14px', color: 'var(--secondary-gray)' }}>Get paid directly to your bank account every week</p>
              </div>
              <div className="feature-item" style={{ padding: '20px' }}>
                <Shield size={40} color="#ffc107" />
                <h4 style={{ marginTop: '15px', marginBottom: '10px' }}>Free Insurance</h4>
                <p style={{ fontSize: '14px', color: 'var(--secondary-gray)' }}>Accidental insurance coverage while on duty</p>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '24px', marginBottom: '20px', color: 'var(--primary-black)', textAlign: 'center' }}>Register Now</h3>
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                placeholder="Enter your full name" 
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange}
                placeholder="Enter your 10-digit mobile number" 
                className="form-control"
                pattern="[0-9]{10}"
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input 
                type="text" 
                name="city" 
                value={formData.city} 
                onChange={handleChange}
                placeholder="Enter your city" 
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Vehicle Type</label>
              <select 
                name="vehicleType" 
                value={formData.vehicleType} 
                onChange={handleChange}
                className="form-control"
              >
                <option value="bike">Motorcycle</option>
                <option value="scooter">Scooter</option>
              </select>
            </div>
            <div className="form-group">
              <label>Vehicle Number</label>
              <input 
                type="text" 
                name="vehicleNumber" 
                value={formData.vehicleNumber} 
                onChange={handleChange}
                placeholder="KA01AB1234" 
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Driving License Number</label>
              <input 
                type="text" 
                name="licenseNumber" 
                value={formData.licenseNumber} 
                onChange={handleChange}
                placeholder="Enter your DL number" 
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Submit Registration
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/become-captain" element={<BecomeCaptainPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
