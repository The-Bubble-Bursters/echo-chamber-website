
import Button from '@mui/material/Button';

function LandingPage() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      maxWidth: '75%', 
      margin: '0 auto' 
  }}>
      <div style={{ 
          maxWidth: '800px', // Set the maximum width
          width: '100%', // Allow it to take full width up to the max width
          margin: '0 auto', // Center it horizontally
          textAlign: 'left' 
      }}>
          <p>
              In the digital age, we find ourselves in, information is easier to access than ever before. But this easy access to information has brought about a phenomenon called “echo chambers” that reduces the amount of good information available to users. According to the NIH, this occurs when “users’ opinions, political leanings, or beliefs about a topic are reinforced by repeated interactions with peers with similar tendencies and attitudes” (Gao 2023). Research has shown that this is more prevalent than you might think. Users in the study saw over 50% of content with similar views and less than 15% with differing views (Zadrozny 2023).
          </p>

          <p>
              We want to help democratize the internet for users to get diverse and balanced information, no matter the platform. This starts with first helping users identify when they are in an echo chamber. From there, we want to provide users with alternative viewpoints to help diminish the effects of the echo chamber.
          </p>
      </div>
  
      {/* Responsive Iframe Container */}
      <div style={{ 
          position: 'relative', 
          width: '100%', 
          paddingBottom: '56.25%', // 16:9 Aspect Ratio
          height: 0,
          overflow: 'hidden',
          margin: '20px 0' 
      }}>
          <iframe 
              src="https://www.youtube.com/embed/thQDkvOUY4E?si=9ixZxYLcmeo7BQRO" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen 
              style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%' 
              }} 
          />
      </div>
  
      <div>
        <Button variant="contained" href="https://chromewebstore.google.com/detail/echo-chamber/ihleleinncbgegegpiegibkbfbggncah?authuser=1&hl=en">
          Get Echo Chamber
        </Button>
      </div>
      <br />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="./echo-chamber-high-resolution-logo.png"
          alt="Echo Chamber logo"
          width="300"
          style={{ maxWidth: '75%' }}
        />
      </div>
    </div>
  );
}

export default LandingPage
