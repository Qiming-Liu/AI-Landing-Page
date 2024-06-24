import { useAppSelector } from '@/store/hooks';

import enTranslations from '../../public/locales/en/common.json';
import zhTranslations from '../../public/locales/zh/common.json';

type Language = 'en' | 'zh';

interface TranslationProps {
  home: string;
  shareStories: string;
  travelGuides: string;
  joinCommunity: string;
  where: string;
  dates: string;
  guests: string;
  pets: string;
  newPost: string;
  houses: string;
  flats: string;
  hostels: string;
  villas: string;
  personalInfo: string;
  properties: string;
  favorites: string;
  privacyAndSecurity: string;
  settings: string;
  signOut: string;
  login: string;
  signUp: string;
  profile: string;
  myBookings: string;
  viewHistory: string;
  message: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  joinDate: string;
  submit: string;
  forgotPassword: string;
  alreadyHaveAccount: string;
  createAccount: string;
  signIn: string;
  uploadPhoto: string;
  isYourPetDewormed: string;
  basicInfo: string;
  name: string;
  breed: string;
  gender: string;
  male: string;
  female: string;
  birthday: string;
  description: string;
  cancel: string;
  save: string;
  yes: string;
  no: string;
}

const translations: Record<Language, TranslationProps> = {
  en: enTranslations,
  zh: zhTranslations,
};

export const useLocalization = () => {
  const { selectedLanguage } = useAppSelector((state) => state.language);

  const t = (key: keyof TranslationProps): string => {
    if (selectedLanguage in translations) {
      return translations[selectedLanguage as Language][key] || key;
    }
    return key;
  };

  return { t, currentLanguage: selectedLanguage };
};
