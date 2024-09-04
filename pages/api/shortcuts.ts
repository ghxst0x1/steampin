// pages/api/shortcuts.ts
import { NextApiRequest, NextApiResponse } from "next";

interface Shortcut {
  id: string;
  title: string;
  link: string;
  group: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Shortcut[]>
) {
  const shortcuts: Shortcut[] = [
    {
      id: "1",
      title: "Twitch",
      link: "https://www.twitch.tv",
      group: "Entertainment",
    },
    {
      id: "2",
      title: "R6 Tracker",
      link: "https://r6.tracker.network",
      group: "Games",
    },
    {
      id: "3",
      title: "DIM",
      link: "https://app.destinyitemmanager.com",
      group: "Games",
    },
    {
      id: "4",
      title: "Today-in-destiny",
      link: "https://www.todayindestiny.com",
      group: "Games",
    },
    {
      id: "5",
      title: "D2ArmorPicker",
      link: "https://d2armorpicker.com",
      group: "Games",
    },
    {
      id: "6",
      title: "Destiny Recipes",
      link: "https://destinyrecipes.com",
      group: "Games",
    },
    {
      id: "7",
      title: "D2 Checkpoint",
      link: "https://d2checkpoint.com",
      group: "Games",
    },
    {
      id: "8",
      title: "EldenRing WiKi",
      link: "https://eldenring.wiki.fextralife.com",
      group: "Games",
    },
    {
      id: "9",
      title: "Palia WiKi",
      link: "https://palia.wiki.gg",
      group: "Games",
    },
    {
      id: "10",
      title: "Palia Rummage Pile",
      link: "https://palia.th.gl/en/rummage-pile",
      group: "Games",
    },
    // Add more shortcuts as needed
  ];

  res.status(200).json(shortcuts);
}