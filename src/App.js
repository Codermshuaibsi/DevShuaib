import { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Code, Laptop, Server, Github, ExternalLink, Mail, Phone, MapPin,
  ChevronDown, Star, Users, Coffee, Award, Download, Send, ArrowUp,
  Globe, Palette, Zap, Database, Monitor, Smartphone, Cloud, Shield,
  Play, Pause, Eye, GitBranch, Calendar, Clock
} from 'lucide-react';
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [services, setServices] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const heroRef = useRef(null);
  const projectsContainerRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const projectCardVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: -15 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    },
    hover: {
      scale: 1.02,
      rotateY: 5,
      z: 50,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      setShowScrollTop(scrollPosition > 500);

      const sections = ['home', 'about', 'projects', 'services', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://portfolio-backend-1-cb82.onrender.com/api/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      // Show thanks message in button for 5 seconds
      const sendBtn = document.querySelector('button[type="submit"]');
      if (sendBtn) {
        const originalText = sendBtn.textContent;
        sendBtn.textContent = "Thanks for contacting!";
        sendBtn.disabled = true;
        setTimeout(() => {
          sendBtn.textContent = originalText;
          sendBtn.disabled = false;
        }, 5000);
      }
      setFormData({ name: '', email: '', message: '' });

      if (data.success) {
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred. Please try again.');
    }
  };

  const skills = [
    { name: "HTML5", level: 90, category: "Frontend", icon: Globe },
    { name: "CSS3", level: 85, category: "Frontend", icon: Palette },
    { name: "JavaScript", level: 88, category: "Frontend", icon: Zap },
    { name: "React", level: 85, category: "Frontend", icon: Code },
    { name: "Node.js", level: 80, category: "Backend", icon: Server },
    { name: "MongoDB", level: 75, category: "Database", icon: Database },
    { name: "Next.js", level: 82, category: "Framework", icon: Monitor },
    { name: "Express.js", level: 78, category: "Backend", icon: Cloud },
  ];

  const projects = [
    {
      id: 1,
      title: 'AnySearch',
      description: 'A powerful image search application built with Next.js and Unsplash API. Features advanced filtering, infinite scroll, and high-quality image preview with download functionality.',
      longDescription: 'AnySearch revolutionizes image discovery with AI-powered search capabilities. Built with Next.js 14, it features real-time search suggestions, advanced filtering options, infinite scroll pagination, and a responsive masonry layout. The application integrates with Unsplash API to deliver high-quality images with comprehensive metadata and download options.',
      tech: ['Next.js', 'React', 'Unsplash API', 'CSS3', 'Responsive Design'],
      icon: Globe,
      liveLink: '#',
      githubLink: '#',
      featured: true,
      category: 'Web App',
      year: '2024',
      status: 'Completed',
      highlights: ['10K+ Daily Searches', 'Real-time Filtering', 'Mobile Optimized']
    },
    {
      id: 2,
      title: 'GenerateFakeData-API',
      description: 'A comprehensive RESTful API that generates customizable fake data for testing and development. Supports multiple data types, batch generation, and custom schemas.',
      longDescription: 'GenerateFakeData-API is a robust solution for developers needing realistic test data. Built with Node.js and Express, it provides endpoints for generating users, products, transactions, and custom data structures. Features include rate limiting, API key authentication, batch processing, and comprehensive documentation.',
      tech: ['Node.js', 'Express.js', 'MongoDB', 'REST API', 'Swagger'],
      icon: Database,
      liveLink: '#',
      githubLink: '#',
      featured: true,
      category: 'API',
      year: '2024',
      status: 'Completed',
      highlights: ['1M+ API Calls', 'Multi-format Output', 'Enterprise Ready']
    },
    {
      id: 3,
      title: 'E-Commerce Dashboard',
      description: 'Modern admin dashboard for e-commerce management with real-time analytics, inventory tracking, and order management system.',
      longDescription: 'A comprehensive e-commerce management platform featuring real-time analytics, inventory management, order processing, and customer insights. Built with React and Node.js, it includes interactive charts, real-time notifications, and advanced filtering capabilities.',
      tech: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'Socket.io'],
      icon: Monitor,
      liveLink: '#',
      githubLink: '#',
      featured: false,
      category: 'Dashboard',
      year: '2023',
      status: 'Completed',
      highlights: ['Real-time Analytics', 'Inventory Management', 'Multi-store Support']
    },
    {
      id: 4,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates, file sharing, and team collaboration features.',
      longDescription: 'A modern task management solution designed for remote teams. Features include Kanban boards, real-time collaboration, file attachments, time tracking, and project analytics. Built as a Progressive Web App for seamless mobile experience.',
      tech: ['React', 'Firebase', 'Material-UI', 'PWA'],
      icon: Smartphone,
      liveLink: '#',
      githubLink: '#',
      featured: false,
      category: 'Mobile App',
      year: '2023',
      status: 'In Progress',
      highlights: ['Team Collaboration', 'PWA Support', 'Offline Capable']
    },
    {
      id: 5,
      title: 'SecureAuth System',
      description: 'Advanced authentication system with multi-factor authentication, JWT tokens, and role-based access control.',
      longDescription: 'Enterprise-grade authentication system featuring multi-factor authentication, JWT token management, role-based permissions, and comprehensive audit logging. Includes OAuth integration and advanced security features.',
      tech: ['Node.js', 'Express', 'JWT', 'Redis', 'PostgreSQL'],
      icon: Shield,
      liveLink: '#',
      githubLink: '#',
      featured: true,
      category: 'Security',
      year: '2024',
      status: 'Completed',
      highlights: ['Multi-factor Auth', 'OAuth Integration', 'Enterprise Security']
    },
    {
      id: 6,
      title: 'AI Content Generator',
      description: 'AI-powered content generation platform using GPT API for creating blogs, social media posts, and marketing copy.',
      longDescription: 'Intelligent content generation platform that leverages AI to create high-quality blog posts, social media content, and marketing materials. Features template management, content optimization, and multi-language support.',
      tech: ['Next.js', 'OpenAI API', 'PostgreSQL', 'Redis', 'Stripe'],
      icon: Zap,
      liveLink: '#',
      githubLink: '#',
      featured: true,
      category: 'AI/ML',
      year: '2024',
      status: 'In Progress',
      highlights: ['AI-Powered', 'Multi-language', 'Template System']
    }
  ];

  const stats = [
    { icon: Star, label: 'Projects Completed', value: '15+', color: 'text-yellow-400' },
    { icon: Users, label: 'Happy Clients', value: '8+', color: 'text-green-400' },
    { icon: Coffee, label: 'Cups of Coffee', value: '500+', color: 'text-amber-400' },
    { icon: Award, label: 'Certifications', value: '5+', color: 'text-blue-400' }
  ];
  async function ServicesApi() {
    try {
      const res = await fetch("https://portfolio-backend-1-cb82.onrender.com/api/v1/service/all");
      const data = await res.json();
      console.log(data.services); // ✅ correct key
      setServices(data.services); // ✅ set only the services array
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }

  useEffect(() => {
    ServicesApi();
  }, []);




  const ProjectModal = ({ project, onClose }) => (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <project.icon className="w-12 h-12 text-purple-400" />
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">{project.title}</h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mt-2">
                      <span className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {project.year}
                      </span>
                      <span className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {project.status}
                      </span>
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <X size={24} />
                </button>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {project.longDescription}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-purple-600/30 text-purple-300 text-sm rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Key Highlights</h3>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <Star className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={project.liveLink}
                  className="flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                >
                  <ExternalLink size={20} className="mr-2" />
                  Live Demo
                </a>
                <a
                  href={project.githubLink}
                  className="flex items-center justify-center px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white rounded-lg transition-colors font-medium"
                >
                  <Github size={20} className="mr-2" />
                  View Code
                </a>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl sm:text-2xl font-bold text-white cursor-pointer" onClick={() => scrollToSection('home')}>
              Dev.<span className="text-purple-400">Shuaib</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8">
              {['home', 'about', 'projects', 'services', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize text-sm font-medium transition-colors hover:scale-105 ${activeSection === item
                    ? 'text-purple-400'
                    : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-lg transition-colors text-sm">
                <Download size={16} className="mr-1" />
                Resume
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-slate-900/95 backdrop-blur-sm border-t border-slate-700"
            >
              <div className="px-4 py-4 space-y-2">
                {['home', 'about', 'projects', 'services', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg capitalize transition-colors"
                  >
                    {item}
                  </button>
                ))}
                <button className="flex items-center w-full px-4 py-3 border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-lg transition-colors">
                  <Download size={16} className="mr-2" />
                  Download Resume
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 sm:pt-0" ref={heroRef}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 200 }}
            className="mb-6 sm:mb-8"
          >
            <Code className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-purple-400 mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Hi, I'm{" "}
              <span className="text-purple-400">
                Mohd Shuaib
              </span>
            </h1>

            <motion.div
              key="typewriter"
              className="text-xl md:text-3xl font-semibold text-gray-200 h-12 flex items-center justify-center"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Full Stack Developer
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto px-4 leading-relaxed"
          >
            I turn code into user experiences. <span className="text-purple-400">Front to back</span>.
            Fast. Scalable. Reliable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center px-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')}
              className="px-6 sm:px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all shadow-lg"
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="px-6 sm:px-8 py-3 border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-lg font-medium transition-all"
            >
              Let's Connect
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-8 sm:mt-12 flex justify-center space-x-6"
          >
            {[
              { icon: Github, label: 'GitHub' },
              { icon: Mail, label: 'Email' },
              { icon: Globe, label: 'Website' }
            ].map((social, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-slate-800/50 hover:bg-purple-600/20 rounded-full transition-colors"
                title={social.label}
              >
                <social.icon className="w-6 h-6 text-gray-400 hover:text-purple-400" />
              </motion.button>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="text-white w-6 h-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group p-4 sm:p-6 bg-slate-900/30 rounded-lg cursor-pointer"
              >
                <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color} mx-auto mb-3 sm:mb-4 group-hover:animate-pulse`} />
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">About Me</h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Crafting Impactful Digital Experiences as a Passionate Full-Stack Developer
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center lg:text-left">Turning Code Into Creativity</h3>
              <p className="text-gray-300 mb-6 text-center lg:text-left leading-relaxed">
                I'm a BCA student skilled in programming languages like C and C++, with extensive
                experience in modern web development technologies. I build scalable web solutions
                that drive results and create meaningful digital experiences.
              </p>
              <div className="space-y-3 sm:space-y-2">
                {[
                  'Full-Stack Developer With a Vision',
                  'Scalable Web Solutions Expert',
                  'From Concept to Code Engineering',
                  'Innovative, Reliable & Passionate'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center text-gray-300"
                  >
                    <Star className="text-purple-400 mr-3 w-4 h-4" />
                    <span className="text-sm sm:text-base">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8 flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                  onClick={() => { window.open('/path-to-cv.pdf', '_blank'); }}
                >
                  Download CV
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white rounded-lg font-medium transition-colors"
                >
                  Hire Me
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 text-center lg:text-left">Technical Skills</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <skill.icon className="w-5 h-5 text-purple-600" />
                        <h3 className="font-semibold text-gray-800">{skill.name}</h3>
                      </div>
                      <span className="text-sm text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">{skill.category}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-20 bg-slate-800/30" ref={projectsContainerRef}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Featured Projects</h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Showcasing my latest work and creative solutions
            </p>
          </motion.div>

          {/* Project Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
          >
            {['web'].map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-slate-700 hover:bg-purple-600 text-white rounded-full text-sm transition-colors"
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={projectCardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className="bg-slate-800/50 rounded-xl overflow-hidden shadow-xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedProject(project)}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="relative p-6 sm:p-8 h-full flex flex-col">
                  {/* Project Header */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 bg-purple-600/20 rounded-lg"
                    >
                      <project.icon className="w-8 h-8 text-purple-400" />
                    </motion.div>
                    <div className="flex items-center space-x-2">
                      {project.featured && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs rounded-full font-semibold"
                        >
                          ⭐ Featured
                        </motion.span>
                      )}
                      <span className="px-2 py-1 bg-slate-700 text-gray-300 text-xs rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Project Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {project.year}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {project.status}
                        </span>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center space-x-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View Details</span>
                      </motion.div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.1 }}
                          className="px-2 py-1 bg-purple-600/30 text-purple-300 text-xs rounded-full"
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-full">
                          +{project.tech.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.liveLink, '_blank');
                      }}
                      className="flex items-center justify-center flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm group/btn"
                    >
                      <ExternalLink size={14} className="mr-1 group-hover/btn:translate-x-0.5 transition-transform" />
                      Demo
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.githubLink, '_blank');
                      }}
                      className="flex items-center justify-center flex-1 px-3 py-2 border border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white rounded-lg transition-colors text-sm group/btn"
                    >
                      <Github size={14} className="mr-1 group-hover/btn:rotate-12 transition-transform" />
                      Code
                    </motion.button>
                  </div>

                  {/* Hover Effect Overlay */}
                  <AnimatePresence>
                    {hoveredProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent pointer-events-none rounded-xl"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Projects Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-purple-400/25"
            >
              View All Projects
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Services</h2>
            <p className="text-lg sm:text-xl text-gray-300 px-4">
              What I can do for you
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-slate-800/50 p-6 sm:p-8 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6"
                >
                  <span className="text-3xl">{service.icon}</span>
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-gray-400 text-sm">
                      <Star className="text-purple-400 mr-2 mt-0.5 w-3 h-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-600">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-400 font-semibold text-sm">{service.price}$</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
                      id="home"
                    >
                      Get Quote
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Get In Touch</h2>
            <p className="text-lg sm:text-xl text-gray-300 px-4">
              Let's work together to bring your ideas to life
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center lg:text-left">Let's Connect Together</h3>
              <p className="text-gray-300 mb-6 sm:mb-8 text-center lg:text-left leading-relaxed">
                Ready to start your project? Send me a message and let's discuss how we can work together
                to create something amazing.
              </p>

              <div className="space-y-4 sm:space-y-6">
                {[
                  { icon: Mail, text: 'heyshuaib43@gmail.com', href: 'mailto:heyshuaib43@gmail.com' },
                  { icon: Phone, text: '+91 8979302837', href: 'tel:+918979302837' },
                  { icon: MapPin, text: 'Meerut, Uttar Pradesh, India', }
                ].map((contact, index) => (
                  <motion.a
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    href={contact.href}
                    className="flex items-center text-gray-300 hover:text-purple-400 transition-colors group"
                  >
                    <contact.icon className="w-5 h-5 text-purple-400 mr-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm sm:text-base">{contact.text}</span>
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-8 sm:mt-12"
              >
                <h4 className="text-lg font-semibold text-white mb-4 text-center lg:text-left">Follow Me</h4>
                <div className="flex justify-center lg:justify-start space-x-4">
                  {[
                    { icon: Github, label: 'GitHub', href: '#' },
                    { icon: Mail, label: 'Email', href: 'mailto:mohdshuaib@example.com' },
                    { icon: Globe, label: 'Website', href: '#' },
                    { icon: Phone, label: 'Phone', href: 'tel:+918979403827' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      href={social.href}
                      className="p-3 bg-slate-800/50 hover:bg-purple-600/20 rounded-full transition-colors"
                      title={social.label}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-gray-400 hover:text-purple-400" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-800/50 p-6 sm:p-8 rounded-xl border border-slate-700"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 border border-slate-600 transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 border border-slate-600 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 border border-slate-600 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all shadow-lg"
                >
                  <Send size={16} className="mr-2" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 sm:py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center md:text-left">
              <div className="text-xl sm:text-2xl font-bold text-white mb-4">
                Dev.<span className="text-purple-400">Shuaib</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Passionate Full-Stack Developer creating innovative web solutions
                that drive business success.
              </p>
            </div>

            <div className="text-center">
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['Home', 'About', 'Projects', 'Services', 'Contact'].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="block text-gray-400 hover:text-purple-400 transition-colors text-sm mx-auto"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400">mohdshuaib@example.com</p>
                <p className="text-gray-400">+91 98765 43210</p>
                <p className="text-gray-400">Agra, Uttar Pradesh</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-gray-400 text-sm text-center sm:text-left">
                © 2025 Dev.Shuaib — All rights reserved.
              </div>
              <div className="text-gray-400 text-sm text-center sm:text-right">
                Made with ❤️ using React & Tailwind CSS
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;