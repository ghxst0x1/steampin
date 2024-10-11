// pages/index.tsx
import { useState, useEffect } from "react";
import Head from "next/head";

interface Shortcut {
  id: string;
  title: string;
  link: string;
  group: string;
}

export default function Home() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [pinnedShortcuts, setPinnedShortcuts] = useState<string[]>([]);
  const [googleSearch, setGoogleSearch] = useState("");
  const [youtubeSearch, setYoutubeSearch] = useState("");
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/shortcuts")
      .then((res) => res.json())
      .then((data) => setShortcuts(data));

    const storedPinnedShortcuts = localStorage.getItem("pinnedShortcuts");
    if (storedPinnedShortcuts) {
      setPinnedShortcuts(JSON.parse(storedPinnedShortcuts));
    }

    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode === "true");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (darkMode === null) return;
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  const handleGoogleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(googleSearch)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleYoutubeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        youtubeSearch
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const togglePinnedShortcut = (id: string) => {
    const newPinnedShortcuts = pinnedShortcuts.includes(id)
      ? pinnedShortcuts.filter((shortcutId) => shortcutId !== id)
      : [...pinnedShortcuts, id];
    setPinnedShortcuts(newPinnedShortcuts);
    localStorage.setItem("pinnedShortcuts", JSON.stringify(newPinnedShortcuts));
  };

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.group]) {
      acc[shortcut.group] = [];
    }
    acc[shortcut.group].push(shortcut);
    return acc;
  }, {} as Record<string, Shortcut[]>);

  if (darkMode === null) return null;

  return (
    <div className="min-h-screen p-2 flex flex-col justify-start items-center transition-colors duration-200 dark:bg-gray-900 dark:text-white">
      <Head>
        <title>SteamPin</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="py-10 flex flex-col justify-start items-center w-full max-w-6xl">
        <h1 className="text-4xl font-bold mb-8">SteamPin</h1>

        <button
          onClick={toggleDarkMode}
          className="mb-8 p-2 bg-blue-500 text-white rounded"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>

        {/* Search forms */}
        <div className="w-full flex flex-col sm:flex-row justify-between mb-8">
          <form
            onSubmit={handleGoogleSearch}
            className="flex-1 mr-0 sm:mr-4 mb-4 sm:mb-0"
          >
            <input
              type="text"
              value={googleSearch}
              onChange={(e) => setGoogleSearch(e.target.value)}
              placeholder="Google Search"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="mt-2 p-2 bg-blue-500 text-white rounded"
            >
              Search Google
            </button>
          </form>
          <form onSubmit={handleYoutubeSearch} className="flex-1 ml-0 sm:ml-4">
            <input
              type="text"
              value={youtubeSearch}
              onChange={(e) => setYoutubeSearch(e.target.value)}
              placeholder="YouTube Search"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="mt-2 p-2 bg-red-500 text-white rounded"
            >
              Search YouTube
            </button>
          </form>
        </div>

        {/* Pinned Shortcuts */}
        <div className="w-full mb-8">
          <h2 className="text-2xl font-semibold mb-4">Pinned Shortcuts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {shortcuts
              .filter((shortcut) => pinnedShortcuts.includes(shortcut.id))
              .map((shortcut) => (
                <ShortcutCard
                  key={shortcut.id}
                  shortcut={shortcut}
                  isPinned={true}
                  togglePin={() => togglePinnedShortcut(shortcut.id)}
                />
              ))}
          </div>
        </div>

        {/* All Shortcuts */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4">All Shortcuts</h2>
          <div className="space-y-2">
            {Object.entries(groupedShortcuts).map(([group, groupShortcuts]) => (
              <div
                key={group}
                className="border rounded-lg overflow-hidden dark:border-gray-700"
              >
                <button
                  onClick={() => toggleGroup(group)}
                  className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-left flex justify-between items-center"
                >
                  <span className="text-lg font-medium">{group}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      openGroups.includes(group) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openGroups.includes(group) && (
                  <div className="p-3 bg-white dark:bg-gray-900">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {groupShortcuts.map((shortcut) => (
                        <CompactShortcutCard
                          key={shortcut.id}
                          shortcut={shortcut}
                          isPinned={pinnedShortcuts.includes(shortcut.id)}
                          togglePin={() => togglePinnedShortcut(shortcut.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <h6 className="opacity-50">
          Tip: You can use Middle Mouse button or CTRL+LEFT CLICK on links to
          open tabs on new tab instead of new window
        </h6>
      </main>
    </div>
  );
}

function ShortcutCard({
  shortcut,
  isPinned,
  togglePin,
}: {
  shortcut: Shortcut;
  isPinned: boolean;
  togglePin: () => void;
}) {
  return (
    <div className="border rounded p-4 text-center dark:border-gray-600 relative">
      <h3 className="text-xl font-semibold mb-2">{shortcut.title}</h3>
      <a
        href={shortcut.link}
        // target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline dark:text-blue-300"
      >
        {shortcut.link}
      </a>
      <button
        onClick={togglePin}
        className="absolute top-2 right-2 p-1"
        aria-label={isPinned ? "Unpin" : "Pin"}
      >
        <svg
          className={`w-6 h-6 ${
            isPinned ? "text-yellow-500" : "text-gray-400"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.828 3.828a4 4 0 01-5.656 0l-2 2a4 4 0 105.656 5.656l2-2a4 4 0 010-5.656z" />
          <path d="M11.172 3.828a4 4 0 015.656 0l2 2a4 4 0 11-5.656 5.656l-2-2a4 4 0 010-5.656z" />
        </svg>
      </button>
    </div>
  );
}

function CompactShortcutCard({
  shortcut,
  isPinned,
  togglePin,
}: {
  shortcut: Shortcut;
  isPinned: boolean;
  togglePin: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-2 border rounded dark:border-gray-700">
      <a
        href={shortcut.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline dark:text-blue-300 flex-grow"
      >
        {shortcut.title}
      </a>
      <button
        onClick={togglePin}
        className="ml-2 p-1"
        aria-label={isPinned ? "Unpin" : "Pin"}
      >
        <svg
          className={`w-5 h-5 ${
            isPinned ? "text-yellow-500" : "text-gray-400"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.828 3.828a4 4 0 01-5.656 0l-2 2a4 4 0 105.656 5.656l2-2a4 4 0 010-5.656z" />
          <path d="M11.172 3.828a4 4 0 015.656 0l2 2a4 4 0 11-5.656 5.656l-2-2a4 4 0 010-5.656z" />
        </svg>
      </button>
    </div>
  );
}
