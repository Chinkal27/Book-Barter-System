import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, CreditCard, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Exchange Books, Save Money, Build Community
              </h1>
              <p className="text-lg md:text-xl mb-8 text-primary-100">
                BookBarter connects students to exchange used textbooks instead of buying new ones, saving you money and reducing waste.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link to="/browse" className="btn-accent text-center">
                  Browse Books
                </Link>
                {!isAuthenticated && (
                  <Link to="/auth" className="btn bg-white text-primary-800 hover:bg-primary-50 text-center">
                    Sign Up Free
                  </Link>
                )}
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 flex justify-center md:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-64 h-64 bg-accent-500 rounded-lg transform -rotate-6"></div>
                <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-secondary-500 rounded-lg transform rotate-6"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-xl text-neutral-800">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-xl font-bold">Calculus: Early Transcendentals</h3>
                    <span className="badge-success">Like New</span>
                  </div>
                  <div className="flex mb-4">
                    <div className="w-24 h-32 bg-neutral-200 rounded mr-4"></div>
                    <div>
                      <p className="text-neutral-600">James Stewart</p>
                      <p className="text-sm mt-2">Available for barter from <span className="font-medium">Sarah J.</span></p>
                      <div className="mt-4 flex items-center">
                        <span className="badge-primary mr-2">MATH101</span>
                        <span className="badge-secondary">Mathematics</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-200">
                    <div className="flex items-center">
                      <Sparkles className="h-5 w-5 text-primary-500 mr-2" />
                      <span className="text-sm font-medium">94% Match with your preferences</span>
                    </div>
                    <button className="btn-primary py-1 px-3 text-sm">Request</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-paper">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How BookBarter Works</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our platform makes exchanging textbooks simple, safe, and efficient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">List Your Books</h3>
              <p className="text-neutral-600">
                Add the textbooks you no longer need to your profile, including details about condition, course, and more.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Get Matched</h3>
              <p className="text-neutral-600">
                Our intelligent algorithm finds books you need and suggests potential barter exchanges based on relevance.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Exchange & Rate</h3>
              <p className="text-neutral-600">
                Arrange to meet with fellow students, exchange books, and rate each other to build trust in the community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Why Choose BookBarter?</h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-success-100 text-success-700 rounded-full flex items-center justify-center">
                      <CreditCard className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2">Save Money</h3>
                    <p className="text-neutral-600">
                      Students save an average of $300 per semester by bartering textbooks instead of buying new ones.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
                    <p className="text-neutral-600">
                      Our intelligent algorithm suggests the most relevant book exchanges based on your courses and preferences.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-accent-100 text-accent-700 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2">Campus Community</h3>
                    <p className="text-neutral-600">
                      Connect with fellow students, build your network, and contribute to a sustainable campus ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-neutral-50 p-6 rounded-lg relative max-w-md">
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center text-white font-bold">
                  <div className="text-center">
                    <div className="text-lg leading-none">Save</div>
                    <div className="text-xl leading-none">$300+</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-6">Student Savings Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Number of courses per semester
                    </label>
                    <input
                      type="number"
                      defaultValue="5"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Average new textbook cost
                    </label>
                    <input
                      type="number"
                      defaultValue="120"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Semesters until graduation
                    </label>
                    <input
                      type="number"
                      defaultValue="4"
                      className="input"
                    />
                  </div>
                  <div className="pt-4 border-t border-neutral-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Potential savings:</span>
                      <span className="text-xl font-bold text-success-600">$2,400</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Students Are Saying</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Hear from students who have saved money and found their textbooks through BookBarter
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-neutral-200 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium">Alex Johnson</h4>
                  <p className="text-sm text-neutral-500">Computer Science Junior</p>
                </div>
              </div>
              <p className="text-neutral-600 mb-4">
                "I saved over $400 last semester by exchanging books through BookBarter. The matching algorithm made it super easy to find exactly what I needed!"
              </p>
              <div className="flex text-accent-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-neutral-200 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium">Madison Taylor</h4>
                  <p className="text-sm text-neutral-500">Biology Sophomore</p>
                </div>
              </div>
              <p className="text-neutral-600 mb-4">
                "As a pre-med student, my textbooks are expensive! BookBarter helped me find the exact editions I needed and I've met some great study partners through exchanges."
              </p>
              <div className="flex text-accent-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-neutral-200 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-medium">Jamal Williams</h4>
                  <p className="text-sm text-neutral-500">Business Senior</p>
                </div>
              </div>
              <p className="text-neutral-600 mb-4">
                "BookBarter is a game-changer! The platform is intuitive, and I love that I can see the condition of books before requesting a trade. Saved me hundreds of dollars."
              </p>
              <div className="flex text-accent-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} filled={i < 4} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-600 to-accent-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Saving?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white text-opacity-90">
            Join thousands of students already exchanging textbooks and saving money every semester
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/browse" className="btn bg-white text-accent-600 hover:bg-accent-50 flex items-center justify-center space-x-2">
              <span>Browse Books</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            {!isAuthenticated && (
              <Link to="/auth" className="btn border-2 border-white text-white hover:bg-white hover:bg-opacity-10">
                Create Free Account
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// Star component for testimonials
const Star: React.FC<{ filled?: boolean }> = ({ filled = true }) => {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill={filled ? "currentColor" : "none"} 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

export default HomePage;