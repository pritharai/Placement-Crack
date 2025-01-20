import React, { useEffect, useState } from 'react';
import { BarChart, Award, Target, Clock, BookOpen, Brain, User, Pencil } from 'lucide-react';
import StatesCard from '../components/StatesCard';
import ProgressBar from '../components/ProgressBar';
import { getCurrentUser, updateUserAvatar } from '../utils/userDataFetch'; // Import utility functions
import { useSelector } from 'react-redux';

function UserProfile({ userId }) {
  const [userStats, setUserStats] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  const handleSubmitAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const data = await updateUserAvatar(formData);
      if (data) {
        setUserStats((prev) => ({
          ...prev,
          avatar: data.avatar, // Update avatar in state
        }));
        console.log('Avatar updated successfully');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, success } = await getCurrentUser();
        if (success) {
          setUserStats({
            name: data.name,
            email: data.email,
            avatar: data.avatar,
            joinedDate: new Date(data.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            }),
            stats: {
              completedQuestions: data.progress.completedQuestions,
              correctAnswers: data.progress.correctAnswers,
              testsTaken: data.progress.testsTaken,
              averageScore: data.progress.completedQuestions
                ? Math.round((data.progress.correctAnswers / data.progress.completedQuestions) * 100)
                : 0,
              rank: 42, // Placeholder
              streak: 7, // Placeholder
            },
          });
console.log(userStats.avatar);

          setRecentActivities(
            data.testSessions.map((session) => ({
              type: session.status === 'completed' ? 'Mock Test' : 'Practice',
              title: `Test #${session.testId}`,
              score: 'N/A', // Placeholder
              date: new Date(session.startTime).toLocaleDateString('en-US'),
            }))
          );
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!userStats) return <div>No user data available.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <label htmlFor="avatar" className="relative block cursor-pointer">
              <div className="h-20 w-20 rounded-full overflow-hidden bg-indigo-800">
                {userStats.avatar ? (
                  <img
                    src={userStats.avatar}
                    alt={userStats.name }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-indigo-600 flex items-center justify-center">
                    <User className="h-10 w-10 text-white" />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Pencil className="h-6 w-6 text-white" />
              </div>
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleSubmitAvatar}
              className="hidden"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{userStats.name}</h1>
            <p className="text-gray-600">{userStats.email}</p>
            <p className="text-sm text-gray-500">Member since {userStats.joinedDate}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatesCard
          icon={<Target className="h-6 w-6 text-indigo-600" />}
          title="Accuracy Rate"
          value={`${userStats.stats.averageScore}%`}
        />
        <StatesCard
          icon={<Award className="h-6 w-6 text-indigo-600" />}
          title="Current Rank"
          value={`#${userStats.stats.rank}`}
        />
        <StatesCard
          icon={<Clock className="h-6 w-6 text-indigo-600" />}
          title="Daily Streak"
          value={`${userStats.stats.streak} days`}
        />
      </div>

      {/* Progress and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
          <div className="space-y-4">
            <ProgressBar
              icon={<BookOpen className="h-5 w-5" />}
              label="Questions Completed"
              value={userStats.stats.completedQuestions}
              total={200}
            />
            <ProgressBar
              icon={<Brain className="h-5 w-5" />}
              label="Tests Completed"
              value={userStats.stats.testsTaken}
              total={20}
            />
            <ProgressBar
              icon={<Target className="h-5 w-5" />}
              label="Average Score"
              value={userStats.stats.averageScore}
              total={100}
              showPercentage
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.type} • {activity.date}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {activity.score}
                  </span>
                </div>
              ))
            ) : (
              <p>No recent activity.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
