import SettingsToggle from "./components/SettingsToggle";

// Simulated API call with delay
async function getUserProfile() {
  // Simulate API delay (2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Senior Developer",
    avatar: "JD",
    stats: {
      projects: 12,
      tasks: 48,
      completed: 36,
    },
    recentActivity: [
      {
        id: 1,
        action: "Completed task",
        project: "Next.js Blog",
        time: "2 hours ago",
      },
      {
        id: 2,
        action: "Created issue",
        project: "Dashboard UI",
        time: "5 hours ago",
      },
      {
        id: 3,
        action: "Pushed commit",
        project: "API Routes",
        time: "1 day ago",
      },
    ],
  };
}

// This is a Server Component by default (no 'use client' directive)
export default async function DashboardPage() {
  // Fetch user profile data on the server
  const user = await getUserProfile();

  return (
    <div className="dashboard-panel dark-mode">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-400">
          Here&apos;s what&apos;s happening with your projects today.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* User Profile Card */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                {user.avatar}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-white">
                  {user.name}
                </h2>
                <p className="text-gray-400">{user.email}</p>
                <span className="inline-block mt-1 px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full">
                  {user.role}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  {user.stats.projects}
                </p>
                <p className="text-gray-400 text-sm mt-1">Projects</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  {user.stats.tasks}
                </p>
                <p className="text-gray-400 text-sm mt-1">Total Tasks</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  {user.stats.completed}
                </p>
                <p className="text-gray-400 text-sm mt-1">Completed</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Recent Activity
            </h3>
            <div className="space-y-4">
              {user.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                >
                  <div>
                    <p className="text-white">{activity.action}</p>
                    <p className="text-gray-400 text-sm">{activity.project}</p>
                  </div>
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-8">
          {/* Client Component embedded in Server Component */}
          <SettingsToggle />

          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                Create New Project
              </button>
              <button className="w-full px-4 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors">
                Invite Team Member
              </button>
              <button className="w-full px-4 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
