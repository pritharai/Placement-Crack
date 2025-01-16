import React from 'react';
import { Clock, Award } from 'lucide-react';

function MockTests() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Mock Tests</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TestCard
          title="Aptitude Test - Basic"
          duration="60 mins"
          questions={30}
          difficulty="Easy"
        />
        <TestCard
          title="Technical Assessment"
          duration="90 mins"
          questions={45}
          difficulty="Medium"
        />
        <TestCard
          title="Full Mock Interview"
          duration="120 mins"
          questions={60}
          difficulty="Hard"
        />
      </div>
    </div>
  );
}

function TestCard({ title, duration, questions, difficulty }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-600">
          <Clock className="h-5 w-5 mr-2" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Award className="h-5 w-5 mr-2" />
          <span>{questions} Questions</span>
        </div>
        <div className="text-sm font-medium text-orange-600">
          Difficulty: {difficulty}
        </div>
      </div>
      
      <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
        Start Test
      </button>
    </div>
  );
}

export default MockTests;