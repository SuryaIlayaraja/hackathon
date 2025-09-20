import React, { useState, useMemo } from 'react';
import '../components/TamilNaduFarmerSchemes.css';
import { useLanguage } from '@/contexts/LanguageContext';

// Type definitions for the Tamil Nadu Farmer Schemes
interface Scheme {
  id: number;
  title: string;
  category: string;
  caste: string;
  description: string;
  benefits: string[];
  eligibility: string;
  applicationProcess: string;
  contact: string;
  directBenefits: string;
}

interface Category {
  value: string;
  label: string;
}

interface CasteOption {
  value: string;
  label: string;
  color: string;
}

const TamilNaduFarmerSchemes: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCaste, setSelectedCaste] = useState<string | null>(null);

  // Function to get translated scheme data
  const getTranslatedScheme = (scheme: Scheme) => {
    const translationKey = scheme.id <= 20 ? 
      Object.keys(scheme).find(key => key.includes('title'))?.replace('title', '') || '' :
      '';
    
    return {
      ...scheme,
      title: t(`schemes.${getSchemeTranslationKey(scheme.id)}.title`) || scheme.title,
      description: t(`schemes.${getSchemeTranslationKey(scheme.id)}.desc`) || scheme.description,
    };
  };

  // Function to get translation key for scheme ID
  const getSchemeTranslationKey = (id: number): string => {
    const keyMap: { [key: number]: string } = {
      1: 'cmFarmersProtection',
      2: 'summerPloughing', 
      3: 'wellRenovation',
      4: 'naturalFarming',
      5: 'hillFarmers',
      6: 'sugarcanePrice',
      7: 'cropInsurance',
      8: 'paddyProcurement',
      9: 'agriMachinery',
      10: 'cmServiceCentres',
      11: 'nutritionFarming',
      12: 'internationalExposure',
      13: 'electricitySubsidy',
      14: 'scDevelopment',
      15: 'bcDevelopment',
      16: 'mbcAgriculture',
      17: 'minorityFarmers',
      18: 'tribalFarmers',
      19: 'womenFarmers',
      20: 'youthFarmers'
    };
    return keyMap[id] || '';
  };

  // Tamil Nadu Farmer Schemes Data
  const schemes: Scheme[] = [
    {
      id: 1,
      title: "Chief Minister's Farmers Protection Scheme",
      category: "general",
      caste: "all",
      description: "Comprehensive insurance coverage for farmers against natural calamities and crop failures.",
      benefits: ["₹5 lakh life insurance", "₹50,000 accident coverage", "₹25,000 for natural calamities"],
      eligibility: "All farmers registered with Agriculture Department",
      applicationProcess: "Online application through Tamil Nadu e-Sevai portal",
      contact: "Toll-free: 1800-425-1556",
      directBenefits: "Life insurance worth ₹5 lakh + accident coverage ₹50,000 + natural calamity support ₹25,000"
    },
    {
      id: 9,
      title: "Summer Ploughing Incentive",
      category: "agriculture",
      caste: "all",
      description: "Direct financial incentive for summer ploughing to improve soil health and water retention.",
      benefits: ["₹2,000 per hectare", "Up to total cultivated land", "Direct bank transfer"],
      eligibility: "All farmers with land records",
      applicationProcess: "Apply through Agriculture Department with land documents",
      contact: "Agriculture Department: 044-2854-2000",
      directBenefits: "₹2,000 per hectare (up to total cultivated land)"
    },
    {
      id: 10,
      title: "Well Renovation Subsidy (Pilot)",
      category: "irrigation",
      caste: "all",
      description: "Financial support for renovating abandoned wells to improve water availability.",
      benefits: ["₹2.5 lakh per farmer", "For abandoned well renovation", "Technical support included"],
      eligibility: "Farmers with abandoned wells on their land",
      applicationProcess: "Apply through Water Resources Department",
      contact: "Water Resources: 044-2854-3000",
      directBenefits: "₹2.5 lakh per farmer (for abandoned well renovation)"
    },
    {
      id: 11,
      title: "Natural Farming Scheme",
      category: "agriculture",
      caste: "all",
      description: "Support for farmers transitioning to natural farming methods.",
      benefits: ["Average ₹16,000 per farmer", "Training and support", "Market linkage"],
      eligibility: "Farmers willing to adopt natural farming",
      applicationProcess: "Apply through Agriculture Department",
      contact: "Natural Farming Cell: 044-2854-4000",
      directBenefits: "Average ₹16,000 per farmer (₹12 crore / 7,500 farmers)"
    },
    {
      id: 12,
      title: "Hill Farmers Development Scheme",
      category: "development",
      caste: "all",
      description: "Special development programs for farmers in hilly regions.",
      benefits: ["Around ₹3,600 per farmer", "Infrastructure development", "Market access"],
      eligibility: "Farmers in designated hill areas",
      applicationProcess: "Apply through Hill Area Development Agency",
      contact: "Hill Development: 044-2854-5000",
      directBenefits: "Around ₹3,600 per farmer (₹22.8 crore / 63,000 farmers)"
    },
    {
      id: 13,
      title: "Sugarcane Price Incentive",
      category: "agriculture",
      caste: "all",
      description: "Additional price incentive above Fair and Remunerative Price (FRP) for sugarcane farmers.",
      benefits: ["₹349 per metric ton above FRP", "Direct payment to farmers", "Seasonal support"],
      eligibility: "All sugarcane farmers",
      applicationProcess: "Automatic through sugar mills",
      contact: "Sugar Commissioner: 044-2854-6000",
      directBenefits: "₹349 per metric ton (above FRP). Example: 100 MT = ₹34,900 extra"
    },
    {
      id: 14,
      title: "Crop Insurance Subsidy",
      category: "insurance",
      caste: "all",
      description: "100% premium subsidy for crop insurance to protect farmers from losses.",
      benefits: ["100% premium subsidized", "Coverage ₹20,000-50,000 per acre", "No farmer contribution"],
      eligibility: "All farmers with land records",
      applicationProcess: "Automatic enrollment through Agriculture Department",
      contact: "Crop Insurance Cell: 044-2854-7000",
      directBenefits: "Premium fully subsidized. Coverage worth ₹20,000-50,000 per acre"
    },
    {
      id: 15,
      title: "Paddy Procurement MSP + Incentive",
      category: "agriculture",
      caste: "all",
      description: "Enhanced Minimum Support Price with state incentives for paddy farmers.",
      benefits: ["Common variety: ₹2,500/quintal", "Fine variety: ₹2,545/quintal", "State incentive included"],
      eligibility: "All paddy farmers",
      applicationProcess: "Through designated procurement centers",
      contact: "Procurement Department: 044-2854-8000",
      directBenefits: "Common: ₹2,500/quintal, Fine: ₹2,545/quintal. Example: 100 quintals fine = ₹2,54,500"
    },
    {
      id: 16,
      title: "Agri Machinery Subsidy",
      category: "equipment",
      caste: "all",
      description: "60% subsidy on agricultural machinery like power weeders and transplanters.",
      benefits: ["60% subsidy on machinery", "Power weeder/transplanter support", "Installation assistance"],
      eligibility: "All farmers with land records",
      applicationProcess: "Apply through Agriculture Engineering Department",
      contact: "Agri Engineering: 044-2854-9000",
      directBenefits: "60% subsidy. Example: ₹1.5 lakh machine → farmer pays only ₹60,000"
    },
    {
      id: 17,
      title: "Chief Minister's Farmers Service Centres",
      category: "infrastructure",
      caste: "all",
      description: "Support for farmers to set up service centers with 30% infrastructure subsidy.",
      benefits: ["30% subsidy (₹3-6 lakh)", "Infrastructure support", "Business development"],
      eligibility: "Entrepreneurial farmers",
      applicationProcess: "Apply through Agriculture Department",
      contact: "Service Centre Cell: 044-2854-1000",
      directBenefits: "30% subsidy (₹3-6 lakh) for infrastructure setup"
    },
    {
      id: 18,
      title: "Nutrition Farming Mission",
      category: "agriculture",
      caste: "all",
      description: "Free seed kits and saplings for nutrition farming to improve food security.",
      benefits: ["Free seed kits", "Saplings worth ₹500-2000", "Training support"],
      eligibility: "All farming families",
      applicationProcess: "Apply through Agriculture Department",
      contact: "Nutrition Mission: 044-2854-1100",
      directBenefits: "Free seed kits/saplings worth ₹500-2000 per family"
    },
    {
      id: 19,
      title: "International Exposure Visits",
      category: "training",
      caste: "all",
      description: "Fully funded foreign exposure trips for selected farmers to learn modern techniques.",
      benefits: ["Fully funded trips", "~₹2 lakh per farmer", "International learning"],
      eligibility: "Progressive farmers selected by committee",
      applicationProcess: "Apply through Agriculture Department",
      contact: "International Cell: 044-2854-1200",
      directBenefits: "Fully funded foreign trips (~₹2 lakh per farmer)"
    },
    {
      id: 20,
      title: "Electricity Subsidy",
      category: "utility",
      caste: "all",
      description: "100% electricity subsidy for agricultural purposes to reduce farming costs.",
      benefits: ["100% electricity subsidy", "Free power for agriculture", "Annual savings ₹20,000-50,000"],
      eligibility: "All farmers with agricultural connections",
      applicationProcess: "Automatic through electricity board",
      contact: "TANGEDCO: 044-2854-1300",
      directBenefits: "100% subsidy → free power (saves ₹20,000-50,000 annually)"
    },
    {
      id: 2,
      title: "Adi Dravidar Welfare Scheme",
      category: "welfare",
      caste: "SC",
      description: "Special welfare schemes for Scheduled Caste farmers including land development and agricultural support.",
      benefits: ["Land development subsidy", "Agricultural equipment subsidy", "Training programs"],
      eligibility: "SC farmers with valid caste certificate",
      applicationProcess: "Apply through District Adi Dravidar Welfare Office",
      contact: "District Welfare Officer - Contact local collectorate",
      directBenefits: "Land development subsidy + equipment subsidy + comprehensive training programs"
    },
    {
      id: 3,
      title: "Backward Classes Development Scheme",
      category: "development",
      caste: "BC",
      description: "Development schemes for Backward Class farmers focusing on modern agricultural practices.",
      benefits: ["Modern farming equipment", "Seed subsidy", "Irrigation support"],
      eligibility: "BC farmers with valid community certificate",
      applicationProcess: "Online application through BC Welfare Department",
      contact: "BC Welfare Department: 044-2854-1234",
      directBenefits: "Modern equipment subsidy + seed subsidy + irrigation infrastructure support"
    },
    {
      id: 4,
      title: "Most Backward Classes Agriculture Scheme",
      category: "agriculture",
      caste: "MBC",
      description: "Special agricultural development programs for Most Backward Class farmers.",
      benefits: ["Crop insurance premium subsidy", "Fertilizer subsidy", "Market linkage support"],
      eligibility: "MBC farmers with valid community certificate",
      applicationProcess: "Apply through MBC Welfare Corporation",
      contact: "MBC Corporation: 044-2854-5678",
      directBenefits: "100% crop insurance premium subsidy + fertilizer subsidy + market access support"
    },
    {
      id: 5,
      title: "Minority Farmers Development Scheme",
      category: "minority",
      caste: "minority",
      description: "Development schemes for minority community farmers including financial assistance and training.",
      benefits: ["Interest-free loans", "Skill development training", "Market access support"],
      eligibility: "Minority community farmers with valid certificate",
      applicationProcess: "Apply through Tamil Nadu Minorities Economic Development Corporation",
      contact: "Minorities Corporation: 044-2854-9999",
      directBenefits: "Interest-free loans + skill development training + market access support"
    },
    {
      id: 6,
      title: "Tribal Farmers Welfare Scheme",
      category: "tribal",
      caste: "ST",
      description: "Comprehensive welfare schemes for Scheduled Tribe farmers in tribal areas.",
      benefits: ["Land rights support", "Traditional farming preservation", "Market access"],
      eligibility: "ST farmers with valid tribal certificate",
      applicationProcess: "Apply through Tribal Welfare Department",
      contact: "Tribal Welfare: 044-2854-7777",
      directBenefits: "Land rights support + traditional farming preservation + market access"
    },
    {
      id: 7,
      title: "Women Farmers Empowerment Scheme",
      category: "women",
      caste: "all",
      description: "Special schemes for women farmers focusing on empowerment and financial independence.",
      benefits: ["Women-specific training", "Financial assistance", "Leadership development"],
      eligibility: "Women farmers above 18 years",
      applicationProcess: "Apply through Women Development Corporation",
      contact: "Women Development: 044-2854-8888",
      directBenefits: "Women-specific training + financial assistance + leadership development programs"
    },
    {
      id: 8,
      title: "Youth Farmers Startup Scheme",
      category: "youth",
      caste: "all",
      description: "Support for young farmers to start agricultural ventures with modern technology.",
      benefits: ["Startup capital", "Technology training", "Mentorship program"],
      eligibility: "Farmers aged 18-35 years",
      applicationProcess: "Online application through Tamil Nadu Startup Mission",
      contact: "Startup Mission: 044-2854-1111",
      directBenefits: "Startup capital + technology training + mentorship program"
    },
  ];

  // Filter schemes based on search term, category, and caste
  const filteredSchemes = useMemo(() => {
    return schemes.filter(scheme => {
      const translatedScheme = getTranslatedScheme(scheme);
      const matchesSearch = translatedScheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           translatedScheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           scheme.caste.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
      
      // If no caste selected, show only general schemes (caste: 'all')
      // If caste selected, show schemes for that caste + general schemes
      const matchesCaste = selectedCaste === null 
        ? scheme.caste === 'all' 
        : scheme.caste === 'all' || scheme.caste === selectedCaste;
      
      return matchesSearch && matchesCategory && matchesCaste;
    }).map(scheme => getTranslatedScheme(scheme));
  }, [searchTerm, selectedCategory, selectedCaste, t]);

  const categories: Category[] = [
    { value: 'all', label: t('schemes.allCategories') },
    { value: 'general', label: t('schemes.categories.general') },
    { value: 'welfare', label: t('schemes.categories.welfare') },
    { value: 'development', label: t('schemes.categories.development') },
    { value: 'agriculture', label: t('schemes.categories.agricultural') },
    { value: 'irrigation', label: t('schemes.categories.irrigation') },
    { value: 'insurance', label: t('schemes.categories.insurance') },
    { value: 'equipment', label: t('schemes.categories.equipment') },
    { value: 'infrastructure', label: t('schemes.categories.infrastructure') },
    { value: 'training', label: t('schemes.categories.training') },
    { value: 'utility', label: t('schemes.categories.utility') },
    { value: 'minority', label: t('schemes.castes.minority') },
    { value: 'tribal', label: t('schemes.categories.tribal') },
    { value: 'women', label: t('schemes.categories.women') },
    { value: 'youth', label: t('schemes.categories.youth') }
  ];

  const getCasteColor = (caste: string): string => {
    const colors: Record<string, string> = {
      'all': '#4CAF50',
      'SC': '#FF9800',
      'BC': '#2196F3',
      'MBC': '#9C27B0',
      'minority': '#00BCD4',
      'ST': '#795548'
    };
    return colors[caste] || '#607D8B';
  };

  const casteOptions: CasteOption[] = [
    { value: 'SC', label: `${t('schemes.castes.sc')} (SC)`, color: '#FF9800' },
    { value: 'BC', label: `${t('schemes.castes.obc')} (BC)`, color: '#2196F3' },
    { value: 'MBC', label: `${t('schemes.castes.mbc')} (MBC)`, color: '#9C27B0' },
    { value: 'ST', label: `${t('schemes.castes.st')} (ST)`, color: '#795548' },
    { value: 'minority', label: t('schemes.castes.minority'), color: '#00BCD4' }
  ];

  return (
    <div className="schemes-container">
      <div className="schemes-header">
        <h1>{t('schemes.title')}</h1>
        <p>{t('schemes.subtitle')}</p>
      </div>

      {!selectedCaste && (
        <div className="caste-selection-section">
        <div className="caste-selection-header">
          <h2>{t('schemes.selectCommunity')}</h2>
          <p>{t('schemes.selectCommunityDesc')}</p>
        </div>
          
          <div className="caste-options-grid">
            {casteOptions.map(caste => (
              <button
                key={caste.value}
                className="caste-option-btn"
                onClick={() => setSelectedCaste(caste.value)}
                style={{ borderColor: caste.color }}
              >
                <div className="caste-option-content">
                  <div 
                    className="caste-option-icon"
                    style={{ backgroundColor: caste.color }}
                  >
                    {caste.value}
                  </div>
                  <span className="caste-option-label">{caste.label}</span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="general-schemes-note">
            <p>
              <strong>{t('common.note')}:</strong> {t('schemes.generalSchemesNote')}
            </p>
          </div>
        </div>
      )}

      {selectedCaste && (
        <div className="selected-caste-info">
          <div className="selected-caste-badge">
            <span 
              className="selected-caste-text"
              style={{ backgroundColor: getCasteColor(selectedCaste) }}
            >
              {casteOptions.find(c => c.value === selectedCaste)?.label}
            </span>
            <button 
              className="change-caste-btn"
              onClick={() => setSelectedCaste(null)}
            >
              {t('schemes.changeCommunity')}
            </button>
          </div>
        </div>
      )}

      <div className="search-filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder={t('schemes.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="schemes-grid">
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map(scheme => (
            <div key={scheme.id} className="scheme-card">
              <div className="scheme-header">
                <h3 className="scheme-title">{scheme.title}</h3>
                 <span 
                   className="caste-badge"
                   style={{ backgroundColor: scheme.caste === 'all' && selectedCaste ? getCasteColor(selectedCaste) : getCasteColor(scheme.caste) }}
                 >
                   {scheme.caste === 'all' ? 
                     (selectedCaste ? 
                       (selectedCaste === 'SC' ? t('schemes.castes.sc') :
                        selectedCaste === 'BC' ? t('schemes.castes.obc') :
                        selectedCaste === 'MBC' ? t('schemes.castes.mbc') :
                        selectedCaste === 'ST' ? t('schemes.castes.st') :
                        selectedCaste === 'minority' ? t('schemes.castes.minority') : selectedCaste) 
                       : t('schemes.allCastes')) :
                    scheme.caste === 'SC' ? t('schemes.castes.sc') :
                    scheme.caste === 'BC' ? t('schemes.castes.obc') :
                    scheme.caste === 'MBC' ? t('schemes.castes.mbc') :
                    scheme.caste === 'ST' ? t('schemes.castes.st') :
                    scheme.caste === 'minority' ? t('schemes.castes.minority') : scheme.caste}
                 </span>
              </div>

              <div className="scheme-content">
                <p className="scheme-description">{scheme.description}</p>
                
                <div className="direct-benefits-section">
                  <h4>💰 {t('schemes.directBenefits')}:</h4>
                  <div className="direct-benefits-highlight">
                    {scheme.directBenefits}
                  </div>
                </div>

                <div className="benefits-section">
                  <h4>{t('schemes.benefits')}:</h4>
                  <ul className="benefits-list">
                    {scheme.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <div className="scheme-details">
                  <div className="detail-item">
                    <strong>{t('schemes.eligibility')}:</strong>
                    <span>{scheme.eligibility}</span>
                  </div>
                  
                  <div className="detail-item">
                    <strong>{t('schemes.applicationProcess')}:</strong>
                    <span>{scheme.applicationProcess}</span>
                  </div>
                  
                  <div className="detail-item">
                    <strong>{t('schemes.contact')}:</strong>
                    <span className="contact-info">{scheme.contact}</span>
                  </div>
                </div>
              </div>

              <div className="scheme-footer">
                <a 
                  href="https://www.tnagrisnet.tn.gov.in/home/schemes/en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="info-btn"
                >
                  {t('schemes.viewDetails')}
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>{t('schemes.noSchemesFound')}</h3>
            <p>{t('schemes.noSchemesFoundDesc')}</p>
          </div>
        )}
      </div>

      <div className="how-to-use-section">
        <div className="how-to-header">
          <h2>📋 {t('schemes.howToApply')}</h2>
          <p>{t('schemes.howToApplyDesc')}</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>🌾 {t('schemes.step1.title')}</h3>
              <ul>
                <li>{t('schemes.step1.desc1')}</li>
                <li>{t('schemes.step1.desc2')}</li>
                <li>{t('schemes.step1.desc3')}</li>
                <li>{t('schemes.step1.desc4')}</li>
              </ul>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>✅ {t('schemes.step2.title')}</h3>
              <ul>
                <li>{t('schemes.step2.desc1')}</li>
                <li>{t('schemes.step2.desc2')}</li>
                <li>{t('schemes.step2.desc3')}</li>
                <li>{t('schemes.step2.desc4')}</li>
              </ul>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>💻 {t('schemes.step3.title')}</h3>
              <ul>
                <li>{t('schemes.step3.desc1')}</li>
                <li>{t('schemes.step3.desc2')}</li>
                <li>{t('schemes.step3.desc3')}</li>
                <li>{t('schemes.step3.desc4')}</li>
              </ul>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>📊 {t('schemes.step4.title')}</h3>
              <ul>
                <li>{t('schemes.step4.desc1')}</li>
                <li>{t('schemes.step4.desc2')}</li>
                <li>{t('schemes.step4.desc3')}</li>
                <li>{t('schemes.step4.desc4')}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="quick-links-section">
          <h3>🔗 {t('schemes.quickLinks')}</h3>
          <div className="links-grid">
            <a href="https://www.tnesevai.tn.gov.in/" target="_blank" rel="noopener noreferrer" className="quick-link">
              <span className="link-icon">🏛️</span>
              <span className="link-text">{t('schemes.eSevaiPortal')}</span>
            </a>
            <a href="tel:1800-425-1556" className="quick-link">
              <span className="link-icon">📞</span>
              <span className="link-text">{t('schemes.helpline')}</span>
            </a>
            <a href="https://www.tn.gov.in/departments/agriculture" target="_blank" rel="noopener noreferrer" className="quick-link">
              <span className="link-icon">🌱</span>
              <span className="link-text">{t('schemes.agricultureDepartment')}</span>
            </a>
            <a href="https://youtu.be/33vzuGfzSgI?si=xGMf09IGCbMhcK6h" target="_blank" rel="noopener noreferrer" className="quick-link">
              <span className="link-icon">🚜</span>
              <span className="link-text">{t('schemes.howToApplyTractor')}</span>
            </a>
            <a href="https://youtu.be/EFTwvVXSZ0E?si=Qyz0zV1v7FhnSW7f" target="_blank" rel="noopener noreferrer" className="quick-link">
              <span className="link-icon">🏆</span>
              <span className="link-text">{t('schemes.top5Schemes')}</span>
            </a>
            <a href="https://youtu.be/AqhhkWJmyJk?si=wDLweczdzRMr4BXE" target="_blank" rel="noopener noreferrer" className="quick-link">
              <span className="link-icon">⚙️</span>
              <span className="link-text">80% Offer for Modern Machines</span>
            </a>
          </div>
        </div>
      </div>

      <div className="schemes-footer">
        <p>
          <strong>{t('schemes.note')}</strong> {t('schemes.noteText')} 
          {t('schemes.verifyInfo')}
        </p>
      </div>
    </div>
  );
};

export default TamilNaduFarmerSchemes;