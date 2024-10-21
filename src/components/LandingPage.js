
import Button from '@mui/material/Button';

function LandingPage() {
  return (
    <div>
      <div style={{width: "400", maxWidth: '75%', alignItems: 'center', justifyContent: 'center', textAlign: 'left', margin: '0 auto'}}>
        <p>
          In the digital age, we find ourselves in, information is easier to access than ever before. But this easy access to information has brought about a phenomenon called “echo chambers” that reduces the amount of good information available to users. According to the NIH, this occurs when “users’ opinions, political leanings, or beliefs about a topic are reinforced by repeated interactions with peers with similar tendencies and attitudes” (Gao 2023). Research has shown that this is more prevalent than you might think. Users in the study saw over 50% of content with similar views and less than 15% with differing views (Zadrozny 2023).
        </p>

        <p>
          We want to help democratize the internet for users to get diverse and balanced information, no matter the platform. This starts with first helping users identify when they are in an echo chamber. From there, we want to provide users with alternative viewpoints to help diminish the effects of the echo chamber.
        </p>
      </div>

      <iframe width="560" height="315" style={{maxWidth: '100%'}} src="https://www.youtube.com/embed/thQDkvOUY4E?si=9ixZxYLcmeo7BQRO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
