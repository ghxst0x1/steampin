// pages/api/shortcuts.ts
import { NextApiRequest, NextApiResponse } from 'next';

interface Shortcut {
  id: string;
  title: string;
  link: string;
  group: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Shortcut[]>) {
  const shortcuts: Shortcut[] = [
    { id: '1', title: 'Google', link: 'https://www.google.com', group: 'Search Engines' },
    { id: '2', title: 'YouTube', link: 'https://www.youtube.com', group: 'Entertainment' },
    { id: '3', title: 'GitHub', link: 'https://www.github.com', group: 'Development' },
    { id: '4', title: 'Stack Overflow', link: 'https://stackoverflow.com', group: 'Development' },
    { id: '5', title: 'Netflix', link: 'https://www.netflix.com', group: 'Entertainment' },
    { id: '6', title: 'Amazon', link: 'https://www.amazon.com', group: 'Shopping' },
    { id: '7', title: 'Twitch', link: 'https://www.twitch.tv', group: 'Entertainment' },
    // Add more shortcuts as needed
  ];

  res.status(200).json(shortcuts);
}