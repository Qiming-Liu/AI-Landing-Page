import { useAppSelector } from '@/store/hooks';

import enTranslations from '../../public/locales/en/common.json';
import zhTranslations from '../../public/locales/zh/common.json';

type Language = 'en' | 'zh';

interface TranslationProps {
  home: string;
  news: string;
  papers: string;
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
