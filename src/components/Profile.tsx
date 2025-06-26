
import { Code, Award, Users, BookOpen } from "lucide-react";

const Profile = () => {
  return (
    <section
      id="profile"
      className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Profile Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-2xl blur-xl opacity-30 scale-105"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
                <img
                  src="public/lovable-uploads/ac05b5d9-c668-494e-9575-2f216c149e65.png?w=400&h=400"
                  alt="Yeheskiel Yunus Tame - Blockchain & AI Developer"
                  className="w-full max-w-sm mx-auto rounded-xl shadow-lg"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Yeheskiel Yunus Tame</h3>
                  <p className="text-purple-600 font-semibold">Blockchain & AI Developer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="order-1 lg:order-2">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Me</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Blockchain & AI Developer crafting the future with innovative solutions
              </p>
              <p className="text-gray-600 leading-relaxed">
                I'm passionate about building decentralized applications and integrating artificial intelligence 
                to solve real-world problems. With expertise in smart contracts, DeFi protocols, and machine learning, 
                I help businesses leverage cutting-edge technology for sustainable growth.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <Code className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Projects Built</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">30+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">5+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">10+</div>
                <div className="text-sm text-gray-600">Tech Stacks</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-purple-600 font-semibold rounded-xl border-2 border-purple-600 hover:bg-purple-50 transition-all duration-300"
              >
                Let's Connect
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
