import HeroSection from './HeroSection';
import VideoSection from './VideoSection';
import FeatureOverview from './FeatureOverview';
// import Testimonials from './Testimonials';
import PremiumCTA from './PremiumCTA';
import { CssBaseline, Divider, Box } from '@mui/material';

function LandingPage() {
  return (
    <div>
      <CssBaseline />
      <HeroSection />
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Divider sx={{ width: '50%', borderColor: '#ccc' }} />
      </Box>
      <VideoSection />
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Divider sx={{ width: '50%', borderColor: '#ccc' }} />
      </Box>
      <FeatureOverview />
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Divider sx={{ width: '50%', borderColor: '#ccc' }} />
      </Box>
      {/* <Testimonials /> */}
      <PremiumCTA />
    </div>
  );
}

export default LandingPage
