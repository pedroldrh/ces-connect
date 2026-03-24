// Headshots for contacts — keyed by name for portability across demo/real DB
export const AVATAR_BY_NAME = {
  'Blair Garrou': 'https://business.rice.edu/sites/default/files/uploads/headshots/Blair_Garrou.jpg',
  'Chip Mahan': 'https://cdn.prod.website-files.com/64511a916386e86694292927/645d08fe4e6e0e02ba0f232f_HeadshotDark-Chip.jpg',
  'Greg Barrow': 'https://columns.wlu.edu/wp-content/uploads/2023/04/Greg-Barrow-scaled-e1682083859346-512x400.jpg',
  'Stephanie Lind': 'https://ideamensch.com/wp-content/uploads/2023/04/MicrosoftTeams-image-8.jpg',
  'Abhinav Kapur': 'https://cdn.prod.website-files.com/5ffd80effe39b874d39a3b9f/656de9ef9811629d39b9b943_abhinav-portrait.png',
  'Ted Elliott': 'https://columns.wlu.edu/wp-content/uploads/2022/03/ElliottTed_large-350x350.jpeg',
  'Eric Herrera': 'https://columns.wlu.edu/wp-content/uploads/2026/01/Jesse-and-Eric-in-lab_Sized.png',
  'Matt Bartini': 'https://columns.wlu.edu/wp-content/uploads/2020/10/Matt-Bartini-800x533.jpg',
}

export function getAvatar(contact) {
  return AVATAR_BY_NAME[contact?.name] || null
}
