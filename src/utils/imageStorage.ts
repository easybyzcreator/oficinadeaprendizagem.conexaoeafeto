export interface StoredImages {
  eventLogo: string | null;
  adrianaPhoto: string | null;
  fabrinePhoto: string | null;
  duoPhoto: string | null;
  headerBannerPhoto: string | null;
}

export const DEFAULT_IMAGES: StoredImages = {
  eventLogo: 'https://i.ibb.co/zVYV3chb/patitour-2026-09-10-T133725-835.png',
  adrianaPhoto: 'https://i.ibb.co/CpYWBP0v/dri.png',
  fabrinePhoto: 'https://i.ibb.co/k68p8rwS/patitour-2026-06-25-T112823-542.png',
  duoPhoto: 'https://i.ibb.co/RkVkXqrb/patitour-2026-09-30-T141101-234.png',
  headerBannerPhoto: null,
};

const STORAGE_KEY = 'oficinas_aprendizagem_images_v4';

export function getStoredImages(): StoredImages {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return {
        eventLogo: parsed.eventLogo || DEFAULT_IMAGES.eventLogo,
        adrianaPhoto: parsed.adrianaPhoto || DEFAULT_IMAGES.adrianaPhoto,
        fabrinePhoto: parsed.fabrinePhoto || DEFAULT_IMAGES.fabrinePhoto,
        duoPhoto: parsed.duoPhoto || DEFAULT_IMAGES.duoPhoto,
        headerBannerPhoto: parsed.headerBannerPhoto || DEFAULT_IMAGES.headerBannerPhoto,
      };
    }
  } catch (e) {
    console.error('Error reading images from storage', e);
  }
  return DEFAULT_IMAGES;
}

export function saveStoredImages(images: StoredImages) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  } catch (e) {
    console.error('Error saving images to storage', e);
  }
}
