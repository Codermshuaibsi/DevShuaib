import { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Code, Server, Github, ExternalLink, Mail, Phone, MapPin,
  ChevronDown, Star, Users, Coffee, Award, Download, Send, ArrowUp,
  Globe, Palette, Zap, Database, Monitor, Cloud, Calendar, Clock, Eye
} from 'lucide-react';
import ProjectModal from './Component/Projectpop';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const heroRef = useRef(null);
  const projectsContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      try {
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
      } catch (err) {
        console.error('Error in scroll handler:', err);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    try {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
        setIsMenuOpen(false);
      }
    } catch (err) {
      console.error('Error scrolling to section:', err);
    }
  };

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error scrolling to top:', err);
    }
  };

  const handleInputChange = (e) => {
    if (e?.target) {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    }
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

  async function projectAPi() {
    try {
      const res = await fetch('https://portfolio-backend-1-cb82.onrender.com/api/v1/projects/getall')
      const data = await res.json();
      console.log("projects", data.data);
      setProjects(data.data)

    } catch (error) {
      console.log(error)
    }
  }

  const stats = [
    { icon: Star, label: 'Projects Completed', value: '15+', color: 'text-yellow-400' },
    { icon: Users, label: 'Happy Clients', value: '8+', color: 'text-green-400' },
    { icon: Coffee, label: 'Cups of Coffee', value: '50+', color: 'text-amber-400' },
    { icon: Award, label: 'Certifications', value: '5+', color: 'text-blue-400' }
  ];

  async function ServicesApi() {
    try {
      const res = await fetch("https://portfolio-backend-1-cb82.onrender.com/api/v1/service/all");
      const data = await res.json();
      console.log(data.services);
      setServices(data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([ServicesApi(), projectAPi()]);
      } catch (err) {
        setError('Failed to load data');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleResumeClick = () => {
    try {
      window.open('https://drive.google.com/file/d/1bwJGsiSAjcR9vTt_jRYaLTWfjE0fvj61/view?usp=sharing', '_blank');
    } catch (err) {
      console.error('Error opening resume:', err);
    }
  };

  const handleSocialClick = (url) => {
    try {
      window.open(url, '_blank');
    } catch (err) {
      console.error('Error opening social link:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div
              className="text-xl sm:text-2xl font-bold text-white cursor-pointer hover:text-purple-400 transition-colors"
              onClick={() => scrollToSection('home')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && scrollToSection('home')}
            >
              Dev.<span className="text-purple-400">Shuaib</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8">
              {['home', 'about', 'projects', 'services', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize text-sm font-medium transition-all duration-200 hover:scale-105 ${activeSection === item
                      ? 'text-purple-400'
                      : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <button
                className="flex items-center px-4 py-2 border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-lg transition-colors text-sm"
                onClick={handleResumeClick}
                aria-label="Download Resume"
              >
                <Download size={16} className="mr-1" />
                Resume
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 animate-fadeIn">
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
              <button
                className="flex items-center w-full px-4 py-3 border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-lg transition-colors"
                onClick={handleResumeClick}
              >
                <Download size={16} className="mr-2" />
                Download Resume
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 sm:pt-0" ref={heroRef}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6 sm:mb-8 animate-bounce-slow">
            <Code className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-purple-400 mx-auto animate-pulse" />
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight animate-fadeIn">
              Hi, I'm{" "}
              <span className="text-purple-400 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Mohd Shuaib
              </span>
            </h1>

            <div className="text-xl md:text-3xl font-semibold text-gray-200 h-12 flex items-center justify-center">
              <span className="animate-typewriter">Full Stack Developer</span>
            </div>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto px-4 leading-relaxed">
            I turn code into user experiences. <span className="text-purple-400">Front to back</span>.
            Fast. Scalable. Reliable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 mb-8">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-6 sm:px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 sm:px-8 py-3 border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-lg font-medium transition-all hover:scale-105"
            >
              Let's Connect
            </button>
          </div>

          {/* Social Links */}
          <div className="mt-8 sm:mt-12 flex justify-center space-x-6">
            {[
              { icon: Github, label: 'GitHub', url: 'https://github.com/Codermshuaibsi' },
              { icon: Mail, label: 'Email', url: 'mailto:heyshuaib43@gmail.com' },
              { icon: Globe, label: 'Website', url: 'https://devshuaib.vercel.app/' },
            ].map((social, index) => (
              <button
                key={index}
                className="p-3 bg-slate-800/50 hover:bg-purple-600/20 rounded-full transition-all hover:scale-110 hover:-translate-y-1"
                title={social.label}
                onClick={() => social.url.startsWith('mailto:') ? (window.location.href = social.url) : handleSocialClick(social.url)}
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6 text-gray-400 hover:text-purple-400 transition-colors" />
              </button>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="text-white w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group p-4 sm:p-6 bg-slate-900/30 rounded-lg cursor-pointer hover:scale-105 hover:-translate-y-2 transition-all duration-300"
              >
                <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color} mx-auto mb-3 sm:mb-4 group-hover:animate-pulse`} />
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">About Me</h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Crafting Impactful Digital Experiences as a Passionate Full-Stack Developer
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
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
                  <div key={index} className="flex items-center text-gray-300">
                    <Star className="text-purple-400 mr-3 w-4 h-4 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all hover:scale-105"
                  onClick={handleResumeClick}
                >
                  Download Resume
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white rounded-lg font-medium transition-all hover:scale-105"
                >
                  Hire Me
                </button>
              </div>
            </div>

            {/* Skills */}
            <div className="order-1 lg:order-2">
              <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 text-center lg:text-left">Technical Skills</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <skill.icon className="w-5 h-5 text-purple-600" />
                        <h3 className="font-semibold text-gray-800">{skill.name}</h3>
                      </div>
                      <span className="text-sm text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">{skill.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-12 sm:py-20 bg-slate-800/30"
        ref={projectsContainerRef}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Featured Projects
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Showcasing my latest work and creative solutions
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-slate-800/50 rounded-xl p-6 sm:p-8 animate-pulse">
                  <div className="w-12 h-12 bg-slate-700 rounded-lg mb-4"></div>
                  <div className="h-6 bg-slate-700 rounded mb-3"></div>
                  <div className="h-4 bg-slate-700 rounded mb-2"></div>
                  <div className="h-4 bg-slate-700 rounded mb-4 w-3/4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-slate-700 rounded w-16"></div>
                    <div className="h-6 bg-slate-700 rounded w-20"></div>
                  </div>
                </div>
              ))
            ) : projects && Array.isArray(projects) && projects.length > 0 ? (
              projects.map((project, index) => (
                <div
                  key={project._id || index}
                  onMouseEnter={() => setHoveredProject(project._id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="bg-slate-800/50 rounded-xl overflow-hidden shadow-xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group hover:scale-105 hover:-translate-y-2"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
                >
                  <div className="relative p-6 sm:p-8 h-full flex flex-col">
                    {/* Project Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-purple-600/20 rounded-lg text-purple-400 text-2xl group-hover:scale-110 group-hover:rotate-12 transition-transform">
                        {project.icon || "📦"}
                      </div>

                      <div className="flex items-center space-x-2">
                        {project?.featured && (
                          <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs rounded-full font-semibold">
                            ⭐ Featured
                          </span>
                        )}
                        {project?.category && (
                          <span className="px-2 py-1 bg-slate-700 text-gray-300 text-xs rounded-full">
                            {project.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="flex-grow">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                        {project.title || "Untitled Project"}
                      </h3>
                      <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed line-clamp-3">
                        {project.description || "No description provided."}
                      </p>

                      {/* Project Stats */}
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {project.createdAt
                              ? new Date(project.createdAt).getFullYear()
                              : project.year || "N/A"}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {project.status || "Active"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 group-hover:scale-110 transition-transform">
                          <Eye className="w-3 h-3" />
                          <span>View Details</span>
                        </div>
                      </div>

                      {/* Tech / Features */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.features && Array.isArray(project.features) && project.features.length > 0 ? (
                          project.features.slice(0, 3).map((feature, featureIndex) => (
                            <span
                              key={`feature-${featureIndex}`}
                              className="px-2 py-1 bg-purple-600/30 text-purple-300 text-xs rounded-full"
                            >
                              {feature}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs italic">
                            No features added
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      {project.liveLink && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.liveLink, "_blank");
                          }}
                          className="flex items-center justify-center flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all text-sm hover:scale-105"
                          aria-label="View live demo"
                        >
                          <ExternalLink
                            size={14}
                            className="mr-1"
                          />
                          Demo
                        </button>
                      )}
                      {project.githubLink && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.githubLink, "_blank");
                          }}
                          className="flex items-center justify-center flex-1 px-3 py-2 border border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white rounded-lg transition-all text-sm hover:scale-105"
                          aria-label="View source code"
                        >
                          <Github
                            size={14}
                            className="mr-1"
                          />
                          Code
                        </button>
                      )}
                    </div>

                    {/* Hover Effect Overlay */}
                    {hoveredProject === project._id && (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent pointer-events-none rounded-xl" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-12">
                <p>No projects found. Please check back later.</p>
              </div>
            )}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-purple-400/25 hover:scale-105 hover:-translate-y-1">
              View All Projects
            </button>
          </div>
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
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Services</h2>
            <p className="text-lg sm:text-xl text-gray-300 px-4">
              What I can do for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {isLoading ? (
              // Loading skeleton for services
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-slate-800/50 p-6 sm:p-8 rounded-xl animate-pulse">
                  <div className="w-16 h-16 bg-slate-700 rounded-lg mb-6"></div>
                  <div className="h-6 bg-slate-700 rounded mb-4"></div>
                  <div className="h-4 bg-slate-700 rounded mb-2"></div>
                  <div className="h-4 bg-slate-700 rounded mb-4 w-3/4"></div>
                  <div className="space-y-2 mb-6">
                    <div className="h-3 bg-slate-700 rounded"></div>
                    <div className="h-3 bg-slate-700 rounded"></div>
                    <div className="h-3 bg-slate-700 rounded"></div>
                  </div>
                </div>
              ))
            ) : services && Array.isArray(services) && services.length > 0 ? (
              services.map((service, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 p-6 sm:p-8 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group hover:scale-105 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                    <span className="text-3xl">{service.icon || "🔧"}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4">{service.title || "Service"}</h3>
                  <p className="text-gray-300 mb-6 text-sm sm:text-base leading-relaxed">{service.description || "No description available"}</p>

                  <ul className="space-y-2 mb-6">
                    {service.features && Array.isArray(service.features) ? (
                      service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-gray-400 text-sm">
                          <Star className="text-purple-400 mr-2 mt-0.5 w-3 h-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400 text-sm italic">No features listed</li>
                    )}
                  </ul>

                  <div className="pt-4 border-t border-slate-600">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-400 font-semibold text-sm">
                        {service.price ? `${service.price}` : "Contact for pricing"}
                        $
                      </span>
                      <button
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all text-sm hover:scale-105"
                        onClick={() => scrollToSection('contact')}
                      >
                        Get Quote
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-12">
                <p>No services found. Please check back later.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">Get In Touch</h2>
            <p className="text-lg sm:text-xl text-gray-300 px-4">
              Let's work together to bring your ideas to life
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center lg:text-left">Let's Connect Together</h3>
              <p className="text-gray-300 mb-6 sm:mb-8 text-center lg:text-left leading-relaxed">
                Ready to start your project? Send me a message and let's discuss how we can work together
                to create something amazing.
              </p>

              <div className="space-y-4 sm:space-y-6">
                {[
                  { icon: Mail, text: 'heyshuaib43@gmail.com', href: 'mailto:heyshuaib43@gmail.com' },
                  { icon: Phone, text: '+91 8979302837', href: 'tel:+918979302837' },
                  { icon: MapPin, text: 'Meerut, Uttar Pradesh, India', href: null },
                ].map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href || '#'}
                    className={`flex items-center text-gray-300 transition-colors group ${contact.href ? 'hover:text-purple-400 cursor-pointer' : 'cursor-default'
                      }`}
                    onClick={!contact.href ? (e) => e.preventDefault() : undefined}
                  >
                    <contact.icon className="w-5 h-5 text-purple-400 mr-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm sm:text-base">{contact.text}</span>
                  </a>
                ))}
              </div>

              <div className="mt-8 sm:mt-12">
                <h4 className="text-lg font-semibold text-white mb-4 text-center lg:text-left">Follow Me</h4>
                <div className="flex justify-center lg:justify-start space-x-4">
                  {[
                    { icon: Github, label: 'GitHub', href: 'https://github.com/Codermshuaibsi' },
                    { icon: Mail, label: 'Email', href: 'mailto:heyshuaib43@gmail.com' },
                    { icon: Globe, label: 'Website', href: 'https://devshuaib.vercel.app/' },
                    { icon: Phone, label: 'Phone', href: 'tel:+918979403827' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="p-3 bg-slate-800/50 hover:bg-purple-600/20 rounded-full transition-all hover:scale-110 hover:-translate-y-1"
                      title={social.label}
                      aria-label={social.label}
                      target={social.href.startsWith('http') ? "_blank" : undefined}
                      rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    >
                      <social.icon className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-6 sm:p-8 rounded-xl border border-slate-700">
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
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all shadow-lg hover:scale-105"
                >
                  <Send size={16} className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>
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
                <p className="text-gray-400">heyshuaib43@gmail.com</p>
                <p className="text-gray-400">+91 8979302837</p>
                <p className="text-gray-400">Meerut, Uttar Pradesh</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-gray-400 text-sm text-center sm:text-left">
                © 2025 DevShuaib — All rights reserved.
              </div>
              <div className="text-gray-400 text-sm text-center sm:text-right">
                Made with ❤️ by Shuaib
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-all hover:scale-110 hover:-translate-y-1"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-typewriter {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid transparent;
          animation: typewriter 2s steps(20) 1s forwards;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;